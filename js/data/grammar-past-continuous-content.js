"use strict";
/* Contenido de gramatica: PAST CONTINUOUS (guia "The Continuous Tenses — A2–B1 Grammar Guide").
   Se registra en GRAMMAR_CONTENT.pastcontinuous, asi que desbloquea el tema
   "Past Continuous" del menu (partials/recursos.html, data-topic="pastcontinuous").
   Reglas: was/were + verb-ing, when vs. while.
   Campos que renderiza js/app/grammar-render.js: ver grammar-verbs-content.js. */

  GRAMMAR_CONTENT.pastcontinuous = {
    label: "Past Continuous",
    eyebrowPrefix: "Verb System · Verb Tenses",
    definitionTitle: "Past Continuous",
    definition: "The <strong>Past Continuous</strong> describes an action that was <strong>in progress</strong> at a specific time in the past. It is formed with <strong>was / were + the -ing form</strong> of the main verb.",
    definitionExamples: [
      "At 8 p.m., I <strong>was doing</strong> my homework.",
      "I <strong>was cooking</strong> when the phone rang.",
      "She <strong>was reading</strong> while he <strong>was studying</strong>."
    ],
    modules: [
      {
        title: "Past Continuous",
        objectives: [
          "Use the past continuous for actions in progress at a past time, interrupted actions, simultaneous actions, and story background.",
          "Build affirmative, negative, and interrogative sentences with was / were + verb-ing.",
          "Choose between when and while in past continuous sentences."
        ],
        rules: [
          {
            number: 1,
            title: "Purpose and Use",
            desc: "The Past Continuous shows that an action was <strong>in progress</strong> at a certain moment in the past.",
            tableHead: ["Use", "Example"],
            table: [
              ["An action in progress at a specific time in the past", "At 8 p.m., I was doing my homework."],
              ["A longer action interrupted by a shorter action (often with when)", "I was cooking when the phone rang."],
              ["Two actions happening at the same time (often with while)", "She was reading while he was studying."],
              ["Background description in a story", "It was raining and people were running home."]
            ]
          },
          {
            number: 2,
            title: "Sentence Structures",
            desc: "Use <strong>was</strong> with I / he / she / it and <strong>were</strong> with you / we / they, followed by the -ing form.",
            tableHead: ["Form", "Structure", "Example"],
            table: [
              ["Affirmative", "Subject + was/were + verb-ing", "They were working.<br>The students were taking an exam at 10 a.m."],
              ["Negative", "Subject + was/were + not + verb-ing", "They were not working.<br>I wasn't sleeping when you called."],
              ["Yes/No question", "Was/Were + subject + verb-ing?", "Were they working?<br>Was the teacher explaining the topic?"],
              ["Wh-question", "Wh-word + was/were + subject + verb-ing?", "What were they doing?<br>What were they discussing?"]
            ]
          },
          {
            number: 3,
            title: "When vs. While",
            desc: "<strong>When</strong> often introduces the shorter action. <strong>While</strong> often introduces the action in progress. These are common patterns, not absolute rules.",
            examples: [
              "I was walking <strong>when</strong> it started to rain.",
              "<strong>While</strong> I was walking, it started to rain."
            ]
          },
          {
            number: 4,
            title: "Common Time Expressions",
            desc: "Signal words that often go with the past continuous.",
            tableHead: ["Time expressions", "Example"],
            table: [
              ["at 7 o'clock yesterday, last night", "At 9 p.m. yesterday, I was studying."],
              ["yesterday afternoon, all morning", "They were working all morning."],
              ["from 2 to 4 p.m.", "We were watching TV from 2 to 4 p.m."],
              ["while, when", "While I was cooking dinner, my brother arrived."]
            ]
          }
        ],
        commonMistakes: [
          ["They was playing.", "They were playing."],
          ["They were run.", "They were running."],
          ["I was sleep when you called.", "I was sleeping when you called."]
        ],
        memoryTipsTitle: "📌 Important Notes — Past Continuous",
        memoryTips: [
          "Past continuous = <strong>was / were + verb-ing</strong>. <em>They were working.</em>",
          "Use <strong>was</strong> with I / he / she / it and <strong>were</strong> with you / we / they.",
          "The negative is <strong>wasn't / weren't</strong> + verb-ing. <em>I wasn't sleeping.</em>",
          "Use the past continuous for the longer action and the past simple for the shorter one that interrupts it. <em>I was cooking when the phone rang.</em>"
        ]
      }
    ]
  };

  /* Practice quiz de Past Continuous (answer key de la guia original). */
  GRAMMAR_CONTENT.pastcontinuous.practice = [
    {
      id: "continuous-quiz-2",
      short: "Past Continuous",
      type: "mc",
      title: "Quiz 2 — Past Continuous",
      instructions: "Choose the best answer (A, B, C, or D).",
      questions: [
        { text: "At 9 p.m. yesterday, I _____.", options: ["was studying","am studying","study","were study"], correct: 0 },
        { text: "They _____ football when it started to rain.", options: ["was playing","were playing","are playing","played"], correct: 1 },
        { text: "_____ she sleeping when you called?", options: ["Were","Is","Was","Did"], correct: 2 },
        { text: "We _____ watching TV at midnight.", options: ["wasn't","weren't","aren't","don't"], correct: 1 },
        { text: "While I _____ dinner, my brother arrived.", options: ["cooked","am cooking","was cooking","cook"], correct: 2 },
        { text: "What _____ you doing at 6 yesterday?", options: ["was","are","did","were"], correct: 3 },
        { text: "He _____ working when the computer crashed.", options: ["were","was","is","be"], correct: 1 },
        { text: "Choose the correct sentence.", options: ["They was running.","They were run.","They were running.","They running."], correct: 2 },
        { text: "I _____ not listening when the teacher asked me.", options: ["was","were","am","did"], correct: 0 },
        { text: "The children _____ in the park while their parents were talking.", options: ["plays","were playing","was playing","are play"], correct: 1 }
      ]
    }
  ];
