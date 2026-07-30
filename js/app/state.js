"use strict";
/* Estado y persistencia (localStorage) del progreso del estudiante (app.js original: L223-L294) */
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

