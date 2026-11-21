"use strict";
/* Contenido de gramatica: PRESENT PERFECT CONTINUOUS (guia "The Perfect Continuous Tenses — Present, Past & Future").
   Se registra en GRAMMAR_CONTENT.presentperfectcontinuous, asi que desbloquea el tema
   "Present Perfect Continuous" del menu (partials/recursos.html, data-topic="presentperfectcontinuous").
   Reglas: have / has + been + verb-ing. Incluye la introduccion a los tres tiempos perfect continuous,
   For vs. Since, comparacion con el Present Perfect Simple y el Quiz 1.
   Campos que renderiza js/app/grammar-render.js: ver grammar-verbs-content.js.
   Cada pregunta del quiz puede traer "explain" (explicacion de la clave de respuestas). */

  GRAMMAR_CONTENT.presentperfectcontinuous = {
    label: "Present Perfect Continuous",
    eyebrowPrefix: "Verb System · Verb Tenses",
    definitionTitle: "Present Perfect Continuous",
    definition: "Perfect continuous tenses describe activities that have been happening over a period of time in relation to a specific reference point. The <strong>Present Perfect Continuous</strong> uses <strong>now</strong> as that point and is formed with <strong>have / has + been + verb-ing</strong>. It emphasizes the <strong>duration</strong> or <strong>process</strong> of an activity, and answers the question <strong>How long...?</strong>",
    definitionExamples: [
      "I <strong>have been studying</strong> English for three years.",
      "She <strong>has been working</strong> all morning.",
      "<strong>How long have</strong> you <strong>been studying</strong>?"
    ],
    modules: [
      {
        title: "Present Perfect Continuous",
        objectives: [
          "Understand the three perfect continuous tenses and the reference point each one uses.",
          "Use the present perfect continuous for activities that continue up to now or have just stopped, with visible results.",
          "Build affirmative, negative, and interrogative sentences with have / has + been + verb-ing.",
          "Choose between for and since, and between the continuous and the simple present perfect."
        ],
        rules: [
          {
            number: 1,
            title: "Introduction: The Three Perfect Continuous Tenses",
            desc: "Perfect continuous tenses emphasize the <strong>duration</strong> of an activity, the <strong>process</strong> of an action, the relationship between an earlier activity and a reference time, and the possible continuation or recent completion of the activity.",
            tableHead: ["Tense", "Reference point", "Main idea"],
            table: [
              ["Present Perfect Continuous", "Now", "Duration up to the present"],
              ["Past Perfect Continuous", "A moment in the past", "Duration before a past moment"],
              ["Future Perfect Continuous", "A moment in the future", "Duration up to a future moment"]
            ],
            tip: "All three tenses are especially useful for answering <strong>How long...?</strong> How long <em>have</em> you been studying? How long <em>had</em> you been studying? How long <em>will</em> you have been studying?"
          },
          {
            number: 2,
            title: "Purpose and Use",
            desc: "The Present Perfect Continuous describes an activity that started in the past and is connected to the present.",
            tableHead: ["Use", "Example"],
            table: [
              ["An activity that started in the past and continues in the present", "I have been teaching English since 2015.<br>She has been living in Mexico for five years.<br>We have been studying for two hours."],
              ["Emphasizing duration (how long it has been happening)", "He has been working all day.<br>They have been waiting for three hours.<br>I have been practicing the piano for a month."],
              ["A recent activity with visible evidence now", "You are sweating. Have you been running?<br>The ground is wet. It has been raining.<br>She looks tired because she has been working."],
              ["Repeated activity over a recent period", "I have been going to the gym lately.<br>They have been visiting us every weekend.<br>She has been calling me all week."]
            ],
            tip: "The activity may have stopped, but its <strong>effects are visible now</strong>. What matters is the process and its duration, not whether it is finished."
          },
          {
            number: 3,
            title: "Sentence Structures",
            desc: "Use <strong>have</strong> with I / you / we / they and <strong>has</strong> with he / she / it. The main verb is always <strong>been + verb-ing</strong>.",
            tableHead: ["Form", "Structure", "Example"],
            table: [
              ["Affirmative", "Subject + have / has + been + verb-ing + complement", "I have been learning English.<br>She has been cooking dinner.<br>We have been working on a project.<br>They have been exercising regularly."],
              ["Negative", "Subject + have / has + not + been + verb-ing + complement", "I haven't been sleeping well.<br>She hasn't been studying lately.<br>They haven't been working efficiently.<br>He hasn't been feeling good."],
              ["Yes/No question", "Have / Has + subject + been + verb-ing + complement?", "Have you been studying?<br>Has she been working?<br>Have they been waiting?<br>Has he been exercising?"],
              ["Wh-question", "Wh-word + have / has + subject + been + verb-ing?", "How long have you been studying?<br>What have you been doing?<br>Where has she been working?<br>Why have they been waiting?"]
            ]
          },
          {
            number: 4,
            title: "Auxiliary by Subject",
            desc: "Choose <strong>have</strong> or <strong>has</strong> according to the subject.",
            tableHead: ["Subject", "Auxiliary", "Example"],
            table: [
              ["I", "have", "I have been studying."],
              ["You", "have", "You have been working."],
              ["He", "has", "He has been studying."],
              ["She", "has", "She has been reading."],
              ["It", "has", "It has been raining."],
              ["We", "have", "We have been learning."],
              ["They", "have", "They have been practicing."]
            ]
          },
          {
            number: 5,
            title: "Common Time Expressions",
            desc: "Signal words that often go with the present perfect continuous.",
            tableHead: ["Expression", "Example"],
            table: [
              ["for", "for two hours"],
              ["since", "since Monday"],
              ["lately / recently", "She hasn't been studying lately."],
              ["all day / all morning", "She has been working all morning."],
              ["How long", "How long have you been working?"]
            ]
          },
          {
            number: 6,
            title: "FOR vs. SINCE",
            desc: "Use <strong>for</strong> with a length of time and <strong>since</strong> with a starting point.",
            tableHead: ["Word", "Meaning", "Examples"],
            table: [
              ["FOR", "Duration", "for two days<br>for five years<br>for an hour<br>for a long time"],
              ["SINCE", "Starting point", "since Monday<br>since 2020<br>since 8 o'clock<br>since January"]
            ],
            tip: "I have been studying <strong>for</strong> three hours. = I have been studying <strong>since</strong> 9 a.m."
          },
          {
            number: 7,
            title: "Present Perfect Continuous vs. Present Perfect Simple",
            desc: "The continuous form focuses on the <strong>process</strong>; the simple form focuses on the <strong>result</strong>.",
            tableHead: ["Present Perfect Continuous", "Present Perfect Simple"],
            table: [
              ["Focuses on the process", "Focuses on the result"],
              ["How long?", "How much? How many?"],
              ["I have been writing.", "I have written."],
              ["She has been reading.", "She has read three books."]
            ],
            tip: "I have been cleaning my room. (focus on the <strong>activity</strong>) · I have cleaned my room. (focus on the <strong>completed result</strong>) · They have been building the house for months. (<strong>duration</strong>) · They have built three houses. (<strong>completed quantity</strong>)"
          }
        ],
        commonMistakes: [
          ["She has working all day.", "She has been working all day."],
          ["They have been worked.", "They have been working."],
          ["He have been studying.", "He has been studying."],
          ["I have been studying since three hours.", "I have been studying for three hours."],
          ["I have been studying for Monday.", "I have been studying since Monday."],
          ["I have been knowing him for ten years.", "I have known him for ten years."]
        ],
        commonMistakesNote: "Do not forget <em>been</em>, use verb-ing after it, and use <em>has</em> with he / she / it. Use <em>for</em> + length of time and <em>since</em> + starting point. Stative verbs (know, believe, understand, love, hate, need, want, own, prefer) are normally not used in continuous forms.",
        memoryTipsTitle: "Important Notes — Present Perfect Continuous",
        memoryTips: [
          "Present perfect continuous = <strong>have / has + been + verb-ing</strong>. <em>I have been studying English for three years.</em>",
          "The negative is <strong>haven't / hasn't been + verb-ing</strong>. <em>She hasn't been studying lately.</em>",
          "In questions, put <strong>Have / Has</strong> before the subject. <em>How long have you been studying?</em>",
          "Think process and duration: How long? for + time, since + starting point."
        ]
      }
    ]
  };

  /* Practice quiz: Quiz 1 (Present Perfect Continuous). */
  GRAMMAR_CONTENT.presentperfectcontinuous.practice = [
    {
      id: "perfcont-quiz-1",
      short: "Present Perfect Continuous",
      type: "mc",
      title: "Quiz 1 — Present Perfect Continuous",
      instructions: "Choose the correct answer (A, B, C, or D).",
      questions: [
        { text: "My brother _____ English online since September.", options: ["studies", "has been studying", "had studied", "will study"], correct: 1, explain: "Started in September and continues." },
        { text: "How long _____ you _____ for the bus?", options: ["have / been waiting", "did / waiting", "has / wait", "are / waited"], correct: 0, explain: "Correct question structure: have + subject + been + -ing." },
        { text: "She is exhausted because she _____ all morning.", options: ["had worked", "will work", "has been working", "works"], correct: 2, explain: "A recent activity explains the present exhaustion." },
        { text: "We _____ the project for two weeks, and it is not finished yet.", options: ["have been developing", "had developed", "will develop", "develop"], correct: 0, explain: "Duration and unfinished activity." },
        { text: "Choose the correct negative form.", options: ["He hasn't been sleeping well.", "He haven't been sleeping well.", "He hasn't sleeping well.", "He hasn't been slept well."], correct: 0, explain: "Correct negative structure: hasn't + been + -ing." },
        { text: "_____ it _____ raining? The streets are wet.", options: ["Did / been", "Has / been", "Have / be", "Was / being"], correct: 1, explain: "Has + subject + been + verb-ing." },
        { text: "I _____ her for ten years. (Use the normal form with this stative verb.)", options: ["have been knowing", "has known", "have known", "had been know"], correct: 2, explain: "Know is normally a stative verb, so it is not used in the continuous form." },
        { text: "They _____ football every weekend lately.", options: ["have been playing", "had playing", "has played", "will have play"], correct: 0, explain: "A recent repeated activity." },
        { text: "Which sentence emphasizes the activity rather than the completed result?", options: ["I have finished the essay.", "I have written five pages.", "I have been writing the essay.", "I wrote the essay yesterday."], correct: 2, explain: "It focuses on the process of writing." },
        { text: "He _____ at this company since 2021.", options: ["has been working", "have been working", "had working", "will been working"], correct: 0, explain: "He → has; duration since 2021." }
      ]
    }
  ];
