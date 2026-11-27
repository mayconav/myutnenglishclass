"use strict";
/* Contenido de gramatica: INFINITIVES (Verb System · Non-Finite Verbs, nivel A2–B1).
   Se registra en GRAMMAR_CONTENT.infinitives, asi que desbloquea el tema
   "Infinitives" del menu (partials/recursos.html, data-topic="infinitives").
   Cubre: to-infinitive y bare infinitive, usos, patrones verbo + to, adjetivo + to,
   proposito, too/enough, forma negativa y errores comunes. 1 unidad + 1 quiz.
   Campos que renderiza js/app/grammar-render.js: ver grammar-verbs-content.js. */

  GRAMMAR_CONTENT.infinitives = {
    label: "Infinitives",
    eyebrowPrefix: "Verb System · Non-Finite Verbs",
    definitionTitle: "What Is an Infinitive?",
    definition: "The <strong>infinitive</strong> is the base form of a verb. It does not show tense, person, or number, so it is a <strong>non-finite verb</strong>. It usually appears with <strong>to</strong> (<em>to eat, to study</em>), which is called the <strong>to-infinitive</strong>. Without <em>to</em>, it is called the <strong>bare infinitive</strong> (<em>eat, study</em>).",
    definitionExamples: [
      "I want <strong>to learn</strong> English.",
      "She decided <strong>to study</strong> medicine.",
      "We went to the library <strong>to borrow</strong> some books.",
      "You must <strong>wear</strong> a helmet. (bare infinitive)",
      "It is important <strong>to sleep</strong> well."
    ],
    modules: [
      {
        title: "Infinitives",
        objectives: [
          "Recognize the to-infinitive and the bare infinitive.",
          "Use the infinitive after common verbs, adjectives, and question words.",
          "Use the infinitive to express purpose, and use too / enough with it.",
          "Avoid common mistakes with the infinitive."
        ],
        rules: [
          {
            number: 1,
            title: "Two Forms of the Infinitive",
            desc: "The infinitive has two forms. Both use the same base verb; the only difference is whether <strong>to</strong> is present.",
            tableHead: ["Form", "Structure", "Example"],
            table: [
              ["To-infinitive", "to + base verb", "I want <strong>to travel</strong> this summer."],
              ["Bare infinitive", "base verb (no to)", "She can <strong>swim</strong> very well."],
              ["Negative infinitive", "not + to + base verb", "He decided <strong>not to go</strong> to the party."]
            ],
            tip: "The infinitive never changes: <em>She wants to go</em>, not <em>She wants to goes</em>. The verb <em>want</em> changes; the infinitive does not."
          },
          {
            number: 2,
            title: "Verb + To-Infinitive",
            desc: "Many verbs are followed directly by a to-infinitive. They often talk about wishes, plans, decisions, and attitudes.",
            tableHead: ["Verbs", "Example"],
            table: [
              ["want, need, would like, hope, expect", "I hope <strong>to see</strong> you soon."],
              ["decide, plan, intend, choose", "They plan <strong>to buy</strong> a new car."],
              ["learn, promise, agree, refuse", "He refused <strong>to answer</strong> the question."],
              ["manage, afford, seem, appear", "We can't afford <strong>to travel</strong> this year."]
            ]
          },
          {
            number: 3,
            title: "Verb + Object + To-Infinitive",
            desc: "After some verbs, we put a person (object) before the to-infinitive.",
            tableHead: ["Structure", "Example"],
            table: [
              ["want + object + to + verb", "My parents want <strong>me to study</strong> engineering."],
              ["tell / ask + object + to + verb", "The teacher told <strong>us to open</strong> our books."],
              ["need / advise / allow + object + to + verb", "The doctor advised <strong>him to rest</strong>."],
              ["would like + object + to + verb", "I would like <strong>you to help</strong> me."]
            ],
            tip: "Do not use <em>that</em> after <em>want</em>. Say <em>I want you to come</em>, not <em>I want that you come</em>."
          },
          {
            number: 4,
            title: "Adjective + To-Infinitive",
            desc: "We often use a to-infinitive after an adjective to say how someone feels or how easy or difficult something is.",
            tableHead: ["Pattern", "Example"],
            table: [
              ["Feelings: happy, glad, sad, surprised, afraid", "I am <strong>glad to meet</strong> you."],
              ["Ability or readiness: ready, able, willing, likely", "We are <strong>ready to start</strong>."],
              ["Difficulty: easy, difficult, hard, impossible", "This exercise is <strong>easy to do</strong>."],
              ["It is + adjective + to + verb", "It is <strong>important to drink</strong> water."]
            ]
          },
          {
            number: 5,
            title: "Infinitive of Purpose",
            desc: "We use <strong>to + base verb</strong> to answer the question <em>Why?</em> It explains the reason for an action.",
            tableHead: ["Question", "Answer with infinitive of purpose"],
            table: [
              ["Why did you go to the store?", "I went to the store <strong>to buy</strong> bread."],
              ["Why is she studying so much?", "She is studying <strong>to pass</strong> the exam."],
              ["Why do you use this app?", "I use it <strong>to practice</strong> English."]
            ],
            tip: "Do not say <em>for buy</em> or <em>for to buy</em>. Use <em>to buy</em>. With a noun you can use <em>for</em>: <em>I went to the store for bread.</em>"
          },
          {
            number: 6,
            title: "Question Word + To-Infinitive",
            desc: "After verbs like <em>know, decide, learn, explain, wonder</em>, we can use a question word + to-infinitive.",
            tableHead: ["Structure", "Example"],
            table: [
              ["what + to + verb", "I don't know <strong>what to do</strong>."],
              ["how + to + verb", "Can you show me <strong>how to use</strong> this machine?"],
              ["where + to + verb", "She asked <strong>where to park</strong>."],
              ["when / who / which + to + verb", "We haven't decided <strong>which to choose</strong>."]
            ]
          },
          {
            number: 7,
            title: "Too and Enough + Infinitive",
            desc: "<strong>Too</strong> means more than necessary (a problem). <strong>Enough</strong> means as much as necessary.",
            tableHead: ["Pattern", "Example"],
            table: [
              ["too + adjective + to + verb", "The box is <strong>too heavy to lift</strong>."],
              ["adjective + enough + to + verb", "She is <strong>old enough to drive</strong>."],
              ["enough + noun + to + verb", "We have <strong>enough time to finish</strong>."]
            ],
            tip: "<em>Enough</em> goes <strong>after</strong> an adjective (<em>tall enough</em>) but <strong>before</strong> a noun (<em>enough money</em>)."
          },
          {
            number: 8,
            title: "Bare Infinitive (Without To)",
            desc: "Some structures use the infinitive without <em>to</em>.",
            tableHead: ["After", "Example"],
            table: [
              ["Modal verbs: can, could, must, should, will, would, may, might", "You <strong>should see</strong> a doctor."],
              ["let + object", "Her parents <strong>let her go</strong> to the concert."],
              ["make + object", "The movie <strong>made us laugh</strong>."],
              ["had better, would rather", "You <strong>had better leave</strong> now. / I <strong>would rather stay</strong> home."]
            ],
            tip: "Compare: <em>She <strong>made</strong> me <strong>cry</strong>.</em> (bare infinitive) but <em>She <strong>asked</strong> me <strong>to help</strong>.</em> (to-infinitive)."
          }
        ],
        commonMistakes: [
          ["I want that you help me.", "I want you to help me."],
          ["She can to swim very fast.", "She can swim very fast."],
          ["He decided going to Mexico City.", "He decided to go to Mexico City."],
          ["I went to the market for buy fruit.", "I went to the market to buy fruit."],
          ["The teacher made us to write an essay.", "The teacher made us write an essay."],
          ["He promised to not be late.", "He promised not to be late."]
        ],
        commonMistakesNote: "Use <em>to</em> after verbs like want, decide, and need, but not after modal verbs, <em>let</em>, or <em>make</em>. Put <em>not</em> before <em>to</em> to make a negative infinitive.",
        memoryTipsTitle: "Important Notes — Infinitives",
        memoryTips: [
          "Infinitive = <strong>to + base verb</strong>. It never changes for person or tense. <em>He wants to go.</em>",
          "After <strong>modal verbs</strong>, use the bare infinitive. <em>She can swim.</em>",
          "Use <strong>to + verb</strong> to say why you do something. <em>I study to learn.</em>",
          "Negative: <strong>not to + verb</strong>. <em>He promised not to be late.</em>",
          "Use <strong>too</strong> for a problem and <strong>enough</strong> for what is sufficient."
        ]
      }
    ]
  };

  /* Practice quiz: Quiz 1 (Infinitives). */
  GRAMMAR_CONTENT.infinitives.practice = [
    {
      id: "infinitives-quiz-1",
      short: "Infinitives",
      type: "mc",
      title: "Quiz 1 — Infinitives",
      instructions: "Choose the best answer (A, B, C, or D).",
      questions: [
        { text: "I hope _____ you at the party.", options: ["see", "to see", "seeing", "saw"], correct: 1 },
        { text: "She can _____ three languages.", options: ["to speak", "speaking", "speak", "speaks"], correct: 2 },
        { text: "My parents want me _____ medicine.", options: ["study", "to study", "studying", "that I study"], correct: 1 },
        { text: "We went to the supermarket _____ some milk.", options: ["for buy", "buy", "to buy", "buying"], correct: 2 },
        { text: "He decided _____ to the meeting.", options: ["not to go", "to not going", "don't go", "not going"], correct: 0 },
        { text: "The teacher made us _____ the exercise again.", options: ["to do", "do", "doing", "does"], correct: 1 },
        { text: "I don't know what _____ in this situation.", options: ["doing", "do", "to do", "I do to"], correct: 2 },
        { text: "The suitcase is too heavy _____.", options: ["to lift", "lifting", "for lift", "lift"], correct: 0 },
        { text: "Choose the correct sentence.", options: ["She wants that I help her.", "She wants me help her.", "She wants me to help her.", "She wants me helping her."], correct: 2 },
        { text: "He is old _____ to drive a car.", options: ["too", "enough", "very", "so"], correct: 1 }
      ]
    }
  ];
