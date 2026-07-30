"use strict";
/* Renderizado de modulos, quizzes de practica y panel de gramatica (app.js original: L1929-L2481) */
  function grammarRuleCardHtml(rule) {
    var html = '<div class="grammar-rule-card">' +
      '<div class="grammar-rule-head">' +
      (rule.number ? '<span class="grammar-rule-num">' + rule.number + "</span>" : "") +
      "<h4>" + rule.title + "</h4>" +
      "</div>" +
      '<p class="grammar-rule-desc">' + rule.desc + "</p>";
    if (rule.structure) html += '<div class="grammar-rule-structure">' + rule.structure + "</div>";
    if (rule.table) html += grammarTableHtml(rule.table);
    if (rule.examples) html += grammarExamplesHtml(rule.examples);
    if (rule.table2Label) html += '<p class="grammar-rule-desc" style="margin-top:16px;"><strong>' + rule.table2Label + "</strong></p>";
    if (rule.table2) html += grammarTableHtml(rule.table2);
    if (rule.examples2) html += grammarExamplesHtml(rule.examples2);
    if (rule.tip) html += '<div class="grammar-tip-box">💡 <strong>Grammar Tip:</strong> ' + rule.tip + "</div>";
    html += "</div>";
    return html;
  }

  function grammarTableHtml(rows) {
    var html = '<div class="material-table-wrap"><table class="material-table"><thead><tr><th>Singular</th><th>Plural</th></tr></thead><tbody>';
    rows.forEach(function (r) { html += "<tr><td>" + r[0] + "</td><td>" + r[1] + "</td></tr>"; });
    html += "</tbody></table></div>";
    return html;
  }

  function grammarExamplesHtml(examples) {
    var html = '<ul class="grammar-examples">';
    examples.forEach(function (ex) { html += "<li>" + ex + "</li>"; });
    html += "</ul>";
    return html;
  }

  function renderGrammarModule(mod, eyebrow) {
    var html = '<div class="grammar-module">' +
      '<div class="grammar-module-head">' +
      '<p class="eyebrow">' + (eyebrow || "Grammar") + "</p>" +
      "<h3>" + mod.title + "</h3>" +
      "</div>";

    if (mod.objectives) {
      html += '<div class="grammar-objectives"><p>🎯 Learning Objective</p><ul>';
      mod.objectives.forEach(function (o) { html += "<li>" + o + "</li>"; });
      html += "</ul></div>";
    }

    html += '<p class="grammar-section-title">🧩 Grammar Rules</p>';
    mod.rules.forEach(function (rule) { html += grammarRuleCardHtml(rule); });

    if (mod.commonMistakes) {
      html += '<p class="grammar-section-title">⚠ Common Mistakes</p><div class="grammar-mistakes-grid">';
      mod.commonMistakes.forEach(function (pair) {
        html += '<div class="grammar-mistake"><span class="wrong">❌ ' + pair[0] + '</span><span class="right">✅ ' + pair[1] + "</span></div>";
      });
      html += "</div>";
      if (mod.commonMistakesNote) html += '<p class="grammar-mistakes-note">' + mod.commonMistakesNote + "</p>";
    }

    if (mod.quickReference) {
      html += '<p class="grammar-section-title">📄 Quick Reference Table</p>' +
        '<div class="material-table-wrap"><table class="material-table"><thead><tr><th>Ending</th><th>Rule</th><th>Example</th></tr></thead><tbody>';
      mod.quickReference.forEach(function (row) {
        html += "<tr><td>" + row[0] + "</td><td>" + row[1] + "</td><td>" + row[2] + "</td></tr>";
      });
      html += "</tbody></table></div>";
    }

    if (mod.memoryTips) {
      html += '<p class="grammar-section-title">💡 Memory Tips</p><ul class="grammar-memory-list">';
      mod.memoryTips.forEach(function (t) { html += "<li>" + t + "</li>"; });
      html += "</ul>";
    }

    html += "</div>";
    return html;
  }

  /* ---- Practice quizzes (self-checking worksheets attached to a grammar topic) ----
     All quizzes for a topic live inside ONE box (.quiz-box). A tab strip lets the
     student jump to any quiz; a sliding track (like a carousel) is used to move
     between them, and swiping left/right on touch devices does the same thing. */
  function grammarPracticeQuizBodyHtml(quiz) {
    if (quiz.type === "mc") return grammarPracticeMcQuizBodyHtml(quiz);
    return grammarPracticeFillQuizBodyHtml(quiz);
  }

  function grammarPracticeFillQuizBodyHtml(quiz) {
    var html = '<div class="practice-quiz-card" data-quiz-id="' + quiz.id + '">' +
      '<p class="quiz-heading">📝 ' + quiz.title + "</p>" +
      '<p class="practice-quiz-instructions">' + quiz.instructions + "</p>";

    if (quiz.example) {
      html += '<p class="practice-quiz-example"><em>Example: ' +
        (quiz.example.article ? quiz.example.article + " " : "") + quiz.example.text +
        " &rArr; " + quiz.example.prefix + quiz.example.result + quiz.example.suffix + "</em></p>";
    }

    html += '<div class="practice-quiz-items">';
    quiz.items.forEach(function (item, ii) {
      html += '<div class="practice-quiz-row">' +
        '<span class="practice-quiz-num">' + (ii + 1) + ".</span>";
      if (item.article) {
        html += '<span class="practice-blank-wrap">' +
          '<input type="text" class="fill-input practice-blank practice-blank-article" ' +
          'data-quiz="' + quiz.id + '" data-item="' + ii + '" data-kind="article" autocomplete="off" placeholder="a/an">' +
          '<span class="practice-feedback" data-quiz="' + quiz.id + '" data-item="' + ii + '" data-kind="article"></span>' +
          "</span>";
      }
      html += ' <span class="practice-quiz-text">' + item.text + '</span> <span class="practice-quiz-arrow">&rArr;</span> ';
      if (item.prefix) html += '<span class="practice-quiz-text">' + item.prefix + "</span>";
      html += '<span class="practice-blank-wrap">' +
        '<input type="text" class="fill-input practice-blank" ' +
        'data-quiz="' + quiz.id + '" data-item="' + ii + '" data-kind="plural" autocomplete="off" placeholder="plural">' +
        '<span class="practice-feedback" data-quiz="' + quiz.id + '" data-item="' + ii + '" data-kind="plural"></span>' +
        "</span>";
      if (item.suffix) html += '<span class="practice-quiz-text">' + item.suffix + "</span>";
      html += "</div>";
    });
    html += "</div>";

    html += '<div class="practice-quiz-actions">' +
      '<button class="btn btn-primary practice-check-btn" type="button" data-quiz="' + quiz.id + '">✓ Check Answers</button>' +
      '<button class="btn btn-ghost-light practice-reset-btn" type="button" data-quiz="' + quiz.id + '">↺ Reset</button>' +
      "</div>" +
      '<p class="practice-quiz-result" id="practice-result-' + quiz.id + '" hidden></p>' +
      "</div>";
    return html;
  }

  /* Multiple-choice practice quiz (e.g. Adjectives quizzes): pick one option per
     question, then Check Answers reveals correct/incorrect for every question at once. */
  function grammarPracticeMcQuizBodyHtml(quiz) {
    var html = '<div class="practice-quiz-card" data-quiz-id="' + quiz.id + '" data-quiz-type="mc">' +
      '<p class="quiz-heading">📝 ' + quiz.title + "</p>" +
      '<p class="practice-quiz-instructions">' + quiz.instructions + "</p>" +
      '<div class="practice-mcq-list">';

    quiz.questions.forEach(function (q, qi) {
      html += '<div class="practice-mcq-item" data-quiz="' + quiz.id + '" data-item="' + qi + '">' +
        '<p class="practice-mcq-q"><span class="practice-quiz-num">' + (qi + 1) + ".</span> " + q.text + "</p>" +
        '<div class="quiz-options practice-mcq-options">' +
        q.options.map(function (opt, oi) {
          return '<button type="button" class="quiz-option" data-quiz="' + quiz.id + '" data-item="' + qi + '" data-option="' + oi + '">' +
            String.fromCharCode(97 + oi) + ") " + opt + "</button>";
        }).join("") +
        "</div>" +
        '<p class="practice-feedback practice-mcq-feedback" data-quiz="' + quiz.id + '" data-item="' + qi + '"></p>' +
        "</div>";
    });

    html += "</div>";
    html += '<div class="practice-quiz-actions">' +
      '<button class="btn btn-primary practice-check-btn" type="button" data-quiz="' + quiz.id + '">✓ Check Answers</button>' +
      '<button class="btn btn-ghost-light practice-reset-btn" type="button" data-quiz="' + quiz.id + '">↺ Reset</button>' +
      "</div>" +
      '<p class="practice-quiz-result" id="practice-result-' + quiz.id + '" hidden></p>' +
      "</div>";
    return html;
  }

  function quizTabLabel(quiz, i) {
    return '<span class="quiz-tab-num">' + (i + 1) + "</span>" +
      '<span class="quiz-tab-label">' + (quiz.short || quiz.title) + "</span>";
  }

  function grammarPracticeBoxHtml(slug, quizzes) {
    var tabsHtml = quizzes.map(function (q, i) {
      return '<button type="button" class="quiz-tab' + (i === 0 ? " active" : "") + '" ' +
        'data-index="' + i + '" role="tab" aria-selected="' + (i === 0 ? "true" : "false") + '">' +
        quizTabLabel(q, i) + "</button>";
    }).join("");

    var slidesHtml = quizzes.map(function (q) {
      return '<div class="quiz-slide">' + grammarPracticeQuizBodyHtml(q) + "</div>";
    }).join("");

    var hasFill = quizzes.some(function (q) { return q.type !== "mc"; });
    var hasMc = quizzes.some(function (q) { return q.type === "mc"; });
    var howtoAction = hasFill && hasMc
      ? "fill in every blank or choose an option for each question"
      : hasMc ? "choose one option for every question" : "fill in every blank";

    return '<div class="quiz-box" id="quizbox-' + slug + '" data-slug="' + slug + '">' +
      '<div class="quiz-box-tabs" role="tablist" aria-label="Choose a quiz">' + tabsHtml + "</div>" +
      '<div class="quiz-box-howto">' +
        '<span class="quiz-box-howto-icon">💡</span>' +
        '<span><strong>How to do this exercise:</strong> ' + howtoAction + ', then press <strong>Check Answers</strong> ' +
        '(or hit <strong>Enter</strong> after the last blank). Correct answers turn green ✓ — incorrect ones turn red ✗ ' +
        "and show you the right answer. Tap a tab above, swipe, or use the arrows below to move to the next quiz.</span>" +
      "</div>" +
      '<div class="quiz-box-viewport"><div class="quiz-box-track">' + slidesHtml + "</div></div>" +
      '<div class="quiz-box-nav">' +
        '<button type="button" class="quiz-nav-btn quiz-nav-prev" disabled>‹ Previous</button>' +
        '<span class="quiz-box-progress">Quiz 1 of ' + quizzes.length + "</span>" +
        '<button type="button" class="quiz-nav-btn quiz-nav-next"' + (quizzes.length < 2 ? " disabled" : "") + ">Next ›</button>" +
      "</div>" +
    "</div>";
  }

  /* Wires up the tab strip + sliding track + swipe gestures for one quiz box. */
  function initQuizBox(slug) {
    var box = document.getElementById("quizbox-" + slug);
    if (!box) return;
    var track = box.querySelector(".quiz-box-track");
    var viewport = box.querySelector(".quiz-box-viewport");
    var tabs = Array.prototype.slice.call(box.querySelectorAll(".quiz-tab"));
    var slides = Array.prototype.slice.call(box.querySelectorAll(".quiz-slide"));
    var prevBtn = box.querySelector(".quiz-nav-prev");
    var nextBtn = box.querySelector(".quiz-nav-next");
    var progressEl = box.querySelector(".quiz-box-progress");
    var current = 0;

    function setHeight() {
      viewport.style.height = slides[current].offsetHeight + "px";
    }
    box.refreshQuizHeight = setHeight;

    function goTo(i) {
      if (i < 0 || i >= slides.length || i === current) {
        if (i >= 0 && i < slides.length) current = i;
        return;
      }
      current = i;
      track.style.transform = "translateX(-" + (i * 100) + "%)";
      tabs.forEach(function (t, ti) {
        t.classList.toggle("active", ti === i);
        t.setAttribute("aria-selected", ti === i ? "true" : "false");
      });
      prevBtn.disabled = i === 0;
      nextBtn.disabled = i === slides.length - 1;
      progressEl.textContent = "Quiz " + (i + 1) + " of " + slides.length;
      requestAnimationFrame(setHeight);
    }

    tabs.forEach(function (tab, i) { tab.addEventListener("click", function () { goTo(i); }); });
    prevBtn.addEventListener("click", function () { goTo(current - 1); });
    nextBtn.addEventListener("click", function () { goTo(current + 1); });

    var startX = null, startY = null;
    viewport.addEventListener("touchstart", function (e) {
      startX = e.touches[0].clientX;
      startY = e.touches[0].clientY;
    }, { passive: true });
    viewport.addEventListener("touchend", function (e) {
      if (startX === null) return;
      var dx = e.changedTouches[0].clientX - startX;
      var dy = e.changedTouches[0].clientY - startY;
      if (Math.abs(dx) > 45 && Math.abs(dx) > Math.abs(dy)) {
        goTo(current + (dx < 0 ? 1 : -1));
      }
      startX = null; startY = null;
    });

    window.addEventListener("resize", function () {
      if (!box.isConnected) return;
      setHeight();
    });

    setHeight();
  }

  function initGrammarPracticeQuizzes(container, quizzes) {
    (quizzes || []).forEach(function (quiz) {
      var card = container.querySelector('.practice-quiz-card[data-quiz-id="' + quiz.id + '"]');
      if (!card) return;
      if (quiz.type === "mc") initMcPracticeQuiz(card, quiz);
      else initFillPracticeQuiz(card, quiz);
    });
  }

  /* Small edit-distance helper: used to tell the student "so close!" when their
     answer is off by a letter or two, instead of just marking it wrong. */
  function levenshtein(a, b) {
    if (a === b) return 0;
    if (!a.length) return b.length;
    if (!b.length) return a.length;
    var prev = [];
    for (var j = 0; j <= b.length; j++) prev[j] = j;
    for (var i = 1; i <= a.length; i++) {
      var cur = [i];
      for (j = 1; j <= b.length; j++) {
        cur[j] = a[i - 1] === b[j - 1]
          ? prev[j - 1]
          : 1 + Math.min(prev[j - 1], prev[j], cur[j - 1]);
      }
      prev = cur;
    }
    return prev[b.length];
  }

  function initFillPracticeQuiz(card, quiz) {
    var checkBtn = card.querySelector(".practice-check-btn");
    var resetBtn = card.querySelector(".practice-reset-btn");
    var resultEl = card.querySelector(".practice-quiz-result");
    var quizBox = card.closest(".quiz-box");

    function refreshHeight() {
      if (quizBox && quizBox.refreshQuizHeight) requestAnimationFrame(quizBox.refreshQuizHeight);
    }

    function setFieldFeedback(kind, ii, ok, correctText, userVal, rule) {
      var span = card.querySelector('.practice-feedback[data-item="' + ii + '"][data-kind="' + kind + '"]');
      if (!span) return;
      span.classList.remove("ok", "bad");
      span.innerHTML = "";
      if (ok) {
        span.classList.add("ok");
        span.textContent = "✓";
        return;
      }
      span.classList.add("bad");

      var lead;
      if (!userVal) {
        lead = "✗ Left blank — correct: " + correctText;
      } else if (levenshtein(userVal, correctText.toLowerCase()) <= 1) {
        lead = "✗ So close! Correct: " + correctText;
      } else {
        lead = "✗ Correct: " + correctText;
      }
      span.appendChild(document.createTextNode(lead));
      if (rule && kind === "plural") {
        var ruleEl = document.createElement("span");
        ruleEl.className = "feedback-rule";
        ruleEl.textContent = " — " + rule;
        span.appendChild(ruleEl);
      }
    }

    var blankInputs = Array.prototype.slice.call(card.querySelectorAll(".practice-blank"));
    blankInputs.forEach(function (input, i) {
      input.addEventListener("keydown", function (e) {
        if (e.key === "Enter") {
          e.preventDefault();
          if (i < blankInputs.length - 1) blankInputs[i + 1].focus();
          else checkBtn.click();
        }
      });
    });

    checkBtn.addEventListener("click", function () {
      var total = 0;
      var correct = 0;
      var missedRules = [];
      quiz.items.forEach(function (item, ii) {
        var pluralInput = card.querySelector('.practice-blank[data-item="' + ii + '"][data-kind="plural"]');
        total++;
        var pluralVal = pluralInput.value.trim().toLowerCase();
        var pluralOk = item.answers.some(function (a) { return a.toLowerCase() === pluralVal; });
        pluralInput.classList.remove("correct", "incorrect");
        pluralInput.classList.add(pluralOk ? "correct" : "incorrect");
        pluralInput.disabled = true;
        setFieldFeedback("plural", ii, pluralOk, item.answers[0], pluralVal, item.rule);
        if (pluralOk) correct++;
        else if (item.rule && missedRules.indexOf(item.rule) === -1) missedRules.push(item.rule);

        if (item.article) {
          var articleInput = card.querySelector('.practice-blank[data-item="' + ii + '"][data-kind="article"]');
          total++;
          var articleVal = articleInput.value.trim().toLowerCase();
          var articleOk = item.article.indexOf(articleVal) !== -1;
          articleInput.classList.remove("correct", "incorrect");
          articleInput.classList.add(articleOk ? "correct" : "incorrect");
          articleInput.disabled = true;
          setFieldFeedback("article", ii, articleOk, item.article[0], articleVal, null);
          if (articleOk) correct++;
        }
      });
      checkBtn.disabled = true;
      resultEl.hidden = false;
      resultEl.classList.remove("perfect", "great", "needs-work");
      var pct = total ? correct / total : 1;
      var msg = "";
      if (pct === 1) {
        msg = "🎉 Perfect! " + correct + " out of " + total + " correct.";
        resultEl.classList.add("perfect");
      } else if (pct >= 0.7) {
        msg = "💪 Great job — " + correct + " out of " + total + " correct. Check the notes next to the red answers to close the gap.";
        resultEl.classList.add("great");
      } else {
        msg = "You got " + correct + " out of " + total + " correct. Review the red answers above, then try Reset to practice again.";
        resultEl.classList.add("needs-work");
      }
      if (missedRules.length) {
        msg += " Focus on: " + missedRules.join("; ") + ".";
      }
      resultEl.textContent = msg;
      refreshHeight();
    });

    resetBtn.addEventListener("click", function () {
      blankInputs.forEach(function (input) {
        input.value = "";
        input.disabled = false;
        input.classList.remove("correct", "incorrect");
      });
      Array.prototype.slice.call(card.querySelectorAll(".practice-feedback")).forEach(function (span) {
        span.textContent = "";
        span.classList.remove("ok", "bad");
      });
      checkBtn.disabled = false;
      resultEl.hidden = true;
      if (blankInputs[0]) blankInputs[0].focus();
      refreshHeight();
    });
  }

  /* Multiple-choice practice quiz: single-select per question, whole quiz graded at once. */
  function initMcPracticeQuiz(card, quiz) {
    var checkBtn = card.querySelector(".practice-check-btn");
    var resetBtn = card.querySelector(".practice-reset-btn");
    var resultEl = card.querySelector(".practice-quiz-result");
    var quizBox = card.closest(".quiz-box");
    var items = Array.prototype.slice.call(card.querySelectorAll(".practice-mcq-item"));

    function refreshHeight() {
      if (quizBox && quizBox.refreshQuizHeight) requestAnimationFrame(quizBox.refreshQuizHeight);
    }

    items.forEach(function (item) {
      var buttons = Array.prototype.slice.call(item.querySelectorAll(".quiz-option"));
      buttons.forEach(function (btn) {
        btn.addEventListener("click", function () {
          if (btn.disabled) return;
          buttons.forEach(function (b) { b.classList.remove("selected"); });
          btn.classList.add("selected");
          var feedback = item.querySelector(".practice-mcq-feedback");
          feedback.textContent = "";
          feedback.className = "practice-feedback practice-mcq-feedback";
        });
      });
    });

    checkBtn.addEventListener("click", function () {
      var total = quiz.questions.length;
      var missing = [];
      quiz.questions.forEach(function (q, qi) {
        var item = card.querySelector('.practice-mcq-item[data-item="' + qi + '"]');
        if (!item.querySelector(".quiz-option.selected")) missing.push(qi);
      });

      if (missing.length) {
        missing.forEach(function (qi) {
          var item = card.querySelector('.practice-mcq-item[data-item="' + qi + '"]');
          var feedback = item.querySelector(".practice-mcq-feedback");
          feedback.textContent = "⚠ Choose an answer for this question.";
          feedback.className = "practice-feedback practice-mcq-feedback bad";
        });
        resultEl.hidden = false;
        resultEl.classList.remove("perfect");
        resultEl.classList.add("needs-work");
        resultEl.textContent = "Please answer all " + total + " questions before checking.";
        refreshHeight();
        return;
      }

      var correct = 0;
      quiz.questions.forEach(function (q, qi) {
        var item = card.querySelector('.practice-mcq-item[data-item="' + qi + '"]');
        var buttons = Array.prototype.slice.call(item.querySelectorAll(".quiz-option"));
        var selected = item.querySelector(".quiz-option.selected");
        var selOi = parseInt(selected.dataset.option, 10);
        var ok = selOi === q.correct;
        buttons.forEach(function (b) {
          var bOi = parseInt(b.dataset.option, 10);
          if (bOi === q.correct) b.classList.add("correct");
          else if (bOi === selOi) b.classList.add("incorrect");
          b.disabled = true;
        });
        var feedback = item.querySelector(".practice-mcq-feedback");
        feedback.classList.remove("bad", "ok");
        if (ok) {
          correct++;
          feedback.textContent = "✓ Correct";
          feedback.classList.add("ok");
        } else {
          feedback.textContent = "✗ Correct answer: " + String.fromCharCode(97 + q.correct) + ") " + q.options[q.correct];
          feedback.classList.add("bad");
        }
      });

      checkBtn.disabled = true;
      resultEl.hidden = false;
      resultEl.classList.remove("perfect", "needs-work");
      if (correct === total) {
        resultEl.textContent = "🎉 Perfect! " + correct + " out of " + total + " correct.";
        resultEl.classList.add("perfect");
      } else {
        resultEl.textContent = "You got " + correct + " out of " + total + " correct. Review the red answers above, then try Reset to practice again.";
        resultEl.classList.add("needs-work");
      }
      refreshHeight();
    });

    resetBtn.addEventListener("click", function () {
      items.forEach(function (item) {
        var buttons = Array.prototype.slice.call(item.querySelectorAll(".quiz-option"));
        buttons.forEach(function (b) {
          b.disabled = false;
          b.classList.remove("selected", "correct", "incorrect");
        });
        var feedback = item.querySelector(".practice-mcq-feedback");
        feedback.textContent = "";
        feedback.className = "practice-feedback practice-mcq-feedback";
      });
      checkBtn.disabled = false;
      resultEl.hidden = true;
      refreshHeight();
    });
  }

  function openGrammarTopic(slug) {
    var topic = GRAMMAR_CONTENT[slug];
    if (!topic) return;
    document.getElementById("grammar-browse").hidden = true;
    var sectionHead = document.getElementById("grammar-section-head");
    if (sectionHead) sectionHead.hidden = true;
    var panel = document.getElementById("grammar-panel");
    panel.hidden = false;
    var inner = document.getElementById("grammar-panel-inner");
    var html = "";
    if (topic.definition) {
      html += '<div class="grammar-definition-hero">' +
        '<p class="eyebrow">📚 Definition</p>' +
        "<h2>" + (topic.definitionTitle || topic.label) + "</h2>" +
        "<p>" + topic.definition + "</p>" +
        (topic.definitionExamples ? '<div class="grammar-definition-examples">' +
          topic.definitionExamples.map(function (ex) { return '<span class="grammar-def-chip">' + ex + "</span>"; }).join("") +
          "</div>" : "") +
        "</div>";
    }
    if (topic.practice && topic.practice.length) {
      html += '<div class="grammar-practice-cta">' +
        '<span class="grammar-practice-cta-text">🎯 <strong>New!</strong> Practice what you learn here with ' +
          topic.practice.length + ' interactive quizzes.</span>' +
        '<button type="button" class="btn btn-primary btn-sm grammar-practice-cta-btn" id="' + slug + '-cta-btn">Go to Quizzes ↓</button>' +
        "</div>";
    }
    html += topic.modules.map(function (mod) {
      return renderGrammarModule(mod, "Parts of Speech · " + (topic.label || ""));
    }).join("");
    if (topic.practice && topic.practice.length) {
      html += '<div class="grammar-practice-section" id="' + slug + '-practice">' +
        '<p class="grammar-section-title">🎮 Interactive Exercises</p>' +
        grammarPracticeBoxHtml(slug, topic.practice) +
        "</div>";
    }
    inner.innerHTML = html;
    if (topic.practice) {
      initGrammarPracticeQuizzes(inner, topic.practice);
      initQuizBox(slug);
      var ctaBtn = document.getElementById(slug + "-cta-btn");
      if (ctaBtn) {
        ctaBtn.addEventListener("click", function () {
          var target = document.getElementById(slug + "-practice");
          if (target) target.scrollIntoView({ behavior: "smooth", block: "start" });
        });
      }
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function closeGrammarPanel() {
    document.getElementById("grammar-panel").hidden = true;
    document.getElementById("grammar-browse").hidden = false;
    var sectionHead = document.getElementById("grammar-section-head");
    if (sectionHead) sectionHead.hidden = false;
  }
  document.getElementById("grammar-back").addEventListener("click", closeGrammarPanel);

  document.querySelectorAll(".grammar-topic").forEach(function (span) {
    var slug = span.dataset.topic;
    if (slug && GRAMMAR_CONTENT[slug]) {
      span.classList.add("has-content");
      span.tabIndex = 0;
      span.setAttribute("role", "button");
      if (GRAMMAR_CONTENT[slug].practice && GRAMMAR_CONTENT[slug].practice.length) {
        span.classList.add("has-quiz");
        span.title = "Includes interactive practice quizzes";
      }
      span.addEventListener("click", function () { openGrammarTopic(slug); });
      span.addEventListener("keydown", function (e) { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); openGrammarTopic(slug); } });
    } else {
      span.addEventListener("click", function () { showGenericToast("🔒 This topic is coming soon."); });
    }
  });

  /* ---- Generic small toast (reuses the XP toast element) ---- */
  var genericToastTimer = null;
  function showGenericToast(message) {
    var toast = document.getElementById("xp-toast");
    toast.textContent = message;
    toast.hidden = false;
    requestAnimationFrame(function () { toast.classList.add("show"); });
    if (genericToastTimer) clearTimeout(genericToastTimer);
    genericToastTimer = setTimeout(function () {
      toast.classList.remove("show");
      setTimeout(function () { toast.hidden = true; }, 250);
    }, 1700);
  }

