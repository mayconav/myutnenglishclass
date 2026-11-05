"use strict";
/* Contenido de gramatica: FUTURE WITH WILL ("The Three Simple Tenses — A2 Grammar Guide").
   Se registra en GRAMMAR_CONTENT.futurewill, asi que desbloquea el tema
   "Future with Will" del menu (partials/recursos.html, data-topic="futurewill").
   Reglas: will + base verb, will not / won't, Will.
   Campos que renderiza js/app/grammar-render.js: ver grammar-verbs-content.js. */

  GRAMMAR_CONTENT.futurewill = {
    label: "Future with Will",
    eyebrowPrefix: "Verb System · Verb Tenses",
    definitionTitle: "Future with Will",
    definition: "The <strong>Future with Will</strong> is used to talk about future actions, predictions, promises, offers, and decisions made at the moment of speaking.",
    definitionExamples: [
      "I <strong>will study</strong> for the exam tomorrow.",
      "She <strong>won't travel</strong> next week.",
      "<strong>Will</strong> they attend the meeting?"
    ],
    modules: [
      {
        title: "Simple Future Tense (will)",
        objectives: [
          "Use will for predictions, promises, offers, spontaneous decisions, and future expectations.",
          "Build affirmative, negative, and interrogative sentences with will.",
          "Use the base form of the verb after will for all subjects."
        ],
        rules: [
          {
            number: 1,
            title: "Purpose and Use",
            desc: "The Simple Future with <strong>will</strong> is used to talk about future actions, predictions, promises, offers, and decisions made at the moment of speaking.",
            tableHead: ["Use","Example"],
            table: [
              ["Predictions","I think the exam will be easy."],
              ["Spontaneous decisions","The phone is ringing. I will answer it."],
              ["Promises","I will help you with your homework."],
              ["Offers","I will carry your books."],
              ["Future expectations","The semester will end in December."]
            ]
          },
          {
            number: 2,
            title: "Sentence Structures",
            desc: "Will is the same for all subjects and is always followed by the base verb.",
            tableHead: ["Form","Structure","Example"],
            table: [
              ["Affirmative","Subject + will + base verb + complement.","I will study for the exam tomorrow."],
              [
                "Negative",
                "Subject + will + not + base verb + complement.",
                "She will not (won't) travel next week.<br>They won't be late."
              ],
              [
                "Interrogative",
                "Will + subject + base verb + complement + ?",
                "Will they attend the meeting?<br>Will you call me later?"
              ]
            ]
          },
          {
            number: 3,
            title: "Common Time Expressions",
            desc: "Signal words that often go with the simple future.",
            tableHead: ["Time expressions","Example"],
            table: [
              ["tomorrow, tonight","I will study for the exam tomorrow."],
              ["next week / month","She will not travel next week."],
              ["soon, later, in December","The semester will end in December."]
            ]
          }
        ],
        commonMistakes: [
          ["She will studies tomorrow.","She will study tomorrow."],
          ["Will he goes with us?","Will he go with us?"],
          ["I will to call you.","I will call you."]
        ],
        memoryTipsTitle: "📌 Important Notes — Simple Future",
        memoryTips: [
          "Use <strong>will + the base form</strong> of the verb for all subjects. <em>She will help us.</em>",
          "The negative form is <strong>will not</strong> or <strong>won't</strong>. <em>They won't be late.</em>",
          "In questions, put <strong>will</strong> before the subject. <em>Will you study?</em>"
        ]
      }
    ]
  };

  /* Practice quiz de Future with Will (answer key de la guia original). */
  GRAMMAR_CONTENT.futurewill.practice = [
    {
      id: "simpletenses-quiz-3",
      short: "Future with Will",
      type: "mc",
      title: "Quiz — Simple Future Tense (will)",
      instructions: "Choose the correct answer (A, B, C, or D).",
      questions: [
        {
          text: "I think it _____ rain tomorrow.",
          options: ["will","does","did","is"],
          correct: 0
        },
        {
          text: "She _____ help us with the project.",
          options: ["will","wills","will to","is will"],
          correct: 0
        },
        {
          text: "They _____ come to class next Monday.",
          options: ["won't","doesn't","didn't","aren't"],
          correct: 0
        },
        {
          text: "_____ you call me later?",
          options: ["Do","Are","Will","Did"],
          correct: 2
        },
        {
          text: "We will _____ the report tonight.",
          options: ["finishes","finished","finishing","finish"],
          correct: 3
        },
        {
          text: "He _____ forget your birthday.",
          options: ["will not","not will","doesn't will","won't to"],
          correct: 0
        },
        {
          text: "_____ the students take the test tomorrow?",
          options: ["Do","Did","Will","Are"],
          correct: 2
        },
        {
          text: "I am sure our team _____ win the game.",
          options: ["will","was","does","winning"],
          correct: 0
        },
        {
          text: "Which sentence is correct?",
          options: ["She will studies tomorrow.","They won't be late.","Will he goes with us?","I will to call you."],
          correct: 1
        },
        {
          text: "The teacher _____ explain the activity again.",
          options: ["will","will to","wills","does will"],
          correct: 0
        }
      ]
    }
  ];
