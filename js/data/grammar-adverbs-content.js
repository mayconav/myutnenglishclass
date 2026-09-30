"use strict";
/* Contenido de gramatica: ADVERBS ("Adverbs in English — Purpose, Types, Positions,
   Formation, Examples, and Practice Quizzes").
   Se registra en GRAMMAR_CONTENT.adverbs, asi que desbloquea automaticamente el tema
   "Adverbs" del menu (partials/recursos.html, data-topic="adverbs").

   Usa los mismos campos que el tema Verbs (ver js/data/grammar-verbs-content.js):
     rule.tableHead      -> encabezados de tabla
     mod.quickReferenceHead, mod.memoryTipsTitle */

  GRAMMAR_CONTENT.adverbs = {
    label: "Adverbs",
    definitionTitle: "What Is an Adverb?",
    definition: "An adverb is a word that modifies a verb, an adjective, another adverb, or sometimes an entire sentence. It commonly tells us <strong>how</strong>, <strong>when</strong>, <strong>where</strong>, <strong>how often</strong>, <strong>how much</strong>, or <strong>to what degree</strong> something happens.",
    definitionExamples: [
      "She sings <strong>beautifully</strong>.",
      "He is <strong>very</strong> tired.",
      "They arrived <strong>yesterday</strong>.",
      "The children are playing <strong>outside</strong>."
    ],
    modules: [

      /* ---------- 1. Purposes and types of adverbs (guide sections 2-3) ---------- */
      {
        title: "Purposes and Types of Adverbs",
        objectives: [
          "Explain what an adverb is and what questions it answers.",
          "Recognize the main purposes of adverbs: manner, time, place, frequency, degree, and certainty.",
          "Identify the eight types of adverbs in a sentence."
        ],
        rules: [
          {
            number: 1,
            title: "Main Purposes of Adverbs",
            desc: "Each adverb answers a question about the action, the quality, or the situation.",
            tableHead: ["Purpose", "Question", "Example"],
            table: [
              ["Manner", "How?", "She speaks <strong>slowly</strong>."],
              ["Time", "When?", "We arrived <strong>yesterday</strong>."],
              ["Place", "Where?", "Come <strong>here</strong>."],
              ["Frequency", "How often?", "He <strong>usually</strong> studies at night."],
              ["Degree", "How much / to what extent?", "It is <strong>very</strong> cold."],
              ["Certainty / viewpoint", "How certain / from what perspective?", "<strong>Perhaps</strong> he is right."]
            ]
          },
          {
            number: 2,
            title: "Adverbs of Manner",
            desc: "Describe <strong>how</strong> an action happens. Many are formed with <strong>-ly</strong>. Examples: <strong>quickly, slowly, carefully, easily, beautifully, badly</strong>.",
            examples: [
              "She completed the assignment <strong>carefully</strong>."
            ]
          },
          {
            number: 3,
            title: "Adverbs of Time",
            desc: "Tell us <strong>when</strong> an action happens. Examples: <strong>now, today, yesterday, soon, already, recently, later</strong>.",
            examples: [
              "I will call you <strong>later</strong>."
            ]
          },
          {
            number: 4,
            title: "Adverbs of Place",
            desc: "Tell us <strong>where</strong> an action happens. Examples: <strong>here, there, everywhere, outside, inside, upstairs, abroad</strong>.",
            examples: [
              "The students are waiting <strong>outside</strong>."
            ]
          },
          {
            number: 5,
            title: "Adverbs of Frequency",
            desc: "Tell us <strong>how often</strong> something happens. Examples: <strong>always, usually, often, sometimes, rarely, seldom, never</strong>.",
            examples: [
              "She <strong>usually</strong> arrives early."
            ]
          },
          {
            number: 6,
            title: "Adverbs of Degree",
            desc: "Show <strong>intensity or degree</strong>. Examples: <strong>very, really, quite, too, extremely, almost, enough</strong>.",
            examples: [
              "The exam was <strong>extremely</strong> difficult."
            ]
          },
          {
            number: 7,
            title: "Adverbs of Certainty",
            desc: "Express <strong>how certain</strong> the speaker is. Examples: <strong>certainly, definitely, probably, perhaps, maybe, surely</strong>.",
            examples: [
              "They will <strong>probably</strong> come."
            ]
          },
          {
            number: 8,
            title: "Focusing / Limiting Adverbs",
            desc: "Emphasize or limit information. Examples: <strong>only, just, even, also, especially, mainly</strong>.",
            examples: [
              "<strong>Only</strong> Maria answered the question."
            ]
          },
          {
            number: 9,
            title: "Sentence Adverbs",
            desc: "Comment on the <strong>whole sentence</strong> or situation. Examples: <strong>fortunately, unfortunately, clearly, honestly, apparently</strong>.",
            examples: [
              "<strong>Fortunately</strong>, nobody was hurt."
            ]
          }
        ]
      },

      /* ---------- 2. Position of adverbs (guide sections 4-5) ---------- */
      {
        title: "Position of Adverbs",
        objectives: [
          "Place adverbs of frequency correctly with main verbs, with BE, and with auxiliary or modal verbs.",
          "Know where adverbs of manner, place, time, and degree usually go in a sentence."
        ],
        rules: [
          {
            number: 1,
            title: "Adverbs of Frequency: Common Position",
            desc: "The position of a frequency adverb depends on the kind of verb in the sentence.",
            tableHead: ["With…", "Position", "Example"],
            table: [
              ["Most main verbs", "<strong>before</strong> the main verb", "I <strong>usually</strong> study at night. · She <strong>often</strong> visits her grandmother."],
              ["The verb <em>be</em>", "<strong>after</strong> be", "He is <strong>always</strong> late. · They are <strong>never</strong> rude."],
              ["Auxiliary or modal verbs", "<strong>after</strong> the auxiliary/modal, <strong>before</strong> the main verb", "She has <strong>never</strong> seen that movie. · You should <strong>always</strong> check your work."]
            ]
          },
          {
            number: 2,
            title: "Position of Other Adverbs",
            desc: "Other adverbs have their own usual positions.",
            tableHead: ["Type", "Usual position", "Example"],
            table: [
              ["Manner", "often after the verb or object", "She speaks English <strong>fluently</strong>."],
              ["Place", "often after the verb or object", "The students waited <strong>outside</strong>."],
              ["Time", "often at the end or at the beginning", "We met <strong>yesterday</strong>. · <strong>Yesterday</strong>, we met."],
              ["Degree", "normally before the adjective or adverb", "It is <strong>very</strong> interesting. · He runs <strong>extremely</strong> fast."]
            ]
          }
        ]
      },

      /* ---------- 3. Formation, adjective vs. adverb, common mistakes (sections 6-8) ---------- */
      {
        title: "Forming Adverbs, Adjective vs. Adverb, and Common Mistakes",
        objectives: [
          "Form adverbs of manner by adding -ly to an adjective.",
          "Remember the irregular forms: good → well, fast → fast, hard → hard, late → late.",
          "Distinguish an adjective (describes a noun) from an adverb (describes a verb, adjective, or adverb).",
          "Avoid the most common adverb errors made by learners."
        ],
        rules: [
          {
            number: 1,
            title: "How to Form Adverbs",
            desc: "A common way to form an adverb of manner is to add <strong>-ly</strong> to an adjective.",
            tableHead: ["Adjective", "Adverb", "Example"],
            table: [
              ["quick", "quickly", "He works <strong>quickly</strong>."],
              ["careful", "carefully", "She drives <strong>carefully</strong>."],
              ["slow", "slowly", "Please speak <strong>slowly</strong>."],
              ["happy", "happily", "The children played <strong>happily</strong>."],
              ["easy", "easily", "She solved it <strong>easily</strong>."]
            ],
            tip: "Important irregular forms: <strong>good → well</strong>; <strong>fast → fast</strong>; <strong>hard → hard</strong>; <strong>late → late</strong>. Note that <strong>hardly</strong> has a different meaning: it means “almost not”."
          },
          {
            number: 2,
            title: "Adjective vs. Adverb",
            desc: "An <strong>adjective</strong> describes a noun. An <strong>adverb</strong> describes a verb, an adjective, or another adverb.",
            examples: [
              "<em>Adjective:</em> She is a <strong>careful</strong> student.",
              "<em>Adverb:</em> She studies <strong>carefully</strong>.",
              "<em>Compare:</em> He is a <strong>fast</strong> runner. / He runs <strong>fast</strong>."
            ]
          }
        ],
        commonMistakes: [
          ["He runs fastly.", "He runs fast."],
          ["She studies good.", "She studies well."],
          ["He always is late.", "He is always late."],
          ["He works hardly.", "He works hard."],
          ["I haven't seen him late.", "I haven't seen him lately."]
        ],
        commonMistakesNote: "Do not automatically add -ly to every word: <strong>fast</strong> → fast, not “fastly”. Do not confuse <strong>good</strong> and <strong>well</strong>: She is a good student. / She studies well. <strong>Hard</strong> and <strong>hardly</strong> have different meanings: He works hard. / He hardly works. <strong>Late</strong> and <strong>lately</strong> too: He arrived late. / I haven't seen him lately. Remember the position of frequency adverbs: He usually works here, but He is usually busy.",
        quickReferenceHead: ["Type", "Question", "Examples"],
        quickReference: [
          ["Manner", "How?", "quickly, slowly, carefully, easily, beautifully, badly"],
          ["Time", "When?", "now, today, yesterday, soon, already, recently, later"],
          ["Place", "Where?", "here, there, everywhere, outside, inside, upstairs, abroad"],
          ["Frequency", "How often?", "always, usually, often, sometimes, rarely, seldom, never"],
          ["Degree", "How much?", "very, really, quite, too, extremely, almost, enough"],
          ["Certainty", "How certain?", "certainly, definitely, probably, perhaps, maybe, surely"],
          ["Focusing / limiting", "What is emphasized or limited?", "only, just, even, also, especially, mainly"],
          ["Sentence", "What is the comment on the situation?", "fortunately, unfortunately, clearly, honestly, apparently"]
        ],
        memoryTipsTitle: "⭐ Quick Review",
        memoryTips: [
          "Adverbs add information to sentences. Ask: <strong>How?</strong> (manner), <strong>When?</strong> (time), <strong>Where?</strong> (place), <strong>How often?</strong> (frequency), or <strong>How much / to what extent?</strong> (degree).",
          "Learning both <strong>meaning</strong> and <strong>position</strong> is essential for accurate English communication."
        ]
      }
    ]
  };

  /* Practice quizzes for the Adverbs guide (English_Adverbs_Guide_and_Quizzes.pdf).
     Multiple-choice, rendered inside the same tabbed quiz box used for Nouns,
     Adjectives, Pronouns, Conjunctions, Articles and Verbs. */
  GRAMMAR_CONTENT.adverbs.practice = [
    {
      id: "adverbs-quiz-1",
      short: "Type of Adverb",
      type: "mc",
      title: "Quiz 1 — Identify the Type of Adverb",
      instructions: "Choose the type of the adverb in each sentence.",
      questions: [
        { text: "She sings beautifully.", options: ["Time", "Manner", "Place", "Frequency"], correct: 1 },
        { text: "We will meet tomorrow.", options: ["Degree", "Place", "Time", "Manner"], correct: 2 },
        { text: "He always arrives early.", options: ["Frequency", "Place", "Degree", "Manner"], correct: 0 },
        { text: "The children are playing outside.", options: ["Time", "Degree", "Place", "Certainty"], correct: 2 },
        { text: "The movie was extremely interesting.", options: ["Manner", "Degree", "Place", "Frequency"], correct: 1 },
        { text: "Perhaps she is at home.", options: ["Certainty", "Manner", "Time", "Place"], correct: 0 },
        { text: "I rarely eat fast food.", options: ["Degree", "Frequency", "Manner", "Place"], correct: 1 },
        { text: "He answered the question carefully.", options: ["Manner", "Time", "Certainty", "Degree"], correct: 0 },
        { text: "They are waiting here.", options: ["Frequency", "Degree", "Place", "Time"], correct: 2 },
        { text: "She is very tired.", options: ["Manner", "Place", "Degree", "Frequency"], correct: 2 }
      ]
    },
    {
      id: "adverbs-quiz-2",
      short: "Correct Adverb",
      type: "mc",
      title: "Quiz 2 — Choose the Correct Adverb",
      instructions: "Choose the word that best completes each sentence.",
      questions: [
        { text: "Maria speaks English _____.", options: ["fluent", "fluently", "fluency", "more fluent"], correct: 1 },
        { text: "I _____ go to the gym on Mondays.", options: ["usually", "usual", "use", "using"], correct: 0 },
        { text: "The students finished the test _____.", options: ["careful", "carefully", "care", "carefulness"], correct: 1 },
        { text: "He is _____ late for class.", options: ["always", "very", "quickly", "outside"], correct: 0 },
        { text: "Please come _____.", options: ["here", "careful", "happy", "very"], correct: 0 },
        { text: "The exam was _____ difficult.", options: ["extreme", "extremely", "extremity", "extremes"], correct: 1 },
        { text: "She _____ studies at night because she works during the day.", options: ["often", "careful", "outside", "slowly"], correct: 0 },
        { text: "He drives _____.", options: ["safe", "safely", "safety", "safeness"], correct: 1 },
        { text: "They will _____ arrive before noon.", options: ["probably", "probable", "probability", "proper"], correct: 0 },
        { text: "She solved the problem _____.", options: ["easy", "easily", "easier", "easiness"], correct: 1 }
      ]
    }
  ];
