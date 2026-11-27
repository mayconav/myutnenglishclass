"use strict";
/* Contenido de gramatica: PARTICIPLES (Verb System · Non-Finite Verbs, nivel A2–B1).
   Se registra en GRAMMAR_CONTENT.participles, asi que desbloquea el tema
   "Participles" del menu (partials/recursos.html, data-topic="participles").
   Cubre: participio presente (-ing) y pasado (V3), usos en tiempos verbales, como
   adjetivos (-ing vs -ed), clausulas con participio, y la comparacion de los tres
   verbos no finitos. 1 unidad + 2 quizzes (Quiz 2 = Mixed Non-Finite Verbs).
   Campos que renderiza js/app/grammar-render.js: ver grammar-verbs-content.js. */

  GRAMMAR_CONTENT.participles = {
    label: "Participles",
    eyebrowPrefix: "Verb System · Non-Finite Verbs",
    definitionTitle: "What Is a Participle?",
    definition: "A <strong>participle</strong> is a verb form that can work as part of a verb phrase or as an <strong>adjective</strong>. English has two main participles: the <strong>present participle</strong> (verb + <em>-ing</em>: <em>writing, playing</em>) and the <strong>past participle</strong> (<em>-ed</em> or irregular V3: <em>written, played</em>). Participles do not show tense by themselves, so they are <strong>non-finite verbs</strong>.",
    definitionExamples: [
      "She is <strong>reading</strong> a book. (present participle in a verb phrase)",
      "They have <strong>finished</strong> the project. (past participle in a verb phrase)",
      "That is an <strong>interesting</strong> story. (present participle as adjective)",
      "I am <strong>interested</strong> in this story. (past participle as adjective)",
      "The window <strong>broken</strong> yesterday has been repaired."
    ],
    modules: [
      {
        title: "Participles",
        objectives: [
          "Form the present participle and the past participle, including irregular verbs.",
          "Use participles in continuous, perfect, and passive forms.",
          "Choose correctly between -ing and -ed adjectives (boring / bored).",
          "Use simple participle phrases and compare participles, gerunds, and infinitives."
        ],
        rules: [
          {
            number: 1,
            title: "Forming Participles",
            desc: "The present participle always ends in <strong>-ing</strong>. The past participle ends in <strong>-ed</strong> for regular verbs and has its own form for irregular verbs.",
            tableHead: ["Base verb", "Present participle", "Past participle"],
            table: [
              ["work (regular)", "working", "worked"],
              ["study (regular)", "studying", "studied"],
              ["write (irregular)", "writing", "written"],
              ["break (irregular)", "breaking", "broken"],
              ["go (irregular)", "going", "gone"],
              ["buy (irregular)", "buying", "bought"]
            ],
            tip: "The spelling rules for <em>-ing</em> are the same as for gerunds (<em>make → making, run → running</em>). For irregular past participles, check the irregular verb list in the Resources section."
          },
          {
            number: 2,
            title: "Participles in Verb Tenses",
            desc: "Participles are part of many verb forms.",
            tableHead: ["Form", "Participle used", "Example"],
            table: [
              ["Continuous tenses: be + -ing", "Present participle", "She <strong>is studying</strong> now. / They <strong>were playing</strong> soccer."],
              ["Perfect tenses: have + V3", "Past participle", "We <strong>have visited</strong> Cancún. / He <strong>had left</strong>."],
              ["Passive voice: be + V3", "Past participle", "The email <strong>was sent</strong> yesterday."],
              ["Perfect continuous: have been + -ing", "Both", "I <strong>have been working</strong> since 8 a.m."]
            ]
          },
          {
            number: 3,
            title: "Participles as Adjectives",
            desc: "Both participles can describe nouns. They can go <strong>before a noun</strong> or after a linking verb like <em>be</em> and <em>feel</em>.",
            tableHead: ["Type", "Example"],
            table: [
              ["Present participle before a noun", "a <strong>running</strong> dog, a <strong>sleeping</strong> baby, an <strong>exciting</strong> game"],
              ["Past participle before a noun", "a <strong>broken</strong> window, a <strong>closed</strong> door, a <strong>tired</strong> student"],
              ["After a linking verb", "The movie is <strong>boring</strong>. / I feel <strong>tired</strong>."]
            ]
          },
          {
            number: 4,
            title: "-ing or -ed Adjectives?",
            desc: "Use the <strong>-ing</strong> adjective to describe the thing or person that <strong>causes</strong> the feeling. Use the <strong>-ed</strong> adjective to describe the person who <strong>feels</strong> it.",
            tableHead: ["-ing (cause)", "-ed (feeling)"],
            table: [
              ["The film is <strong>boring</strong>.", "I am <strong>bored</strong>."],
              ["The news is <strong>surprising</strong>.", "We are <strong>surprised</strong>."],
              ["The exam was <strong>tiring</strong>.", "She was <strong>tired</strong>."],
              ["It is an <strong>interesting</strong> class.", "He is <strong>interested</strong> in history."],
              ["The trip was <strong>exciting</strong>.", "The kids are <strong>excited</strong>."]
            ],
            tip: "Ask yourself: <em>Is it the cause or the feeling?</em> <em>I am boring</em> means that I make other people bored. <em>I am bored</em> means that I feel bored."
          },
          {
            number: 5,
            title: "Participle Phrases",
            desc: "A participle phrase gives extra information about a noun. It can shorten a longer sentence.",
            tableHead: ["Long sentence", "With a participle phrase"],
            table: [
              ["The man who is standing near the door is my uncle.", "The man <strong>standing near the door</strong> is my uncle."],
              ["The book that was written by Gabriel García Márquez is famous.", "The book <strong>written by Gabriel García Márquez</strong> is famous."],
              ["The students who are waiting outside are from Mexico.", "The students <strong>waiting outside</strong> are from Mexico."],
              ["Because she was tired, she went to bed early.", "<strong>Being tired</strong>, she went to bed early."]
            ],
            tip: "Use the <strong>present participle</strong> for an active meaning (the man <em>standing</em>) and the <strong>past participle</strong> for a passive meaning (the book <em>written</em>)."
          },
          {
            number: 6,
            title: "Participles, Gerunds, and Infinitives Compared",
            desc: "These three non-finite forms do not show tense. They have different jobs.",
            tableHead: ["Form", "Function", "Example"],
            table: [
              ["Infinitive (to + verb)", "Purpose, after many verbs and adjectives", "I want <strong>to learn</strong> English."],
              ["Gerund (verb + -ing)", "Works like a noun", "<strong>Learning</strong> English is useful."],
              ["Present participle (verb + -ing)", "Works as a verb part or an adjective", "She is <strong>learning</strong> English. / a <strong>learning</strong> app"],
              ["Past participle (V3)", "Perfect tenses, passive, or adjective", "English is <strong>spoken</strong> here. / a <strong>spoken</strong> language"]
            ],
            tip: "A gerund and a present participle look the same (<em>-ing</em>). Look at the function: if the word acts like a <strong>noun</strong>, it is a gerund; if it acts like part of a <strong>verb</strong> or like an <strong>adjective</strong>, it is a participle."
          }
        ],
        commonMistakes: [
          ["I am very boring in this class.", "I am very bored in this class."],
          ["The film was really excited.", "The film was really exciting."],
          ["She has wrote three emails.", "She has written three emails."],
          ["The girl sit near the window is my sister.", "The girl sitting near the window is my sister."],
          ["The window was broke yesterday.", "The window was broken yesterday."],
          ["We are interesting in this course.", "We are interested in this course."]
        ],
        commonMistakesNote: "Use -ing for the thing that causes the feeling and -ed for the person who feels it. After <em>have</em> and <em>be</em> in the passive, use the past participle (V3), not the simple past.",
        memoryTipsTitle: "Important Notes — Participles",
        memoryTips: [
          "Present participle = <strong>verb + -ing</strong>. Past participle = <strong>-ed or irregular V3</strong>.",
          "<strong>-ing</strong> adjective = the cause. <em>The film is boring.</em>",
          "<strong>-ed</strong> adjective = the feeling. <em>I am bored.</em>",
          "Perfect tenses and the passive voice use the <strong>past participle</strong>.",
          "Present participle phrases are active; past participle phrases are passive."
        ]
      }
    ]
  };

  /* Practice quizzes: Quiz 1 (Participles) y Quiz 2 (Mixed Non-Finite Verbs). */
  GRAMMAR_CONTENT.participles.practice = [
    {
      id: "participles-quiz-1",
      short: "Participles",
      type: "mc",
      title: "Quiz 1 — Participles",
      instructions: "Choose the best answer (A, B, C, or D).",
      questions: [
        { text: "What is the past participle of \"write\"?", options: ["wrote", "writed", "written", "writing"], correct: 2 },
        { text: "The movie was so _____ that I fell asleep.", options: ["bored", "boring", "bore", "to bore"], correct: 1 },
        { text: "I am _____ in learning about space.", options: ["interesting", "interest", "interested", "interests"], correct: 2 },
        { text: "She has _____ three emails this morning.", options: ["wrote", "written", "writing", "write"], correct: 1 },
        { text: "The window _____ yesterday has been repaired.", options: ["breaking", "broke", "broken", "to break"], correct: 2 },
        { text: "The girl _____ near the door is my sister.", options: ["sat", "sitting", "sits", "to sit"], correct: 1 },
        { text: "The exam was very _____, so we were all tired.", options: ["tired", "tiring", "tire", "tires"], correct: 1 },
        { text: "The kids were _____ about the school trip.", options: ["excited", "exciting", "excite", "excites"], correct: 0 },
        { text: "Which sentence uses a present participle as an adjective?", options: ["She is a sleeping baby.", "She slept all day.", "She has slept well.", "She was woken up."], correct: 0 },
        { text: "English is _____ in many countries.", options: ["speak", "spoke", "speaking", "spoken"], correct: 3 }
      ]
    },
    {
      id: "participles-quiz-2",
      short: "Mixed Non-Finite",
      type: "mc",
      title: "Quiz 2 — Mixed Non-Finite Verbs",
      instructions: "Choose the best answer (A, B, C, or D).",
      questions: [
        { text: "I want _____ a new laptop.", options: ["buying", "to buy", "bought", "buy"], correct: 1 },
        { text: "She enjoys _____ pictures of nature.", options: ["to take", "taken", "taking", "take"], correct: 2 },
        { text: "I am _____ because the class is very long.", options: ["bored", "boring", "bore", "to bore"], correct: 0 },
        { text: "You should _____ a doctor about that pain.", options: ["to see", "seeing", "see", "seen"], correct: 2 },
        { text: "He is good at _____ English to children.", options: ["teach", "to teach", "teaching", "taught"], correct: 2 },
        { text: "The report _____ by the manager is on your desk.", options: ["wrote", "writing", "written", "to write"], correct: 2 },
        { text: "We went to the market _____ some vegetables.", options: ["buy", "buying", "to buy", "bought"], correct: 2 },
        { text: "_____ every day improves your English.", options: ["Practice", "To practicing", "Practiced", "Practicing"], correct: 3 },
        { text: "Choose the correct sentence.", options: ["I look forward to see you.", "I look forward to seeing you.", "I look forward seeing you.", "I look forward to saw you."], correct: 1 },
        { text: "In \"Swimming is fun,\" the word \"swimming\" is a _____.", options: ["gerund", "past participle", "bare infinitive", "to-infinitive"], correct: 0 }
      ]
    }
  ];
