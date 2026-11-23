"use strict";
/* Contenido de gramatica: BE GOING TO (tema "Be Going To" del bloque "4. Verb Tenses").
   Se registra en GRAMMAR_CONTENT.begoingto, asi que desbloquea el tema "Be Going To" del menu
   (partials/recursos.html, data-topic="begoingto"). Reglas: am / is / are + going to + base verb;
   planes vs. predicciones con evidencia; be going to vs. will. */

  GRAMMAR_CONTENT.begoingto = {
    label: "Be Going To",
    eyebrowPrefix: "Verb System · Verb Tenses",
    definitionTitle: "Be Going To (Future)",
    definition: "<strong>Be going to</strong> expresses <strong>future plans and intentions</strong> and <strong>predictions based on present evidence</strong>. It is formed with <strong>am / is / are + going to + base verb</strong>.",
    definitionExamples: [
      "I <strong>am going to</strong> study tonight.",
      "She <strong>is going to</strong> travel to Canada.",
      "Look at those clouds! It <strong>is going to</strong> rain.",
      "They <strong>aren't going to</strong> come."
    ],
    modules: [
      {
        title: "Be Going To",
        objectives: [
          "Use be going to for plans, intentions, and evidence-based predictions.",
          "Build affirmative, negative, and interrogative sentences.",
          "Choose between be going to and will."
        ],
        rules: [
          {
            number: 1,
            title: "Purpose and Use",
            desc: "Be going to talks about the <strong>future</strong> when there is a <strong>plan</strong> or <strong>evidence</strong> now.",
            tableHead: ["Use", "Example"],
            table: [
              ["Plan or intention (decided before speaking)", "I'm going to visit my grandparents this weekend."],
              ["Prediction based on evidence you can see", "Be careful! You're going to fall."],
              ["Something about to happen", "The movie is going to start."]
            ]
          },
          {
            number: 2,
            title: "Sentence Structures",
            desc: "Use <strong>am</strong> with I, <strong>is</strong> with he / she / it, and <strong>are</strong> with you / we / they. <em>Going to</em> is followed by the base verb.",
            tableHead: ["Form", "Structure", "Example"],
            table: [
              ["Affirmative", "Subject + am / is / are + going to + verb", "We are going to move next month."],
              ["Negative", "Subject + am / is / are + not + going to + verb", "She isn't going to take the exam."],
              ["Yes/No question", "Am / Is / Are + subject + going to + verb?", "Are you going to call him?"],
              ["Wh- question", "Wh-word + am / is / are + subject + going to + verb?", "What are they going to do?"]
            ]
          },
          {
            number: 3,
            title: "Be Going To vs. Will",
            desc: "Both talk about the future, but the <strong>reason</strong> is different.",
            tableHead: ["Be going to", "Will"],
            table: [
              ["Plan decided before speaking: <em>I'm going to buy a car.</em>", "Decision made at the moment: <em>I'll answer the phone.</em>"],
              ["Prediction with evidence: <em>It's going to rain.</em> (dark clouds)", "Opinion or guess: <em>I think it will rain.</em>"]
            ]
          },
          {
            number: 4,
            title: "Time Expressions and Contractions",
            desc: "Common signal words: <strong>tomorrow, tonight, next week / month / year, soon, in two days</strong>. In informal speech, <em>going to</em> sounds like <strong>gonna</strong>, but we do not write it in formal work.",
            examples: ["I'm = I am, you're, he's, she's, it's, we're, they're", "isn't = is not, aren't = are not", "I'm going to graduate <strong>next year</strong>."]
          }
        ],
        commonMistakes: [
          ["She is going to goes.", "She is going to go."],
          ["They going to travel.", "They are going to travel."],
          ["I going to study.", "I am going to study."],
          ["Do you going to come?", "Are you going to come?"]
        ],
        memoryTipsTitle: "Important Notes — Be Going To",
        memoryTips: [
          "Be going to = <strong>am / is / are + going to + base verb</strong>.",
          "Use it for <strong>plans</strong> and <strong>predictions with evidence</strong>.",
          "Do not forget the verb <strong>be</strong>: <em>She is going to…</em>",
          "The main verb stays in the <strong>base form</strong>."
        ]
      }
    ]
  };

  /* Practice quiz de Be Going To. */
  GRAMMAR_CONTENT.begoingto.practice = [
    {
      id: "begoingto-quiz",
      short: "Be Going To",
      type: "mc",
      title: "Quiz — Be Going To",
      instructions: "Choose the best answer (A, B, C, or D).",
      questions: [
        { text: "I _____ going to study tonight.", options: ["is", "are", "am", "be"], correct: 2, explain: "I + am." },
        { text: "She _____ going to travel to Canada next year.", options: ["am", "is", "are", "do"], correct: 1, explain: "she + is." },
        { text: "Look at the sky! It _____ going to rain.", options: ["am", "is", "are", "will"], correct: 1, explain: "Evidence now: it is going to rain." },
        { text: "They aren't going to _____ to the party.", options: ["come", "comes", "coming", "came"], correct: 0, explain: "Base form after going to." },
        { text: "_____ you going to call him?", options: ["Do", "Are", "Is", "Will"], correct: 1, explain: "Are + you + going to." },
        { text: "Which sentence is correct?", options: ["She going to cook.", "She is going to cooks.", "She is going to cook.", "She does going to cook."], correct: 2, explain: "is + going to + base verb." },
        { text: "What _____ they going to do tomorrow?", options: ["is", "are", "do", "does"], correct: 1, explain: "Wh-word + are + they." },
        { text: "Which sentence shows a plan decided BEFORE speaking?", options: ["The phone is ringing. I'll answer it.", "I'm going to buy a car next month.", "I think it will snow.", "Perhaps she will call."], correct: 1, explain: "Plans use be going to." },
        { text: "The negative of \"He is going to leave\" is _____.", options: ["He doesn't going to leave.", "He isn't going to leave.", "He not is going to leave.", "He isn't going leave."], correct: 1, explain: "is + not + going to + verb." },
        { text: "We _____ going to move next month.", options: ["is", "am", "are", "does"], correct: 2, explain: "we + are." }
      ]
    }
  ];

