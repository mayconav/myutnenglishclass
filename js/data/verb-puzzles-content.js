"use strict";
/* Verbos por nivel (A1 / A2) para el Crucigrama y la Sopa de letras
   (js/app/puzzles.js). Solo guarda QUE verbos van en cada nivel: la forma
   base, el pasado simple y la traduccion se toman de js/data/verbs-content.js
   (VERBS_REGULAR / VERBS_IRREGULAR), asi que si corriges un verbo alli, se
   corrige tambien aqui. Para mover un verbo de nivel, solo cambialo de lista. */

  var PUZZLE_VERB_LEVELS = {
    regular: {
      A1: ["play", "watch", "walk", "talk", "listen", "clean", "cook", "wash", "help", "work",
           "study", "dance", "smile", "close", "open", "love", "like", "live", "want", "use",
           "start", "ask", "call", "visit", "wait"],
      A2: ["stop", "plan", "shop", "chat", "cry", "try", "carry", "worry", "travel", "move",
           "arrive", "decide", "finish", "answer", "change", "climb", "enjoy", "fix", "invite",
           "join", "laugh", "learn", "paint", "park", "pull", "push", "rain", "remember",
           "return", "save", "shout", "turn"]
    },
    irregular: {
      A1: ["go", "have", "do", "say", "get", "make", "know", "think", "see", "come", "take",
           "give", "find", "tell", "eat", "drink", "buy", "sit", "run", "write", "read", "speak",
           "sleep", "swim", "sing", "put", "leave", "meet"],
      A2: ["begin", "bring", "break", "build", "catch", "choose", "cut", "draw", "drive", "fall",
           "feel", "fly", "forget", "hear", "hold", "keep", "lose", "pay", "send", "sell", "spend",
           "stand", "teach", "throw", "understand", "wear", "win", "wake", "ride", "hide", "hit",
           "hurt", "let", "mean", "set", "grow", "shut", "steal", "shake"]
    }
  };

  /* Devuelve las fichas de un nivel. kind: "regular" | "irregular" | "mixed".
     level: "A1" | "A2" | "both". Cada ficha: { base, past, es, kind, level }. */
  function puzzleVerbPool(kind, level) {
    var kinds = kind === "regular" ? ["regular"] : kind === "irregular" ? ["irregular"] : ["regular", "irregular"];
    var levels = level === "A1" ? ["A1"] : level === "A2" ? ["A2"] : ["A1", "A2"];
    var out = [];
    kinds.forEach(function (k) {
      var source = k === "regular" ? VERBS_REGULAR : VERBS_IRREGULAR;
      levels.forEach(function (lv) {
        PUZZLE_VERB_LEVELS[k][lv].forEach(function (base) {
          for (var i = 0; i < source.length; i++) {
            if (source[i].base === base) {
              out.push({ base: source[i].base, past: source[i].past, es: source[i].es, kind: k, level: lv });
              break;
            }
          }
        });
      });
    });
    return out;
  }
