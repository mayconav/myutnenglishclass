"use strict";
/* Memorama de verbos (Memory Match), regulares e irregulares, A1 y A2.
   Las parejas se generan al vuelo (cada partida es distinta) a partir de
   js/data/verb-puzzles-content.js, que a su vez lee js/data/verbs-content.js.
   Modos:
   - past: forma base  <->  pasado simple      (go <-> went)
   - pic : imagen (emoji de VERB_EMOJI)  <->  pasado simple
   - es  : espanol  <->  ingles (forma base)    (ir <-> go)
   Extras:
   - Las cartas "base" / "espanol" llevan el emoji del verbo (la carta pareja no, para no regalar la respuesta;
     al acertar, las dos lo muestran).
   - Las parejas halladas se desvanecen y dejan ver una escena SVG de un avion que aterriza (el avion avanza
     con el progreso, igual que la cubierta de vuelo).
   - Al terminar: aterriza el avion, aparece la tarjeta de victoria y debajo la "bitacora de vuelo" con los
     verbos de la partida (emoji, base -> pasado, traduccion; tocar un verbo lo lee en voz alta).
   Igual que el Crucigrama y la Sopa de letras: solo con sesion de alumno iniciada,
   y el XP solo se otorga a alumnos con sesion. Funciona con toque, raton y teclado. */
