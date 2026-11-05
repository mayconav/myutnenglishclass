"use strict";
/* Contenido de gramatica: PAST SIMPLE ("The Three Simple Tenses — A2 Grammar Guide").
   Se registra en GRAMMAR_CONTENT.pastsimple, asi que desbloquea el tema
   "Past Simple" del menu (partials/recursos.html, data-topic="pastsimple").
   Reglas: misma forma pasada para todas las personas, did not, Did.
   Campos que renderiza js/app/grammar-render.js: ver grammar-verbs-content.js. */

  GRAMMAR_CONTENT.pastsimple = {
    label: "Past Simple",
    eyebrowPrefix: "Verb System · Verb Tenses",
    definitionTitle: "Past Simple",
    definition: "The <strong>Past Simple</strong> describes actions or events that started and finished at a specific time in the past. The time may be stated or understood from the context.",
    definitionExamples: [
      "We <strong>visited</strong> the museum yesterday.",
      "He <strong>didn't study</strong> last night.",
      "<strong>Did</strong> you finish the project?"
    ],
    modules: [
      {
        title: "Simple Past Tense",
        objectives: [
          "Use the simple past for completed actions and past events with a finished time.",
          "Write the past form of the verb, which is the same for all subjects.",
          "Build negatives with did not and questions with Did + base verb."
        ],
        rules: [
          {
            number: 1,
            title: "Purpose and Use",
            desc: "The Simple Past describes actions or events that started and finished at a specific time in the past. The time may be stated or understood from the context.",
            tableHead: ["Use","Example"],
            table: [
              ["Completed actions","I watched a movie last night."],
              ["Past events in a sequence","She arrived, opened the door, and sat down."],
              ["Past habits or situations","We played outside when we were children."],
              ["Past experiences with a finished time reference","They visited Oaxaca in 2024."]
            ]
          },
          {
            number: 2,
            title: "Sentence Structures",
            desc: "In affirmative sentences, write the <strong>past form</strong> of the verb. It is the <strong>same for all persons</strong> (I, you, he, she, it, we, they). In negatives and questions, use <strong>did</strong> + the base verb.",
            tableHead: ["Form","Structure","Example"],
            table: [
              ["Affirmative","Subject + past form of the verb + complement.","We visited the museum yesterday."],
              [
                "Negative",
                "Subject + did + not + base verb + complement.",
                "He did not (didn't) study last night.<br>They didn't watch TV."
              ],
              [
                "Interrogative",
                "Did + subject + base verb + complement + ?",
                "Did you finish the project?<br>Did she go home?"
              ]
            ]
          },
          {
            number: 3,
            title: "Same Form for All Persons",
            desc: "The past form does not change with the subject, and the auxiliary is always <strong>did</strong> (never does / do).",
            tableHead: ["Form","Example"],
            table: [
              ["Affirmative","I / you / he / she / it / we / they <strong>studied</strong>."],
              ["Negative","I / you / he / she / it / we / they <strong>did not (didn't) study</strong>."],
              ["Interrogative","<strong>Did</strong> I / you / he / she / it / we / they <strong>study</strong>?"]
            ],
            tip: "Regular verbs add <strong>-ed</strong> (visit → visited). Irregular verbs have their own past form (go → went, have → had, lose → lost)."
          },
          {
            number: 4,
            title: "Common Time Expressions",
            desc: "Signal words that often go with the simple past.",
            tableHead: ["Time expressions","Example"],
            table: [
              ["yesterday, last night / week","I watched a movie last night."],
              ["two days ago, in 2024","They visited Oaxaca in 2024."],
              ["when I was a child","We played outside when we were children."]
            ]
          }
        ],
        commonMistakes: [
          ["Did she went home?","Did she go home?"],
          ["They didn't watched TV.","They didn't watch TV."],
          ["I studyed yesterday.","I studied yesterday."],
          ["He does not study last night.","He did not study last night."]
        ],
        memoryTipsTitle: "📌 Important Notes — Simple Past",
        memoryTips: [
          "In affirmative sentences write the <strong>past form</strong> of the verb for <strong>all persons</strong>. <em>She studied. They studied.</em>",
          "The negative is <strong>did not (didn't)</strong> + base verb, for all persons. <em>He didn't study last night.</em>",
          "In questions, put <strong>Did</strong> before the subject + base verb. <em>Did he study? Did you call your friend?</em>",
          "After did / didn't, the main verb returns to the <strong>base form</strong>. <em>Did she go?</em> (not “Did she went”)"
        ]
      }
    ]
  };

  /* Practice quiz de Past Simple (answer key de la guia original). */
  GRAMMAR_CONTENT.pastsimple.practice = [
    {
      id: "simpletenses-quiz-2",
      short: "Past Simple",
      type: "mc",
      title: "Quiz — Simple Past Tense",
      instructions: "Choose the correct answer (A, B, C, or D).",
      questions: [
        {
          text: "Yesterday, I _____ my grandmother.",
          options: ["visit","visits","visited","visiting"],
          correct: 2
        },
        {
          text: "They _____ to the cinema last Saturday.",
          options: ["go","went","goes","going"],
          correct: 1
        },
        {
          text: "She _____ the exam because she was sick.",
          options: ["didn't take","doesn't took","not took","didn't took"],
          correct: 0
        },
        {
          text: "_____ you call your friend last night?",
          options: ["Do","Were","Does","Did"],
          correct: 3
        },
        {
          text: "We _____ dinner at 8:00 p.m. yesterday.",
          options: ["have","has","had","having"],
          correct: 2
        },
        {
          text: "He _____ his keys two days ago.",
          options: ["lose","loses","lost","losing"],
          correct: 2
        },
        {
          text: "My parents _____ at home last weekend.",
          options: ["was","were","are","be"],
          correct: 1
        },
        {
          text: "Which sentence is correct?",
          options: ["Did she went home?","They didn't watched TV.","I studyed yesterday.","We didn't see the movie."],
          correct: 3
        },
        {
          text: "The students _____ their assignment yesterday.",
          options: ["finish","finishes","finished","finishing"],
          correct: 2
        },
        {
          text: "_____ he arrive late this morning?",
          options: ["Did","Does","Was","Do"],
          correct: 0
        }
      ]
    }
  ];
