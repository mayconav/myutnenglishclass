"use strict";
/* Contenido de gramatica: MODAL AUXILIARY VERBS (bloque "3. Modal Auxiliary Verbs" de Verb System).
   Registra 17 temas en GRAMMAR_CONTENT (modalcan, modalcould, modalmay, modalmight, modalmust, modalshall,
   modalshould, modalwill, modalwould, modaloughtto, modalneed, modaldare, modalusedto, modalhaveto,
   modalbeableto, modalbesupposedto, modalhadbetter), asi que desbloquean los temas del menu
   (partials/recursos.html, atributo data-topic). */

  GRAMMAR_CONTENT.modalcan = {
    label: "Can",
    eyebrowPrefix: "Verb System · Modal Auxiliary Verbs",
    definitionTitle: "Can",
    definition: "<strong>Can</strong> is a modal verb used for <strong>ability</strong>, <strong>possibility</strong>, <strong>permission</strong>, and <strong>requests</strong>. Its negative form is <strong>cannot / can't</strong>.",
    definitionExamples: [
      "I <strong>can</strong> swim.",
      "<strong>Can</strong> I sit here?",
      "You <strong>can't</strong> park here.",
      "<strong>Can</strong> you help me, please?"
    ],
    modules: [
      {
        title: "Can",
        objectives: [
          "Use can for ability, permission, possibility, and requests.",
          "Form affirmative, negative, and interrogative sentences with can.",
          "Use be able to for tenses where can is not possible."
        ],
        rules: [
          {
            number: 1,
            title: "Uses of Can",
            desc: "Can has four main meanings.",
            tableHead: ["Use", "Example"],
            table: [
              ["Ability", "She can speak three languages."],
              ["Permission (informal)", "Can I use your pen?"],
              ["Possibility", "It can get very cold here in winter."],
              ["Request (informal)", "Can you open the door, please?"]
            ]
          },
          {
            number: 2,
            title: "Sentence Structures",
            desc: "<strong>can</strong> is followed by the <strong>base form</strong> of the verb, with no <em>to</em> and no <em>-s</em> in the third person.",
            tableHead: ["Form", "Structure", "Example"],
            table: [
              ["Affirmative", "Subject + can + base verb", "He can drive."],
              ["Negative", "Subject + can not + base verb", "He cannot (can't) drive."],
              ["Question", "Can + subject + base verb?", "Can he drive?"]
            ]
          },
          {
            number: 3,
            title: "Can and Other Tenses",
            desc: "Can has no infinitive, no -ing form, and no future. For the <strong>past</strong> use <strong>could</strong>; for other tenses use <strong>be able to</strong>.",
            examples: ["Past: When I was ten, I <strong>could</strong> swim.", "Future: I <strong>will be able to</strong> drive next year."]
          }
        ],
        commonMistakes: [
          ["She cans swim.", "She can swim."],
          ["I can to speak English.", "I can speak English."],
          ["Do you can drive?", "Can you drive?"],
          ["He can speaks French.", "He can speak French."]
        ],
        memoryTipsTitle: "Important Notes — Can",
        memoryTips: [
          "Can + <strong>base verb</strong>: <em>I can swim.</em>",
          "No <em>-s</em> with he / she / it: <em>She can swim.</em>",
          "Questions: <strong>Can + subject</strong>. No do / does.",
          "Negative: <strong>cannot</strong> (one word) or <strong>can't</strong>."
        ]
      }
    ]
  };

  /* Practice quiz de Can. */
  GRAMMAR_CONTENT.modalcan.practice = [
    {
      id: "modalcan-quiz",
      short: "Can",
      type: "mc",
      title: "Quiz — Can",
      instructions: "Choose the best answer (A, B, C, or D).",
      questions: [
        { text: "She _____ speak three languages.", options: ["cans", "can", "can to", "is can"], correct: 1, explain: "Can + base verb." },
        { text: "_____ you help me, please?", options: ["Do", "Can", "Are", "Does"], correct: 1, explain: "Request with can." },
        { text: "He can _____ very fast.", options: ["runs", "to run", "run", "running"], correct: 2, explain: "Base verb after can." },
        { text: "Which sentence is correct?", options: ["I cannot to go.", "I can't go.", "I don't can go.", "I can not goes."], correct: 1, explain: "Negative: can't + base verb." },
        { text: "Which sentence is correct?", options: ["Do you can swim?", "Can you swim?", "You can swim?", "Can you to swim?"], correct: 1, explain: "Questions invert can and the subject." },
        { text: "When I was a child, I _____ climb trees.", options: ["can", "could", "am able", "cans"], correct: 1, explain: "Past ability: could." },
        { text: "Next year I _____ drive.", options: ["can", "will can", "will be able to", "am can"], correct: 2, explain: "Future ability: will be able to." },
        { text: "\"Can I use your phone?\" expresses _____.", options: ["ability", "permission", "obligation", "advice"], correct: 1, explain: "Asking for permission." }
      ]
    }
  ];

  GRAMMAR_CONTENT.modalcould = {
    label: "Could",
    eyebrowPrefix: "Verb System · Modal Auxiliary Verbs",
    definitionTitle: "Could",
    definition: "<strong>Could</strong> is used for <strong>past ability</strong>, <strong>polite requests</strong>, <strong>possibility</strong>, and <strong>suggestions</strong>.",
    definitionExamples: [
      "When I was young, I <strong>could</strong> run fast.",
      "<strong>Could</strong> you open the window, please?",
      "It <strong>could</strong> rain later.",
      "We <strong>could</strong> go to the cinema."
    ],
    modules: [
      {
        title: "Could",
        objectives: [
          "Use could for past ability, polite requests, possibility, and suggestions.",
          "Tell could from was / were able to.",
          "Form negatives and questions with could."
        ],
        rules: [
          {
            number: 1,
            title: "Uses of Could",
            desc: "Could has four main meanings.",
            tableHead: ["Use", "Example"],
            table: [
              ["General past ability", "She could read when she was four."],
              ["Polite request", "Could you help me with this?"],
              ["Present / future possibility", "The exam could be difficult."],
              ["Suggestion", "We could study together tonight."]
            ]
          },
          {
            number: 2,
            title: "Sentence Structures",
            desc: "<strong>could</strong> is followed by the <strong>base form</strong> of the verb, with no <em>to</em> and no <em>-s</em> in the third person.",
            tableHead: ["Form", "Structure", "Example"],
            table: [
              ["Affirmative", "Subject + could + base verb", "He could swim at the age of five."],
              ["Negative", "Subject + could not + base verb", "He could not (couldn't) swim."],
              ["Question", "Could + subject + base verb?", "Could he swim?"]
            ]
          },
          {
            number: 3,
            title: "Could or Was Able To?",
            desc: "For <strong>general</strong> past ability use <strong>could</strong>. For <strong>one specific</strong> past success use <strong>was / were able to</strong>.",
            examples: [
              "I <strong>could</strong> swim when I was six. (general)",
              "I <strong>was able to</strong> finish the exam in one hour. (one occasion)",
              "I <strong>couldn't</strong> finish it. (negative: both are possible)"
            ]
          }
        ],
        commonMistakes: [
          ["Could you to help me?", "Could you help me?"],
          ["She coulded swim.", "She could swim."],
          ["He could speaks English.", "He could speak English."],
          ["Yesterday I could pass the exam.", "Yesterday I was able to pass the exam."]
        ],
        memoryTipsTitle: "Important Notes — Could",
        memoryTips: [
          "Could + <strong>base verb</strong>. No <em>to</em>, no <em>-s</em>.",
          "<em>Could you…?</em> is more polite than <em>Can you…?</em>",
          "One specific past success → <strong>was / were able to</strong>.",
          "Negative: <strong>couldn't</strong>."
        ]
      }
    ]
  };

  /* Practice quiz de Could. */
  GRAMMAR_CONTENT.modalcould.practice = [
    {
      id: "modalcould-quiz",
      short: "Could",
      type: "mc",
      title: "Quiz — Could",
      instructions: "Choose the best answer (A, B, C, or D).",
      questions: [
        { text: "_____ you open the window, please?", options: ["Could", "Do", "Are", "Did"], correct: 0, explain: "Polite request." },
        { text: "When I was five, I _____ read.", options: ["can", "could", "coulded", "am able to"], correct: 1, explain: "General past ability." },
        { text: "Which sentence is correct?", options: ["She could to swim.", "She could swim.", "She coulds swim.", "She could swims."], correct: 1, explain: "Could + base verb." },
        { text: "We _____ go to the park. (suggestion)", options: ["could", "coulded", "cans", "could to"], correct: 0, explain: "Could for suggestions." },
        { text: "Yesterday I _____ finish the exam in one hour. (one occasion)", options: ["could", "was able to", "can", "am able to"], correct: 1, explain: "One specific success: was able to." },
        { text: "It _____ rain this afternoon.", options: ["could", "coulds", "to could", "cans"], correct: 0, explain: "Possibility." },
        { text: "Which request is more polite?", options: ["Give me a pen.", "Can you give me a pen?", "Could you give me a pen?", "You give me a pen."], correct: 2, explain: "Could is more polite than can." },
        { text: "He _____ not hear the teacher.", options: ["could", "coulds", "can't to", "is could"], correct: 0, explain: "Could not + base verb." }
      ]
    }
  ];

  GRAMMAR_CONTENT.modalmay = {
    label: "May",
    eyebrowPrefix: "Verb System · Modal Auxiliary Verbs",
    definitionTitle: "May",
    definition: "<strong>May</strong> is used to ask for or give <strong>formal permission</strong> and to express <strong>possibility</strong> (about 50%).",
    definitionExamples: [
      "<strong>May</strong> I come in?",
      "You <strong>may</strong> leave now.",
      "It <strong>may</strong> rain tomorrow.",
      "She <strong>may</strong> be at home."
    ],
    modules: [
      {
        title: "May",
        objectives: ["Use may for formal permission and possibility.", "Form negatives and questions with may.", "Compare may with can and might."],
        rules: [
          {
            number: 1,
            title: "Uses of May",
            desc: "May has two main meanings.",
            tableHead: ["Use", "Example"],
            table: [
              ["Formal permission (asking)", "May I ask a question?"],
              ["Formal permission (giving)", "You may use a dictionary in the exam."],
              ["Possibility", "He may be late because of the traffic."],
              ["Prohibition (formal)", "You may not enter this room."]
            ]
          },
          {
            number: 2,
            title: "Sentence Structures",
            desc: "<strong>may</strong> is followed by the <strong>base form</strong> of the verb, with no <em>to</em> and no <em>-s</em> in the third person.",
            tableHead: ["Form", "Structure", "Example"],
            table: [
              ["Affirmative", "Subject + may + base verb", "She may come to the party."],
              ["Negative", "Subject + may not + base verb", "She may not come to the party."],
              ["Question", "May + subject + base verb?", "May I leave early?"]
            ]
          },
          {
            number: 3,
            title: "May, Can, or Might?",
            desc: "<strong>May</strong> is more formal than <strong>can</strong> for permission. For possibility, <strong>may</strong> and <strong>might</strong> are similar; <strong>might</strong> is a little weaker.",
            examples: [
              "<strong>May</strong> I sit here? (formal) / <strong>Can</strong> I sit here? (informal)",
              "It <strong>may</strong> snow. / It <strong>might</strong> snow."
            ],
            tip: "Questions about possibility do not use <em>may</em>: say <em>Is it possible that…?</em> or <em>Do you think…?</em>"
          }
        ],
        commonMistakes: [
          ["She mays come.", "She may come."],
          ["May I to leave?", "May I leave?"],
          ["It may to rain.", "It may rain."],
          ["He may goes home.", "He may go home."]
        ],
        memoryTipsTitle: "Important Notes — May",
        memoryTips: [
          "May + <strong>base verb</strong>.",
          "<strong>May I…?</strong> = polite, formal permission.",
          "<strong>May</strong> = possibility (about 50%).",
          "Negative: <strong>may not</strong> (not <em>mayn't</em>)."
        ]
      }
    ]
  };

  /* Practice quiz de May. */
  GRAMMAR_CONTENT.modalmay.practice = [
    {
      id: "modalmay-quiz",
      short: "May",
      type: "mc",
      title: "Quiz — May",
      instructions: "Choose the best answer (A, B, C, or D).",
      questions: [
        { text: "_____ I come in, please?", options: ["May", "Do", "Am", "Did"], correct: 0, explain: "Formal permission." },
        { text: "It _____ rain tomorrow. (possibility)", options: ["mays", "may", "may to", "is may"], correct: 1, explain: "May + base verb." },
        { text: "Which sentence is correct?", options: ["She may to arrive late.", "She mays arrive late.", "She may arrive late.", "She may arrives late."], correct: 2, explain: "May + base verb." },
        { text: "Which is more formal?", options: ["Can I leave?", "May I leave?", "I leave?", "Do I leave?"], correct: 1, explain: "May is more formal." },
        { text: "You _____ not use your phone in class. (formal rule)", options: ["may", "mays", "are may", "do may"], correct: 0, explain: "May not = not allowed." },
        { text: "He _____ be at home. (possibility)", options: ["may", "mays", "maying", "to may"], correct: 0, explain: "May + be." },
        { text: "\"May I ask a question?\" is a _____.", options: ["prediction", "request for permission", "promise", "command"], correct: 1, explain: "Asks permission." },
        { text: "Choose the correct negative.", options: ["They may not come.", "They not may come.", "They don't may come.", "They may not to come."], correct: 0, explain: "may not + base verb." }
      ]
    }
  ];

  GRAMMAR_CONTENT.modalmight = {
    label: "Might",
    eyebrowPrefix: "Verb System · Modal Auxiliary Verbs",
    definitionTitle: "Might",
    definition: "<strong>Might</strong> expresses a <strong>weak possibility</strong> (about 30%) in the present or future. It is also used for tentative suggestions.",
    definitionExamples: [
      "I <strong>might</strong> go to the party.",
      "She <strong>might</strong> be sick.",
      "It <strong>might</strong> snow tonight.",
      "We <strong>might</strong> take the bus."
    ],
    modules: [
      {
        title: "Might",
        objectives: ["Use might for weak possibility.", "Form negatives and questions with might.", "Compare might with may and will."],
        rules: [
          {
            number: 1,
            title: "Uses of Might",
            desc: "Might shows that something is possible but <strong>not very likely</strong>.",
            tableHead: ["Use", "Example"],
            table: [
              ["Weak possibility (future)", "I might call you later."],
              ["Weak possibility (present)", "He might be at the library."],
              ["Tentative suggestion", "You might try the new restaurant."],
              ["Past possibility", "She might have missed the bus. (might have + past participle)"]
            ]
          },
          {
            number: 2,
            title: "Sentence Structures",
            desc: "<strong>might</strong> is followed by the <strong>base form</strong> of the verb, with no <em>to</em> and no <em>-s</em> in the third person.",
            tableHead: ["Form", "Structure", "Example"],
            table: [
              ["Affirmative", "Subject + might + base verb", "They might arrive late."],
              ["Negative", "Subject + might not + base verb", "They might not arrive on time."],
              ["Question", "Might + subject + base verb?", "Might they arrive late? (formal, rare)"]
            ]
          },
          {
            number: 3,
            title: "Might, May, Will",
            desc: "Compare how sure the speaker is.",
            tableHead: ["Verb", "Certainty", "Example"],
            table: [
              ["will", "very sure", "It will rain."],
              ["may", "about 50%", "It may rain."],
              ["might", "about 30%", "It might rain."]
            ],
            tip: "In everyday questions we avoid <em>might</em>: say <em>Do you think it will rain?</em>"
          }
        ],
        commonMistakes: [
          ["She mights come.", "She might come."],
          ["I might to go.", "I might go."],
          ["He might goes home.", "He might go home."],
          ["I might not to arrive.", "I might not arrive."]
        ],
        memoryTipsTitle: "Important Notes — Might",
        memoryTips: [
          "Might + <strong>base verb</strong>.",
          "<strong>Might</strong> = weaker possibility than <em>may</em>.",
          "Negative: <strong>might not</strong>.",
          "Past possibility: <strong>might have + past participle</strong>."
        ]
      }
    ]
  };

  /* Practice quiz de Might. */
  GRAMMAR_CONTENT.modalmight.practice = [
    {
      id: "modalmight-quiz",
      short: "Might",
      type: "mc",
      title: "Quiz — Might",
      instructions: "Choose the best answer (A, B, C, or D).",
      questions: [
        { text: "I _____ go to the party, but I am not sure.", options: ["might", "mights", "am might", "might to"], correct: 0, explain: "Weak possibility." },
        { text: "Which sentence is correct?", options: ["She might comes.", "She might come.", "She mights come.", "She might to come."], correct: 1, explain: "Might + base verb." },
        { text: "Which is the weakest possibility?", options: ["It will rain.", "It may rain.", "It might rain.", "It is raining."], correct: 2, explain: "Might is about 30%." },
        { text: "They _____ not arrive on time.", options: ["might", "mights", "do might", "are might"], correct: 0, explain: "Might not + base verb." },
        { text: "She _____ be sick. She looks pale.", options: ["might", "mights", "to might", "is might"], correct: 0, explain: "Possibility." },
        { text: "Choose the correct sentence.", options: ["I might to call you.", "I might call you.", "I mights call you.", "I might calling you."], correct: 1, explain: "Might + base verb." },
        { text: "\"You might try the new café\" is a _____.", options: ["command", "tentative suggestion", "prohibition", "past habit"], correct: 1, explain: "Soft suggestion." },
        { text: "He _____ miss the bus. (past: possible but not sure)", options: ["might have", "might has", "mights have", "might had"], correct: 0, explain: "might have + past participle." }
      ]
    }
  ];

  GRAMMAR_CONTENT.modalmust = {
    label: "Must",
    eyebrowPrefix: "Verb System · Modal Auxiliary Verbs",
    definitionTitle: "Must",
    definition: "<strong>Must</strong> expresses <strong>strong obligation</strong>, <strong>prohibition</strong> (<em>mustn't</em>), and <strong>logical deduction</strong> (strong certainty).",
    definitionExamples: [
      "You <strong>must</strong> wear a seat belt.",
      "You <strong>mustn't</strong> smoke here.",
      "She <strong>must</strong> be tired.",
      "Students <strong>must</strong> arrive on time."
    ],
    modules: [
      {
        title: "Must",
        objectives: ["Use must for obligation, prohibition, and deduction.", "Tell mustn't from don't have to.", "Use had to for the past."],
        rules: [
          {
            number: 1,
            title: "Uses of Must",
            desc: "Must has three main meanings.",
            tableHead: ["Use", "Example"],
            table: [
              ["Strong obligation (rule / speaker's opinion)", "You must do your homework."],
              ["Prohibition (mustn't)", "You mustn't park here."],
              ["Logical deduction (I'm sure)", "He has worked all day. He must be tired."]
            ]
          },
          {
            number: 2,
            title: "Sentence Structures",
            desc: "<strong>must</strong> is followed by the <strong>base form</strong> of the verb, with no <em>to</em> and no <em>-s</em> in the third person.",
            tableHead: ["Form", "Structure", "Example"],
            table: [
              ["Affirmative", "Subject + must + base verb", "We must leave now."],
              ["Negative", "Subject + must not + base verb", "We must not (mustn't) leave."],
              ["Question", "Must + subject + base verb?", "Must we leave now?"]
            ]
          },
          {
            number: 3,
            title: "Mustn't vs. Don't Have To",
            desc: "They have <strong>very different</strong> meanings.",
            tableHead: ["Expression", "Meaning", "Example"],
            table: [
              ["mustn't", "It is prohibited", "You mustn't talk during the exam."],
              ["don't have to", "It is not necessary", "You don't have to come early."]
            ],
            tip: "Must has no past form. For the past use <strong>had to</strong>: <em>Yesterday I had to work.</em>"
          }
        ],
        commonMistakes: [
          ["You must to study.", "You must study."],
          ["She musts leave.", "She must leave."],
          ["I must yesterday go.", "I had to go yesterday."],
          ["You don't must park here.", "You mustn't park here."]
        ],
        memoryTipsTitle: "Important Notes — Must",
        memoryTips: [
          "Must + <strong>base verb</strong>.",
          "<strong>Mustn't</strong> = prohibited; <strong>don't have to</strong> = not necessary.",
          "Past obligation: <strong>had to</strong>.",
          "Deduction: <em>He must be at home.</em>"
        ]
      }
    ]
  };

  /* Practice quiz de Must. */
  GRAMMAR_CONTENT.modalmust.practice = [
    {
      id: "modalmust-quiz",
      short: "Must",
      type: "mc",
      title: "Quiz — Must",
      instructions: "Choose the best answer (A, B, C, or D).",
      questions: [
        { text: "You _____ wear a seat belt. It's the law.", options: ["must", "musts", "must to", "are must"], correct: 0, explain: "Strong obligation." },
        { text: "You _____ smoke in the hospital. (prohibited)", options: ["mustn't", "don't have to", "doesn't must", "must to"], correct: 0, explain: "Mustn't = prohibited." },
        { text: "You _____ come early. It's optional.", options: ["mustn't", "don't have to", "must", "can't"], correct: 1, explain: "Not necessary." },
        { text: "He has worked all day. He _____ be tired.", options: ["must", "mustn't", "musts", "must to"], correct: 0, explain: "Logical deduction." },
        { text: "Yesterday I _____ work late.", options: ["must", "had to", "musted", "have to"], correct: 1, explain: "Past of must: had to." },
        { text: "Which sentence is correct?", options: ["She musts go.", "She must go.", "She must to go.", "She must goes."], correct: 1, explain: "Must + base verb." },
        { text: "Which sentence is correct?", options: ["Do I must leave?", "Must I leave?", "I must leave?", "Does I must leave?"], correct: 1, explain: "Inversion with must." },
        { text: "\"You mustn't be late\" means _____.", options: ["It is not necessary to be late.", "Being late is prohibited / not allowed.", "You can be late.", "You were late."], correct: 1, explain: "Mustn't expresses prohibition." }
      ]
    }
  ];

  GRAMMAR_CONTENT.modalshall = {
    label: "Shall",
    eyebrowPrefix: "Verb System · Modal Auxiliary Verbs",
    definitionTitle: "Shall",
    definition: "<strong>Shall</strong> is used mainly with <strong>I</strong> and <strong>we</strong> to make <strong>offers</strong> and <strong>suggestions</strong> in questions. It also appears in formal rules and promises, and in formal British English for the future.",
    definitionExamples: [
      "<strong>Shall</strong> I open the window?",
      "<strong>Shall</strong> we go to the cinema?",
      "Employees <strong>shall</strong> wear an ID badge.",
      "I <strong>shall</strong> call you tomorrow."
    ],
    modules: [
      {
        title: "Shall",
        objectives: ["Use shall for offers and suggestions with I / we.", "Recognize shall in formal rules.", "Form questions with shall."],
        rules: [
          {
            number: 1,
            title: "Uses of Shall",
            desc: "Shall is much less common than <em>will</em> and <em>should</em>.",
            tableHead: ["Use", "Example"],
            table: [
              ["Offer (I)", "Shall I carry your bag?"],
              ["Suggestion (we)", "Shall we have lunch?"],
              ["Asking for advice (I)", "What shall I wear tonight?"],
              ["Formal rule / promise", "The tenant shall pay rent monthly.<br>I shall never forget this day."]
            ]
          },
          {
            number: 2,
            title: "Sentence Structures",
            desc: "<strong>shall</strong> is followed by the <strong>base form</strong> of the verb, with no <em>to</em> and no <em>-s</em> in the third person.",
            tableHead: ["Form", "Structure", "Example"],
            table: [
              ["Affirmative", "Subject + shall + base verb", "We shall begin at nine. (formal)"],
              ["Negative", "Subject + shall not + base verb", "I shall not (shan't) be late. (formal)"],
              ["Question", "Shall + subject + base verb?", "Shall we begin?"]
            ]
          },
          {
            number: 3,
            title: "Shall and Will",
            desc: "In modern English <strong>will</strong> is used for the future. Keep <strong>shall</strong> for <strong>questions with I / we</strong> (offers and suggestions).",
            examples: ["<strong>Shall</strong> I help you? (offer)", "I <strong>will</strong> help you tomorrow. (future)"],
            tip: "Do not use <em>shall</em> with he / she / they in everyday English."
          }
        ],
        commonMistakes: [
          ["Shall I to help you?", "Shall I help you?"],
          ["We shalls go.", "We shall go."],
          ["Shall we to start?", "Shall we start?"],
          ["Shall you open the door?", "Will you open the door? / Shall I open the door?"]
        ],
        memoryTipsTitle: "Important Notes — Shall",
        memoryTips: [
          "<strong>Shall I…?</strong> = offer. <strong>Shall we…?</strong> = suggestion.",
          "Shall + <strong>base verb</strong>.",
          "In everyday English, use <em>will</em> for future statements.",
          "Formal rules often use <em>shall</em>."
        ]
      }
    ]
  };

  /* Practice quiz de Shall. */
  GRAMMAR_CONTENT.modalshall.practice = [
    {
      id: "modalshall-quiz",
      short: "Shall",
      type: "mc",
      title: "Quiz — Shall",
      instructions: "Choose the best answer (A, B, C, or D).",
      questions: [
        { text: "_____ I open the window? (offer)", options: ["Shall", "Do", "Am", "Will you"], correct: 0, explain: "Offer with I." },
        { text: "_____ we go to the cinema tonight?", options: ["Shall", "Do", "Are", "Does"], correct: 0, explain: "Suggestion with we." },
        { text: "Which sentence is correct?", options: ["Shall I to help?", "Shall I help?", "Shall I helps?", "Shall helping I?"], correct: 1, explain: "Shall + base verb." },
        { text: "\"Shall we start?\" is a _____.", options: ["prohibition", "suggestion", "past habit", "deduction"], correct: 1, explain: "Suggests an action." },
        { text: "What _____ I wear tonight?", options: ["shall", "shalls", "do shall", "to shall"], correct: 0, explain: "Asking for advice." },
        { text: "Which subject is NOT common with shall?", options: ["I", "we", "he", "both I and we"], correct: 2, explain: "Shall is mainly for I / we." },
        { text: "\"The tenant shall pay the rent monthly\" is _____.", options: ["a casual suggestion", "a formal rule", "a past habit", "a question"], correct: 1, explain: "Formal legal wording." },
        { text: "Which sentence is correct?", options: ["We shall to meet at six.", "We shall meet at six.", "We shalls meet at six.", "We shall meets at six."], correct: 1, explain: "Shall + base verb." }
      ]
    }
  ];

  GRAMMAR_CONTENT.modalshould = {
    label: "Should",
    eyebrowPrefix: "Verb System · Modal Auxiliary Verbs",
    definitionTitle: "Should",
    definition: "<strong>Should</strong> is used to give <strong>advice</strong>, to say what is <strong>a good idea</strong>, and to express <strong>expectation</strong>. It is weaker than <em>must</em>.",
    definitionExamples: [
      "You <strong>should</strong> sleep more.",
      "She <strong>shouldn't</strong> eat so much sugar.",
      "The bus <strong>should</strong> arrive soon.",
      "You <strong>should have</strong> called me."
    ],
    modules: [
      {
        title: "Should",
        objectives: ["Use should for advice and recommendations.", "Form negatives and questions with should.", "Use should have + past participle for past regrets."],
        rules: [
          {
            number: 1,
            title: "Uses of Should",
            desc: "Should has several uses.",
            tableHead: ["Use", "Example"],
            table: [
              ["Advice", "You should see a doctor."],
              ["Opinion / recommendation", "I think we should leave early."],
              ["Expectation", "The test should be easy."],
              ["Past regret / criticism", "I should have studied more. (should have + past participle)"]
            ]
          },
          {
            number: 2,
            title: "Sentence Structures",
            desc: "<strong>should</strong> is followed by the <strong>base form</strong> of the verb, with no <em>to</em> and no <em>-s</em> in the third person.",
            tableHead: ["Form", "Structure", "Example"],
            table: [
              ["Affirmative", "Subject + should + base verb", "He should study more."],
              ["Negative", "Subject + should not + base verb", "He should not (shouldn't) stay up late."],
              ["Question", "Should + subject + base verb?", "Should I take the job?"]
            ]
          },
          {
            number: 3,
            title: "Should, Must, and Ought To",
            desc: "<strong>Should</strong> gives advice; <strong>must</strong> expresses strong obligation. <strong>Ought to</strong> has almost the same meaning as should.",
            tableHead: ["Verb", "Strength", "Example"],
            table: [
              ["should / ought to", "advice", "You should drink more water."],
              ["must", "strong obligation", "You must show your ID."]
            ]
          }
        ],
        commonMistakes: [
          ["You should to rest.", "You should rest."],
          ["She shoulds go.", "She should go."],
          ["You should studying.", "You should study."],
          ["You don't should eat that.", "You shouldn't eat that."]
        ],
        memoryTipsTitle: "Important Notes — Should",
        memoryTips: [
          "Should + <strong>base verb</strong>.",
          "Use <strong>should</strong> for advice: <em>You should rest.</em>",
          "Negative: <strong>shouldn't</strong>.",
          "Past regret: <strong>should have + past participle</strong>."
        ]
      }
    ]
  };

  /* Practice quiz de Should. */
  GRAMMAR_CONTENT.modalshould.practice = [
    {
      id: "modalshould-quiz",
      short: "Should",
      type: "mc",
      title: "Quiz — Should",
      instructions: "Choose the best answer (A, B, C, or D).",
      questions: [
        { text: "You look tired. You _____ rest.", options: ["should", "shoulds", "should to", "are should"], correct: 0, explain: "Advice." },
        { text: "Which sentence is correct?", options: ["She should studies.", "She should study.", "She shoulds study.", "She should to study."], correct: 1, explain: "Should + base verb." },
        { text: "You _____ eat so much sugar. It's bad for you.", options: ["should", "shouldn't", "don't should", "should to"], correct: 1, explain: "Negative advice." },
        { text: "_____ I take this job?", options: ["Do", "Should", "Am", "Must to"], correct: 1, explain: "Should + subject." },
        { text: "I _____ have studied more. (regret)", options: ["should", "shoulds", "should to", "am should"], correct: 0, explain: "should have + past participle." },
        { text: "Which is stronger?", options: ["You should leave.", "You must leave.", "You ought to leave.", "You could leave."], correct: 1, explain: "Must is stronger than should." },
        { text: "The bus _____ arrive at six. (expectation)", options: ["should", "shoulds", "to should", "does should"], correct: 0, explain: "Expectation." },
        { text: "Which sentence is correct?", options: ["You don't should eat that.", "You shouldn't eat that.", "You should not to eat that.", "You no should eat that."], correct: 1, explain: "shouldn't + base verb." }
      ]
    }
  ];

  GRAMMAR_CONTENT.modalwill = {
    label: "Will",
    eyebrowPrefix: "Verb System · Modal Auxiliary Verbs",
    definitionTitle: "Will",
    definition: "As a modal verb, <strong>will</strong> expresses <strong>decisions made now</strong>, <strong>promises</strong>, <strong>offers</strong>, <strong>predictions</strong>, and <strong>requests</strong>. Its negative is <strong>will not / won't</strong>.",
    definitionExamples: [
      "I <strong>will</strong> help you.",
      "I <strong>'ll</strong> call you tonight. (promise)",
      "<strong>Will</strong> you open the door, please?",
      "It <strong>won't</strong> rain tomorrow."
    ],
    modules: [
      {
        title: "Will",
        objectives: [
          "Use will for decisions, promises, offers, predictions, and requests.",
          "Form contractions: 'll and won't.",
          "Make questions and negatives with will."
        ],
        rules: [
          {
            number: 1,
            title: "Uses of Will",
            desc: "Will has many uses.",
            tableHead: ["Use", "Example"],
            table: [
              ["Spontaneous decision", "The phone is ringing. I'll answer it."],
              ["Promise", "I will always love you. I'll call you."],
              ["Offer", "I'll carry your bags."],
              ["Prediction (opinion)", "I think it will rain tomorrow."],
              ["Request", "Will you help me, please?"],
              ["Refusal", "The car won't start."]
            ]
          },
          {
            number: 2,
            title: "Sentence Structures",
            desc: "<strong>will</strong> is followed by the <strong>base form</strong> of the verb, with no <em>to</em> and no <em>-s</em> in the third person.",
            tableHead: ["Form", "Structure", "Example"],
            table: [
              ["Affirmative", "Subject + will + base verb", "She will arrive at six."],
              ["Negative", "Subject + will not + base verb", "She will not (won't) arrive at six."],
              ["Question", "Will + subject + base verb?", "Will she arrive at six?"]
            ]
          },
          {
            number: 3,
            title: "Contractions and Signal Words",
            desc: "In speaking we use <strong>'ll</strong> and <strong>won't</strong>. Signal words: <strong>tomorrow, next week, soon, I think, probably, perhaps</strong>.",
            examples: [
              "I'll = I will, you'll, he'll, she'll, we'll, they'll",
              "won't = will not",
              "I <strong>think</strong> she <strong>will probably</strong> pass the exam."
            ],
            tip: "For the full tense guide, see <strong>Future with Will</strong> in this block."
          }
        ],
        commonMistakes: [
          ["She wills come.", "She will come."],
          ["I will to call you.", "I will call you."],
          ["He will goes home.", "He will go home."],
          ["Do you will help me?", "Will you help me?"]
        ],
        memoryTipsTitle: "Important Notes — Will",
        memoryTips: [
          "Will + <strong>base verb</strong>.",
          "Contraction: <strong>'ll</strong>. Negative: <strong>won't</strong>.",
          "Use <strong>will</strong> for decisions made at the moment of speaking.",
          "Questions: <strong>Will + subject</strong>."
        ]
      }
    ]
  };

  /* Practice quiz de Will. */
  GRAMMAR_CONTENT.modalwill.practice = [
    {
      id: "modalwill-quiz",
      short: "Will",
      type: "mc",
      title: "Quiz — Will",
      instructions: "Choose the best answer (A, B, C, or D).",
      questions: [
        { text: "The phone is ringing. I _____ answer it.", options: ["will", "wills", "am will", "would to"], correct: 0, explain: "Spontaneous decision." },
        { text: "Which sentence is correct?", options: ["She will comes.", "She will come.", "She wills come.", "She will to come."], correct: 1, explain: "Will + base verb." },
        { text: "_____ you help me with my bag?", options: ["Do", "Will", "Are", "Does"], correct: 1, explain: "Request." },
        { text: "The short form of \"will not\" is _____.", options: ["willn't", "wont'", "won't", "wo not"], correct: 2, explain: "won't." },
        { text: "I think it _____ rain tomorrow.", options: ["will", "wills", "is will", "does will"], correct: 0, explain: "Prediction." },
        { text: "\"I'll carry your bags\" is an _____.", options: ["offer", "order", "excuse", "obligation"], correct: 0, explain: "Offer." },
        { text: "Which sentence is correct?", options: ["Do you will go?", "Will you go?", "You will go?", "Will you to go?"], correct: 1, explain: "Will + subject + verb." },
        { text: "\"I'll\" means _____.", options: ["I shall", "I would", "I will", "I have"], correct: 2, explain: "'ll = will." }
      ]
    }
  ];

  GRAMMAR_CONTENT.modalwould = {
    label: "Would",
    eyebrowPrefix: "Verb System · Modal Auxiliary Verbs",
    definitionTitle: "Would",
    definition: "<strong>Would</strong> is used for <strong>polite requests and offers</strong>, <strong>past habits</strong>, <strong>imaginary situations</strong> (conditionals), and <strong>preferences</strong>.",
    definitionExamples: [
      "<strong>Would</strong> you help me, please?",
      "<strong>Would</strong> you like some tea?",
      "When I was a child, I <strong>would</strong> play outside.",
      "If I had money, I <strong>would</strong> travel."
    ],
    modules: [
      {
        title: "Would",
        objectives: ["Use would for polite requests, offers, and preferences.", "Express past habits with would.", "Use would in second-conditional sentences."],
        rules: [
          {
            number: 1,
            title: "Uses of Would",
            desc: "Would has four main uses.",
            tableHead: ["Use", "Example"],
            table: [
              ["Polite request", "Would you open the window?"],
              ["Polite offer / invitation", "Would you like some coffee?"],
              ["Past habit (repeated action)", "Every summer we would visit our grandparents."],
              ["Imaginary situation (2nd conditional)", "If I won the lottery, I would buy a house."],
              ["Preference", "I would rather stay at home."]
            ]
          },
          {
            number: 2,
            title: "Sentence Structures",
            desc: "<strong>would</strong> is followed by the <strong>base form</strong> of the verb, with no <em>to</em> and no <em>-s</em> in the third person.",
            tableHead: ["Form", "Structure", "Example"],
            table: [
              ["Affirmative", "Subject + would + base verb", "He would help you."],
              ["Negative", "Subject + would not + base verb", "He would not (wouldn't) help you."],
              ["Question", "Would + subject + base verb?", "Would he help you?"]
            ]
          },
          {
            number: 3,
            title: "Would in Conditionals",
            desc: "In the second conditional, <strong>would</strong> goes in the <strong>result</strong> clause and the if-clause uses the <strong>past simple</strong>. We do not use <em>would</em> in the if-clause.",
            structure: "If + past simple, would + base verb",
            examples: ["If I <strong>had</strong> time, I <strong>would</strong> learn French.", "✗ If I would have time… → ✓ If I <strong>had</strong> time…"],
            tip: "<strong>Would</strong> for past habits is only for <strong>actions</strong>. For past states use <em>used to</em>: <em>I used to live in Cancún.</em>"
          }
        ],
        commonMistakes: [
          ["Would you to help me?", "Would you help me?"],
          ["If I would have time, I would travel.", "If I had time, I would travel."],
          ["She woulds come.", "She would come."],
          ["I would to go.", "I would go."]
        ],
        memoryTipsTitle: "Important Notes — Would",
        memoryTips: [
          "Would + <strong>base verb</strong>.",
          "<em>Would you…?</em> and <em>Would you like…?</em> are polite.",
          "Second conditional: <strong>If + past simple, would + verb</strong>.",
          "Past habits with actions: <em>We would play outside.</em>"
        ]
      }
    ]
  };

  /* Practice quiz de Would. */
  GRAMMAR_CONTENT.modalwould.practice = [
    {
      id: "modalwould-quiz",
      short: "Would",
      type: "mc",
      title: "Quiz — Would",
      instructions: "Choose the best answer (A, B, C, or D).",
      questions: [
        { text: "_____ you like some tea?", options: ["Would", "Do", "Are", "Will to"], correct: 0, explain: "Polite offer." },
        { text: "If I had money, I _____ travel.", options: ["will", "would", "woulds", "am"], correct: 1, explain: "Second conditional." },
        { text: "Which sentence is correct?", options: ["If I would have time, I would study.", "If I had time, I would study.", "If I have time, I would study.", "If I would had time, I study."], correct: 1, explain: "If + past simple, would + verb." },
        { text: "When I was a child, I _____ play in the park every day.", options: ["would", "wills", "am used", "woulds"], correct: 0, explain: "Past habit." },
        { text: "Which sentence is correct?", options: ["Would you to open it?", "Would you open it?", "Woulds you open it?", "Do you would open it?"], correct: 1, explain: "Would + subject + base verb." },
        { text: "I _____ rather stay home tonight.", options: ["would", "will", "woulds", "am"], correct: 0, explain: "Preference: would rather." },
        { text: "\"Would you help me?\" is more _____ than \"Help me!\"", options: ["rude", "polite", "angry", "short"], correct: 1, explain: "Polite request." },
        { text: "She said she _____ call me later.", options: ["would", "woulds", "am", "will to"], correct: 0, explain: "Would = future in the past." }
      ]
    }
  ];

  GRAMMAR_CONTENT.modaloughtto = {
    label: "Ought to",
    eyebrowPrefix: "Verb System · Modal Auxiliary Verbs",
    definitionTitle: "Ought to",
    definition: "<strong>Ought to</strong> is used for <strong>advice</strong>, <strong>moral obligation</strong>, and <strong>expectation</strong>. It has almost the same meaning as <strong>should</strong>.",
    definitionExamples: [
      "You <strong>ought to</strong> apologize.",
      "We <strong>ought to</strong> protect the environment.",
      "She <strong>ought not to</strong> work so hard.",
      "The movie <strong>ought to</strong> be good."
    ],
    modules: [
      {
        title: "Ought to",
        objectives: ["Use ought to for advice and moral duty.", "Form negatives and questions.", "Compare ought to with should."],
        rules: [
          {
            number: 1,
            title: "Uses of Ought To",
            desc: "Ought to is a little more formal than should.",
            tableHead: ["Use", "Example"],
            table: [
              ["Advice", "You ought to see a doctor."],
              ["Moral obligation", "People ought to help each other."],
              ["Expectation", "The bus ought to arrive soon."]
            ]
          },
          {
            number: 2,
            title: "Sentence Structures",
            desc: "After <strong>ought</strong> we always keep <strong>to</strong>, followed by the base form.",
            tableHead: ["Form", "Structure", "Example"],
            table: [
              ["Affirmative", "Subject + ought to + base verb", "You ought to study."],
              ["Negative", "Subject + ought not to (oughtn't to) + base verb", "He ought not to be late."],
              ["Question (formal)", "Ought + subject + to + base verb?", "Ought I to call her?"]
            ],
            tip: "In everyday English questions and negatives usually use <strong>should</strong>: <em>Should I call her?</em>"
          },
          {
            number: 3,
            title: "Ought To vs. Should",
            desc: "They have the same meaning, but <strong>should</strong> is more common, especially in questions and negatives.",
            examples: [
              "You <strong>ought to</strong> apologize. = You <strong>should</strong> apologize.",
              "<strong>Should</strong> I apologize? (more natural than <em>Ought I to apologize?</em>)"
            ]
          }
        ],
        commonMistakes: [
          ["You ought apologize.", "You ought to apologize."],
          ["She oughts to go.", "She ought to go."],
          ["You ought to going.", "You ought to go."],
          ["Do I ought to leave?", "Ought I to leave? / Should I leave?"]
        ],
        memoryTipsTitle: "Important Notes — Ought to",
        memoryTips: [
          "Ought <strong>to</strong> + base verb. Never drop <em>to</em>.",
          "No <em>-s</em>: <em>She ought to go.</em>",
          "Negative: <strong>ought not to</strong>.",
          "In questions we usually prefer <strong>should</strong>."
        ]
      }
    ]
  };

  /* Practice quiz de Ought to. */
  GRAMMAR_CONTENT.modaloughtto.practice = [
    {
      id: "modaloughtto-quiz",
      short: "Ought to",
      type: "mc",
      title: "Quiz — Ought to",
      instructions: "Choose the best answer (A, B, C, or D).",
      questions: [
        { text: "You _____ apologize to her.", options: ["ought", "ought to", "oughts to", "ought for"], correct: 1, explain: "Ought to + base verb." },
        { text: "Which sentence is correct?", options: ["She ought to goes.", "She ought to go.", "She oughts to go.", "She ought go."], correct: 1, explain: "Ought to + base verb." },
        { text: "The negative of \"ought to\" is _____.", options: ["don't ought to", "ought not to", "not ought to", "ought to not"], correct: 1, explain: "ought not to." },
        { text: "\"You ought to study\" is similar to _____.", options: ["You must study.", "You should study.", "You might study.", "You can study."], correct: 1, explain: "Ought to ≈ should." },
        { text: "Which sentence is correct?", options: ["Do I ought to leave?", "Ought I to leave?", "Ought I leave to?", "Does I ought to leave?"], correct: 1, explain: "Ought + subject + to + verb." },
        { text: "We _____ protect the environment. (moral duty)", options: ["ought to", "oughts to", "ought", "ought for"], correct: 0, explain: "Moral obligation." },
        { text: "The movie _____ be good. (expectation)", options: ["ought to", "oughts to", "ought", "is ought to"], correct: 0, explain: "Expectation." },
        { text: "You ought _____ so late.", options: ["not to stay", "to not stayed", "not stay", "to stays"], correct: 0, explain: "ought not to + base verb." }
      ]
    }
  ];

  GRAMMAR_CONTENT.modalneed = {
    label: "Need",
    eyebrowPrefix: "Verb System · Modal Auxiliary Verbs",
    definitionTitle: "Need",
    definition: "<strong>Need</strong> can be a <strong>main verb</strong> (<em>need + noun</em> or <em>need to + verb</em>) or, less often, a <strong>modal verb</strong> in negatives and questions (<em>needn't</em>, <em>Need I…?</em>).",
    definitionExamples: [
      "I <strong>need</strong> a pen.",
      "She <strong>needs to</strong> study.",
      "You <strong>don't need to</strong> come.",
      "You <strong>needn't</strong> worry."
    ],
    modules: [
      {
        title: "Need",
        objectives: ["Use need as a main verb with a noun and with to + verb.", "Recognize the modal use (needn't, Need I…?).", "Make negatives and questions correctly."],
        rules: [
          {
            number: 1,
            title: "Need as a Main Verb (most common)",
            desc: "It behaves like a regular verb: <strong>-s</strong> in the third person and <strong>do / does / did</strong> in questions and negatives.",
            tableHead: ["Form", "Example"],
            table: [
              ["Need + noun", "I need a pen."],
              ["Need to + verb", "She needs to study."],
              ["Negative", "You don't need to come. / He doesn't need help."],
              ["Question", "Do you need help? / Does she need to leave?"],
              ["Past", "I needed to work late. / We didn't need to pay."]
            ]
          },
          {
            number: 2,
            title: "Need as a Modal (formal, mostly British)",
            desc: "As a modal, <strong>need</strong> has no -s and no <em>to</em>. It is used mainly in <strong>negatives</strong> and <strong>questions</strong>.",
            tableHead: ["Form", "Example"],
            table: [
              ["Negative", "You needn't worry."],
              ["Question", "Need I bring a pen?"],
              ["With hardly / only", "You need only ask."]
            ]
          },
          {
            number: 3,
            title: "Needn't and Mustn't",
            desc: "<strong>Needn't / don't need to</strong> means <em>it is not necessary</em>. <strong>Mustn't</strong> means <em>it is prohibited</em>.",
            examples: ["You <strong>needn't</strong> come early. (not necessary)", "You <strong>mustn't</strong> come late. (not allowed)"]
          }
        ],
        commonMistakes: [
          ["She needs go.", "She needs to go."],
          ["He need to study.", "He needs to study."],
          ["I needn't to go.", "I needn't go. / I don't need to go."],
          ["They need study.", "They need to study."]
        ],
        memoryTipsTitle: "Important Notes — Need",
        memoryTips: [
          "Main verb: <strong>need + noun</strong> / <strong>need to + verb</strong>.",
          "Third person: <strong>needs</strong>.",
          "Negative: <strong>don't need to</strong> (or <em>needn't</em> + base verb).",
          "<strong>Don't need to</strong> = not necessary."
        ]
      }
    ]
  };

  /* Practice quiz de Need. */
  GRAMMAR_CONTENT.modalneed.practice = [
    {
      id: "modalneed-quiz",
      short: "Need",
      type: "mc",
      title: "Quiz — Need",
      instructions: "Choose the best answer (A, B, C, or D).",
      questions: [
        { text: "I _____ a new notebook.", options: ["need", "needs", "needing", "needed to"], correct: 0, explain: "I need + noun." },
        { text: "She _____ to study for the exam.", options: ["need", "needs", "needing", "is need"], correct: 1, explain: "Third person: needs to." },
        { text: "Which sentence is correct?", options: ["He needs go.", "He needs to go.", "He need to go.", "He needs going."], correct: 1, explain: "Need to + base verb." },
        { text: "You _____ come. It's optional.", options: ["don't need to", "mustn't", "need not to", "needn't to"], correct: 0, explain: "Not necessary." },
        { text: "_____ you need help?", options: ["Do", "Are", "Have", "Will to"], correct: 0, explain: "Main verb need uses do-support." },
        { text: "Which sentence is correct?", options: ["I needn't to go.", "I needn't go.", "I needn't going.", "I not need go."], correct: 1, explain: "Modal needn't + base verb." },
        { text: "We _____ to leave early yesterday.", options: ["needed", "need", "needs", "needing"], correct: 0, explain: "Past simple." },
        { text: "\"You needn't worry\" means _____.", options: ["It is prohibited to worry.", "It is not necessary to worry.", "You worried.", "You must worry."], correct: 1, explain: "Not necessary." }
      ]
    }
  ];

  GRAMMAR_CONTENT.modaldare = {
    label: "Dare",
    eyebrowPrefix: "Verb System · Modal Auxiliary Verbs",
    definitionTitle: "Dare",
    definition: "<strong>Dare</strong> means <strong>to have the courage</strong> to do something. It can be a <strong>main verb</strong> (<em>dare to + verb</em>) or, in formal English, a <strong>modal verb</strong> (<em>daren't</em>, <em>Dare he…?</em>).",
    definitionExamples: [
      "She <strong>dared to</strong> speak to the director.",
      "I <strong>don't dare to</strong> ask her.",
      "I <strong>daren't</strong> tell him the truth.",
      "<strong>How dare</strong> you say that!"
    ],
    modules: [
      {
        title: "Dare",
        objectives: ["Use dare as a main verb with to + verb.", "Recognize the modal use in negatives and questions.", "Know common expressions with dare."],
        rules: [
          {
            number: 1,
            title: "Dare as a Main Verb",
            desc: "It behaves like a regular verb: <strong>-s</strong> in the third person and <strong>do / does / did</strong> in questions and negatives. After it we use <strong>to + base verb</strong> (sometimes the base verb alone).",
            tableHead: ["Form", "Example"],
            table: [
              ["Affirmative", "He dares to challenge the teacher."],
              ["Negative", "I don't dare to ask. / She didn't dare to jump."],
              ["Question", "Do you dare to try it?"],
              ["Past", "Nobody dared to speak."]
            ]
          },
          {
            number: 2,
            title: "Dare as a Modal (formal)",
            desc: "As a modal, <strong>dare</strong> has no -s and is followed by the <strong>base verb without to</strong>. It is common in <strong>negatives</strong> and <strong>questions</strong>, especially in British English.",
            tableHead: ["Form", "Example"],
            table: [
              ["Negative", "I daren't tell him. / She dare not leave."],
              ["Question", "Dare you say that to her?"],
              ["With nobody / never", "Nobody dared say a word."]
            ]
          },
          {
            number: 3,
            title: "Common Expressions",
            desc: "Some expressions with dare are used all the time.",
            tableHead: ["Expression", "Meaning", "Example"],
            table: [
              ["How dare you…?", "expresses anger", "How dare you speak to me like that!"],
              ["Don't you dare…", "strong warning", "Don't you dare touch my phone!"],
              ["I dare say…", "I suppose", "I dare say you are right."]
            ]
          }
        ],
        commonMistakes: [
          ["She dares jumps.", "She dares to jump."],
          ["I don't dare asking.", "I don't dare to ask."],
          ["How you dare!", "How dare you!"],
          ["I daren't to say it.", "I daren't say it."]
        ],
        memoryTipsTitle: "Important Notes — Dare",
        memoryTips: [
          "Main verb: <strong>dare to + verb</strong> (with <em>do / does / did</em>).",
          "Modal: <strong>daren't + base verb</strong> (no <em>to</em>).",
          "<strong>How dare you…!</strong> shows anger.",
          "Dare is much less common than <em>can't</em> or <em>be afraid to</em>."
        ]
      }
    ]
  };

  /* Practice quiz de Dare. */
  GRAMMAR_CONTENT.modaldare.practice = [
    {
      id: "modaldare-quiz",
      short: "Dare",
      type: "mc",
      title: "Quiz — Dare",
      instructions: "Choose the best answer (A, B, C, or D).",
      questions: [
        { text: "She _____ to speak to the director.", options: ["dares", "dare", "daring", "dared of"], correct: 0, explain: "Third person singular: dares to." },
        { text: "Which sentence is correct?", options: ["I daren't to tell him.", "I daren't tell him.", "I daren't telling him.", "I don't daren't tell him."], correct: 1, explain: "Modal dare + base verb." },
        { text: "\"How dare you speak to me like that!\" expresses _____.", options: ["joy", "anger", "a suggestion", "a past habit"], correct: 1, explain: "It is an angry expression." },
        { text: "Nobody _____ to speak.", options: ["dared", "dares", "dare", "daring"], correct: 0, explain: "Past simple." },
        { text: "Which sentence is correct?", options: ["How you dare!", "How dare you!", "How dare!", "You how dare!"], correct: 1, explain: "Fixed expression." },
        { text: "I don't _____ to ask him.", options: ["dare", "dares", "dared", "daring"], correct: 0, explain: "After don't use the base form." },
        { text: "\"I dare say you are right\" means _____.", options: ["I am angry.", "I suppose you are right.", "I challenge you.", "You dared."], correct: 1, explain: "I dare say = I suppose." },
        { text: "Which sentence is correct?", options: ["She dare to jump.", "She dares to jump.", "She dares jumps.", "She dares jumping."], correct: 1, explain: "Dares to + base verb." }
      ]
    }
  ];

  GRAMMAR_CONTENT.modalusedto = {
    label: "Used to",
    eyebrowPrefix: "Verb System · Modal Auxiliary Verbs",
    definitionTitle: "Used to",
    definition: "<strong>Used to</strong> talks about <strong>past habits</strong> and <strong>past states</strong> that are <strong>no longer true</strong>. It only exists in the past.",
    definitionExamples: [
      "I <strong>used to</strong> play soccer every weekend.",
      "She <strong>used to</strong> live in Paris.",
      "We <strong>didn't use to</strong> have a car.",
      "<strong>Did</strong> you <strong>use to</strong> smoke?"
    ],
    modules: [
      {
        title: "Used to",
        objectives: ["Use used to for past habits and past states.", "Form negatives and questions correctly (use to).", "Do not confuse used to with be used to."],
        rules: [
          {
            number: 1,
            title: "Uses and Forms",
            desc: "Used to describes things that were <strong>regular or true in the past</strong> but are <strong>not true now</strong>.",
            tableHead: ["Form", "Structure", "Example"],
            table: [
              ["Affirmative", "Subject + used to + base verb", "He used to work at a bank."],
              ["Negative", "Subject + didn't use to + base verb", "I didn't use to like coffee."],
              ["Question", "Did + subject + use to + base verb?", "Did you use to live here?"]
            ],
            tip: "In negatives and questions the auxiliary <strong>did</strong> carries the past, so we write <strong>use to</strong> (without -d)."
          },
          {
            number: 2,
            title: "Habits and States",
            desc: "Used to works with <strong>repeated actions</strong> and with <strong>states</strong> (<em>live, have, be, like</em>).",
            examples: ["Actions: I <strong>used to walk</strong> to school every day.", "States: She <strong>used to have</strong> long hair."],
            tip: "Do not use used to for one specific past event or a number of times: <em>I went to Spain three times.</em>"
          },
          {
            number: 3,
            title: "Used to vs. Be Used To",
            desc: "<strong>Be used to + noun / -ing</strong> means <em>to be accustomed to</em> something.",
            tableHead: ["Structure", "Meaning", "Example"],
            table: [
              ["used to + base verb", "past habit, not true now", "I used to get up late."],
              ["be used to + -ing / noun", "accustomed, familiar", "I am used to getting up early."]
            ]
          }
        ],
        commonMistakes: [
          ["I used to playing soccer.", "I used to play soccer."],
          ["She didn't used to smoke.", "She didn't use to smoke."],
          ["Did you used to live here?", "Did you use to live here?"],
          ["I use to go there as a child.", "I used to go there as a child."]
        ],
        memoryTipsTitle: "Important Notes — Used to",
        memoryTips: [
          "Used to + <strong>base verb</strong>: <em>I used to play.</em>",
          "Negative / question: <strong>didn't use to / Did … use to</strong>.",
          "It refers to the <strong>past only</strong>; there is no present form.",
          "<em>Be used to + -ing</em> is different: <em>I'm used to waking up early.</em>"
        ]
      }
    ]
  };

  /* Practice quiz de Used to. */
  GRAMMAR_CONTENT.modalusedto.practice = [
    {
      id: "modalusedto-quiz",
      short: "Used to",
      type: "mc",
      title: "Quiz — Used to",
      instructions: "Choose the best answer (A, B, C, or D).",
      questions: [
        { text: "I _____ play soccer every weekend when I was young.", options: ["used to", "use to", "am used to", "was use to"], correct: 0, explain: "Past habit." },
        { text: "She didn't _____ smoke.", options: ["used to", "use to", "using to", "uses to"], correct: 1, explain: "After didn't: use to." },
        { text: "_____ you use to live in Monterrey?", options: ["Do", "Did", "Were", "Are"], correct: 1, explain: "Did + subject + use to." },
        { text: "Which sentence is correct?", options: ["I used to playing chess.", "I used to play chess.", "I use to play chess.", "I used play chess."], correct: 1, explain: "Used to + base verb." },
        { text: "We _____ have a dog, but he died.", options: ["used to", "are used to", "use to", "were used"], correct: 0, explain: "Past state." },
        { text: "\"I am used to waking up early\" means _____.", options: ["I woke up early in the past.", "I am accustomed to waking up early.", "I will wake up early.", "I don't wake up early."], correct: 1, explain: "Be used to + -ing = accustomed." },
        { text: "Which sentence is correct?", options: ["Did you used to smoke?", "Did you use to smoke?", "Do you used to smoke?", "Did you using to smoke?"], correct: 1, explain: "Did + use to." },
        { text: "Used to talks about _____.", options: ["future plans", "present facts", "past habits no longer true", "unlikely events"], correct: 2, explain: "Past habits and states." }
      ]
    }
  ];

  GRAMMAR_CONTENT.modalhaveto = {
    label: "Have to",
    eyebrowPrefix: "Verb System · Modal Auxiliary Verbs",
    definitionTitle: "Have to",
    definition: "<strong>Have to</strong> expresses <strong>obligation</strong> that comes from <strong>rules, laws, or circumstances</strong> (not just the speaker's opinion). It works in all tenses.",
    definitionExamples: [
      "I <strong>have to</strong> wear a uniform.",
      "She <strong>has to</strong> work on Saturday.",
      "We <strong>had to</strong> wait for an hour.",
      "You <strong>don't have to</strong> pay."
    ],
    modules: [
      {
        title: "Have to",
        objectives: ["Use have to for external obligation.", "Form negatives and questions with do-support.", "Tell don't have to from mustn't."],
        rules: [
          {
            number: 1,
            title: "Forms of Have To",
            desc: "Have to is like a main verb: <strong>has to</strong> with he / she / it and <strong>do / does / did</strong> for questions and negatives.",
            tableHead: ["Form", "Structure", "Example"],
            table: [
              ["Affirmative", "Subject + have / has to + base verb", "She has to study."],
              ["Negative", "Subject + don't / doesn't have to + base verb", "You don't have to wait."],
              ["Question", "Do / Does + subject + have to + base verb?", "Do I have to sign here?"],
              ["Past", "Subject + had to + base verb (didn't have to)", "We had to leave early."],
              ["Future", "Subject + will have to + base verb", "He will have to work."]
            ]
          },
          {
            number: 2,
            title: "Have To vs. Must",
            desc: "<strong>Have to</strong> = obligation from <strong>outside</strong> (rules, jobs). <strong>Must</strong> = obligation from the <strong>speaker's own opinion</strong>. Have to also has a past (<em>had to</em>) and a future (<em>will have to</em>).",
            examples: ["I <strong>have to</strong> wear a helmet at work. (rule)", "I <strong>must</strong> call my mother. (my own decision)"]
          },
          {
            number: 3,
            title: "Don't Have To vs. Mustn't",
            desc: "The negative forms have <strong>different meanings</strong>.",
            tableHead: ["Expression", "Meaning", "Example"],
            table: [
              ["don't / doesn't have to", "not necessary", "You don't have to come early."],
              ["mustn't", "prohibited", "You mustn't use your phone here."]
            ]
          }
        ],
        commonMistakes: [
          ["She have to work.", "She has to work."],
          ["He haves to go.", "He has to go."],
          ["Does she has to work?", "Does she have to work?"],
          ["You don't have to smoke here. (meaning: it is prohibited)", "You mustn't smoke here."]
        ],
        memoryTipsTitle: "Important Notes — Have to",
        memoryTips: [
          "Have to + <strong>base verb</strong>. Third person: <strong>has to</strong>.",
          "Questions and negatives: <strong>do / does / did + have to</strong>.",
          "<strong>Don't have to</strong> = not necessary; <strong>mustn't</strong> = prohibited.",
          "Past: <strong>had to</strong>. Future: <strong>will have to</strong>."
        ]
      }
    ]
  };

  /* Practice quiz de Have to. */
  GRAMMAR_CONTENT.modalhaveto.practice = [
    {
      id: "modalhaveto-quiz",
      short: "Have to",
      type: "mc",
      title: "Quiz — Have to",
      instructions: "Choose the best answer (A, B, C, or D).",
      questions: [
        { text: "She _____ work on Saturday.", options: ["have to", "has to", "haves to", "having to"], correct: 1, explain: "she + has to." },
        { text: "_____ you have to wear a uniform?", options: ["Do", "Are", "Have", "Has"], correct: 0, explain: "Do-support." },
        { text: "Which sentence is correct?", options: ["Does she has to work?", "Does she have to work?", "Do she have to work?", "Has she to work?"], correct: 1, explain: "Does + base form: have to." },
        { text: "Yesterday we _____ wait for an hour.", options: ["have to", "had to", "has to", "must"], correct: 1, explain: "Past: had to." },
        { text: "You _____ pay. It's free. (not necessary)", options: ["mustn't", "don't have to", "haven't to", "doesn't have to"], correct: 1, explain: "Not necessary." },
        { text: "You _____ smoke here. It's prohibited.", options: ["don't have to", "mustn't", "haven't to", "doesn't have to"], correct: 1, explain: "Prohibition." },
        { text: "Next week I _____ travel for work.", options: ["will have to", "have to will", "will must", "must"], correct: 0, explain: "Future obligation." },
        { text: "Which is an obligation from a rule?", options: ["I want to go.", "I have to wear a seat belt.", "I might go.", "I could go."], correct: 1, explain: "External rule." }
      ]
    }
  ];

  GRAMMAR_CONTENT.modalbeableto = {
    label: "Be able to",
    eyebrowPrefix: "Verb System · Modal Auxiliary Verbs",
    definitionTitle: "Be able to",
    definition: "<strong>Be able to</strong> expresses <strong>ability</strong> and can be used in <strong>all tenses</strong>, including the future, the perfect tenses, and after other verbs, where <em>can</em> is not possible.",
    definitionExamples: [
      "I <strong>am able to</strong> speak three languages.",
      "She <strong>was able to</strong> finish the exam.",
      "We <strong>will be able to</strong> travel next year.",
      "He <strong>has been able to</strong> improve a lot."
    ],
    modules: [
      {
        title: "Be able to",
        objectives: ["Form be able to in different tenses.", "Use be able to where can is not possible.", "Tell could from was able to."],
        rules: [
          {
            number: 1,
            title: "Forms of Be Able To",
            desc: "Conjugate <strong>be</strong> and add <strong>able to + base verb</strong>.",
            tableHead: ["Tense", "Example"],
            table: [
              ["Present", "I am able to drive."],
              ["Past", "She was able to solve the problem."],
              ["Future", "You will be able to speak English fluently."],
              ["Present perfect", "He has been able to save money."],
              ["Infinitive / -ing", "I would like to be able to swim. / Being able to cook is useful."],
              ["Negative / question", "They aren't able to come. / Are you able to help me?"]
            ]
          },
          {
            number: 2,
            title: "Why Use Be Able To?",
            desc: "<strong>Can</strong> only exists in the present (and <em>could</em> in the past). For other tenses we use <strong>be able to</strong>.",
            examples: ["✗ I will can drive. → ✓ I <strong>will be able to</strong> drive.", "✗ I have could finish. → ✓ I <strong>have been able to</strong> finish."]
          },
          {
            number: 3,
            title: "Could or Was Able To?",
            desc: "For <strong>one specific</strong> success in the past use <strong>was / were able to</strong>. For <strong>general</strong> ability use could.",
            examples: ["I <strong>could</strong> swim when I was six. (general)", "I <strong>was able to</strong> win the race yesterday. (one occasion)"]
          }
        ],
        commonMistakes: [
          ["She will can drive.", "She will be able to drive."],
          ["I am able to swimming.", "I am able to swim."],
          ["He is able to goes.", "He is able to go."],
          ["I have could finish.", "I have been able to finish."]
        ],
        memoryTipsTitle: "Important Notes — Be able to",
        memoryTips: [
          "Be able to + <strong>base verb</strong>.",
          "Use it where <strong>can</strong> is impossible: future, perfect, infinitive.",
          "One specific past success: <strong>was / were able to</strong>.",
          "In the present, <em>can</em> is more natural than <em>am able to</em>."
        ]
      }
    ]
  };

  /* Practice quiz de Be able to. */
  GRAMMAR_CONTENT.modalbeableto.practice = [
    {
      id: "modalbeableto-quiz",
      short: "Be able to",
      type: "mc",
      title: "Quiz — Be able to",
      instructions: "Choose the best answer (A, B, C, or D).",
      questions: [
        { text: "She _____ speak three languages.", options: ["is able to", "is able", "able to", "are able to"], correct: 0, explain: "She is able to + verb." },
        { text: "Next year I _____ drive.", options: ["will can", "will be able to", "will able to", "am can"], correct: 1, explain: "Future ability." },
        { text: "Which sentence is correct?", options: ["I am able to swimming.", "I am able to swim.", "I am able swim.", "I able to swim."], correct: 1, explain: "Able to + base verb." },
        { text: "Yesterday, they _____ finish the race. (one occasion)", options: ["could", "were able to", "can", "will be able to"], correct: 1, explain: "Specific success." },
        { text: "He _____ been able to find a job.", options: ["have", "has", "is", "will"], correct: 1, explain: "Present perfect: has been able to." },
        { text: "I would like _____ swim.", options: ["to be able to", "to can", "be can", "to able"], correct: 0, explain: "Infinitive: to be able to." },
        { text: "\"I will can go\" is incorrect. The right form is _____.", options: ["I will be able to go.", "I will to can go.", "I can will go.", "I am will able go."], correct: 0, explain: "Will be able to." },
        { text: "Which is the negative of \"She is able to come\"?", options: ["She isn't able to come.", "She doesn't able to come.", "She not able to come.", "She isn't able come."], correct: 0, explain: "Be + not + able to." }
      ]
    }
  ];

  GRAMMAR_CONTENT.modalbesupposedto = {
    label: "Be supposed to",
    eyebrowPrefix: "Verb System · Modal Auxiliary Verbs",
    definitionTitle: "Be supposed to",
    definition: "<strong>Be supposed to</strong> expresses what is <strong>expected</strong>, <strong>planned</strong>, or <strong>required by rules</strong>. It can also say what people <strong>believe or say</strong> about something.",
    definitionExamples: [
      "You <strong>are supposed to</strong> arrive at eight.",
      "We <strong>aren't supposed to</strong> use phones here.",
      "The movie <strong>is supposed to</strong> be great.",
      "He <strong>was supposed to</strong> call me, but he didn't."
    ],
    modules: [
      {
        title: "Be supposed to",
        objectives: ["Use be supposed to for expectations, rules, and plans.", "Use was supposed to for plans that did not happen.", "Form negatives and questions."],
        rules: [
          {
            number: 1,
            title: "Uses of Be Supposed To",
            desc: "The verb <strong>be</strong> changes; <strong>supposed to</strong> stays the same and is followed by the base verb.",
            tableHead: ["Use", "Example"],
            table: [
              ["Duty / rule / expectation", "Students are supposed to wear a uniform."],
              ["Plan or arrangement", "The train is supposed to leave at 6."],
              ["Prohibition (not supposed to)", "You aren't supposed to park here."],
              ["General belief / reputation", "This restaurant is supposed to be excellent."],
              ["Plan that did not happen (past)", "I was supposed to study, but I fell asleep."]
            ]
          },
          {
            number: 2,
            title: "Sentence Structures",
            desc: "Remember to include the verb <strong>be</strong>.",
            tableHead: ["Form", "Structure", "Example"],
            table: [
              ["Affirmative", "Subject + am / is / are supposed to + base verb", "She is supposed to be here."],
              ["Negative", "Subject + am / is / are not supposed to + base verb", "We aren't supposed to talk."],
              ["Question", "Am / Is / Are + subject + supposed to + base verb?", "Are we supposed to bring a pen?"],
              ["Past", "Subject + was / were supposed to + base verb", "They were supposed to call."]
            ]
          },
          {
            number: 3,
            title: "Be Supposed To vs. Should / Must",
            desc: "<strong>Be supposed to</strong> focuses on what <strong>others expect or require</strong>; it is softer than <em>must</em>.",
            examples: [
              "You <strong>are supposed to</strong> bring your ID. (the rule says so)",
              "You <strong>should</strong> eat more fruit. (advice)",
              "You <strong>must</strong> show your ID. (strong obligation)"
            ]
          }
        ],
        commonMistakes: [
          ["You suppose to be here.", "You are supposed to be here."],
          ["He is suppose to call.", "He is supposed to call."],
          ["We are supposed arrive at six.", "We are supposed to arrive at six."],
          ["She supposed to study.", "She is supposed to study."]
        ],
        memoryTipsTitle: "Important Notes — Be supposed to",
        memoryTips: [
          "<strong>Be</strong> + <strong>supposed to</strong> + base verb.",
          "Write <strong>supposed</strong> with -d: <em>is supposed to</em>.",
          "<strong>Was / were supposed to</strong> = it was planned but did not happen.",
          "<strong>Not supposed to</strong> = it is against the rules."
        ]
      }
    ]
  };

  /* Practice quiz de Be supposed to. */
  GRAMMAR_CONTENT.modalbesupposedto.practice = [
    {
      id: "modalbesupposedto-quiz",
      short: "Be supposed to",
      type: "mc",
      title: "Quiz — Be supposed to",
      instructions: "Choose the best answer (A, B, C, or D).",
      questions: [
        { text: "You _____ arrive at eight o'clock.", options: ["suppose to", "are supposed to", "supposed to", "are suppose to"], correct: 1, explain: "Are supposed to." },
        { text: "Which sentence is correct?", options: ["He is suppose to call.", "He supposed to call.", "He is supposed to call.", "He is supposed call."], correct: 2, explain: "Is supposed to + base verb." },
        { text: "We _____ use phones here. It's against the rules.", options: ["aren't supposed", "aren't supposed to", "don't supposed", "not supposed"], correct: 1, explain: "Not supposed to = prohibited." },
        { text: "I _____ to study last night, but I fell asleep. (plan that failed)", options: ["am supposed", "was supposed", "supposed", "will be supposed"], correct: 1, explain: "Past plan: was supposed to." },
        { text: "This restaurant _____ be excellent. (reputation)", options: ["is supposed to", "suppose to", "supposed", "are supposed"], correct: 0, explain: "Reputation." },
        { text: "_____ we supposed to bring a pen?", options: ["Do", "Are", "Is", "Have"], correct: 1, explain: "Are + we + supposed to." },
        { text: "They _____ to call me yesterday.", options: ["were supposed", "was supposed", "are supposed", "supposed"], correct: 0, explain: "Plural past: were supposed to." },
        { text: "\"You are supposed to wear a helmet\" means _____.", options: ["It is a rule or expectation.", "You wore a helmet.", "It is impossible.", "It is your choice."], correct: 0, explain: "Expectation or rule." }
      ]
    }
  ];

  GRAMMAR_CONTENT.modalhadbetter = {
    label: "Had better",
    eyebrowPrefix: "Verb System · Modal Auxiliary Verbs",
    definitionTitle: "Had better",
    definition: "<strong>Had better</strong> gives <strong>strong advice</strong> or a <strong>warning</strong>: something bad can happen if we do not follow it. It refers to the <strong>present or future</strong>, not the past.",
    definitionExamples: [
      "You <strong>had better</strong> leave now.",
      "You <strong>'d better</strong> study for the test.",
      "We <strong>had better not</strong> be late.",
      "You <strong>'d better</strong> take an umbrella."
    ],
    modules: [
      {
        title: "Had better",
        objectives: ["Use had better for urgent advice and warnings.", "Form the negative (had better not).", "Use the contraction 'd better."],
        rules: [
          {
            number: 1,
            title: "Forms of Had Better",
            desc: "Although it looks like the past, <strong>had better</strong> refers to <strong>now or the future</strong>. It is followed by the <strong>base verb without to</strong>.",
            tableHead: ["Form", "Structure", "Example"],
            table: [
              ["Affirmative", "Subject + had better + base verb", "You had better hurry."],
              ["Contraction", "Subject + 'd better + base verb", "I'd better go."],
              ["Negative", "Subject + had better not + base verb", "You had better not miss the bus."],
              ["Question (rare)", "Hadn't + subject + better + base verb?", "Hadn't we better leave?"]
            ]
          },
          {
            number: 2,
            title: "Meaning: Advice With a Warning",
            desc: "It suggests <strong>a possible bad result</strong> if the advice is ignored.",
            examples: ["You'd better leave now, <strong>or you will miss the train</strong>.", "You had better not tell anyone, <strong>or he will be angry</strong>."]
          },
          {
            number: 3,
            title: "Had Better vs. Should",
            desc: "<strong>Should</strong> is general advice. <strong>Had better</strong> is stronger and more urgent.",
            tableHead: ["Expression", "Example"],
            table: [
              ["should", "You should eat healthy food."],
              ["had better", "You had better see a doctor today."]
            ],
            tip: "The negative is <strong>had better not</strong> (not <em>hadn't better</em> or <em>had not better</em>)."
          }
        ],
        commonMistakes: [
          ["You had better to go.", "You had better go."],
          ["You better not to be late.", "You'd better not be late."],
          ["You had better went home.", "You had better go home."],
          ["She had not better go.", "She had better not go."]
        ],
        memoryTipsTitle: "Important Notes — Had better",
        memoryTips: [
          "Had better + <strong>base verb</strong> (no <em>to</em>).",
          "Contraction: <strong>'d better</strong>.",
          "Negative: <strong>had better not</strong>.",
          "It refers to <strong>now or the future</strong>, never to the past."
        ]
      }
    ]
  };

  /* Practice quiz de Had better. */
  GRAMMAR_CONTENT.modalhadbetter.practice = [
    {
      id: "modalhadbetter-quiz",
      short: "Had better",
      type: "mc",
      title: "Quiz — Had better",
      instructions: "Choose the best answer (A, B, C, or D).",
      questions: [
        { text: "You _____ leave now, or you will miss the train.", options: ["had better", "had better to", "would better", "have better"], correct: 0, explain: "Had better + base verb." },
        { text: "Which sentence is correct?", options: ["You had better to study.", "You had better study.", "You had better studied.", "You had better studying."], correct: 1, explain: "No \"to\" after had better." },
        { text: "What is the contraction of \"I had better go\"?", options: ["I've better go.", "I'd better go.", "I'm better go.", "I'll better go."], correct: 1, explain: "'d better." },
        { text: "The negative form is _____.", options: ["had not better", "hadn't better", "had better not", "didn't have better"], correct: 2, explain: "Had better not + verb." },
        { text: "\"You had better see a doctor\" refers to _____.", options: ["the past", "now or the future", "a past habit", "an ability"], correct: 1, explain: "Present or future." },
        { text: "You _____ be late again, or the teacher will be angry.", options: ["had better not", "better not to", "didn't better", "hadn't to"], correct: 0, explain: "Had better not." },
        { text: "Which advice is the strongest?", options: ["You could rest.", "You should rest.", "You had better rest.", "You may rest."], correct: 2, explain: "Had better is urgent." },
        { text: "Which sentence is correct?", options: ["She had better not goes.", "She had better not go.", "She had not better go.", "She better not to go."], correct: 1, explain: "Had better not + base verb." }
      ]
    }
  ];

