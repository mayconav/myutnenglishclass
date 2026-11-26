"use strict";
/* Repaso automatico de verbos (pestana "Review" dentro de Games).
   - Cada ronda tiene 8 preguntas. Se arma con las fichas que "tocan hoy" (las que el alumno
     mas falla salen primero), se completa con verbos nuevos (maximo 4 si ya hay pendientes)
     y, si aun faltan, con practica extra. Ver js/app/verb-stats.js para la regla de repaso.
   - Si la ficha es nueva o dificil: opcion multiple. Si el alumno ya la acerto varias veces:
     hay que escribirla (es mas dificil, asi se confirma que de verdad la sabe).
   - XP: 1 por acierto (+3 si la ronda sale perfecta), solo en las primeras 3 rondas de cada dia
     para que repetir sin parar no regale XP. La ronda cuenta como una actividad de la meta diaria.
   - Solo con sesion de alumno iniciada (igual que los puzzles). */
(function () {

  var SESSION_SIZE = 8;
  var MAX_NEW_WHEN_DUE = 4;
  var XP_ROUNDS_PER_DAY = 3;
  var XP_PERFECT_BONUS = 3;

  var sess = null;   // ronda en curso: { qs, idx, correct, misses, answered, done }

  /* ============ UTILIDADES ============ */
  function $(id) { return document.getElementById(id); }
  function esc(s) { return String(s).replace(/[&<>"']/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]; }); }
  function shuffle(a) {
    for (var i = a.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var t = a[i]; a[i] = a[j]; a[j] = t;
    }
    return a;
  }
  function isStudent() { return typeof bingoStudent !== "undefined" && !!bingoStudent.uid; }
  function norm(s) { return String(s || "").toLowerCase().replace(/[\u2019`]/g, "'").replace(/\s+/g, " ").trim(); }
  function emojiOf(base) { return (typeof VERB_EMOJI !== "undefined" && VERB_EMOJI[base]) || "✨"; }

  /* "was / were" acepta cualquiera de las dos (o las dos juntas) */
  function variantsOf(answer) {
    var whole = norm(answer).replace(/\s*\/\s*/g, " / ");
    var parts = whole.split(" / ").map(norm).filter(Boolean);
    return parts.length > 1 ? parts.concat([whole]) : [whole];
  }
  function isCorrect(item, typed) {
    var t = norm(typed).replace(/\s*\/\s*/g, " / ");
    return !!t && variantsOf(item.answer).indexOf(t) !== -1;
  }

  function formLabel(item) {
    if (item.sameBoth) return "Past Simple & Participle";
    return item.form === "pp" ? "Past Participle" : "Past Simple";
  }

  /* "go → went → gone" para irregulares; "study → studied" para regulares */
  function formsLine(item) {
    var v = bingoFindVerb(item.base);
    if (!v) return item.base + " → " + item.answer;
    if (!v.pp) return v.base + " → " + v.past;
    return v.base + " → " + v.past + (v.pp !== v.past ? " → " + v.pp : " (same participle)");
  }

  /* ============ ARMADO DE LA RONDA ============ */
  function buildItems() {
    var picks = [], used = {};
    function take(key) {
      if (used[key]) return false;
      var it = verbItemFromKey(key);
      if (!it) return false;
      used[key] = 1; picks.push(it); return true;
    }
    verbStatsDue().slice(0, SESSION_SIZE).forEach(function (e) { take(e.key); });

    var unseen = verbStatsUnseen();
    var quota = Math.min(SESSION_SIZE - picks.length, picks.length ? MAX_NEW_WHEN_DUE : SESSION_SIZE);
    for (var i = 0; i < unseen.length && quota > 0; i++) { if (take(unseen[i])) quota--; }

    if (picks.length < SESSION_SIZE) {                       // practica extra: lo que toca mas pronto
      var rest = verbStatsEntries().sort(function (a, b) {
        return (a.box - b.box) || (a.due < b.due ? -1 : a.due > b.due ? 1 : 0);
      });
      for (var j = 0; j < rest.length && picks.length < SESSION_SIZE; j++) take(rest[j].key);
    }
    if (picks.length < SESSION_SIZE) {                       // y si aun faltan, mas verbos nuevos
      for (var k = 0; k < unseen.length && picks.length < SESSION_SIZE; k++) take(unseen[k]);
    }
    return shuffle(picks);
  }

  /* Opciones de una pregunta: la correcta + 3 trampas realistas */
  function regularize(base) {
    if (/e$/.test(base)) return base + "d";
    if (/[^aeiou]y$/.test(base)) return base.slice(0, -1) + "ied";
    return base + "ed";
  }
  function buildOptions(item) {
    var v = bingoFindVerb(item.base) || {};
    var okForms = variantsOf(item.answer);
    var traps = [];
    function add(t) {
      var n = norm(t);
      if (!n || okForms.indexOf(n) !== -1 || traps.some(function (x) { return norm(x) === n; })) return;
      traps.push(t);
    }
    if (item.kind === "irregular") {
      add(regularize(item.base));                                   // "goed"
      if (v.pp && v.pp !== v.past) add(item.form === "pp" ? v.past : v.pp);   // confunde pasado y participio
    } else {
      add(item.base + "ed");                                         // "studyed"
      add(item.base.replace(/y$/, "ied"));                           // "studied" / "plaied"
      add(item.base + item.base.slice(-1) + "ed");                   // "stoped" vs "stopped"
      add(item.base + "d");
    }
    var others = shuffle((item.kind === "irregular" ? VERBS_IRREGULAR : VERBS_REGULAR).slice());
    for (var i = 0; i < others.length && traps.length < 6; i++) {
      var o = others[i];
      if (o.base === item.base) continue;
      add(item.form === "pp" && o.pp ? o.pp : o.past);
    }
    var opts = shuffle(traps.slice(0, 3));
    opts.push(item.answer);
    return shuffle(opts);
  }

  function makeQuestion(item) {
    var st = verbStatsStore()[item.key];
    var typed = !!(st && st.ok >= 2 && st.box >= 2);
    return { item: item, typed: typed, options: typed ? null : buildOptions(item), result: null };
  }

  /* ============ PANTALLAS ============ */
  function showOnly(id) {
    ["vr-guest", "vr-home", "vr-play", "vr-done"].forEach(function (x) { var el = $(x); if (el) el.hidden = (x !== id); });
  }

  function statTile(num, label, cls) {
    return '<div class="vr-stat ' + (cls || "") + '"><span class="vr-stat-num">' + num + '</span><span class="vr-stat-label">' + label + "</span></div>";
  }

  function renderOverview() {
    var host = $("vr-home");
    if (!host) return;
    var due = verbStatsDue().length;
    var seen = verbStatsSeenCount();
    var mastered = verbStatsMasteredCount();
    var learning = Math.max(0, seen - mastered);
    var weak = verbStatsWeakest(5);

    var lead;
    if (!seen) lead = "Start your first round. We will begin with the most useful irregular verbs.";
    else if (due) lead = due + (due === 1 ? " verb is" : " verbs are") + " ready to review today.";
    else lead = "You are all caught up. You can still practice, or come back tomorrow.";

    var weakHtml;
    if (weak.length) {
      weakHtml = '<ul class="vr-weak">' + weak.map(function (e) {
        var it = verbItemFromKey(e.key);
        return '<li><span class="vr-weak-ico" aria-hidden="true">' + emojiOf(it.base) + "</span>" +
          '<span class="vr-weak-text"><strong>' + esc(it.base) + "</strong> → " + esc(it.answer) +
          ' <em>' + (it.form === "pp" ? "participle" : "past") + "</em></span>" +
          '<span class="vr-weak-count">missed ' + e.bad + "×</span></li>";
      }).join("") + "</ul>";
    } else {
      weakHtml = '<p class="vr-empty">Nothing missed yet. The verbs you get wrong will show up here, in this game and in the Crossword.</p>';
    }

    host.innerHTML =
      '<p class="vr-lead">' + esc(lead) + "</p>" +
      '<div class="vr-stats">' + statTile(due, "Ready now", due ? "is-hot" : "") + statTile(learning, "Learning") + statTile(mastered, "Mastered", mastered ? "is-good" : "") + "</div>" +
      '<div class="vr-block"><p class="quiz-heading">Your toughest verbs</p>' + weakHtml + "</div>" +
      '<div class="vr-actions"><button type="button" class="btn btn-primary" id="vr-start">' +
      (seen ? "Start review" : "Start first round") + " · " + SESSION_SIZE + " questions</button></div>" +
      '<p class="vr-note">Right answers come back later; wrong ones come back sooner. You earn XP for your first ' + XP_ROUNDS_PER_DAY + " rounds each day.</p>";
    $("vr-start").addEventListener("click", startRound);
  }

  function startRound() {
    var items = buildItems();
    if (items.length < 3) {
      var host = $("vr-home");
      if (host) host.insertAdjacentHTML("afterbegin", '<p class="vr-empty" role="alert">There are not enough verbs to build a round yet.</p>');
      return;
    }
    sess = { qs: items.map(makeQuestion), idx: 0, correct: 0, misses: [], answered: false, done: false };
    showOnly("vr-play");
    renderQuestion();
  }

  function renderQuestion() {
    var host = $("vr-play");
    var q = sess.qs[sess.idx];
    var it = q.item;
    sess.answered = false;

    var body;
    if (q.typed) {
      body =
        '<label class="vr-ask" for="vr-input">Type the correct form</label>' +
        '<div class="vr-type"><input type="text" id="vr-input" class="vr-input" autocomplete="off" autocapitalize="none" autocorrect="off" spellcheck="false" inputmode="text" maxlength="24">' +
        '<button type="button" class="btn btn-primary" id="vr-check">Check</button></div>';
    } else {
      body = '<p class="vr-ask">Choose the correct form</p><div class="vr-opts" role="group" aria-label="Answer options">' +
        q.options.map(function (o, i) { return '<button type="button" class="vr-opt" data-i="' + i + '">' + esc(o) + "</button>"; }).join("") + "</div>";
    }

    host.innerHTML =
      '<div class="vr-progress"><div class="vr-bar" aria-hidden="true"><i style="width:' + Math.round((sess.idx / sess.qs.length) * 100) + '%"></i></div>' +
      '<span class="vr-count">' + (sess.idx + 1) + " / " + sess.qs.length + "</span></div>" +
      '<article class="vr-card">' +
      '<p class="vr-kind">' + esc(formLabel(it)) + "</p>" +
      '<p class="vr-prompt"><span class="vr-emoji" aria-hidden="true">' + emojiOf(it.base) + '</span><span class="vr-base">' + esc(it.base) + '</span> <span class="vr-es">(' + esc(it.es) + ")</span></p>" +
      body +
      '<div class="vr-feedback" id="vr-feedback" role="status" aria-live="polite"></div>' +
      '<div class="vr-actions"><button type="button" class="btn btn-primary" id="vr-next" hidden></button></div>' +
      "</article>";

    if (q.typed) {
      var input = $("vr-input");
      input.focus();
      $("vr-check").addEventListener("click", function () { answer(input.value); });
    } else {
      Array.prototype.forEach.call(host.querySelectorAll(".vr-opt"), function (b) {
        b.addEventListener("click", function () { answer(q.options[+b.getAttribute("data-i")], b); });
      });
    }
  }

  function answer(given, btn) {
    if (!sess || sess.answered) return;
    var q = sess.qs[sess.idx];
    var it = q.item;
    if (q.typed && !norm(given)) return;                     // casilla vacia: no cuenta
    var ok = isCorrect(it, given);
    sess.answered = true;
    q.result = ok;
    if (ok) sess.correct++; else sess.misses.push(it);
    verbStatsRecord(it.base, it.form, ok, true);

    var host = $("vr-play");
    if (q.typed) {
      var input = $("vr-input");
      input.readOnly = true;
      input.classList.add(ok ? "is-ok" : "is-bad");
      $("vr-check").hidden = true;
    } else {
      Array.prototype.forEach.call(host.querySelectorAll(".vr-opt"), function (b) {
        var text = q.options[+b.getAttribute("data-i")];
        b.disabled = true;
        if (isCorrect(it, text)) b.classList.add("is-ok");
        else if (b === btn) b.classList.add("is-bad");
      });
    }
    var fb = $("vr-feedback");
    fb.className = "vr-feedback " + (ok ? "is-ok" : "is-bad");
    fb.innerHTML = (ok ? "<strong>Correct!</strong> " : "<strong>Not quite.</strong> The answer is <b>" + esc(it.answer) + "</b>. ") +
      '<span class="vr-forms">' + esc(formsLine(it)) + "</span>";
    var next = $("vr-next");
    next.textContent = (sess.idx + 1 >= sess.qs.length) ? "See results" : "Next";
    next.hidden = false;
    next.focus();
    next.onclick = advance;
  }

  function advance() {
    if (!sess || !sess.answered) return;
    sess.idx++;
    if (sess.idx >= sess.qs.length) finishRound(); else renderQuestion();
  }

  /* ============ FINAL DE LA RONDA ============ */
  function finishRound() {
    sess.done = true;
    var total = sess.qs.length;
    var perfect = sess.correct === total;
    var today = localDayKey();
    var rs = state.reviewStats;
    if (!rs || typeof rs !== "object") rs = state.reviewStats = { sessions: 0, perfect: 0, day: null, xpSessions: 0 };
    if (rs.day !== today) { rs.day = today; rs.xpSessions = 0; }
    var earnsXp = rs.xpSessions < XP_ROUNDS_PER_DAY;
    var xp = earnsXp ? sess.correct + (perfect ? XP_PERFECT_BONUS : 0) : 0;
    var prevXp = state.skillsXP || 0;

    rs.sessions += 1;
    if (perfect) rs.perfect += 1;
    if (earnsXp) { rs.xpSessions += 1; state.skillsXP = prevXp + xp; }
    saveProgress(state);
    if (typeof recordDailyActivity === "function") recordDailyActivity("verb-review");

    if (xp > 0 && typeof queueReward === "function") {
      queueReward({
        kind: perfect ? "perfect" : "xp", icon: perfect ? "star" : "zap", confetti: perfect,
        title: (perfect ? "Perfect round! " : "") + "+" + xp + " XP",
        text: sess.correct + " of " + total + " verbs correct."
      });
    }
    if (typeof checkRewards === "function") checkRewards(prevXp);

    var msg = perfect ? "Flawless. Those verbs are getting solid."
      : sess.correct >= total - 2 ? "Very good. A couple of verbs will come back soon."
      : "Good practice. The verbs you missed will come back sooner.";
    var missHtml = sess.misses.length
      ? '<div class="vr-block"><p class="quiz-heading">To keep an eye on</p><ul class="vr-weak">' + sess.misses.map(function (it) {
          return '<li><span class="vr-weak-ico" aria-hidden="true">' + emojiOf(it.base) + '</span><span class="vr-weak-text"><strong>' + esc(it.base) + "</strong> → " + esc(it.answer) +
            " <em>" + (it.form === "pp" ? "participle" : "past") + "</em></span></li>";
        }).join("") + "</ul></div>"
      : "";
    var xpLine = xp > 0 ? "+" + xp + " XP earned"
      : "You already earned XP from " + XP_ROUNDS_PER_DAY + " rounds today. Keep practicing, it still strengthens your verbs.";

    var host = $("vr-done");
    host.innerHTML =
      '<div class="vr-result"><p class="vr-score"><b>' + sess.correct + "</b> / " + total + "</p>" +
      '<p class="vr-result-msg">' + esc(msg) + "</p>" +
      '<p class="vr-xp' + (xp > 0 ? " is-on" : "") + '">' + esc(xpLine) + "</p></div>" +
      missHtml +
      '<div class="vr-actions"><button type="button" class="btn btn-primary" id="vr-again">Another round</button>' +
      '<button type="button" class="btn btn-ghost-light" id="vr-back">Back to overview</button></div>';
    showOnly("vr-done");
    $("vr-again").addEventListener("click", function () { sess = null; startRound(); });
    $("vr-back").addEventListener("click", function () { sess = null; initVerbReviewView(); });
    if (typeof renderHomeExtras === "function") renderHomeExtras();
    if (typeof renderReminderCard === "function") renderReminderCard();
  }

  /* ============ ENTRADA ============ */
  function initVerbReviewView() {
    var root = $("view-repaso");
    if (!root) return;
    if (!isStudent()) {
      showOnly("vr-guest");
      var btn = $("vr-login");
      if (btn && !btn.dataset.wired) {
        btn.dataset.wired = "1";
        btn.addEventListener("click", function () {
          if (typeof window.__UTN_OPEN_GATE__ === "function") window.__UTN_OPEN_GATE__("login");
        });
      }
      return;
    }
    if (sess && !sess.done) { showOnly("vr-play"); return; }   // volver a una ronda a medias
    sess = null;
    renderOverview();
    showOnly("vr-home");
  }
  window.initVerbReviewView = initVerbReviewView;

  /* Enter avanza a la siguiente pregunta o comprueba la respuesta escrita */
  document.addEventListener("keydown", function (e) {
    if (e.key !== "Enter" || !sess || sess.done) return;
    var play = $("vr-play");
    if (!play || play.hidden) return;
    if (sess.answered) { if (document.activeElement !== $("vr-next")) { e.preventDefault(); advance(); } return; }
    var input = $("vr-input");
    if (input && document.activeElement === input) { e.preventDefault(); answer(input.value); }
  });

  /* Si cambia la sesion (login), descarta cualquier ronda anterior */
  window.addEventListener("utn:state-reloaded", function () { sess = null; });
})();
