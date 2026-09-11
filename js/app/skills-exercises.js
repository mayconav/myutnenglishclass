"use strict";
/* Habilidades: ejercicios de Reading, Writing, Speaking y Letter (antes en js/app.js) */
  function renderReadingExercise(data, body) {
    var card = document.createElement("div");
    card.className = "exercise-card";
    var glossedHtml = data.passage.replace(/\{\{([^|]+)\|([^}]+)\}\}/g, function (_, word, tr) {
      return '<span class="gloss-word" tabindex="0">' + word + '<span class="gloss-tip">' + tr + "</span></span>";
    });
    card.innerHTML = '<p class="reading-passage">' + glossedHtml + "</p>";
    body.appendChild(card);

    var quizCard = document.createElement("div");
    quizCard.className = "exercise-card";
    quizCard.innerHTML = '<p class="quiz-heading">Reading Comprehension</p><div id="reading-quiz-body"></div><div class="quiz-result" id="reading-quiz-result" hidden><p id="reading-quiz-score"></p></div>';
    body.appendChild(quizCard);

    var qBody = quizCard.querySelector("#reading-quiz-body");
    var answered = new Array(data.questions.length).fill(false);
    var correctCount = 0;

    data.questions.forEach(function (q, qi) {
      var qEl = document.createElement("div");
      qEl.className = "quiz-q";
      var optsHtml = q.options.map(function (opt, oi) {
        return '<button class="quiz-option" data-qi="' + qi + '" data-oi="' + oi + '">' + opt + "</button>";
      }).join("");
      qEl.innerHTML = "<p>" + (qi + 1) + ". " + q.q + '</p><div class="quiz-options">' + optsHtml + "</div>";
      qBody.appendChild(qEl);
    });

    qBody.querySelectorAll(".quiz-option").forEach(function (btn) {
      btn.addEventListener("click", function () {
        var qi = parseInt(btn.dataset.qi, 10);
        if (answered[qi]) return;
        answered[qi] = true;
        var q = data.questions[qi];
        var oi = parseInt(btn.dataset.oi, 10);
        var group = qBody.querySelectorAll('.quiz-option[data-qi="' + qi + '"]');
        group.forEach(function (g) {
          var gOi = parseInt(g.dataset.oi, 10);
          if (gOi === q.correct) g.classList.add("correct");
          else if (gOi === oi) g.classList.add("incorrect");
          g.disabled = true;
        });
        if (oi === q.correct) correctCount++;
        if (answered.every(Boolean)) {
          document.getElementById("reading-quiz-score").textContent = "You got " + correctCount + " out of " + data.questions.length + " correct.";
          document.getElementById("reading-quiz-result").hidden = false;
          if (correctCount === data.questions.length) {
            awardXP(SKILL_META.reading.xp, "reading", activeSkillsLevel);
          }
        }
      });
    });
  }

  /* ---- WRITING (sentence builder) ---- */
  function renderWritingExercise(data, body) {
    var idx = 0;
    var correctCount = 0;
    var card = document.createElement("div");
    card.className = "exercise-card";
    body.appendChild(card);

    function renderPrompt() {
      var prompt = data.prompts[idx];
      var bank = shuffleCopy(prompt.en);
      var placed = [];
      card.innerHTML =
        '<div class="exercise-progress-dots">' +
          data.prompts.map(function (_, i) {
            return '<span class="exercise-dot' + (i < idx ? " done" : i === idx ? " current" : "") + '"></span>';
          }).join("") +
        "</div>" +
        '<p class="builder-prompt-es">Translate: “' + prompt.es + '”</p>' +
        '<div class="builder-target" id="builder-target"></div>' +
        '<div class="builder-bank" id="builder-bank"></div>' +
        '<div class="builder-actions">' +
          '<button class="btn btn-ghost-light" id="builder-clear" type="button">Clear</button>' +
          '<button class="btn btn-primary" id="builder-check" type="button">Check</button>' +
        "</div>" +
        '<p class="builder-feedback" id="builder-feedback"></p>';

      var targetEl = card.querySelector("#builder-target");
      var bankEl = card.querySelector("#builder-bank");

      function renderBank() {
        bankEl.innerHTML = "";
        bank.forEach(function (word, wi) {
          var chip = document.createElement("button");
          chip.type = "button";
          chip.className = "word-chip";
          chip.textContent = word;
          chip.disabled = placed.indexOf(wi) !== -1;
          chip.addEventListener("click", function () {
            if (chip.disabled) return;
            placed.push(wi);
            renderBank();
            renderTarget();
          });
          bankEl.appendChild(chip);
        });
      }
      function renderTarget() {
        targetEl.innerHTML = "";
        placed.forEach(function (wi, pi) {
          var chip = document.createElement("button");
          chip.type = "button";
          chip.className = "word-chip placed";
          chip.textContent = bank[wi];
          chip.addEventListener("click", function () {
            placed.splice(pi, 1);
            renderBank();
            renderTarget();
          });
          targetEl.appendChild(chip);
        });
      }
      renderBank();
      renderTarget();

      card.querySelector("#builder-clear").addEventListener("click", function () {
        placed = [];
        renderBank();
        renderTarget();
      });

      card.querySelector("#builder-check").addEventListener("click", function () {
        var answer = placed.map(function (wi) { return bank[wi]; });
        var ok = answer.length === prompt.en.length && answer.every(function (w, i) { return w === prompt.en[i]; });
        var fb = card.querySelector("#builder-feedback");
        if (ok) {
          correctCount++;
          fb.textContent = "Correct! " + (idx < data.prompts.length - 1 ? "Next sentence…" : "You finished the exercise!");
          fb.className = "builder-feedback ok";
          setTimeout(function () {
            idx++;
            if (idx < data.prompts.length) {
              renderPrompt();
            } else {
              finishWriting();
            }
          }, 700);
        } else {
          fb.textContent = "Almost. Check the word order and try again.";
          fb.className = "builder-feedback bad";
        }
      });
    }

    function finishWriting() {
      card.innerHTML = '<p class="builder-feedback ok">✓ You completed all ' + data.prompts.length + " sentences (" + correctCount + "/" + data.prompts.length + ' on the first try).</p>';
      awardXP(SKILL_META.writing.xp, "writing", activeSkillsLevel);
    }

    renderPrompt();
  }

  /* ---- SPEAKING ---- */
  function renderSpeakingExercise(data, body) {
    var SpeechRecognitionCtor = window.SpeechRecognition || window.webkitSpeechRecognition;
    data.phrases.forEach(function (phrase) {
      var card = document.createElement("div");
      card.className = "exercise-card speaking-phrase";
      card.innerHTML =
        '<p class="speaking-phrase-text">' + phrase.en + "</p>" +
        '<p class="speaking-phrase-hint">' + phrase.es + "</p>" +
        '<div class="speaking-controls">' +
          '<button type="button" class="speak-btn listen">🔊 Listen</button>' +
          '<button type="button" class="speak-btn record">🎤 Practice</button>' +
        "</div>" +
        '<p class="speaking-feedback"></p>';
      body.appendChild(card);

      card.querySelector(".listen").addEventListener("click", function () {
        if (!window.speechSynthesis) return;
        var utter = new SpeechSynthesisUtterance(phrase.en);
        utter.lang = "en-US";
        utter.rate = 0.95;
        window.speechSynthesis.cancel();
        window.speechSynthesis.speak(utter);
      });

      var recordBtn = card.querySelector(".record");
      var feedback = card.querySelector(".speaking-feedback");

      recordBtn.addEventListener("click", function () {
        if (!SpeechRecognitionCtor) {
          feedback.textContent = "✓ Marked as practiced (your browser does not support speech recognition).";
          feedback.className = "speaking-feedback ok";
          awardXP(4, "speaking", activeSkillsLevel);
          return;
        }
        var recognition = new SpeechRecognitionCtor();
        recognition.lang = "en-US";
        recognition.interimResults = false;
        recognition.maxAlternatives = 1;
        recordBtn.classList.add("recording");
        recordBtn.textContent = "🎙️ Listening…";
        recognition.start();

        recognition.onresult = function (e) {
          var transcript = e.results[0][0].transcript;
          var targetWords = normalizeWord(phrase.en).split(/\s+/).filter(Boolean);
          var saidWords = normalizeWord(transcript).split(/\s+/).filter(Boolean);
          var matches = targetWords.filter(function (w) { return saidWords.indexOf(w) !== -1; }).length;
          var score = targetWords.length ? Math.round((matches / targetWords.length) * 100) : 0;
          if (score >= 70) {
            feedback.textContent = "Excellent pronunciation! (" + score + "% match) — You said: “" + transcript + "”";
            feedback.className = "speaking-feedback ok";
            awardXP(4, "speaking", activeSkillsLevel);
          } else {
            feedback.textContent = "Keep practicing (" + score + "% match) — You said: “" + transcript + "”";
            feedback.className = "speaking-feedback meh";
          }
        };
        recognition.onerror = function () {
          feedback.textContent = "We could not access the microphone. Check your permissions and try again.";
          feedback.className = "speaking-feedback meh";
        };
        recognition.onend = function () {
          recordBtn.classList.remove("recording");
          recordBtn.textContent = "🎤 Practice";
        };
      });
    });

    var note = document.createElement("p");
    note.className = "speaking-note";
    note.textContent = "Tip: use headphones with a microphone in a quiet place for best results.";
    body.appendChild(note);

    if (data.phrases.length && state.skillProgress.speaking.indexOf(activeSkillsLevel) === -1) {
      var finishRow = document.createElement("div");
      finishRow.className = "exercise-card";
      finishRow.innerHTML = '<p class="quiz-heading">Have you practiced the phrases?</p><button class="btn btn-primary" id="speaking-finish">Stamp Skill</button>';
      body.appendChild(finishRow);
      finishRow.querySelector("#speaking-finish").addEventListener("click", function () {
        awardXP(SKILL_META.speaking.xp, "speaking", activeSkillsLevel);
        finishRow.innerHTML = '<p class="builder-feedback ok">✓ Speaking stamped for level ' + activeSkillsLevel + "!</p>";
      });
    }
  }

  /* ---- LETTER ---- */
  function renderLetterExercise(data, body) {
    var card = document.createElement("div");
    card.className = "letter-sheet";
    var fullText = data.salutation + "\n\n" + data.body + "\n\n" + data.closing;
    var htmlText = fullText.replace(/\n/g, "<br>").replace(/\{\{(\d+)\}\}/g, function (_, id) {
      return '<span class="letter-blank" data-blank="' + id + '" data-filled="">＿＿＿</span>';
    });
    card.innerHTML = '<div id="letter-text">' + htmlText + "</div>";
    body.appendChild(card);

    var bankCard = document.createElement("div");
    bankCard.className = "exercise-card";
    var bankWords = shuffleCopy(data.blanks.map(function (b) { return b.answer; }).concat(data.distractors || []));
    bankCard.innerHTML = '<p class="quiz-heading">Word Bank</p><div class="letter-bank" id="letter-bank"></div>' +
      '<div class="letter-check-row"><button class="btn btn-primary" id="letter-check" type="button">Check Letter</button>' +
      '<button class="btn btn-ghost-light" id="letter-reset" type="button">Reset</button></div>' +
      '<p class="letter-result" id="letter-result"></p>';
    body.appendChild(bankCard);

    var bankEl = bankCard.querySelector("#letter-bank");
    var blankFill = {}; /* blankId -> {word, chipIndex} */

    function renderBank() {
      bankEl.innerHTML = "";
      bankWords.forEach(function (word, wi) {
        var used = Object.keys(blankFill).some(function (bid) { return blankFill[bid].chipIndex === wi; });
        var chip = document.createElement("button");
        chip.type = "button";
        chip.className = "word-chip";
        chip.textContent = word;
        chip.disabled = used;
        chip.addEventListener("click", function () {
          if (chip.disabled) return;
          var nextBlank = card.querySelector('.letter-blank[data-filled=""]');
          if (!nextBlank) return;
          nextBlank.textContent = word;
          nextBlank.dataset.filled = "1";
          nextBlank.classList.remove("correct", "incorrect");
          blankFill[nextBlank.dataset.blank] = { word: word, chipIndex: wi };
          renderBank();
        });
        bankEl.appendChild(chip);
      });
    }

    card.querySelectorAll(".letter-blank").forEach(function (blankEl) {
      blankEl.addEventListener("click", function () {
        var bid = blankEl.dataset.blank;
        if (!blankFill[bid]) return;
        delete blankFill[bid];
        blankEl.textContent = "＿＿＿";
        blankEl.dataset.filled = "";
        blankEl.classList.remove("correct", "incorrect");
        renderBank();
      });
    });

    bankCard.querySelector("#letter-reset").addEventListener("click", function () {
      blankFill = {};
      card.querySelectorAll(".letter-blank").forEach(function (b) {
        b.textContent = "＿＿＿";
        b.dataset.filled = "";
        b.classList.remove("correct", "incorrect");
      });
      bankCard.querySelector("#letter-result").textContent = "";
      renderBank();
    });

    bankCard.querySelector("#letter-check").addEventListener("click", function () {
      var total = data.blanks.length;
      var correct = 0;
      data.blanks.forEach(function (b) {
        var blankEl = card.querySelector('.letter-blank[data-blank="' + b.id + '"]');
        var filled = blankFill[b.id];
        blankEl.classList.remove("correct", "incorrect");
        if (filled && filled.word === b.answer) {
          blankEl.classList.add("correct");
          correct++;
        } else if (filled) {
          blankEl.classList.add("incorrect");
        }
      });
      var resultEl = bankCard.querySelector("#letter-result");
      if (correct === total) {
        resultEl.textContent = "✓ Letter complete and correct! (" + correct + "/" + total + ")";
        resultEl.style.color = "var(--green-dark)";
        awardXP(SKILL_META.letter.xp, "letter", activeSkillsLevel);
      } else {
        resultEl.textContent = "You have " + correct + " out of " + total + " correct. Fix the blanks in red.";
        resultEl.style.color = "var(--red)";
      }
    });

    renderBank();
  }

