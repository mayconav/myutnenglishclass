"use strict";
/* Contenido de gramatica: PRESENT CONTINUOUS (guia "The Continuous Tenses — A2–B1 Grammar Guide").
   Se registra en GRAMMAR_CONTENT.presentcontinuous, asi que desbloquea el tema
   "Present Continuous" del menu (partials/recursos.html, data-topic="presentcontinuous").
   Reglas: am/is/are + verb-ing, reglas de ortografia -ing y verbos estativos.
   Campos que renderiza js/app/grammar-render.js: ver grammar-verbs-content.js. */

  GRAMMAR_CONTENT.presentcontinuous = {
    label: "Present Continuous",
    eyebrowPrefix: "Verb System · Verb Tenses",
    definitionTitle: "Present Continuous",
    definition: "Continuous (also called progressive) tenses describe actions or situations viewed as being <strong>in progress</strong> around a particular time. They are formed with a form of the verb <strong>BE + the -ing form</strong> of the main verb. The <strong>Present Continuous</strong> describes actions happening now and temporary situations around the present.",
    definitionExamples: [
      "I <strong>study</strong> English every day. (routine)",
      "I <strong>am studying</strong> English now. (action in progress)",
      "She <strong>is talking</strong> to her teacher.",
      "Technology <strong>is changing</strong> quickly."
    ],
    modules: [
      {
        title: "Present Continuous",
        objectives: [
          "Use the present continuous for actions happening now, temporary situations, changing situations, and near-future arrangements.",
          "Build affirmative, negative, and interrogative sentences with am / is / are + verb-ing.",
          "Apply the spelling rules for the -ing form.",
          "Recognize stative verbs that are not normally used in continuous forms."
        ],
        rules: [
          {
            number: 1,
            title: "Purpose and Use",
            desc: "The Present Continuous shows that an action or situation is <strong>in progress</strong> around the present moment.",
            tableHead: ["Use", "Example"],
            table: [
              ["Actions happening now", "She is talking to her teacher."],
              ["Temporary situations around the present", "I am working on a new project this week."],
              ["Changing or developing situations", "Technology is changing quickly."],
              ["Arrangements in the near future (often with a time expression)", "We are meeting the tutor tomorrow."]
            ]
          },
          {
            number: 2,
            title: "Sentence Structures",
            desc: "Basic pattern: <strong>subject + BE + verb-ing</strong>. In the present, BE is <strong>am / is / are</strong> according to the subject.",
            tableHead: ["Form", "Structure", "Example"],
            table: [
              ["Affirmative", "Subject + am/is/are + verb-ing", "He is studying.<br>I am preparing a presentation.<br>They are installing new software."],
              ["Negative", "Subject + am/is/are + not + verb-ing", "He is not studying.<br>She isn't listening.<br>We aren't using the computer."],
              ["Yes/No question", "Am/Is/Are + subject + verb-ing?", "Is he studying?<br>Are you waiting for the bus?"],
              ["Wh-question", "Wh-word + am/is/are + subject + verb-ing?", "What is he studying?<br>Why is the server restarting?"]
            ]
          },
          {
            number: 3,
            title: "Common Time Expressions",
            desc: "Signal words that often go with the present continuous.",
            tableHead: ["Time expressions", "Example"],
            table: [
              ["now, right now, at the moment", "I am using my laptop right now."],
              ["currently, today, this week, these days", "The students are preparing a project this week."],
              ["Look! / Listen!", "Look! The baby is crying."]
            ]
          },
          {
            number: 4,
            title: "Spelling Rules for -ing",
            desc: "These rules apply to all the continuous tenses.",
            tableHead: ["Rule", "Example"],
            table: [
              ["Most verbs: add -ing", "work → working; read → reading"],
              ["Verbs ending in silent -e: remove -e and add -ing", "make → making; write → writing"],
              ["Short consonant-vowel-consonant verbs: double the final consonant", "sit → sitting; run → running"],
              ["Verbs ending in -ie: change -ie to -y", "lie → lying; die → dying"],
              ["Do not double final w, x, or y", "snow → snowing; fix → fixing; play → playing"]
            ]
          },
          {
            number: 5,
            title: "Stative Verbs: An Important Exception",
            desc: "Some verbs usually describe <strong>states</strong>, not actions, and are not normally used in continuous forms: <strong>know, believe, understand, want, need, prefer, own, belong, seem</strong>.",
            examples: [
              "I <strong>understand</strong> the lesson. (not usually <em>I am understanding</em>)",
              "I <strong>think</strong> you are right. (opinion)",
              "I <strong>am thinking</strong> about the problem. (mental activity)"
            ],
            tip: "Some verbs can be continuous when their meaning changes: <strong>think</strong> as an opinion is a state, but <strong>think</strong> as mental activity can be continuous."
          }
        ],
        commonMistakes: [
          ["She is study.", "She is studying."],
          ["He doesn't working.", "He isn't working."],
          ["I am understanding the lesson.", "I understand the lesson."]
        ],
        memoryTipsTitle: "📌 Important Notes — Present Continuous",
        memoryTips: [
          "Continuous = <strong>BE + verb-ing</strong>. Do not omit BE. <em>She is studying.</em>",
          "Use <strong>am</strong> with I, <strong>is</strong> with he / she / it, and <strong>are</strong> with you / we / they.",
          "The negative uses <strong>am not / isn't / aren't</strong>, never don't / doesn't. <em>He isn't working.</em>",
          "In questions, put <strong>Am / Is / Are</strong> before the subject. <em>Are you waiting for the bus?</em>"
        ]
      }
    ]
  };

  /* Practice quiz de Present Continuous (answer key de la guia original). */
  GRAMMAR_CONTENT.presentcontinuous.practice = [
    {
      id: "continuous-quiz-1",
      short: "Present Continuous",
      type: "mc",
      title: "Quiz 1 — Present Continuous",
      instructions: "Choose the best answer (A, B, C, or D).",
      questions: [
        { text: "Look! The baby _____.", options: ["cries","is crying","cry","crying"], correct: 1 },
        { text: "We _____ English at the moment.", options: ["are studying","is studying","study","studied"], correct: 0 },
        { text: "She _____ dinner right now.", options: ["cook","cooks","is cooking","cooking"], correct: 2 },
        { text: "_____ they waiting for the bus?", options: ["Is","Do","Are","Does"], correct: 2 },
        { text: "I _____ using my laptop now.", options: ["am not","isn't","don't","not am"], correct: 0 },
        { text: "What _____ he doing?", options: ["are","is","does","do"], correct: 1 },
        { text: "The students _____ a project this week.", options: ["are preparing","prepares","is preparing","prepared"], correct: 0 },
        { text: "My father _____ TV at the moment.", options: ["watch","watching","is watching","watches"], correct: 2 },
        { text: "Choose the correct sentence.", options: ["She are reading.","She is read.","She reading.","She is reading."], correct: 3 },
        { text: "They _____ not listening to the instructions.", options: ["am","is","are","be"], correct: 2 }
      ]
    }
  ];
