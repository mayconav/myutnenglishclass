"use strict";
/* Contenido de gramatica: PAST PERFECT (guia "The Perfect Tenses — Complete Guide").
   Se registra en GRAMMAR_CONTENT.pastperfect, asi que desbloquea el tema
   "Past Perfect" del menu (partials/recursos.html, data-topic="pastperfect").
   Reglas: had + past participle (V3). Marca la accion mas antigua dentro del pasado.
   Campos que renderiza js/app/grammar-render.js: ver grammar-verbs-content.js. */

  GRAMMAR_CONTENT.pastperfect = {
    label: "Past Perfect",
    eyebrowPrefix: "Verb System · Verb Tenses",
    definitionTitle: "Past Perfect",
    definition: "The <strong>Past Perfect</strong> looks back from a point in the past. It describes what had happened <strong>before</strong> that past point. It is formed with <strong>had + the past participle (V3)</strong> of the main verb.",
    definitionExamples: [
      "When I arrived, the movie <strong>had started</strong>.",
      "She was tired because she <strong>had worked</strong> all night.",
      "<strong>Had</strong> you <strong>studied</strong> English before university?"
    ],
    modules: [
      {
        title: "Past Perfect",
        objectives: [
          "Use the past perfect to show that one past action happened before another past action or reference point.",
          "Build affirmative, negative, and interrogative sentences with had + V3.",
          "Combine the past perfect (earlier event) with the past simple (later event)."
        ],
        rules: [
          {
            number: 1,
            title: "Purpose and Use",
            desc: "The Past Perfect marks the <strong>earlier</strong> event; the Past Simple marks the <strong>later</strong> past event.",
            tableHead: ["Use", "Example"],
            table: [
              ["An earlier past action (before another past action or reference point)", "When I arrived, the movie had started. (First: the movie started. Then: I arrived.)"],
              ["Cause or explanation of a past situation", "She was tired because she had worked all night."],
              ["Reported speech and narratives", "He said that he had lost his wallet.<br>They had never seen snow before that trip."]
            ],
            tip: "The Past Perfect often appears with the Past Simple. Context may make the sequence clear even without words such as <em>before</em> or <em>after</em>."
          },
          {
            number: 2,
            title: "Sentence Structures",
            desc: "<strong>Had</strong> is the same for all subjects and is always followed by the past participle (V3).",
            tableHead: ["Form", "Structure", "Example"],
            table: [
              ["Affirmative", "Subject + had + V3 + complement", "I had finished the report before the meeting started.<br>They had left by the time we got there."],
              ["Negative", "Subject + had + not + V3 + complement", "I had not (hadn't) finished the report.<br>She hadn't met him before the conference."],
              ["Yes/No question", "Had + subject + V3 + complement?", "Had you studied English before university? — Yes, I had. / No, I hadn't."],
              ["Wh-question", "Wh-word + had + subject + V3 + complement?", "Why had they cancelled the event?<br>What had he told you?"]
            ]
          },
          {
            number: 3,
            title: "Common Time Expressions",
            desc: "Signal words that often go with the past perfect.",
            tableHead: ["Time expressions", "Example"],
            table: [
              ["before, after", "I had finished the report before the meeting started."],
              ["by the time", "They had left by the time we got there."],
              ["already, just, never", "They had never seen snow before that trip."],
              ["until then, when", "When I arrived, the movie had started."]
            ],
            tip: "These expressions are common clues, not automatic rules. Choose the Past Perfect when you need to make the earlier-past relationship clear."
          }
        ],
        commonMistakes: [
          ["When I arrived, they have left.", "When I arrived, they had left."],
          ["She had went home before I called.", "She had gone home before I called."],
          ["Had you studied English before university? — Yes, I did.", "Had you studied English before university? — Yes, I had."]
        ],
        commonMistakesNote: "The leaving happened earlier than the arriving, so the earlier action needs the past perfect. After had, always use V3.",
        memoryTipsTitle: "Important Notes — Past Perfect",
        memoryTips: [
          "Past perfect = <strong>had + V3</strong> for all subjects. <em>They had left by the time we got there.</em>",
          "The negative is <strong>hadn't + V3</strong>. <em>She hadn't met him before the conference.</em>",
          "In questions, put <strong>Had</strong> before the subject. <em>Had you studied English before university?</em>",
          "Earlier event = past perfect. Later event = past simple."
        ]
      }
    ]
  };

  /* Practice quiz: Quiz 2 (Past Perfect). */
  GRAMMAR_CONTENT.pastperfect.practice = [
    {
      id: "perfect-quiz-2",
      short: "Past Perfect",
      type: "mc",
      title: "Quiz 2 — Past Perfect",
      instructions: "Choose the best answer (A, B, C, or D).",
      questions: [
        { text: "By the time the bus arrived, we _____ for 30 minutes.", options: ["waited", "have waited", "had waited", "will have waited"], correct: 2 },
        { text: "She couldn't enter because she _____ her ID.", options: ["forgot", "had forgotten", "has forgotten", "forgets"], correct: 1 },
        { text: "We were hungry because we _____ breakfast.", options: ["hadn't eaten", "haven't eaten", "didn't ate", "hasn't eaten"], correct: 0 },
        { text: "When I arrived, the movie _____.", options: ["has started", "starts", "had started", "will start"], correct: 2 },
        { text: "_____ you studied English before university?", options: ["Have", "Had", "Did", "Were"], correct: 1 },
        { text: "He said that he _____ his wallet.", options: ["had lost", "has lost", "loses", "will lose"], correct: 0 },
        { text: "They _____ snow before that trip.", options: ["never saw", "had never seen", "have never seen", "never see"], correct: 1 },
        { text: "Choose the correct sentence.", options: ["She had went home.", "She has gone home before I called.", "She had gone home before I called.", "She had go home before I called."], correct: 2 },
        { text: "I _____ the report before the meeting started.", options: ["had finished", "have finished", "finish", "will have finished"], correct: 0 },
        { text: "Why _____ they cancelled the event?", options: ["have", "did", "were", "had"], correct: 3 }
      ]
    }
  ];
