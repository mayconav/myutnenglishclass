"use strict";
/* Juego de Bingo de verbos (regulares e irregulares), en vivo y controlado
   por el profesor. El profesor abre una sala para UN grupo a la vez desde
   su Panel de Administracion (ver js/app/bingo-teacher.js); solo los
   alumnos de ese grupo pueden entrar. Al entrar, cada alumno crea un
   avatar (emoji + color + apodo) antes de recibir su carton. El profesor
   controla el cantador (reproducir/pausar/cantar siguiente); cada alumno
   marca su propio carton en tiempo real y el primero en completar una
   linea gana la ronda para todos. */

  var BINGO_XP_PER_WIN = 25;
  var BINGO_GRID_SIZE = 5;
  var BINGO_FREE_INDEX = 12; // centro de un grid 5x5 (0-indexado)
  var BINGO_AVATAR_EMOJIS = ["🦊","🐼","🐸","🐵","🦁","🐯","🐨","🐰","🐧","🦄","🐙","🦖","🐢","🦉","🐝","🐬"];
  var BINGO_AVATAR_COLORS = ["#0C4EB8","#E2141B","#0C9C61","#7B3FA0","#D9720C","#C79A00","#8B5A2B","#3B74D6"];

  var BINGO_LINES = (function buildLines() {
    var lines = [];
    for (var r = 0; r < BINGO_GRID_SIZE; r++) {
      var row = [];
      for (var c = 0; c < BINGO_GRID_SIZE; c++) row.push(r * BINGO_GRID_SIZE + c);
      lines.push(row);
    }
    for (var c2 = 0; c2 < BINGO_GRID_SIZE; c2++) {
      var col = [];
      for (var r2 = 0; r2 < BINGO_GRID_SIZE; r2++) col.push(r2 * BINGO_GRID_SIZE + c2);
      lines.push(col);
    }
    var diag1 = [], diag2 = [];
    for (var i = 0; i < BINGO_GRID_SIZE; i++) {
      diag1.push(i * BINGO_GRID_SIZE + i);
      diag2.push(i * BINGO_GRID_SIZE + (BINGO_GRID_SIZE - 1 - i));
    }
    lines.push(diag1, diag2);
    return lines;
  })();

  function bingoPool() {
    var reg = (typeof VERBS_REGULAR !== "undefined") ? VERBS_REGULAR : [];
    var irr = (typeof VERBS_IRREGULAR !== "undefined") ? VERBS_IRREGULAR : [];
    return reg.concat(irr);
  }

  function bingoVerbByBase(base) {
    var pool = bingoPool();
    for (var i = 0; i < pool.length; i++) if (pool[i].base === base) return pool[i];
    return null;
  }

  function bingoEl(id) { return document.getElementById(id); }

  /* ============ ESTADO LOCAL ============ */
  var bingoStudent = { uid: null, nombre: "", grupo: "" };
  var bingoSession = null;      // ultimo snapshot de bingoSessions/current
  var bingoPlayers = {};        // uid -> datos del jugador (roster completo)
  var bingoMyPlayer = null;     // mi propio documento de jugador (si ya me uni)
  var bingoUnsubSession = null;
  var bingoUnsubPlayers = null;
  var bingoLastSpokenCall = null;
  var bingoAnnouncedWinnerKey = null; // evita repetir el modal de "alguien mas gano" en cada snapshot
  var bingoVoiceOn = true;
  var bingoAvatarPick = { emoji: BINGO_AVATAR_EMOJIS[0], color: BINGO_AVATAR_COLORS[0] };

  function bingoSessionRef() { return db.collection("bingoSessions").doc("current"); }
  function bingoPlayersRef() { return bingoSessionRef().collection("players"); }
  function bingoMyPlayerRef() { return bingoPlayersRef().doc(bingoStudent.uid); }

  /* ============ VOZ ============ */
  function speak(word) {
    if (!bingoVoiceOn) return;
    if (!("speechSynthesis" in window)) return;
    try {
      window.speechSynthesis.cancel();
      var utter = new SpeechSynthesisUtterance(word);
      utter.lang = "en-US";
      utter.rate = 0.95;
      window.speechSynthesis.speak(utter);
    } catch (e) {}
  }

  /* ============ CARTON ============ */
  function buildBoard() {
    var pool = shuffleArray(bingoPool().slice());
    var picks = pool.slice(0, BINGO_GRID_SIZE * BINGO_GRID_SIZE - 1);
    var board = []; // guardamos solo el "base" de cada verbo + FREE como null
    var marked = [];
    var p = 0;
    for (var i = 0; i < BINGO_GRID_SIZE * BINGO_GRID_SIZE; i++) {
      if (i === BINGO_FREE_INDEX) { board.push(null); marked.push(true); }
      else { board.push(picks[p++].base); marked.push(false); }
    }
    return { board: board, marked: marked };
  }

  function renderBoard() {
    var grid = bingoEl("bingo-board");
    if (!grid || !bingoMyPlayer) return;
    grid.innerHTML = "";
    bingoMyPlayer.board.forEach(function (base, idx) {
      var cell = document.createElement("button");
      cell.type = "button";
      cell.className = "bingo-cell";
      cell.dataset.index = idx;
      if (idx === BINGO_FREE_INDEX) {
        cell.classList.add("free");
        cell.textContent = "★";
        cell.disabled = true;
      } else {
        var verb = bingoVerbByBase(base);
        cell.textContent = verb ? verb.past : base;
      }
      if (bingoMyPlayer.marked[idx] && idx !== BINGO_FREE_INDEX) cell.classList.add("marked");
      grid.appendChild(cell);
    });
    updateProgressLabel();
  }

  function updateProgressLabel() {
    var el = bingoEl("bingo-progress-label");
    if (!el || !bingoMyPlayer) return;
    var count = bingoMyPlayer.marked.filter(function (m) { return m; }).length - 1; // sin contar FREE
    el.textContent = count + " / 24 marcadas";
  }

  function findCompletedLine(marked) {
    for (var i = 0; i < BINGO_LINES.length; i++) {
      var line = BINGO_LINES[i];
      var complete = line.every(function (idx) { return marked[idx]; });
      if (complete) return line;
    }
    return null;
  }

  /* ============ MARCAR CASILLAS ============ */
  function handleCellClick(e) {
    if (!bingoMyPlayer || bingoRoundHasWinner()) return;
    var cell = e.target.closest(".bingo-cell");
    if (!cell || cell.classList.contains("free")) return;
    var idx = Number(cell.dataset.index);
    if (bingoMyPlayer.marked[idx]) return;
    var base = bingoMyPlayer.board[idx];
    var called = (bingoSession && bingoSession.calledOrder) || [];
    if (called.indexOf(base) === -1) {
      cell.classList.remove("bingo-shake");
      void cell.offsetWidth;
      cell.classList.add("bingo-shake");
      setHint("Ese verbo aun no ha sido cantado — ¡sigue escuchando!");
      return;
    }
    bingoMyPlayer.marked[idx] = true;
    cell.classList.add("marked");
    cell.classList.remove("bingo-dab");
    void cell.offsetWidth;
    cell.classList.add("bingo-dab");
    updateProgressLabel();
    setHint("");

    var line = findCompletedLine(bingoMyPlayer.marked);
    var updates = { marked: bingoMyPlayer.marked };
    if (line && !bingoMyPlayer.wonAt) {
      bingoMyPlayer.wonAt = Date.now();
      bingoMyPlayer.winLine = line;
      updates.wonAt = bingoMyPlayer.wonAt;
      updates.winLine = line;
    }
    bingoMyPlayerRef().update(updates).catch(function () {});
    if (line) onLocalWin(line);
  }

  function onLocalWin(line) {
    line.forEach(function (idx) {
      var cell = bingoEl("bingo-board") && bingoEl("bingo-board").querySelector('[data-index="' + idx + '"]');
      if (cell) cell.classList.add("line-win");
    });
    awardBingoXP();
    setTimeout(function () { showWinModal(bingoStudent.nombre, true); }, 450);
  }

  function awardBingoXP() {
    state.skillsXP = (state.skillsXP || 0) + BINGO_XP_PER_WIN;
    if (!state.bingoStats) state.bingoStats = { wins: 0, played: 0 };
    state.bingoStats.wins += 1;
    saveProgress(state);
    if (typeof showXpToast === "function") showXpToast(BINGO_XP_PER_WIN);
  }

  function setHint(msg) {
    var el = bingoEl("bingo-hint");
    if (el) el.textContent = msg || "";
  }

  /* ============ GANADOR DE LA RONDA (calculado del roster) ============ */
  function bingoRoundWinner() {
    var winner = null;
    Object.keys(bingoPlayers).forEach(function (uid) {
      var p = bingoPlayers[uid];
      if (p.wonAt && (!winner || p.wonAt < winner.wonAt)) winner = p;
    });
    return winner;
  }
  function bingoRoundHasWinner() { return !!bingoRoundWinner(); }

  function showWinModal(nombreGanador, soyYo) {
    bingoEl("bingo-win-text").textContent = soyYo
      ? "¡Completaste una linea y ganaste +" + BINGO_XP_PER_WIN + " XP!"
      : (nombreGanador || "Alguien") + " completo una linea primero. ¡Sera en la siguiente ronda!";
    bingoEl("bingo-win-modal").hidden = false;
  }
  function hideWinModal() { bingoEl("bingo-win-modal").hidden = true; }

  /* ============ ROSTER (avatares de todos los jugadores) ============ */
  function avatarChipHtml(p, opts) {
    opts = opts || {};
    var crown = p.wonAt ? '<span class="bingo-crown" title="Gano esta ronda">🏆</span>' : "";
    var count = (p.marked || []).filter(function (m) { return m; }).length - 1;
    var sub = opts.showCount ? '<span class="bingo-chip-count">' + Math.max(count, 0) + '/24</span>' : "";
    return (
      '<span class="bingo-roster-chip' + (p.wonAt ? " won" : "") + '">' +
      '<span class="bingo-avatar-badge" style="background:' + (p.avatarColor || "#0C4EB8") + '">' + (p.avatarEmoji || "🙂") + '</span>' +
      '<span class="bingo-roster-name">' + escapeHtmlBingo(p.nombre || "Alumno") + '</span>' +
      crown + sub +
      '</span>'
    );
  }

  function escapeHtmlBingo(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c];
    });
  }

  function renderRoster() {
    var wrap = bingoEl("bingo-roster");
    if (!wrap) return;
    var list = Object.keys(bingoPlayers).map(function (uid) { return bingoPlayers[uid]; });
    list.sort(function (a, b) { return (a.nombre || "").localeCompare(b.nombre || ""); });
    wrap.innerHTML = list.length
      ? list.map(function (p) { return avatarChipHtml(p, { showCount: true }); }).join("")
      : '<span class="bingo-roster-empty">Todavia no hay nadie en la sala.</span>';
  }

  /* ============ PANTALLAS ============ */
  function showOnly(id) {
    ["bingo-guest-screen", "bingo-closed-screen", "bingo-avatar-screen", "bingo-room-screen"].forEach(function (sid) {
      var el = bingoEl(sid);
      if (el) el.hidden = (sid !== id);
    });
  }

  function renderClosedMessage() {
    var el = bingoEl("bingo-closed-text");
    if (!el) return;
    if (!bingoStudent.grupo) {
      el.textContent = "Tu profesor todavia no te ha asignado a un grupo. Pidele que te asigne uno para poder jugar Bingo.";
    } else if (!bingoSession || bingoSession.status === "ended") {
      el.textContent = "Tu profesor todavia no ha abierto una partida de Bingo. Esta pantalla se actualizara sola en cuanto la abra.";
    } else if (bingoSession.grupo !== bingoStudent.grupo) {
      el.textContent = "Hay una partida de Bingo activa, pero es para el grupo " + bingoSession.grupo + ". Espera a que tu profesor abra una para " + bingoStudent.grupo + ".";
    } else {
      el.textContent = "Esperando a tu profesor…";
    }
  }

  function renderCallerPanel() {
    var statusEl = bingoEl("bingo-room-status");
    var wordEl = bingoEl("bingo-caller-word");
    var historyEl = bingoEl("bingo-called-history");
    if (!bingoSession) return;
    var statusLabels = {
      lobby: "🕹️ En espera de que el profesor inicie",
      playing: "🎙️ Cantando verbos…",
      paused: "⏸️ Pausado por el profesor",
      ended: "🏁 Ronda terminada"
    };
    if (statusEl) statusEl.textContent = statusLabels[bingoSession.status] || "";
    if (wordEl) wordEl.textContent = bingoSession.currentCall || "—";

    var called = (bingoSession.calledOrder || []).slice(-8).reverse();
    if (historyEl) {
      historyEl.innerHTML = called.map(function (base, i) {
        return '<span class="bingo-chip' + (i === 0 ? " current" : "") + '">' + escapeHtmlBingo(base) + "</span>";
      }).join("");
    }

    var winner = bingoRoundWinner();
    var bannerEl = bingoEl("bingo-winner-banner");
    if (bannerEl) {
      if (winner) {
        bannerEl.hidden = false;
        bannerEl.innerHTML = "🏆 <strong>" + escapeHtmlBingo(winner.nombre || "Alguien") + "</strong> gano esta ronda";
      } else {
        bannerEl.hidden = true;
        bannerEl.innerHTML = "";
      }
    }
  }

  function maybeSpeakCurrentCall() {
    if (!bingoSession || !bingoSession.currentCall) return;
    if (bingoSession.currentCall === bingoLastSpokenCall) return;
    bingoLastSpokenCall = bingoSession.currentCall;
    speak(bingoSession.currentCall);
    var wordEl = bingoEl("bingo-caller-word");
    if (wordEl) {
      wordEl.classList.remove("bingo-call-pop");
      void wordEl.offsetWidth;
      wordEl.classList.add("bingo-call-pop");
    }
  }

  /* ============ AVATAR ============ */
  function renderAvatarPicker() {
    var emojiWrap = bingoEl("bingo-avatar-emojis");
    var colorWrap = bingoEl("bingo-avatar-colors");
    if (emojiWrap && !emojiWrap.dataset.built) {
      emojiWrap.innerHTML = BINGO_AVATAR_EMOJIS.map(function (em) {
        return '<button type="button" class="bingo-avatar-option" data-emoji="' + em + '">' + em + "</button>";
      }).join("");
      emojiWrap.dataset.built = "1";
    }
    if (colorWrap && !colorWrap.dataset.built) {
      colorWrap.innerHTML = BINGO_AVATAR_COLORS.map(function (c) {
        return '<button type="button" class="bingo-color-option" data-color="' + c + '" style="background:' + c + '"></button>';
      }).join("");
      colorWrap.dataset.built = "1";
    }
    updateAvatarPreview();
    var nameInput = bingoEl("bingo-avatar-nickname");
    if (nameInput && !nameInput.value) nameInput.value = bingoStudent.nombre || "";
  }

  function updateAvatarPreview() {
    var emojiWrap = bingoEl("bingo-avatar-emojis");
    var colorWrap = bingoEl("bingo-avatar-colors");
    if (emojiWrap) Array.prototype.forEach.call(emojiWrap.children, function (btn) {
      btn.classList.toggle("selected", btn.dataset.emoji === bingoAvatarPick.emoji);
    });
    if (colorWrap) Array.prototype.forEach.call(colorWrap.children, function (btn) {
      btn.classList.toggle("selected", btn.dataset.color === bingoAvatarPick.color);
    });
    var preview = bingoEl("bingo-avatar-preview");
    if (preview) {
      preview.style.background = bingoAvatarPick.color;
      preview.textContent = bingoAvatarPick.emoji;
    }
  }

  function joinRoom() {
    var nickInput = bingoEl("bingo-avatar-nickname");
    var nombre = (nickInput && nickInput.value.trim()) || bingoStudent.nombre || "Alumno";
    var built = buildBoard();
    var data = {
      nombre: nombre,
      avatarEmoji: bingoAvatarPick.emoji,
      avatarColor: bingoAvatarPick.color,
      grupo: bingoStudent.grupo,
      sessionKey: bingoSession.sessionKey,
      round: bingoSession.round,
      board: built.board,
      marked: built.marked,
      wonAt: null,
      winLine: null,
      joinedAt: firebase.firestore.FieldValue.serverTimestamp()
    };
    var btn = bingoEl("bingo-join-btn");
    if (btn) { btn.disabled = true; btn.textContent = "Entrando…"; }
    bingoMyPlayerRef().set(data).then(function () {
      bingoMyPlayer = data;
      if (!state.bingoStats) state.bingoStats = { wins: 0, played: 0 };
      state.bingoStats.played += 1;
      saveProgress(state);
      renderRoom();
    }).catch(function () {
      setHint("No se pudo entrar a la sala. Revisa tu conexion e intenta de nuevo.");
    }).finally(function () {
      if (btn) { btn.disabled = false; btn.textContent = "Entrar a la sala"; }
    });
  }

  function autoRejoinNewRound() {
    // Ya tenia avatar en esta MISMA sala (sessionKey igual) pero el profesor
    // inicio una ronda nueva: conservamos el avatar y solo regeneramos carton.
    var built = buildBoard();
    var data = {
      nombre: bingoMyPlayer.nombre,
      avatarEmoji: bingoMyPlayer.avatarEmoji,
      avatarColor: bingoMyPlayer.avatarColor,
      grupo: bingoStudent.grupo,
      sessionKey: bingoSession.sessionKey,
      round: bingoSession.round,
      board: built.board,
      marked: built.marked,
      wonAt: null,
      winLine: null,
      joinedAt: firebase.firestore.FieldValue.serverTimestamp()
    };
    bingoMyPlayerRef().set(data).then(function () {
      bingoMyPlayer = data;
      renderRoom();
    }).catch(function () {});
  }

  function leaveRoom() {
    if (!bingoStudent.uid) return;
    bingoMyPlayerRef().delete().catch(function () {});
    bingoMyPlayer = null;
    renderScreen();
  }

  /* ============ ORQUESTACION DE PANTALLAS ============ */
  function renderScreen() {
    if (!bingoStudent.uid) { showOnly("bingo-guest-screen"); return; }

    var open = bingoSession && bingoSession.status !== "ended" && bingoSession.grupo === bingoStudent.grupo && bingoStudent.grupo;
    if (!open) {
      renderClosedMessage();
      showOnly("bingo-closed-screen");
      bingoMyPlayer = null;
      return;
    }

    var mine = bingoPlayers[bingoStudent.uid];
    if (!mine || mine.sessionKey !== bingoSession.sessionKey) {
      bingoMyPlayer = null;
      renderAvatarPicker();
      showOnly("bingo-avatar-screen");
      return;
    }

    bingoMyPlayer = mine;
    if (mine.round !== bingoSession.round) {
      autoRejoinNewRound();
      return; // renderRoom() se llama dentro del then()
    }
    renderRoom();
  }

  function renderRoom() {
    showOnly("bingo-room-screen");
    renderBoard();
    renderCallerPanel();
    renderRoster();
    maybeSpeakCurrentCall();
    maybeAnnounceOtherWinner();
  }

  function maybeAnnounceOtherWinner() {
    var winner = bingoRoundWinner();
    if (!winner || !bingoSession) return;
    var key = bingoSession.sessionKey + ":" + bingoSession.round;
    if (bingoAnnouncedWinnerKey === key) return;
    bingoAnnouncedWinnerKey = key;
    // Si gane yo, ya me entere via onLocalWin() al marcar mi propia casilla.
    if (bingoMyPlayer && bingoMyPlayer.wonAt && winner.wonAt === bingoMyPlayer.wonAt) return;
    showWinModal(winner.nombre, false);
  }

  /* ============ SUSCRIPCIONES EN TIEMPO REAL ============ */
  function teardownBingoListeners() {
    if (bingoUnsubSession) { bingoUnsubSession(); bingoUnsubSession = null; }
    if (bingoUnsubPlayers) { bingoUnsubPlayers(); bingoUnsubPlayers = null; }
    bingoSession = null;
    bingoPlayers = {};
    bingoMyPlayer = null;
    bingoLastSpokenCall = null;
    bingoAnnouncedWinnerKey = null;
  }

  function setupBingoListeners() {
    teardownBingoListeners();
    bingoUnsubSession = bingoSessionRef().onSnapshot(function (doc) {
      bingoSession = doc.exists ? doc.data() : null;
      renderScreen();
    }, function () { bingoSession = null; renderScreen(); });

    bingoUnsubPlayers = bingoPlayersRef().onSnapshot(function (snap) {
      var next = {};
      snap.forEach(function (d) { next[d.id] = d.data(); });
      bingoPlayers = next;
      renderScreen();
    }, function () {});
  }

  /* Llamado por navigation.js cada vez que el alumno entra a la vista de
     Games, para asegurarnos de que la pantalla mostrada refleje el estado
     actual de la sala (por si algo cambio mientras estaba en otra vista). */
  function initBingoView() { renderScreen(); }

  /* Llamado por auth.js cuando cambia la sesion del alumno (login/logout). */
  function bingoSetStudent(uid, data) {
    if (!uid) {
      bingoStudent = { uid: null, nombre: "", grupo: "" };
      teardownBingoListeners();
      renderScreen();
      return;
    }
    bingoStudent = { uid: uid, nombre: (data && data.nombre) || "", grupo: (data && data.grupo) || "" };
    setupBingoListeners();
  }
  window.__UTN_BINGO_SET_STUDENT__ = bingoSetStudent;

  /* ============ LISTENERS DE UI (el DOM del partial ya existe) ============ */
  var voiceToggle = bingoEl("bingo-voice-toggle");
  if (voiceToggle) {
    bingoVoiceOn = voiceToggle.checked;
    voiceToggle.addEventListener("change", function () { bingoVoiceOn = voiceToggle.checked; });
  }

  var emojiWrapEl = bingoEl("bingo-avatar-emojis");
  if (emojiWrapEl) emojiWrapEl.addEventListener("click", function (e) {
    var btn = e.target.closest(".bingo-avatar-option");
    if (!btn) return;
    bingoAvatarPick.emoji = btn.dataset.emoji;
    updateAvatarPreview();
  });

  var colorWrapEl = bingoEl("bingo-avatar-colors");
  if (colorWrapEl) colorWrapEl.addEventListener("click", function (e) {
    var btn = e.target.closest(".bingo-color-option");
    if (!btn) return;
    bingoAvatarPick.color = btn.dataset.color;
    updateAvatarPreview();
  });

  var joinBtn = bingoEl("bingo-join-btn");
  if (joinBtn) joinBtn.addEventListener("click", joinRoom);

  var leaveBtn = bingoEl("bingo-leave-btn");
  if (leaveBtn) leaveBtn.addEventListener("click", leaveRoom);

  var boardEl = bingoEl("bingo-board");
  if (boardEl) boardEl.addEventListener("click", handleCellClick);

  var winCloseBtn = bingoEl("bingo-win-close");
  if (winCloseBtn) winCloseBtn.addEventListener("click", hideWinModal);

  var winModalEl = bingoEl("bingo-win-modal");
  if (winModalEl) winModalEl.addEventListener("click", function (e) {
    if (e.target === winModalEl) hideWinModal();
  });

  var loginPromptBtn = bingoEl("bingo-guest-login-btn");
  if (loginPromptBtn) loginPromptBtn.addEventListener("click", function () {
    if (typeof window.__UTN_OPEN_GATE__ === "function") window.__UTN_OPEN_GATE__("login");
  });

  showOnly("bingo-guest-screen");
