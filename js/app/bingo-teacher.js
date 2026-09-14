"use strict";
/* Panel del profesor para controlar el Bingo en vivo. Vive dentro del
   admin-shell, en la pestana "🎯 Bingo". El profesor elige UN grupo,
   abre la sala, y desde ahi controla el cantador (reproducir/pausar,
   velocidad, cantar siguiente) mientras ve en tiempo real quien se ha
   unido (avatares) y quien va ganando la ronda. Solo puede haber una
   sala activa a la vez (documento unico bingoSessions/current). */

  function bt$(id) { return document.getElementById(id); }

  var BT_CALL_INTERVALS = { slow: 7000, normal: 5000, fast: 3000 };
  var btTimer = null;
  var btSession = null;   // ultimo snapshot de bingoSessions/current
  var btPlayers = {};     // uid -> jugador
  var btUnsubSession = null;
  var btUnsubPlayers = null;
  var btCallDeck = [];
  var btCallIndex = -1;

  function btSessionRef() { return db.collection("bingoSessions").doc("current"); }
  function btPlayersRef() { return btSessionRef().collection("players"); }

  /* ============ PESTANAS DEL PANEL DE ADMIN ============ */
  function initAdminTabs() {
    var tabStudents = bt$("admin-tab-students");
    var tabBingo = bt$("admin-tab-bingo");
    var viewStudents = bt$("admin-view-students");
    var viewBingo = bt$("admin-view-bingo");
    if (!tabStudents || !tabBingo || !viewStudents || !viewBingo) return;
    function activate(which) {
      var isStudents = which === "students";
      tabStudents.classList.toggle("active", isStudents);
      tabBingo.classList.toggle("active", !isStudents);
      viewStudents.hidden = !isStudents;
      viewBingo.hidden = isStudents;
    }
    tabStudents.addEventListener("click", function () { activate("students"); });
    tabBingo.addEventListener("click", function () { activate("bingo"); });
  }

  /* ============ SELECTOR DE GRUPO ============ */
  function loadGroupOptions() {
    var sel = bt$("bingo-host-group-select");
    if (!sel) return;
    db.collection("students").get().then(function (snap) {
      var set = {};
      snap.forEach(function (doc) {
        var g = (doc.data().grupo || "").trim();
        if (g) set[g] = true;
      });
      var groups = Object.keys(set).sort();
      var current = sel.value;
      sel.innerHTML = groups.length
        ? groups.map(function (g) { return '<option value="' + g + '">' + g + "</option>"; }).join("")
        : '<option value="">No hay grupos creados todavia</option>';
      if (groups.indexOf(current) !== -1) sel.value = current;
    }).catch(function () {});
  }

  /* ============ ABRIR / CERRAR SALA ============ */
  function openRoomForGroup(grupo) {
    if (!grupo) return;
    btSessionRef().set({
      grupo: grupo,
      status: "lobby",
      speed: "normal",
      sessionKey: String(Date.now()) + "-" + Math.random().toString(36).slice(2, 8),
      round: 1,
      currentCall: null,
      calledOrder: [],
      hostEmail: (auth.currentUser && auth.currentUser.email) || "",
      updatedAt: firebase.firestore.FieldValue.serverTimestamp()
    }).then(function () {
      return btPlayersRef().get();
    }).then(function (snap) {
      var batch = db.batch();
      snap.forEach(function (doc) { batch.delete(doc.ref); });
      return batch.commit();
    }).catch(function () {
      setBtHint("No se pudo abrir la sala. Revisa tu conexion.");
    });
  }

  function closeRoom() {
    clearTimeout(btTimer);
    btSessionRef().update({
      status: "ended",
      currentCall: null,
      updatedAt: firebase.firestore.FieldValue.serverTimestamp()
    }).catch(function () {});
  }

  function newRound() {
    clearTimeout(btTimer);
    if (!btSession) return;
    btSessionRef().update({
      status: "lobby",
      round: (btSession.round || 1) + 1,
      currentCall: null,
      calledOrder: [],
      updatedAt: firebase.firestore.FieldValue.serverTimestamp()
    }).catch(function () {});
  }

  /* ============ CANTADOR (corre en el navegador del profesor) ============ */
  function bingoPoolForHost() {
    var reg = (typeof VERBS_REGULAR !== "undefined") ? VERBS_REGULAR : [];
    var irr = (typeof VERBS_IRREGULAR !== "undefined") ? VERBS_IRREGULAR : [];
    return reg.concat(irr);
  }

  function ensureCallDeck() {
    if (btCallDeck.length && btCallIndex < btCallDeck.length - 1) return;
    btCallDeck = shuffleArray(bingoPoolForHost().slice());
    btCallIndex = -1;
  }

  function callNext() {
    if (!btSession || btSession.status === "ended") return;
    ensureCallDeck();
    btCallIndex++;
    var verb = btCallDeck[btCallIndex];
    var calledOrder = (btSession.calledOrder || []).concat([verb.base]);
    btSessionRef().update({
      currentCall: verb.base,
      calledOrder: calledOrder,
      status: "playing",
      updatedAt: firebase.firestore.FieldValue.serverTimestamp()
    }).catch(function () {});
  }

  function scheduleNextCall() {
    clearTimeout(btTimer);
    if (!btSession || btSession.status !== "playing") return;
    var speed = btSession.speed || "normal";
    btTimer = setTimeout(function () {
      callNext();
      scheduleNextCall();
    }, BT_CALL_INTERVALS[speed] || BT_CALL_INTERVALS.normal);
  }

  function setPlaying(playing) {
    if (!btSession) return;
    if (playing) {
      btSessionRef().update({ status: "playing", updatedAt: firebase.firestore.FieldValue.serverTimestamp() })
        .then(function () { callNext(); scheduleNextCall(); });
    } else {
      clearTimeout(btTimer);
      btSessionRef().update({ status: "paused", updatedAt: firebase.firestore.FieldValue.serverTimestamp() }).catch(function () {});
    }
  }

  function changeSpeed(speed) {
    if (!btSession) return;
    btSessionRef().update({ speed: speed, updatedAt: firebase.firestore.FieldValue.serverTimestamp() })
      .then(function () { if (btSession.status === "playing") scheduleNextCall(); })
      .catch(function () {});
  }

  function setBtHint(msg) {
    var el = bt$("bingo-host-hint");
    if (el) el.textContent = msg || "";
  }

  /* ============ RENDER ============ */
  function escapeHtmlBt(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c];
    });
  }

  function btRoundWinner() {
    var winner = null;
    Object.keys(btPlayers).forEach(function (uid) {
      var p = btPlayers[uid];
      if (p.wonAt && (!winner || p.wonAt < winner.wonAt)) winner = p;
    });
    return winner;
  }

  function renderHostPanel() {
    var openCard = bt$("bingo-host-open-card");
    var liveCard = bt$("bingo-host-live-card");
    if (!openCard || !liveCard) return;

    var hasOpenRoom = btSession && btSession.status !== "ended";

    if (!hasOpenRoom) {
      openCard.hidden = false;
      liveCard.hidden = true;
      var openBtn = bt$("bingo-host-open-btn");
      if (openBtn) openBtn.textContent = "Abrir sala de Bingo";
      return;
    }

    openCard.hidden = true;
    liveCard.hidden = false;

    bt$("bingo-host-group-label").textContent = btSession.grupo;
    var statusLabels = { lobby: "En espera", playing: "Cantando", paused: "Pausado" };
    bt$("bingo-host-status-badge").textContent = statusLabels[btSession.status] || btSession.status;
    bt$("bingo-host-status-badge").className = "bingo-host-status-badge status-" + btSession.status;

    var playPauseBtn = bt$("bingo-host-playpause-btn");
    if (playPauseBtn) {
      var playing = btSession.status === "playing";
      playPauseBtn.textContent = playing ? "⏸ Pausar" : "▶ Reproducir";
    }

    var speedSel = bt$("bingo-host-speed-select");
    if (speedSel && speedSel.value !== btSession.speed) speedSel.value = btSession.speed || "normal";

    bt$("bingo-host-current-call").textContent = btSession.currentCall || "—";
    var history = (btSession.calledOrder || []).slice(-10).reverse();
    bt$("bingo-host-history").innerHTML = history.map(function (base, i) {
      return '<span class="bingo-chip' + (i === 0 ? " current" : "") + '">' + escapeHtmlBt(base) + "</span>";
    }).join("");

    var winner = btRoundWinner();
    var bannerEl = bt$("bingo-host-winner-banner");
    if (winner) {
      bannerEl.hidden = false;
      bannerEl.innerHTML = "🏆 <strong>" + escapeHtmlBt(winner.nombre || "Alguien") + "</strong> completo una linea";
    } else {
      bannerEl.hidden = true;
      bannerEl.innerHTML = "";
    }

    var list = Object.keys(btPlayers).map(function (uid) { return btPlayers[uid]; });
    list.sort(function (a, b) { return (a.nombre || "").localeCompare(b.nombre || ""); });
    var rosterEl = bt$("bingo-host-roster");
    rosterEl.innerHTML = list.length
      ? list.map(function (p) {
          var count = (p.marked || []).filter(function (m) { return m; }).length - 1;
          return (
            '<div class="bingo-roster-row' + (p.wonAt ? " won" : "") + '">' +
            '<span class="bingo-avatar-badge" style="background:' + (p.avatarColor || "#0C4EB8") + '">' + (p.avatarEmoji || "🙂") + '</span>' +
            '<span class="bingo-roster-name">' + escapeHtmlBt(p.nombre || "Alumno") + '</span>' +
            '<span class="bingo-chip-count">' + Math.max(count, 0) + '/24</span>' +
            (p.wonAt ? '<span class="bingo-crown">🏆</span>' : "") +
            '</div>'
          );
        }).join("")
      : '<p class="bingo-roster-empty">Ningun alumno se ha unido todavia.</p>';
  }

  /* ============ SUSCRIPCIONES ============ */
  function teardownHostListeners() {
    if (btUnsubSession) { btUnsubSession(); btUnsubSession = null; }
    if (btUnsubPlayers) { btUnsubPlayers(); btUnsubPlayers = null; }
    clearTimeout(btTimer);
  }

  function setupHostListeners() {
    teardownHostListeners();
    btUnsubSession = btSessionRef().onSnapshot(function (doc) {
      btSession = doc.exists ? doc.data() : null;
      renderHostPanel();
    });
    btUnsubPlayers = btPlayersRef().onSnapshot(function (snap) {
      var next = {};
      snap.forEach(function (d) { next[d.id] = d.data(); });
      btPlayers = next;
      renderHostPanel();
    });
  }

  /* ============ VIGILANTE DE LA BARRA DE PESTANAS ============
     Sea cual sea la causa (extension del navegador, CSS, timing de
     carga), esto obliga a que #admin-tabbar este siempre visible
     mientras el panel de admin este abierto. Si el nodo desaparecio
     por completo del HTML, lo vuelve a crear. Corre cada 1.2s. */
  function forceShowTabbar() {
    var shell = bt$("admin-shell");
    if (!shell || shell.hidden) return;
    var main = document.querySelector(".admin-main");
    if (!main) return;
    var tabbar = bt$("admin-tabbar");
    if (!tabbar) {
      tabbar = document.createElement("div");
      tabbar.className = "group-tabbar";
      tabbar.id = "admin-tabbar";
      tabbar.innerHTML =
        '<button type="button" class="group-tab active" id="admin-tab-students">👩‍🎓 Students</button>' +
        '<button type="button" class="group-tab" id="admin-tab-bingo">🎯 Bingo</button>';
      main.insertBefore(tabbar, main.firstChild);
    }
    tabbar.hidden = false;
    tabbar.style.setProperty("display", "flex", "important");
    tabbar.style.setProperty("visibility", "visible", "important");
    tabbar.style.setProperty("opacity", "1", "important");
    tabbar.style.setProperty("position", "relative", "important");
    tabbar.style.setProperty("z-index", "5", "important");
    initAdminTabs();
  }

  /* ============ INIT (llamado por auth.js al iniciar sesion el profesor) ============ */
  function initBingoHostPanel() {
    forceShowTabbar();
    loadGroupOptions();
    setupHostListeners();
    clearInterval(window.__UTN_BINGO_TABBAR_WATCHDOG__);
    window.__UTN_BINGO_TABBAR_WATCHDOG__ = setInterval(forceShowTabbar, 1200);
  }
  window.__UTN_BINGO_HOST_INIT__ = initBingoHostPanel;

  /* ============ LISTENERS DE UI ============ */
  var openBtnEl = bt$("bingo-host-open-btn");
  if (openBtnEl) openBtnEl.addEventListener("click", function () {
    var sel = bt$("bingo-host-group-select");
    var grupo = sel && sel.value;
    if (!grupo) { setBtHint("Primero crea/asigna un grupo desde la pestana de Estudiantes."); return; }
    openRoomForGroup(grupo);
  });

  var refreshGroupsBtn = bt$("bingo-host-refresh-groups-btn");
  if (refreshGroupsBtn) refreshGroupsBtn.addEventListener("click", loadGroupOptions);

  var playPauseBtnEl = bt$("bingo-host-playpause-btn");
  if (playPauseBtnEl) playPauseBtnEl.addEventListener("click", function () {
    setPlaying(!(btSession && btSession.status === "playing"));
  });

  var callNowBtnEl = bt$("bingo-host-callnow-btn");
  if (callNowBtnEl) callNowBtnEl.addEventListener("click", function () {
    callNext();
    if (btSession && btSession.status === "playing") scheduleNextCall();
  });

  var speedSelEl = bt$("bingo-host-speed-select");
  if (speedSelEl) speedSelEl.addEventListener("change", function () { changeSpeed(speedSelEl.value); });

  var newRoundBtnEl = bt$("bingo-host-newround-btn");
  if (newRoundBtnEl) newRoundBtnEl.addEventListener("click", function () {
    if (confirm("¿Iniciar una ronda nueva? Se borraran los cartones marcados, pero los alumnos conservan su avatar.")) newRound();
  });

  var closeRoomBtnEl = bt$("bingo-host-close-btn");
  if (closeRoomBtnEl) closeRoomBtnEl.addEventListener("click", function () {
    if (confirm("¿Cerrar la sala de Bingo? Los alumnos volveran a la pantalla de espera.")) closeRoom();
  });
