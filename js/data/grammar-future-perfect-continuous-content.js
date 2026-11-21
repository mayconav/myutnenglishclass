"use strict";
/* Contenido de gramatica: FUTURE PERFECT CONTINUOUS (guia "The Perfect Continuous Tenses — Present, Past & Future").
   Se registra en GRAMMAR_CONTENT.futureperfectcontinuous, asi que desbloquea el tema
   "Future Perfect Continuous" del menu (partials/recursos.html, data-topic="futureperfectcontinuous").
   Reglas: will have been + verb-ing. Incluye la comparacion de los tres tiempos perfect continuous,
   la regla de clausulas de tiempo futuras, el Quiz 3 y la tabla de autoevaluacion.
   Campos que renderiza js/app/grammar-render.js: ver grammar-verbs-content.js.
   Cada pregunta del quiz puede traer "explain" (explicacion de la clave de respuestas). */

  GRAMMAR_CONTENT.futureperfectcontinuous = {
    label: "Future Perfect Continuous",
    eyebrowPrefix: "Verb System · Verb Tenses",
    definitionTitle: "Future Perfect Continuous",
    definition: "The <strong>Future Perfect Continuous</strong> describes an activity that <strong>will have been happening for a period of time up to a specific future moment</strong>. It is formed with <strong>will have been + verb-ing</strong> and emphasizes how long an activity will have lasted.",
    definitionExamples: [
      "By next year, I <strong>will have been working</strong> here for ten years.",
      "At 8 p.m., she <strong>will have been studying</strong> for five hours.",
      "By December, they <strong>will have been living</strong> in Mexico for three years."
    ],
    modules: [
      {
        title: "Future Perfect Continuous",
        objectives: [
          "Use the future perfect continuous for the duration of an activity up to a future moment.",
          "Build affirmative, negative, and interrogative sentences with will have been + verb-ing.",
          "Use the present simple (not will) in future time clauses.",
          "Compare the three perfect continuous tenses and avoid common mistakes."
        ],
        rules: [
          {
            number: 1,
            title: "Purpose and Use",
            desc: "The Future Perfect Continuous emphasizes the <strong>duration</strong> of an activity up to a future time, how long it will have been happening, and its continuation before a future event.",
            tableHead: ["Use", "Example"],
            table: [
              ["Duration up to a future moment", "By December, I will have been teaching for twenty years.<br>By next month, she will have been working here for five years.<br>By 2030, they will have been living in Mexico for ten years."],
              ["Emphasizing how long", "At 10 p.m., we will have been studying for six hours.<br>By noon, he will have been driving for four hours.<br>At 5 o'clock, she will have been exercising for an hour."],
              ["Predicting duration", "In July, they will have been traveling for three months.<br>Next year, I will have been learning English for five years.<br>By the end of the semester, we will have been studying this subject for four months."],
              ["Asking about future duration", "How long will you have been working here by next year?<br>Will they have been waiting for two hours by the time we arrive?<br>How long will she have been studying when the exam starts?"]
            ]
          },
          {
            number: 2,
            title: "Sentence Structures",
            desc: "<strong>Will have been</strong> is the same for all subjects and is followed by the verb-ing form.",
            tableHead: ["Form", "Structure", "Example"],
            table: [
              ["Affirmative", "Subject + will + have + been + verb-ing + complement", "I will have been studying for four hours.<br>She will have been working here for ten years.<br>They will have been traveling for a month."],
              ["Negative", "Subject + will not (won't) + have + been + verb-ing + complement", "I will not have been working long.<br>She won't have been studying for very long.<br>They won't have been living there for a year."],
              ["Yes/No question", "Will + subject + have + been + verb-ing + complement?", "Will you have been studying?<br>Will she have been working?<br>Will they have been waiting?"],
              ["Wh-question", "Wh-word + will + subject + have + been + verb-ing?", "How long will you have been studying?<br>What will she have been doing?<br>Where will they have been working?"]
            ],
            tip: "Contraction: <strong>will not = won't</strong>."
          },
          {
            number: 3,
            title: "Subject Chart",
            desc: "The structure does not change with the subject.",
            tableHead: ["Subject", "Structure", "Example"],
            table: [
              ["I", "will have been", "I will have been studying."],
              ["You", "will have been", "You will have been working."],
              ["He", "will have been", "He will have been reading."],
              ["She", "will have been", "She will have been exercising."],
              ["We", "will have been", "We will have been practicing."],
              ["They", "will have been", "They will have been waiting."]
            ]
          },
          {
            number: 4,
            title: "Common Time Expressions",
            desc: "Signal words that often go with the future perfect continuous.",
            tableHead: ["Expression", "Example"],
            table: [
              ["by", "by next year"],
              ["by then", "by then"],
              ["by the time", "by the time you arrive"],
              ["for", "for three hours"],
              ["in", "in two months"],
              ["at", "at 8 p.m."]
            ],
            tip: "By next June, I will have been studying for a year. · By the time you arrive, we will have been waiting for an hour. · At 9 p.m., she will have been working for six hours."
          },
          {
            number: 5,
            title: "Important Grammar Rule: Future Time Clauses",
            desc: "In future time clauses beginning with <strong>when, before, after, until, and by the time</strong>, we commonly use the <strong>present simple</strong> rather than <em>will</em>.",
            tableHead: ["", "Sentence"],
            table: [
              ["Correct", "By the time she arrives, I will have been waiting for an hour."],
              ["Incorrect", "By the time she will arrive, I will have been waiting for an hour."]
            ]
          },
          {
            number: 6,
            title: "Future Perfect Continuous vs. Future Perfect Simple",
            desc: "The continuous form focuses on <strong>duration</strong>; the simple form focuses on <strong>completion</strong>.",
            tableHead: ["Future Perfect Continuous", "Future Perfect Simple"],
            table: [
              ["Focuses on duration", "Focuses on completion"],
              ["I will have been working for five hours.", "I will have finished the report."],
              ["She will have been studying for a year.", "She will have completed the course."],
              ["They will have been traveling for a month.", "They will have visited ten countries."]
            ],
            tip: "By 10 a.m., I will have been working for four hours. (<strong>duration</strong>) · By 10 a.m., I will have finished my work. (<strong>completion</strong>) · By next year, she will have been training for two years. (<strong>duration</strong>) · By next year, she will have completed her training. (<strong>completed activity</strong>)"
          },
          {
            number: 7,
            title: "Comparing the Three Perfect Continuous Tenses",
            desc: "Same activity (<strong>studying English</strong>), different reference points.",
            tableHead: ["Tense", "Example", "Meaning"],
            table: [
              ["Present Perfect Continuous", "I have been studying English for three years.", "Up to now"],
              ["Past Perfect Continuous", "In 2023, I had been studying English for three years.", "Up to 2023"],
              ["Future Perfect Continuous", "In 2028, I will have been studying English for three years.", "Up to 2028"]
            ]
          },
          {
            number: 8,
            title: "Timeline Concept",
            desc: "Each tense measures the duration of an activity up to a different reference point.",
            tableHead: ["Tense", "Timeline", "Idea"],
            table: [
              ["Present Perfect Continuous", "Past activity ───────► NOW", "The activity continues or has recently stopped."],
              ["Past Perfect Continuous", "Past activity ───────► PAST EVENT", "Duration before a past reference point."],
              ["Future Perfect Continuous", "Activity begins ───────► FUTURE POINT", "Duration up to a future reference point."]
            ]
          },
          {
            number: 9,
            title: "The Essential Difference",
            desc: "The question tells you which tense to use.",
            tableHead: ["Question", "Tense"],
            table: [
              ["How long have you been doing it?", "Present Perfect Continuous"],
              ["How long had you been doing it?", "Past Perfect Continuous"],
              ["How long will you have been doing it?", "Future Perfect Continuous"]
            ]
          },
          {
            number: 10,
            title: "Self-Assessment",
            desc: "Each quiz has 10 questions. Check your score for each quiz.",
            tableHead: ["Score", "Performance", "Recommendation"],
            table: [
              ["9–10", "Excellent", "You understand the tense very well."],
              ["7–8", "Good", "Review the questions you missed."],
              ["5–6", "Needs improvement", "Review structures and time expressions."],
              ["0–4", "Beginning", "Study the tense again and retake the quiz."]
            ]
          }
        ],
        commonMistakes: [
          ["She will has been studying.", "She will have been studying."],
          ["By the time she will arrive, I will have been waiting for an hour.", "By the time she arrives, I will have been waiting for an hour."]
        ],
        commonMistakesNote: "The future structure is always <em>will + have + been + verb-ing</em>. After <em>by the time</em>, <em>when</em>, <em>before</em>, <em>after</em>, and <em>until</em>, use the present simple.",
        memoryTipsTitle: "Important Notes — Future Perfect Continuous",
        memoryTips: [
          "Future perfect continuous = <strong>will have been + verb-ing</strong> for all subjects. <em>I will have been studying for four hours.</em>",
          "The negative is <strong>won't have been + verb-ing</strong>. <em>They won't have been living there for a year.</em>",
          "In questions, put <strong>Will</strong> before the subject. <em>How long will you have been studying?</em>",
          "Think of a future moment (by, by then, by the time) and count how long the activity will have lasted."
        ]
      }
    ]
  };

  /* Practice quiz: Quiz 3 (Future Perfect Continuous). */
  GRAMMAR_CONTENT.futureperfectcontinuous.practice = [
    {
      id: "perfcont-quiz-3",
      short: "Future Perfect Continuous",
      type: "mc",
      title: "Quiz 3 — Future Perfect Continuous",
      instructions: "Choose the correct answer (A, B, C, or D).",
      questions: [
        { text: "By next May, I _____ here for six years.", options: ["have been working", "had worked", "will have been working", "will be worked"], correct: 2, explain: "Duration up to next May." },
        { text: "At 6 p.m., _____ for three hours.", options: ["we will have been studying", "we had been studying", "we have study", "we will been study"], correct: 0, explain: "Correct future structure." },
        { text: "How long _____ she _____ by the time the meeting ends?", options: ["has / been waiting", "will / have been waiting", "had / wait", "will / been waited"], correct: 1, explain: "Correct question structure." },
        { text: "By 2030, they _____ in this city for a decade.", options: ["will have been living", "have lived yesterday", "had been live", "will has been living"], correct: 0, explain: "Duration up to 2030." },
        { text: "Choose the correct negative form.", options: ["He won't have been working.", "He will haven't been working.", "He won't been working.", "He won't have working."], correct: 0, explain: "Correct negative structure: won't have been + -ing." },
        { text: "By the time you arrive, I _____ for an hour.", options: ["will have been cooking", "had been cooked", "have cook", "will be have cooking"], correct: 0, explain: "Duration up to the arrival." },
        { text: "Which sentence emphasizes duration at a future reference point?", options: ["She will finish the course.", "She will have finished the course.", "She will have been taking the course for two years.", "She takes the course."], correct: 2, explain: "It focuses on duration, not completion." },
        { text: "In August, _____ English for four years.", options: ["I will have been learning", "I had learned", "I have learn", "I will has been learning"], correct: 0, explain: "Duration up to August." },
        { text: "_____ they _____ for long by the time the train comes?", options: ["Have / been waiting", "Will / have been waiting", "Had / waited", "Will / been waiting"], correct: 1, explain: "Correct future question." },
        { text: "By next week, it _____ for several days, if the forecast is right.", options: ["will have been raining", "has been rained", "had rain", "will have rain"], correct: 0, explain: "Future duration prediction." }
      ]
    }
  ];
