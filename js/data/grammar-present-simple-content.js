"use strict";
/* Contenido de gramatica: PRESENT SIMPLE ("The Three Simple Tenses — A2 Grammar Guide").
   Se registra en GRAMMAR_CONTENT.presentsimple, asi que desbloquea el tema
   "Present Simple" del menu (partials/recursos.html, data-topic="presentsimple").
   Reglas: base verb (+s/es con he/she/it), don't / doesn't, Do / Does.
   Campos que renderiza js/app/grammar-render.js: ver grammar-verbs-content.js. */

  GRAMMAR_CONTENT.presentsimple = {
    label: "Present Simple",
    eyebrowPrefix: "Verb System · Verb Tenses",
    definitionTitle: "Present Simple",
    definition: "The <strong>Present Simple</strong> describes habits, routines, facts, and situations that are generally or regularly true. It does not usually describe an action happening at this exact moment.",
    definitionExamples: [
      "She <strong>studies</strong> English every day.",
      "Water <strong>boils</strong> at 100°C.",
      "They <strong>don't work</strong> on Sundays."
    ],
    modules: [
      {
        title: "Simple Present Tense",
        objectives: [
          "Use the simple present for habits, routines, facts, and schedules.",
          "Build affirmative, negative, and interrogative sentences with do / does.",
          "Use the base form of the verb after do / does and add -s / -es with he, she, it."
        ],
        rules: [
          {
            number: 1,
            title: "Purpose and Use",
            desc: "The Simple Present describes habits, routines, facts, and situations that are generally or regularly true. It does not usually describe an action happening at this exact moment.",
            tableHead: ["Use","Example"],
            table: [
              ["Daily routines and habits","I get up at 7:00 a.m."],
              ["Facts and general truths","Water boils at 100°C."],
              ["Permanent or regular situations","She lives in Mexico."],
              ["Schedules and timetables","The class starts at 9:00 a.m."]
            ]
          },
          {
            number: 2,
            title: "Sentence Structures",
            desc: "Use the <strong>base verb</strong> for I, you, we, they. With he, she, it add <strong>-s / -es</strong>. In negatives and questions, the auxiliary <strong>do / does</strong> is used with the base verb.",
            tableHead: ["Form","Structure","Example"],
            table: [
              [
                "Affirmative",
                "Subject + base verb (+ -s/-es with he, she, it) + complement.",
                "She studies English every day."
              ],
              [
                "Negative",
                "Subject + do / does + not + base verb + complement.",
                "They do not (don't) work on Sundays.<br>She does not (doesn't) like coffee."
              ],
              [
                "Interrogative",
                "Do / Does + subject + base verb + complement + ?",
                "Does he play soccer?<br>Do you study English?"
              ]
            ]
          },
          {
            number: 3,
            title: "Do / Does — Which One?",
            desc: "Choose the auxiliary according to the subject. The main verb always stays in the <strong>base form</strong>.",
            tableHead: ["Subject","Negative","Question"],
            table: [
              [
                "I / You / We / They",
                "don't (do not) + base verb<br><em>They don't drink coffee.</em>",
                "Do + subject + base verb?<br><em>Do you study?</em>"
              ],
              [
                "He / She / It",
                "doesn't (does not) + base verb<br><em>She doesn't study French.</em>",
                "Does + subject + base verb?<br><em>Does he play soccer?</em>"
              ]
            ],
            tip: "After <strong>do / does</strong> the main verb never takes -s: <em>Does he <strong>work</strong> here?</em> (not “Does he works”)."
          },
          {
            number: 4,
            title: "Common Time Expressions",
            desc: "Signal words that often go with the simple present.",
            tableHead: ["Time expressions","Example"],
            table: [
              ["always, usually, often","I usually get up at 7:00 a.m."],
              ["every day / week / year","She studies English every day."],
              ["on Mondays, at night","The class starts at 9:00 a.m."]
            ]
          }
        ],
        commonMistakes: [
          ["She don't study French.","She doesn't study French."],
          ["Does he works here?","Does he work here?"],
          ["They studies together.","They study together."],
          ["Maria watch TV at night.","Maria watches TV at night."]
        ],
        memoryTipsTitle: "📌 Important Notes — Simple Present",
        memoryTips: [
          "Use the <strong>base form</strong> of the verb with I, you, we, they. <em>I study. They work.</em>",
          "With he, she, it add <strong>-s / -es</strong>. <em>She studies. He watches.</em>",
          "The negative uses <strong>don't</strong> (I, you, we, they) or <strong>doesn't</strong> (he, she, it) + base verb. <em>I don't like cold weather.</em>",
          "In questions, put <strong>Do / Does</strong> before the subject. <em>Do you study? Does he play soccer?</em>"
        ]
      }
    ]
  };

  /* Practice quiz de Present Simple (answer key de la guia original). */
  GRAMMAR_CONTENT.presentsimple.practice = [
    {
      id: "simpletenses-quiz-1",
      short: "Present Simple",
      type: "mc",
      title: "Quiz — Simple Present Tense",
      instructions: "Choose the correct answer (A, B, C, or D).",
      questions: [
        {
          text: "My brother _____ to university every day.",
          options: ["go","goes","going","went"],
          correct: 1
        },
        {
          text: "They _____ coffee in the morning.",
          options: ["doesn't drink","not drink","don't drink","aren't drink"],
          correct: 2
        },
        {
          text: "_____ your teacher speak English?",
          options: ["Do","Is","Does","Has"],
          correct: 2
        },
        {
          text: "We _____ our homework after class.",
          options: ["does","doing","do","did"],
          correct: 2
        },
        {
          text: "Maria _____ TV at night.",
          options: ["watch","watching","watchs","watches"],
          correct: 3
        },
        {
          text: "I _____ like cold weather.",
          options: ["doesn't","don't","am not","not"],
          correct: 1
        },
        {
          text: "_____ they live near the campus?",
          options: ["Does","Are","Do","Is"],
          correct: 2
        },
        {
          text: "He _____ his emails before class.",
          options: ["check","checks","checking","checkes"],
          correct: 1
        },
        {
          text: "The library _____ at 8:00 a.m.",
          options: ["open","opens","opening","opened"],
          correct: 1
        },
        {
          text: "Which sentence is correct?",
          options: ["She don't study French.","Does he works here?","They studies together.","He doesn't play tennis."],
          correct: 3
        }
      ]
    }
  ];
