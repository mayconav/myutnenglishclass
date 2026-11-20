"use strict";
/* Crucigrama y Sopa de letras de verbos (regulares e irregulares, A1 y A2).
   Los puzzles se generan al vuelo (cada puzzle nuevo es distinto) a partir de
   js/data/verb-puzzles-content.js, que a su vez lee js/data/verbs-content.js.
   - Cada verbo lleva su imagen (emoji de VERB_EMOJI, la misma del Bingo).
   - Crucigrama: pistas "Past simple of GO (ir)" o la traduccion al espanol.
   - Sopa de letras: se arrastra (o se toca inicio y fin) sobre la palabra.
   El XP solo se otorga a alumnos con sesion iniciada; las pistas (hints) lo reducen.
   No hay boton de "revelar": el unico apoyo son las pistas de una letra. */
(function () {

  var CW_XP = 20, CW_XP_HINTS = 10, WS_XP = 15, WS_XP_HINTS = 10;
  var CW_TARGET_WORDS = 10, CW_MIN_WORDS = 6;
  var CW_MAX_COLS = 12, CW_MAX_ROWS = 14; // la cuadricula debe caber en un celular sin desplazarse de lado

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

  /* Controles segmentados (reemplazan a los <select>) */
  function segValue(id, fallback) {
    var seg = document.querySelector('[data-seg="' + id + '"]');
    var on = seg && seg.querySelector('[aria-checked="true"]');
    return on ? on.getAttribute("data-value") : fallback;
  }
  function wireSegs() {
    Array.prototype.forEach.call(document.querySelectorAll("#view-crucigrama .seg, #view-sopa .seg"), function (seg) {
      if (seg.dataset.wired) return;
      seg.dataset.wired = "1";
      var id = seg.getAttribute("data-seg"), isCw = id.indexOf("cw-") === 0;
      function choose(btn) {
        Array.prototype.forEach.call(seg.querySelectorAll("button"), function (b) {
          b.setAttribute("aria-checked", b === btn ? "true" : "false");
        });
        if (isCw) cwNew(); else wsNew();
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

  /* Iconos declarativos <span data-icon="..."> dentro de las vistas de puzzles */
  function fillIcons() {
    Array.prototype.forEach.call(document.querySelectorAll("#view-crucigrama [data-icon], #view-sopa [data-icon]"), function (el) {
      if (!el.firstChild && typeof UTNIcons !== "undefined") el.innerHTML = UTNIcons.svg(el.getAttribute("data-icon"));
    });
  }

  /* Imagen (emoji) de cada verbo: la misma tabla que usa el Bingo */
  function verbEmoji(base) {
    return (typeof VERB_EMOJI !== "undefined" && VERB_EMOJI[base]) || "✨";
  }
  function tintOf(word) {
    var s = 0;
    for (var i = 0; i < word.length; i++) s = (s * 31 + word.charCodeAt(i)) % 6;
    return s;
  }
  function icoHtml(base, big) {
    return '<span class="puz-ico pt-' + tintOf(base) + (big ? " big" : "") + '" aria-hidden="true">' + verbEmoji(base) + "</span>";
  }

  /* Fichas del puzzle: { answer (MAYUSCULAS), base, past, es, kind, level } */
  function puzzleEntries(kind, level, mode, minLen, maxLen) {
    var pool = (typeof puzzleVerbPool === "function") ? puzzleVerbPool(kind, level) : [];
    var seenAnswer = {}, seenEs = {}, out = [];
    shuffle(pool).forEach(function (v) {
      var word = (mode === "base" ? v.base : v.past);
      if (!/^[a-z]+$/.test(word)) return;               // descarta "was / were"
      if (word.length < minLen || word.length > maxLen) return;
      var answer = word.toUpperCase();
      if (seenAnswer[answer]) return;
      if (mode === "base" && seenEs[v.es]) return;      // dos verbos con la misma traduccion = pista ambigua
      seenAnswer[answer] = true; seenEs[v.es] = true;
      out.push({ answer: answer, base: v.base, past: v.past, es: v.es, kind: v.kind, level: v.level });
    });
    return out;
  }

  /* Los puzzles solo estan habilitados con sesion de alumno iniciada. */
  var puzzlesAuthed = (typeof bingoStudent !== "undefined" && !!bingoStudent.uid);

  function awardPuzzleXP(statKey, amount) {
    if (!puzzlesAuthed || typeof state === "undefined") return false;
    var prevXp = state.skillsXP || 0;
    state.skillsXP = prevXp + amount;
    if (!state.puzzleStats) state.puzzleStats = { crosswords: 0, wordsearches: 0 };
    state.puzzleStats[statKey] = (state.puzzleStats[statKey] || 0) + 1;
    saveProgress(state);
    if (typeof showXpToast === "function") showXpToast(amount);
    if (typeof recordDailyActivity === "function") recordDailyActivity("puzzle:" + statKey);
    if (typeof checkRewards === "function") checkRewards(prevXp);
    return true;
  }

  /* Confeti de la app (usa las mismas piezas .rw-piece de rewards.css) */
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

  function setStatus(el, msg, cls) {
    if (!el) return;
    el.textContent = msg || "";
    el.className = "puz-status" + (cls ? " " + cls : "");
  }

  /* ============ CRONOMETRO + CUBIERTA DE VUELO (progreso con avion) ============ */
  var clocks = { cw: { acc: 0, t0: 0, iv: null, on: false }, ws: { acc: 0, t0: 0, iv: null, on: false } };
  function fmtTime(ms) {
    var s = Math.floor(ms / 1000), m = Math.floor(s / 60);
    s = s % 60;
    return m + ":" + (s < 10 ? "0" : "") + s;
  }
  function clockMs(p) { var c = clocks[p]; return c.acc + (c.on ? Date.now() - c.t0 : 0); }
  function clockShow(p) { var el = $(p + "-time"); if (el) el.textContent = fmtTime(clockMs(p)); }
  function clockReset(p) {
    var c = clocks[p];
    if (c.iv) clearInterval(c.iv);
    c.acc = 0; c.on = false; c.iv = null;
    clockShow(p);
  }
  function clockStart(p) {
    var c = clocks[p];
    if (c.on) return;
    c.on = true; c.t0 = Date.now();
    c.iv = setInterval(function () { clockShow(p); }, 500);
  }
  function clockStop(p) {
    var c = clocks[p];
    if (!c.on) return;
    c.acc += Date.now() - c.t0; c.on = false;
    clearInterval(c.iv); c.iv = null;
    clockShow(p);
  }

  function deckSet(p, done, total, hints) {
    var pct = total ? Math.round(done / total * 100) : 0;
    var cnt = $(p + "-count"), h = $(p + "-hints"), fill = $(p + "-fill"), plane = $(p + "-plane");
    if (cnt) cnt.textContent = done + " / " + total;
    if (h) h.textContent = hints;
    if (fill) fill.style.width = pct + "%";
    if (plane) {
      var was = parseFloat(plane.style.left) || 0;
      plane.style.left = pct + "%";
      if (pct > was && !reducedMotion()) {
        plane.classList.remove("flying"); void plane.offsetWidth; plane.classList.add("flying");
      }
      var flight = plane.parentNode && plane.parentNode.parentNode;
      if (flight) flight.classList.toggle("landed", total > 0 && done >= total);
    }
  }

  /* ============ TARJETA DE VICTORIA (estilo pase de abordar) ============ */
  function showWin(p, title, rows, code) {
    var host = $(p + "-win");
    if (!host) return;
    var grid = rows.map(function (r) {
      return '<div><span class="puz-win-field">' + r[0] + '</span><span class="puz-win-value">' + r[1] + "</span></div>";
    }).join("");
    host.innerHTML =
      '<div class="puz-win-card" role="dialog" aria-label="' + title + '">' +
        '<div class="puz-win-main">' +
          '<p class="puz-win-label">Gate cleared</p>' +
          '<h3 class="puz-win-title">' + title + "</h3>" +
          '<div class="puz-win-grid">' + grid + "</div>" +
          '<div class="puz-win-btns">' +
            '<button type="button" class="btn btn-primary btn-sm" data-win="next">Next puzzle</button>' +
            '<button type="button" class="btn btn-ghost-light btn-sm" data-win="close">Review</button>' +
          "</div>" +
        "</div>" +
        '<div class="puz-win-stub" aria-hidden="true">' +
          '<span class="puz-win-plane">' + icon("plane") + "</span>" +
          '<span class="puz-win-barcode"></span><span class="puz-win-code">' + code + "</span>" +
        "</div>" +
      "</div>";
    host.hidden = false;
    var card = host.querySelector(".puz-win-card");
    if (card) { card.tabIndex = -1; card.style.outline = "none"; card.focus({ preventScroll: true }); }
  }
  function hideWin(p) { var host = $(p + "-win"); if (host) { host.hidden = true; host.innerHTML = ""; } }
  function wireWin(p, onNext) {
    var host = $(p + "-win");
    if (!host) return;
    host.addEventListener("click", function (e) {
      var b = e.target.closest ? e.target.closest("[data-win]") : null;
      if (!b) return;
      if (b.getAttribute("data-win") === "next") onNext(); else hideWin(p);
    });
  }
  function levelCode(level) { return level === "both" ? "A1A2" : level; }

  /* ======================================================================
     CRUCIGRAMA
     ====================================================================== */
  var cw = null; // puzzle actual

  function ckey(r, c) { return r + "," + c; }

  /* ¿Cabe la palabra en (r,c) en esa direccion? Devuelve # de cruces (0 = no cabe). */
  function cwCanPlace(cells, word, r, c, dir) {
    var dr = dir === "down" ? 1 : 0, dc = dir === "across" ? 1 : 0, len = word.length;
    if (cells[ckey(r - dr, c - dc)] || cells[ckey(r + dr * len, c + dc * len)]) return 0;
    var inter = 0;
    for (var i = 0; i < len; i++) {
      var rr = r + dr * i, cc = c + dc * i, ex = cells[ckey(rr, cc)];
      if (ex) {
        if (ex.ch !== word.charAt(i)) return 0;
        if (ex[dir] !== null) return 0;               // ya hay una palabra en esa misma direccion
        inter++;
      } else if (cells[ckey(rr + dc, cc + dr)] || cells[ckey(rr - dc, cc - dr)]) {
        return 0;                                     // quedaria pegada a otra palabra
      }
    }
    return inter;
  }

  function cwPlace(layout, entry, r, c, dir) {
    var dr = dir === "down" ? 1 : 0, dc = dir === "across" ? 1 : 0;
    var idx = layout.placed.length;
    for (var i = 0; i < entry.answer.length; i++) {
      var k = ckey(r + dr * i, c + dc * i);
      var cell = layout.cells[k] || (layout.cells[k] = { ch: entry.answer.charAt(i), across: null, down: null });
      cell[dir] = idx;
    }
    layout.placed.push({ entry: entry, r: r, c: c, dir: dir });
    var r2 = r + dr * (entry.answer.length - 1), c2 = c + dc * (entry.answer.length - 1);
    layout.minR = Math.min(layout.minR, r); layout.minC = Math.min(layout.minC, c);
    layout.maxR = Math.max(layout.maxR, r2); layout.maxC = Math.max(layout.maxC, c2);
  }

  function cwBestSpot(layout, entry) {
    var best = null, word = entry.answer;
    layout.placed.forEach(function (pw) {
      var pdr = pw.dir === "down" ? 1 : 0, pdc = pw.dir === "across" ? 1 : 0;
      var newDir = pw.dir === "across" ? "down" : "across";
      var ndr = newDir === "down" ? 1 : 0, ndc = newDir === "across" ? 1 : 0;
      for (var i = 0; i < pw.entry.answer.length; i++) {
        for (var j = 0; j < word.length; j++) {
          if (pw.entry.answer.charAt(i) !== word.charAt(j)) continue;
          var r = pw.r + pdr * i - ndr * j, c = pw.c + pdc * i - ndc * j;
          var inter = cwCanPlace(layout.cells, word, r, c, newDir);
          if (!inter) continue;
          var r2 = r + ndr * (word.length - 1), c2 = c + ndc * (word.length - 1);
          var h = Math.max(layout.maxR, r2) - Math.min(layout.minR, r) + 1;
          var w = Math.max(layout.maxC, c2) - Math.min(layout.minC, c) + 1;
          if (w > CW_MAX_COLS || h > CW_MAX_ROWS) continue;
          var score = inter * 20 - h * w * 0.4 - Math.abs(h - w) * 0.8 + Math.random() * 3;
          if (!best || score > best.score) best = { r: r, c: c, dir: newDir, score: score };
        }
      }
    });
    return best;
  }

  function cwBuildLayout(entries) {
    var best = null;
    for (var attempt = 0; attempt < 120; attempt++) {
      var keyed = entries.map(function (e) { return { e: e, k: e.answer.length + Math.random() * 3 }; });
      keyed.sort(function (a, b) { return b.k - a.k; });
      var queue = keyed.map(function (x) { return x.e; });
      var layout = { cells: {}, placed: [], minR: 0, minC: 0, maxR: 0, maxC: 0 };
      cwPlace(layout, queue.shift(), 0, 0, "across");
      for (var pass = 0; pass < 2 && layout.placed.length < CW_TARGET_WORDS; pass++) {
        var rest = [];
        for (var i = 0; i < queue.length; i++) {
          if (layout.placed.length >= CW_TARGET_WORDS) break;
          var spot = cwBestSpot(layout, queue[i]);
          if (spot) cwPlace(layout, queue[i], spot.r, spot.c, spot.dir); else rest.push(queue[i]);
        }
        queue = rest;
      }
      var area = (layout.maxR - layout.minR + 1) * (layout.maxC - layout.minC + 1);
      layout.score = layout.placed.length * 1000 - area;
      if (!best || layout.score > best.score) best = layout;
    }
    return best;
  }

  function cwNormalize(layout) {
    var rows = layout.maxR - layout.minR + 1, cols = layout.maxC - layout.minC + 1;
    var words = layout.placed.map(function (pw) {
      return { entry: pw.entry, answer: pw.entry.answer, r: pw.r - layout.minR, c: pw.c - layout.minC, dir: pw.dir, num: 0 };
    });
    var cells = {};
    Object.keys(layout.cells).forEach(function (k) {
      var p = k.split(","), cell = layout.cells[k];
      cells[ckey(parseInt(p[0], 10) - layout.minR, parseInt(p[1], 10) - layout.minC)] =
        { ch: cell.ch, across: cell.across, down: cell.down, num: 0 };
    });
    // numeracion en orden de lectura
    var n = 0;
    for (var r = 0; r < rows; r++) {
      for (var c = 0; c < cols; c++) {
        var cell = cells[ckey(r, c)];
        if (!cell) continue;
        var starts = false;
        [cell.across, cell.down].forEach(function (wi) {
          if (wi !== null && words[wi].r === r && words[wi].c === c) starts = true;
        });
        if (starts) {
          n++; cell.num = n;
          [cell.across, cell.down].forEach(function (wi) {
            if (wi !== null && words[wi].r === r && words[wi].c === c) words[wi].num = n;
          });
        }
      }
    }
    return { rows: rows, cols: cols, words: words, cells: cells };
  }


  function cwClueHtml(entry, mode) {
    if (mode === "base") {
      return "Translate: <strong>" + entry.es + "</strong> <span class=\"puz-len\">(" + entry.answer.length + ")</span>";
    }
    return "Past simple of <strong>" + entry.base + "</strong> <span class=\"puz-es\">(" + entry.es + ")</span> <span class=\"puz-len\">(" + entry.answer.length + ")</span>";
  }

  function cwNew() {
    if (!puzzlesAuthed) return;
    var kind = segValue("cw-kind", "mixed"), level = segValue("cw-level", "A1"), mode = segValue("cw-mode", "past");
    var entries = puzzleEntries(kind, level, mode, 3, 10).slice(0, 18);
    var board = $("cw-board");
    clockReset("cw"); hideWin("cw");
    if (entries.length < CW_MIN_WORDS) {
      cw = null;
      board.innerHTML = "";
      $("cw-clues-across").innerHTML = ""; $("cw-clues-down").innerHTML = "";
      deckSet("cw", 0, 0, 0);
      setStatus($("cw-status"), "Not enough verbs for this combination. Try another level or verb type.", "warn");
      return;
    }
    var layout = cwBuildLayout(entries);
    var norm = cwNormalize(layout);
    norm.mode = mode; norm.level = level;
    norm.dir = "across";
    norm.cur = null;
    norm.hints = 0;
    norm.solved = false;
    norm.wasCurrent = false;
    norm.words.forEach(function (w) { w.done = false; });
    cw = norm;
    cwRender();
    deckSet("cw", 0, cw.words.length, 0);
    setStatus($("cw-status"), cw.words.length + " words · pick a cell and type. Click a cell twice to switch direction.");
  }

  function cwRender() {
    var board = $("cw-board");
    board.innerHTML = "";
    board.classList.remove("cw-solved");
    board.style.setProperty("--cw-cols", cw.cols);
    board.setAttribute("aria-label", "Crossword grid, " + cw.rows + " rows by " + cw.cols + " columns");
    for (var r = 0; r < cw.rows; r++) {
      for (var c = 0; c < cw.cols; c++) {
        var cell = cw.cells[ckey(r, c)];
        var box = document.createElement("div");
        if (!cell) { box.className = "cw-blank"; board.appendChild(box); continue; }
        box.className = "cw-cell";
        box.dataset.r = r; box.dataset.c = c;
        if (cell.num) {
          var num = document.createElement("span");
          num.className = "cw-num"; num.textContent = cell.num;
          box.appendChild(num);
        }
        var input = document.createElement("input");
        input.type = "text"; input.maxLength = 2; input.autocomplete = "off";
        input.autocapitalize = "characters"; input.spellcheck = false;
        input.setAttribute("autocorrect", "off");
        input.setAttribute("aria-label", "Row " + (r + 1) + ", column " + (c + 1));
        input.dataset.r = r; input.dataset.c = c;
        box.appendChild(input);
        board.appendChild(box);
        cwWireInput(input, r, c);
      }
    }
    cwRenderClues();
    cwHighlight();
  }

  function cwRenderClues() {
    var lists = { across: $("cw-clues-across"), down: $("cw-clues-down") };
    lists.across.innerHTML = ""; lists.down.innerHTML = "";
    cw.words.map(function (w, i) { return { w: w, i: i }; })
      .sort(function (a, b) { return a.w.num - b.w.num; })
      .forEach(function (x, n) {
        var li = document.createElement("li");
        li.dataset.idx = x.i;
        li.tabIndex = 0;
        li.style.setProperty("--i", n);
        li.innerHTML = '<span class="cw-li-num">' + x.w.num + "</span>" + icoHtml(x.w.entry.base, false) +
          '<span class="cw-li-text">' + cwClueHtml(x.w.entry, cw.mode) + "</span>" +
          '<span class="cw-li-check">' + icon("check") + "</span>";
        var go = function () { cw.dir = x.w.dir; cwFocus(x.w.r, x.w.c); };
        li.addEventListener("click", go);
        li.addEventListener("keydown", function (e) { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); go(); } });
        lists[x.w.dir].appendChild(li);
      });
  }

  function cwInput(r, c) { return document.querySelector('#cw-board input[data-r="' + r + '"][data-c="' + c + '"]'); }
  function cwFocus(r, c) { var el = cwInput(r, c); if (el) el.focus(); }

  function cwWordAt(r, c, dir) {
    var cell = cw.cells[ckey(r, c)];
    return cell && cell[dir] !== null ? cell[dir] : null;
  }

  function cwSetCurrent(r, c) {
    cw.cur = { r: r, c: c };
    if (cwWordAt(r, c, cw.dir) === null) cw.dir = cw.dir === "across" ? "down" : "across";
    cwHighlight();
  }

  function cwActiveHtml(w) {
    return icoHtml(w.entry.base, true) +
      '<div class="cw-active-body"><span class="cw-active-tag">' + w.num + " " + (w.dir === "across" ? "Across" : "Down") + "</span>" +
      '<div class="cw-active-text">' + cwClueHtml(w.entry, cw.mode) + "</div></div>";
  }

  function cwHighlight() {
    var board = $("cw-board");
    board.querySelectorAll(".cw-active-word, .cw-active-cell").forEach(function (el) {
      el.classList.remove("cw-active-word", "cw-active-cell");
    });
    document.querySelectorAll("#view-crucigrama .cw-clues li.active").forEach(function (li) { li.classList.remove("active"); });
    var label = $("cw-active-clue");
    if (!cw || !cw.cur) {
      if (label && label.dataset.idx !== "none") {
        label.dataset.idx = "none";
        label.innerHTML = '<span class="puz-ico big pt-0" aria-hidden="true">🧩</span><div class="cw-active-body cw-active-idle">Pick a cell to see its clue and its picture.</div>';
      }
      return;
    }
    var wi = cwWordAt(cw.cur.r, cw.cur.c, cw.dir);
    if (wi === null) return;
    var w = cw.words[wi];
    var dr = w.dir === "down" ? 1 : 0, dc = w.dir === "across" ? 1 : 0;
    for (var i = 0; i < w.answer.length; i++) {
      var box = cwInput(w.r + dr * i, w.c + dc * i);
      if (box) box.parentNode.classList.add("cw-active-word");
    }
    var curBox = cwInput(cw.cur.r, cw.cur.c);
    if (curBox) curBox.parentNode.classList.add("cw-active-cell");
    var li = document.querySelector('#view-crucigrama .cw-clues li[data-idx="' + wi + '"]');
    if (li) {
      li.classList.add("active");
      if (li.scrollIntoView && li.parentNode && window.innerWidth > 960) {
        var box2 = li.closest(".cw-clues");
        if (box2 && (li.offsetTop < box2.scrollTop || li.offsetTop + li.offsetHeight > box2.scrollTop + box2.clientHeight)) {
          box2.scrollTop = Math.max(0, li.offsetTop - 60);
        }
      }
    }
    if (label && label.dataset.idx !== String(wi) + w.dir) {
      label.dataset.idx = String(wi) + w.dir;
      label.innerHTML = cwActiveHtml(w);        // se vuelve a crear: reinicia la animacion de la imagen
    }
  }

  function cwStep(r, c, dir, delta) {
    var dr = dir === "down" ? delta : 0, dc = dir === "across" ? delta : 0;
    var nr = r + dr, nc = c + dc;
    return cw.cells[ckey(nr, nc)] ? { r: nr, c: nc } : null;
  }

  function cwMoveArrow(r, c, key) {
    var dr = key === "ArrowDown" ? 1 : key === "ArrowUp" ? -1 : 0;
    var dc = key === "ArrowRight" ? 1 : key === "ArrowLeft" ? -1 : 0;
    var nr = r + dr, nc = c + dc;
    while (nr >= 0 && nc >= 0 && nr < cw.rows && nc < cw.cols) {
      if (cw.cells[ckey(nr, nc)]) {
        cw.dir = dc !== 0 ? "across" : "down";
        cwFocus(nr, nc);
        return;
      }
      nr += dr; nc += dc;
    }
  }

  function cwClearMarks(input) { input.parentNode.classList.remove("cw-correct", "cw-wrong"); }

  /* ¿La palabra wi esta completa y correcta? */
  function cwWordCorrect(wi) {
    var w = cw.words[wi];
    var dr = w.dir === "down" ? 1 : 0, dc = w.dir === "across" ? 1 : 0;
    for (var i = 0; i < w.answer.length; i++) {
      var inp = cwInput(w.r + dr * i, w.c + dc * i);
      if (!inp || inp.value !== w.answer.charAt(i)) return false;
    }
    return true;
  }

  function cwStamp(box, emoji) {
    if (reducedMotion()) return;
    var s = document.createElement("span");
    s.className = "cw-stamp"; s.setAttribute("aria-hidden", "true"); s.textContent = emoji;
    box.appendChild(s);
    setTimeout(function () { if (s.parentNode) s.parentNode.removeChild(s); }, 1600);
  }

  function cwWordSetDone(wi, done) {
    var w = cw.words[wi];
    w.done = done;
    var dr = w.dir === "down" ? 1 : 0, dc = w.dir === "across" ? 1 : 0;
    for (var i = 0; i < w.answer.length; i++) {
      var inp = cwInput(w.r + dr * i, w.c + dc * i);
      if (!inp) continue;
      var box = inp.parentNode;
      if (done) {
        box.style.setProperty("--wd", (i * 70) + "ms");
        box.classList.remove("cw-word-done"); void box.offsetWidth;
        box.classList.add("cw-word-done");
        box.classList.remove("cw-correct", "cw-wrong");
      } else {
        box.classList.remove("cw-word-done");
      }
    }
    var li = document.querySelector('#view-crucigrama .cw-clues li[data-idx="' + wi + '"]');
    if (li) li.classList.toggle("done", done);
    if (done) {
      var first = cwInput(w.r, w.c);
      if (first) cwStamp(first.parentNode, verbEmoji(w.entry.base));
    }
  }

  function cwRefreshWords(r, c) {
    var cell = cw.cells[ckey(r, c)];
    if (!cell) return;
    [cell.across, cell.down].forEach(function (wi) {
      if (wi === null) return;
      var ok = cwWordCorrect(wi);
      if (ok && !cw.words[wi].done) cwWordSetDone(wi, true);
      else if (!ok && cw.words[wi].done) cwWordSetDone(wi, false);
    });
    var done = cw.words.filter(function (w) { return w.done; }).length;
    deckSet("cw", done, cw.words.length, cw.hints);
  }

  function cwWireInput(input, r, c) {
    input.addEventListener("pointerdown", function () {
      cw.wasCurrent = !!(cw.cur && cw.cur.r === r && cw.cur.c === c && document.activeElement === input);
    });
    input.addEventListener("click", function () {
      if (cw.wasCurrent) {
        var other = cw.dir === "across" ? "down" : "across";
        if (cwWordAt(r, c, other) !== null) { cw.dir = other; cwHighlight(); }
      }
      cw.wasCurrent = false;
      input.select();
    });
    input.addEventListener("focus", function () { cwSetCurrent(r, c); input.select(); });
    input.addEventListener("input", function () {
      var m = input.value.match(/[a-zA-Z]/g);
      var letter = m ? m[m.length - 1].toUpperCase() : "";
      input.value = letter;
      cwClearMarks(input);
      if (cw.solved) { input.value = cw.cells[ckey(r, c)].ch; return; }
      if (letter) {
        clockStart("cw");
        input.classList.remove("cw-pop"); void input.offsetWidth; input.classList.add("cw-pop");
        var nx = cwStep(r, c, cw.dir, 1);
        if (nx && cwWordAt(nx.r, nx.c, cw.dir) === cwWordAt(r, c, cw.dir)) cwFocus(nx.r, nx.c);
      }
      cwRefreshWords(r, c);
      cwAutoCheck();
    });
    input.addEventListener("keydown", function (e) {
      if (e.key.indexOf("Arrow") === 0) { e.preventDefault(); cwMoveArrow(r, c, e.key); return; }
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        var other = cw.dir === "across" ? "down" : "across";
        if (cwWordAt(r, c, other) !== null) { cw.dir = other; cwHighlight(); }
        return;
      }
      if (e.key === "Backspace") {
        e.preventDefault();
        if (cw.solved) return;
        cwClearMarks(input);
        if (input.value) { input.value = ""; cwRefreshWords(r, c); return; }
        var pv = cwStep(r, c, cw.dir, -1);
        if (pv && cwWordAt(pv.r, pv.c, cw.dir) === cwWordAt(r, c, cw.dir)) {
          var pin = cwInput(pv.r, pv.c); pin.value = ""; cwClearMarks(pin); pin.focus();
          cwRefreshWords(pv.r, pv.c);
        }
      }
    });
  }

  function cwAllInputs() { return Array.prototype.slice.call(document.querySelectorAll("#cw-board input")); }

  function cwCheck(markOnly) {
    if (!cw) return;
    var total = 0, filled = 0, correct = 0;
    cwAllInputs().forEach(function (inp) {
      var cell = cw.cells[ckey(inp.dataset.r, inp.dataset.c)];
      total++;
      cwClearMarks(inp);
      if (!inp.value) return;
      filled++;
      if (inp.value === cell.ch) { correct++; if (!markOnly && !inp.parentNode.classList.contains("cw-word-done")) inp.parentNode.classList.add("cw-correct"); }
      else if (!markOnly) inp.parentNode.classList.add("cw-wrong");
    });
    return { total: total, filled: filled, correct: correct };
  }

  /* Se llama en cada letra: solo reacciona cuando la cuadricula esta completa. */
  function cwAutoCheck() {
    var res = cwCheck(true);
    if (res.filled < res.total) return;
    if (res.correct === res.total) cwSolved();
    else setStatus($("cw-status"), "The grid is full, but " + (res.total - res.correct) + " letter(s) are wrong. Press Check to see them.", "warn");
  }

  function cwSolved() {
    if (cw.solved) return;
    cw.solved = true;
    clockStop("cw");
    cwCheck(true);
    var board = $("cw-board");
    cwAllInputs().forEach(function (inp) {
      inp.readOnly = true;
      inp.parentNode.classList.remove("cw-active-word", "cw-active-cell", "cw-correct", "cw-wrong");
      inp.parentNode.style.setProperty("--wd", ((+inp.dataset.r + +inp.dataset.c) * 55) + "ms");
    });
    board.classList.add("cw-solved");
    deckSet("cw", cw.words.length, cw.words.length, cw.hints);
    var xp = cw.hints > 0 ? CW_XP_HINTS : CW_XP;
    var got = awardPuzzleXP("crosswords", xp);
    celebrate();
    setStatus($("cw-status"), "Crossword complete! Great job." + (got ? " +" + xp + " XP" : ""), "ok");
    setTimeout(function () {
      if (!cw || !cw.solved) return;
      showWin("cw", "Crossword complete!", [
        ["Time", fmtTime(clockMs("cw"))], ["Words", cw.words.length + " / " + cw.words.length],
        ["Hints", String(cw.hints)], ["XP earned", got ? "+" + xp : "—"]
      ], "UTN-CW-" + levelCode(cw.level));
    }, reducedMotion() ? 200 : 1100);
  }

  function cwCheckClick() {
    if (!cw || cw.solved) return;
    var res = cwCheck(false);
    if (res.filled === 0) { setStatus($("cw-status"), "Type some letters first, then press Check."); return; }
    if (res.correct === res.total) { cwSolved(); return; }
    var wrong = res.filled - res.correct;
    setStatus($("cw-status"), wrong ? wrong + " wrong letter(s) in red. Keep going!" : res.correct + " letters correct so far. Keep going!", wrong ? "warn" : "");
  }

  function cwHint() {
    if (!cw || cw.solved || !cw.cur) { setStatus($("cw-status"), "Select a cell first to get a one-letter hint."); return; }
    var inp = cwInput(cw.cur.r, cw.cur.c);
    var cell = cw.cells[ckey(cw.cur.r, cw.cur.c)];
    if (inp.value === cell.ch) return;
    clockStart("cw");
    inp.value = cell.ch; cwClearMarks(inp);
    inp.parentNode.classList.add("cw-hinted");
    inp.classList.remove("cw-pop"); void inp.offsetWidth; inp.classList.add("cw-pop");
    cw.hints++;
    setStatus($("cw-status"), "Hint used (" + cw.hints + "). Completing with hints gives less XP.");
    cwRefreshWords(cw.cur.r, cw.cur.c);
    cwAutoCheck();
  }

  function cwClear() {
    if (!cw || cw.solved) return;
    cwAllInputs().forEach(function (inp) {
      inp.value = ""; cwClearMarks(inp);
      inp.parentNode.classList.remove("cw-hinted", "cw-word-done");
    });
    cw.words.forEach(function (w, i) { w.done = false; });
    document.querySelectorAll("#view-crucigrama .cw-clues li.done").forEach(function (li) { li.classList.remove("done"); });
    deckSet("cw", 0, cw.words.length, cw.hints);
    setStatus($("cw-status"), "Cleared. Start again!");
  }

  /* ======================================================================
     SOPA DE LETRAS
     ====================================================================== */
  var ws = null;
  var WS_DIRS_EASY = [[0, 1], [1, 0]];
  var WS_DIRS_MEDIUM = [[0, 1], [1, 0], [1, 1], [-1, 1]];
  var WS_ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

  function wsBuild(entries, size, dirs) {
    var grid = [], r, c;
    for (r = 0; r < size; r++) { grid.push([]); for (c = 0; c < size; c++) grid[r].push(""); }
    var placed = [];
    var order = entries.slice().sort(function (a, b) { return b.answer.length - a.answer.length; });
    for (var i = 0; i < order.length; i++) {
      var word = order[i].answer, ok = false;
      for (var tries = 0; tries < 400 && !ok; tries++) {
        var d = dirs[Math.floor(Math.random() * dirs.length)];
        var rMin = d[0] === -1 ? word.length - 1 : 0, rMax = d[0] === 1 ? size - word.length : size - 1;
        var cMax = d[1] === 1 ? size - word.length : size - 1;
        if (rMax < rMin || cMax < 0) continue;
        var r0 = rMin + Math.floor(Math.random() * (rMax - rMin + 1));
        var c0 = Math.floor(Math.random() * (cMax + 1));
        var fits = true;
        for (var k = 0; k < word.length; k++) {
          var cur = grid[r0 + d[0] * k][c0 + d[1] * k];
          if (cur && cur !== word.charAt(k)) { fits = false; break; }
        }
        if (!fits) continue;
        for (k = 0; k < word.length; k++) grid[r0 + d[0] * k][c0 + d[1] * k] = word.charAt(k);
        placed.push({ entry: order[i], answer: word, r: r0, c: c0, dr: d[0], dc: d[1], found: false, color: placed.length % 6 });
        ok = true;
      }
      if (!ok) return null;
    }
    for (r = 0; r < size; r++) for (c = 0; c < size; c++) {
      if (!grid[r][c]) grid[r][c] = WS_ALPHABET.charAt(Math.floor(Math.random() * 26));
    }
    return { grid: grid, words: placed };
  }


  function wsNew() {
    if (!puzzlesAuthed) return;
    var kind = segValue("ws-kind", "mixed"), level = segValue("ws-level", "A1"), mode = segValue("ws-mode", "past");
    var count = level === "A1" ? 8 : 10;
    var dirs = level === "A1" ? WS_DIRS_EASY : WS_DIRS_MEDIUM;
    var all = puzzleEntries(kind, level, mode, 3, 10);
    clockReset("ws"); hideWin("ws");
    if (all.length < 6) {
      ws = null; $("ws-board").innerHTML = ""; $("ws-list").innerHTML = "";
      deckSet("ws", 0, 0, 0);
      setStatus($("ws-status"), "Not enough verbs for this combination. Try another level or verb type.", "warn");
      return;
    }
    var entries = all.slice(0, count);
    var longest = entries.reduce(function (m, e) { return Math.max(m, e.answer.length); }, 0);
    var size = level === "A1" ? Math.max(10, longest + 1) : Math.max(12, longest + 2);
    var built = null;
    for (var a = 0; a < 25 && !built; a++) built = wsBuild(entries, size, dirs);
    if (!built) { setStatus($("ws-status"), "Could not build the puzzle. Please press New puzzle again.", "warn"); return; }
    ws = { size: size, grid: built.grid, words: built.words, mode: mode, level: level, drag: null, anchor: null, sel: [], selEl: null, hints: 0, solved: false };
    wsRender();
    deckSet("ws", 0, ws.words.length, 0);
    setStatus($("ws-status"), "Find all " + ws.words.length + " words. Drag across the letters, or tap the first and last letter. Words can go " + (level === "A1" ? "across and down." : "across, down and diagonally."));
  }

  function wsCell(r, c) { return document.querySelector('#ws-board .ws-cell[data-r="' + r + '"][data-c="' + c + '"]'); }

  function wsRender() {
    var board = $("ws-board");
    board.innerHTML = "";
    board.style.setProperty("--ws-cols", ws.size);
    board.setAttribute("aria-label", "Word search grid, " + ws.size + " by " + ws.size);
    var layer = document.createElement("div");
    layer.className = "ws-layer"; layer.id = "ws-layer"; layer.setAttribute("aria-hidden", "true");
    board.appendChild(layer);
    for (var r = 0; r < ws.size; r++) for (var c = 0; c < ws.size; c++) {
      var d = document.createElement("div");
      d.className = "ws-cell"; d.dataset.r = r; d.dataset.c = c;
      d.textContent = ws.grid[r][c];
      board.appendChild(d);
    }
    var list = $("ws-list");
    list.innerHTML = "";
    ws.words.slice().sort(function (a, b) { return a.entry.base < b.entry.base ? -1 : 1; }).forEach(function (w, n) {
      var li = document.createElement("li");
      li.dataset.word = w.answer;
      li.style.setProperty("--i", n);
      li.className = "wc-" + w.color;
      li.innerHTML = wsItemHtml(w);
      list.appendChild(li);
    });
  }

  function wsItemHtml(w) {
    var clue = ws.mode === "base"
      ? '<span class="ws-clue">' + w.entry.es + "</span>"
      : '<span class="ws-clue">' + w.entry.base + '</span><span class="puz-es">(' + w.entry.es + ")</span>";
    return icoHtml(w.entry.base, false) +
      '<div class="ws-li-body">' + clue + '<span class="ws-answer">→ ' + w.answer.toLowerCase() + "</span></div>" +
      '<span class="ws-li-check">' + icon("check") + "</span>";
  }

  /* Posiciona una capsula sobre una linea de celdas (rotada segun la direccion) */
  function wsPlaceCap(el, cells) {
    var a = wsCell(cells[0].r, cells[0].c), b = wsCell(cells[cells.length - 1].r, cells[cells.length - 1].c);
    if (!a || !b) return;
    var x1 = a.offsetLeft + a.offsetWidth / 2, y1 = a.offsetTop + a.offsetHeight / 2;
    var x2 = b.offsetLeft + b.offsetWidth / 2, y2 = b.offsetTop + b.offsetHeight / 2;
    var cs = a.offsetWidth, len = Math.sqrt((x2 - x1) * (x2 - x1) + (y2 - y1) * (y2 - y1)) + cs * 0.92, h = cs * 0.86;
    el.style.width = len + "px"; el.style.height = h + "px";
    el.style.left = ((x1 + x2) / 2 - len / 2) + "px"; el.style.top = ((y1 + y2) / 2 - h / 2) + "px";
    el.style.transform = "rotate(" + Math.atan2(y2 - y1, x2 - x1) + "rad)";
  }
  function wsLayer() { return $("ws-layer"); }

  function wsProgress() {
    var found = ws.words.filter(function (w) { return w.found; }).length;
    deckSet("ws", found, ws.words.length, ws.hints);
  }

  /* Convierte (inicio, puntero) en una linea recta de celdas (8 direcciones). */
  function wsLine(r0, c0, r1, c1) {
    var dr = r1 - r0, dc = c1 - c0;
    if (dr === 0 && dc === 0) return [{ r: r0, c: c0 }];
    var step = Math.round(Math.atan2(dr, dc) / (Math.PI / 4));
    var sr = Math.round(Math.sin(step * Math.PI / 4)), sc = Math.round(Math.cos(step * Math.PI / 4));
    var len = Math.max(Math.abs(dr), Math.abs(dc));
    while (len > 0 && (r0 + sr * len < 0 || r0 + sr * len >= ws.size || c0 + sc * len < 0 || c0 + sc * len >= ws.size)) len--;
    var out = [];
    for (var i = 0; i <= len; i++) out.push({ r: r0 + sr * i, c: c0 + sc * i });
    return out;
  }

  function wsPaintSelection(cells) {
    document.querySelectorAll("#ws-board .ws-cell.sel").forEach(function (el) { el.classList.remove("sel"); });
    ws.sel = cells || [];
    ws.sel.forEach(function (p) { var el = wsCell(p.r, p.c); if (el) el.classList.add("sel"); });
    var layer = wsLayer();
    if (!layer) return;
    if (!ws.sel.length) {
      if (ws.selEl && ws.selEl.parentNode) ws.selEl.parentNode.removeChild(ws.selEl);
      ws.selEl = null;
      return;
    }
    if (!ws.selEl) { ws.selEl = document.createElement("div"); ws.selEl.className = "ws-cap sel"; layer.appendChild(ws.selEl); }
    wsPlaceCap(ws.selEl, ws.sel);
  }

  function wsCellFromPoint(x, y) {
    var el = document.elementFromPoint(x, y);
    el = el && el.closest ? el.closest(".ws-cell") : null;
    return el ? { r: parseInt(el.dataset.r, 10), c: parseInt(el.dataset.c, 10) } : null;
  }

  function wsEvaluate(cells) {
    var text = cells.map(function (p) { return ws.grid[p.r][p.c]; }).join("");
    var rev = text.split("").reverse().join("");
    var hit = null;
    ws.words.forEach(function (w) { if (!hit && !w.found && (w.answer === text || w.answer === rev)) hit = w; });
    if (hit && cells.length >= 2) wsMarkFound(hit);
    wsPaintSelection([]);
  }

  function wsMarkFound(w) {
    w.found = true;
    var cells = [];
    for (var i = 0; i < w.answer.length; i++) {
      cells.push({ r: w.r + w.dr * i, c: w.c + w.dc * i });
      var el = wsCell(w.r + w.dr * i, w.c + w.dc * i);
      if (el) {
        el.classList.add("found");
        el.style.setProperty("--wd", (i * 55) + "ms");
        el.classList.remove("bounce"); void el.offsetWidth; el.classList.add("bounce");
      }
    }
    var layer = wsLayer();
    if (layer) {
      var cap = document.createElement("div");
      cap.className = "ws-cap found wc-" + w.color;
      layer.appendChild(cap);
      wsPlaceCap(cap, cells);
      w.cap = cap; w.capCells = cells;
      if (!reducedMotion()) {
        var mid = cells[Math.floor(cells.length / 2)], me = wsCell(mid.r, mid.c);
        if (me) {
          var s = document.createElement("span");
          s.className = "ws-stamp"; s.setAttribute("aria-hidden", "true"); s.textContent = verbEmoji(w.entry.base);
          s.style.left = (me.offsetLeft + me.offsetWidth / 2) + "px"; s.style.top = (me.offsetTop + me.offsetHeight / 2) + "px";
          layer.appendChild(s);
          setTimeout(function () { if (s.parentNode) s.parentNode.removeChild(s); }, 1500);
        }
      }
    }
    var li = document.querySelector('#ws-list li[data-word="' + w.answer + '"]');
    if (li) { li.classList.remove("hinted"); li.classList.add("found"); }
    var hintCell = document.querySelector("#ws-board .ws-cell.hint-pulse");
    if (hintCell) hintCell.classList.remove("hint-pulse");
    wsProgress();
    var left = ws.words.filter(function (x) { return !x.found; }).length;
    setStatus($("ws-status"), left ? "Nice! “" + w.answer.toLowerCase() + "” found · " + left + " to go." : "", left ? "" : "ok");
    if (!left) wsSolved();
  }

  function wsSolved() {
    if (ws.solved) return;
    ws.solved = true;
    clockStop("ws");
    var xp = ws.hints > 0 ? WS_XP_HINTS : WS_XP;
    var got = awardPuzzleXP("wordsearches", xp);
    celebrate();
    setStatus($("ws-status"), "All words found! Excellent." + (got ? " +" + xp + " XP" : ""), "ok");
    setTimeout(function () {
      if (!ws || !ws.solved) return;
      showWin("ws", "Word search complete!", [
        ["Time", fmtTime(clockMs("ws"))], ["Words", ws.words.length + " / " + ws.words.length],
        ["Hints", String(ws.hints)], ["XP earned", got ? "+" + xp : "—"]
      ], "UTN-WS-" + levelCode(ws.level));
    }, reducedMotion() ? 200 : 1000);
  }

  /* Pista: ilumina la primera letra de una palabra pendiente (no la revela completa) */
  function wsHint() {
    if (!ws || ws.solved) return;
    var pending = ws.words.filter(function (w) { return !w.found; });
    if (!pending.length) return;
    var w = pending[Math.floor(Math.random() * pending.length)];
    clockStart("ws");
    document.querySelectorAll("#ws-board .ws-cell.hint-pulse").forEach(function (el) { el.classList.remove("hint-pulse"); });
    document.querySelectorAll("#ws-list li.hinted").forEach(function (el) { el.classList.remove("hinted"); });
    var el = wsCell(w.r, w.c);
    if (el) { el.classList.remove("hint-pulse"); void el.offsetWidth; el.classList.add("hint-pulse"); }
    var li = document.querySelector('#ws-list li[data-word="' + w.answer + '"]');
    if (li) li.classList.add("hinted");
    ws.hints++;
    wsProgress();
    setStatus($("ws-status"), "Hint used (" + ws.hints + "): a word starts at the glowing letter. Completing with hints gives less XP.");
  }

  function wsWireBoard() {
    var board = $("ws-board");
    if (!board || board.dataset.wired) return;
    board.dataset.wired = "1";

    board.addEventListener("pointerdown", function (e) {
      if (!ws || ws.solved) return;
      var p = wsCellFromPoint(e.clientX, e.clientY);
      if (!p) return;
      e.preventDefault();
      clockStart("ws");
      if (ws.anchor && !(ws.anchor.r === p.r && ws.anchor.c === p.c)) {
        // segundo toque: cierra la seleccion que empezo con el primer toque
        var cells = wsLine(ws.anchor.r, ws.anchor.c, p.r, p.c);
        ws.anchor = null; ws.drag = null;
        wsEvaluate(cells);
        return;
      }
      ws.anchor = null;
      ws.drag = { start: p, moved: false };
      wsPaintSelection([p]);
      try { board.setPointerCapture(e.pointerId); } catch (err) {}
    });

    board.addEventListener("pointermove", function (e) {
      if (!ws || !ws.drag) return;
      var p = wsCellFromPoint(e.clientX, e.clientY);
      if (!p) return;
      var cells = wsLine(ws.drag.start.r, ws.drag.start.c, p.r, p.c);
      if (cells.length > 1) ws.drag.moved = true;
      wsPaintSelection(cells);
    });

    function finish(e) {
      if (!ws || !ws.drag) return;
      var d = ws.drag; ws.drag = null;
      try { board.releasePointerCapture(e.pointerId); } catch (err) {}
      if (!d.moved) { ws.anchor = d.start; wsPaintSelection([d.start]); return; }  // un toque simple: espera el segundo toque
      wsEvaluate(ws.sel.slice());
    }
    board.addEventListener("pointerup", finish);
    board.addEventListener("pointercancel", function () { if (ws) { ws.drag = null; ws.anchor = null; wsPaintSelection([]); } });
  }

  /* Las capsulas dependen del tamano de celda: se recolocan al cambiar el tamano de la ventana */
  window.addEventListener("resize", function () {
    if (!ws) return;
    ws.words.forEach(function (w) { if (w.found && w.cap) wsPlaceCap(w.cap, w.capCells); });
    if (ws.selEl && ws.sel.length) wsPlaceCap(ws.selEl, ws.sel);
  });

  /* ======================================================================
     ARRANQUE (el DOM del partial ya existe cuando carga este script)
     ====================================================================== */
  function on(id, fn) { var el = $(id); if (el) el.addEventListener("click", fn); }
  on("cw-new", cwNew);
  on("cw-check", cwCheckClick);
  on("cw-hint", cwHint);
  on("cw-clear", cwClear);
  on("ws-new", wsNew);
  on("ws-hint", wsHint);
  wireWin("cw", cwNew);
  wireWin("ws", wsNew);
  wireSegs();
  fillIcons();
  wsWireBoard();

  /* navigation.js los llama al abrir cada pestana; solo generan si aun no hay puzzle. */
  window.initCrosswordView = function () { fillIcons(); if (puzzlesAuthed && !cw) cwNew(); else if (cw) { cwHighlight(); } };
  window.initWordSearchView = function () {
    fillIcons();
    if (puzzlesAuthed && !ws) wsNew();
    else if (ws) { ws.words.forEach(function (w) { if (w.found && w.cap) wsPlaceCap(w.cap, w.capCells); }); }
  };

  /* ============ ACCESO: solo con sesion iniciada ============ */
  function applyPuzzleGate() {
    [["cw", "view-crucigrama"], ["ws", "view-sopa"]].forEach(function (pair) {
      var guest = $(pair[0] + "-guest-screen"), content = $(pair[0] + "-content");
      if (guest) guest.hidden = puzzlesAuthed;
      if (content) content.hidden = !puzzlesAuthed;
    });
    if (!puzzlesAuthed) {
      cw = null; ws = null;                       // al cerrar sesion no se conserva ningun puzzle
      clockReset("cw"); clockReset("ws");
      if ($("cw-board")) $("cw-board").innerHTML = "";
      if ($("ws-board")) $("ws-board").innerHTML = "";
      hideWin("cw"); hideWin("ws");
      return;
    }
    var cwView = $("view-crucigrama"), wsView = $("view-sopa");
    if (cwView && !cwView.hidden) window.initCrosswordView();
    if (wsView && !wsView.hidden) window.initWordSearchView();
  }

  /* auth.js avisa login/logout a traves de este gancho (lo usa el Bingo); lo encadenamos. */
  var prevSetStudent = window.__UTN_BINGO_SET_STUDENT__;
  window.__UTN_BINGO_SET_STUDENT__ = function (uid, data) {
    try { if (typeof prevSetStudent === "function") prevSetStudent(uid, data); }
    catch (err) { console.error(err); }
    puzzlesAuthed = !!uid;
    applyPuzzleGate();
  };
  ["cw-guest-login-btn", "ws-guest-login-btn"].forEach(function (id) {
    on(id, function () { if (typeof window.__UTN_OPEN_GATE__ === "function") window.__UTN_OPEN_GATE__("login"); });
  });
  applyPuzzleGate();

})();
