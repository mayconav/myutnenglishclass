"use strict";
/* Contenido de gramatica: SIMPLE TENSES ("The Three Simple Tenses — A2 Grammar Guide").
   Se registra en GRAMMAR_CONTENT.simpletenses, asi que desbloquea el tema
   "Simple Tenses" del menu (partials/recursos.html, data-topic="simpletenses").

   Correccion respecto al PDF original: las "Important notes" de Present y Past
   repetian las de Future (will). Aqui cada tiempo tiene sus propias reglas:
     Present -> base verb (+s/es con he/she/it), don't / doesn't, Do / Does
     Past    -> misma forma pasada para todas las personas, did not, Did
     Future  -> will + base verb, will not / won't, Will

   Campos que renderiza js/app/grammar-render.js: ver grammar-verbs-content.js. */

  GRAMMAR_CONTENT.simpletenses = {
    label: "Simple Tenses",
    eyebrowPrefix: "Verb System · Verb Tenses",
    definitionTitle: "The Three Simple Tenses",
    definition: "The three simple tenses — <strong>Present</strong>, <strong>Past</strong>, and <strong>Future</strong> — are the foundation of English verb use. In this A2 guide you will identify the purpose of each tense, build affirmative, negative, and interrogative sentences, and choose the correct verb forms in everyday and academic contexts.",
    definitionExamples: [
      "She <strong>studies</strong> English every day.",
      "We <strong>visited</strong> the museum yesterday.",
      "I <strong>will study</strong> for the exam tomorrow."
    ],
    modules: [

      /* ---------- UNIT 1 — SIMPLE PRESENT ---------- */
      {
        title: "Unit 1 — Simple Present Tense",
        objectives: [
          "Use the simple present for habits, routines, facts, and schedules.",
          "Build affirmative, negative, and interrogative sentences with do / does.",
          "Use the base form of the verb after do / does and add -s / -es with he, she, it."
        ],
        rules: [
          {
            number: 1,
            title: "Purpose and Use",
            desc: "The Simple Present describes habits, routines, facts, and situations that are generally or regularly true. It does not usually describe an action happening at this exact moment.",
            tableHead: ["Use", "Example"],
            table: [
              ["Daily routines and habits", "I get up at 7:00 a.m."],
              ["Facts and general truths", "Water boils at 100°C."],
              ["Permanent or regular situations", "She lives in Mexico."],
              ["Schedules and timetables", "The class starts at 9:00 a.m."]
            ]
          },
          {
            number: 2,
            title: "Sentence Structures",
            desc: "Use the <strong>base verb</strong> for I, you, we, they. With he, she, it add <strong>-s / -es</strong>. In negatives and questions, the auxiliary <strong>do / does</strong> is used with the base verb.",
            tableHead: ["Form", "Structure", "Example"],
            table: [
              ["Affirmative", "Subject + base verb (+ -s/-es with he, she, it) + complement.", "She studies English every day."],
              ["Negative", "Subject + do / does + not + base verb + complement.", "They do not (don't) work on Sundays."],
              ["Interrogative", "Do / Does + subject + base verb + complement + ?", "Does he play soccer?"]
            ]
          },
          {
            number: 3,
            title: "Do / Does — Which One?",
            desc: "Choose the auxiliary according to the subject. The main verb always stays in the <strong>base form</strong>.",
            tableHead: ["Subject", "Negative", "Question"],
            table: [
              ["I / You / We / They", "don't (do not) + base verb<br><em>They don't drink coffee.</em>", "Do + subject + base verb?<br><em>Do you study?</em>"],
              ["He / She / It", "doesn't (does not) + base verb<br><em>She doesn't study French.</em>", "Does + subject + base verb?<br><em>Does he play soccer?</em>"]
            ],
            tip: "After <strong>do / does</strong> the main verb never takes -s: <em>Does he <strong>work</strong> here?</em> (not “Does he works”)."
          }
        ],
        commonMistakes: [
          ["She don't study French.", "She doesn't study French."],
          ["Does he works here?", "Does he work here?"],
          ["They studies together.", "They study together."],
          ["Maria watch TV at night.", "Maria watches TV at night."]
        ],
        memoryTipsTitle: "📌 Important Notes — Simple Present",
        memoryTips: [
          "Use the <strong>base form</strong> of the verb with I, you, we, they. <em>I study. They work.</em>",
          "With he, she, it add <strong>-s / -es</strong>. <em>She studies. He watches.</em>",
          "The negative uses <strong>don't</strong> (I, you, we, they) or <strong>doesn't</strong> (he, she, it) + base verb. <em>I don't like cold weather.</em>",
          "In questions, put <strong>Do / Does</strong> before the subject. <em>Do you study? Does he play soccer?</em>",
          "After do / does, always use the <strong>base form</strong>. There is no <em>will</em> in the simple present."
        ]
      },

      /* ---------- UNIT 2 — SIMPLE PAST ---------- */
      {
        title: "Unit 2 — Simple Past Tense",
        objectives: [
          "Use the simple past for completed actions and past events with a finished time.",
          "Write the past form of the verb, which is the same for all subjects.",
          "Build negatives with did not and questions with Did + base verb."
        ],
        rules: [
          {
            number: 1,
            title: "Purpose and Use",
            desc: "The Simple Past describes actions or events that started and finished at a specific time in the past. The time may be stated or understood from the context.",
            tableHead: ["Use", "Example"],
            table: [
              ["Completed actions", "I watched a movie last night."],
              ["Past events in a sequence", "She arrived, opened the door, and sat down."],
              ["Past habits or situations", "We played outside when we were children."],
              ["Past experiences with a finished time reference", "They visited Oaxaca in 2024."]
            ]
          },
          {
            number: 2,
            title: "Sentence Structures",
            desc: "In affirmative sentences, write the <strong>past form</strong> of the verb. It is the <strong>same for all persons</strong> (I, you, he, she, it, we, they). In negatives and questions, use <strong>did</strong> + the base verb.",
            tableHead: ["Form", "Structure", "Example"],
            table: [
              ["Affirmative", "Subject + past form of the verb + complement.", "We visited the museum yesterday."],
              ["Negative", "Subject + did + not + base verb + complement.", "He did not (didn't) study last night."],
              ["Interrogative", "Did + subject + base verb + complement + ?", "Did you finish the project?"]
            ]
          },
          {
            number: 3,
            title: "Same Form for All Persons",
            desc: "The past form does not change with the subject, and the auxiliary is always <strong>did</strong> (never does / do).",
            tableHead: ["Form", "Example"],
            table: [
              ["Affirmative", "I / you / he / she / it / we / they <strong>studied</strong>."],
              ["Negative", "I / you / he / she / it / we / they <strong>did not (didn't) study</strong>."],
              ["Interrogative", "<strong>Did</strong> I / you / he / she / it / we / they <strong>study</strong>?"]
            ],
            tip: "Regular verbs add <strong>-ed</strong> (visit → visited). Irregular verbs have their own past form (go → went, have → had, lose → lost)."
          }
        ],
        commonMistakes: [
          ["Did she went home?", "Did she go home?"],
          ["They didn't watched TV.", "They didn't watch TV."],
          ["I studyed yesterday.", "I studied yesterday."],
          ["He does not study last night.", "He did not study last night."]
        ],
        memoryTipsTitle: "📌 Important Notes — Simple Past",
        memoryTips: [
          "In affirmative sentences write the <strong>past form</strong> of the verb for <strong>all persons</strong>. <em>She studied. They studied.</em>",
          "The negative is <strong>did not (didn't)</strong> + base verb, for all persons. <em>He didn't study last night.</em>",
          "In questions, put <strong>Did</strong> before the subject + base verb. <em>Did he study? Did you call your friend?</em>",
          "After did / didn't, the main verb returns to the <strong>base form</strong>. <em>Did she go?</em> (not “Did she went”)",
          "There is no <em>will</em> and no <em>does</em> in the simple past."
        ]
      },

      /* ---------- UNIT 3 — SIMPLE FUTURE (WILL) ---------- */
      {
        title: "Unit 3 — Simple Future Tense (will)",
        objectives: [
          "Use will for predictions, promises, offers, spontaneous decisions, and future expectations.",
          "Build affirmative, negative, and interrogative sentences with will.",
          "Use the base form of the verb after will for all subjects."
        ],
        rules: [
          {
            number: 1,
            title: "Purpose and Use",
            desc: "The Simple Future with <strong>will</strong> is used to talk about future actions, predictions, promises, offers, and decisions made at the moment of speaking.",
            tableHead: ["Use", "Example"],
            table: [
              ["Predictions", "I think the exam will be easy."],
              ["Spontaneous decisions", "The phone is ringing. I will answer it."],
              ["Promises", "I will help you with your homework."],
              ["Offers", "I will carry your books."],
              ["Future expectations", "The semester will end in December."]
            ]
          },
          {
            number: 2,
            title: "Sentence Structures",
            desc: "Will is the same for all subjects and is always followed by the base verb.",
            tableHead: ["Form", "Structure", "Example"],
            table: [
              ["Affirmative", "Subject + will + base verb + complement.", "I will study for the exam tomorrow."],
              ["Negative", "Subject + will + not + base verb + complement.", "She will not (won't) travel next week."],
              ["Interrogative", "Will + subject + base verb + complement + ?", "Will they attend the meeting?"]
            ]
          }
        ],
        commonMistakes: [
          ["She will studies tomorrow.", "She will study tomorrow."],
          ["Will he goes with us?", "Will he go with us?"],
          ["I will to call you.", "I will call you."]
        ],
        memoryTipsTitle: "📌 Important Notes — Simple Future",
        memoryTips: [
          "Use <strong>will + the base form</strong> of the verb for all subjects. <em>She will help us.</em>",
          "The negative form is <strong>will not</strong> or <strong>won't</strong>. <em>They won't be late.</em>",
          "In questions, put <strong>will</strong> before the subject. <em>Will you study?</em>"
        ]
      },

      /* ---------- QUICK COMPARISON ---------- */
      {
        title: "Quick Comparison of the Three Simple Tenses",
        quickReferenceHead: ["Tense", "Main idea", "Common time expressions"],
        quickReference: [
          ["Simple Present", "Habits, routines, facts", "always, usually, every day"],
          ["Simple Past", "Completed past actions", "yesterday, last week, ago"],
          ["Simple Future (will)", "Predictions, promises, decisions", "tomorrow, next week, soon"]
        ],
        memoryTipsTitle: "💡 Study Tip",
        memoryTips: [
          "Pay special attention to the auxiliary verbs <strong>do, does, and did</strong>. After these auxiliaries, always use the <strong>base form</strong> of the main verb. With <strong>will</strong>, also use the base form."
        ]
      }
    ]
  };

  /* Practice quizzes for Simple Tenses (answer key from the original guide). */
  GRAMMAR_CONTENT.simpletenses.practice = [
    {
      id: "simpletenses-quiz-1",
      short: "Simple Present",
      type: "mc",
      title: "Quiz 1 — Simple Present Tense",
      instructions: "Choose the correct answer (A, B, C, or D).",
      questions: [
        { text: "My brother _____ to university every day.", options: ["go", "goes", "going", "went"], correct: 1 },
        { text: "They _____ coffee in the morning.", options: ["doesn't drink", "not drink", "don't drink", "aren't drink"], correct: 2 },
        { text: "_____ your teacher speak English?", options: ["Do", "Is", "Does", "Has"], correct: 2 },
        { text: "We _____ our homework after class.", options: ["does", "doing", "do", "did"], correct: 2 },
        { text: "Maria _____ TV at night.", options: ["watch", "watching", "watchs", "watches"], correct: 3 },
        { text: "I _____ like cold weather.", options: ["doesn't", "don't", "am not", "not"], correct: 1 },
        { text: "_____ they live near the campus?", options: ["Does", "Are", "Do", "Is"], correct: 2 },
        { text: "He _____ his emails before class.", options: ["check", "checks", "checking", "checkes"], correct: 1 },
        { text: "The library _____ at 8:00 a.m.", options: ["open", "opens", "opening", "opened"], correct: 1 },
        { text: "Which sentence is correct?", options: ["She don't study French.", "Does he works here?", "They studies together.", "He doesn't play tennis."], correct: 3 }
      ]
    },
    {
      id: "simpletenses-quiz-2",
      short: "Simple Past",
      type: "mc",
      title: "Quiz 2 — Simple Past Tense",
      instructions: "Choose the correct answer (A, B, C, or D).",
      questions: [
        { text: "Yesterday, I _____ my grandmother.", options: ["visit", "visits", "visited", "visiting"], correct: 2 },
        { text: "They _____ to the cinema last Saturday.", options: ["go", "went", "goes", "going"], correct: 1 },
        { text: "She _____ the exam because she was sick.", options: ["didn't take", "doesn't took", "not took", "didn't took"], correct: 0 },
        { text: "_____ you call your friend last night?", options: ["Do", "Were", "Does", "Did"], correct: 3 },
        { text: "We _____ dinner at 8:00 p.m. yesterday.", options: ["have", "has", "had", "having"], correct: 2 },
        { text: "He _____ his keys two days ago.", options: ["lose", "loses", "lost", "losing"], correct: 2 },
        { text: "My parents _____ at home last weekend.", options: ["was", "were", "are", "be"], correct: 1 },
        { text: "Which sentence is correct?", options: ["Did she went home?", "They didn't watched TV.", "I studyed yesterday.", "We didn't see the movie."], correct: 3 },
        { text: "The students _____ their assignment yesterday.", options: ["finish", "finishes", "finished", "finishing"], correct: 2 },
        { text: "_____ he arrive late this morning?", options: ["Did", "Does", "Was", "Do"], correct: 0 }
      ]
    },
    {
      id: "simpletenses-quiz-3",
      short: "Simple Future",
      type: "mc",
      title: "Quiz 3 — Simple Future Tense (will)",
      instructions: "Choose the correct answer (A, B, C, or D).",
      questions: [
        { text: "I think it _____ rain tomorrow.", options: ["will", "does", "did", "is"], correct: 0 },
        { text: "She _____ help us with the project.", options: ["will", "wills", "will to", "is will"], correct: 0 },
        { text: "They _____ come to class next Monday.", options: ["won't", "doesn't", "didn't", "aren't"], correct: 0 },
        { text: "_____ you call me later?", options: ["Do", "Are", "Will", "Did"], correct: 2 },
        { text: "We will _____ the report tonight.", options: ["finishes", "finished", "finishing", "finish"], correct: 3 },
        { text: "He _____ forget your birthday.", options: ["will not", "not will", "doesn't will", "won't to"], correct: 0 },
        { text: "_____ the students take the test tomorrow?", options: ["Do", "Did", "Will", "Are"], correct: 2 },
        { text: "I am sure our team _____ win the game.", options: ["will", "was", "does", "winning"], correct: 0 },
        { text: "Which sentence is correct?", options: ["She will studies tomorrow.", "They won't be late.", "Will he goes with us?", "I will to call you."], correct: 1 },
        { text: "The teacher _____ explain the activity again.", options: ["will", "will to", "wills", "does will"], correct: 0 }
      ]
    }
  ];
