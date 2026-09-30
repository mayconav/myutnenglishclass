"use strict";
/* Contenido de gramatica: PREPOSITIONS ("Prepositions in English — Purpose, Types,
   Rules, Examples, and Practice Quizzes").
   Se registra en GRAMMAR_CONTENT.prepositions, asi que desbloquea automaticamente el
   tema "Prepositions" del menu (partials/recursos.html, data-topic="prepositions").

   Usa los mismos campos que los temas Verbs y Adverbs:
     rule.tableHead      -> encabezados de tabla
     mod.quickReferenceHead, mod.memoryTipsTitle */

  GRAMMAR_CONTENT.prepositions = {
    label: "Prepositions",
    definitionTitle: "What Is a Preposition?",
    definition: "A preposition is a word that shows the relationship between a noun or pronoun and another word in a sentence. It can express relationships of <strong>place</strong>, <strong>time</strong>, <strong>direction</strong>, <strong>movement</strong>, <strong>position</strong>, <strong>cause</strong>, <strong>manner</strong>, <strong>possession</strong>, and other meanings.",
    definitionExamples: [
      "The book is <strong>on</strong> the table.",
      "We study <strong>at</strong> night.",
      "She walked <strong>to</strong> school.",
      "He is interested <strong>in</strong> psychology."
    ],
    modules: [

      /* ---------- 1. Purposes and prepositions of place (guide sections 2-3) ---------- */
      {
        title: "Purposes of Prepositions and Prepositions of Place",
        objectives: [
          "Explain what a preposition is and what kinds of relationships it shows.",
          "Recognize the main purposes of prepositions: place, time, direction, movement, origin, cause, and means.",
          "Use the main prepositions of place correctly: in, on, at, under, above, behind, between, and more."
        ],
        rules: [
          {
            number: 1,
            title: "Main Purposes of Prepositions",
            desc: "Prepositions connect ideas by showing different kinds of relationships.",
            tableHead: ["Purpose", "Common prepositions", "Example"],
            table: [
              ["Place / position", "in, on, at, under, behind, between", "The keys are <strong>on</strong> the table."],
              ["Time", "at, on, in, before, after, during", "We have class <strong>on</strong> Monday."],
              ["Direction", "to, toward, into, onto", "She went <strong>to</strong> the library."],
              ["Movement", "through, across, along, around", "They walked <strong>across</strong> the street."],
              ["Origin / source", "from, out of", "He comes <strong>from</strong> Mexico."],
              ["Cause / reason", "because of, due to", "The game was canceled <strong>because of</strong> rain."],
              ["Instrument / means", "by, with", "I traveled <strong>by</strong> bus."]
            ]
          },
          {
            number: 2,
            title: "Prepositions of Place",
            desc: "Show <strong>where</strong> something is.",
            tableHead: ["Preposition", "Meaning", "Example"],
            table: [
              ["<strong>in</strong>", "inside an area or enclosed space", "The students are <strong>in</strong> the classroom."],
              ["<strong>on</strong>", "on a surface", "The laptop is <strong>on</strong> the desk."],
              ["<strong>at</strong>", "a specific point or location", "She is <strong>at</strong> the university."],
              ["<strong>under</strong>", "below something", "The bag is <strong>under</strong> the chair."],
              ["<strong>above / over</strong>", "higher than something", "The clock is <strong>above</strong> the door."],
              ["<strong>behind</strong>", "at the back of something", "The car is <strong>behind</strong> the building."],
              ["<strong>in front of</strong>", "before or ahead of something", "The teacher is <strong>in front of</strong> the class."],
              ["<strong>between</strong>", "in the space separating two things", "The library is <strong>between</strong> two buildings."],
              ["<strong>next to / beside</strong>", "very close to something", "Sit <strong>next to</strong> me."]
            ]
          }
        ]
      },

      /* ---------- 2. Time, movement and direction (guide sections 4-5) ---------- */
      {
        title: "Prepositions of Time and Movement",
        objectives: [
          "Choose correctly between AT, ON, and IN with time expressions.",
          "Use to, into, onto, from, through, across, and along to describe movement and direction."
        ],
        rules: [
          {
            number: 1,
            title: "Prepositions of Time: AT, ON, IN",
            desc: "Use <strong>at</strong>, <strong>on</strong>, and <strong>in</strong> to say <strong>when</strong> something happens.",
            tableHead: ["Preposition", "Typical use", "Examples"],
            table: [
              ["<strong>AT</strong>", "specific clock times; some fixed expressions", "at 7:00 · at noon · at night"],
              ["<strong>ON</strong>", "days and dates", "on Monday · on July 15 · on my birthday"],
              ["<strong>IN</strong>", "months, years, seasons, longer periods", "in September · in 2026 · in winter · in the morning"]
            ],
            examples: [
              "<em>Compare:</em> <strong>at</strong> 8:00 / <strong>on</strong> Tuesday / <strong>in</strong> September."
            ],
            tip: "A useful pattern: <strong>AT = point</strong>, <strong>ON = day / date</strong>, <strong>IN = longer period</strong>."
          },
          {
            number: 2,
            title: "Prepositions of Movement and Direction",
            desc: "Show <strong>where</strong> something moves from, to, or through.",
            tableHead: ["Preposition", "Meaning", "Example"],
            table: [
              ["<strong>to</strong>", "movement toward a destination", "We went <strong>to</strong> the museum."],
              ["<strong>into</strong>", "movement from outside to inside", "She walked <strong>into</strong> the room."],
              ["<strong>onto</strong>", "movement to a surface", "The cat jumped <strong>onto</strong> the table."],
              ["<strong>from</strong>", "starting point or origin", "He came <strong>from</strong> school."],
              ["<strong>through</strong>", "movement inside and from one side to another", "We walked <strong>through</strong> the park."],
              ["<strong>across</strong>", "movement from one side to another, usually over a surface or area", "They walked <strong>across</strong> the street."],
              ["<strong>along</strong>", "movement following a line or route", "We walked <strong>along</strong> the river."]
            ]
          }
        ]
      },

      /* ---------- 3. Combinations, differences, mistakes, quick reference (sections 6-9) ---------- */
      {
        title: "Preposition Combinations, Key Differences, and Common Mistakes",
        objectives: [
          "Learn common verb, adjective, and noun + preposition combinations as fixed expressions.",
          "Distinguish IN vs. INTO, ON vs. ONTO, and AT vs. IN.",
          "Avoid the most common preposition errors made by learners."
        ],
        rules: [
          {
            number: 1,
            title: "Common Preposition Combinations",
            desc: "Some verbs, adjectives, and nouns are commonly followed by particular prepositions. These combinations should be <strong>learned as expressions</strong>.",
            tableHead: ["Expression", "Example"],
            table: [
              ["<strong>interested in</strong>", "She is interested <strong>in</strong> psychology."],
              ["<strong>good at</strong>", "He is good <strong>at</strong> English."],
              ["<strong>afraid of</strong>", "The child is afraid <strong>of</strong> dogs."],
              ["<strong>depend on</strong>", "It depends <strong>on</strong> the situation."],
              ["<strong>listen to</strong>", "Please listen <strong>to</strong> the teacher."],
              ["<strong>look at</strong>", "Look <strong>at</strong> the board."],
              ["<strong>wait for</strong>", "We are waiting <strong>for</strong> the bus."],
              ["<strong>talk about</strong>", "They talked <strong>about</strong> the project."]
            ]
          },
          {
            number: 2,
            title: "Important Differences",
            desc: "Some pairs of prepositions look similar but are used differently.",
            tableHead: ["Pair", "Difference", "Examples"],
            table: [
              ["<strong>IN vs. INTO</strong>", "<strong>in</strong> describes position; <strong>into</strong> describes movement", "The students are <strong>in</strong> the classroom. · The students walked <strong>into</strong> the classroom."],
              ["<strong>ON vs. ONTO</strong>", "<strong>on</strong> describes position; <strong>onto</strong> describes movement to a surface", "The book is <strong>on</strong> the desk. · She put the book <strong>onto</strong> the desk."],
              ["<strong>AT vs. IN</strong>", "<strong>at</strong> often identifies a point or specific place; <strong>in</strong> often emphasizes being inside an area", "She is <strong>at</strong> the university. · She is <strong>in</strong> the classroom."]
            ]
          }
        ],
        commonMistakes: [
          ["I have class in Monday.", "I have class on Monday."],
          ["The exam is on October.", "The exam is in October."],
          ["The class starts in 8:30.", "The class starts at 8:30."],
          ["Please listen music.", "Please listen to music."],
          ["She arrived at Mexico.", "She arrived in Mexico."]
        ],
        commonMistakesNote: "Use <strong>on</strong> with days and dates (on Monday, on July 10), <strong>in</strong> with months and years (in October, in 2026), and <strong>at</strong> with clock times (at 8:30). Say <em>listen to music</em>, not “listen music”. Use <strong>arrive at</strong> a specific place and <strong>arrive in</strong> a city or country: arrive at school / arrive in Mexico. Do not translate prepositions word-for-word from Spanish; English combinations often need to be learned as fixed expressions.",
        quickReferenceHead: ["Category", "Prepositions"],
        quickReference: [
          ["Place", "in, on, at, under, above, over, behind, beside, between, near, in front of"],
          ["Time", "at, on, in, before, after, during, since, until, for"],
          ["Movement", "to, into, onto, from, through, across, along, around, toward"],
          ["Other relationships", "with, by, about, for, of, without, against, among"]
        ],
        memoryTipsTitle: "⭐ Quick Review",
        memoryTips: [
          "Prepositions connect ideas by showing relationships such as <strong>place</strong>, <strong>time</strong>, <strong>movement</strong>, <strong>direction</strong>, and <strong>cause</strong>.",
          "Pay special attention to <strong>at / on / in</strong>, movement pairs such as <strong>in / into</strong> and <strong>on / onto</strong>, and common verb/adjective + preposition combinations."
        ]
      }
    ]
  };

  /* Practice quizzes for the Prepositions guide (English_Prepositions_Guide_and_Quizzes.pdf).
     Multiple-choice, rendered inside the same tabbed quiz box used for the other topics. */
  GRAMMAR_CONTENT.prepositions.practice = [
    {
      id: "prepositions-quiz-1",
      short: "Correct Preposition",
      type: "mc",
      title: "Quiz 1 — Choose the Correct Preposition",
      instructions: "Choose the preposition that best completes each sentence.",
      questions: [
        { text: "The book is ___ the table.", options: ["at", "on", "in", "to"], correct: 1 },
        { text: "We have English class ___ Monday.", options: ["at", "in", "on", "from"], correct: 2 },
        { text: "The meeting starts ___ 9:00.", options: ["on", "at", "in", "by"], correct: 1 },
        { text: "My family lives ___ Mexico.", options: ["at", "on", "in", "to"], correct: 2 },
        { text: "She walked ___ the classroom.", options: ["into", "at", "on", "by"], correct: 0 },
        { text: "The students are ___ the classroom.", options: ["into", "in", "to", "onto"], correct: 1 },
        { text: "He traveled ___ bus.", options: ["on", "with", "by", "in"], correct: 2 },
        { text: "Please listen ___ the teacher.", options: ["at", "to", "on", "for"], correct: 1 },
        { text: "The pharmacy is ___ the bank and the supermarket.", options: ["between", "into", "through", "during"], correct: 0 },
        { text: "They walked ___ the street.", options: ["at", "across", "in", "on"], correct: 1 }
      ]
    },
    {
      id: "prepositions-quiz-2",
      short: "In Context",
      type: "mc",
      title: "Quiz 2 — Prepositions in Context",
      instructions: "Choose the preposition that best completes each sentence.",
      questions: [
        { text: "She is very good ___ mathematics.", options: ["in", "at", "on", "to"], correct: 1 },
        { text: "We arrived ___ the airport at 6:00.", options: ["at", "in", "on", "into"], correct: 0 },
        { text: "He arrived ___ London yesterday.", options: ["at", "on", "in", "to"], correct: 2 },
        { text: "The students are interested ___ the new project.", options: ["at", "on", "in", "for"], correct: 2 },
        { text: "I have lived here ___ 2020.", options: ["for", "since", "during", "at"], correct: 1 },
        { text: "We studied ___ two hours.", options: ["since", "at", "for", "on"], correct: 2 },
        { text: "The cat jumped ___ the table.", options: ["onto", "at", "from", "during"], correct: 0 },
        { text: "They walked ___ the tunnel.", options: ["across", "through", "on", "at"], correct: 1 },
        { text: "She is afraid ___ spiders.", options: ["with", "about", "of", "from"], correct: 2 },
        { text: "We are waiting ___ the bus.", options: ["for", "to", "at", "in"], correct: 0 }
      ]
    }
  ];
