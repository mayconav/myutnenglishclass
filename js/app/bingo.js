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
  var BINGO_CENTER_INDEX = 12; // centro de un grid 5x5 (0-indexado): lleva un verbo irregular, ya no hay casilla libre
  var BINGO_TOTAL_CELLS = BINGO_GRID_SIZE * BINGO_GRID_SIZE; // 25
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

  /* Fichas del juego: pasado simple y participio pasado (ver js/data/verbs-content.js). */
  function bingoPool(modo) {
    return (typeof bingoEntryPool === "function") ? bingoEntryPool(modo) : [];
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

  /* ---- Estado de animaciones (solo visual, no se guarda) ---- */
  var bingoBoardAnimKey = null;     // "sessionKey:round" del ultimo carton que entro animado
  var bingoWaveKey = null;          // evita repetir la ola dorada en cada snapshot
  var bingoLastHistoryTop = null;   // ultima ficha del historial (para animar solo la nueva)
  var bingoKnownPlayers = null;     // uids ya vistos en el roster (para animar solo a los nuevos)
  var bingoPrevCounts = {};         // uid -> casillas marcadas (para animar el contador)
  var BINGO_CONFETTI_COLORS = ["#ffd166","#E2141B","#0C9C61","#3B74D6","#ffffff","#f2c230"];

  function bingoMotionOk() {
    return !(window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }

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
    var modo = bingoNormalizeMode(bingoSession && bingoSession.modo); // tipo de partida elegido por el profesor (mixed/regular/irregular)
    var pool = shuffleArray(bingoPool(modo).slice());
    // Sin palabras repetidas en un mismo carton (p. ej. dos casillas "saw")
    var seen = {};
    var picks = [];
    for (var n = 0; n < pool.length && picks.length < BINGO_TOTAL_CELLS; n++) {
      var t = pool[n].text.toLowerCase();
      if (seen[t]) continue;
      seen[t] = true;
      picks.push(pool[n]);
    }
    // La casilla central (antes la estrella) ahora es una ficha mas. En partidas
    // mixtas es siempre un verbo irregular (se intercambia con la primera
    // irregular del carton). En "solo regulares" / "solo irregulares" no hace
    // falta: todo el carton ya es del mismo tipo.
    var irregularBases = {};
    if (modo === "mixed" && typeof VERBS_IRREGULAR !== "undefined") {
      VERBS_IRREGULAR.forEach(function (v) { irregularBases[v.base] = true; });
    }
    var cIdx = -1;
    for (var k = 0; k < picks.length; k++) {
      if (irregularBases[picks[k].base]) { cIdx = k; break; }
    }
    if (cIdx > -1 && Object.keys(irregularBases).length) {
      var tmp = picks[BINGO_CENTER_INDEX];
      picks[BINGO_CENTER_INDEX] = picks[cIdx];
      picks[cIdx] = tmp;
    }
    var board = []; // clave "base|forma" de cada casilla
    var marked = [];
    for (var i = 0; i < BINGO_TOTAL_CELLS; i++) {
      board.push(picks[i].key);
      marked.push(false);
    }
    return { board: board, marked: marked };
  }

  /* Casillas marcadas por un jugador. Ignora casillas null (cartones viejos
     que todavia traian la estrella libre en el centro). */
  function bingoMarkedCount(p) {
    var board = (p && p.board) || [];
    return (p && p.marked ? p.marked : []).filter(function (m, i) { return m && board[i] !== null; }).length;
  }
  function bingoCellTotal(p) {
    var board = (p && p.board) || [];
    var n = board.filter(function (k) { return k !== null; }).length;
    return n || BINGO_TOTAL_CELLS;
  }

  function renderBoard() {
    var grid = bingoEl("bingo-board");
    if (!grid || !bingoMyPlayer) return;
    var animKey = bingoSession ? (bingoSession.sessionKey + ":" + bingoSession.round) : null;
    var sig = animKey + "|" + bingoMyPlayer.board.join(",");
    var existing = grid.querySelectorAll(".bingo-cell"); // sin contar capas de particulas
    if (grid.dataset.sig === sig && existing.length === bingoMyPlayer.board.length) {
      // Mismo carton: solo sincronizamos estado SIN reconstruir, para no cortar las animaciones en curso
      Array.prototype.forEach.call(existing, function (cell, idx) {
        if (bingoMyPlayer.marked[idx] && bingoMyPlayer.board[idx] !== null) cell.classList.add("marked");
      });
      var syncLine = bingoMyPlayer.winLine || null;
      if (syncLine) syncLine.forEach(function (idx, order) {
        var c = existing[idx];
        if (c && !c.classList.contains("line-win")) { c.style.setProperty("--w", order); c.classList.add("line-win"); }
      });
      updateProgressLabel();
      return;
    }
    grid.dataset.sig = sig;
    grid.innerHTML = "";
    var animateIn = bingoMotionOk() && animKey && animKey !== bingoBoardAnimKey;
    if (animateIn) bingoBoardAnimKey = animKey;
    var winLine = bingoMyPlayer.winLine || null;
    var waveNow = !!(winLine && bingoMotionOk() && animKey !== bingoWaveKey);
    if (waveNow) bingoWaveKey = animKey;
    bingoMyPlayer.board.forEach(function (key, idx) {
      var cell = document.createElement("button");
      cell.type = "button";
      cell.className = "bingo-cell";
      cell.dataset.index = idx;
      if (key === null) { // carton viejo con estrella: se sigue mostrando asi hasta la proxima ronda
        cell.classList.add("free");
        cell.textContent = "★";
        cell.disabled = true;
      } else {
        var word = bingoCellText(key);
        var icon = bingoCellEmoji(key);
        cell.setAttribute("aria-label", word);
        if (icon) {
          var iconEl = document.createElement("span");
          iconEl.className = "bingo-cell-emoji";
          iconEl.setAttribute("aria-hidden", "true");
          iconEl.textContent = icon;
          cell.appendChild(iconEl);
        }
        var wordEl = document.createElement("span");
        wordEl.className = "bingo-cell-word";
        wordEl.textContent = word;
        cell.appendChild(wordEl);
      }
      if (bingoMyPlayer.marked[idx] && key !== null) cell.classList.add("marked");
      if (animateIn) {
        cell.style.setProperty("--i", idx);
        cell.classList.add("enter");
        cell.addEventListener("animationend", function onEnd() {
          cell.classList.remove("enter");
          cell.removeEventListener("animationend", onEnd);
        });
      }
      var lineOrder = winLine ? winLine.indexOf(idx) : -1;
      if (lineOrder !== -1) {
        cell.classList.add("line-win");
        cell.style.setProperty("--w", lineOrder);
        if (waveNow) cell.classList.add("wave");
      }
      grid.appendChild(cell);
    });
    updateProgressLabel();
  }

  function updateProgressLabel() {
    var el = bingoEl("bingo-progress-label");
    if (!el || !bingoMyPlayer) return;
    var count = bingoMarkedCount(bingoMyPlayer);
    var total = bingoCellTotal(bingoMyPlayer);
    el.textContent = count + " / " + total + " marcadas";
    if (el.parentElement) el.parentElement.style.setProperty("--p", count / total);
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
    var key = bingoNormalizeKey(bingoMyPlayer.board[idx]);
    var called = ((bingoSession && bingoSession.calledOrder) || []).map(bingoNormalizeKey);
    if (called.indexOf(key) === -1) {
      cell.classList.remove("bingo-shake");
      void cell.offsetWidth;
      cell.classList.add("bingo-shake");
      cell.addEventListener("animationend", function onShakeEnd(ev) {
        if (ev.animationName !== "bingoShake") return;
        cell.classList.remove("bingo-shake");
        cell.removeEventListener("animationend", onShakeEnd);
      });
      setHint("Esa forma aun no ha sido cantada — ¡sigue escuchando!");
      return;
    }
    bingoMyPlayer.marked[idx] = true;
    cell.classList.add("marked");
    cell.classList.remove("bingo-dab");
    void cell.offsetWidth;
    cell.classList.add("bingo-dab");
    bingoSparkBurst(cell);
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
    var animKey = bingoSession ? (bingoSession.sessionKey + ":" + bingoSession.round) : null;
    if (animKey) bingoWaveKey = animKey; // la ola se dispara aqui, no en el re-render del snapshot
    line.forEach(function (idx, order) {
      var cell = bingoEl("bingo-board") && bingoEl("bingo-board").querySelector('[data-index="' + idx + '"]');
      if (!cell) return;
      cell.style.setProperty("--w", order);
      cell.classList.add("line-win");
      cell.classList.remove("wave");
      void cell.offsetWidth;
      if (bingoMotionOk()) cell.classList.add("wave");
    });
    awardBingoXP();
    setTimeout(function () { showWinModal(bingoStudent.nombre, true); }, bingoMotionOk() ? 900 : 450);
  }

  /* ============ EFECTOS VISUALES ============ */
  /* Chispas que salen de la casilla recien marcada. */
  function bingoSparkBurst(cell) {
    if (!bingoMotionOk()) return;
    var board = bingoEl("bingo-board");
    if (!board || !cell) return;
    var b = board.getBoundingClientRect();
    var c = cell.getBoundingClientRect();
    var layer = document.createElement("div");
    layer.className = "bingo-burst";
    layer.style.left = (c.left - b.left + c.width / 2) + "px";
    layer.style.top = (c.top - b.top + c.height / 2) + "px";
    var colors = ["#ffd166", "#ffffff", "#46e0a4", "#7FA8EA"];
    var n = 10;
    for (var i = 0; i < n; i++) {
      var a = (Math.PI * 2 * i) / n + Math.random() * 0.5;
      var dist = c.width * (0.75 + Math.random() * 0.65);
      var dot = document.createElement("i");
      dot.style.setProperty("--dx", Math.cos(a) * dist + "px");
      dot.style.setProperty("--dy", Math.sin(a) * dist + "px");
      dot.style.setProperty("--c", colors[i % colors.length]);
      dot.style.setProperty("--t", (0.55 + Math.random() * 0.4) + "s");
      dot.style.width = dot.style.height = (6 + Math.random() * 6) + "px";
      layer.appendChild(dot);
    }
    board.appendChild(layer);
    setTimeout(function () { if (layer.parentNode) layer.parentNode.removeChild(layer); }, 1200);
  }

  /* Confeti en capas dentro del modal + onda dorada a pantalla completa. */
  function bingoCelebrate() {
    if (!bingoMotionOk()) return;
    var wave = document.createElement("div");
    wave.className = "bingo-win-wave";
    document.body.appendChild(wave);
    setTimeout(function () { if (wave.parentNode) wave.parentNode.removeChild(wave); }, 1500);

    var host = document.querySelector("#bingo-win-modal .confetti");
    if (!host) return;
    host.innerHTML = "";
    for (var i = 0; i < 46; i++) {
      var piece = document.createElement("span");
      piece.className = "bingo-confetti-piece";
      var side = (Math.random() - 0.5) * 2;
      piece.style.setProperty("--dx", (side * (120 + Math.random() * 190)) + "px");
      piece.style.setProperty("--dy", (-140 + Math.random() * 420) + "px");
      piece.style.setProperty("--r", ((Math.random() - 0.5) * 900) + "deg");
      piece.style.setProperty("--t", (1.4 + Math.random() * 1.2) + "s");
      piece.style.setProperty("--d", (Math.random() * 0.25) + "s");
      piece.style.setProperty("--c", BINGO_CONFETTI_COLORS[i % BINGO_CONFETTI_COLORS.length]);
      if (i % 3 === 0) piece.style.borderRadius = "50%";
      host.appendChild(piece);
    }
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
    var confettiHost = document.querySelector("#bingo-win-modal .confetti");
    if (confettiHost) confettiHost.innerHTML = "";
    if (soyYo) bingoCelebrate();
  }
  function hideWinModal() { bingoEl("bingo-win-modal").hidden = true; }

  /* ============ ROSTER (avatares de todos los jugadores) ============ */
  function avatarChipHtml(p, opts) {
    opts = opts || {};
    var isNew = !!opts.isNew;
    var crown = p.wonAt ? '<span class="bingo-crown" title="Gano esta ronda">🏆</span>' : "";
    var sub = opts.showCount ? '<span class="bingo-chip-count">' + bingoMarkedCount(p) + '/' + bingoCellTotal(p) + '</span>' : "";
    return (
      '<span class="bingo-roster-chip' + (p.wonAt ? " won" : "") + (isNew ? " joined" : "") + '">' +
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
    var firstPaint = bingoKnownPlayers === null;
    var seen = bingoKnownPlayers || {};
    wrap.innerHTML = list.length
      ? list.map(function (p) {
          var isNew = !firstPaint && !seen[p.uid] && bingoMotionOk();
          return avatarChipHtml(p, { showCount: true, isNew: isNew });
        }).join("")
      : '<span class="bingo-roster-empty">Todavia no hay nadie en la sala.</span>';
    var known = {};
    list.forEach(function (p) { known[p.uid] = true; });
    bingoKnownPlayers = known;
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
    if (statusEl) {
      var modeTxt = (typeof bingoModeLabel === "function") ? " · " + bingoModeLabel(bingoSession.modo) : "";
      statusEl.textContent = (statusLabels[bingoSession.status] || "") + modeTxt;
      statusEl.dataset.status = bingoSession.status || "";
    }
    if (wordEl) wordEl.textContent = bingoSession.currentCall ? bingoCallLabel(bingoSession.currentCall) : "—";

    var called = (bingoSession.calledOrder || []).slice(-8).reverse();
    if (historyEl) {
      historyEl.innerHTML = called.map(function (key, i) {
        var fresh = i === 0 && key !== bingoLastHistoryTop && bingoLastHistoryTop !== null && bingoMotionOk();
        return '<span class="bingo-chip' + (i === 0 ? " current" : "") + (fresh ? " fresh" : "") + '">' + escapeHtmlBingo(bingoCallLabel(key)) + "</span>";
      }).join("");
    }
    bingoLastHistoryTop = called.length ? called[0] : "";

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
    speak(bingoCallSpeech(bingoSession.currentCall));
    var wordEl = bingoEl("bingo-caller-word");
    if (wordEl) {
      wordEl.classList.remove("bingo-call-pop");
      void wordEl.offsetWidth;
      wordEl.classList.add("bingo-call-pop");
      var panel = wordEl.closest(".bingo-caller-panel");
      if (panel && bingoMotionOk()) {
        panel.classList.remove("bingo-call-flash");
        void panel.offsetWidth;
        panel.classList.add("bingo-call-flash");
        setTimeout(function () { panel.classList.remove("bingo-call-flash"); }, 1000);
      }
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
      var avatarSig = bingoAvatarPick.emoji + bingoAvatarPick.color;
      var changed = preview.dataset.sig !== undefined && preview.dataset.sig !== avatarSig;
      preview.dataset.sig = avatarSig;
      preview.style.background = bingoAvatarPick.color;
      preview.textContent = bingoAvatarPick.emoji;
      if (changed && bingoMotionOk()) {
        preview.classList.remove("bump");
        void preview.offsetWidth;
        preview.classList.add("bump");
      }
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
    bingoBoardAnimKey = null;
    bingoWaveKey = null;
    bingoLastHistoryTop = null;
    bingoKnownPlayers = null;
  }

  function setupBingoListeners() {
    teardownBingoListeners();
    bingoUnsubSession = bingoSessionRef().onSnapshot(function (doc) {
      bingoSession = doc.exists ? doc.data() : null;
      renderScreen();
    }, function () { bingoSession = null; renderScreen(); });

    bingoUnsubPlayers = bingoPlayersRef().onSnapshot(function (snap) {
      var next = {};
      snap.forEach(function (d) { var v = d.data(); v.uid = d.id; next[d.id] = v; });
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
