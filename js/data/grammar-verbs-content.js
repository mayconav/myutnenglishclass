"use strict";
/* Contenido de gramatica: VERBS ("The Verb in English — Complete Guide for A2–B1 Students").
   Se registra en GRAMMAR_CONTENT.verbs, asi que desbloquea automaticamente el tema
   "Verbs" del menu (partials/recursos.html, data-topic="verbs").

   Campos opcionales que este tema usa y que renderiza js/app/grammar-render.js:
     rule.tableHead / rule.table2Head  -> encabezados de tabla (por defecto Singular / Plural)
     mod.quickReferenceHead            -> encabezados de la tabla de referencia rapida
     mod.memoryTipsTitle               -> titulo de la lista final (por defecto "Memory Tips") */

  GRAMMAR_CONTENT.verbs = {
    label: "Verbs",
    definitionTitle: "What Is a Verb?",
    definition: "A verb is a word that expresses an action, event, process, condition, or state of being. It is normally one of the most important elements of an English sentence because it tells us what the subject does, what happens, or what state the subject is in.",
    definitionExamples: [
      "I <strong>work</strong> at a university.",
      "She <strong>studies</strong> English.",
      "They <strong>played</strong> soccer yesterday.",
      "He <strong>is</strong> tired.",
      "We <strong>have</strong> a problem.",
      "The students <strong>learn</strong> quickly."
    ],
    modules: [

      /* ---------- 1. Types of verbs (guide sections 1-7) ---------- */
      {
        title: "What Is a Verb? Main Types of Verbs",
        objectives: [
          "Identify the verb in a sentence and explain what it tells us.",
          "Classify verbs as action, stative, linking, auxiliary, or modal.",
          "Distinguish a main verb from an auxiliary verb in the same sentence."
        ],
        rules: [
          {
            number: 1,
            title: "Basic Sentence Structure",
            desc: "The verb tells us what the subject does, what happens, or what state the subject is in.",
            structure: "Subject + Verb + Complement",
            examples: [
              "<strong>Maria</strong> (subject) <strong>studies</strong> (verb) English (complement).",
              "I <strong>work</strong> at a university.",
              "They <strong>played</strong> soccer yesterday.",
              "He <strong>is</strong> tired.",
              "We <strong>have</strong> a problem."
            ]
          },
          {
            number: 2,
            title: "Main Types of Verbs",
            desc: "English verbs can be classified in several ways.",
            tableHead: ["Type", "Examples"],
            table: [
              ["Action verbs", "run, write, eat, study"],
              ["Stative verbs", "know, like, believe, understand"],
              ["Linking verbs", "be, seem, become"],
              ["Auxiliary verbs", "be, do, have"],
              ["Modal verbs", "can, should, must"],
              ["Transitive verbs", "buy, read, make"],
              ["Intransitive verbs", "arrive, sleep, laugh"],
              ["Regular verbs", "work → worked"],
              ["Irregular verbs", "go → went → gone"],
              ["Phrasal verbs", "wake up, turn off"]
            ],
            tip: "A verb can belong to more than one category. For example, <strong>write</strong> = action + transitive + irregular."
          },
          {
            number: 3,
            title: "Action Verbs",
            desc: "Describe something that a person, animal, or thing does. Examples: <strong>run, walk, eat, drink, write, read, speak, study, work, drive, play, open, close, build, create</strong>.",
            examples: [
              "Students <strong>study</strong> English.",
              "She <strong>writes</strong> emails.",
              "They <strong>play</strong> soccer.",
              "He <strong>drives</strong> to work."
            ]
          },
          {
            number: 4,
            title: "Stative Verbs",
            desc: "Describe a state, rather than a physical action. They commonly express thoughts, feelings, possession, opinions, senses, and relationships.",
            tableHead: ["Category", "Common stative verbs"],
            table: [
              ["Mental states", "know, understand, believe, remember, forget, mean, think*"],
              ["Feelings", "like, love, hate, prefer, want, need"],
              ["Possession", "have, own, belong"],
              ["Senses", "smell, taste, hear, see"]
            ],
            examples: [
              "I <strong>think</strong> he is right. <em>(= have an opinion → stative)</em>",
              "I am <strong>thinking</strong> about the problem. <em>(= active mental process → dynamic)</em>"
            ],
            tip: "*Some verbs can be stative or dynamic depending on their meaning, like <strong>think</strong> in the examples above."
          },
          {
            number: 5,
            title: "Linking Verbs",
            desc: "A linking verb connects the subject with information that describes or identifies it. The most important one is <strong>BE</strong> (am, is, are, was, were, be, been, being). Other common linking verbs: <strong>seem, become, appear, feel, look, sound, smell, taste, remain</strong>.",
            examples: [
              "She <strong>is</strong> a teacher.",
              "They <strong>are</strong> tired.",
              "I <strong>am</strong> Mexican.",
              "The food <strong>smells</strong> good.",
              "She <strong>looks</strong> tired.",
              "He <strong>became</strong> angry."
            ]
          },
          {
            number: 6,
            title: "Auxiliary Verbs",
            desc: "Auxiliary verbs are also called <strong>helping verbs</strong>. The three main auxiliary verbs are BE, HAVE, and DO.",
            tableHead: ["Verb", "Used for", "Examples"],
            table: [
              ["BE", "continuous tenses, passive voice", "She is studying. · The computer was repaired."],
              ["HAVE", "perfect tenses", "I have finished. · She has worked here for five years."],
              ["DO", "questions, negative sentences, emphasis", "Do you speak English? · I don't understand. · I do like this movie!"]
            ]
          },
          {
            number: 7,
            title: "Main Verbs vs. Auxiliary Verbs",
            desc: "In many sentences, an auxiliary verb and a main verb work together.",
            examples: [
              "She <strong>is</strong> studying English. → <em>is</em> = auxiliary verb; <em>studying</em> = main verb",
              "They <strong>have</strong> finished the project. → <em>have</em> = auxiliary verb; <em>finished</em> = main verb"
            ]
          }
        ]
      },

      /* ---------- 2. Modal verbs (sections 8-9) ---------- */
      {
        title: "Modal Verbs",
        objectives: [
          "Recognize the main modal verbs and what each one expresses.",
          "Use the pattern subject + modal + base verb correctly.",
          "Avoid common mistakes such as “can speaks” or “must to”."
        ],
        rules: [
          {
            number: 1,
            title: "The Main Modal Verbs",
            desc: "Modal verbs express ideas such as ability, possibility, permission, obligation, advice, necessity, and probability.",
            tableHead: ["Modal", "Common meaning"],
            table: [
              ["can", "ability / permission"],
              ["could", "past ability / possibility / polite request"],
              ["may", "possibility / permission"],
              ["might", "possibility"],
              ["must", "strong obligation / deduction"],
              ["should", "advice / expectation"],
              ["will", "future / willingness"],
              ["would", "hypothetical / polite request"],
              ["shall", "suggestion / formal future"]
            ],
            examples: [
              "I <strong>can</strong> speak English.",
              "You <strong>should</strong> study.",
              "We <strong>must</strong> finish the project.",
              "It <strong>might</strong> rain.",
              "<strong>Could</strong> you help me?"
            ]
          },
          {
            number: 2,
            title: "The Special Rule for Modal Verbs",
            desc: "After a modal verb, always use the <strong>base form</strong> of the verb.",
            structure: "Subject + modal + base verb",
            examples: [
              "She can <strong>speak</strong> English.",
              "He should <strong>study</strong> more.",
              "They must <strong>finish</strong> today."
            ]
          }
        ],
        commonMistakes: [
          ["She can speaks English.", "She can speak English."],
          ["He should studies.", "He should study."],
          ["They must to finish.", "They must finish."]
        ]
      },

      /* ---------- 3. Verb forms (sections 10-13) ---------- */
      {
        title: "Verb Forms: Regular and Irregular Verbs",
        objectives: [
          "Recognize the five important forms of an English verb.",
          "Form the past simple and past participle of regular verbs, including spelling changes.",
          "Remember that irregular verbs must be learned individually."
        ],
        rules: [
          {
            number: 1,
            title: "Verb Forms",
            desc: "Most English verbs can appear in several forms. Compare a regular verb (<strong>work</strong>) with an irregular verb (<strong>go</strong>).",
            tableHead: ["Form", "work (regular)", "go (irregular)"],
            table: [
              ["Base form", "work", "go"],
              ["3rd person singular", "works", "goes"],
              ["Past simple", "worked", "went"],
              ["Past participle", "worked", "gone"],
              ["-ing form", "working", "going"]
            ]
          },
          {
            number: 2,
            title: "The Five Important Verb Forms",
            desc: "A useful system for students:",
            tableHead: ["#", "Form", "Examples"],
            table: [
              ["1", "Base form", "work, go, study, eat"],
              ["2", "Third-person singular", "works, goes, studies, eats"],
              ["3", "Past simple", "worked, went, studied, ate"],
              ["4", "Past participle", "worked, gone, studied, eaten"],
              ["5", "Present participle / -ing form", "working, going, studying, eating"]
            ]
          },
          {
            number: 3,
            title: "Regular Verbs",
            desc: "Regular verbs form the past simple and past participle mainly with <strong>-ed</strong>.",
            tableHead: ["Base", "Past simple", "Past participle"],
            table: [
              ["work", "worked", "worked"],
              ["play", "played", "played"],
              ["study", "studied", "studied"],
              ["watch", "watched", "watched"]
            ],
            table2Label: "Spelling rules:",
            table2Head: ["Verb ending", "Rule", "Example"],
            table2: [
              ["Most verbs", "add -ed", "work → worked"],
              ["Ending in -e", "add -d", "live → lived · love → loved"],
              ["Consonant + y", "change y → ied", "study → studied · carry → carried"],
              ["Vowel + y", "add -ed (no change)", "play → played"]
            ]
          },
          {
            number: 4,
            title: "Irregular Verbs",
            desc: "Irregular verbs don't follow the normal -ed pattern. They must generally be learned individually.",
            tableHead: ["Base", "Past", "Past Participle"],
            table: [
              ["go", "went", "gone"],
              ["eat", "ate", "eaten"],
              ["see", "saw", "seen"],
              ["write", "wrote", "written"],
              ["take", "took", "taken"],
              ["speak", "spoke", "spoken"],
              ["give", "gave", "given"],
              ["come", "came", "come"],
              ["make", "made", "made"],
              ["get", "got", "got / gotten"]
            ],
            tip: "You can find a much longer list of irregular verbs, grouped by pattern, in the <strong>Support Material</strong> section."
          }
        ]
      },

      /* ---------- 4. BE / HAVE / DO (sections 14-18) ---------- */
      {
        title: "The Verbs BE, HAVE and DO",
        objectives: [
          "Conjugate BE in the present and past.",
          "Form questions and negative sentences with BE without do/does/did.",
          "Tell apart HAVE and DO as main verbs and as auxiliaries."
        ],
        rules: [
          {
            number: 1,
            title: "The Verb BE",
            desc: "BE is one of the most important verbs in English.",
            tableHead: ["Subject", "Present", "Past"],
            table: [
              ["I", "am", "was"],
              ["You", "are", "were"],
              ["He", "is", "was"],
              ["She", "is", "was"],
              ["It", "is", "was"],
              ["We", "are", "were"],
              ["They", "are", "were"]
            ],
            examples: [
              "I <strong>am</strong> a teacher.",
              "She <strong>is</strong> happy.",
              "They <strong>are</strong> students."
            ]
          },
          {
            number: 2,
            title: "BE in Questions",
            desc: "With BE, we normally don't use <strong>do / does / did</strong>.",
            examples: [
              "<strong>Are</strong> you a student?",
              "<strong>Is</strong> she tired?",
              "<strong>Were</strong> they at school?"
            ]
          },
          {
            number: 3,
            title: "BE in Negative Sentences",
            desc: "Add <strong>not</strong> after BE.",
            structure: "BE + not",
            examples: [
              "I am <strong>not</strong> tired.",
              "She is <strong>not</strong> here.",
              "They are <strong>not</strong> students."
            ],
            table2Label: "Common contractions:",
            table2Head: ["Full form", "Contraction"],
            table2: [
              ["is not", "isn't"],
              ["are not", "aren't"],
              ["was not", "wasn't"],
              ["were not", "weren't"]
            ]
          },
          {
            number: 4,
            title: "The Verb HAVE",
            desc: "Have can be a main verb or an auxiliary.",
            tableHead: ["Use", "Examples"],
            table: [
              ["Main verb", "I have a car. · She has two brothers."],
              ["Auxiliary", "I have finished my homework. · She has studied English for three years."]
            ]
          },
          {
            number: 5,
            title: "The Verb DO",
            desc: "Do can also be a main verb or an auxiliary.",
            tableHead: ["Use", "Examples"],
            table: [
              ["Main verb", "I do my homework. · She does exercise every morning."],
              ["Auxiliary", "Do you like coffee? · She doesn't like coffee. · Did they finish?"]
            ]
          }
        ],
        commonMistakes: [
          ["Do you are a student?", "Are you a student?"],
          ["Does she is tired?", "Is she tired?"]
        ]
      },

      /* ---------- 5. Agreement (sections 19-20) ---------- */
      {
        title: "Subject–Verb Agreement",
        objectives: [
          "Add -s / -es to the verb with he, she, and it in the simple present.",
          "Apply the spelling rules for third-person singular verbs."
        ],
        rules: [
          {
            number: 1,
            title: "Agreement in the Simple Present",
            desc: "In the simple present, third-person singular subjects (he, she, it) require <strong>-s / -es</strong>.",
            tableHead: ["Subject", "Verb form", "Examples"],
            table: [
              ["I / You / We / They", "work", "I work. · They work."],
              ["He / She / It", "works", "He works. · She works. · It works."]
            ]
          },
          {
            number: 2,
            title: "Third-Person Spelling",
            desc: "Spelling changes depend on how the verb ends.",
            tableHead: ["Verb ending", "Rule", "Examples"],
            table: [
              ["Most verbs", "add -s", "work → works · read → reads"],
              ["-s, -sh, -ch, -x, -o", "usually add -es", "watch → watches · wash → washes · go → goes · fix → fixes"],
              ["Consonant + y", "change y → ies", "study → studies · try → tries"]
            ]
          }
        ],
        commonMistakes: [
          ["She work every day.", "She works every day."],
          ["He study English.", "He studies English."]
        ]
      },

      /* ---------- 6. Tenses (sections 21-30) ---------- */
      {
        title: "Verb Tenses",
        objectives: [
          "Understand how English tenses combine time and aspect.",
          "Form and use the main present, past, and future tenses.",
          "Choose between will, be going to, and the present continuous for the future."
        ],
        rules: [
          {
            number: 1,
            title: "Verbs and Tenses",
            desc: "English traditionally teaches <strong>12 major tense combinations</strong>. They can be organized around:",
            tableHead: ["Organized by", "Options"],
            table: [
              ["Time", "Present · Past · Future"],
              ["Aspect", "Simple · Continuous · Perfect · Perfect Continuous"]
            ]
          },
          {
            number: 2,
            title: "Present Simple",
            desc: "Used for routines, habits, facts, general truths, and permanent situations.",
            structure: "Subject + base verb  (he/she/it: verb + -s)",
            examples: [
              "I <strong>work</strong> at a university.",
              "She <strong>works</strong> at a university.",
              "I <strong>teach</strong> English.",
              "She usually <strong>studies</strong> at night.",
              "Water <strong>boils</strong> at 100°C."
            ]
          },
          {
            number: 3,
            title: "Present Continuous",
            desc: "Used for actions happening now, temporary situations, current activities, and changing situations.",
            structure: "Subject + am / is / are + verb-ing",
            examples: [
              "I <strong>am working</strong>.",
              "She <strong>is studying</strong>.",
              "They <strong>are playing</strong>.",
              "The students <strong>are taking</strong> an exam now."
            ]
          },
          {
            number: 4,
            title: "Past Simple",
            desc: "Used for completed actions in the past. Regular verbs use -ed; irregular verbs have their own past form.",
            structure: "Subject + past form",
            examples: [
              "I <strong>worked</strong> yesterday. <em>(regular)</em>",
              "She <strong>went</strong> home. <em>(irregular)</em>",
              "They <strong>ate</strong> dinner. <em>(irregular)</em>",
              "We <strong>visited</strong> the university yesterday."
            ]
          },
          {
            number: 5,
            title: "Past Continuous",
            desc: "Used for an action that was in progress at a particular time in the past.",
            structure: "was / were + verb-ing",
            examples: [
              "I <strong>was working</strong>.",
              "They <strong>were studying</strong>.",
              "At 8 p.m., I <strong>was preparing</strong> my class."
            ]
          },
          {
            number: 6,
            title: "Present Perfect",
            desc: "Common uses include experiences, recent events, actions connected to the present, and situations continuing to the present.",
            structure: "have / has + past participle",
            examples: [
              "I <strong>have finished</strong>.",
              "She <strong>has finished</strong>.",
              "I <strong>have visited</strong> Chicago.",
              "She <strong>has</strong> already <strong>finished</strong> her homework.",
              "They <strong>have lived</strong> here for five years."
            ]
          },
          {
            number: 7,
            title: "Past Perfect",
            desc: "Used for an action that happened <strong>before</strong> another past action.",
            structure: "had + past participle",
            examples: [
              "I <strong>had finished</strong>.",
              "She <strong>had left</strong>.",
              "When I arrived, she <strong>had</strong> already <strong>left</strong>."
            ]
          },
          {
            number: 8,
            title: "Future with WILL",
            desc: "Used for predictions, spontaneous decisions, promises, and offers.",
            structure: "will + base verb",
            examples: [
              "I <strong>will call</strong> you.",
              "She <strong>will arrive</strong> tomorrow.",
              "I <strong>will help</strong> you."
            ]
          },
          {
            number: 9,
            title: "BE GOING TO",
            desc: "Used especially for plans, intentions, and predictions based on evidence.",
            structure: "am / is / are + going to + base verb",
            examples: [
              "I <strong>am going to study</strong>.",
              "She <strong>is going to travel</strong>.",
              "Look at those clouds. It <strong>is going to rain</strong>."
            ]
          },
          {
            number: 10,
            title: "Present Continuous for Future Arrangements",
            desc: "The present continuous can describe a planned arrangement.",
            examples: [
              "I <strong>am meeting</strong> my students tomorrow.",
              "We <strong>are traveling</strong> next Friday."
            ]
          }
        ]
      },

      /* ---------- 7. Verbals & patterns (sections 31-35) ---------- */
      {
        title: "-ING Forms, Infinitives and Verb Patterns",
        objectives: [
          "Recognize the different uses of the -ing form.",
          "Form the infinitive and the bare infinitive.",
          "Know which verbs are followed by to + infinitive and which by -ing."
        ],
        rules: [
          {
            number: 1,
            title: "The -ING Form",
            desc: "The -ing form has several uses.",
            tableHead: ["Use", "Examples"],
            table: [
              ["Continuous tenses", "She is working."],
              ["Gerunds", "Swimming is good exercise."],
              ["After certain verbs", "I enjoy reading. · She likes cooking."]
            ]
          },
          {
            number: 2,
            title: "Infinitives",
            desc: "The basic infinitive: <strong>to work, to study, to learn, to speak, to write</strong>.",
            structure: "to + base verb",
            examples: [
              "I want <strong>to learn</strong> English.",
              "She decided <strong>to study</strong>."
            ]
          },
          {
            number: 3,
            title: "Bare Infinitive",
            desc: "Sometimes English uses the base verb without “to”.",
            tableHead: ["After…", "Examples"],
            table: [
              ["Modal verbs", "can go · should study · must leave"],
              ["Certain verbs", "Let me help you. · Make him stop."]
            ]
          },
          {
            number: 4,
            title: "Gerunds",
            desc: "A gerund can function like a noun.",
            structure: "verb + -ing",
            examples: [
              "<strong>Reading</strong> is important.",
              "I enjoy <strong>teaching</strong>.",
              "<strong>Learning</strong> English takes time."
            ]
          },
          {
            number: 5,
            title: "Verb Patterns",
            desc: "Some verbs are followed by <strong>to + infinitive</strong>. Others are commonly followed by <strong>-ing</strong>.",
            tableHead: ["Verb + to + infinitive", "Verb + -ing"],
            table: [
              ["want to", "enjoy"],
              ["need to", "avoid"],
              ["decide to", "finish"],
              ["hope to", "mind"],
              ["plan to", "suggest"],
              ["promise to", "consider"],
              ["learn to", "—"]
            ],
            examples: [
              "I want <strong>to improve</strong> my English.",
              "I enjoy <strong>teaching</strong>.",
              "She finished <strong>writing</strong> the report."
            ]
          }
        ]
      },

      /* ---------- 8. Transitive / intransitive / phrasal (sections 36-39) ---------- */
      {
        title: "Transitive, Intransitive and Phrasal Verbs",
        objectives: [
          "Tell whether a verb takes a direct object.",
          "Recognize phrasal verbs and use common ones in everyday English.",
          "Place the pronoun correctly with separable phrasal verbs."
        ],
        rules: [
          {
            number: 1,
            title: "Transitive Verbs",
            desc: "A transitive verb requires or commonly takes a <strong>direct object</strong>. The action passes from the subject to an object.",
            examples: [
              "She <strong>reads</strong> books.",
              "He <strong>bought</strong> a computer.",
              "They <strong>made</strong> a decision."
            ]
          },
          {
            number: 2,
            title: "Intransitive Verbs",
            desc: "An intransitive verb does not take a direct object. Examples: <strong>arrive, sleep, laugh, cry, happen, go, come</strong>.",
            examples: [
              "They <strong>arrived</strong>.",
              "The baby <strong>slept</strong>.",
              "Everyone <strong>laughed</strong>."
            ]
          },
          {
            number: 3,
            title: "Phrasal Verbs",
            desc: "A phrasal verb consists of a verb plus a particle, sometimes with an additional preposition. Examples: <strong>get up, wake up, sit down, turn on, turn off, look for, find out, give up, take off, put on</strong>. Phrasal verbs are extremely common in everyday English.",
            examples: [
              "I <strong>get up</strong> at 6:00.",
              "Please <strong>turn off</strong> the computer.",
              "She is <strong>looking for</strong> her keys."
            ]
          },
          {
            number: 4,
            title: "Separable Phrasal Verbs",
            desc: "Some phrasal verbs can separate the verb and the particle.",
            examples: [
              "Turn off the computer.",
              "Turn the computer off.",
              "Turn <strong>it</strong> off."
            ],
            tip: "With pronouns, separation is often required: say <strong>Turn it off</strong>, not <strong>Turn off it</strong>."
          }
        ],
        commonMistakes: [
          ["They arrived the airport.", "They arrived at the airport."],
          ["Turn off it.", "Turn it off."]
        ]
      },

      /* ---------- 9. Patterns, passive, errors, summary (sections 40-44 + master rules) ---------- */
      {
        title: "Sentence Patterns, Passive Voice and Common Errors",
        objectives: [
          "Use the base form after do / does / did.",
          "Recognize verb + object + complement patterns.",
          "Form the passive voice with BE + past participle.",
          "Avoid the most common verb errors made by learners."
        ],
        rules: [
          {
            number: 1,
            title: "The Golden Rule with DO / DID",
            desc: "When <strong>do, does, or did</strong> is the auxiliary in a question or negative sentence, the main verb returns to its <strong>base form</strong>. This is one of the most important rules for A2 learners.",
            tableHead: ["Sentence", "Correct", "Incorrect"],
            table: [
              ["Present", "Does she <strong>work</strong> here?", "❌ Does she works here?"],
              ["Past", "Did he <strong>go</strong> home?", "❌ Did he went home?"],
              ["Negative", "She didn't <strong>study</strong>.", "❌ She didn't studied."]
            ]
          },
          {
            number: 2,
            title: "Verb + Object + Complement",
            desc: "Some verbs can be followed by an object and additional information.",
            examples: [
              "They made <strong>him angry</strong>.",
              "The university appointed <strong>her director</strong>.",
              "We found <strong>the class interesting</strong>."
            ]
          },
          {
            number: 3,
            title: "Active and Passive Voice",
            desc: "In the <strong>active</strong> voice, the subject performs the action. In the <strong>passive</strong> voice, the subject receives the action.",
            structure: "Passive: BE + past participle",
            examples: [
              "<em>Active:</em> The students <strong>completed</strong> the project.",
              "<em>Passive:</em> The project <strong>was completed</strong> by the students.",
              "The computer <strong>was repaired</strong>.",
              "The reports <strong>are checked</strong> every week."
            ]
          }
        ],
        commonMistakes: [
          ["She work every day.", "She works every day."],
          ["He can speaks English.", "He can speak English."],
          ["Did you went?", "Did you go?"],
          ["She didn't studied.", "She didn't study."],
          ["I am agree.", "I agree."],
          ["I have 25 years.", "I am 25 years old."],
          ["I am work every day.", "I work every day."]
        ],
        commonMistakesNote: "For age, English uses BE (I am 25 years old), not HAVE. For an action happening right now, use am + -ing: “I am working now.”",
        quickReferenceHead: ["Structure", "Example"],
        quickReference: [
          ["Present Simple", "She works."],
          ["Present Continuous", "She is working."],
          ["Past Simple", "She worked."],
          ["Past Continuous", "She was working."],
          ["Present Perfect", "She has worked."],
          ["Past Perfect", "She had worked."],
          ["Future", "She will work."],
          ["Going to", "She is going to work."],
          ["Modal", "She can work."],
          ["Passive", "She was invited."],
          ["Infinitive", "She wants to work."],
          ["Gerund", "She enjoys working."]
        ],
        memoryTipsTitle: "⭐ Master Rules for English Verbs",
        memoryTips: [
          "<strong>Rule 1:</strong> He / She / It + verb-s in the simple present. <em>She works.</em>",
          "<strong>Rule 2:</strong> After do / does / did, use the base verb. <em>Did you go?</em>",
          "<strong>Rule 3:</strong> After a modal, use the base verb. <em>She can speak.</em>",
          "<strong>Rule 4:</strong> Continuous tenses use BE + -ING.",
          "<strong>Rule 5:</strong> Perfect tenses use HAVE + past participle.",
          "<strong>Rule 6:</strong> Passive voice uses BE + past participle.",
          "<strong>Rule 7:</strong> Many verbs are followed by to + infinitive. <em>want to learn</em>",
          "<strong>Rule 8:</strong> Some verbs are followed by -ing. <em>enjoy learning</em>",
          "<strong>Rule 9:</strong> Regular past verbs generally use -ed. <em>work → worked</em>",
          "<strong>Rule 10:</strong> Irregular verbs must be learned individually. <em>go → went → gone</em>"
        ]
      }
    ]
  };

  /* Practice quizzes for the Verbs guide. Multiple-choice, rendered inside the
     same tabbed quiz box used for Nouns, Adjectives, Pronouns and Conjunctions. */
  GRAMMAR_CONTENT.verbs.practice = [
    {
      id: "verbs-quiz-1",
      short: "Type of Verb",
      type: "mc",
      title: "Quiz 1 — Identify the Type of Verb",
      instructions: "Choose the best answer.",
      questions: [
        { text: "She runs every morning.", options: ["Stative", "Action", "Linking", "Modal"], correct: 1 },
        { text: "He knows the answer.", options: ["Stative", "Action", "Modal", "Auxiliary"], correct: 0 },
        { text: "They are students.", options: ["Action", "Modal", "Linking", "Phrasal"], correct: 2 },
        { text: "She can swim.", options: ["Stative", "Modal", "Linking", "Transitive"], correct: 1 },
        { text: "I have a new computer.", options: ["Auxiliary", "Modal", "Main verb", "Linking"], correct: 2 },
        { text: "They have finished the exam.", options: ["HAVE is an auxiliary", "HAVE is a modal", "FINISHED is an auxiliary", "HAVE is a linking verb"], correct: 0 },
        { text: "He opened the door.", options: ["Intransitive", "Transitive", "Modal", "Linking"], correct: 1 },
        { text: "The baby slept.", options: ["Transitive", "Modal", "Intransitive", "Auxiliary"], correct: 2 },
        { text: "She is studying English.", options: ["IS = auxiliary; STUDYING = main verb", "IS = main verb; STUDYING = auxiliary", "Both are modal verbs", "Both are adjectives"], correct: 0 },
        { text: "Please turn off the computer.", options: ["Linking verb", "Stative verb", "Phrasal verb", "Modal verb"], correct: 2 }
      ]
    },
    {
      id: "verbs-quiz-2",
      short: "Verb Forms",
      type: "mc",
      title: "Quiz 2 — Choose the Correct Verb Form",
      instructions: "Choose the word or phrase that best completes each sentence.",
      questions: [
        { text: "She _____ English every day.", options: ["study", "studies", "studying", "studied"], correct: 1 },
        { text: "They _____ soccer yesterday.", options: ["play", "plays", "played", "playing"], correct: 2 },
        { text: "He can _____ very fast.", options: ["runs", "running", "ran", "run"], correct: 3 },
        { text: "Did you _____ the movie?", options: ["saw", "see", "seen", "seeing"], correct: 1 },
        { text: "She didn't _____ the homework.", options: ["finished", "finishes", "finish", "finishing"], correct: 2 },
        { text: "We are _____ English now.", options: ["study", "studies", "studied", "studying"], correct: 3 },
        { text: "He has _____ his work.", options: ["finish", "finished", "finishing", "finishes"], correct: 1 },
        { text: "They have _____ to Canada.", options: ["go", "went", "gone", "going"], correct: 2 },
        { text: "She wants _____ English.", options: ["learn", "learning", "to learn", "learned"], correct: 2 },
        { text: "I enjoy _____ books.", options: ["read", "reading", "to reading", "reads"], correct: 1 }
      ]
    },
    {
      id: "verbs-quiz-3",
      short: "Tenses & Grammar",
      type: "mc",
      title: "Quiz 3 — Verb Tenses and Grammar",
      instructions: "Choose the best answer for each sentence.",
      questions: [
        { text: "I _____ English every day.", options: ["am studying", "study", "studied", "have study"], correct: 1 },
        { text: "Look! The students _____ an exam.", options: ["take", "took", "are taking", "have take"], correct: 2 },
        { text: "We _____ the museum last Saturday.", options: ["visit", "are visiting", "visited", "have visited"], correct: 2 },
        { text: "She _____ here since 2022.", options: ["works", "worked", "is working", "has worked"], correct: 3 },
        { text: "When I arrived, they _____ dinner.", options: ["had already eaten", "already eat", "have already eaten", "are already eating"], correct: 0 },
        { text: "I think it _____ tomorrow.", options: ["rains", "rained", "will rain", "raining"], correct: 2 },
        { text: "Look at those clouds! It _____ rain.", options: ["is going to", "will to", "going", "has"], correct: 0 },
        { text: "_____ you like coffee?", options: ["Are", "Does", "Do", "Have"], correct: 2 },
        { text: "She _____ speak three languages.", options: ["can", "cans", "can to", "can speaks"], correct: 0 },
        { text: "The report _____ by the manager yesterday.", options: ["checked", "was checked", "is checking", "has checking"], correct: 1 }
      ]
    }
  ];
