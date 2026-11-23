"use strict";
/* Contenido de gramatica: MAIN VERBS (bloque "1. Main Verbs" de Verb System).
   Registra 8 temas en GRAMMAR_CONTENT (actionverbs, linkingverbs, stativeverbs, dynamicverbs,
   regularverbs, irregularverbs, transitiveverbs, intransitiveverbs), asi que desbloquean los temas
   del menu (partials/recursos.html, atributo data-topic).
   Mismos campos que grammar-verbs-content.js; cada tema trae su practice quiz (mc con "explain"). */

  GRAMMAR_CONTENT.actionverbs = {
    label: "Action Verbs",
    eyebrowPrefix: "Verb System · Main Verbs",
    definitionTitle: "Action Verbs",
    definition: "An <strong>action verb</strong> tells us what the subject <strong>does</strong>. It can describe a physical action (<em>run, write</em>), a mental action (<em>think, decide</em>), or an event that happens (<em>grow, change</em>).",
    definitionExamples: [
      "She <strong>runs</strong> every morning.",
      "I <strong>decided</strong> to study medicine.",
      "The students <strong>wrote</strong> an essay.",
      "They <strong>are building</strong> a new library."
    ],
    modules: [
      {
        title: "Action Verbs",
        objectives: [
          "Recognize action verbs in a sentence.",
          "Tell physical actions from mental actions.",
          "Use adverbs (not adjectives) to describe how an action is done."
        ],
        rules: [
          {
            number: 1,
            title: "Types of Action Verbs",
            desc: "Action verbs answer the question <strong>\"What does the subject do?\"</strong>",
            tableHead: ["Type", "Examples", "Sentence"],
            table: [
              ["Physical actions", "run, jump, write, cook, open", "He opened the window."],
              ["Mental actions", "think, decide, imagine, plan", "We decided to travel in July."],
              ["Events / processes", "grow, change, happen, fall", "The leaves fell from the tree."]
            ]
          },
          {
            number: 2,
            title: "Using Action Verbs",
            desc: "Action verbs can be used in <strong>simple</strong> and <strong>continuous</strong> tenses and in commands. They are described with <strong>adverbs</strong>.",
            tableHead: ["Use", "Example"],
            table: [
              ["Simple tense (habit or fact)", "She studies every night."],
              ["Continuous tense (in progress)", "She is studying right now."],
              ["Command (imperative)", "Open your books, please."],
              ["With an adverb", "He drives carefully."]
            ]
          },
          {
            number: 3,
            title: "Action Verb or Linking Verb?",
            desc: "Some verbs can be both. If the verb shows an <strong>action</strong> it is an action verb; if it only connects the subject with a description, it is a linking verb.",
            examples: ["She <strong>looked</strong> at the board. (action: she used her eyes)", "She <strong>looks</strong> tired. (linking: describes her)"],
            tip: "Try replacing the verb with <em>is</em> or <em>seems</em>. If the sentence still makes sense, it is probably a linking verb."
          }
        ],
        commonMistakes: [
          ["She sings beautiful.", "She sings beautifully."],
          ["He go to school every day.", "He goes to school every day."],
          ["They works hard.", "They work hard."]
        ],
        memoryTipsTitle: "Important Notes — Action Verbs",
        memoryTips: [
          "Action verbs show <strong>what someone or something does</strong>.",
          "Describe an action with an <strong>adverb</strong>: <em>She speaks clearly.</em>",
          "Action verbs can be used in continuous tenses: <em>I am cooking.</em>",
          "Mental actions (<em>think, decide, plan</em>) are action verbs too."
        ]
      }
    ]
  };

  /* Practice quiz de Action Verbs. */
  GRAMMAR_CONTENT.actionverbs.practice = [
    {
      id: "actionverbs-quiz",
      short: "Action Verbs",
      type: "mc",
      title: "Quiz — Action Verbs",
      instructions: "Choose the best answer (A, B, C, or D).",
      questions: [
        { text: "Which word is an action verb?", options: ["happy", "teacher", "write", "quickly"], correct: 2, explain: "\"Write\" shows what someone does." },
        { text: "She _____ the report yesterday.", options: ["finishes", "finished", "finish", "finishing"], correct: 1, explain: "Yesterday needs the past simple." },
        { text: "Choose the correct sentence.", options: ["He drives careful.", "He drives carefully.", "He drive carefully.", "He driving carefully."], correct: 1, explain: "An adverb describes an action verb." },
        { text: "Which is a mental action?", options: ["jump", "decide", "open", "build"], correct: 1, explain: "\"Decide\" happens in the mind." },
        { text: "In \"The leaves fell from the tree\", the action verb is _____.", options: ["leaves", "tree", "fell", "from"], correct: 2, explain: "\"Fell\" is the action." },
        { text: "Which sentence uses an action verb in the continuous?", options: ["They are tired.", "They are playing soccer.", "They were here.", "They seem happy."], correct: 1, explain: "\"Are playing\" shows an action in progress." },
        { text: "She _____ English every evening.", options: ["study", "studies", "studying", "are study"], correct: 1, explain: "Third person singular takes -s/-es." },
        { text: "In \"She looked at the photo\", \"looked\" is a(n) _____ verb.", options: ["linking", "auxiliary", "action", "modal"], correct: 2, explain: "She performs the action of looking." }
      ]
    }
  ];

  GRAMMAR_CONTENT.linkingverbs = {
    label: "Linking Verbs",
    eyebrowPrefix: "Verb System · Main Verbs",
    definitionTitle: "Linking Verbs",
    definition: "A <strong>linking verb</strong> does not show an action. It <strong>connects</strong> the subject with a word that describes or identifies it (an adjective or a noun). The most common linking verb is <strong>be</strong>.",
    definitionExamples: [
      "She <strong>is</strong> a doctor.",
      "The soup <strong>smells</strong> delicious.",
      "He <strong>became</strong> a teacher.",
      "You <strong>look</strong> tired."
    ],
    modules: [
      {
        title: "Linking Verbs",
        objectives: ["Identify common linking verbs.", "Use adjectives (not adverbs) after linking verbs.", "Tell when a verb is linking and when it is an action verb."],
        rules: [
          {
            number: 1,
            title: "Common Linking Verbs",
            desc: "These verbs link the subject to a <strong>subject complement</strong> (an adjective or a noun).",
            tableHead: ["Group", "Verbs", "Example"],
            table: [
              ["Be", "am, is, are, was, were", "The exam was difficult."],
              ["Senses", "look, sound, smell, taste, feel", "The music sounds great."],
              ["Change", "become, get, grow, turn", "It is getting cold."],
              ["State", "seem, appear, remain, stay", "They stayed calm."]
            ]
          },
          {
            number: 2,
            title: "Adjective After a Linking Verb",
            desc: "After a linking verb we use an <strong>adjective</strong>, not an adverb, because we describe the <strong>subject</strong>.",
            structure: "Subject + linking verb + adjective / noun",
            examples: ["The cake <strong>tastes good</strong>.", "She <strong>seems nervous</strong>.", "My brother <strong>became an engineer</strong>."]
          },
          {
            number: 3,
            title: "Linking Verb or Action Verb?",
            desc: "Verbs like <strong>look, feel, smell, taste</strong> can be linking or action verbs.",
            tableHead: ["Linking (describes the subject)", "Action (the subject does something)"],
            table: [
              ["The soup tastes salty.", "She tasted the soup."],
              ["He looks happy.", "He looked at the picture."],
              ["The room smells nice.", "I smelled the flowers."]
            ],
            tip: "If you can replace the verb with <em>is / are</em> and the sentence still makes sense, it is a linking verb."
          }
        ],
        commonMistakes: [
          ["She looks sadly.", "She looks sad."],
          ["The soup tastes well.", "The soup tastes good."],
          ["It sounds strangely.", "It sounds strange."]
        ],
        memoryTipsTitle: "Important Notes — Linking Verbs",
        memoryTips: [
          "Linking verbs connect the subject with a <strong>description</strong> or <strong>identity</strong>.",
          "Use an <strong>adjective</strong> after them: <em>She seems happy.</em>",
          "<em>Be</em> is the most common linking verb.",
          "Look, feel, smell and taste can also be action verbs."
        ]
      }
    ]
  };

  /* Practice quiz de Linking Verbs. */
  GRAMMAR_CONTENT.linkingverbs.practice = [
    {
      id: "linkingverbs-quiz",
      short: "Linking Verbs",
      type: "mc",
      title: "Quiz — Linking Verbs",
      instructions: "Choose the best answer (A, B, C, or D).",
      questions: [
        { text: "Which verb is a linking verb in this sentence? \"The pizza smells delicious.\"", options: ["The", "pizza", "smells", "delicious"], correct: 2, explain: "\"Smells\" links \"pizza\" with \"delicious\"." },
        { text: "She looks _____.", options: ["happily", "happy", "happiness", "happier than"], correct: 1, explain: "Use an adjective after a linking verb." },
        { text: "Which verb is NOT a linking verb?", options: ["seem", "become", "run", "remain"], correct: 2, explain: "\"Run\" is an action verb." },
        { text: "The music sounds _____.", options: ["beautifully", "beauty", "beautiful", "beautify"], correct: 2, explain: "Adjective after \"sounds\"." },
        { text: "Which sentence has an action verb?", options: ["He felt tired.", "He felt the wall.", "He is tall.", "He seems kind."], correct: 1, explain: "\"Felt the wall\" shows an action." },
        { text: "They stayed _____ during the storm.", options: ["calmly", "calm", "calmness", "more calmly than"], correct: 1, explain: "Adjective after the linking verb \"stayed\"." },
        { text: "The weather _____ cold in December.", options: ["gets", "getting", "get", "to get"], correct: 0, explain: "Third person singular, present simple." },
        { text: "Choose the correct sentence.", options: ["The soup tastes well.", "The soup tastes good.", "The soup tastes goodly.", "The soup is tasting well."], correct: 1, explain: "Adjective \"good\" after a linking verb." }
      ]
    }
  ];

  GRAMMAR_CONTENT.stativeverbs = {
    label: "Stative Verbs",
    eyebrowPrefix: "Verb System · Main Verbs",
    definitionTitle: "Stative Verbs",
    definition: "<strong>Stative verbs</strong> describe <strong>states</strong>, not actions: thoughts, feelings, possession, senses, and conditions. They are normally <strong>not used in continuous tenses</strong>.",
    definitionExamples: [
      "I <strong>know</strong> the answer.",
      "She <strong>loves</strong> music.",
      "They <strong>own</strong> a small house.",
      "This bag <strong>belongs</strong> to me."
    ],
    modules: [
      {
        title: "Stative Verbs",
        objectives: ["Recognize common stative verbs.", "Avoid the continuous form with stative verbs.", "Know verbs with both a stative and an active meaning."],
        rules: [
          {
            number: 1,
            title: "Groups of Stative Verbs",
            desc: "Most stative verbs belong to one of these groups.",
            tableHead: ["Group", "Verbs", "Example"],
            table: [
              ["Thoughts", "know, believe, understand, remember, forget", "I understand the lesson."],
              ["Feelings", "like, love, hate, want, need, prefer", "He wants some water."],
              ["Possession", "have, own, belong, possess", "She owns two cars."],
              ["Senses / appearance", "see, hear, seem, appear, smell", "It seems easy."],
              ["Other states", "be, cost, mean, exist, contain", "The book costs $10."]
            ]
          },
          {
            number: 2,
            title: "No Continuous Form",
            desc: "Use the <strong>simple</strong> tense with stative verbs, even when the state is happening now.",
            examples: ["✗ I am knowing the answer. → ✓ I <strong>know</strong> the answer.", "✗ She is wanting a coffee. → ✓ She <strong>wants</strong> a coffee."]
          },
          {
            number: 3,
            title: "Verbs With Two Meanings",
            desc: "Some verbs are stative with one meaning and active (dynamic) with another. Only the active meaning can be continuous.",
            tableHead: ["Stative meaning", "Active meaning"],
            table: [
              ["I <strong>have</strong> a car. (possession)", "I <strong>am having</strong> lunch. (eating)"],
              ["I <strong>think</strong> it is good. (opinion)", "I <strong>am thinking</strong> about my trip. (mental process)"],
              ["The soup <strong>tastes</strong> great. (quality)", "He <strong>is tasting</strong> the soup. (action)"]
            ]
          }
        ],
        commonMistakes: [
          ["I am knowing the answer.", "I know the answer."],
          ["She is wanting a coffee.", "She wants a coffee."],
          ["I am understanding the lesson.", "I understand the lesson."]
        ],
        memoryTipsTitle: "Important Notes — Stative Verbs",
        memoryTips: [
          "Stative verbs describe <strong>states</strong>: thoughts, feelings, possession, senses.",
          "Do not use them in the <strong>continuous</strong>: <em>I know</em>, not <em>I am knowing</em>.",
          "<em>Have, think, see, taste</em> can be active with a different meaning."
        ]
      }
    ]
  };

  /* Practice quiz de Stative Verbs. */
  GRAMMAR_CONTENT.stativeverbs.practice = [
    {
      id: "stativeverbs-quiz",
      short: "Stative Verbs",
      type: "mc",
      title: "Quiz — Stative Verbs",
      instructions: "Choose the best answer (A, B, C, or D).",
      questions: [
        { text: "Which verb is stative?", options: ["run", "know", "jump", "cook"], correct: 1, explain: "\"Know\" describes a mental state." },
        { text: "I _____ the answer.", options: ["am knowing", "know", "knowing", "am know"], correct: 1, explain: "Stative verbs do not use the continuous." },
        { text: "She _____ a new phone. (possession)", options: ["is having", "has", "having", "have"], correct: 1, explain: "\"Have\" for possession is stative." },
        { text: "Which sentence is correct?", options: ["He is wanting a sandwich.", "He wants a sandwich.", "He is want a sandwich.", "He wanting a sandwich."], correct: 1, explain: "\"Want\" is stative." },
        { text: "We _____ lunch right now. (eating)", options: ["have", "are having", "has", "having"], correct: 1, explain: "\"Have lunch\" is an action, so the continuous is possible." },
        { text: "This bag _____ to my sister.", options: ["is belonging", "belongs", "belonging", "belong"], correct: 1, explain: "\"Belong\" is stative." },
        { text: "I _____ you are right. (opinion)", options: ["am thinking", "think", "thinking", "thinks"], correct: 1, explain: "\"Think\" for opinions is stative." },
        { text: "The soup _____ delicious.", options: ["is smelling", "smelling", "smells", "smell"], correct: 2, explain: "\"Smells\" describes a quality (state)." }
      ]
    }
  ];

  GRAMMAR_CONTENT.dynamicverbs = {
    label: "Dynamic Verbs",
    eyebrowPrefix: "Verb System · Main Verbs",
    definitionTitle: "Dynamic Verbs",
    definition: "<strong>Dynamic verbs</strong> (also called <strong>action verbs</strong> in a wider sense) describe actions, processes, and events that <strong>happen and can change or finish</strong>. Unlike stative verbs, they can be used in <strong>continuous</strong> tenses and in <strong>commands</strong>.",
    definitionExamples: [
      "She <strong>is learning</strong> French.",
      "They <strong>built</strong> a bridge.",
      "<strong>Open</strong> your books.",
      "The children <strong>are playing</strong> outside."
    ],
    modules: [
      {
        title: "Dynamic Verbs",
        objectives: ["Recognize dynamic verbs.", "Use dynamic verbs in the continuous and imperative.", "Compare dynamic and stative verbs."],
        rules: [
          {
            number: 1,
            title: "Dynamic or Stative? Quick Test",
            desc: "A verb is <strong>dynamic</strong> if it passes these tests.",
            tableHead: ["Test", "Dynamic verb", "Stative verb"],
            table: [
              ["Can it be continuous?", "I am studying. ✓", "I am knowing. ✗"],
              ["Can it be a command?", "Run! ✓", "Know! ✗"],
              ["Does it answer \"What is he doing?\"", "He is cooking. ✓", "He is liking. ✗"]
            ]
          },
          {
            number: 2,
            title: "Common Dynamic Verbs",
            desc: "These verbs describe actions that happen over time or at a moment.",
            tableHead: ["Group", "Verbs", "Example"],
            table: [
              ["Activities", "play, study, work, cook, travel", "He is working today."],
              ["Processes", "learn, grow, improve, change", "Her English is improving."],
              ["Momentary actions", "knock, jump, drop, arrive", "She dropped her keys."]
            ]
          },
          {
            number: 3,
            title: "Dynamic Use of Stative Verbs",
            desc: "Some stative verbs become dynamic when they describe an action.",
            examples: [
              "She <strong>is being</strong> very kind today. (behaving)",
              "We <strong>are having</strong> a party. (organizing / holding)",
              "He <strong>is seeing</strong> a doctor. (visiting)"
            ]
          }
        ],
        commonMistakes: [
          ["I am knowing him.", "I know him."],
          ["She learn English now.", "She is learning English now."],
          ["They playing soccer.", "They are playing soccer."]
        ],
        memoryTipsTitle: "Important Notes — Dynamic Verbs",
        memoryTips: [
          "Dynamic verbs show <strong>actions or processes</strong>.",
          "They can be <strong>continuous</strong>: <em>I am learning.</em>",
          "They can be used in <strong>commands</strong>: <em>Listen carefully.</em>",
          "Stative verbs can become dynamic with a different meaning."
        ]
      }
    ]
  };

  /* Practice quiz de Dynamic Verbs. */
  GRAMMAR_CONTENT.dynamicverbs.practice = [
    {
      id: "dynamicverbs-quiz",
      short: "Dynamic Verbs",
      type: "mc",
      title: "Quiz — Dynamic Verbs",
      instructions: "Choose the best answer (A, B, C, or D).",
      questions: [
        { text: "Which verb is dynamic?", options: ["own", "know", "learn", "belong"], correct: 2, explain: "\"Learn\" is a process." },
        { text: "Right now, the students _____ for the exam.", options: ["study", "are studying", "studies", "studying"], correct: 1, explain: "Dynamic verbs can be continuous." },
        { text: "Which verb can be used as a command?", options: ["know", "belong", "run", "own"], correct: 2, explain: "Dynamic verbs can be commands: Run!" },
        { text: "Her English _____ every month.", options: ["is improving", "improving", "improve", "are improving"], correct: 0, explain: "\"Improve\" is a dynamic process." },
        { text: "We _____ a party on Saturday.", options: ["have", "are having", "has", "having"], correct: 1, explain: "\"Have a party\" is dynamic." },
        { text: "Which test shows a verb is dynamic?", options: ["It cannot be continuous.", "It can be used in a command.", "It describes only possession.", "It never changes."], correct: 1, explain: "Dynamic verbs can be commands." },
        { text: "He _____ very kind today. (acting kind)", options: ["is being", "is", "being", "be"], correct: 0, explain: "\"Be\" is dynamic when it means \"behave\"." },
        { text: "They _____ a bridge now.", options: ["build", "are building", "builds", "built"], correct: 1, explain: "\"Now\" + dynamic verb = present continuous." }
      ]
    }
  ];

  GRAMMAR_CONTENT.regularverbs = {
    label: "Regular Verbs",
    eyebrowPrefix: "Verb System · Main Verbs",
    definitionTitle: "Regular Verbs",
    definition: "<strong>Regular verbs</strong> form the <strong>past simple</strong> and the <strong>past participle</strong> by adding <strong>-ed</strong> (or -d) to the base form.",
    definitionExamples: [
      "work → <strong>worked</strong> → <strong>worked</strong>",
      "live → <strong>lived</strong> → <strong>lived</strong>",
      "study → <strong>studied</strong> → <strong>studied</strong>",
      "stop → <strong>stopped</strong> → <strong>stopped</strong>"
    ],
    modules: [
      {
        title: "Regular Verbs",
        objectives: ["Form the past simple and past participle of regular verbs.", "Apply the spelling rules for -ed.", "Pronounce -ed endings: /t/, /d/, /ɪd/."],
        rules: [
          {
            number: 1,
            title: "Spelling Rules for -ed",
            desc: "Most regular verbs add <strong>-ed</strong>, but some change a little.",
            tableHead: ["Rule", "Base → Past", "Example"],
            table: [
              ["Most verbs: add -ed", "work → worked", "She worked yesterday."],
              ["Ends in -e: add -d", "live → lived", "They lived in Spain."],
              ["Consonant + y: change y to -ied", "study → studied", "He studied all night."],
              ["Vowel + y: add -ed", "play → played", "We played soccer."],
              ["One syllable, consonant-vowel-consonant: double the last letter", "stop → stopped", "The bus stopped."]
            ]
          },
          {
            number: 2,
            title: "Pronunciation of -ed",
            desc: "The ending <strong>-ed</strong> has three sounds.",
            tableHead: ["Sound", "After…", "Examples"],
            table: [
              ["/t/", "voiceless sounds (p, k, f, s, sh, ch)", "worked, helped, washed"],
              ["/d/", "voiced sounds and vowels", "played, cleaned, called"],
              ["/ɪd/", "t or d", "wanted, needed, decided"]
            ]
          },
          {
            number: 3,
            title: "Using Regular Verbs",
            desc: "The same form is used for the <strong>past simple</strong> and for the <strong>past participle</strong> (perfect tenses and passive).",
            examples: [
              "Past simple: I <strong>visited</strong> my grandmother yesterday.",
              "Present perfect: I <strong>have visited</strong> Paris twice.",
              "Passive: The room was <strong>cleaned</strong> this morning."
            ]
          }
        ],
        commonMistakes: [
          ["He studyed last night.", "He studied last night."],
          ["She stoped the car.", "She stopped the car."],
          ["They liveed in Mexico.", "They lived in Mexico."]
        ],
        memoryTipsTitle: "Important Notes — Regular Verbs",
        memoryTips: [
          "Regular verbs: base + <strong>-ed</strong> for the past simple <strong>and</strong> the past participle.",
          "Consonant + y → <strong>-ied</strong>; vowel + y → <strong>-ed</strong>.",
          "Double the final consonant in short CVC verbs: <em>stop → stopped</em>.",
          "The ending sounds /t/, /d/ or /ɪd/."
        ]
      }
    ]
  };

  /* Practice quiz de Regular Verbs. */
  GRAMMAR_CONTENT.regularverbs.practice = [
    {
      id: "regularverbs-quiz",
      short: "Regular Verbs",
      type: "mc",
      title: "Quiz — Regular Verbs",
      instructions: "Choose the best answer (A, B, C, or D).",
      questions: [
        { text: "The past simple of \"walk\" is _____.", options: ["walken", "walked", "walks", "walking"], correct: 1, explain: "Add -ed." },
        { text: "The past simple of \"study\" is _____.", options: ["studyed", "studied", "studdied", "studyd"], correct: 1, explain: "Consonant + y → -ied." },
        { text: "The past simple of \"stop\" is _____.", options: ["stoped", "stopt", "stopped", "stoping"], correct: 2, explain: "Double the final consonant." },
        { text: "The past simple of \"play\" is _____.", options: ["playd", "plaied", "playied", "played"], correct: 3, explain: "Vowel + y: just add -ed." },
        { text: "Which verb is regular?", options: ["go", "buy", "visit", "eat"], correct: 2, explain: "\"Visit\" → \"visited\"." },
        { text: "How do we pronounce -ed in \"wanted\"?", options: ["/t/", "/d/", "/ɪd/", "It is silent"], correct: 2, explain: "After t or d it is /ɪd/." },
        { text: "She has _____ in this city for ten years.", options: ["live", "lived", "lives", "living"], correct: 1, explain: "Past participle of a regular verb." },
        { text: "The past simple of \"live\" is _____.", options: ["lived", "liveed", "lifed", "livd"], correct: 0, explain: "Verbs ending in -e add only -d." }
      ]
    }
  ];

  GRAMMAR_CONTENT.irregularverbs = {
    label: "Irregular Verbs",
    eyebrowPrefix: "Verb System · Main Verbs",
    definitionTitle: "Irregular Verbs",
    definition: "<strong>Irregular verbs</strong> do not form the past simple and the past participle with <strong>-ed</strong>. Their forms change in different ways and must be <strong>learned</strong>.",
    definitionExamples: [
      "go → <strong>went</strong> → <strong>gone</strong>",
      "eat → <strong>ate</strong> → <strong>eaten</strong>",
      "buy → <strong>bought</strong> → <strong>bought</strong>",
      "put → <strong>put</strong> → <strong>put</strong>"
    ],
    modules: [
      {
        title: "Irregular Verbs",
        objectives: [
          "Know the three forms of common irregular verbs.",
          "Recognize patterns that make them easier to learn.",
          "Use the right form in the past simple and in perfect tenses."
        ],
        rules: [
          {
            number: 1,
            title: "Common Irregular Verbs",
            desc: "The three forms: <strong>base form</strong>, <strong>past simple</strong>, and <strong>past participle</strong>.",
            tableHead: ["Base", "Past simple", "Past participle"],
            table: [
              ["be", "was / were", "been"],
              ["do", "did", "done"],
              ["go", "went", "gone"],
              ["have", "had", "had"],
              ["see", "saw", "seen"],
              ["take", "took", "taken"],
              ["give", "gave", "given"],
              ["write", "wrote", "written"],
              ["eat", "ate", "eaten"],
              ["buy", "bought", "bought"],
              ["bring", "brought", "brought"],
              ["think", "thought", "thought"],
              ["make", "made", "made"],
              ["say", "said", "said"],
              ["come", "came", "come"],
              ["run", "ran", "run"]
            ]
          },
          {
            number: 2,
            title: "Patterns",
            desc: "Grouping verbs by pattern makes them easier to remember.",
            tableHead: ["Pattern", "Verbs"],
            table: [
              ["All three forms are the same", "put – put – put, cut – cut – cut, let – let – let, hit – hit – hit"],
              ["Past simple = past participle", "buy – bought – bought, teach – taught – taught, make – made – made"],
              ["All three forms are different", "sing – sang – sung, begin – began – begun, speak – spoke – spoken"]
            ]
          },
          {
            number: 3,
            title: "Using Irregular Verbs",
            desc: "Use the <strong>past simple</strong> form for finished past actions and the <strong>past participle</strong> after <em>have / has / had</em> and in the passive.",
            examples: [
              "Past simple: She <strong>wrote</strong> an email yesterday.",
              "Present perfect: She <strong>has written</strong> three emails today.",
              "Passive: The window was <strong>broken</strong>."
            ],
            tip: "Never add <em>-ed</em> to an irregular verb: <em>goed, buyed, taked</em> do not exist."
          }
        ],
        commonMistakes: [
          ["I goed to the party.", "I went to the party."],
          ["She has wrote a letter.", "She has written a letter."],
          ["We buyed new shoes.", "We bought new shoes."],
          ["They have saw that movie.", "They have seen that movie."]
        ],
        memoryTipsTitle: "Important Notes — Irregular Verbs",
        memoryTips: [
          "Irregular verbs do <strong>not</strong> take -ed: <em>go – went – gone</em>.",
          "The past simple and the past participle can be different forms.",
          "After <em>have / has / had</em> use the <strong>past participle</strong>.",
          "Learn them in groups and practice them often."
        ]
      }
    ]
  };

  /* Practice quiz de Irregular Verbs. */
  GRAMMAR_CONTENT.irregularverbs.practice = [
    {
      id: "irregularverbs-quiz",
      short: "Irregular Verbs",
      type: "mc",
      title: "Quiz — Irregular Verbs",
      instructions: "Choose the best answer (A, B, C, or D).",
      questions: [
        { text: "The past simple of \"go\" is _____.", options: ["goed", "went", "gone", "going"], correct: 1, explain: "go – went – gone." },
        { text: "The past participle of \"eat\" is _____.", options: ["ate", "eated", "eaten", "eats"], correct: 2, explain: "eat – ate – eaten." },
        { text: "Yesterday I _____ a new phone.", options: ["buyed", "bought", "buy", "buys"], correct: 1, explain: "buy – bought – bought." },
        { text: "She has _____ a beautiful poem.", options: ["wrote", "written", "writes", "writed"], correct: 1, explain: "Present perfect needs the past participle." },
        { text: "Which verb has the same form in all three tenses?", options: ["put", "take", "give", "see"], correct: 0, explain: "put – put – put." },
        { text: "They have _____ that film twice.", options: ["saw", "seen", "seed", "see"], correct: 1, explain: "see – saw – seen." },
        { text: "He _____ to school by bus last year.", options: ["go", "gone", "went", "goes"], correct: 2, explain: "Past simple of \"go\"." },
        { text: "Which sentence is correct?", options: ["We taked a taxi.", "We took a taxi.", "We taken a taxi.", "We take-ed a taxi."], correct: 1, explain: "take – took – taken." }
      ]
    }
  ];

  GRAMMAR_CONTENT.transitiveverbs = {
    label: "Transitive Verbs",
    eyebrowPrefix: "Verb System · Main Verbs",
    definitionTitle: "Transitive Verbs",
    definition: "A <strong>transitive verb</strong> needs a <strong>direct object</strong> to complete its meaning. The direct object answers the question <strong>\"What?\"</strong> or <strong>\"Whom?\"</strong> after the verb.",
    definitionExamples: [
      "She <strong>bought</strong> a laptop.",
      "I <strong>need</strong> your help.",
      "They <strong>invited</strong> us.",
      "He <strong>sent</strong> me an email."
    ],
    modules: [
      {
        title: "Transitive Verbs",
        objectives: ["Identify the direct object of a verb.", "Recognize verbs that always need an object.", "Use verbs with two objects (indirect + direct)."],
        rules: [
          {
            number: 1,
            title: "Subject + Verb + Direct Object",
            desc: "Without the object, the sentence is incomplete.",
            structure: "Subject + transitive verb + direct object",
            tableHead: ["Sentence", "Verb", "Direct object"],
            table: [
              ["She bought a laptop.", "bought", "a laptop"],
              ["I need your help.", "need", "your help"],
              ["They invited us.", "invited", "us"]
            ],
            tip: "Ask <em>What?</em> or <em>Whom?</em> after the verb. If there is an answer, the verb is transitive."
          },
          {
            number: 2,
            title: "Verbs That Always Need an Object",
            desc: "These verbs are almost always transitive.",
            tableHead: ["Verb", "Correct", "Incorrect"],
            table: [
              ["need", "I need a pen.", "I need."],
              ["like", "We like pizza.", "We like."],
              ["make", "He makes dinner.", "He makes."],
              ["bring", "Bring your book.", "Bring."]
            ]
          },
          {
            number: 3,
            title: "Two Objects",
            desc: "Some transitive verbs (<strong>give, send, show, tell, buy, bring</strong>) can have an <strong>indirect object</strong> (the receiver) and a <strong>direct object</strong> (the thing).",
            examples: [
              "She gave <strong>me</strong> (indirect) <strong>a gift</strong> (direct).",
              "She gave <strong>a gift</strong> (direct) <strong>to me</strong> (indirect)."
            ]
          }
        ],
        commonMistakes: [
          ["I need.", "I need a pen."],
          ["She bought yesterday.", "She bought a dress yesterday."],
          ["My brother makes.", "My brother makes dinner."]
        ],
        memoryTipsTitle: "Important Notes — Transitive Verbs",
        memoryTips: [
          "Transitive verbs need a <strong>direct object</strong>.",
          "Ask <strong>What?</strong> or <strong>Whom?</strong> after the verb.",
          "<em>Give, send, show, tell</em> can take two objects.",
          "Many verbs can be both transitive and intransitive."
        ]
      }
    ]
  };

  /* Practice quiz de Transitive Verbs. */
  GRAMMAR_CONTENT.transitiveverbs.practice = [
    {
      id: "transitiveverbs-quiz",
      short: "Transitive Verbs",
      type: "mc",
      title: "Quiz — Transitive Verbs",
      instructions: "Choose the best answer (A, B, C, or D).",
      questions: [
        { text: "Which sentence has a transitive verb?", options: ["The baby sleeps.", "She reads a novel.", "They arrived late.", "He laughed."], correct: 1, explain: "\"A novel\" is the direct object." },
        { text: "In \"I need your help\", the direct object is _____.", options: ["I", "need", "your help", "None"], correct: 2, explain: "What do I need? Your help." },
        { text: "Which sentence is complete?", options: ["She bought.", "She bought a jacket.", "She makes.", "We like."], correct: 1, explain: "Transitive verbs need an object." },
        { text: "Which verb is transitive?", options: ["arrive", "sleep", "bring", "go"], correct: 2, explain: "You bring something." },
        { text: "He gave _____ a present.", options: ["I", "my", "me", "mine"], correct: 2, explain: "Object pronoun \"me\"." },
        { text: "Which question finds the direct object?", options: ["Where?", "When?", "What?", "Why?"], correct: 2, explain: "Direct object = what / whom." },
        { text: "They invited _____ to the party.", options: ["we", "us", "our", "ours"], correct: 1, explain: "Object pronoun \"us\"." },
        { text: "In \"She sent him a message\", the indirect object is _____.", options: ["She", "sent", "him", "a message"], correct: 2, explain: "\"Him\" is the receiver." }
      ]
    }
  ];

  GRAMMAR_CONTENT.intransitiveverbs = {
    label: "Intransitive Verbs",
    eyebrowPrefix: "Verb System · Main Verbs",
    definitionTitle: "Intransitive Verbs",
    definition: "An <strong>intransitive verb</strong> does <strong>not</strong> need a direct object. The sentence is complete with the subject and the verb. It can be followed by adverbs or prepositional phrases.",
    definitionExamples: [
      "The baby <strong>sleeps</strong>.",
      "We <strong>arrived</strong> late.",
      "She <strong>smiled</strong>.",
      "The accident <strong>happened</strong> yesterday."
    ],
    modules: [
      {
        title: "Intransitive Verbs",
        objectives: ["Identify intransitive verbs.", "Use the correct preposition after them.", "Know that intransitive verbs cannot be used in the passive."],
        rules: [
          {
            number: 1,
            title: "Subject + Verb",
            desc: "The action stays with the subject. We cannot ask <em>What?</em> after the verb.",
            structure: "Subject + intransitive verb (+ adverb / prepositional phrase)",
            tableHead: ["Verb", "Example"],
            table: [
              ["arrive", "The train arrived on time."],
              ["sleep", "The baby is sleeping."],
              ["happen", "The accident happened last night."],
              ["laugh", "Everyone laughed."],
              ["go / come", "She went to the market."]
            ]
          },
          {
            number: 2,
            title: "Prepositions After Intransitive Verbs",
            desc: "To add a place or a person we need a <strong>preposition</strong>.",
            tableHead: ["Incorrect", "Correct"],
            table: [
              ["She arrived the airport.", "She arrived <strong>at</strong> the airport."],
              ["I went the market.", "I went <strong>to</strong> the market."],
              ["He laughed me.", "He laughed <strong>at</strong> me."]
            ]
          },
          {
            number: 3,
            title: "Transitive or Intransitive?",
            desc: "Many verbs can be both. Check if there is an object.",
            tableHead: ["Intransitive", "Transitive"],
            table: [
              ["He runs every morning.", "He runs a small company."],
              ["She reads at night.", "She reads novels."],
              ["The door opened.", "She opened the door."]
            ],
            tip: "Intransitive verbs <strong>cannot be used in the passive</strong>: <em>The accident happened</em> (not <em>was happened</em>)."
          }
        ],
        commonMistakes: [
          ["The accident was happened.", "The accident happened."],
          ["She arrived the airport.", "She arrived at the airport."],
          ["I went the market.", "I went to the market."]
        ],
        memoryTipsTitle: "Important Notes — Intransitive Verbs",
        memoryTips: [
          "Intransitive verbs have <strong>no direct object</strong>.",
          "Use a <strong>preposition</strong> before a place: <em>arrive at, go to</em>.",
          "They are <strong>not</strong> used in the passive voice.",
          "Some verbs are both: <em>run, read, open, play</em>."
        ]
      }
    ]
  };

  /* Practice quiz de Intransitive Verbs. */
  GRAMMAR_CONTENT.intransitiveverbs.practice = [
    {
      id: "intransitiveverbs-quiz",
      short: "Intransitive Verbs",
      type: "mc",
      title: "Quiz — Intransitive Verbs",
      instructions: "Choose the best answer (A, B, C, or D).",
      questions: [
        { text: "Which verb is intransitive?", options: ["bring", "make", "arrive", "buy"], correct: 2, explain: "You do not \"arrive something\"." },
        { text: "She arrived _____ the airport at six.", options: ["to", "at", "on", "—"], correct: 1, explain: "Arrive at + place." },
        { text: "Which sentence is correct?", options: ["The meeting was happened.", "The meeting happened.", "The meeting happen.", "The meeting was happen."], correct: 1, explain: "No passive with intransitive verbs." },
        { text: "Which sentence has an intransitive verb?", options: ["He opened the door.", "She smiled.", "They bought a car.", "I need a pen."], correct: 1, explain: "\"Smiled\" has no object." },
        { text: "I went _____ the supermarket yesterday.", options: ["—", "to", "at", "on"], correct: 1, explain: "Go to + place." },
        { text: "In \"The door opened\", \"opened\" is _____.", options: ["transitive", "intransitive", "modal", "auxiliary"], correct: 1, explain: "No direct object." },
        { text: "Which verb can be both transitive and intransitive?", options: ["arrive", "run", "happen", "die"], correct: 1, explain: "He runs / He runs a company." },
        { text: "The children _____ in the garden.", options: ["plays", "are playing", "plays them", "play them"], correct: 1, explain: "Intransitive use of \"play\"." }
      ]
    }
  ];