(function () {

  var MM_XP = 15, MM_XP_LOW = 10;
  var MISMATCH_MS = 1000, VANISH_MS = 750, WIN_DELAY_MS = 3200, WIN_DELAY_REDUCED_MS = 1000;
  var genCounter = 0;

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
    return (typeof verbArtSvg === "function" && verbArtSvg(base)) || (typeof VERB_EMOJI !== "undefined" && VERB_EMOJI[base]) || "";
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
  function speak(text, force) {
    if (!force && segValue("mm-voice", "on") !== "on") return;
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
      var pair, emo = verbEmoji(v.base);
      if (mode === "past") {
        pair = { a: { tag: "Base", text: v.base, say: v.base, emo: emo }, b: { tag: "Past", text: v.past, say: v.past } };
      } else if (mode === "pic") {
        pair = { a: { tag: "", pic: verbEmoji(v.base), text: v.base, say: "" }, b: { tag: "Past", text: v.past, say: v.past } };
      } else {
        pair = { a: { tag: "Español", text: v.es, say: "", es: true, emo: emo }, b: { tag: "English", text: v.base, say: v.base } };
      }
      pair.verb = v; pair.emo = emo;
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


  /* ============ ESCENA: avion que aterriza (se descubre al desvanecerse las parejas) ============ */
  var FUSELAGE = "M-72,-4 C-72,-20 -40,-22 20,-22 C58,-22 76,-12 76,0 C76,10 58,16 20,16 L-40,16 C-62,16 -72,8 -72,-4 Z";
  var SCENE_HTML =
    '<div class="mm-scene" aria-hidden="true">' +
    '<svg class="mm-scene-svg" viewBox="0 0 400 450" preserveAspectRatio="xMidYMid slice" focusable="false">' +
      "<defs>" +
        '<linearGradient id="mmSkyG" x1="0" y1="0" x2="0" y2="1"><stop class="sc-a" offset="0"/><stop class="sc-b" offset="1"/></linearGradient>' +
        '<radialGradient id="mmSunG"><stop offset="0" stop-color="#FFF3B0"/><stop offset="1" stop-color="#FFF3B0" stop-opacity="0"/></radialGradient>' +
        '<clipPath id="mmFus"><path d="' + FUSELAGE + '"/></clipPath>' +
      "</defs>" +
      '<rect width="400" height="450" fill="url(#mmSkyG)"/>' +
      '<circle cx="310" cy="105" r="72" fill="url(#mmSunG)"/><circle cx="310" cy="105" r="27" fill="#F7C948"/>' +
      '<g class="sc-cloud"><ellipse cx="112" cy="130" rx="38" ry="12"/><ellipse cx="134" cy="119" rx="24" ry="14"/><ellipse cx="92" cy="121" rx="19" ry="11"/></g>' +
      '<g class="sc-cloud"><ellipse cx="262" cy="64" rx="30" ry="9"/><ellipse cx="280" cy="56" rx="18" ry="10"/></g>' +
      '<g class="sc-cloud"><ellipse cx="205" cy="215" rx="34" ry="10"/><ellipse cx="224" cy="206" rx="20" ry="11"/><ellipse cx="188" cy="208" rx="16" ry="9"/></g>' +
      '<path class="sc-hill2" d="M0,338 C50,300 110,305 170,328 C230,350 300,300 400,326 L400,400 L0,400Z"/>' +
      '<path class="sc-hill1" d="M0,360 C70,336 140,346 210,358 C280,370 340,340 400,352 L400,420 L0,420Z"/>' +
      '<rect class="sc-grass" x="0" y="382" width="400" height="68"/>' +
      /* torre de control */
      '<rect x="88" y="292" width="14" height="90" fill="#E8EDF5" stroke="#B8C5DB"/>' +
      '<rect x="78" y="272" width="34" height="22" rx="3" fill="#4B79C2"/><rect x="82" y="277" width="26" height="9" fill="#CFE3FF"/>' +
      '<rect x="74" y="267" width="42" height="5" fill="#E2141B"/><path d="M95 267V248" stroke="#6B7690" stroke-width="2"/>' +
      /* terminal */
      '<rect x="255" y="338" width="84" height="44" fill="#F4F6FB" stroke="#B8C5DB"/>' +
      '<rect x="250" y="330" width="31.3" height="8" fill="#0C4EB8"/><rect x="281.3" y="330" width="31.3" height="8" fill="#E2141B"/><rect x="312.6" y="330" width="31.4" height="8" fill="#0C9C61"/>' +
      '<g fill="#6C9BE0"><rect x="263" y="350" width="11" height="12"/><rect x="278" y="350" width="11" height="12"/><rect x="293" y="350" width="11" height="12"/><rect x="308" y="350" width="11" height="12"/></g>' +
      /* pista */
      '<rect class="sc-run" x="-10" y="396" width="420" height="34"/>' +
      '<g class="sc-dash"><rect x="0" y="411" width="26" height="3"/><rect x="50" y="411" width="26" height="3"/><rect x="100" y="411" width="26" height="3"/><rect x="150" y="411" width="26" height="3"/><rect x="200" y="411" width="26" height="3"/><rect x="250" y="411" width="26" height="3"/><rect x="300" y="411" width="26" height="3"/><rect x="350" y="411" width="26" height="3"/></g>' +
      /* sombra + avion */
      '<ellipse class="mm-shadow" cx="200" cy="418" rx="72" ry="4"/>' +
      '<g transform="translate(200 377)"><g class="mm-plane-g">' +
        '<path d="M-62,-4 L-74,-36 L-52,-36 L-34,-4 Z" fill="#0C4EB8"/>' +
        '<path d="' + FUSELAGE + '" fill="#fff" stroke="#C3CEE0" stroke-width="1.2"/>' +
        '<g clip-path="url(#mmFus)"><rect x="-80" y="5" width="48" height="6" fill="#0C4EB8"/><rect x="-32" y="5" width="44" height="6" fill="#E2141B"/><rect x="12" y="5" width="70" height="6" fill="#0C9C61"/></g>' +
        '<path d="M48,-15 L62,-12 L67,-5 L48,-5 Z" fill="#274A87"/>' +
        '<g fill="#274A87"><circle cx="-44" cy="-7" r="3.2"/><circle cx="-30" cy="-7" r="3.2"/><circle cx="-16" cy="-7" r="3.2"/><circle cx="-2" cy="-7" r="3.2"/><circle cx="12" cy="-7" r="3.2"/><circle cx="26" cy="-7" r="3.2"/></g>' +
        '<path d="M-6,10 L-36,36 L-14,36 L28,10 Z" fill="#E4EBF7" stroke="#B3C0D8" stroke-width="1"/>' +
        '<rect x="6" y="20" width="24" height="11" rx="5" fill="#AEBAD0"/>' +
        '<g class="mm-gear" stroke="#4A5468" stroke-width="3" stroke-linecap="round"><path d="M-24 16V33M44 16V33"/><circle cx="-24" cy="35" r="5" fill="#2B3140"/><circle cx="44" cy="35" r="5" fill="#2B3140"/></g>' +
      "</g></g>" +
    "</svg>" +
    '<span class="mm-landed">Landing complete</span>' +
    "</div>";

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
    var boardEl = $("mm-board");
    if (boardEl) {
      boardEl.style.setProperty("--mm-p", total ? (found / total).toFixed(3) : "0");
      boardEl.classList.toggle("landed", total > 0 && found >= total);
    }
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

  function faceHtml(side, lateEmo) {
    var inner = "";
    if (side.pic) inner = '<span class="mm-pic" aria-hidden="true">' + side.pic + "</span>";
    else {
      if (side.emo) inner += '<span class="mm-emo" aria-hidden="true">' + side.emo + "</span>";
      else if (lateEmo) inner += '<span class="mm-emo mm-emo-late" aria-hidden="true">' + lateEmo + "</span>";   // solo al acertar
      inner += '<span class="mm-word' + (side.text.length >= 9 ? " long" : "") + (side.es ? " es" : "") + '">' + esc(side.text) + "</span>";
    }
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
    board.innerHTML = SCENE_HTML;
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
          '<span class="mm-face mm-front">' + faceHtml(c.data, c.emo) + "</span>" +
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
    hideRecap();
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
      cards.push({ pair: idx, side: "a", data: p.a, label: p.a.pic ? "picture of " + p.verb.base : p.a.text, say: p.a.say, emo: p.emo, verb: p.verb, up: false, matched: false, gone: false });
      cards.push({ pair: idx, side: "b", data: p.b, label: p.b.text, say: p.b.say, emo: p.emo, verb: p.verb, up: false, matched: false, gone: false });
    });
    shuffle(cards);

    mm = { cards: cards, total: pairs.length, found: 0, moves: 0, mistakes: 0, first: null, started: false, over: false,
           level: level, mode: mode, kind: kind, gen: ++genCounter, log: [] };
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

  function vanish(i) {
    var c = mm.cards[i], el = cardEl(i);
    c.gone = true;
    if (el) { el.classList.add("gone"); el.disabled = true; el.tabIndex = -1; }
  }

  function mmFlip(i) {
    if (!mm || mm.over) return;
    if (pending) resolveMismatch();            // tocar otra carta salta la espera del error
    var c = mm.cards[i];
    if (!c || c.up || c.matched || c.gone) return;

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
      mm.log.push(a.verb);
      setStatus("Match! " + a.verb.base + " → " + a.verb.past, "ok");
      deckSet();
      var gen = mm.gen;
      setTimeout(function () {                       // la pareja se desvanece y deja ver la escena
        if (!mm || mm.gen !== gen) return;
        vanish(firstIdx); vanish(i);
      }, VANISH_MS);
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
    var gen = mm.gen;
    var delay = reducedMotion() ? WIN_DELAY_REDUCED_MS : WIN_DELAY_MS;   // deja ver el aterrizaje antes de la tarjeta
    setTimeout(function () {
      if (!mm || mm.gen !== gen) return;
      showRecap();
      showWinCard(rows, lvl);
    }, delay);
  }

  function showWinCard(rows, lvl) {
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

  /* ============ BITACORA DE VUELO (resumen al terminar) ============ */
  function ensureRecap() {
    var el = $("mm-recap");
    if (el) return el;
    var wrap = document.querySelector("#view-memorama .mm-wrap");
    if (!wrap || !wrap.parentNode) return null;
    el = document.createElement("section");
    el.id = "mm-recap"; el.className = "mm-recap puz-card"; el.hidden = true;
    el.setAttribute("aria-label", "Flight log");
    wrap.parentNode.insertBefore(el, wrap.nextSibling);
    el.addEventListener("click", function (e) {
      var b = e.target.closest ? e.target.closest(".mm-tile") : null;
      if (!b) return;
      speak(b.getAttribute("data-say"), true);
    });
    return el;
  }
  function hideRecap() {
    var el = $("mm-recap");
    if (el) { el.hidden = true; el.innerHTML = ""; }
  }
  function showRecap() {
    var el = ensureRecap();
    if (!el || !mm) return;
    var tiles = mm.log.map(function (v) {
      var same = v.base === v.past;
      return '<button type="button" class="mm-tile" data-say="' + esc(v.base + ", " + v.past) + '" aria-label="' + esc(v.base + ", " + v.past + ", " + v.es + ". Tap to listen") + '">' +
        '<span class="mm-tile-emo" aria-hidden="true">' + (verbEmoji(v.base) || "✈️") + "</span>" +
        '<span class="mm-tile-verbs"><b>' + esc(v.base) + "</b>" + (same ? "" : ' <span aria-hidden="true">→</span> <b>' + esc(v.past) + "</b>") + "</span>" +
        '<span class="mm-tile-es">' + esc(v.es) + "</span>" +
        '<span class="mm-tile-kind">' + esc(v.kind) + "</span>" +
      "</button>";
    }).join("");
    el.innerHTML =
      '<h3 class="mm-recap-title">Flight log</h3>' +
      '<p class="mm-recap-sub">The verbs you matched in this flight. Tap one to hear it.</p>' +
      '<div class="mm-tiles">' + tiles + "</div>";
    el.hidden = false;
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
      var list = board.querySelectorAll(".mm-card");
      var n = list.length;
      var d = keys[e.key];
      var step = d === "u" ? -cols : d === "d" ? cols : d;
      var next = i + step;
      while (next >= 0 && next < n && list[next].disabled) next += step;   // salta cartas ya desvanecidas
      if (next < 0 || next >= n) return;
      e.preventDefault();
      list[next].focus();
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
      hideWin(); hideRecap();
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
