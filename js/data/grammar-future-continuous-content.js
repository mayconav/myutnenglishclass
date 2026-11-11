"use strict";
/* Contenido de gramatica: FUTURE CONTINUOUS (guia "The Continuous Tenses — A2–B1 Grammar Guide").
   Se registra en GRAMMAR_CONTENT.futurecontinuous, asi que desbloquea el tema
   "Future Continuous" del menu (partials/recursos.html, data-topic="futurecontinuous").
   Reglas: will be + verb-ing. Incluye la comparacion rapida de los 3 tiempos continuos
   y el Quiz 4 (Mixed Continuous Tenses).
   Campos que renderiza js/app/grammar-render.js: ver grammar-verbs-content.js. */

  GRAMMAR_CONTENT.futurecontinuous = {
    label: "Future Continuous",
    eyebrowPrefix: "Verb System · Verb Tenses",
    definitionTitle: "Future Continuous",
    definition: "The <strong>Future Continuous</strong> describes an action that will be <strong>in progress</strong> at a specific time in the future. It is formed with <strong>will be + the -ing form</strong> of the main verb.",
    definitionExamples: [
      "This time tomorrow, I <strong>will be travelling</strong>.",
      "She <strong>will be working</strong> late tonight.",
      "<strong>Will</strong> you <strong>be using</strong> the meeting room this afternoon?"
    ],
    modules: [
      {
        title: "Future Continuous",
        objectives: [
          "Use the future continuous for actions in progress at a future time, expected events, and polite questions about plans.",
          "Build affirmative, negative, and interrogative sentences with will be + verb-ing.",
          "Compare the present, past, and future continuous."
        ],
        rules: [
          {
            number: 1,
            title: "Purpose and Use",
            desc: "The Future Continuous shows that an action will be <strong>in progress</strong> at a certain moment in the future.",
            tableHead: ["Use", "Example"],
            table: [
              ["An action that will be in progress at a specific time in the future", "This time tomorrow, I will be travelling."],
              ["An expected or planned course of events", "She will be working late tonight."],
              ["Polite questions about someone's plans", "Will you be using the meeting room this afternoon?"]
            ]
          },
          {
            number: 2,
            title: "Sentence Structures",
            desc: "<strong>Will be</strong> is the same for all subjects and is always followed by the -ing form.",
            tableHead: ["Form", "Structure", "Example"],
            table: [
              ["Affirmative", "Subject + will be + verb-ing", "I will be studying.<br>At 9 tomorrow, the team will be testing the new app."],
              ["Negative", "Subject + will not (won't) be + verb-ing", "I won't be studying.<br>We won't be working on Sunday."],
              ["Yes/No question", "Will + subject + be + verb-ing?", "Will you be studying?<br>Will you be attending the lecture?"],
              ["Wh-question", "Wh-word + will + subject + be + verb-ing?", "What will you be doing?<br>Where will they be staying?"]
            ]
          },
          {
            number: 3,
            title: "Common Time Expressions",
            desc: "Signal words that often go with the future continuous.",
            tableHead: ["Time expressions", "Example"],
            table: [
              ["this time tomorrow", "This time tomorrow, we will be travelling to Guadalajara."],
              ["at 8 p.m. next Friday", "At 9 p.m. next Friday, will you be watching the game?"],
              ["tomorrow morning, in two hours", "They will be using the laboratory tomorrow morning."],
              ["next week at this time", "At this time next week, they will be staying in Cancún."]
            ]
          },
          {
            number: 4,
            title: "Quick Comparison",
            desc: "The three continuous tenses all describe an action in progress, but at different times.",
            tableHead: ["Tense", "Main idea", "Example"],
            table: [
              ["Present Continuous", "In progress now / temporary", "I am studying now."],
              ["Past Continuous", "In progress at a past time", "I was studying at 8 p.m."],
              ["Future Continuous", "In progress at a future time", "I will be studying at 8 p.m. tomorrow."]
            ],
            tip: "English also has perfect continuous forms (present perfect continuous, past perfect continuous, and future perfect continuous), which are more advanced and are not included in this introductory guide."
          }
        ],
        commonMistakes: [
          ["Will you be study?", "Will you be studying?"],
          ["I will studying tomorrow.", "I will be studying tomorrow."],
          ["I won't sleeping.", "I won't be sleeping."]
        ],
        memoryTipsTitle: "📌 Important Notes — Future Continuous",
        memoryTips: [
          "Future continuous = <strong>will be + verb-ing</strong> for all subjects. <em>She will be working late.</em>",
          "The negative is <strong>won't be</strong> + verb-ing. <em>We won't be working on Sunday.</em>",
          "In questions, put <strong>Will</strong> before the subject. <em>Will you be attending the lecture?</em>",
          "Remember: continuous = BE + verb-ing. Do not omit <strong>be</strong>."
        ]
      }
    ]
  };

  /* Practice quizzes: Quiz 3 (Future Continuous) y Quiz 4 (Mixed Continuous Tenses). */
  GRAMMAR_CONTENT.futurecontinuous.practice = [
    {
      id: "continuous-quiz-3",
      short: "Future Continuous",
      type: "mc",
      title: "Quiz 3 — Future Continuous",
      instructions: "Choose the best answer (A, B, C, or D).",
      questions: [
        { text: "This time tomorrow, we _____ to Guadalajara.", options: ["travel","travelled","will be travelling","are travel"], correct: 2 },
        { text: "At 8 p.m., she _____ for her exam.", options: ["will be studying","will studying","studies","studied"], correct: 0 },
        { text: "_____ you be working tomorrow morning?", options: ["Do","Are","Will","Did"], correct: 2 },
        { text: "They _____ be using the laboratory next week.", options: ["won't","aren't","don't","wasn't"], correct: 0 },
        { text: "What _____ he be doing at noon?", options: ["does","will","is","was"], correct: 1 },
        { text: "The IT team _____ be testing the system at 10 a.m.", options: ["will","will be","is","were"], correct: 0 },
        { text: "Choose the correct negative sentence.", options: ["I won't be sleeping.","I won't sleeping.","I not will be sleeping.","I won't be sleep."], correct: 0 },
        { text: "At this time next week, they _____ in Cancún.", options: ["will staying","will be staying","are stayed","stayed"], correct: 1 },
        { text: "_____ your friends be joining us for dinner?", options: ["Are","Do","Will","Did"], correct: 2 },
        { text: "At 6 tomorrow, I _____ home from work.", options: ["will be driving","drive","was driving","am drive"], correct: 0 }
      ]
    },
    {
      id: "continuous-quiz-4",
      short: "Mixed Continuous",
      type: "mc",
      title: "Quiz 4 — Mixed Continuous Tenses",
      instructions: "Choose the best answer (A, B, C, or D).",
      questions: [
        { text: "Listen! Someone _____ at the door.", options: ["is knocking","was knocking","will knocking","knock"], correct: 0 },
        { text: "At 7 last night, my parents _____ dinner.", options: ["are having","were having","will be having","has"], correct: 1 },
        { text: "This time next month, I _____ at a new university.", options: ["am teaching","taught","will be teaching","was teaching"], correct: 2 },
        { text: "While we _____ home, we saw an accident.", options: ["were driving","are driving","will drive","drives"], correct: 0 },
        { text: "She _____ a video call right now.", options: ["was making","will be making","is making","make"], correct: 2 },
        { text: "At 10 tomorrow morning, the students _____ an exam.", options: ["were taking","will be taking","are took","took"], correct: 1 },
        { text: "I _____ when you sent the message last night.", options: ["was sleeping","am sleeping","will be sleeping","sleeps"], correct: 0 },
        { text: "Which sentence describes an action in progress now?", options: ["He worked yesterday.","He will work tomorrow.","He is working now.","He works every day."], correct: 2 },
        { text: "We _____ not using the computers at the moment.", options: ["was","will","are","is"], correct: 2 },
        { text: "At 9 p.m. next Friday, _____ you be watching the game?", options: ["do","were","are","will"], correct: 3 }
      ]
    }
  ];
