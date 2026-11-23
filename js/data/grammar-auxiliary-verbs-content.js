"use strict";
/* Contenido de gramatica: AUXILIARY VERBS (bloque "2. Auxiliary Verbs" de Verb System).
   Registra 3 temas en GRAMMAR_CONTENT: auxbe (Be), auxhave (Have), auxdo (Do), asi que desbloquean los
   temas "Be", "Have" y "Do" del menu (partials/recursos.html, atributo data-topic). */

  GRAMMAR_CONTENT.auxbe = {
    label: "Be",
    eyebrowPrefix: "Verb System · Auxiliary Verbs",
    definitionTitle: "The Verb Be",
    definition: "<strong>Be</strong> is the most important verb in English. It can be a <strong>main verb</strong> (to describe or identify) and an <strong>auxiliary verb</strong> (to form continuous tenses and the passive voice).",
    definitionExamples: [
      "She <strong>is</strong> a teacher. (main verb)",
      "She <strong>is</strong> teaching now. (continuous)",
      "The book <strong>was</strong> written in 1990. (passive)",
      "They <strong>were</strong> at home."
    ],
    modules: [
      {
        title: "Be",
        objectives: ["Conjugate be in the present and the past.", "Use be as a main verb and as an auxiliary.", "Make negatives, questions, and contractions with be."],
        rules: [
          {
            number: 1,
            title: "Forms of Be",
            desc: "Be has irregular forms: <strong>am / is / are</strong> (present), <strong>was / were</strong> (past), <strong>been</strong> (past participle), <strong>being</strong> (-ing form).",
            tableHead: ["Subject", "Present", "Past"],
            table: [
              ["I", "am", "was"],
              ["he / she / it", "is", "was"],
              ["you / we / they", "are", "were"]
            ]
          },
          {
            number: 2,
            title: "Roles of Be",
            desc: "Be can have three different functions.",
            tableHead: ["Function", "Structure", "Example"],
            table: [
              ["Main verb", "Subject + be + noun / adjective / place", "He is a doctor.<br>We are tired.<br>They are at home."],
              ["Continuous tenses", "Subject + be + verb-ing", "I am studying.<br>They were playing."],
              ["Passive voice", "Subject + be + past participle", "The room is cleaned daily.<br>The email was sent."]
            ]
          },
          {
            number: 3,
            title: "Negative, Questions and Contractions",
            desc: "Be does <strong>not</strong> use do / does / did. For the negative add <strong>not</strong>; for questions put be <strong>before the subject</strong>.",
            tableHead: ["Form", "Example"],
            table: [
              ["Negative", "She is not (isn't) late.<br>They were not (weren't) here."],
              ["Question", "Is she late?<br>Were they here?"],
              ["Wh- question", "Where are you from?<br>Why was he absent?"],
              ["Short contractions", "I'm, you're, he's, she's, it's, we're, they're"]
            ]
          }
        ],
        commonMistakes: [
          ["She be a teacher.", "She is a teacher."],
          ["They is students.", "They are students."],
          ["I am agree.", "I agree."],
          ["Do you are tired?", "Are you tired?"]
        ],
        memoryTipsTitle: "Important Notes — Be",
        memoryTips: [
          "Be: <strong>am / is / are</strong> (present), <strong>was / were</strong> (past).",
          "As an auxiliary: <strong>be + verb-ing</strong> (continuous), <strong>be + past participle</strong> (passive).",
          "Never use <em>do / does / did</em> with be: <em>Are you ready?</em>",
          "Use <em>I agree</em>, not <em>I am agree</em>."
        ]
      }
    ]
  };

  /* Practice quiz de Be. */
  GRAMMAR_CONTENT.auxbe.practice = [
    {
      id: "auxbe-quiz",
      short: "Be",
      type: "mc",
      title: "Quiz — Be",
      instructions: "Choose the best answer (A, B, C, or D).",
      questions: [
        { text: "She _____ a student at UTN.", options: ["am", "is", "are", "be"], correct: 1, explain: "she + is." },
        { text: "They _____ at the library yesterday.", options: ["was", "is", "were", "are"], correct: 2, explain: "they + were (past)." },
        { text: "_____ you ready for the exam?", options: ["Do", "Are", "Does", "Is"], correct: 1, explain: "Questions with be use inversion." },
        { text: "I _____ studying right now.", options: ["is", "are", "am", "be"], correct: 2, explain: "I + am + verb-ing." },
        { text: "The email _____ sent yesterday. (passive)", options: ["is", "was", "are", "were"], correct: 1, explain: "Singular subject, past passive: was sent." },
        { text: "Which sentence is correct?", options: ["He don't be late.", "He isn't late.", "He doesn't is late.", "He not is late."], correct: 1, explain: "Negative: be + not." },
        { text: "We _____ not at home last night.", options: ["was", "is", "were", "be"], correct: 2, explain: "we + were not." },
        { text: "Which sentence is correct?", options: ["I am agree.", "I agree.", "I agree am.", "I be agree."], correct: 1, explain: "\"Agree\" is a verb; no \"be\" is needed." }
      ]
    }
  ];

  GRAMMAR_CONTENT.auxhave = {
    label: "Have",
    eyebrowPrefix: "Verb System · Auxiliary Verbs",
    definitionTitle: "The Verb Have",
    definition: "<strong>Have</strong> can be a <strong>main verb</strong> (possession, experiences, activities) and an <strong>auxiliary verb</strong> used to form the <strong>perfect tenses</strong>.",
    definitionExamples: [
      "I <strong>have</strong> a laptop. (main verb)",
      "She <strong>has</strong> a shower every morning.",
      "We <strong>have finished</strong> the project. (auxiliary)",
      "They <strong>had left</strong> before I arrived."
    ],
    modules: [
      {
        title: "Have",
        objectives: ["Conjugate have (have / has / had).", "Use have as a main verb and as an auxiliary.", "Make negatives and questions in both uses."],
        rules: [
          {
            number: 1,
            title: "Forms of Have",
            desc: "Have is irregular in the third person singular: <strong>has</strong>. The past is <strong>had</strong>; the -ing form is <strong>having</strong>.",
            tableHead: ["Subject", "Present", "Past"],
            table: [
              ["I / you / we / they", "have", "had"],
              ["he / she / it", "has", "had"]
            ]
          },
          {
            number: 2,
            title: "Have as a Main Verb",
            desc: "It expresses possession, relationships, illnesses, and activities (<em>have breakfast, have a shower, have a party</em>).",
            tableHead: ["Form", "Example"],
            table: [
              ["Affirmative", "She has two brothers."],
              ["Negative", "She doesn't have a car.<br>They didn't have time."],
              ["Question", "Do you have a pen?<br>Did he have a good day?"]
            ],
            tip: "As a main verb, <strong>have</strong> uses <em>do / does / did</em> for questions and negatives. Possession can also be <em>have got</em> (<em>I've got a pen</em>)."
          },
          {
            number: 3,
            title: "Have as an Auxiliary",
            desc: "With a <strong>past participle</strong> it forms the perfect tenses.",
            tableHead: ["Tense", "Structure", "Example"],
            table: [
              ["Present perfect", "have / has + past participle", "I have finished. She has arrived."],
              ["Past perfect", "had + past participle", "They had left before I came."],
              ["Negative / question", "haven't, hasn't, hadn't / Have you…?", "We haven't eaten.<br>Has he called?"]
            ]
          }
        ],
        commonMistakes: [
          ["She have finished.", "She has finished."],
          ["I has a car.", "I have a car."],
          ["I have went home.", "I have gone home."],
          ["Does she has a car?", "Does she have a car?"]
        ],
        memoryTipsTitle: "Important Notes — Have",
        memoryTips: [
          "<strong>Has</strong> is used with he / she / it; <strong>have</strong> with I / you / we / they.",
          "Auxiliary have + <strong>past participle</strong> = perfect tenses.",
          "Main verb have uses <strong>do / does / did</strong> in questions and negatives.",
          "After <em>does / did</em> use the base form: <em>Does she have…?</em>"
        ]
      }
    ]
  };

  /* Practice quiz de Have. */
  GRAMMAR_CONTENT.auxhave.practice = [
    {
      id: "auxhave-quiz",
      short: "Have",
      type: "mc",
      title: "Quiz — Have",
      instructions: "Choose the best answer (A, B, C, or D).",
      questions: [
        { text: "She _____ two brothers.", options: ["have", "has", "having", "haves"], correct: 1, explain: "she + has." },
        { text: "We _____ finished the project.", options: ["has", "have", "had to", "are"], correct: 1, explain: "we + have + past participle." },
        { text: "Which sentence is correct?", options: ["She haves a car.", "She has a car.", "She have a car.", "She is have a car."], correct: 1, explain: "Third person: has." },
        { text: "_____ you have a pen?", options: ["Have", "Do", "Are", "Has"], correct: 1, explain: "Main verb have uses do-support." },
        { text: "They _____ left before I arrived.", options: ["have", "has", "had", "having"], correct: 2, explain: "Past perfect: had + past participle." },
        { text: "He doesn't _____ a car.", options: ["has", "have", "having", "had"], correct: 1, explain: "After doesn't use the base form." },
        { text: "I have _____ my homework.", options: ["do", "did", "done", "doing"], correct: 2, explain: "Have + past participle." },
        { text: "She _____ not arrived yet.", options: ["have", "has", "is", "does"], correct: 1, explain: "Present perfect with she: has not arrived." }
      ]
    }
  ];

  GRAMMAR_CONTENT.auxdo = {
    label: "Do",
    eyebrowPrefix: "Verb System · Auxiliary Verbs",
    definitionTitle: "The Verb Do",
    definition: "<strong>Do</strong> can be a <strong>main verb</strong> (<em>do homework</em>) and an <strong>auxiliary verb</strong> that helps us make <strong>questions</strong> and <strong>negatives</strong> in the present simple and past simple. This is called <strong>do-support</strong>.",
    definitionExamples: [
      "I <strong>do</strong> my homework at night. (main verb)",
      "<strong>Do</strong> you like coffee? (question)",
      "She <strong>doesn't</strong> work here. (negative)",
      "They <strong>didn't</strong> go to the party."
    ],
    modules: [
      {
        title: "Do",
        objectives: ["Use do / does / did as an auxiliary.", "Remember that the main verb stays in the base form.", "Know when NOT to use do-support."],
        rules: [
          {
            number: 1,
            title: "Forms of Do",
            desc: "The auxiliary changes with the tense and the subject.",
            tableHead: ["Subject", "Present", "Past"],
            table: [
              ["I / you / we / they", "do / don't", "did / didn't"],
              ["he / she / it", "does / doesn't", "did / didn't"]
            ]
          },
          {
            number: 2,
            title: "Do-Support: Questions and Negatives",
            desc: "Use <strong>do / does / did + base verb</strong>. The auxiliary carries the tense, so the main verb has no -s or -ed.",
            tableHead: ["Form", "Structure", "Example"],
            table: [
              ["Question", "Do / Does / Did + subject + base verb?", "Do you work here?<br>Does she like tea?<br>Did they win?"],
              ["Negative", "Subject + don't / doesn't / didn't + base verb", "I don't know.<br>He doesn't eat meat.<br>We didn't go."],
              ["Short answers", "Yes, I do. / No, she doesn't. / Yes, they did.", "Do you smoke? No, I don't."]
            ]
          },
          {
            number: 3,
            title: "Other Uses and Limits",
            desc: "Do can also be a main verb or add emphasis. Do <strong>not</strong> use do-support with <strong>be</strong> or with <strong>modal verbs</strong>.",
            examples: [
              "Main verb: She <strong>does</strong> exercise every day.",
              "Emphasis: I <strong>do</strong> like your idea!",
              "✗ Do you can swim? → ✓ <strong>Can</strong> you swim?",
              "✗ Do you be tired? → ✓ <strong>Are</strong> you tired?"
            ]
          }
        ],
        commonMistakes: [
          ["Does she likes pizza?", "Does she like pizza?"],
          ["I didn't went to class.", "I didn't go to class."],
          ["She don't know.", "She doesn't know."],
          ["Do you can swim?", "Can you swim?"]
        ],
        memoryTipsTitle: "Important Notes — Do",
        memoryTips: [
          "Do-support: <strong>do / does / did + base verb</strong>.",
          "After does / did the main verb is <strong>never</strong> -s or -ed.",
          "Use <strong>does</strong> with he / she / it in the present.",
          "No do-support with <strong>be</strong> or <strong>modals</strong>."
        ]
      }
    ]
  };

  /* Practice quiz de Do. */
  GRAMMAR_CONTENT.auxdo.practice = [
    {
      id: "auxdo-quiz",
      short: "Do",
      type: "mc",
      title: "Quiz — Do",
      instructions: "Choose the best answer (A, B, C, or D).",
      questions: [
        { text: "_____ she like coffee?", options: ["Do", "Does", "Is", "Are"], correct: 1, explain: "she + does." },
        { text: "I _____ know the answer.", options: ["doesn't", "don't", "isn't", "not"], correct: 1, explain: "I + don't." },
        { text: "They didn't _____ to the party.", options: ["went", "go", "goes", "going"], correct: 1, explain: "After didn't use the base form." },
        { text: "Which sentence is correct?", options: ["Does he works here?", "Does he work here?", "Do he work here?", "Does he working here?"], correct: 1, explain: "Does + base verb." },
        { text: "Which sentence is correct?", options: ["Do you can swim?", "Can you swim?", "Do you able swim?", "Does you can swim?"], correct: 1, explain: "No do-support with modals." },
        { text: "Yesterday she _____ her homework. (main verb)", options: ["do", "does", "did", "done"], correct: 2, explain: "Past simple of do." },
        { text: "_____ you ready? (be)", options: ["Do", "Does", "Did", "Are"], correct: 3, explain: "No do-support with be." },
        { text: "Complete: \"Do they live here?\" — \"Yes, they _____.\"", options: ["live", "does", "do", "did"], correct: 2, explain: "Short answer: Yes, they do." }
      ]
    }
  ];

