"use strict";
/* Banco de verbos (regulares e irregulares) usado por el juego de Bingo
   (js/app/bingo.js). Cada verbo trae su forma base, su pasado simple y su
   traduccion al espanol, igual que el patron ya usado en el Material de
   Apoyo (partials/recursos.html) para los verbos irregulares. */

  var VERBS_REGULAR = [
    { base: "play", past: "played", es: "jugar" },
    { base: "watch", past: "watched", es: "mirar" },
    { base: "walk", past: "walked", es: "caminar" },
    { base: "talk", past: "talked", es: "hablar" },
    { base: "listen", past: "listened", es: "escuchar" },
    { base: "clean", past: "cleaned", es: "limpiar" },
    { base: "cook", past: "cooked", es: "cocinar" },
    { base: "wash", past: "washed", es: "lavar" },
    { base: "help", past: "helped", es: "ayudar" },
    { base: "work", past: "worked", es: "trabajar" },
    { base: "study", past: "studied", es: "estudiar" },
    { base: "travel", past: "traveled", es: "viajar" },
    { base: "dance", past: "danced", es: "bailar" },
    { base: "smile", past: "smiled", es: "sonreír" },
    { base: "close", past: "closed", es: "cerrar" },
    { base: "open", past: "opened", es: "abrir" },
    { base: "stop", past: "stopped", es: "detener" },
    { base: "plan", past: "planned", es: "planear" },
    { base: "shop", past: "shopped", es: "ir de compras" },
    { base: "chat", past: "chatted", es: "platicar" },
    { base: "cry", past: "cried", es: "llorar" },
    { base: "try", past: "tried", es: "intentar" },
    { base: "carry", past: "carried", es: "cargar" },
    { base: "worry", past: "worried", es: "preocuparse" },
    { base: "love", past: "loved", es: "amar" },
    { base: "like", past: "liked", es: "gustar" },
    { base: "live", past: "lived", es: "vivir" },
    { base: "move", past: "moved", es: "mudarse" },
    { base: "arrive", past: "arrived", es: "llegar" },
    { base: "decide", past: "decided", es: "decidir" },
    { base: "finish", past: "finished", es: "terminar" },
    { base: "ask", past: "asked", es: "preguntar" },
    { base: "answer", past: "answered", es: "responder" },
    { base: "call", past: "called", es: "llamar" },
    { base: "change", past: "changed", es: "cambiar" },
    { base: "climb", past: "climbed", es: "escalar" },
    { base: "enjoy", past: "enjoyed", es: "disfrutar" },
    { base: "fix", past: "fixed", es: "reparar" },
    { base: "invite", past: "invited", es: "invitar" },
    { base: "join", past: "joined", es: "unirse" },
    { base: "laugh", past: "laughed", es: "reír" },
    { base: "learn", past: "learned", es: "aprender" },
    { base: "paint", past: "painted", es: "pintar" },
    { base: "park", past: "parked", es: "estacionar" },
    { base: "pull", past: "pulled", es: "jalar" },
    { base: "push", past: "pushed", es: "empujar" },
    { base: "rain", past: "rained", es: "llover" },
    { base: "remember", past: "remembered", es: "recordar" },
    { base: "return", past: "returned", es: "regresar" },
    { base: "save", past: "saved", es: "ahorrar" },
    { base: "shout", past: "shouted", es: "gritar" },
    { base: "start", past: "started", es: "empezar" },
    { base: "turn", past: "turned", es: "voltear" },
    { base: "use", past: "used", es: "usar" },
    { base: "visit", past: "visited", es: "visitar" },
    { base: "wait", past: "waited", es: "esperar" },
    { base: "want", past: "wanted", es: "querer" }
  ];

  /* Verbos irregulares en sus 3 formas: infinitivo (base), pasado simple (past)
     y participio pasado (pp). Las formas con dos variantes se muestran con " / "
     (p. ej. was / were). Para el participio se usa ingles americano (get -> gotten). */
  var VERBS_IRREGULAR = [
    { base: "go", past: "went", pp: "gone", es: "ir" },
    { base: "have", past: "had", pp: "had", es: "tener" },
    { base: "do", past: "did", pp: "done", es: "hacer" },
    { base: "say", past: "said", pp: "said", es: "decir" },
    { base: "get", past: "got", pp: "gotten", es: "obtener" },
    { base: "make", past: "made", pp: "made", es: "hacer / elaborar" },
    { base: "know", past: "knew", pp: "known", es: "saber" },
    { base: "think", past: "thought", pp: "thought", es: "pensar" },
    { base: "see", past: "saw", pp: "seen", es: "ver" },
    { base: "come", past: "came", pp: "come", es: "venir" },
    { base: "take", past: "took", pp: "taken", es: "tomar" },
    { base: "give", past: "gave", pp: "given", es: "dar" },
    { base: "find", past: "found", pp: "found", es: "encontrar" },
    { base: "tell", past: "told", pp: "told", es: "contar" },
    { base: "become", past: "became", pp: "become", es: "convertirse" },
    { base: "leave", past: "left", pp: "left", es: "salir / dejar" },
    { base: "feel", past: "felt", pp: "felt", es: "sentir" },
    { base: "put", past: "put", pp: "put", es: "poner" },
    { base: "bring", past: "brought", pp: "brought", es: "traer" },
    { base: "begin", past: "began", pp: "begun", es: "comenzar" },
    { base: "keep", past: "kept", pp: "kept", es: "mantener" },
    { base: "hold", past: "held", pp: "held", es: "sostener" },
    { base: "write", past: "wrote", pp: "written", es: "escribir" },
    { base: "stand", past: "stood", pp: "stood", es: "pararse" },
    { base: "hear", past: "heard", pp: "heard", es: "oír" },
    { base: "let", past: "let", pp: "let", es: "dejar / permitir" },
    { base: "mean", past: "meant", pp: "meant", es: "significar" },
    { base: "set", past: "set", pp: "set", es: "colocar" },
    { base: "meet", past: "met", pp: "met", es: "conocer / reunirse" },
    { base: "run", past: "ran", pp: "run", es: "correr" },
    { base: "pay", past: "paid", pp: "paid", es: "pagar" },
    { base: "sit", past: "sat", pp: "sat", es: "sentarse" },
    { base: "speak", past: "spoke", pp: "spoken", es: "hablar" },
    { base: "eat", past: "ate", pp: "eaten", es: "comer" },
    { base: "read", past: "read", pp: "read", es: "leer" },
    { base: "grow", past: "grew", pp: "grown", es: "crecer" },
    { base: "lose", past: "lost", pp: "lost", es: "perder" },
    { base: "send", past: "sent", pp: "sent", es: "enviar" },
    { base: "build", past: "built", pp: "built", es: "construir" },
    { base: "understand", past: "understood", pp: "understood", es: "entender" },
    { base: "draw", past: "drew", pp: "drawn", es: "dibujar" },
    { base: "break", past: "broke", pp: "broken", es: "romper" },
    { base: "spend", past: "spent", pp: "spent", es: "gastar" },
    { base: "cut", past: "cut", pp: "cut", es: "cortar" },
    { base: "drive", past: "drove", pp: "driven", es: "manejar" },
    { base: "buy", past: "bought", pp: "bought", es: "comprar" },
    { base: "wear", past: "wore", pp: "worn", es: "usar / vestir" },
    { base: "choose", past: "chose", pp: "chosen", es: "elegir" },
    { base: "fall", past: "fell", pp: "fallen", es: "caer" },
    { base: "catch", past: "caught", pp: "caught", es: "atrapar" },
    { base: "teach", past: "taught", pp: "taught", es: "enseñar" },
    { base: "sell", past: "sold", pp: "sold", es: "vender" },
    { base: "sing", past: "sang", pp: "sung", es: "cantar" },
    { base: "fly", past: "flew", pp: "flown", es: "volar" },
    { base: "swim", past: "swam", pp: "swum", es: "nadar" },
    { base: "win", past: "won", pp: "won", es: "ganar" },
    { base: "throw", past: "threw", pp: "thrown", es: "lanzar" },
    { base: "be", past: "was / were", pp: "been", es: "ser / estar" },
    { base: "arise", past: "arose", pp: "arisen", es: "surgir" },
    { base: "awake", past: "awoke", pp: "awoken", es: "despertar" },
    { base: "bear", past: "bore", pp: "borne", es: "soportar / aguantar" },
    { base: "beat", past: "beat", pp: "beaten", es: "golpear / vencer" },
    { base: "bend", past: "bent", pp: "bent", es: "doblar" },
    { base: "bet", past: "bet", pp: "bet", es: "apostar" },
    { base: "bind", past: "bound", pp: "bound", es: "atar" },
    { base: "bite", past: "bit", pp: "bitten", es: "morder" },
    { base: "bleed", past: "bled", pp: "bled", es: "sangrar" },
    { base: "blow", past: "blew", pp: "blown", es: "soplar" },
    { base: "breed", past: "bred", pp: "bred", es: "criar" },
    { base: "broadcast", past: "broadcast", pp: "broadcast", es: "transmitir" },
    { base: "burst", past: "burst", pp: "burst", es: "reventar" },
    { base: "cast", past: "cast", pp: "cast", es: "lanzar / moldear" },
    { base: "cling", past: "clung", pp: "clung", es: "aferrarse" },
    { base: "cost", past: "cost", pp: "cost", es: "costar" },
    { base: "creep", past: "crept", pp: "crept", es: "arrastrarse" },
    { base: "deal", past: "dealt", pp: "dealt", es: "tratar / repartir" },
    { base: "dig", past: "dug", pp: "dug", es: "cavar" },
    { base: "drink", past: "drank", pp: "drunk", es: "beber" },
    { base: "feed", past: "fed", pp: "fed", es: "alimentar" },
    { base: "fight", past: "fought", pp: "fought", es: "pelear" },
    { base: "flee", past: "fled", pp: "fled", es: "huir" },
    { base: "fling", past: "flung", pp: "flung", es: "arrojar" },
    { base: "forbid", past: "forbade", pp: "forbidden", es: "prohibir" },
    { base: "forget", past: "forgot", pp: "forgotten", es: "olvidar" },
    { base: "forgive", past: "forgave", pp: "forgiven", es: "perdonar" },
    { base: "freeze", past: "froze", pp: "frozen", es: "congelar" },
    { base: "grind", past: "ground", pp: "ground", es: "moler" },
    { base: "hang", past: "hung", pp: "hung", es: "colgar" },
    { base: "hide", past: "hid", pp: "hidden", es: "esconder" },
    { base: "hit", past: "hit", pp: "hit", es: "golpear" },
    { base: "hurt", past: "hurt", pp: "hurt", es: "lastimar" },
    { base: "kneel", past: "knelt", pp: "knelt", es: "arrodillarse" },
    { base: "lay", past: "laid", pp: "laid", es: "colocar / poner" },
    { base: "lead", past: "led", pp: "led", es: "dirigir / liderar" },
    { base: "lend", past: "lent", pp: "lent", es: "prestar" },
    { base: "lie", past: "lay", pp: "lain", es: "recostarse" },
    { base: "light", past: "lit", pp: "lit", es: "encender / iluminar" },
    { base: "mistake", past: "mistook", pp: "mistaken", es: "equivocarse" },
    { base: "overcome", past: "overcame", pp: "overcome", es: "superar" },
    { base: "overtake", past: "overtook", pp: "overtaken", es: "rebasar / alcanzar" },
    { base: "quit", past: "quit", pp: "quit", es: "renunciar / dejar" },
    { base: "ride", past: "rode", pp: "ridden", es: "montar" },
    { base: "ring", past: "rang", pp: "rung", es: "sonar" },
    { base: "rise", past: "rose", pp: "risen", es: "elevarse / levantarse" },
    { base: "seek", past: "sought", pp: "sought", es: "buscar" },
    { base: "sew", past: "sewed", pp: "sewn", es: "coser" },
    { base: "shake", past: "shook", pp: "shaken", es: "sacudir" },
    { base: "shed", past: "shed", pp: "shed", es: "derramar / mudar" },
    { base: "shine", past: "shone", pp: "shone", es: "brillar" },
    { base: "shoot", past: "shot", pp: "shot", es: "disparar" },
    { base: "show", past: "showed", pp: "shown", es: "mostrar" },
    { base: "shrink", past: "shrank", pp: "shrunk", es: "encogerse" },
    { base: "shut", past: "shut", pp: "shut", es: "cerrar" },
    { base: "sink", past: "sank", pp: "sunk", es: "hundir" },
    { base: "sleep", past: "slept", pp: "slept", es: "dormir" },
    { base: "slide", past: "slid", pp: "slid", es: "deslizarse" },
    { base: "speed", past: "sped", pp: "sped", es: "acelerar" },
    { base: "spin", past: "spun", pp: "spun", es: "girar" },
    { base: "spit", past: "spat", pp: "spat", es: "escupir" },
    { base: "split", past: "split", pp: "split", es: "dividir" },
    { base: "spread", past: "spread", pp: "spread", es: "extender" },
    { base: "spring", past: "sprang", pp: "sprung", es: "brotar / saltar" },
    { base: "steal", past: "stole", pp: "stolen", es: "robar" },
    { base: "stick", past: "stuck", pp: "stuck", es: "pegar" },
    { base: "sting", past: "stung", pp: "stung", es: "picar" },
    { base: "stink", past: "stank", pp: "stunk", es: "apestar" },
    { base: "strike", past: "struck", pp: "struck", es: "golpear / atacar" },
    { base: "swear", past: "swore", pp: "sworn", es: "jurar" },
    { base: "sweep", past: "swept", pp: "swept", es: "barrer" },
    { base: "swing", past: "swung", pp: "swung", es: "balancearse" },
    { base: "tear", past: "tore", pp: "torn", es: "rasgar" },
    { base: "undo", past: "undid", pp: "undone", es: "deshacer" },
    { base: "upset", past: "upset", pp: "upset", es: "molestar / alterar" },
    { base: "wake", past: "woke", pp: "woken", es: "despertarse" },
    { base: "weave", past: "wove", pp: "woven", es: "tejer" },
    { base: "weep", past: "wept", pp: "wept", es: "llorar" },
    { base: "wind", past: "wound", pp: "wound", es: "enrollar / dar cuerda" },
    { base: "withdraw", past: "withdrew", pp: "withdrawn", es: "retirar" }
  ];

  /* ============ FORMAS PARA EL BINGO ============
     El cantador dice el INFINITIVO y pide una forma: pasado simple ("past") o
     participio pasado ("pp"). El carton muestra esa forma. Cada casilla se
     identifica con una clave "base|forma" (p. ej. "go|pp"). Los verbos regulares
     solo generan "past" (su participio es igual). Si un irregular tiene el mismo
     pasado y participio (put, cut, read...), genera una sola casilla "past". */
  var BINGO_FORM_LABELS = { past: "Past Simple", pp: "Past Participle" };

  function bingoMakeKey(base, form) { return base + "|" + form; }

  function bingoParseKey(key) {
    var s = String(key);
    var i = s.indexOf("|");
    return i === -1 ? { base: s, form: "past" } : { base: s.slice(0, i), form: s.slice(i + 1) };
  }

  function bingoNormalizeKey(key) {
    var k = bingoParseKey(key);
    return bingoMakeKey(k.base, k.form);
  }

  function bingoFindVerb(base) {
    var i;
    for (i = 0; i < VERBS_IRREGULAR.length; i++) if (VERBS_IRREGULAR[i].base === base) return VERBS_IRREGULAR[i];
    for (i = 0; i < VERBS_REGULAR.length; i++) if (VERBS_REGULAR[i].base === base) return VERBS_REGULAR[i];
    return null;
  }

  /* Texto que se ve en la casilla para una clave. */
  function bingoCellText(key) {
    var k = bingoParseKey(key);
    var v = bingoFindVerb(k.base);
    if (!v) return k.base;
    return k.form === "pp" ? (v.pp || v.past) : v.past;
  }

  /* Etiqueta de la forma que debe buscar el alumno. */
  function bingoFormLabel(key) {
    var k = bingoParseKey(key);
    var v = bingoFindVerb(k.base);
    if (v && v.pp && v.pp === v.past && k.form === "past") return "Past Simple & Participle";
    return BINGO_FORM_LABELS[k.form] || BINGO_FORM_LABELS.past;
  }

  /* Como se muestra una llamada: "go → Past Participle". */
  function bingoCallLabel(key) {
    return bingoParseKey(key).base + " → " + bingoFormLabel(key);
  }

  /* Lo que lee la voz: "go, past participle". */
  function bingoCallSpeech(key) {
    return bingoParseKey(key).base + ", " + bingoFormLabel(key).toLowerCase().replace("&", "and");
  }

  /* Todas las "fichas" posibles del juego. */
  function bingoEntryPool() {
    var out = [];
    VERBS_REGULAR.forEach(function (v) {
      out.push({ key: bingoMakeKey(v.base, "past"), base: v.base, form: "past", text: v.past });
    });
    VERBS_IRREGULAR.forEach(function (v) {
      out.push({ key: bingoMakeKey(v.base, "past"), base: v.base, form: "past", text: v.past });
      if (v.pp && v.pp !== v.past) {
        out.push({ key: bingoMakeKey(v.base, "pp"), base: v.base, form: "pp", text: v.pp });
      }
    });
    return out;
  }
