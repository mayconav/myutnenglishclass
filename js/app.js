(function () {
  "use strict";

  /* ============ CONTENT DATA ============ */
  var LEVELS = [
    { code: "A1", name: "Beginner", skill: "Essential Vocabulary", desc: "Greetings, introductions, and everyday vocabulary." },
    { code: "A2", name: "Elementary", skill: "Daily Routines", desc: "Describing routines, places, and simple plans." },
    { code: "B1", name: "Intermediate", skill: "Fluent Speaking", desc: "Conversations about studies, work, and opinions." },
    { code: "B2", name: "Upper Intermediate", skill: "Listening Comprehension", desc: "Listening to and discussing academic topics." },
    { code: "C1", name: "Advanced", skill: "Academic Writing", desc: "Essay writing and argumentation." },
    { code: "C2", name: "Mastery", skill: "Professional Fluency", desc: "Presentations and specialized communication." }
  ];

  /* Each level has 2 lessons. Lesson 1 uses multiple choice;
     lesson 2 mixes fill-in-the-blank and matching, to vary the exercise type. */
  var LESSONS = {
    A1: [
      {
        title: "Essential Vocabulary",
        duration: 40,
        captions: [
          { t: 0, text: "Hello! My name is Sofía and I study at UTN." },
          { t: 10, text: "Nice to meet you. Where are you from?" },
          { t: 20, text: "I am from Nezahualcóyotl, in Mexico." },
          { t: 30, text: "Great! Let's practice some everyday words." }
        ],
        quiz: [
          { type: "mcq", q: "How do you say 'nice to meet you'?", options: ["Nice to meet you", "See you later", "Good night"], correct: 0 },
          { type: "mcq", q: "'Where are you from?' asks about...", options: ["Age", "Origin", "Time"], correct: 1 }
        ]
      },
      {
        title: "Greetings and Farewells",
        duration: 35,
        captions: [
          { t: 0, text: "Good morning! How are you today?" },
          { t: 10, text: "I'm fine, thank you. And you?" },
          { t: 20, text: "See you later, have a nice day!" }
        ],
        quiz: [
          { type: "fill", q: "Complete: 'Good ___, how are you?' (morning greeting)", answer: ["morning"] },
          { type: "match", instructions: "Match each English greeting with its translation.", pairs: [
            ["Good morning", "Buenos días"],
            ["See you later", "Nos vemos luego"],
            ["Thank you", "Gracias"]
          ]}
        ]
      }
    ],
    A2: [
      {
        title: "Daily Routines",
        duration: 40,
        captions: [
          { t: 0, text: "I usually wake up at seven in the morning." },
          { t: 10, text: "Then I have breakfast and go to class." },
          { t: 20, text: "In the afternoon, I study at the library." },
          { t: 30, text: "What is your daily routine like?" }
        ],
        quiz: [
          { type: "mcq", q: "'I usually wake up at seven' describes...", options: ["A future plan", "A routine", "A piece of advice"], correct: 1 },
          { type: "mcq", q: "Which word indicates frequency?", options: ["Usually", "Library", "Afternoon"], correct: 0 }
        ]
      },
      {
        title: "Places and Plans",
        duration: 35,
        captions: [
          { t: 0, text: "Next weekend I am going to visit my family." },
          { t: 10, text: "We are planning to go to the park." },
          { t: 20, text: "After that, we will have lunch downtown." }
        ],
        quiz: [
          { type: "fill", q: "Complete: 'I am going ___ visit my family.' (future plan preposition)", answer: ["to"] },
          { type: "match", instructions: "Match the English place with its translation.", pairs: [
            ["Park", "Parque"],
            ["Downtown", "Centro"],
            ["Library", "Biblioteca"]
          ]}
        ]
      }
    ],
    B1: [
      {
        title: "Fluent Speaking",
        duration: 45,
        captions: [
          { t: 0, text: "In my opinion, learning English opens many doors." },
          { t: 12, text: "I think practice is more important than perfection." },
          { t: 24, text: "What do you think about studying abroad?" },
          { t: 36, text: "Let's discuss the advantages and disadvantages." }
        ],
        quiz: [
          { type: "mcq", q: "'In my opinion' is used to...", options: ["State a fact", "Express a point of view", "Ask a question"], correct: 1 },
          { type: "mcq", q: "Synonym for 'advantages'", options: ["Benefits", "Mistakes", "Schedules"], correct: 0 }
        ]
      },
      {
        title: "Giving Opinions",
        duration: 38,
        captions: [
          { t: 0, text: "I believe practice makes progress, not perfection." },
          { t: 10, text: "On the other hand, some people prefer studying alone." },
          { t: 20, text: "Personally, I enjoy group discussions." }
        ],
        quiz: [
          { type: "fill", q: "Complete: 'On the other ___, some people prefer studying alone.'", answer: ["hand"] },
          { type: "match", instructions: "Match the opinion phrase with its translation.", pairs: [
            ["I believe", "Yo creo"],
            ["Personally", "Personalmente"],
            ["On the other hand", "Por otro lado"]
          ]}
        ]
      }
    ],
    B2: [
      {
        title: "Listening Comprehension",
        duration: 45,
        captions: [
          { t: 0, text: "Today's lecture is about renewable energy sources." },
          { t: 12, text: "Solar and wind power are growing rapidly worldwide." },
          { t: 24, text: "However, storage remains a technical challenge." },
          { t: 36, text: "Let's summarize the key points together." }
        ],
        quiz: [
          { type: "mcq", q: "The main topic of the lecture is...", options: ["Renewable energy", "World history", "Finance"], correct: 0 },
          { type: "mcq", q: "'Challenge' in this context means...", options: ["Achievement", "Difficulty", "Award"], correct: 1 }
        ]
      },
      {
        title: "Debating Academic Topics",
        duration: 40,
        captions: [
          { t: 0, text: "Some researchers argue that storage technology will improve soon." },
          { t: 12, text: "Others remain skeptical about the timeline." },
          { t: 24, text: "Let's weigh both sides of the argument." }
        ],
        quiz: [
          { type: "fill", q: "Complete: 'Let's weigh both ___ of the argument.'", answer: ["sides"] },
          { type: "match", instructions: "Match the academic term with its translation.", pairs: [
            ["Researchers", "Investigadores"],
            ["Skeptical", "Escéptico"],
            ["Argument", "Argumento"]
          ]}
        ]
      }
    ],
    C1: [
      {
        title: "Academic Writing",
        duration: 45,
        captions: [
          { t: 0, text: "A strong thesis statement guides the entire essay." },
          { t: 12, text: "Each paragraph should support your main argument." },
          { t: 24, text: "Use evidence to strengthen your claims." },
          { t: 36, text: "Finally, the conclusion restates your position." }
        ],
        quiz: [
          { type: "mcq", q: "An essay's thesis should...", options: ["Go at the end", "Guide the argument", "Be irrelevant"], correct: 1 },
          { type: "mcq", q: "'Evidence' translates to...", options: ["Evidence", "Emotion", "Extension"], correct: 0 }
        ]
      },
      {
        title: "Writing with Evidence",
        duration: 38,
        captions: [
          { t: 0, text: "Every claim needs supporting evidence from a reliable source." },
          { t: 12, text: "Avoid vague statements without proof." },
          { t: 24, text: "A clear conclusion restates your main point." }
        ],
        quiz: [
          { type: "fill", q: "Complete: 'Every claim needs supporting ___.'", answer: ["evidence"] },
          { type: "match", instructions: "Match the academic writing term with its translation.", pairs: [
            ["Claim", "Afirmación"],
            ["Source", "Fuente"],
            ["Conclusion", "Conclusión"]
          ]}
        ]
      }
    ],
    C2: [
      {
        title: "Professional Fluency",
        duration: 45,
        captions: [
          { t: 0, text: "Good morning everyone, thank you for joining this call." },
          { t: 12, text: "Today we will present our quarterly results." },
          { t: 24, text: "Please feel free to ask questions at any point." },
          { t: 36, text: "Let's begin with an overview of the project." }
        ],
        quiz: [
          { type: "mcq", q: "This lesson simulates...", options: ["A party", "A professional presentation", "A recipe"], correct: 1 },
          { type: "mcq", q: "'Feel free to ask' invites you to...", options: ["Stay silent", "Ask questions", "End the call"], correct: 0 }
        ]
      },
      {
        title: "Specialized Presentations",
        duration: 40,
        captions: [
          { t: 0, text: "Let's move on to the next slide of our roadmap." },
          { t: 12, text: "As you can see, our results exceeded expectations." },
          { t: 24, text: "I'll now hand it over to my colleague for questions." }
        ],
        quiz: [
          { type: "fill", q: "Complete: 'Let's move on to the next ___.'", answer: ["slide"] },
          { type: "match", instructions: "Match the professional phrase with its translation.", pairs: [
            ["Roadmap", "Hoja de ruta"],
            ["Exceeded expectations", "Superó las expectativas"],
            ["Hand it over", "Cederle la palabra"]
          ]}
        ]
      }
    ]
  };

  var AVATARS = ["🎓", "🦉", "🦅", "🐺", "🦊", "🐢", "🌵", "⭐"];

  var DELIVERABLES = LEVELS.map(function (lvl) {
    return { code: lvl.code, text: "Deliverable " + lvl.code + ": " + lvl.skill };
  });

  /* ============ STATE ============ */
  /* Recalculated on every call (not just once when the script loads) because
     app.js is now always loaded, even for guests without a session. When
     someone logs in, window.__UTN_UID__ changes and __UTN_APP_RELOAD__
     re-reads progress, this time with the real student's key. */
  function storageKey() { return "myutn_progress_v2_" + (window.__UTN_UID__ || "local"); }

  function defaultState() {
    return {
      currentLevelIndex: 0,
      completedLessons: [],
      stamps: [],
      profile: { name: "UTN Student", avatar: "🎓" },
      congratsShown: false,
      skillsXP: 0,
      skillsStreak: 0,
      lastActiveDay: null,
      skillProgress: { reading: [], writing: [], speaking: [], letter: [] }
    };
  }

  function loadProgress() {
    try {
      var raw = localStorage.getItem(storageKey());
      if (raw) {
        var parsed = JSON.parse(raw);
        var base = defaultState();
        return {
          currentLevelIndex: typeof parsed.currentLevelIndex === "number" ? parsed.currentLevelIndex : base.currentLevelIndex,
          completedLessons: Array.isArray(parsed.completedLessons) ? parsed.completedLessons : [],
          stamps: Array.isArray(parsed.stamps) ? parsed.stamps : [],
          profile: parsed.profile || base.profile,
          congratsShown: !!parsed.congratsShown,
          skillsXP: typeof parsed.skillsXP === "number" ? parsed.skillsXP : 0,
          skillsStreak: typeof parsed.skillsStreak === "number" ? parsed.skillsStreak : 0,
          lastActiveDay: parsed.lastActiveDay || null,
          skillProgress: parsed.skillProgress && typeof parsed.skillProgress === "object" ? {
            reading: Array.isArray(parsed.skillProgress.reading) ? parsed.skillProgress.reading : [],
            writing: Array.isArray(parsed.skillProgress.writing) ? parsed.skillProgress.writing : [],
            speaking: Array.isArray(parsed.skillProgress.speaking) ? parsed.skillProgress.speaking : [],
            letter: Array.isArray(parsed.skillProgress.letter) ? parsed.skillProgress.letter : []
          } : base.skillProgress
        };
      }
      /* Migration from previous version (myutn_progress_v1) */
      var oldRaw = localStorage.getItem("myutn_progress_v1");
      if (oldRaw) {
        var old = JSON.parse(oldRaw);
        var base2 = defaultState();
        base2.currentLevelIndex = old.currentIndex || 0;
        base2.stamps = old.stamps || [];
        return base2;
      }
    } catch (e) {}
    return defaultState();
  }

  function saveProgress(p) {
    try { localStorage.setItem(storageKey(), JSON.stringify(p)); } catch (e) {}
    if (typeof window.__UTN_SYNC__ === "function") {
      try { window.__UTN_SYNC__(p); } catch (e) {}
    }
  }

  var state = loadProgress();
  var activeLevelIndex = state.currentLevelIndex;
  var activeLessonIndex = 0;

  var player = { timer: null, elapsed: 0, speed: 1, playing: false };

  function lessonId(levelCode, lessonIdx) { return levelCode + "-" + lessonIdx; }

  /* ============ NAVIGATION ============ */
  var views = document.querySelectorAll(".view");
  var navLinks = document.querySelectorAll(".main-nav a");
  var groupTabbars = document.querySelectorAll(".group-tabbar");

  /* Navigation groups: the main navbar only shows Home, Learn,
     Progress, and Resources; each group reveals its real views as internal
     tabs so no existing section is lost. */
  var GROUPS = {
    aprender: ["niveles", "leccion", "habilidades"],
    recursos: ["material", "gramatica"]
  };
  var lastGroupView = { aprender: "niveles", recursos: "material" };

  function groupOf(view) {
    for (var g in GROUPS) {
      if (GROUPS[g].indexOf(view) !== -1) return g;
    }
    return null;
  }

  function goto(name) {
    /* If navigating to a group (click on "Learn"/"Resources" in the navbar),
       resolve to the last visited tab within that group. */
    var target = GROUPS[name] ? (lastGroupView[name] || GROUPS[name][0]) : name;
    var activeGroup = groupOf(target);
    if (activeGroup) lastGroupView[activeGroup] = target;

    views.forEach(function (v) { v.hidden = v.dataset.view !== target; });

    navLinks.forEach(function (a) {
      a.classList.toggle("active", a.dataset.nav === (activeGroup || target));
    });

    groupTabbars.forEach(function (tb) {
      var isActiveGroup = tb.dataset.group === activeGroup;
      tb.hidden = !isActiveGroup;
      if (isActiveGroup) {
        tb.querySelectorAll(".group-tab").forEach(function (btn) {
          btn.classList.toggle("active", btn.dataset.nav === target);
        });
      }
    });

    if (target === "leccion") renderLesson(activeLevelIndex, activeLessonIndex);
    if (target === "niveles") renderGates();
    if (target === "progreso") renderProgress();
    if (target === "habilidades") openSkillsHub();
    if (target === "gramatica") closeGrammarPanel();
    window.scrollTo({ top: 0, behavior: "smooth" });
    var nav = document.getElementById("main-nav");
    nav.classList.remove("open");
    document.getElementById("nav-toggle").setAttribute("aria-expanded", "false");
  }

  document.querySelectorAll("[data-goto]").forEach(function (btn) {
    btn.addEventListener("click", function () {
      if (btn.dataset.goto === "leccion") {
        activeLevelIndex = state.currentLevelIndex;
        activeLessonIndex = 0;
      }
      goto(btn.dataset.goto);
    });
  });
  navLinks.forEach(function (a) {
    a.addEventListener("click", function (e) {
      e.preventDefault();
      goto(a.dataset.nav);
    });
  });
  document.querySelectorAll(".group-tab").forEach(function (btn) {
    btn.addEventListener("click", function () {
      if (btn.dataset.nav === "leccion") {
        activeLevelIndex = state.currentLevelIndex;
        activeLessonIndex = 0;
      }
      goto(btn.dataset.nav);
    });
  });

  var navToggle = document.getElementById("nav-toggle");
  navToggle.addEventListener("click", function () {
    var nav = document.getElementById("main-nav");
    var open = nav.classList.toggle("open");
    navToggle.setAttribute("aria-expanded", open ? "true" : "false");
  });

  /* ============ PROFILE ============ */
  var avatarGrid = document.getElementById("avatar-grid");
  var selectedAvatar = state.profile.avatar;

  function renderAvatarGrid() {
    avatarGrid.innerHTML = "";
    AVATARS.forEach(function (a) {
      var b = document.createElement("button");
      b.type = "button";
      b.className = "avatar-option" + (a === selectedAvatar ? " selected" : "");
      b.textContent = a;
      b.addEventListener("click", function () {
        selectedAvatar = a;
        avatarGrid.querySelectorAll(".avatar-option").forEach(function (el) { el.classList.remove("selected"); });
        b.classList.add("selected");
      });
      avatarGrid.appendChild(b);
    });
  }

  function openProfileModal() {
    document.getElementById("profile-name-input").value = state.profile.name;
    selectedAvatar = state.profile.avatar;
    renderAvatarGrid();
    document.getElementById("profile-modal").hidden = false;
  }
  function closeProfileModal() { document.getElementById("profile-modal").hidden = true; }

  document.getElementById("profile-open").addEventListener("click", openProfileModal);
  document.getElementById("profile-cancel").addEventListener("click", closeProfileModal);
  document.getElementById("profile-save").addEventListener("click", function () {
    var name = document.getElementById("profile-name-input").value.trim();
    state.profile.name = name || "UTN Student";
    state.profile.avatar = selectedAvatar;
    saveProgress(state);
    updateProfileUI();
    closeProfileModal();
  });
  document.getElementById("profile-modal").addEventListener("click", function (e) {
    if (e.target.id === "profile-modal") closeProfileModal();
  });

  function updateProfileUI() {
    document.getElementById("profile-chip-avatar").textContent = state.profile.avatar;
    document.getElementById("bp-name").textContent = state.profile.name;
    document.getElementById("bp-avatar").textContent = state.profile.avatar;
  }

  /* ============ BOARDING PASS ============ */
  function updateBoardingPass() {
    var lvl = LEVELS[state.currentLevelIndex];
    var totalLessons = LESSONS[lvl.code].length;
    var doneInLevel = LESSONS[lvl.code].filter(function (_, i) {
      return state.completedLessons.indexOf(lessonId(lvl.code, i)) !== -1;
    }).length;
    document.getElementById("bp-level").textContent = lvl.code + " · " + lvl.name;
    document.getElementById("bp-skill").textContent = lvl.skill;
    document.getElementById("bp-gate").textContent = "Lesson " + Math.min(doneInLevel + 1, totalLessons) + " of " + totalLessons;
    document.getElementById("bp-code").textContent = "UTN-" + lvl.code + "-0" + (doneInLevel + 1);
    var pct = Math.round((state.stamps.length / LEVELS.length) * 100);
    document.getElementById("bp-progress-fill").style.width = Math.max(6, pct) + "%";
    updateProfileUI();
  }

  /* ============ GATES / NIVELES ============ */
  function renderGates() {
    var grid = document.getElementById("gates-grid");
    grid.innerHTML = "";
    LEVELS.forEach(function (lvl, i) {
      var earned = state.stamps.indexOf(lvl.code) !== -1;
      var locked = i > state.currentLevelIndex;
      var statusClass = earned ? "done" : (locked ? "locked" : "active");
      var statusText = earned ? "completed" : (locked ? "locked" : "in progress");
      var lessons = LESSONS[lvl.code];

      var card = document.createElement("article");
      card.className = "gate-card" + (locked ? " locked" : "");

      var pillsHtml = lessons.map(function (les, li) {
        var done = state.completedLessons.indexOf(lessonId(lvl.code, li)) !== -1;
        return '<button class="lesson-pill' + (done ? " done" : "") + '" data-level="' + i + '" data-lesson="' + li + '" ' + (locked ? "disabled" : "") + '>' +
          (done ? "✓ " : "") + (li + 1) + "</button>";
      }).join("");

      card.innerHTML =
        '<div class="gate-top">' +
          '<span class="gate-code">' + lvl.code + '</span>' +
          '<span class="gate-status ' + statusClass + '">' + statusText + '</span>' +
        '</div>' +
        '<p class="gate-name">' + lvl.name + '</p>' +
        '<p class="gate-desc">' + lvl.desc + '</p>' +
        '<div class="lesson-pills">' + pillsHtml + '</div>';

      if (!locked) {
        card.querySelectorAll(".lesson-pill").forEach(function (btn) {
          btn.addEventListener("click", function () {
            activeLevelIndex = parseInt(btn.dataset.level, 10);
            activeLessonIndex = parseInt(btn.dataset.lesson, 10);
            goto("leccion");
          });
        });
      }
      grid.appendChild(card);
    });
  }

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

  /* ============ PROGRESS ============ */
  function renderProgress() {
    var lvl = LEVELS[state.currentLevelIndex];
    document.getElementById("summary-level").textContent = lvl.code;
    document.getElementById("summary-stamps").textContent = state.stamps.length;
    var pct = Math.round((state.stamps.length / LEVELS.length) * 100);
    document.getElementById("summary-percent").textContent = pct + "%";

    var passport = document.getElementById("passport-stamps");
    passport.innerHTML = "";
    LEVELS.forEach(function (l) {
      var earned = state.stamps.indexOf(l.code) !== -1;
      var s = document.createElement("div");
      s.className = "stamp" + (earned ? " earned" : "");
      s.textContent = l.code;
      passport.appendChild(s);
    });

    var list = document.getElementById("deliverables-list");
    list.innerHTML = "";
    DELIVERABLES.forEach(function (d) {
      var done = state.stamps.indexOf(d.code) !== -1;
      var li = document.createElement("li");
      li.innerHTML = '<span class="deliverable-check' + (done ? " done" : "") + '">' + (done ? "✓" : "") + "</span><span>" + d.text + "</span>";
      list.appendChild(li);
    });

    var complete = state.stamps.length === LEVELS.length;
    var certBtn = document.getElementById("certificate-btn");
    var certDesc = document.getElementById("certificate-desc");
    certBtn.disabled = !complete;
    certDesc.textContent = complete
      ? "You completed all six levels! Download your program certificate."
      : "Complete all six levels (A1 to C2) to unlock your downloadable certificate.";
  }

  /* ============ CERTIFICATE ============ */
  function drawCertificate() {
    var canvas = document.getElementById("certificate-canvas");
    var ctx = canvas.getContext("2d");
    var w = canvas.width, h = canvas.height;

    ctx.fillStyle = "#FAFBFA";
    ctx.fillRect(0, 0, w, h);

    /* top tricolor stripe */
    var stripeH = 16;
    ctx.fillStyle = "#0C4EB8"; ctx.fillRect(0, 0, w / 3, stripeH);
    ctx.fillStyle = "#E2141B"; ctx.fillRect(w / 3, 0, w / 3, stripeH);
    ctx.fillStyle = "#0C9C61"; ctx.fillRect((w / 3) * 2, 0, w / 3, stripeH);
    ctx.fillStyle = "#0C4EB8"; ctx.fillRect(0, h - stripeH, w / 3, stripeH);
    ctx.fillStyle = "#E2141B"; ctx.fillRect(w / 3, h - stripeH, w / 3, stripeH);
    ctx.fillStyle = "#0C9C61"; ctx.fillRect((w / 3) * 2, h - stripeH, w / 3, stripeH);

    /* border */
    ctx.strokeStyle = "#121212";
    ctx.lineWidth = 3;
    ctx.strokeRect(24, 40, w - 48, h - 80);

    /* circular seal */
    var cx = w - 140, cy = h - 160, r = 70;
    ctx.beginPath(); ctx.arc(cx, cy, r, 0, Math.PI * 2); ctx.fillStyle = "#0C4EB8"; ctx.fill();
    ctx.beginPath(); ctx.arc(cx, cy, r * 0.78, 0, Math.PI * 2); ctx.fillStyle = "#FAFBFA"; ctx.fill();
    ctx.beginPath(); ctx.arc(cx, cy, r * 0.78, 0, Math.PI * 2); ctx.lineWidth = 6; ctx.strokeStyle = "#E2141B"; ctx.stroke();
    ctx.beginPath(); ctx.arc(cx, cy, r * 0.55, 0, Math.PI * 2); ctx.fillStyle = "#0C9C61"; ctx.fill();
    ctx.beginPath(); ctx.arc(cx, cy, r * 0.4, 0, Math.PI * 2); ctx.fillStyle = "#FAFBFA"; ctx.fill();
    ctx.fillStyle = "#0C4EB8";
    ctx.font = "bold 22px 'Space Grotesk', sans-serif";
    ctx.textAlign = "center"; ctx.textBaseline = "middle";
    ctx.fillText("UT", cx, cy + 2);

    /* texts */
    ctx.fillStyle = "#565B5E";
    ctx.font = "13px 'Space Grotesk', sans-serif";
    ctx.textAlign = "center";
    ctx.fillText("UNIVERSIDAD TECNOLÓGICA DE NEZAHUALCÓYOTL · ACADEMIC EXCELLENCE", w / 2, 90);

    ctx.fillStyle = "#0C4EB8";
    ctx.font = "bold 40px 'Space Grotesk', sans-serif";
    ctx.fillText("Certificate of Completion", w / 2, 150);

    ctx.fillStyle = "#16181A";
    ctx.font = "17px 'Source Serif 4', Georgia, serif";
    ctx.fillText("This certifies that", w / 2, 230);

    ctx.fillStyle = "#E2141B";
    ctx.font = "bold 34px 'Space Grotesk', sans-serif";
    ctx.fillText(state.profile.name, w / 2, 285);

    ctx.fillStyle = "#16181A";
    ctx.font = "17px 'Source Serif 4', Georgia, serif";
    wrapText(ctx, "has successfully completed the MyUTNEnglishClass English program,", w / 2, 335, w - 200, 24);
    wrapText(ctx, "completing all six levels of the Common European Framework, from A1 to C2.", w / 2, 359, w - 200, 24);

    ctx.fillStyle = "#565B5E";
    ctx.font = "14px 'Space Grotesk', sans-serif";
    var today = new Date();
    var fecha = today.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
    ctx.fillText("Issued on " + fecha, w / 2, 430);

    ctx.textAlign = "left";
    ctx.fillStyle = "#16181A";
    ctx.font = "13px 'Space Grotesk', sans-serif";
    ctx.fillText("Social Service Program", 70, h - 100);
    ctx.fillText("Education, Arts, Culture and Sports", 70, h - 80);
  }

  function wrapText(ctx, text, x, y, maxWidth, lineHeight) {
    var words = text.split(" ");
    var line = "";
    var lines = [];
    words.forEach(function (word) {
      var test = line + word + " ";
      if (ctx.measureText(test).width > maxWidth && line !== "") {
        lines.push(line);
        line = word + " ";
      } else {
        line = test;
      }
    });
    lines.push(line);
    lines.forEach(function (l, i) { ctx.fillText(l.trim(), x, y + i * lineHeight); });
  }

  document.getElementById("certificate-btn").addEventListener("click", function () {
    drawCertificate();
    var canvas = document.getElementById("certificate-canvas");
    var link = document.createElement("a");
    link.download = "Certificate-MyUTNEnglishClass-" + state.profile.name.replace(/\s+/g, "_") + ".png";
    link.href = canvas.toDataURL("image/png");
    link.click();
  });

  /* ============ CONGRATULATIONS MODAL ============ */
  function openCongratsModal() { document.getElementById("congrats-modal").hidden = false; }
  function closeCongratsModal() { document.getElementById("congrats-modal").hidden = true; }
  document.getElementById("congrats-close").addEventListener("click", function () {
    closeCongratsModal();
    goto("progreso");
  });

  /* ============================================================
     SKILLS — Reading / Writing / Speaking / Letter
     Gamified "language app" style practice zone, with XP,
     daily streak, and four types of interactive exercise.
     ============================================================ */

  var SKILLS = {
    A1: {
      reading: {
        title: "My name is Sofía",
        passage: "Hello! My name is Sofía and I {{study|estudiar}} Software Engineering at UTN. I am {{from|de / desde}} Nezahualcóyotl, in Mexico. Nice to meet you!",
        questions: [
          { q: "Where does Sofía study?", options: ["At home", "At UTN", "At a café"], correct: 1 },
          { q: "Where is Sofía from?", options: ["Spain", "Nezahualcóyotl", "Canada"], correct: 1 }
        ]
      },
      writing: {
        prompts: [
          { es: "Mi nombre es Sofía.", en: ["My", "name", "is", "Sofía", "."] },
          { es: "Yo estudio en la UTN.", en: ["I", "study", "at", "UTN", "."] },
          { es: "¿De dónde eres?", en: ["Where", "are", "you", "from", "?"] }
        ]
      },
      speaking: {
        phrases: [
          { en: "Hello, my name is Sofía.", es: "Basic greeting with introduction" },
          { en: "Nice to meet you.", es: "Nice to meet you" },
          { en: "Where are you from?", es: "Asking about origin" },
          { en: "See you later!", es: "Informal farewell" }
        ]
      },
      letter: {
        salutation: "Dear Ana,",
        body: "Hello! My name {{1}} Sofía. I {{2}} at UTN in Nezahualcóyotl. I {{3}} from Mexico. See you {{4}}!",
        closing: "Best, Sofía",
        blanks: [
          { id: 1, answer: "is" },
          { id: 2, answer: "study" },
          { id: 3, answer: "am" },
          { id: 4, answer: "soon" }
        ],
        distractors: ["are", "live"]
      }
    },
    A2: {
      reading: {
        title: "My daily routine",
        passage: "I {{usually|normalmente}} wake up at seven in the morning. After breakfast, I go to class at UTN. In the afternoon, I study at the {{library|biblioteca}}. On weekends, I visit my family or go to the park.",
        questions: [
          { q: "What does Sofía do in the afternoon?", options: ["She sleeps", "She studies at the library", "She works"], correct: 1 },
          { q: "What time does she usually wake up?", options: ["At seven", "At nine", "At twelve"], correct: 0 }
        ]
      },
      writing: {
        prompts: [
          { es: "Yo normalmente me despierto a las siete.", en: ["I", "usually", "wake", "up", "at", "seven", "."] },
          { es: "Voy a la biblioteca por la tarde.", en: ["I", "go", "to", "the", "library", "in", "the", "afternoon", "."] },
          { es: "El próximo fin de semana visitaré a mi familia.", en: ["Next", "weekend", "I", "am", "going", "to", "visit", "my", "family", "."] }
        ]
      },
      speaking: {
        phrases: [
          { en: "I usually wake up at seven.", es: "Describing a routine" },
          { en: "I go to class every morning.", es: "Talking about habits" },
          { en: "What is your daily routine like?", es: "Asking about someone's routine" },
          { en: "See you at the library!", es: "Farewell with meeting place" }
        ]
      },
      letter: {
        salutation: "Hi Diego,",
        body: "Next weekend I {{1}} going to visit the park. Do you want {{2}} come with me? We can {{3}} lunch downtown after the walk.",
        closing: "See you soon, Sofía",
        blanks: [
          { id: 1, answer: "am" },
          { id: 2, answer: "to" },
          { id: 3, answer: "have" }
        ],
        distractors: ["is", "for"]
      }
    },
    B1: {
      reading: {
        title: "Learning English",
        passage: "In my opinion, learning English opens many doors. Some people believe {{practice|práctica}} is more important than perfection, while others prefer studying grammar first. Personally, I enjoy group {{discussions|discusiones}} because they help me improve my speaking skills quickly.",
        questions: [
          { q: "What does the author enjoy?", options: ["Studying alone", "Group discussions", "Watching TV"], correct: 1 },
          { q: "For some people, what is more important than perfection?", options: ["Practice", "Grammar", "Vocabulary"], correct: 0 }
        ]
      },
      writing: {
        prompts: [
          { es: "En mi opinión, la práctica es más importante que la perfección.", en: ["In", "my", "opinion", ",", "practice", "is", "more", "important", "than", "perfection", "."] },
          { es: "Personalmente, disfruto las discusiones en grupo.", en: ["Personally", ",", "I", "enjoy", "group", "discussions", "."] },
          { es: "Por otro lado, algunas personas prefieren estudiar solas.", en: ["On", "the", "other", "hand", ",", "some", "people", "prefer", "studying", "alone", "."] }
        ]
      },
      speaking: {
        phrases: [
          { en: "In my opinion, practice matters most.", es: "Giving a point of view" },
          { en: "I believe practice makes progress.", es: "Expressing a belief" },
          { en: "What do you think about studying abroad?", es: "Asking someone's opinion" },
          { en: "Let's discuss the advantages and disadvantages.", es: "Proposing a debate" }
        ]
      },
      letter: {
        salutation: "Dear Professor López,",
        body: "I {{1}} writing to ask about the study abroad program. In my opinion, this {{2}} a great opportunity for students. Could you send me more information? I would {{3}} grateful for your help.",
        closing: "Sincerely, Sofía",
        blanks: [
          { id: 1, answer: "am" },
          { id: 2, answer: "is" },
          { id: 3, answer: "be" }
        ],
        distractors: ["was", "were"]
      }
    },
    B2: {
      reading: {
        title: "Renewable energy",
        passage: "Today's lecture is about renewable energy sources. Solar and wind power are growing rapidly worldwide because they reduce dependence on {{fossil fuels|combustibles fósiles}}. However, {{storage|almacenamiento}} remains a technical challenge that researchers are still trying to solve.",
        questions: [
          { q: "What is the lecture about?", options: ["Renewable energy", "World history", "Finance"], correct: 0 },
          { q: "What is the challenge mentioned?", options: ["Cost", "Storage", "Transportation"], correct: 1 }
        ]
      },
      writing: {
        prompts: [
          { es: "La energía solar y eólica está creciendo rápidamente.", en: ["Solar", "and", "wind", "power", "are", "growing", "rapidly", "."] },
          { es: "El almacenamiento sigue siendo un reto técnico.", en: ["Storage", "remains", "a", "technical", "challenge", "."] },
          { es: "Analicemos ambos lados del argumento.", en: ["Let's", "weigh", "both", "sides", "of", "the", "argument", "."] }
        ]
      },
      speaking: {
        phrases: [
          { en: "Today's lecture is about renewable energy.", es: "Introducing a topic" },
          { en: "However, storage remains a challenge.", es: "Contrasting an idea" },
          { en: "Let's summarize the key points.", es: "Closing an explanation" },
          { en: "Some researchers argue that timelines vary.", es: "Citing an academic stance" }
        ]
      },
      letter: {
        salutation: "Dear classmates,",
        body: "I {{1}} attaching a summary of today's lecture. The main topic {{2}} renewable energy sources. Please feel {{3}} to add your notes. Looking forward to our discussion.",
        closing: "Best regards, Sofía",
        blanks: [
          { id: 1, answer: "am" },
          { id: 2, answer: "is" },
          { id: 3, answer: "free" }
        ],
        distractors: ["was", "for"]
      }
    },
    C1: {
      reading: {
        title: "Academic writing",
        passage: "A strong {{thesis statement|declaración de tesis}} guides the entire essay. Each paragraph should support the main argument with clear {{evidence|evidencia}}. Avoid vague statements without proof, and remember that a well-structured conclusion restates your position without repeating it word for word.",
        questions: [
          { q: "What guides the whole essay?", options: ["The conclusion", "The thesis statement", "The title"], correct: 1 },
          { q: "What should a good conclusion do?", options: ["Repeat the whole text", "Restate the position without repeating word for word", "Add new evidence"], correct: 1 }
        ]
      },
      writing: {
        prompts: [
          { es: "Cada párrafo debe apoyar el argumento principal.", en: ["Each", "paragraph", "should", "support", "the", "main", "argument", "."] },
          { es: "Evita afirmaciones vagas sin pruebas.", en: ["Avoid", "vague", "statements", "without", "proof", "."] },
          { es: "Toda afirmación necesita evidencia de una fuente confiable.", en: ["Every", "claim", "needs", "evidence", "from", "a", "reliable", "source", "."] }
        ]
      },
      speaking: {
        phrases: [
          { en: "A strong thesis guides the essay.", es: "Explaining the thesis's function" },
          { en: "Let me support this claim with evidence.", es: "Reinforcing an argument" },
          { en: "In conclusion, my position is clear.", es: "Closing an argument" },
          { en: "This argument is backed by reliable sources.", es: "Citing reliable sources" }
        ]
      },
      letter: {
        salutation: "Dear Committee,",
        body: "I {{1}} writing to submit my final essay for review. This paper {{2}} a clear thesis supported by extensive evidence. I {{3}} confident that the argument {{4}} well-structured.",
        closing: "Respectfully, Sofía",
        blanks: [
          { id: 1, answer: "am" },
          { id: 2, answer: "presents" },
          { id: 3, answer: "am" },
          { id: 4, answer: "is" }
        ],
        distractors: ["was", "presented"]
      }
    },
    C2: {
      reading: {
        title: "A quarterly call",
        passage: "Good morning everyone, thank you for joining this call. Today we will present our {{quarterly results|resultados trimestrales}}, which exceeded expectations. Please feel free to ask questions at any point, and I will now hand it over to my colleague for the {{roadmap|hoja de ruta}}.",
        questions: [
          { q: "What exceeded expectations?", options: ["The weather", "The quarterly results", "The budget"], correct: 1 },
          { q: "What happens after the presentation?", options: ["The call is cancelled", "The floor is handed to a colleague", "The introduction is repeated"], correct: 1 }
        ]
      },
      writing: {
        prompts: [
          { es: "Nuestros resultados superaron las expectativas.", en: ["Our", "results", "exceeded", "expectations", "."] },
          { es: "Le cedo la palabra a mi colega.", en: ["I'll", "hand", "it", "over", "to", "my", "colleague", "."] },
          { es: "Pasemos a la siguiente diapositiva de la hoja de ruta.", en: ["Let's", "move", "on", "to", "the", "next", "slide", "of", "the", "roadmap", "."] }
        ]
      },
      speaking: {
        phrases: [
          { en: "Thank you for joining this call.", es: "Opening a formal meeting" },
          { en: "Our results exceeded expectations.", es: "Presenting positive results" },
          { en: "I'll hand it over to my colleague.", es: "Handing over the floor" },
          { en: "Let's move on to the next slide.", es: "Transitioning in a presentation" }
        ]
      },
      letter: {
        salutation: "Dear team,",
        body: "I {{1}} pleased to share that our quarterly results {{2}} exceeded expectations. I would like {{3}} thank everyone for their hard work. Please feel free {{4}} reach out with any questions.",
        closing: "Best regards, Sofía",
        blanks: [
          { id: 1, answer: "am" },
          { id: 2, answer: "have" },
          { id: 3, answer: "to" },
          { id: 4, answer: "to" }
        ],
        distractors: ["is", "has"]
      }
    }
  };

  var SKILL_META = {
    reading: { icon: "📖", label: "Reading", desc: "Read a short text and answer comprehension questions.", xp: 15 },
    writing: { icon: "✍️", label: "Writing", desc: "Build English sentences by dragging words.", xp: 15 },
    speaking: { icon: "🗣️", label: "Speaking", desc: "Listen and practice your pronunciation out loud.", xp: 15 },
    letter: { icon: "✉️", label: "Letter", desc: "Complete a letter or email using the word bank.", xp: 20 }
  };
  var SKILL_ORDER = ["reading", "writing", "speaking", "letter"];

  var activeSkillsLevel = LEVELS[state.currentLevelIndex].code;
  var activeSkillKey = null;

  function shuffleCopy(arr) { return shuffleArray(arr.slice()); }

  function normalizeWord(s) {
    return (s || "").toLowerCase().replace(/[.,!?¿¡"']/g, "").trim();
  }

  /* ---- Daily streak ---- */
  function touchStreak() {
    var today = new Date();
    var todayStr = today.toISOString().slice(0, 10);
    if (state.lastActiveDay === todayStr) return;
    if (state.lastActiveDay) {
      var last = new Date(state.lastActiveDay + "T00:00:00");
      var diffDays = Math.round((new Date(todayStr + "T00:00:00") - last) / 86400000);
      if (diffDays === 1) state.skillsStreak += 1;
      else if (diffDays > 1) state.skillsStreak = 1;
      else if (!state.skillsStreak) state.skillsStreak = 1;
    } else {
      state.skillsStreak = 1;
    }
    state.lastActiveDay = todayStr;
    saveProgress(state);
  }

  /* ---- XP toast ---- */
  var xpToastTimer = null;
  function showXpToast(amount) {
    var toast = document.getElementById("xp-toast");
    toast.textContent = "+" + amount + " XP ⚡ Well done!";
    toast.hidden = false;
    requestAnimationFrame(function () { toast.classList.add("show"); });
    if (xpToastTimer) clearTimeout(xpToastTimer);
    xpToastTimer = setTimeout(function () {
      toast.classList.remove("show");
      setTimeout(function () { toast.hidden = true; }, 250);
    }, 1700);
  }

  function awardXP(amount, skillKey, levelCode) {
    state.skillsXP += amount;
    if (state.skillProgress[skillKey].indexOf(levelCode) === -1) {
      state.skillProgress[skillKey].push(levelCode);
    }
    saveProgress(state);
    showXpToast(amount);
    updateSkillsStatusbar();
  }

  function updateSkillsStatusbar() {
    document.getElementById("skills-streak").textContent = state.skillsStreak;
    document.getElementById("skills-xp").textContent = state.skillsXP;
    document.getElementById("skills-level-label").textContent = activeSkillsLevel;
  }

  /* ---- Main hub (4-card grid) ---- */
  function openSkillsHub() {
    touchStreak();
    if (LEVELS.indexOf(LEVELS.filter(function (l) { return l.code === activeSkillsLevel; })[0]) === -1) {
      activeSkillsLevel = LEVELS[state.currentLevelIndex].code;
    }
    closeSkillPanel();
    updateSkillsStatusbar();
    renderSkillsLevelSwitch();
    renderSkillGrid();
  }

  function renderSkillsLevelSwitch() {
    var wrap = document.getElementById("skills-level-switch");
    wrap.innerHTML = "";
    LEVELS.forEach(function (lvl, i) {
      var locked = i > state.currentLevelIndex;
      var chip = document.createElement("button");
      chip.type = "button";
      chip.className = "skills-level-chip" + (lvl.code === activeSkillsLevel ? " active" : "") + (locked ? " locked" : "");
      chip.textContent = lvl.code;
      chip.disabled = locked;
      chip.addEventListener("click", function () {
        activeSkillsLevel = lvl.code;
        openSkillsHub();
      });
      wrap.appendChild(chip);
    });
  }

  function ringSvg(pct, accentVar) {
    var r = 16, c = 2 * Math.PI * r;
    var offset = c - (c * pct) / 100;
    return '<div class="skill-ring-wrap">' +
      '<svg width="40" height="40" viewBox="0 0 40 40">' +
      '<circle class="skill-ring-track" cx="20" cy="20" r="' + r + '"></circle>' +
      '<circle class="skill-ring-fill" cx="20" cy="20" r="' + r + '" stroke-dasharray="' + c + '" stroke-dashoffset="' + offset + '"></circle>' +
      "</svg>" +
      '<span class="skill-ring-label">' + pct + "%</span>" +
      "</div>";
  }

  function renderSkillGrid() {
    document.getElementById("skill-grid").hidden = false;
    document.getElementById("skill-panel").hidden = true;
    var grid = document.getElementById("skill-grid");
    grid.innerHTML = "";
    SKILL_ORDER.forEach(function (key) {
      var meta = SKILL_META[key];
      var done = state.skillProgress[key].indexOf(activeSkillsLevel) !== -1;
      var pct = done ? 100 : 0;
      var card = document.createElement("article");
      card.className = "skill-card" + (done ? " done" : "");
      card.dataset.skill = key;
      card.tabIndex = 0;
      card.setAttribute("role", "button");
      card.innerHTML =
        '<div class="skill-card-top">' +
          '<span class="skill-card-icon">' + meta.icon + "</span>" +
          ringSvg(pct) +
        "</div>" +
        "<h3>" + meta.label + "</h3>" +
        "<p>" + meta.desc + "</p>" +
        '<div class="skill-card-foot">' +
          '<span class="skill-card-xp">' + (done ? "✓ Stamped" : "+" + meta.xp + " XP") + "</span>" +
          '<span class="skill-card-cta">' + (done ? "Review" : "Practice") + "</span>" +
        "</div>";
      card.addEventListener("click", function () { openSkill(key); });
      card.addEventListener("keydown", function (e) { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); openSkill(key); } });
      grid.appendChild(card);
    });
  }

  function closeSkillPanel() {
    activeSkillKey = null;
    document.getElementById("skill-panel").hidden = true;
    document.getElementById("skill-grid").hidden = false;
  }
  document.getElementById("skill-back").addEventListener("click", function () {
    closeSkillPanel();
    renderSkillGrid();
  });

  function openSkill(key) {
    activeSkillKey = key;
    document.getElementById("skill-grid").hidden = true;
    var panel = document.getElementById("skill-panel");
    panel.hidden = false;
    var data = SKILLS[activeSkillsLevel][key];
    var inner = document.getElementById("skill-panel-inner");
    inner.innerHTML =
      '<div class="skill-panel-head">' +
        '<p class="eyebrow">Level ' + activeSkillsLevel + " · " + SKILL_META[key].label + "</p>" +
        "<h3>" + (data.title || SKILL_META[key].label) + "</h3>" +
        "<p>" + SKILL_META[key].desc + "</p>" +
      "</div>" +
      '<div id="skill-exercise-body"></div>';
    var body = document.getElementById("skill-exercise-body");
    if (key === "reading") renderReadingExercise(data, body);
    else if (key === "writing") renderWritingExercise(data, body);
    else if (key === "speaking") renderSpeakingExercise(data, body);
    else if (key === "letter") renderLetterExercise(data, body);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  /* ---- READING ---- */
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

  /* ============ STATE RELOAD (called by auth.js after logging in) ============
     We don't reload the page: we reread progress now with window.__UTN_UID__
     set, and repaint the view the person was already on. */
  function reloadAppState() {
    state = loadProgress();
    activeLevelIndex = state.currentLevelIndex;
    selectedAvatar = state.profile.avatar;
    updateBoardingPass();
    updateProfileUI();
    var currentView = document.querySelector(".view:not([hidden])");
    goto(currentView ? currentView.dataset.view : "inicio");
  }
  window.__UTN_APP_RELOAD__ = reloadAppState;

  /* ============ GRAMMAR LESSONS ============
     Content arrives progressively from Professor Aguilar. Each entry in
     GRAMMAR_CONTENT unlocks its matching topic in the syllabus menu
     (data-topic attribute). Topics with no entry stay locked (🔒) and
     show a "coming soon" toast when tapped. */
  var GRAMMAR_CONTENT = {
    nouns: {
      label: "Nouns",
      modules: [
        {
          title: "Rules for Forming Plural Nouns",
          objectives: [
            "Form the plural of regular and irregular nouns correctly.",
            "Identify spelling changes when making nouns plural.",
            "Recognize nouns that do not change in the plural.",
            "Avoid common mistakes made by Spanish-speaking learners."
          ],
          rules: [
            {
              title: "General Rule",
              desc: "Most nouns form the plural by adding <strong>-s</strong> to the singular form.",
              structure: "Singular + -s = Plural",
              table: [["book","books"],["student","students"],["computer","computers"],["teacher","teachers"],["phone","phones"]],
              examples: ["I have two <strong>books</strong>.", "There are thirty <strong>students</strong> in the classroom.", "My brothers have new <strong>computers</strong>."]
            },
            {
              number: 1,
              title: "Add -es to nouns ending in -s, -ss, -sh, -ch, -x, or -z",
              desc: "If a noun ends in one of these sounds, add <strong>-es</strong>.",
              table: [["bus","buses"],["class","classes"],["watch","watches"],["dish","dishes"],["box","boxes"],["quiz","quizzes"]],
              examples: ["There are many <strong>boxes</strong> in the office.", "The students took several <strong>quizzes</strong>.", "She washed the <strong>dishes</strong>."]
            },
            {
              number: 2,
              title: "Nouns Ending in Consonant + y",
              desc: "If a noun ends in a <strong>consonant + y</strong>, change the <strong>y</strong> to <strong>i</strong> and add -es.",
              table: [["city","cities"],["country","countries"],["baby","babies"],["family","families"],["dictionary","dictionaries"]],
              examples: ["Mexico has many beautiful <strong>cities</strong>.", "Their <strong>families</strong> are very friendly."]
            },
            {
              number: 3,
              title: "Nouns Ending in Vowel + y",
              desc: "If the <strong>y</strong> comes after a vowel, simply add <strong>-s</strong>.",
              table: [["boy","boys"],["toy","toys"],["key","keys"],["monkey","monkeys"],["day","days"]],
              examples: ["The children have many <strong>toys</strong>.", "We found our <strong>keys</strong>."]
            },
            {
              number: 4,
              title: "Nouns Ending in -o",
              desc: "<strong>A. Most nouns ending in -o add -es:</strong>",
              table: [["potato","potatoes"],["tomato","tomatoes"],["hero","heroes"],["echo","echoes"]],
              examples: ["We bought several <strong>potatoes</strong>.", "The <strong>heroes</strong> received awards."],
              table2Label: "B. Many borrowed words simply add -s:",
              table2: [["photo","photos"],["piano","pianos"],["radio","radios"],["video","videos"],["studio","studios"],["zoo","zoos"]],
              examples2: ["She takes many <strong>photos</strong>.", "There are two <strong>pianos</strong> in the music room."],
              tip: "There is no single rule for all nouns ending in <strong>-o</strong>. When in doubt, consult a reliable dictionary."
            },
            {
              number: 5,
              title: "Nouns Ending in -f or -fe",
              desc: "Some nouns change <strong>-f</strong> or <strong>-fe</strong> to <strong>-ves</strong>.",
              table: [["leaf","leaves"],["life","lives"],["wife","wives"],["knife","knives"],["wolf","wolves"],["shelf","shelves"]],
              examples: ["The trees lost their <strong>leaves</strong>.", "The <strong>wolves</strong> live in the forest."],
              table2Label: "Exceptions (add -s):",
              table2: [["roof","roofs"],["chief","chiefs"],["belief","beliefs"],["cliff","cliffs"],["proof","proofs"]],
              examples2: ["The houses have red <strong>roofs</strong>.", "The <strong>chiefs</strong> attended the meeting."]
            },
            {
              number: 6,
              title: "Irregular Plurals",
              desc: "Some nouns have completely irregular plural forms.",
              table: [["man","men"],["woman","women"],["child","children"],["person","people"],["mouse","mice"],["goose","geese"],["foot","feet"],["tooth","teeth"],["ox","oxen"],["louse","lice"]],
              examples: ["The <strong>children</strong> are playing.", "Two <strong>men</strong> entered the classroom.", "My <strong>feet</strong> hurt after the walk."]
            },
            {
              number: 7,
              title: "Nouns with the Same Singular and Plural Form",
              desc: "Some nouns do not change.",
              table: [["sheep","sheep"],["deer","deer"],["fish*","fish"],["aircraft","aircraft"],["series","series"],["species","species"]],
              examples: ["We saw three <strong>deer</strong>.", "The farmer has many <strong>sheep</strong>."],
              tip: "*<strong>Fishes</strong> is also used in biology when referring to different species of fish."
            },
            {
              number: 8,
              title: "Foreign Plurals",
              desc: "Some nouns borrowed from Latin or Greek keep their original plural forms.",
              table: [["datum","data"],["phenomenon","phenomena"],["criterion","criteria"],["analysis","analyses"],["basis","bases"],["thesis","theses"],["crisis","crises"],["cactus","cacti / cactuses"],["fungus","fungi / funguses"],["nucleus","nuclei"]],
              examples: ["The <strong>analyses</strong> were completed yesterday.", "Several <strong>criteria</strong> were considered."]
            },
            {
              number: 9,
              title: "Compound Nouns",
              desc: "Usually, the main noun becomes plural:",
              table: [["mother-in-law","mothers-in-law"],["passer-by","passers-by"],["editor-in-chief","editors-in-chief"],["attorney general","attorneys general"]],
              examples: ["Two <strong>mothers-in-law</strong> attended the party."],
              table2Label: "Other compounds simply add -s:",
              table2: [["notebook","notebooks"],["toothbrush","toothbrushes"],["classroom","classrooms"]],
              examples2: ["We bought new <strong>notebooks</strong>."]
            },
            {
              number: 10,
              title: "Numbers, Letters, and Symbols",
              desc: "To avoid confusion, apostrophes may occasionally be used with letters, but modern style generally prefers <strong>-s</strong>.",
              examples: ["Mind your <strong>p's</strong> and <strong>q's</strong>. <em>(traditional style)</em>", "She got three <strong>As</strong> in her exams. <em>(modern style)</em>"]
            }
          ],
          commonMistakes: [
            ["childs","children"], ["womans","women"], ["informations","information"],
            ["furnitures","furniture"], ["advices","advice"], ["peoples","people"]
          ],
          commonMistakesNote: "\"Peoples\" is correct only when referring to different ethnic groups or nations (e.g., the Indigenous peoples of the Americas) — as the plural of \"person\" in general, use \"people\".",
          quickReference: [
            ["Most nouns", "+ s", "book → books"],
            ["-s, -ss, -sh, -ch, -x, -z", "+ es", "bus → buses"],
            ["Consonant + y", "y → ies", "city → cities"],
            ["Vowel + y", "+ s", "boy → boys"],
            ["Some -o", "+ es", "potato → potatoes"],
            ["Many borrowed -o", "+ s", "photo → photos"],
            ["Some -f / -fe", "→ ves", "knife → knives"],
            ["Exceptions", "+ s", "roof → roofs"],
            ["Irregular", "change form", "child → children"],
            ["Same form", "no change", "sheep → sheep"]
          ],
          memoryTips: [
            "<strong>Most nouns:</strong> add -s.",
            "<strong>Hissing endings</strong> (s, sh, ch, x, z): add -es.",
            "<strong>Consonant + y:</strong> change y to ies.",
            "<strong>Vowel + y:</strong> just add -s.",
            "Learn irregular plurals by memory — they do not follow a predictable pattern.",
            "Use a dictionary when unsure about nouns ending in -o or -f/-fe."
          ]
        }
      ]
    }
  };

  /* Practice quizzes sent by Professor Aguilar (Quizes 1-2 Nouns.docx).
     Rendered as a self-checking worksheet under the Nouns topic. */
  GRAMMAR_CONTENT.nouns.practice = [
    {
      id: "nouns-quiz-1",
      title: "Quiz 1 — Write the Plurals",
      instructions: "Write the plural of each singular word or phrase.",
      example: { text: "a nice sofa", prefix: "", suffix: "", result: "nice sofas" },
      items: [
        { text: "a university", prefix: "", suffix: "", answers: ["universities"] },
        { text: "a sandwich", prefix: "", suffix: "", answers: ["sandwiches"] },
        { text: "a street", prefix: "", suffix: "", answers: ["streets"] },
        { text: "a rich man", prefix: "rich ", suffix: "", answers: ["men"] },
        { text: "one foot", prefix: "two ", suffix: "", answers: ["feet"] },
        { text: "a dirty bag", prefix: "dirty ", suffix: "", answers: ["bags"] },
        { text: "an expensive watch", prefix: "expensive ", suffix: "", answers: ["watches"] },
        { text: "a new phone", prefix: "new ", suffix: "", answers: ["phones"] },
        { text: "a nice photograph", prefix: "nice ", suffix: "", answers: ["photographs"] },
        { text: "one glass of wine", prefix: "two ", suffix: " of wine", answers: ["glasses"] }
      ]
    },
    {
      id: "nouns-quiz-2",
      title: "Quiz 2 — Articles (a/an) and Plurals",
      instructions: "Write a/an before the singular word, then write the plural form.",
      example: { text: "olive", article: "an", prefix: "", suffix: "", result: "olives" },
      items: [
        { text: "bus", article: ["a"], prefix: "", suffix: "", answers: ["buses"] },
        { text: "nice family", article: ["a"], prefix: "nice ", suffix: "", answers: ["families"] },
        { text: "Italian child", article: ["an"], prefix: "Italian ", suffix: "", answers: ["children"] },
        { text: "strong tooth", article: ["a"], prefix: "strong ", suffix: "", answers: ["teeth"] },
        { text: "nice dress", article: ["a"], prefix: "nice ", suffix: "", answers: ["dresses"] },
        { text: "angry wife", article: ["an"], prefix: "angry ", suffix: "", answers: ["wives"] },
        { text: "uniform", article: ["a"], prefix: "", suffix: "", answers: ["uniforms"] },
        { text: "amazing website", article: ["an"], prefix: "amazing ", suffix: "", answers: ["websites"] },
        { text: "elephant", article: ["an"], prefix: "", suffix: "", answers: ["elephants"] },
        { text: "empty library", article: ["an"], prefix: "empty ", suffix: "", answers: ["libraries"] }
      ]
    }
  ];

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

  function renderGrammarModule(mod) {
    var html = '<div class="grammar-module">' +
      '<div class="grammar-module-head">' +
      '<p class="eyebrow">Parts of Speech · Nouns</p>' +
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

  /* ---- Practice quizzes (self-checking worksheets attached to a grammar topic) ---- */
  function grammarPracticeQuizHtml(quiz) {
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
        html += '<input type="text" class="fill-input practice-blank practice-blank-article" ' +
          'data-quiz="' + quiz.id + '" data-item="' + ii + '" data-kind="article" autocomplete="off" placeholder="a/an">';
      }
      html += ' <span class="practice-quiz-text">' + item.text + '</span> <span class="practice-quiz-arrow">&rArr;</span> ';
      if (item.prefix) html += '<span class="practice-quiz-text">' + item.prefix + "</span>";
      html += '<input type="text" class="fill-input practice-blank" ' +
        'data-quiz="' + quiz.id + '" data-item="' + ii + '" data-kind="plural" autocomplete="off" placeholder="plural">';
      if (item.suffix) html += '<span class="practice-quiz-text">' + item.suffix + "</span>";
      html += "</div>";
    });
    html += "</div>";

    html += '<div class="practice-quiz-actions">' +
      '<button class="btn btn-primary practice-check-btn" type="button" data-quiz="' + quiz.id + '">Check Answers</button>' +
      '<button class="btn btn-ghost-light practice-reset-btn" type="button" data-quiz="' + quiz.id + '">Reset</button>' +
      "</div>" +
      '<p class="practice-quiz-result" id="practice-result-' + quiz.id + '" hidden></p>' +
      "</div>";
    return html;
  }

  function initGrammarPracticeQuizzes(container, quizzes) {
    (quizzes || []).forEach(function (quiz) {
      var card = container.querySelector('.practice-quiz-card[data-quiz-id="' + quiz.id + '"]');
      if (!card) return;
      var checkBtn = card.querySelector(".practice-check-btn");
      var resetBtn = card.querySelector(".practice-reset-btn");
      var resultEl = card.querySelector(".practice-quiz-result");

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
        quiz.items.forEach(function (item, ii) {
          var pluralInput = card.querySelector('.practice-blank[data-item="' + ii + '"][data-kind="plural"]');
          total++;
          var pluralVal = pluralInput.value.trim().toLowerCase();
          var pluralOk = item.answers.some(function (a) { return a.toLowerCase() === pluralVal; });
          pluralInput.classList.remove("correct", "incorrect");
          pluralInput.classList.add(pluralOk ? "correct" : "incorrect");
          pluralInput.disabled = true;
          if (pluralOk) correct++;

          if (item.article) {
            var articleInput = card.querySelector('.practice-blank[data-item="' + ii + '"][data-kind="article"]');
            total++;
            var articleVal = articleInput.value.trim().toLowerCase();
            var articleOk = item.article.indexOf(articleVal) !== -1;
            articleInput.classList.remove("correct", "incorrect");
            articleInput.classList.add(articleOk ? "correct" : "incorrect");
            articleInput.disabled = true;
            if (articleOk) correct++;
          }
        });
        checkBtn.disabled = true;
        resultEl.hidden = false;
        resultEl.textContent = "You got " + correct + " out of " + total + " correct.";
        resultEl.style.color = correct === total ? "var(--green-dark)" : "var(--red)";
      });

      resetBtn.addEventListener("click", function () {
        blankInputs.forEach(function (input) {
          input.value = "";
          input.disabled = false;
          input.classList.remove("correct", "incorrect");
        });
        checkBtn.disabled = false;
        resultEl.hidden = true;
        if (blankInputs[0]) blankInputs[0].focus();
      });
    });
  }

  function openGrammarTopic(slug) {
    var topic = GRAMMAR_CONTENT[slug];
    if (!topic) return;
    document.getElementById("grammar-browse").hidden = true;
    var panel = document.getElementById("grammar-panel");
    panel.hidden = false;
    var inner = document.getElementById("grammar-panel-inner");
    var html = "";
    if (topic.practice && topic.practice.length) {
      html += '<div class="grammar-practice-cta">' +
        '<span class="grammar-practice-cta-text">🎯 <strong>New!</strong> Practice what you learn here with ' +
          topic.practice.length + ' interactive quizzes.</span>' +
        '<button type="button" class="btn btn-primary btn-sm grammar-practice-cta-btn" id="' + slug + '-cta-btn">Go to Quizzes ↓</button>' +
        "</div>";
    }
    html += topic.modules.map(renderGrammarModule).join("");
    if (topic.practice && topic.practice.length) {
      html += '<div class="grammar-practice-section" id="' + slug + '-practice">' +
        '<p class="grammar-section-title">🎮 Interactive Exercises</p>' +
        topic.practice.map(grammarPracticeQuizHtml).join("") +
        "</div>";
    }
    inner.innerHTML = html;
    if (topic.practice) {
      initGrammarPracticeQuizzes(inner, topic.practice);
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

  /* ============ INIT ============ */
  updateBoardingPass();
  updateProfileUI();
  (function initialView() {
    var hash = (location.hash || "").replace("#", "");
    var valid = hash && document.querySelector('.view[data-view="' + hash + '"]');
    goto(valid ? hash : "inicio");
  })();
})();
