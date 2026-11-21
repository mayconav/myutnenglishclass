"use strict";
/* Memorama de verbos (Memory Match), regulares e irregulares, A1 y A2.
   Las parejas se generan al vuelo (cada partida es distinta) a partir de
   js/data/verb-puzzles-content.js, que a su vez lee js/data/verbs-content.js.
   Modos:
   - past: forma base  <->  pasado simple      (go <-> went)
   - pic : imagen (emoji de VERB_EMOJI)  <->  pasado simple
   - es  : espanol  <->  ingles (forma base)    (ir <-> go)
   Igual que el Crucigrama y la Sopa de letras: solo con sesion de alumno iniciada,
   y el XP solo se otorga a alumnos con sesion. Funciona con toque, raton y teclado. */
(function () {

  var MM_XP = 15, MM_XP_LOW = 10;
  var MISMATCH_MS = 1000;

  /* ============ UTILIDADES ============ */
  function $(id) { return document.getElementById(id); }
  function shuffle(a) {
    for (var i = a.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var t = a[i]; a[i] = a[j]; a[j] = t;
    }
    return a;
  }
  function reducedMotion() {
    return !!(window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }
  function icon(name) { return (typeof UTNIcons !== "undefined") ? UTNIcons.svg(name) : ""; }
  function esc(s) {
    return String(s).replace(/[&<>"]/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", "\"": "&quot;" }[c];
    });
  }
  function verbEmoji(base) {
    return (typeof VERB_EMOJI !== "undefined" && VERB_EMOJI[base]) || "";
  }

  /* Controles segmentados */
  function segValue(id, fallback) {
    var seg = document.querySelector('[data-seg="' + id + '"]');
    var on = seg && seg.querySelector('[aria-checked="true"]');
    return on ? on.getAttribute("data-value") : fallback;
  }
  function wireSegs() {
    Array.prototype.forEach.call(document.querySelectorAll("#view-memorama .seg"), function (seg) {
      if (seg.dataset.wired) return;
      seg.dataset.wired = "1";
      var id = seg.getAttribute("data-seg");
      function choose(btn) {
        Array.prototype.forEach.call(seg.querySelectorAll("button"), function (b) {
          b.setAttribute("aria-checked", b === btn ? "true" : "false");
        });
        if (id === "mm-voice") { if (btn.getAttribute("data-value") !== "on" && window.speechSynthesis) { try { window.speechSynthesis.cancel(); } catch (e) {} } return; }
        mmNew();
      }
      seg.addEventListener("click", function (e) {
        var btn = e.target.closest ? e.target.closest("button") : null;
        if (btn && btn.getAttribute("aria-checked") !== "true") choose(btn);
      });
      seg.addEventListener("keydown", function (e) {
        if (e.key !== "ArrowLeft" && e.key !== "ArrowRight") return;
        var btns = Array.prototype.slice.call(seg.querySelectorAll("button"));
        var cur = btns.indexOf(document.activeElement);
        if (cur < 0) return;
        e.preventDefault();
        var nx = btns[(cur + (e.key === "ArrowRight" ? 1 : btns.length - 1)) % btns.length];
        nx.focus(); choose(nx);
      });
    });
  }

  function fillIcons() {
    Array.prototype.forEach.call(document.querySelectorAll("#view-memorama [data-icon]"), function (el) {
      if (!el.firstChild && typeof UTNIcons !== "undefined") el.innerHTML = UTNIcons.svg(el.getAttribute("data-icon"));
    });
  }

  /* Leer en voz alta (misma idea que el Bingo: voz del navegador, sin archivos de audio) */
  function speak(text) {
    if (segValue("mm-voice", "on") !== "on") return;
    if (!text || !("speechSynthesis" in window)) return;
    try {
      window.speechSynthesis.cancel();
      var u = new SpeechSynthesisUtterance(text);
      u.lang = "en-US"; u.rate = 0.9;
      window.speechSynthesis.speak(u);
    } catch (e) {}
  }

  /* ============ XP (solo alumnos con sesion) ============ */
  var mmAuthed = (typeof bingoStudent !== "undefined" && !!bingoStudent.uid);

  function awardMemoryXP(amount) {
    if (!mmAuthed || typeof state === "undefined") return false;
    var prevXp = state.skillsXP || 0;
    state.skillsXP = prevXp + amount;
    if (!state.puzzleStats) state.puzzleStats = { crosswords: 0, wordsearches: 0, memory: 0 };
    state.puzzleStats.memory = (state.puzzleStats.memory || 0) + 1;
    saveProgress(state);
    if (typeof showXpToast === "function") showXpToast(amount);
    if (typeof recordDailyActivity === "function") recordDailyActivity("puzzle:memory");
    if (typeof checkRewards === "function") checkRewards(prevXp);
    return true;
  }

  function celebrate() {
    if (typeof burstConfetti === "function") { burstConfetti(); return; }
    if (reducedMotion()) return;
    var host = document.createElement("div");
    host.className = "rw-confetti"; host.setAttribute("aria-hidden", "true");
    var colors = ["#0C4EB8", "#E2141B", "#0C9C61", "#F2C230", "#FFFFFF"];
    for (var i = 0; i < 40; i++) {
      var p = document.createElement("span");
      p.className = "rw-piece";
      p.style.setProperty("--x", ((Math.random() - 0.5) * 520) + "px");
      p.style.setProperty("--r", ((Math.random() - 0.5) * 900) + "deg");
      p.style.setProperty("--t", (1.3 + Math.random() * 1.1) + "s");
      p.style.setProperty("--d", (Math.random() * 0.18) + "s");
      p.style.setProperty("--c", colors[i % colors.length]);
      if (i % 3 === 0) p.style.borderRadius = "50%";
      host.appendChild(p);
    }
    document.body.appendChild(host);
    setTimeout(function () { if (host.parentNode) host.parentNode.removeChild(host); }, 2800);
  }

  /* ============ PAREJAS ============ */
  /* Cada pareja: { a: {kind, text, html, say}, b: {...}, verb } */
  function buildPairs(kind, level, mode, count) {
    var pool = (typeof puzzleVerbPool === "function") ? puzzleVerbPool(kind, level) : [];
    var seenEs = {}, seenEmoji = {}, out = [];
    shuffle(pool).forEach(function (v) {
      if (out.length >= count) return;
      if (!/^[a-z]+$/.test(v.base) || !/^[a-z]+$/.test(v.past)) return;   // descarta "was / were"
      if (mode === "past" && v.base === v.past) return;                    // put/put, cut/cut...: pareja ambigua
      if (mode === "es") {
        if (seenEs[v.es]) return;                                          // misma traduccion = pareja ambigua
        seenEs[v.es] = true;
      }
      if (mode === "pic") {
        var em = verbEmoji(v.base);
        if (!em || seenEmoji[em]) return;
        seenEmoji[em] = true;
      }
      var pair;
      if (mode === "past") {
        pair = { a: { tag: "Base", text: v.base, say: v.base }, b: { tag: "Past", text: v.past, say: v.past } };
      } else if (mode === "pic") {
        pair = { a: { tag: "", pic: verbEmoji(v.base), text: v.base, say: "" }, b: { tag: "Past", text: v.past, say: v.past } };
      } else {
        pair = { a: { tag: "Español", text: v.es, say: "", es: true }, b: { tag: "English", text: v.base, say: v.base } };
      }
      pair.verb = v;
      out.push(pair);
    });
    return out;
  }

  /* ============ CRONOMETRO (solo cuenta con la vista abierta) ============ */
  var clock = { ms: 0, last: 0, iv: null, on: false };
  function fmtTime(ms) {
    var s = Math.floor(ms / 1000), m = Math.floor(s / 60);
    s = s % 60;
    return m + ":" + (s < 10 ? "0" : "") + s;
  }
  function clockShow() { var el = $("mm-time"); if (el) el.textContent = fmtTime(clock.ms); }
  function viewVisible() {
    var v = $("view-memorama");
    return !!v && !v.hidden && !document.hidden;
  }
  function clockTick() {
    var now = Date.now();
    if (clock.on && viewVisible()) clock.ms += now - clock.last;
    clock.last = now;
    clockShow();
  }
  function clockReset() {
    if (clock.iv) clearInterval(clock.iv);
    clock.ms = 0; clock.on = false; clock.iv = null; clock.last = 0;
    clockShow();
  }
  function clockStart() {
    if (clock.on) return;
    clock.on = true; clock.last = Date.now();
    clock.iv = setInterval(clockTick, 250);
  }
  function clockStop() {
    if (!clock.on) return;
    clockTick();
    clock.on = false;
    clearInterval(clock.iv); clock.iv = null;
  }
  document.addEventListener("visibilitychange", function () { if (clock.on) clockTick(); });

  /* ============ JUEGO ============ */
  var mm = null;         // partida actual
  var pending = null;    // { timer, a, b } mientras dos cartas distintas siguen visibles

  function setStatus(msg, cls) {
    var el = $("mm-status");
    if (!el) return;
    el.textContent = msg || "";
    el.className = "puz-status" + (cls ? " " + cls : "");
  }

  function deckSet() {
    var found = mm ? mm.found : 0, total = mm ? mm.total : 0;
    var pct = total ? Math.round(found / total * 100) : 0;
    var cnt = $("mm-count"), mv = $("mm-moves"), fill = $("mm-fill"), plane = $("mm-plane");
    if (cnt) cnt.textContent = found + " / " + total;
    if (mv) mv.textContent = mm ? mm.moves : 0;
    if (fill) fill.style.width = pct + "%";
    if (plane) {
      var was = parseFloat(plane.style.left) || 0;
      plane.style.left = pct + "%";
      if (pct > was && !reducedMotion()) {
        plane.classList.remove("flying"); void plane.offsetWidth; plane.classList.add("flying");
      }
      var flight = plane.parentNode && plane.parentNode.parentNode;
      if (flight) flight.classList.toggle("landed", total > 0 && found >= total);
    }
  }

  function faceHtml(side) {
    var inner;
    if (side.pic) inner = '<span class="mm-pic" aria-hidden="true">' + side.pic + "</span>";
    else inner = '<span class="mm-word' + (side.text.length >= 9 ? " long" : "") + (side.es ? " es" : "") + '">' + esc(side.text) + "</span>";
    var tag = side.tag ? '<span class="mm-tag">' + esc(side.tag) + "</span>" : "";
    return inner + tag;
  }

  function cardLabel(i, c) {
    var n = "Card " + (i + 1);
    if (c.matched) return n + ": " + c.label + ", matched";
    if (c.up) return n + ": " + c.label;
    return n + ", face down";
  }

  function mmRender() {
    var board = $("mm-board");
    if (!board || !mm) return;
    board.setAttribute("data-cards", String(mm.cards.length));
    board.innerHTML = "";
    mm.cards.forEach(function (c, i) {
      var b = document.createElement("button");
      b.type = "button";
      b.className = "mm-card mm-side-" + c.side;
      b.setAttribute("data-i", String(i));
      b.setAttribute("aria-label", cardLabel(i, c));
      b.setAttribute("aria-pressed", "false");
      b.innerHTML =
        '<span class="mm-inner">' +
          '<span class="mm-face mm-back" aria-hidden="true">' + icon("plane") + "</span>" +
          '<span class="mm-face mm-front">' + faceHtml(c.data) + "</span>" +
        "</span>";
      board.appendChild(b);
    });
  }

  function cardEl(i) { return document.querySelector('#mm-board .mm-card[data-i="' + i + '"]'); }

  function paint(i) {
    var c = mm.cards[i], el = cardEl(i);
    if (!el) return;
    el.classList.toggle("up", c.up || c.matched);
    el.classList.toggle("matched", !!c.matched);
    el.setAttribute("aria-pressed", (c.up || c.matched) ? "true" : "false");
    el.setAttribute("aria-label", cardLabel(i, c));
  }

  function mmNew() {
    if (pending) { clearTimeout(pending.timer); pending = null; }
    clockReset();
    try { if (window.speechSynthesis) window.speechSynthesis.cancel(); } catch (e) {}
    hideWin();
    if (!mmAuthed) return;

    var level = segValue("mm-level", "A1");
    var kind = segValue("mm-kind", "mixed");
    var mode = segValue("mm-mode", "past");
    var count = parseInt(segValue("mm-pairs", "8"), 10) || 8;

    var pairs = buildPairs(kind, level, mode, count);
    if (pairs.length < 4) {
      mm = null;
      $("mm-board").innerHTML = "";
      deckSet();
      setStatus("Not enough verbs for this combination. Try another level or type.", "warn");
      return;
    }
    var cards = [];
    pairs.forEach(function (p, idx) {
      cards.push({ pair: idx, side: "a", data: p.a, label: p.a.pic ? "picture of " + p.verb.base : p.a.text, say: p.a.say, up: false, matched: false });
      cards.push({ pair: idx, side: "b", data: p.b, label: p.b.text, say: p.b.say, up: false, matched: false });
    });
    shuffle(cards);

    mm = { cards: cards, total: pairs.length, found: 0, moves: 0, mistakes: 0, first: null, started: false, over: false,
           level: level, mode: mode, kind: kind };
    mmRender();
    deckSet();
    updateSummary(level, kind, mode, count);
    var note = $("mm-note");
    if (note) note.textContent = "Earn +" + MM_XP + " XP for a finished game with " + mm.total + " misses or fewer (+" + MM_XP_LOW + " otherwise).";
    var hints = { past: "Match each base form with its past simple.", pic: "Match each picture with the past simple of its verb.", es: "Match each Spanish verb with its English base form." };
    setStatus(hints[mode] || "", "");
  }

  var LEVEL_TXT = { A1: "A1", A2: "A2", both: "A1 + A2" };
  var KIND_TXT = { mixed: "Mixed", regular: "Regular", irregular: "Irregular" };
  var MODE_TXT = { past: "Base + Past", pic: "Picture + Past", es: "Spanish + English" };
  function updateSummary(level, kind, mode, count) {
    var el = $("mm-sum");
    if (el) el.textContent = [LEVEL_TXT[level], KIND_TXT[kind], MODE_TXT[mode], count + " pairs"].join(" · ");
  }
  function isNarrow() { return !!(window.matchMedia && window.matchMedia("(max-width: 639px)").matches); }
  function collapseSettings() {
    var d = $("mm-settings");
    if (d && isNarrow()) d.open = false;
  }

  function resolveMismatch() {
    if (!pending) return;
    clearTimeout(pending.timer);
    var a = pending.a, b = pending.b;
    pending = null;
    if (!mm) return;
    mm.cards[a].up = false; mm.cards[b].up = false;
    [a, b].forEach(function (i) { var el = cardEl(i); if (el) el.classList.remove("wrong"); paint(i); });
    mm.first = null;
  }

  function mmFlip(i) {
    if (!mm || mm.over) return;
    if (pending) resolveMismatch();            // tocar otra carta salta la espera del error
    var c = mm.cards[i];
    if (!c || c.up || c.matched) return;

    if (!mm.started) { mm.started = true; clockStart(); }
    c.up = true; paint(i);
    if (c.say) speak(c.say);

    if (mm.first === null) { mm.first = i; return; }

    var firstIdx = mm.first, a = mm.cards[firstIdx];
    mm.moves++;
    if (a.pair === c.pair) {
      a.matched = true; c.matched = true;
      mm.first = null; mm.found++;
      paint(firstIdx); paint(i);
      setStatus("Match! " + a.label + " + " + c.label, "ok");
      deckSet();
      if (mm.found >= mm.total) mmWin();
    } else {
      mm.mistakes++;
      deckSet();
      var ea = cardEl(firstIdx), eb = cardEl(i);
      if (ea) ea.classList.add("wrong");
      if (eb) eb.classList.add("wrong");
      setStatus("Not a pair. Try again.", "warn");
      pending = { a: firstIdx, b: i, timer: setTimeout(resolveMismatch, MISMATCH_MS) };
    }
  }

  /* ============ VICTORIA (tarjeta tipo pase de abordar) ============ */
  function hideWin() { var host = $("mm-win"); if (host) { host.hidden = true; host.innerHTML = ""; } }

  function mmWin() {
    mm.over = true;
    clockStop();
    var full = mm.mistakes <= mm.total;
    var xp = full ? MM_XP : MM_XP_LOW;
    var awarded = awardMemoryXP(xp);
    celebrate();
    var lvl = mm.level === "both" ? "A1A2" : mm.level;
    var rows = [
      ["Time", fmtTime(clock.ms)],
      ["Moves", String(mm.moves)],
      ["Misses", String(mm.mistakes)],
      ["XP", awarded ? "+" + xp : "—"]
    ];
    var grid = rows.map(function (r) {
      return '<div><span class="puz-win-field">' + r[0] + '</span><span class="puz-win-value">' + r[1] + "</span></div>";
    }).join("");
    var host = $("mm-win");
    if (!host) return;
    host.innerHTML =
      '<div class="puz-win-card" role="dialog" aria-label="Memory game complete">' +
        '<div class="puz-win-main">' +
          '<p class="puz-win-label">Gate cleared</p>' +
          '<h3 class="puz-win-title">' + (mm.mistakes === 0 ? "Perfect memory!" : "Memory complete!") + "</h3>" +
          '<div class="puz-win-grid">' + grid + "</div>" +
          '<div class="puz-win-btns">' +
            '<button type="button" class="btn btn-primary btn-sm" data-win="next">Play again</button>' +
            '<button type="button" class="btn btn-ghost-light btn-sm" data-win="close">Review</button>' +
          "</div>" +
        "</div>" +
        '<div class="puz-win-stub" aria-hidden="true">' +
          '<span class="puz-win-plane">' + icon("plane") + "</span>" +
          '<span class="puz-win-barcode"></span><span class="puz-win-code">MM-' + lvl + "-" + mm.total + "</span>" +
        "</div>" +
      "</div>";
    host.hidden = false;
    var card = host.querySelector(".puz-win-card");
    if (card) { card.tabIndex = -1; card.style.outline = "none"; card.focus({ preventScroll: true }); }
  }

  /* ============ TECLADO: flechas dentro del tablero ============ */
  function wireBoard() {
    var board = $("mm-board");
    if (!board || board.dataset.wired) return;
    board.dataset.wired = "1";
    board.addEventListener("click", function (e) {
      var b = e.target.closest ? e.target.closest(".mm-card") : null;
      if (b) mmFlip(parseInt(b.getAttribute("data-i"), 10));
    });
    board.addEventListener("keydown", function (e) {
      var keys = { ArrowLeft: -1, ArrowRight: 1, ArrowUp: "u", ArrowDown: "d" };
      if (!(e.key in keys)) return;
      var b = e.target.closest ? e.target.closest(".mm-card") : null;
      if (!b) return;
      var cols = (getComputedStyle(board).gridTemplateColumns || "").split(" ").length || 1;
      var i = parseInt(b.getAttribute("data-i"), 10);
      var n = board.children.length;
      var d = keys[e.key];
      var next = d === "u" ? i - cols : d === "d" ? i + cols : i + d;
      if (next < 0 || next >= n) return;
      e.preventDefault();
      board.children[next].focus();
    });
  }

  /* ============ ARRANQUE ============ */
  function on(id, fn) { var el = $(id); if (el) el.addEventListener("click", fn); }
  on("mm-new", function () { mmNew(); collapseSettings(); });
  on("mm-new2", mmNew);
  collapseSettings();
  var winHost = $("mm-win");
  if (winHost) {
    winHost.addEventListener("click", function (e) {
      var b = e.target.closest ? e.target.closest("[data-win]") : null;
      if (!b) return;
      if (b.getAttribute("data-win") === "next") mmNew(); else hideWin();
    });
  }
  wireSegs();
  fillIcons();
  wireBoard();

  /* navigation.js lo llama al abrir la pestana; solo genera si aun no hay partida. */
  window.initMemoryView = function () {
    fillIcons();
    if (mmAuthed && !mm) mmNew();
    else if (mm && clock.on) clock.last = Date.now();   // al volver a la pestana el tiempo retoma sin saltos
  };

  /* ============ ACCESO: solo con sesion iniciada ============ */
  function applyGate() {
    var guest = $("mm-guest-screen"), content = $("mm-content");
    if (guest) guest.hidden = mmAuthed;
    if (content) content.hidden = !mmAuthed;
    if (!mmAuthed) {
      if (pending) { clearTimeout(pending.timer); pending = null; }
      mm = null;                                 // al cerrar sesion no se conserva ninguna partida
      clockReset();
      if ($("mm-board")) $("mm-board").innerHTML = "";
      hideWin();
      return;
    }
    var view = $("view-memorama");
    if (view && !view.hidden) window.initMemoryView();
  }

  var prevSetStudent = window.__UTN_BINGO_SET_STUDENT__;
  window.__UTN_BINGO_SET_STUDENT__ = function (uid, data) {
    try { if (typeof prevSetStudent === "function") prevSetStudent(uid, data); }
    catch (err) { console.error(err); }
    mmAuthed = !!uid;
    applyGate();
  };
  on("mm-guest-login-btn", function () {
    if (typeof window.__UTN_OPEN_GATE__ === "function") window.__UTN_OPEN_GATE__("login");
  });
  applyGate();

})();
