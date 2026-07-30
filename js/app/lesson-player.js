"use strict";
/* Leccion: pestanas, reproductor de audio y quizzes (opcion multiple, completar, relacionar) (app.js original: L494-L761) */
  /* ============ LESSON / TABS ============ */
  function renderLessonTabs(levelIdx, lessonIdx) {
    var lvl = LEVELS[levelIdx];
    var lessons = LESSONS[lvl.code];
    var tabsEl = document.getElementById("lesson-tabs");
    tabsEl.innerHTML = "";
    lessons.forEach(function (les, i) {
      var done = state.completedLessons.indexOf(lessonId(lvl.code, i)) !== -1;
      var tab = document.createElement("button");
      tab.className = "lesson-tab" + (i === lessonIdx ? " active" : "") + (done ? " done" : "");
      tab.textContent = (done ? "✓ " : "") + "Lesson " + (i + 1);
      tab.addEventListener("click", function () {
        activeLessonIndex = i;
        renderLesson(levelIdx, i);
      });
      tabsEl.appendChild(tab);
    });
  }

  /* ============ PLAYER ============ */
  function stopPlayer() {
    if (player.timer) clearInterval(player.timer);
    player.timer = null;
    player.playing = false;
    player.elapsed = 0;
    document.getElementById("player-play-icon").textContent = "▶";
    document.getElementById("player-fill").style.width = "0%";
    document.getElementById("player-current").textContent = "0:00";
    var visual = document.querySelector(".player-visual");
    if (visual) visual.classList.remove("playing");
  }

  function formatTime(sec) {
    var m = Math.floor(sec / 60);
    var s = Math.floor(sec % 60);
    return m + ":" + (s < 10 ? "0" : "") + s;
  }

  function renderLesson(levelIdx, lessonIdx) {
    var lvl = LEVELS[levelIdx];
    var lesson = LESSONS[lvl.code][lessonIdx];
    document.getElementById("leccion-eyebrow").textContent = "Level " + lvl.code + " · Lesson " + (lessonIdx + 1) + " of " + LESSONS[lvl.code].length;
    document.getElementById("leccion-title").textContent = lesson.title;
    document.getElementById("leccion-desc").textContent = "Listen to the audio, follow the transcript, and complete the quiz to stamp your progress.";
    document.getElementById("player-total").textContent = formatTime(lesson.duration);
    document.getElementById("player-caption").textContent = "Press play to see the live transcript.";
    stopPlayer();
    renderLessonTabs(levelIdx, lessonIdx);
    renderQuiz(levelIdx, lessonIdx, lesson);
  }

  var playBtn = document.getElementById("player-play");
  playBtn.addEventListener("click", function () {
    var lvl = LEVELS[activeLevelIndex];
    var lesson = LESSONS[lvl.code][activeLessonIndex];
    if (player.playing) {
      clearInterval(player.timer);
      player.playing = false;
      document.getElementById("player-play-icon").textContent = "▶";
      document.querySelector(".player-visual").classList.remove("playing");
      return;
    }
    player.playing = true;
    document.getElementById("player-play-icon").textContent = "❙❙";
    document.querySelector(".player-visual").classList.add("playing");
    player.timer = setInterval(function () {
      player.elapsed += 1 * player.speed;
      if (player.elapsed >= lesson.duration) {
        player.elapsed = lesson.duration;
        stopPlayer();
      }
      var pct = (player.elapsed / lesson.duration) * 100;
      document.getElementById("player-fill").style.width = pct + "%";
      document.getElementById("player-current").textContent = formatTime(player.elapsed);

      var current = lesson.captions[0].text;
      lesson.captions.forEach(function (c) {
        if (player.elapsed >= c.t) current = c.text;
      });
      document.getElementById("player-caption").textContent = current;
    }, 1000);
  });

  document.getElementById("player-speed-select").addEventListener("change", function (e) {
    player.speed = parseFloat(e.target.value);
  });

  /* ============ QUIZ (mcq / fill / match) ============ */
  function renderQuiz(levelIdx, lessonIdx, lesson) {
    var levelCode = LEVELS[levelIdx].code;
    var body = document.getElementById("quiz-body");
    var resultBox = document.getElementById("quiz-result");
    resultBox.hidden = true;
    body.innerHTML = "";
    var answered = new Array(lesson.quiz.length).fill(false);
    var correctCount = 0;

    function checkAllAnswered() {
      if (answered.every(Boolean)) {
        var scoreText = "You got " + correctCount + " out of " + lesson.quiz.length + " correct.";
        document.getElementById("quiz-score-text").textContent = scoreText;
        resultBox.hidden = false;
      }
    }

    lesson.quiz.forEach(function (q, qi) {
      var qEl = document.createElement("div");
      qEl.className = "quiz-q";

      if (q.type === "fill") {
        qEl.innerHTML =
          "<p>" + (qi + 1) + ". " + q.q + "</p>" +
          '<div class="fill-row">' +
            '<input type="text" class="fill-input" data-qi="' + qi + '" autocomplete="off" placeholder="Type your answer">' +
            '<button class="btn btn-primary fill-check" data-qi="' + qi + '">Check</button>' +
          "</div>" +
          '<p class="fill-feedback" id="fill-feedback-' + qi + '"></p>';
        body.appendChild(qEl);

        var checkFill = function () {
          if (answered[qi]) return;
          var input = qEl.querySelector(".fill-input");
          var val = input.value.trim().toLowerCase();
          var ok = q.answer.some(function (a) { return a.toLowerCase() === val; });
          answered[qi] = true;
          input.disabled = true;
          qEl.querySelector(".fill-check").disabled = true;
          var fb = qEl.querySelector(".fill-feedback");
          if (ok) {
            correctCount++;
            input.classList.add("correct");
            fb.textContent = "Correct!";
            fb.className = "fill-feedback ok";
          } else {
            input.classList.add("incorrect");
            fb.textContent = "Expected answer: " + q.answer[0];
            fb.className = "fill-feedback bad";
          }
          checkAllAnswered();
        };
        qEl.querySelector(".fill-check").addEventListener("click", checkFill);
        qEl.querySelector(".fill-input").addEventListener("keydown", function (e) {
          if (e.key === "Enter") checkFill();
        });

      } else if (q.type === "match") {
        var leftItems = q.pairs.map(function (p, i) { return { text: p[0], idx: i }; });
        var rightItems = q.pairs.map(function (p, i) { return { text: p[1], idx: i }; });
        rightItems = shuffleArray(rightItems.slice());

        var leftHtml = leftItems.map(function (it) {
          return '<button class="match-item" data-side="left" data-idx="' + it.idx + '">' + it.text + "</button>";
        }).join("");
        var rightHtml = rightItems.map(function (it) {
          return '<button class="match-item" data-side="right" data-idx="' + it.idx + '">' + it.text + "</button>";
        }).join("");

        qEl.innerHTML =
          "<p>" + (qi + 1) + ". " + (q.instructions || "Match the concepts.") + "</p>" +
          '<div class="match-columns">' +
            '<div class="match-col">' + leftHtml + "</div>" +
            '<div class="match-col">' + rightHtml + "</div>" +
          "</div>";
        body.appendChild(qEl);

        var selectedLeft = null;
        var matchedCount = 0;
        qEl.querySelectorAll(".match-item").forEach(function (btn) {
          btn.addEventListener("click", function () {
            if (btn.classList.contains("matched")) return;
            if (btn.dataset.side === "left") {
              qEl.querySelectorAll('.match-item[data-side="left"]').forEach(function (b) { b.classList.remove("selected"); });
              selectedLeft = btn;
              btn.classList.add("selected");
            } else if (selectedLeft) {
              var ok = selectedLeft.dataset.idx === btn.dataset.idx;
              if (ok) {
                selectedLeft.classList.add("matched");
                btn.classList.add("matched");
                selectedLeft.classList.remove("selected");
                selectedLeft.disabled = true;
                btn.disabled = true;
                matchedCount++;
                selectedLeft = null;
                if (matchedCount === q.pairs.length && !answered[qi]) {
                  answered[qi] = true;
                  correctCount++;
                  checkAllAnswered();
                }
              } else {
                btn.classList.add("shake");
                selectedLeft.classList.add("shake");
                setTimeout(function () {
                  btn.classList.remove("shake");
                  if (selectedLeft) selectedLeft.classList.remove("shake", "selected");
                  selectedLeft = null;
                }, 420);
              }
            }
          });
        });

      } else {
        /* mcq (default) */
        var optsHtml = q.options.map(function (opt, oi) {
          return '<button class="quiz-option" data-qi="' + qi + '" data-oi="' + oi + '">' + opt + "</button>";
        }).join("");
        qEl.innerHTML = "<p>" + (qi + 1) + ". " + q.q + '</p><div class="quiz-options">' + optsHtml + "</div>";
        body.appendChild(qEl);
      }
    });

    body.querySelectorAll(".quiz-option").forEach(function (btn) {
      btn.addEventListener("click", function () {
        var qi = parseInt(btn.dataset.qi, 10);
        if (answered[qi]) return;
        answered[qi] = true;
        var q = lesson.quiz[qi];
        var oi = parseInt(btn.dataset.oi, 10);
        var group = body.querySelectorAll('.quiz-option[data-qi="' + qi + '"]');
        group.forEach(function (g) {
          var gOi = parseInt(g.dataset.oi, 10);
          if (gOi === q.correct) g.classList.add("correct");
          else if (gOi === oi) g.classList.add("incorrect");
          g.disabled = true;
        });
        if (oi === q.correct) correctCount++;
        checkAllAnswered();
      });
    });

    document.getElementById("quiz-next-btn").onclick = function () {
      var lid = lessonId(levelCode, lessonIdx);
      if (state.completedLessons.indexOf(lid) === -1) state.completedLessons.push(lid);

      var levelLessons = LESSONS[levelCode];
      var allLevelLessonsDone = levelLessons.every(function (_, i) {
        return state.completedLessons.indexOf(lessonId(levelCode, i)) !== -1;
      });

      if (allLevelLessonsDone && state.stamps.indexOf(levelCode) === -1) {
        state.stamps.push(levelCode);
        if (levelIdx === state.currentLevelIndex && state.currentLevelIndex < LEVELS.length - 1) {
          state.currentLevelIndex += 1;
        }
      }
      saveProgress(state);
      updateBoardingPass();

      if (state.stamps.length === LEVELS.length && !state.congratsShown) {
        state.congratsShown = true;
        saveProgress(state);
        goto("niveles");
        setTimeout(openCongratsModal, 300);
      } else {
        goto("niveles");
      }
    };
  }

  function shuffleArray(arr) {
    for (var i = arr.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var tmp = arr[i]; arr[i] = arr[j]; arr[j] = tmp;
    }
    return arr;
  }

