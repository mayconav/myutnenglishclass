"use strict";
/* Contenido de gramatica: FUTURE PERFECT (guia "The Perfect Tenses — Complete Guide").
   Se registra en GRAMMAR_CONTENT.futureperfect, asi que desbloquea el tema
   "Future Perfect" del menu (partials/recursos.html, data-topic="futureperfect").
   Reglas: will have + past participle (V3). Incluye la comparacion de los 3 tiempos
   perfectos, la guia rapida de decision y el Quiz 4 (Mixed Perfect Tenses).
   Campos que renderiza js/app/grammar-render.js: ver grammar-verbs-content.js. */

  GRAMMAR_CONTENT.futureperfect = {
    label: "Future Perfect",
    eyebrowPrefix: "Verb System · Verb Tenses",
    definitionTitle: "Future Perfect",
    definition: "The <strong>Future Perfect</strong> looks forward from now to a future reference point. It describes what <strong>will be completed by then</strong>. It is formed with <strong>will have + the past participle (V3)</strong> of the main verb.",
    definitionExamples: [
      "By Friday, I <strong>will have completed</strong> the assignment.",
      "In June, they <strong>will have lived</strong> here for five years.",
      "<strong>Will</strong> you <strong>have completed</strong> the project by tomorrow?"
    ],
    modules: [
      {
        title: "Future Perfect",
        objectives: [
          "Use the future perfect for actions that will be completed before a future deadline or reference point.",
          "Build affirmative, negative, and interrogative sentences with will have + V3.",
          "Compare the present perfect, past perfect, and future perfect and choose the right one."
        ],
        rules: [
          {
            number: 1,
            title: "Purpose and Use",
            desc: "The Future Perfect usually emphasizes <strong>completion by a future time</strong>, not simply an action that will happen in the future.",
            tableHead: ["Use", "Example"],
            table: [
              ["Completion before a future deadline", "By Friday, I will have completed the assignment."],
              ["Looking back from a future point", "In June, they will have lived here for five years."],
              ["Expected progress or achievement", "The technicians will have installed the new system by noon."]
            ]
          },
          {
            number: 2,
            title: "Sentence Structures",
            desc: "<strong>Will have</strong> is the same for all subjects and is always followed by the past participle (V3).",
            tableHead: ["Form", "Structure", "Example"],
            table: [
              ["Affirmative", "Subject + will have + V3 + complement", "She will have finished the course by December.<br>We will have arrived before sunset."],
              ["Negative", "Subject + will not (won't) have + V3 + complement", "She won't have finished the course by December.<br>They won't have repaired the computers by Monday."],
              ["Yes/No question", "Will + subject + have + V3 + complement?", "Will you have completed the project by tomorrow? — Yes, I will. / No, I won't."],
              ["Wh-question", "Wh-word + will + subject + have + V3 + complement?", "How many units will they have produced by June?<br>Where will you have worked by then?"]
            ]
          },
          {
            number: 3,
            title: "Common Time Expressions",
            desc: "Signal words that often go with the future perfect.",
            tableHead: ["Time expressions", "Example"],
            table: [
              ["by, by then", "By then, we will have finished."],
              ["by the time", "By the time you arrive, I will have prepared dinner."],
              ["by tomorrow, by next week, by 2030", "We will have saved enough money by 2030."],
              ["before, in two years", "We will have arrived before sunset."]
            ],
            tip: "In time clauses referring to the future, use the <strong>Present Simple</strong> after <em>by the time</em> and similar conjunctions, not <em>will</em>. Correct: By the time you arrive, I will have prepared dinner."
          },
          {
            number: 4,
            title: "Comparing the Three Perfect Tenses",
            desc: "Perfect tenses connect two points in time. They show how an action is viewed in relation to another time or reference point. All three use <strong>have + V3</strong>.",
            tableHead: ["Tense", "Reference point", "Main idea", "Example"],
            table: [
              ["Present Perfect", "Now / the present", "Past action connected to now", "I have done my homework."],
              ["Past Perfect", "A point in the past", "Action completed before that past point", "I had done my homework before dinner."],
              ["Future Perfect", "A point in the future", "Action completed before that future point", "I will have done my homework by 8 p.m."]
            ]
          },
          {
            number: 5,
            title: "One Situation, Three Time Perspectives",
            desc: "The same situation can be seen from three different points in time.",
            tableHead: ["Tense", "Example"],
            table: [
              ["Present Perfect", "I have worked here for five years. (I still work here now.)"],
              ["Past Perfect", "I had worked there for five years when I got promoted. (The five years came before the promotion.)"],
              ["Future Perfect", "By next May, I will have worked here for five years. (Five years will be complete by that future date.)"]
            ]
          },
          {
            number: 6,
            title: "Quick Decision Guide",
            desc: "Ask yourself these three questions to choose the right perfect tense.",
            tableHead: ["Question", "Tense"],
            table: [
              ["Is the past action connected to the present, with no finished past time stated?", "Present Perfect"],
              ["Did it happen before another past event or past reference point?", "Past Perfect"],
              ["Will it be complete before a stated future time?", "Future Perfect"]
            ],
            tip: "The time expression can help, but meaning and context determine the tense. Do not choose a tense by matching one word mechanically."
          }
        ],
        commonMistakes: [
          ["He will has finished by six.", "He will have finished by six."],
          ["By the time she will arrive, we will have eaten.", "By the time she arrives, we will have eaten."],
          ["She will have went home by then.", "She will have gone home by then."]
        ],
        commonMistakesNote: "Use the base form <em>have</em> after will, and the past participle (V3) after have. After <em>by the time</em>, use the present simple.",
        memoryTipsTitle: "Important Notes — Future Perfect",
        memoryTips: [
          "Future perfect = <strong>will have + V3</strong> for all subjects. <em>She will have finished the course by December.</em>",
          "The negative is <strong>won't have + V3</strong>. <em>They won't have repaired the computers by Monday.</em>",
          "In questions, put <strong>Will</strong> before the subject. <em>Will you have completed the project by tomorrow?</em>",
          "Think of a future deadline: by Friday, by then, by the time."
        ]
      }
    ]
  };

  /* Practice quizzes: Quiz 3 (Future Perfect) y Quiz 4 (Mixed Perfect Tenses). */
  GRAMMAR_CONTENT.futureperfect.practice = [
    {
      id: "perfect-quiz-3",
      short: "Future Perfect",
      type: "mc",
      title: "Quiz 3 — Future Perfect",
      instructions: "Choose the best answer (A, B, C, or D).",
      questions: [
        { text: "By next Friday, the team _____ the project.", options: ["completes", "will have completed", "has completed", "had completed"], correct: 1 },
        { text: "By Friday, I _____ the assignment.", options: ["will have completed", "will has completed", "will completed", "have completed"], correct: 0 },
        { text: "_____ you have completed the project by tomorrow?", options: ["Do", "Have", "Will", "Did"], correct: 2 },
        { text: "They _____ have repaired the computers by Monday.", options: ["don't", "won't", "haven't", "hadn't"], correct: 1 },
        { text: "In June, they _____ here for five years.", options: ["will have lived", "have lived", "had lived", "will live"], correct: 0 },
        { text: "By the time you _____, I will have prepared dinner.", options: ["will arrive", "arrived", "arrive", "are arriving will"], correct: 2 },
        { text: "Choose the correct sentence.", options: ["He will has finished by six.", "He will have finished by six.", "He will have finish by six.", "He have will finished by six."], correct: 1 },
        { text: "The technicians _____ the new system by noon.", options: ["will have installed", "had installed", "install", "have install"], correct: 0 },
        { text: "How many units _____ they have produced by June?", options: ["did", "have", "will", "had"], correct: 2 },
        { text: "We _____ before sunset.", options: ["have arrived", "will have arrived", "will arrived", "had arrive"], correct: 1 }
      ]
    },
    {
      id: "perfect-quiz-4",
      short: "Mixed Perfect",
      type: "mc",
      title: "Quiz 4 — Mixed Perfect Tenses",
      instructions: "Choose the best answer (A, B, C, or D).",
      questions: [
        { text: "I _____ my homework, so I can go out now.", options: ["have finished", "had finished", "will have finished", "finished yesterday"], correct: 0 },
        { text: "By the time the bus arrived, we _____ for 30 minutes.", options: ["have waited", "will have waited", "waited", "had waited"], correct: 3 },
        { text: "By next Friday, the team _____ the project.", options: ["has completed", "will have completed", "had completed", "completed"], correct: 1 },
        { text: "_____ you ever visited London?", options: ["Have", "Had", "Will", "Did"], correct: 0 },
        { text: "She couldn't enter because she _____ her ID.", options: ["has forgotten", "will have forgotten", "had forgotten", "forgets"], correct: 2 },
        { text: "They _____ the results yet.", options: ["hadn't received", "haven't received", "won't have received", "didn't receive"], correct: 1 },
        { text: "_____ he have finished the report by 5 p.m.?", options: ["Has", "Had", "Did", "Will"], correct: 3 },
        { text: "We were hungry because we _____ breakfast.", options: ["haven't eaten", "won't have eaten", "hadn't eaten", "don't eat"], correct: 2 },
        { text: "I _____ worked there for five years when I got promoted.", options: ["had", "have", "will have", "has"], correct: 0 },
        { text: "By next May, I _____ here for five years.", options: ["have worked", "had worked", "will have worked", "worked"], correct: 2 }
      ]
    }
  ];
