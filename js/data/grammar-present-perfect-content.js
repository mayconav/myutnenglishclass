"use strict";
/* Contenido de gramatica: PRESENT PERFECT (guia "The Perfect Tenses — Complete Guide").
   Se registra en GRAMMAR_CONTENT.presentperfect, asi que desbloquea el tema
   "Present Perfect" del menu (partials/recursos.html, data-topic="presentperfect").
   Reglas: have / has + past participle (V3). Incluye la tabla de participios (V3).
   Campos que renderiza js/app/grammar-render.js: ver grammar-verbs-content.js. */

  GRAMMAR_CONTENT.presentperfect = {
    label: "Present Perfect",
    eyebrowPrefix: "Verb System · Verb Tenses",
    definitionTitle: "Present Perfect",
    definition: "The <strong>Present Perfect</strong> looks back from the present. A past action or situation has a <strong>connection with now</strong>. It is formed with <strong>have / has + the past participle (V3)</strong> of the main verb.",
    definitionExamples: [
      "I <strong>have visited</strong> Canada twice.",
      "She <strong>has</strong> never <strong>eaten</strong> sushi.",
      "<strong>Have</strong> you <strong>finished</strong> yet?"
    ],
    modules: [
      {
        title: "Present Perfect",
        objectives: [
          "Understand the perfect aspect: have / has + past participle (V3) connects the past with the present.",
          "Use the present perfect for life experiences, present results, recent events, unfinished time periods, and duration with since / for.",
          "Build affirmative, negative, and interrogative sentences, and choose between the present perfect and the past simple."
        ],
        rules: [
          {
            number: 1,
            title: "Purpose and Use",
            desc: "Use the Present Perfect when the time is <strong>not finished</strong> or is <strong>not specified</strong>.",
            tableHead: ["Use", "Example"],
            table: [
              ["Life experiences (unspecified time before now)", "I have visited Canada twice.<br>She has never eaten sushi."],
              ["Past actions with a present result", "I have lost my keys. (I do not have them now.)<br>He has broken his glasses."],
              ["Recent events (just, already, yet)", "They have just arrived.<br>I have already sent the email.<br>Have you finished yet?"],
              ["Unfinished time periods (today, this week, this year)", "We have had three meetings this week. (The week is not over.)"],
              ["Duration continuing until now (since / for)", "I have known Ana for ten years.<br>He has lived here since 2020."]
            ],
            tip: "Use the Present Perfect when the time is not finished or is not specified. Use the Past Simple with a finished past time such as <em>yesterday</em>, <em>last year</em>, or <em>in 2019</em>."
          },
          {
            number: 2,
            title: "Sentence Structures",
            desc: "Use <strong>have</strong> with I / you / we / they and <strong>has</strong> with he / she / it. The main verb is always the past participle (V3).",
            tableHead: ["Form", "Structure", "Example"],
            table: [
              ["Affirmative", "Subject + have / has + V3 + complement", "I / You / We / They have finished the project.<br>He / She / It has finished the project."],
              ["Negative", "Subject + have / has + not + V3 + complement", "I have not (haven't) finished the project.<br>She has not (hasn't) finished the project."],
              ["Yes/No question", "Have / Has + subject + V3 + complement?", "Have they finished the project? — Yes, they have. / No, they haven't.<br>Has he called you? — Yes, he has. / No, he hasn't."],
              ["Wh-question", "Wh-word + have / has + subject + V3 + complement?", "Where have you put my notebook?<br>How long has she worked here?"]
            ]
          },
          {
            number: 3,
            title: "Common Time Expressions",
            desc: "Signal words that often go with the present perfect.",
            tableHead: ["Time expressions", "Example"],
            table: [
              ["ever, never", "Have you ever visited London?<br>She has never eaten sushi."],
              ["just, already, yet", "They have just arrived.<br>I have already sent the email."],
              ["recently, lately, so far, up to now", "We have had three meetings so far."],
              ["today, this week, this month, this year", "I have studied a lot this week."],
              ["since + starting point", "since Monday, since 2022, since I was a child"],
              ["for + duration", "for two hours, for six months, for a long time"]
            ],
            tip: "<strong>Since</strong> introduces the starting point (since Monday). <strong>For</strong> expresses a duration (for two hours)."
          },
          {
            number: 4,
            title: "The Past Participle (V3)",
            desc: "Regular verbs usually end in <strong>-ed</strong> (work → worked; finish → finished). Irregular verbs have special forms: learn the third column of an irregular-verb list.",
            tableHead: ["Base form (V1)", "Past simple (V2)", "Past participle (V3)"],
            table: [
              ["work", "worked", "worked"],
              ["study", "studied", "studied"],
              ["go", "went", "gone"],
              ["see", "saw", "seen"],
              ["write", "wrote", "written"],
              ["eat", "ate", "eaten"],
              ["take", "took", "taken"],
              ["do", "did", "done"],
              ["be", "was / were", "been"],
              ["speak", "spoke", "spoken"]
            ]
          }
        ],
        commonMistakes: [
          ["I have seen him yesterday.", "I saw him yesterday."],
          ["She has went home.", "She has gone home."],
          ["I am here since Monday.", "I have been here since Monday."]
        ],
        commonMistakesNote: "Use the Past Simple with a finished past time (yesterday). Use V3 after have / has. Use the present perfect for a situation that continues until now.",
        memoryTipsTitle: "Important Notes — Present Perfect",
        memoryTips: [
          "Present perfect = <strong>have / has + V3</strong>. <em>He has finished the project.</em>",
          "Do not use a finished time (yesterday, last year, in 2019) with the present perfect.",
          "<strong>Since</strong> = starting point; <strong>for</strong> = duration. <em>He has lived here since 2020 / for five years.</em>",
          "The exact time is not important: what matters is the connection with now."
        ]
      }
    ]
  };

  /* Practice quiz: Quiz 1 (Present Perfect). */
  GRAMMAR_CONTENT.presentperfect.practice = [
    {
      id: "perfect-quiz-1",
      short: "Present Perfect",
      type: "mc",
      title: "Quiz 1 — Present Perfect",
      instructions: "Choose the best answer (A, B, C, or D).",
      questions: [
        { text: "I _____ my homework, so I can go out now.", options: ["finish", "have finished", "had finished", "will finish"], correct: 1 },
        { text: "She _____ home. She isn't here now.", options: ["has gone", "has went", "have gone", "had went"], correct: 0 },
        { text: "_____ you ever visited London?", options: ["Did", "Are", "Have", "Has"], correct: 2 },
        { text: "They _____ the results yet.", options: ["haven't received", "hasn't received", "didn't received", "don't receive"], correct: 0 },
        { text: "He has lived here _____ 2020.", options: ["for", "since", "during", "ago"], correct: 1 },
        { text: "We have known each other _____ ten years.", options: ["since", "from", "for", "in"], correct: 2 },
        { text: "Choose the correct sentence.", options: ["I have seen him yesterday.", "I saw him yesterday.", "I have saw him yesterday.", "I seen him yesterday."], correct: 1 },
        { text: "_____ he called you?", options: ["Have", "Does", "Did", "Has"], correct: 3 },
        { text: "We have had three meetings _____ week.", options: ["last", "this", "yesterday", "ago"], correct: 1 },
        { text: "Choose the correct sentence.", options: ["I am here since Monday.", "I was here since Monday.", "I have been here since Monday.", "I have being here since Monday."], correct: 2 }
      ]
    }
  ];
