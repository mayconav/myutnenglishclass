(function () {
  "use strict";

  /* ============ CONTENT DATA ============ */
  var LEVELS = [
    { code: "A1", name: "Principiante", skill: "Vocabulario esencial", desc: "Saludos, presentaciones y vocabulario cotidiano." },
    { code: "A2", name: "Elemental", skill: "Rutinas diarias", desc: "Describir rutinas, lugares y planes simples." },
    { code: "B1", name: "Intermedio", skill: "Speaking fluido", desc: "Conversaciones sobre estudios, trabajo y opiniones." },
<<<<<<< HEAD
    { code: "B2", name: "Upper Intermediate", skill: "Listening Comprehension", desc: "Escuchar y debatir temas académicos." },
=======
    { code: "B2", name: "Intermedio alto", skill: "Comprensión auditiva", desc: "Escuchar y debatir temas académicos." },
>>>>>>> b609fc87bab8bb42d5c14eb5c1e0759a1c1c638c
    { code: "C1", name: "Avanzado", skill: "Escritura académica", desc: "Redacción de ensayos y argumentación." },
    { code: "C2", name: "Dominio", skill: "Fluidez profesional", desc: "Presentaciones y comunicación especializada." }
  ];

  /* Cada nivel tiene 2 lecciones. La lección 1 usa opción múltiple;
     la lección 2 mezcla completar-espacio y relacionar, para variar el tipo de ejercicio. */
  var LESSONS = {
    A1: [
      {
        title: "Vocabulario esencial",
        duration: 40,
        captions: [
          { t: 0, text: "Hello! My name is Sofía and I study at UTN." },
          { t: 10, text: "Nice to meet you. Where are you from?" },
          { t: 20, text: "I am from Nezahualcóyotl, in Mexico." },
          { t: 30, text: "Great! Let's practice some everyday words." }
        ],
        quiz: [
          { type: "mcq", q: "¿Cómo se dice 'encantado de conocerte'?", options: ["Nice to meet you", "See you later", "Good night"], correct: 0 },
          { type: "mcq", q: "'Where are you from?' pregunta sobre...", options: ["La edad", "El origen", "La hora"], correct: 1 }
        ]
      },
      {
        title: "Saludos y despedidas",
        duration: 35,
        captions: [
          { t: 0, text: "Good morning! How are you today?" },
          { t: 10, text: "I'm fine, thank you. And you?" },
          { t: 20, text: "See you later, have a nice day!" }
        ],
        quiz: [
          { type: "fill", q: "Completa: 'Good ___, how are you?' (saludo de mañana)", answer: ["morning"] },
          { type: "match", instructions: "Relaciona cada saludo en inglés con su traducción.", pairs: [
            ["Good morning", "Buenos días"],
            ["See you later", "Nos vemos luego"],
            ["Thank you", "Gracias"]
          ]}
        ]
      }
    ],
    A2: [
      {
        title: "Rutinas diarias",
        duration: 40,
        captions: [
          { t: 0, text: "I usually wake up at seven in the morning." },
          { t: 10, text: "Then I have breakfast and go to class." },
          { t: 20, text: "In the afternoon, I study at the library." },
          { t: 30, text: "What is your daily routine like?" }
        ],
        quiz: [
          { type: "mcq", q: "'I usually wake up at seven' describe...", options: ["Un plan futuro", "Una rutina", "Un consejo"], correct: 1 },
          { type: "mcq", q: "¿Qué palabra indica frecuencia?", options: ["Usually", "Library", "Afternoon"], correct: 0 }
        ]
      },
      {
        title: "Lugares y planes",
        duration: 35,
        captions: [
          { t: 0, text: "Next weekend I am going to visit my family." },
          { t: 10, text: "We are planning to go to the park." },
          { t: 20, text: "After that, we will have lunch downtown." }
        ],
        quiz: [
          { type: "fill", q: "Completa: 'I am going ___ visit my family.' (preposición de plan futuro)", answer: ["to"] },
          { type: "match", instructions: "Relaciona el lugar en inglés con su traducción.", pairs: [
            ["Park", "Parque"],
            ["Downtown", "Centro"],
            ["Library", "Biblioteca"]
          ]}
        ]
      }
    ],
    B1: [
      {
        title: "Speaking fluido",
        duration: 45,
        captions: [
          { t: 0, text: "In my opinion, learning English opens many doors." },
          { t: 12, text: "I think practice is more important than perfection." },
          { t: 24, text: "What do you think about studying abroad?" },
          { t: 36, text: "Let's discuss the advantages and disadvantages." }
        ],
        quiz: [
          { type: "mcq", q: "'In my opinion' se usa para...", options: ["Dar un dato", "Expresar un punto de vista", "Hacer una pregunta"], correct: 1 },
          { type: "mcq", q: "Sinónimo de 'advantages'", options: ["Beneficios", "Errores", "Horarios"], correct: 0 }
        ]
      },
      {
        title: "Dar opiniones",
        duration: 38,
        captions: [
          { t: 0, text: "I believe practice makes progress, not perfection." },
          { t: 10, text: "On the other hand, some people prefer studying alone." },
          { t: 20, text: "Personally, I enjoy group discussions." }
        ],
        quiz: [
          { type: "fill", q: "Completa: 'On the other ___, some people prefer studying alone.'", answer: ["hand"] },
          { type: "match", instructions: "Relaciona la frase de opinión con su traducción.", pairs: [
            ["I believe", "Yo creo"],
            ["Personally", "Personalmente"],
            ["On the other hand", "Por otro lado"]
          ]}
        ]
      }
    ],
    B2: [
      {
<<<<<<< HEAD
        title: "Listening Comprehension",
=======
        title: "Comprensión auditiva",
>>>>>>> b609fc87bab8bb42d5c14eb5c1e0759a1c1c638c
        duration: 45,
        captions: [
          { t: 0, text: "Today's lecture is about renewable energy sources." },
          { t: 12, text: "Solar and wind power are growing rapidly worldwide." },
          { t: 24, text: "However, storage remains a technical challenge." },
          { t: 36, text: "Let's summarize the key points together." }
        ],
        quiz: [
          { type: "mcq", q: "El tema principal de la conferencia es...", options: ["Energías renovables", "Historia mundial", "Finanzas"], correct: 0 },
          { type: "mcq", q: "'Challenge' en este contexto significa...", options: ["Logro", "Reto", "Premio"], correct: 1 }
        ]
      },
      {
        title: "Debatir temas académicos",
        duration: 40,
        captions: [
          { t: 0, text: "Some researchers argue that storage technology will improve soon." },
          { t: 12, text: "Others remain skeptical about the timeline." },
          { t: 24, text: "Let's weigh both sides of the argument." }
        ],
        quiz: [
          { type: "fill", q: "Completa: 'Let's weigh both ___ of the argument.'", answer: ["sides"] },
          { type: "match", instructions: "Relaciona el término académico con su traducción.", pairs: [
            ["Researchers", "Investigadores"],
            ["Skeptical", "Escéptico"],
            ["Argument", "Argumento"]
          ]}
        ]
      }
    ],
    C1: [
      {
        title: "Escritura académica",
        duration: 45,
        captions: [
          { t: 0, text: "A strong thesis statement guides the entire essay." },
          { t: 12, text: "Each paragraph should support your main argument." },
          { t: 24, text: "Use evidence to strengthen your claims." },
          { t: 36, text: "Finally, the conclusion restates your position." }
        ],
        quiz: [
          { type: "mcq", q: "La tesis de un ensayo debe...", options: ["Ir al final", "Guiar el argumento", "Ser irrelevante"], correct: 1 },
          { type: "mcq", q: "'Evidence' se traduce como...", options: ["Evidencia", "Emoción", "Extensión"], correct: 0 }
        ]
      },
      {
        title: "Redactar con evidencia",
        duration: 38,
        captions: [
          { t: 0, text: "Every claim needs supporting evidence from a reliable source." },
          { t: 12, text: "Avoid vague statements without proof." },
          { t: 24, text: "A clear conclusion restates your main point." }
        ],
        quiz: [
          { type: "fill", q: "Completa: 'Every claim needs supporting ___.'", answer: ["evidence"] },
          { type: "match", instructions: "Relaciona el término de escritura académica con su traducción.", pairs: [
            ["Claim", "Afirmación"],
            ["Source", "Fuente"],
            ["Conclusion", "Conclusión"]
          ]}
        ]
      }
    ],
    C2: [
      {
        title: "Fluidez profesional",
        duration: 45,
        captions: [
          { t: 0, text: "Good morning everyone, thank you for joining this call." },
          { t: 12, text: "Today we will present our quarterly results." },
          { t: 24, text: "Please feel free to ask questions at any point." },
          { t: 36, text: "Let's begin with an overview of the project." }
        ],
        quiz: [
          { type: "mcq", q: "Esta lección simula...", options: ["Una fiesta", "Una presentación profesional", "Una receta"], correct: 1 },
<<<<<<< HEAD
          { type: "mcq", q: "'Feel free to ask' invita a...", options: ["Save silencio", "Hacer preguntas", "Terminar la llamada"], correct: 0 }
=======
          { type: "mcq", q: "'Feel free to ask' invita a...", options: ["Guardar silencio", "Hacer preguntas", "Terminar la llamada"], correct: 0 }
>>>>>>> b609fc87bab8bb42d5c14eb5c1e0759a1c1c638c
        ]
      },
      {
        title: "Presentaciones especializadas",
        duration: 40,
        captions: [
          { t: 0, text: "Let's move on to the next slide of our roadmap." },
          { t: 12, text: "As you can see, our results exceeded expectations." },
          { t: 24, text: "I'll now hand it over to my colleague for questions." }
        ],
        quiz: [
          { type: "fill", q: "Completa: 'Let's move on to the next ___.'", answer: ["slide"] },
          { type: "match", instructions: "Relaciona la frase profesional con su traducción.", pairs: [
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
    return { code: lvl.code, text: "Entregable " + lvl.code + ": " + lvl.skill };
  });

  /* ============ STATE ============ */
  /* Se recalcula en cada llamada (no una sola vez al cargar el script) porque
     app.js ahora se carga siempre, incluso para invitados sin sesión. Cuando
     alguien inicia sesión, window.__UTN_UID__ cambia y __UTN_APP_RELOAD__
     vuelve a leer el progreso, esta vez con la clave del estudiante real. */
  function storageKey() { return "myutn_progress_v2_" + (window.__UTN_UID__ || "local"); }

  function defaultState() {
    return {
      currentLevelIndex: 0,
      completedLessons: [],
      stamps: [],
      profile: { name: "Estudiante UTN", avatar: "🎓" },
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
      /* Migración desde versión anterior (myutn_progress_v1) */
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

  /* Grupos de navegación: el navbar principal solo muestra Inicio, Aprender,
     Progreso y Recursos; cada grupo despliega sus vistas reales como pestañas
     internas para no perder ninguna sección existente. */
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
    /* Si se navega a un grupo (clic en "Aprender"/"Recursos" del navbar),
       resolver a la última pestaña visitada dentro de ese grupo. */
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

  /* ============ PERFIL ============ */
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
    state.profile.name = name || "Estudiante UTN";
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
<<<<<<< HEAD
    document.getElementById("bp-gate").textContent = "Lesson " + Math.min(doneInLevel + 1, totalLessons) + " de " + totalLessons;
=======
    document.getElementById("bp-gate").textContent = "Lección " + Math.min(doneInLevel + 1, totalLessons) + " de " + totalLessons;
>>>>>>> b609fc87bab8bb42d5c14eb5c1e0759a1c1c638c
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
      var statusText = earned ? "completo" : (locked ? "bloqueado" : "en curso");
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

  /* ============ LECCIÓN / TABS ============ */
  function renderLessonTabs(levelIdx, lessonIdx) {
    var lvl = LEVELS[levelIdx];
    var lessons = LESSONS[lvl.code];
    var tabsEl = document.getElementById("lesson-tabs");
    tabsEl.innerHTML = "";
    lessons.forEach(function (les, i) {
      var done = state.completedLessons.indexOf(lessonId(lvl.code, i)) !== -1;
      var tab = document.createElement("button");
      tab.className = "lesson-tab" + (i === lessonIdx ? " active" : "") + (done ? " done" : "");
<<<<<<< HEAD
      tab.textContent = (done ? "✓ " : "") + "Lesson " + (i + 1);
=======
      tab.textContent = (done ? "✓ " : "") + "Lección " + (i + 1);
>>>>>>> b609fc87bab8bb42d5c14eb5c1e0759a1c1c638c
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
<<<<<<< HEAD
    document.getElementById("leccion-eyebrow").textContent = "Level " + lvl.code + " · Lesson " + (lessonIdx + 1) + " de " + LESSONS[lvl.code].length;
=======
    document.getElementById("leccion-eyebrow").textContent = "Nivel " + lvl.code + " · Lección " + (lessonIdx + 1) + " de " + LESSONS[lvl.code].length;
>>>>>>> b609fc87bab8bb42d5c14eb5c1e0759a1c1c638c
    document.getElementById("leccion-title").textContent = lesson.title;
    document.getElementById("leccion-desc").textContent = "Escucha el audio, sigue la transcripción y resuelve el quiz para sellar tu avance.";
    document.getElementById("player-total").textContent = formatTime(lesson.duration);
    document.getElementById("player-caption").textContent = "Presiona reproducir para ver la transcripción en vivo.";
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
        var scoreText = "Obtuviste " + correctCount + " de " + lesson.quiz.length + " correctas.";
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
            '<input type="text" class="fill-input" data-qi="' + qi + '" autocomplete="off" placeholder="Escribe tu respuesta">' +
            '<button class="btn btn-primary fill-check" data-qi="' + qi + '">Verificar</button>' +
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
            fb.textContent = "¡Correcto!";
            fb.className = "fill-feedback ok";
          } else {
            input.classList.add("incorrect");
            fb.textContent = "Respuesta esperada: " + q.answer[0];
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
          "<p>" + (qi + 1) + ". " + (q.instructions || "Relaciona los conceptos.") + "</p>" +
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
        /* mcq (por defecto) */
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

  /* ============ PROGRESO ============ */
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
      ? "¡Completaste los seis niveles! Descarga tu certificado del programa."
      : "Completa los seis niveles (A1 a C2) para desbloquear tu certificado descargable.";
  }

  /* ============ CERTIFICADO ============ */
  function drawCertificate() {
    var canvas = document.getElementById("certificate-canvas");
    var ctx = canvas.getContext("2d");
    var w = canvas.width, h = canvas.height;

    ctx.fillStyle = "#FAFBFA";
    ctx.fillRect(0, 0, w, h);

    /* franja tricolor superior */
    var stripeH = 16;
    ctx.fillStyle = "#0C4EB8"; ctx.fillRect(0, 0, w / 3, stripeH);
    ctx.fillStyle = "#E2141B"; ctx.fillRect(w / 3, 0, w / 3, stripeH);
    ctx.fillStyle = "#0C9C61"; ctx.fillRect((w / 3) * 2, 0, w / 3, stripeH);
    ctx.fillStyle = "#0C4EB8"; ctx.fillRect(0, h - stripeH, w / 3, stripeH);
    ctx.fillStyle = "#E2141B"; ctx.fillRect(w / 3, h - stripeH, w / 3, stripeH);
    ctx.fillStyle = "#0C9C61"; ctx.fillRect((w / 3) * 2, h - stripeH, w / 3, stripeH);

    /* borde */
    ctx.strokeStyle = "#121212";
    ctx.lineWidth = 3;
    ctx.strokeRect(24, 40, w - 48, h - 80);

    /* sello circular */
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

    /* textos */
    ctx.fillStyle = "#565B5E";
    ctx.font = "13px 'Space Grotesk', sans-serif";
    ctx.textAlign = "center";
    ctx.fillText("UNIVERSIDAD TECNOLÓGICA DE NEZAHUALCÓYOTL · EXCELENCIA ACADÉMICA", w / 2, 90);

    ctx.fillStyle = "#0C4EB8";
    ctx.font = "bold 40px 'Space Grotesk', sans-serif";
<<<<<<< HEAD
    ctx.fillText("Certificate of Completion", w / 2, 150);
=======
    ctx.fillText("Certificado de finalización", w / 2, 150);
>>>>>>> b609fc87bab8bb42d5c14eb5c1e0759a1c1c638c

    ctx.fillStyle = "#16181A";
    ctx.font = "17px 'Source Serif 4', Georgia, serif";
    ctx.fillText("Se certifica que", w / 2, 230);

    ctx.fillStyle = "#E2141B";
    ctx.font = "bold 34px 'Space Grotesk', sans-serif";
    ctx.fillText(state.profile.name, w / 2, 285);

    ctx.fillStyle = "#16181A";
    ctx.font = "17px 'Source Serif 4', Georgia, serif";
    wrapText(ctx, "ha completado exitosamente el programa de inglés MyUTNEnglishClass,", w / 2, 335, w - 200, 24);
    wrapText(ctx, "cursando los seis niveles del Marco Común Europeo, de A1 a C2.", w / 2, 359, w - 200, 24);

    ctx.fillStyle = "#565B5E";
    ctx.font = "14px 'Space Grotesk', sans-serif";
    var today = new Date();
    var fecha = today.toLocaleDateString("es-MX", { year: "numeric", month: "long", day: "numeric" });
    ctx.fillText("Emitido el " + fecha, w / 2, 430);

    ctx.textAlign = "left";
    ctx.fillStyle = "#16181A";
    ctx.font = "13px 'Space Grotesk', sans-serif";
    ctx.fillText("Programa de Servicio Social", 70, h - 100);
<<<<<<< HEAD
    ctx.fillText("Education, Arts, Culture and Sports", 70, h - 80);
=======
    ctx.fillText("Educación, arte, cultura y deporte", 70, h - 80);
>>>>>>> b609fc87bab8bb42d5c14eb5c1e0759a1c1c638c
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
    link.download = "Certificado-MyUTNEnglishClass-" + state.profile.name.replace(/\s+/g, "_") + ".png";
    link.href = canvas.toDataURL("image/png");
    link.click();
  });

  /* ============ MODAL FELICITACIÓN ============ */
  function openCongratsModal() { document.getElementById("congrats-modal").hidden = false; }
  function closeCongratsModal() { document.getElementById("congrats-modal").hidden = true; }
  document.getElementById("congrats-close").addEventListener("click", function () {
    closeCongratsModal();
    goto("progreso");
  });

  /* ============================================================
     HABILIDADES — Reading / Writing / Speaking / Letter
     Zona de práctica gamificada estilo "app de idiomas", con XP,
     racha diaria y cuatro tipos de ejercicio interactivo.
     ============================================================ */

  var SKILLS = {
    A1: {
      reading: {
        title: "My name is Sofía",
        passage: "Hello! My name is Sofía and I {{study|estudiar}} Software Engineering at UTN. I am {{from|de / desde}} Nezahualcóyotl, in Mexico. Nice to meet you!",
        questions: [
          { q: "¿Dónde estudia Sofía?", options: ["En su casa", "En la UTN", "En un café"], correct: 1 },
          { q: "¿De dónde es Sofía?", options: ["España", "Nezahualcóyotl", "Canadá"], correct: 1 }
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
          { en: "Hello, my name is Sofía.", es: "Saludo básico con presentación" },
          { en: "Nice to meet you.", es: "Encantado de conocerte" },
          { en: "Where are you from?", es: "Preguntar el origen" },
          { en: "See you later!", es: "Despedida informal" }
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
          { q: "¿Qué hace Sofía en la tarde?", options: ["Duerme", "Estudia en la biblioteca", "Trabaja"], correct: 1 },
          { q: "¿A qué hora se despierta normalmente?", options: ["A las siete", "A las nueve", "A las doce"], correct: 0 }
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
          { en: "I usually wake up at seven.", es: "Describir una rutina" },
          { en: "I go to class every morning.", es: "Hablar de hábitos" },
          { en: "What is your daily routine like?", es: "Preguntar por la rutina de alguien" },
          { en: "See you at the library!", es: "Despedida con lugar de encuentro" }
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
          { q: "¿Qué disfruta la autora?", options: ["Estudiar sola", "Las discusiones en grupo", "Ver televisión"], correct: 1 },
          { q: "Para algunas personas, ¿qué es más importante que la perfección?", options: ["La práctica", "La gramática", "El vocabulario"], correct: 0 }
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
          { en: "In my opinion, practice matters most.", es: "Dar un punto de vista" },
          { en: "I believe practice makes progress.", es: "Expresar una creencia" },
          { en: "What do you think about studying abroad?", es: "Pedir la opinión de alguien" },
          { en: "Let's discuss the advantages and disadvantages.", es: "Proponer un debate" }
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
          { q: "¿De qué trata la conferencia?", options: ["Energías renovables", "Historia mundial", "Finanzas"], correct: 0 },
          { q: "¿Cuál es el reto mencionado?", options: ["El costo", "El almacenamiento", "El transporte"], correct: 1 }
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
          { en: "Today's lecture is about renewable energy.", es: "Introducir un tema" },
          { en: "However, storage remains a challenge.", es: "Contrastar una idea" },
          { en: "Let's summarize the key points.", es: "Cerrar una explicación" },
          { en: "Some researchers argue that timelines vary.", es: "Citar una postura académica" }
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
          { q: "¿Qué guía todo el ensayo?", options: ["La conclusión", "La declaración de tesis", "El título"], correct: 1 },
          { q: "¿Qué debe hacer una buena conclusión?", options: ["Repetir todo el texto", "Restablecer la posición sin repetir literalmente", "Añadir nueva evidencia"], correct: 1 }
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
          { en: "A strong thesis guides the essay.", es: "Explicar la función de la tesis" },
          { en: "Let me support this claim with evidence.", es: "Reforzar un argumento" },
          { en: "In conclusion, my position is clear.", es: "Cerrar una argumentación" },
          { en: "This argument is backed by reliable sources.", es: "Citar fuentes confiables" }
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
          { q: "¿Qué superó las expectativas?", options: ["El clima", "Los resultados trimestrales", "El presupuesto"], correct: 1 },
          { q: "¿Qué ocurre después de la presentación?", options: ["Se cancela la llamada", "Se cede la palabra a un colega", "Se repite la introducción"], correct: 1 }
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
          { en: "Thank you for joining this call.", es: "Abrir una reunión formal" },
          { en: "Our results exceeded expectations.", es: "Presentar resultados positivos" },
          { en: "I'll hand it over to my colleague.", es: "Ceder la palabra" },
          { en: "Let's move on to the next slide.", es: "Transicionar en una presentación" }
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
    reading: { icon: "📖", label: "Reading", desc: "Lee un texto corto y responde preguntas de comprensión.", xp: 15 },
    writing: { icon: "✍️", label: "Writing", desc: "Arma oraciones en inglés arrastrando palabras.", xp: 15 },
    speaking: { icon: "🗣️", label: "Speaking", desc: "Escucha y practica tu pronunciación en voz alta.", xp: 15 },
    letter: { icon: "✉️", label: "Letter", desc: "Completa una carta o correo usando el banco de palabras.", xp: 20 }
  };
  var SKILL_ORDER = ["reading", "writing", "speaking", "letter"];

  var activeSkillsLevel = LEVELS[state.currentLevelIndex].code;
  var activeSkillKey = null;

  function shuffleCopy(arr) { return shuffleArray(arr.slice()); }

  function normalizeWord(s) {
    return (s || "").toLowerCase().replace(/[.,!?¿¡"']/g, "").trim();
  }

  /* ---- Racha diaria ---- */
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
    toast.textContent = "+" + amount + " XP ⚡ ¡Bien hecho!";
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

  /* ---- Hub principal (grid de 4 tarjetas) ---- */
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
          '<span class="skill-card-xp">' + (done ? "✓ Sellado" : "+" + meta.xp + " XP") + "</span>" +
          '<span class="skill-card-cta">' + (done ? "Repasar" : "Practicar") + "</span>" +
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
<<<<<<< HEAD
        '<p class="eyebrow">Level ' + activeSkillsLevel + " · " + SKILL_META[key].label + "</p>" +
=======
        '<p class="eyebrow">Nivel ' + activeSkillsLevel + " · " + SKILL_META[key].label + "</p>" +
>>>>>>> b609fc87bab8bb42d5c14eb5c1e0759a1c1c638c
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
    quizCard.innerHTML = '<p class="quiz-heading">Comprensión de lectura</p><div id="reading-quiz-body"></div><div class="quiz-result" id="reading-quiz-result" hidden><p id="reading-quiz-score"></p></div>';
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
          document.getElementById("reading-quiz-score").textContent = "Obtuviste " + correctCount + " de " + data.questions.length + " correctas.";
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
        '<p class="builder-prompt-es">Traduce: “' + prompt.es + '”</p>' +
        '<div class="builder-target" id="builder-target"></div>' +
        '<div class="builder-bank" id="builder-bank"></div>' +
        '<div class="builder-actions">' +
          '<button class="btn btn-ghost-light" id="builder-clear" type="button">Borrar</button>' +
          '<button class="btn btn-primary" id="builder-check" type="button">Verificar</button>' +
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
          fb.textContent = "¡Correcto! " + (idx < data.prompts.length - 1 ? "Siguiente oración…" : "¡Terminaste el ejercicio!");
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
          fb.textContent = "Casi. Revisa el orden de las palabras e inténtalo otra vez.";
          fb.className = "builder-feedback bad";
        }
      });
    }

    function finishWriting() {
      card.innerHTML = '<p class="builder-feedback ok">✓ Completaste las ' + data.prompts.length + " oraciones (" + correctCount + "/" + data.prompts.length + ' en el primer intento).</p>';
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
          '<button type="button" class="speak-btn listen">🔊 Escuchar</button>' +
          '<button type="button" class="speak-btn record">🎤 Practicar</button>' +
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
          feedback.textContent = "✓ Marcado como practicado (tu navegador no soporta reconocimiento de voz).";
          feedback.className = "speaking-feedback ok";
          awardXP(4, "speaking", activeSkillsLevel);
          return;
        }
        var recognition = new SpeechRecognitionCtor();
        recognition.lang = "en-US";
        recognition.interimResults = false;
        recognition.maxAlternatives = 1;
        recordBtn.classList.add("recording");
        recordBtn.textContent = "🎙️ Escuchando…";
        recognition.start();

        recognition.onresult = function (e) {
          var transcript = e.results[0][0].transcript;
          var targetWords = normalizeWord(phrase.en).split(/\s+/).filter(Boolean);
          var saidWords = normalizeWord(transcript).split(/\s+/).filter(Boolean);
          var matches = targetWords.filter(function (w) { return saidWords.indexOf(w) !== -1; }).length;
          var score = targetWords.length ? Math.round((matches / targetWords.length) * 100) : 0;
          if (score >= 70) {
            feedback.textContent = "¡Excelente pronunciación! (" + score + "% de coincidencia) — Dijiste: “" + transcript + "”";
            feedback.className = "speaking-feedback ok";
            awardXP(4, "speaking", activeSkillsLevel);
          } else {
            feedback.textContent = "Sigue practicando (" + score + "% de coincidencia) — Dijiste: “" + transcript + "”";
            feedback.className = "speaking-feedback meh";
          }
        };
        recognition.onerror = function () {
          feedback.textContent = "No pudimos acceder al micrófono. Revisa los permisos e inténtalo de nuevo.";
          feedback.className = "speaking-feedback meh";
        };
        recognition.onend = function () {
          recordBtn.classList.remove("recording");
          recordBtn.textContent = "🎤 Practicar";
        };
      });
    });

    var note = document.createElement("p");
    note.className = "speaking-note";
    note.textContent = "Sugerencia: usa audífonos con micrófono en un lugar silencioso para mejores resultados.";
    body.appendChild(note);

    if (data.phrases.length && state.skillProgress.speaking.indexOf(activeSkillsLevel) === -1) {
      var finishRow = document.createElement("div");
      finishRow.className = "exercise-card";
      finishRow.innerHTML = '<p class="quiz-heading">¿Ya practicaste las frases?</p><button class="btn btn-primary" id="speaking-finish">Sellar habilidad</button>';
      body.appendChild(finishRow);
      finishRow.querySelector("#speaking-finish").addEventListener("click", function () {
        awardXP(SKILL_META.speaking.xp, "speaking", activeSkillsLevel);
        finishRow.innerHTML = '<p class="builder-feedback ok">✓ ¡Speaking sellado para el nivel ' + activeSkillsLevel + "!</p>";
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
    bankCard.innerHTML = '<p class="quiz-heading">Banco de palabras</p><div class="letter-bank" id="letter-bank"></div>' +
      '<div class="letter-check-row"><button class="btn btn-primary" id="letter-check" type="button">Verificar carta</button>' +
      '<button class="btn btn-ghost-light" id="letter-reset" type="button">Reiniciar</button></div>' +
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
        resultEl.textContent = "✓ ¡Carta completa y correcta! (" + correct + "/" + total + ")";
        resultEl.style.color = "var(--green-dark)";
        awardXP(SKILL_META.letter.xp, "letter", activeSkillsLevel);
      } else {
        resultEl.textContent = "Tienes " + correct + " de " + total + " correctas. Ajusta los espacios en rojo.";
        resultEl.style.color = "var(--red)";
      }
    });

    renderBank();
  }

  /* ============ RECARGA DE ESTADO (llamada por auth.js tras iniciar sesión) ============
     No recargamos la página: releemos el progreso ya con window.__UTN_UID__
     puesto, y volvemos a pintar la vista en la que la persona ya estaba. */
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

  /* ============ INIT ============ */
  updateBoardingPass();
  updateProfileUI();
  (function initialView() {
    var hash = (location.hash || "").replace("#", "");
    var valid = hash && document.querySelector('.view[data-view="' + hash + '"]');
    goto(valid ? hash : "inicio");
  })();
})();
