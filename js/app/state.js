"use strict";
/* Estado y persistencia (localStorage) del progreso del estudiante (app.js original: L223-L294) */
  /* ============ STATE ============ */
  /* Recalculated on every call (not just once when the script loads) because
     app.js is now always loaded, even for guests without a session. When
     someone logs in, window.__UTN_UID__ changes and __UTN_APP_RELOAD__
     re-reads progress, this time with the real student's key. */
  function storageKey() { return "myutn_progress_v2_" + (window.__UTN_UID__ || "local"); }

  /* Dia local (YYYY-MM-DD). toISOString() usa UTC y en Mexico cambia de dia a las 6 p. m. */
  function localDayKey(date) {
    var d = date || new Date();
    var m = d.getMonth() + 1, day = d.getDate();
    return d.getFullYear() + "-" + (m < 10 ? "0" : "") + m + "-" + (day < 10 ? "0" : "") + day;
  }

  function defaultState() {
    return {
      currentLevelIndex: 0,
      completedLessons: [],
      stamps: [],
      profile: { name: "UTN Student", avatar: "owl" },
      congratsShown: false,
      skillsXP: 0,
      skillsStreak: 0,
      lastActiveDay: null,
      daily: null,
      goalDays: 0,
      quizBest: {},
      badges: [],
      skillProgress: { reading: [], writing: [], speaking: [], letter: [] },
      bingoStats: { wins: 0, played: 0 },
      puzzleStats: { crosswords: 0, wordsearches: 0, memory: 0 },
      /* Punto 5 (motivacion): repaso de verbos, dias activos, XP semanal y ranking */
      verbStats: {},
      reviewStats: { sessions: 0, perfect: 0, day: null, xpSessions: 0 },
      activeDays: [],
      weekly: { week: null, xp: 0, mark: null },
      rankOptOut: false,
      rankName: ""
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
          daily: parsed.daily && typeof parsed.daily === "object" && Array.isArray(parsed.daily.done) ? parsed.daily : null,
          goalDays: typeof parsed.goalDays === "number" ? parsed.goalDays : 0,
          quizBest: parsed.quizBest && typeof parsed.quizBest === "object" && !Array.isArray(parsed.quizBest) ? parsed.quizBest : {},
          badges: Array.isArray(parsed.badges) ? parsed.badges : [],
          skillProgress: parsed.skillProgress && typeof parsed.skillProgress === "object" ? {
            reading: Array.isArray(parsed.skillProgress.reading) ? parsed.skillProgress.reading : [],
            writing: Array.isArray(parsed.skillProgress.writing) ? parsed.skillProgress.writing : [],
            speaking: Array.isArray(parsed.skillProgress.speaking) ? parsed.skillProgress.speaking : [],
            letter: Array.isArray(parsed.skillProgress.letter) ? parsed.skillProgress.letter : []
          } : base.skillProgress,
          bingoStats: parsed.bingoStats && typeof parsed.bingoStats === "object" ? {
            wins: typeof parsed.bingoStats.wins === "number" ? parsed.bingoStats.wins : 0,
            played: typeof parsed.bingoStats.played === "number" ? parsed.bingoStats.played : 0
          } : base.bingoStats,
          puzzleStats: parsed.puzzleStats && typeof parsed.puzzleStats === "object" ? {
            crosswords: typeof parsed.puzzleStats.crosswords === "number" ? parsed.puzzleStats.crosswords : 0,
            wordsearches: typeof parsed.puzzleStats.wordsearches === "number" ? parsed.puzzleStats.wordsearches : 0,
            memory: typeof parsed.puzzleStats.memory === "number" ? parsed.puzzleStats.memory : 0
          } : base.puzzleStats,
          verbStats: parsed.verbStats && typeof parsed.verbStats === "object" && !Array.isArray(parsed.verbStats) ? parsed.verbStats : {},
          reviewStats: parsed.reviewStats && typeof parsed.reviewStats === "object" ? {
            sessions: typeof parsed.reviewStats.sessions === "number" ? parsed.reviewStats.sessions : 0,
            perfect: typeof parsed.reviewStats.perfect === "number" ? parsed.reviewStats.perfect : 0,
            day: parsed.reviewStats.day || null,
            xpSessions: typeof parsed.reviewStats.xpSessions === "number" ? parsed.reviewStats.xpSessions : 0
          } : base.reviewStats,
          activeDays: Array.isArray(parsed.activeDays) ? parsed.activeDays.filter(function (d) { return typeof d === "string"; }).slice(-90) : [],
          weekly: parsed.weekly && typeof parsed.weekly === "object" ? {
            week: parsed.weekly.week || null,
            xp: typeof parsed.weekly.xp === "number" ? parsed.weekly.xp : 0,
            mark: typeof parsed.weekly.mark === "number" ? parsed.weekly.mark : null
          } : base.weekly,
          rankOptOut: !!parsed.rankOptOut,
          rankName: typeof parsed.rankName === "string" ? parsed.rankName.slice(0, 24) : ""
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
    /* Cuenta el XP ganado esta semana (lo usa el ranking por grupo) */
    if (typeof trackWeeklyXp === "function") { try { trackWeeklyXp(p); } catch (e) {} }
    try { localStorage.setItem(storageKey(), JSON.stringify(p)); } catch (e) {}
    if (typeof window.__UTN_SYNC__ === "function") {
      try { window.__UTN_SYNC__(p); } catch (e) {}
    }
    /* Publica tu puesto en el ranking de tu grupo (con espera, no en cada guardado) */
    if (typeof scheduleLeaderboardPublish === "function") { try { scheduleLeaderboardPublish(p); } catch (e) {} }
  }

  var state = loadProgress();
  var activeLevelIndex = state.currentLevelIndex;
  var activeLessonIndex = 0;

  var player = { timer: null, elapsed: 0, speed: 1, playing: false };

  function lessonId(levelCode, lessonIdx) { return levelCode + "-" + lessonIdx; }

