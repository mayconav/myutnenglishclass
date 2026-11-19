"use strict";
/* Crucigrama y Sopa de letras de verbos (regulares e irregulares, A1 y A2).
   Los puzzles se generan al vuelo (cada puzzle nuevo es distinto) a partir de
   js/data/verb-puzzles-content.js, que a su vez lee js/data/verbs-content.js.
   - Crucigrama: pistas "Past simple of GO (ir)" o la traduccion al espanol.
   - Sopa de letras: se arrastra (o se toca inicio y fin) sobre la palabra.
   El XP solo se otorga a alumnos con sesion iniciada y solo si se resuelve
   sin usar "Reveal" (las pistas de una letra restan XP). */
(function () {

  var CW_XP = 20, CW_XP_HINTS = 10, WS_XP = 15;
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
  function pick(id, fallback) { var el = $(id); return el ? el.value : fallback; }

  /* Fichas del puzzle: { answer (MAYUSCULAS), clueHtml, base, past, es } */
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

  function celebrate() { if (typeof burstConfetti === "function") burstConfetti(); }

  function setStatus(el, msg, cls) {
    if (!el) return;
    el.textContent = msg || "";
    el.className = "puz-status" + (cls ? " " + cls : "");
  }

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
    var kind = pick("cw-kind", "mixed"), level = pick("cw-level", "A1"), mode = pick("cw-mode", "past");
    var entries = puzzleEntries(kind, level, mode, 3, 10).slice(0, 18);
    var board = $("cw-board");
    if (entries.length < CW_MIN_WORDS) {
      cw = null;
      board.innerHTML = "";
      setStatus($("cw-status"), "Not enough verbs for this combination. Try another level or verb type.", "warn");
      return;
    }
    var layout = cwBuildLayout(entries);
    var norm = cwNormalize(layout);
    norm.mode = mode;
    norm.dir = "across";
    norm.cur = null;
    norm.hints = 0;
    norm.revealed = false;
    norm.solved = false;
    norm.wasCurrent = false;
    cw = norm;
    cwRender();
    setStatus($("cw-status"), cw.words.length + " words · type your answers. Click a cell twice to switch direction.");
  }

  function cwRender() {
    var board = $("cw-board");
    board.innerHTML = "";
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
      .forEach(function (x) {
        var li = document.createElement("li");
        li.value = x.w.num;
        li.dataset.idx = x.i;
        li.tabIndex = 0;
        li.innerHTML = cwClueHtml(x.w.entry, cw.mode);
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

  function cwHighlight() {
    var board = $("cw-board");
    board.querySelectorAll(".cw-active-word, .cw-active-cell").forEach(function (el) {
      el.classList.remove("cw-active-word", "cw-active-cell");
    });
    document.querySelectorAll("#view-crucigrama .cw-clues li.active").forEach(function (li) { li.classList.remove("active"); });
    var label = $("cw-active-clue");
    if (!cw || !cw.cur) { if (label) label.innerHTML = "Pick a cell to see its clue."; return; }
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
    if (li) li.classList.add("active");
    if (label) label.innerHTML = "<span class=\"cw-active-num\">" + w.num + " " + (w.dir === "across" ? "Across" : "Down") + "</span> " + cwClueHtml(w.entry, cw.mode);
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
      if (cw.solved) return;
      if (letter) {
        var nx = cwStep(r, c, cw.dir, 1);
        if (nx && cwWordAt(nx.r, nx.c, cw.dir) === cwWordAt(r, c, cw.dir)) cwFocus(nx.r, nx.c);
      }
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
        cwClearMarks(input);
        if (input.value) { input.value = ""; return; }
        var pv = cwStep(r, c, cw.dir, -1);
        if (pv && cwWordAt(pv.r, pv.c, cw.dir) === cwWordAt(r, c, cw.dir)) {
          var pin = cwInput(pv.r, pv.c); pin.value = ""; cwClearMarks(pin); pin.focus();
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
      if (inp.value === cell.ch) { correct++; if (!markOnly) inp.parentNode.classList.add("cw-correct"); }
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
    cwCheck(false);
    $("cw-board").classList.add("cw-solved");
    var msg = "Crossword complete! Great job.";
    if (cw.revealed) {
      msg += " (No XP this time because answers were revealed.)";
    } else {
      var xp = cw.hints > 0 ? CW_XP_HINTS : CW_XP;
      if (awardPuzzleXP("crosswords", xp)) msg += " +" + xp + " XP";
      celebrate();
    }
    setStatus($("cw-status"), msg, "ok");
  }

  function cwCheckClick() {
    if (!cw) return;
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
    inp.value = cell.ch; cwClearMarks(inp);
    inp.parentNode.classList.add("cw-hinted");
    cw.hints++;
    setStatus($("cw-status"), "Hint used (" + cw.hints + "). Completing with hints gives less XP.");
    cwAutoCheck();
  }

  function cwReveal() {
    if (!cw) return;
    cw.revealed = true;
    cwAllInputs().forEach(function (inp) {
      inp.value = cw.cells[ckey(inp.dataset.r, inp.dataset.c)].ch;
      cwClearMarks(inp);
      inp.parentNode.classList.add("cw-revealed");
    });
    cw.solved = true;
    setStatus($("cw-status"), "Answers revealed. Press “New puzzle” to try another one.", "warn");
  }

  function cwClear() {
    if (!cw) return;
    cwAllInputs().forEach(function (inp) { inp.value = ""; cwClearMarks(inp); inp.parentNode.classList.remove("cw-hinted", "cw-revealed"); });
    $("cw-board").classList.remove("cw-solved");
    cw.solved = false;
    setStatus($("cw-status"), "Cleared. " + (cw.revealed ? "(This puzzle was revealed earlier, so it won't give XP.)" : "Start again!"));
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
    var kind = pick("ws-kind", "mixed"), level = pick("ws-level", "A1"), mode = pick("ws-mode", "past");
    var count = level === "A1" ? 8 : 10;
    var dirs = level === "A1" ? WS_DIRS_EASY : WS_DIRS_MEDIUM;
    var all = puzzleEntries(kind, level, mode, 3, 10);
    if (all.length < 6) {
      ws = null; $("ws-board").innerHTML = ""; $("ws-list").innerHTML = "";
      setStatus($("ws-status"), "Not enough verbs for this combination. Try another level or verb type.", "warn");
      return;
    }
    var entries = all.slice(0, count);
    var longest = entries.reduce(function (m, e) { return Math.max(m, e.answer.length); }, 0);
    var size = level === "A1" ? Math.max(10, longest + 1) : Math.max(12, longest + 2);
    var built = null;
    for (var a = 0; a < 25 && !built; a++) built = wsBuild(entries, size, dirs);
    if (!built) { setStatus($("ws-status"), "Could not build the puzzle. Please press New puzzle again.", "warn"); return; }
    ws = { size: size, grid: built.grid, words: built.words, mode: mode, drag: null, anchor: null, sel: [], revealed: false, solved: false };
    wsRender();
    setStatus($("ws-status"), "Find all " + ws.words.length + " words. Drag across the letters, or tap the first and last letter. Words can go " + (level === "A1" ? "across and down." : "across, down and diagonally."));
  }

  function wsCell(r, c) { return document.querySelector('#ws-board .ws-cell[data-r="' + r + '"][data-c="' + c + '"]'); }

  function wsRender() {
    var board = $("ws-board");
    board.innerHTML = "";
    board.style.setProperty("--ws-cols", ws.size);
    board.setAttribute("aria-label", "Word search grid, " + ws.size + " by " + ws.size);
    for (var r = 0; r < ws.size; r++) for (var c = 0; c < ws.size; c++) {
      var d = document.createElement("div");
      d.className = "ws-cell"; d.dataset.r = r; d.dataset.c = c;
      d.textContent = ws.grid[r][c];
      board.appendChild(d);
    }
    var list = $("ws-list");
    list.innerHTML = "";
    ws.words.slice().sort(function (a, b) { return a.entry.base < b.entry.base ? -1 : 1; }).forEach(function (w) {
      var li = document.createElement("li");
      li.dataset.word = w.answer;
      li.innerHTML = wsClueHtml(w, false);
      list.appendChild(li);
    });
    wsProgress();
  }

  function wsClueHtml(w, found) {
    if (ws.mode === "base") {
      return "<span class=\"ws-clue\">" + w.entry.es + "</span>" + (found ? " <span class=\"ws-answer\">→ " + w.answer.toLowerCase() + "</span>" : "");
    }
    return "<span class=\"ws-clue\">" + w.entry.base + "</span> <span class=\"puz-es\">(" + w.entry.es + ")</span>" +
      (found ? " <span class=\"ws-answer\">→ " + w.answer.toLowerCase() + "</span>" : "");
  }

  function wsProgress() {
    var found = ws.words.filter(function (w) { return w.found; }).length;
    var el = $("ws-progress");
    if (el) el.textContent = found + " / " + ws.words.length + " found";
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
    if (hit && cells.length >= 2) { wsMarkFound(hit, true); }
    wsPaintSelection([]);
  }

  function wsMarkFound(w, byPlayer) {
    w.found = true;
    for (var i = 0; i < w.answer.length; i++) {
      var el = wsCell(w.r + w.dr * i, w.c + w.dc * i);
      if (el) { el.classList.add("found", "fc" + w.color); if (!byPlayer) el.classList.add("revealed"); }
    }
    var li = document.querySelector('#ws-list li[data-word="' + w.answer + '"]');
    if (li) { li.classList.add("found"); li.innerHTML = wsClueHtml(w, true); }
    wsProgress();
    if (byPlayer && ws.words.every(function (x) { return x.found; })) wsSolved();
  }

  function wsSolved() {
    if (ws.solved) return;
    ws.solved = true;
    var msg = "All words found! Excellent.";
    if (ws.revealed) msg += " (No XP this time because answers were revealed.)";
    else {
      if (awardPuzzleXP("wordsearches", WS_XP)) msg += " +" + WS_XP + " XP";
      celebrate();
    }
    setStatus($("ws-status"), msg, "ok");
  }

  function wsReveal() {
    if (!ws) return;
    ws.revealed = true;
    ws.words.forEach(function (w) { if (!w.found) wsMarkFound(w, false); });
    ws.solved = true;
    setStatus($("ws-status"), "Answers revealed. Press “New puzzle” to try another one.", "warn");
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

  /* ======================================================================
     ARRANQUE (el DOM del partial ya existe cuando carga este script)
     ====================================================================== */
  function on(id, fn) { var el = $(id); if (el) el.addEventListener("click", fn); }
  on("cw-new", cwNew);
  on("cw-check", cwCheckClick);
  on("cw-hint", cwHint);
  on("cw-reveal", cwReveal);
  on("cw-clear", cwClear);
  on("ws-new", wsNew);
  on("ws-reveal", wsReveal);
  ["cw-kind", "cw-level", "cw-mode"].forEach(function (id) { var el = $(id); if (el) el.addEventListener("change", cwNew); });
  ["ws-kind", "ws-level", "ws-mode"].forEach(function (id) { var el = $(id); if (el) el.addEventListener("change", wsNew); });
  wsWireBoard();

  /* navigation.js los llama al abrir cada pestana; solo generan si aun no hay puzzle. */
  window.initCrosswordView = function () { if (puzzlesAuthed && !cw) cwNew(); };
  window.initWordSearchView = function () { if (puzzlesAuthed && !ws) wsNew(); };

  /* ============ ACCESO: solo con sesion iniciada ============ */
  function applyPuzzleGate() {
    [["cw", "view-crucigrama"], ["ws", "view-sopa"]].forEach(function (pair) {
      var guest = $(pair[0] + "-guest-screen"), content = $(pair[0] + "-content");
      if (guest) guest.hidden = puzzlesAuthed;
      if (content) content.hidden = !puzzlesAuthed;
    });
    if (!puzzlesAuthed) {
      cw = null; ws = null;                       // al cerrar sesion no se conserva ningun puzzle
      if ($("cw-board")) $("cw-board").innerHTML = "";
      if ($("ws-board")) $("ws-board").innerHTML = "";
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
