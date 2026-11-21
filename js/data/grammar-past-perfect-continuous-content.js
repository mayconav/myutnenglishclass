"use strict";
/* Contenido de gramatica: PAST PERFECT CONTINUOUS (guia "The Perfect Continuous Tenses — Present, Past & Future").
   Se registra en GRAMMAR_CONTENT.pastperfectcontinuous, asi que desbloquea el tema
   "Past Perfect Continuous" del menu (partials/recursos.html, data-topic="pastperfectcontinuous").
   Reglas: had + been + verb-ing (had se usa con todos los sujetos). Incluye el Quiz 2.
   Campos que renderiza js/app/grammar-render.js: ver grammar-verbs-content.js.
   Cada pregunta del quiz puede traer "explain" (explicacion de la clave de respuestas). */

  GRAMMAR_CONTENT.pastperfectcontinuous = {
    label: "Past Perfect Continuous",
    eyebrowPrefix: "Verb System · Verb Tenses",
    definitionTitle: "Past Perfect Continuous",
    definition: "The <strong>Past Perfect Continuous</strong> describes an activity that was happening for a period of time <strong>before a particular moment or event in the past</strong>. It is formed with <strong>had + been + verb-ing</strong> and emphasizes duration, process, and the cause of a past situation.",
    definitionExamples: [
      "I <strong>had been studying</strong> for two hours when my friend arrived.",
      "She <strong>had been working</strong> all day before she went home.",
      "They <strong>had been waiting</strong> for the bus when it started raining."
    ],
    modules: [
      {
        title: "Past Perfect Continuous",
        objectives: [
          "Use the past perfect continuous for the duration of an activity before another past event or moment.",
          "Explain a past result or situation by its cause, and describe an activity interrupted by another event.",
          "Build affirmative, negative, and interrogative sentences with had + been + verb-ing.",
          "Compare the past perfect continuous with the past perfect simple."
        ],
        rules: [
          {
            number: 1,
            title: "Purpose and Use",
            desc: "The Past Perfect Continuous emphasizes duration before a past event, an activity in progress before a past moment, the cause of a past situation, and an activity that continued until another past event.",
            tableHead: ["Use", "Example"],
            table: [
              ["Duration before another past event", "They had been waiting for an hour when the bus arrived.<br>I had been studying for three hours when my mother called.<br>She had been working for a long time before she took a break."],
              ["Duration up to a past moment", "By 2020, he had been teaching for fifteen years.<br>By the time we moved, I had been living there for ten years."],
              ["Explaining a past result", "He was tired because he had been running.<br>She was angry because she had been arguing with her brother.<br>The streets were wet because it had been raining."],
              ["An activity interrupted by another event", "I had been cooking when the electricity went out.<br>They had been watching TV when the phone rang.<br>She had been sleeping when the alarm sounded."],
              ["Showing the cause of a past situation", "His hands were dirty because he had been repairing his car.<br>They were exhausted because they had been hiking.<br>Her eyes were red because she had been crying."]
            ]
          },
          {
            number: 2,
            title: "Sentence Structures",
            desc: "<strong>Had</strong> is used with all subjects, followed by <strong>been + verb-ing</strong>.",
            tableHead: ["Form", "Structure", "Example"],
            table: [
              ["Affirmative", "Subject + had + been + verb-ing + complement", "I had been studying.<br>She had been working.<br>They had been playing.<br>We had been waiting."],
              ["Negative", "Subject + had + not (hadn't) + been + verb-ing + complement", "I hadn't been sleeping well.<br>She hadn't been studying.<br>They hadn't been working.<br>We hadn't been waiting long."],
              ["Yes/No question", "Had + subject + been + verb-ing + complement?", "Had you been studying?<br>Had she been working?<br>Had they been waiting?"],
              ["Wh-question", "Wh-word + had + subject + been + verb-ing?", "How long had you been studying?<br>What had she been doing?<br>Why had they been waiting?<br>Where had he been working?"]
            ]
          },
          {
            number: 3,
            title: "Common Time Expressions",
            desc: "Signal words that often go with the past perfect continuous.",
            tableHead: ["Expression", "Example"],
            table: [
              ["for", "I had been studying for two hours before dinner."],
              ["since", "She had been working since 7 a.m."],
              ["before", "before he arrived"],
              ["when", "They had been waiting when the train arrived."],
              ["by the time", "by the time we arrived"],
              ["all day", "all day"],
              ["until then", "until then"]
            ]
          },
          {
            number: 4,
            title: "Past Perfect Continuous vs. Past Perfect Simple",
            desc: "The continuous form emphasizes <strong>duration and process</strong>; the simple form emphasizes <strong>completion and result</strong>.",
            tableHead: ["Past Perfect Continuous", "Past Perfect Simple"],
            table: [
              ["Emphasizes duration / process", "Emphasizes completion / result"],
              ["She had been studying for hours.", "She had studied three chapters."],
              ["They had been working all day.", "They had finished the project."],
              ["He had been running.", "He had run five kilometers."]
            ],
            tip: "She had been studying for three hours when I arrived. (<strong>duration</strong>) · She had studied three chapters before I arrived. (<strong>completed amount</strong>)"
          }
        ],
        commonMistakes: [
          ["She had working all day.", "She had been working all day."],
          ["They had been worked.", "They had been working."],
          ["She had been knowing him for years.", "She had known him for years."]
        ],
        commonMistakesNote: "The structure is always <em>had + been + verb-ing</em>, and <em>had</em> is used with all subjects. Stative verbs such as know, believe, or need are normally not used in the continuous form.",
        memoryTipsTitle: "Important Notes — Past Perfect Continuous",
        memoryTips: [
          "Past perfect continuous = <strong>had + been + verb-ing</strong> for all subjects. <em>I had been studying for two hours when my friend arrived.</em>",
          "The negative is <strong>hadn't been + verb-ing</strong>. <em>We hadn't been waiting long.</em>",
          "In questions, put <strong>Had</strong> before the subject. <em>How long had you been studying?</em>",
          "Think of two past moments: the activity was already in progress before the second one."
        ]
      }
    ]
  };

  /* Practice quiz: Quiz 2 (Past Perfect Continuous). */
  GRAMMAR_CONTENT.pastperfectcontinuous.practice = [
    {
      id: "perfcont-quiz-2",
      short: "Past Perfect Continuous",
      type: "mc",
      title: "Quiz 2 — Past Perfect Continuous",
      instructions: "Choose the correct answer (A, B, C, or D).",
      questions: [
        { text: "When the teacher arrived, we _____ for 20 minutes.", options: ["have been talking", "had been talking", "will have talked", "are talking"], correct: 1, explain: "The activity occurred before the teacher arrived." },
        { text: "She was tired because she _____ all night.", options: ["had been studying", "has been studying", "will study", "studied tomorrow"], correct: 0, explain: "Duration explains the past tiredness." },
        { text: "How long _____ they _____ before the flight was canceled?", options: ["have / waited", "had / been waiting", "will / be waiting", "did / been waiting"], correct: 1, explain: "Correct question structure with had." },
        { text: "The ground was wet because it _____.", options: ["has been raining", "will have rained", "had been raining", "rains"], correct: 2, explain: "A past activity explains the wet ground." },
        { text: "Choose the correct negative form.", options: ["They hadn't been working.", "They haven't been worked.", "They had not working.", "They didn't had been working."], correct: 0, explain: "Correct negative form: hadn't + been + -ing." },
        { text: "I _____ for an hour before my friend finally called.", options: ["had been driving", "have been driving", "will drive", "has driven"], correct: 0, explain: "Duration before the phone call." },
        { text: "By the time he got home, the children _____ for hours.", options: ["had been playing", "have been playing", "will play", "are played"], correct: 0, explain: "The activity continued before a past reference point." },
        { text: "Which sentence focuses on duration before a past moment?", options: ["She had completed two tasks.", "She had been doing the task for two hours.", "She does tasks daily.", "She will do the task."], correct: 1, explain: "It emphasizes duration." },
        { text: "They _____ in line since 7 a.m. when the doors opened at 9.", options: ["had been standing", "have stand", "will have stood", "stood since"], correct: 0, explain: "The activity began earlier and continued up to a past event." },
        { text: "_____ you _____ there long before you changed jobs?", options: ["Have / been working", "Had / been working", "Will / have worked", "Did / been work"], correct: 1, explain: "Correct Past Perfect Continuous question." }
      ]
    }
  ];
