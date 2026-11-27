"use strict";
/* Contenido de gramatica: GERUNDS (Verb System · Non-Finite Verbs, nivel A2–B1).
   Se registra en GRAMMAR_CONTENT.gerunds, asi que desbloquea el tema
   "Gerunds" del menu (partials/recursos.html, data-topic="gerunds").
   Cubre: formacion (-ing y ortografia), gerundio como sujeto, objeto, despues de
   preposiciones, verbos + gerundio, expresiones comunes y errores comunes.
   1 unidad + 1 quiz. Campos que renderiza js/app/grammar-render.js: ver grammar-verbs-content.js. */

  GRAMMAR_CONTENT.gerunds = {
    label: "Gerunds",
    eyebrowPrefix: "Verb System · Non-Finite Verbs",
    definitionTitle: "What Is a Gerund?",
    definition: "A <strong>gerund</strong> is the <strong>-ing form of a verb used as a noun</strong>. It names an activity or an idea (<em>swimming, reading, learning</em>). Because it works like a noun, a gerund can be the subject or the object of a sentence, and it can come after a preposition. It does not show tense, so it is a <strong>non-finite verb</strong>.",
    definitionExamples: [
      "<strong>Swimming</strong> is good exercise. (subject)",
      "She enjoys <strong>reading</strong> novels. (object)",
      "He is good at <strong>solving</strong> problems. (after a preposition)",
      "I am thinking about <strong>studying</strong> abroad.",
      "<strong>Learning</strong> English opens many doors."
    ],
    modules: [
      {
        title: "Gerunds",
        objectives: [
          "Form the gerund correctly, including spelling changes.",
          "Use a gerund as a subject, as an object, and after a preposition.",
          "Use common verbs and expressions that are followed by a gerund.",
          "Avoid common mistakes with gerunds."
        ],
        rules: [
          {
            number: 1,
            title: "Forming the Gerund",
            desc: "Add <strong>-ing</strong> to the base verb. Some verbs change their spelling.",
            tableHead: ["Rule", "Base verb", "Gerund"],
            table: [
              ["Most verbs: add -ing", "read, work, play", "reading, working, playing"],
              ["Verbs ending in silent -e: drop the e", "make, write, dance", "making, writing, dancing"],
              ["One syllable, consonant-vowel-consonant: double the last letter", "run, swim, sit", "running, swimming, sitting"],
              ["Verbs ending in -ie: change ie to y", "lie, die, tie", "lying, dying, tying"],
              ["Verbs ending in -y: just add -ing", "study, enjoy, fly", "studying, enjoying, flying"]
            ],
            tip: "Do not double the last letter in verbs ending in <em>w, x,</em> or <em>y</em>: <em>playing, fixing, snowing</em>."
          },
          {
            number: 2,
            title: "Gerund as Subject",
            desc: "A gerund can be the <strong>subject</strong> of a sentence. It always takes a <strong>singular</strong> verb.",
            tableHead: ["Structure", "Example"],
            table: [
              ["Gerund + singular verb", "<strong>Swimming</strong> is good for your health."],
              ["Gerund + object + verb", "<strong>Learning</strong> languages takes time."],
              ["Negative gerund + verb", "<strong>Not sleeping</strong> enough is dangerous."]
            ],
            tip: "<em>Swimming and running are fun</em> uses <em>are</em> because there are two gerunds joined by <em>and</em>."
          },
          {
            number: 3,
            title: "Verb + Gerund",
            desc: "Some verbs must be followed by a gerund, not by a to-infinitive.",
            tableHead: ["Verbs", "Example"],
            table: [
              ["enjoy, like* (general), love*, hate*", "I enjoy <strong>listening</strong> to music."],
              ["finish, stop, quit, give up", "She finished <strong>writing</strong> the report."],
              ["avoid, mind, miss, risk", "Do you mind <strong>opening</strong> the window?"],
              ["suggest, recommend, consider, imagine", "He suggested <strong>taking</strong> a taxi."],
              ["keep, practice, can't help, deny", "They keep <strong>talking</strong> in class."]
            ],
            tip: "Verbs marked with * can also take a to-infinitive with little change in meaning. Learn the verbs without the star as <strong>gerund only</strong>: enjoy, finish, avoid, mind, suggest, keep, practice, consider, imagine."
          },
          {
            number: 4,
            title: "Preposition + Gerund",
            desc: "After a <strong>preposition</strong>, the verb is always a gerund, never a to-infinitive or a base verb.",
            tableHead: ["Pattern", "Example"],
            table: [
              ["adjective + preposition + gerund", "She is good <strong>at drawing</strong>. / I am interested <strong>in learning</strong> Japanese."],
              ["verb + preposition + gerund", "We talked <strong>about moving</strong> to a new city."],
              ["noun + preposition + gerund", "There are many ways <strong>of improving</strong> your English."],
              ["before / after / without / instead of / by + gerund", "<strong>After finishing</strong> work, he went home. / She left <strong>without saying</strong> goodbye."]
            ],
            tip: "Remember: <em>to</em> can be a preposition. In <em>look forward to</em>, <em>to</em> is a preposition, so use a gerund: <em>I look forward to seeing you.</em>"
          },
          {
            number: 5,
            title: "Common Expressions with Gerunds",
            desc: "These fixed expressions are always followed by a gerund.",
            tableHead: ["Expression", "Example"],
            table: [
              ["look forward to", "I look forward to <strong>meeting</strong> you."],
              ["be used to / get used to", "She is used to <strong>waking</strong> up early."],
              ["it's no use / it's not worth", "It's no use <strong>waiting</strong> any longer."],
              ["can't help / can't stand", "I can't stand <strong>waiting</strong> in line."],
              ["spend / waste time + gerund", "He spends a lot of time <strong>playing</strong> video games."],
              ["be busy / go + gerund", "We went <strong>shopping</strong> yesterday."]
            ]
          },
          {
            number: 6,
            title: "Gerund or Infinitive: Same Verb, Different Idea",
            desc: "A few verbs can take both forms, but the meaning changes. You will study these verbs in more detail later.",
            tableHead: ["Verb", "Gerund", "To-infinitive"],
            table: [
              ["stop", "Stop doing something: He stopped <strong>smoking</strong>.", "Stop in order to do something: He stopped <strong>to rest</strong>."],
              ["remember", "Remember a past action: I remember <strong>locking</strong> the door.", "Remember a duty: Remember <strong>to lock</strong> the door."]
            ]
          }
        ],
        commonMistakes: [
          ["She enjoys to read novels.", "She enjoys reading novels."],
          ["I look forward to see you.", "I look forward to seeing you."],
          ["Thank you for help me.", "Thank you for helping me."],
          ["Swim is good for your health.", "Swimming is good for your health."],
          ["He avoided to answer the question.", "He avoided answering the question."],
          ["Are you interested in learn French?", "Are you interested in learning French?"]
        ],
        commonMistakesNote: "A gerund (verb + -ing) is needed after prepositions and after verbs such as enjoy, avoid, finish, and suggest. A base verb cannot be a subject; use the gerund.",
        memoryTipsTitle: "Important Notes — Gerunds",
        memoryTips: [
          "Gerund = <strong>verb + -ing used as a noun</strong>. <em>Reading is fun.</em>",
          "After a <strong>preposition</strong>, always use a gerund. <em>She is good at singing.</em>",
          "Verbs like <strong>enjoy, finish, avoid, mind, suggest</strong> are followed by a gerund.",
          "As a subject, a gerund takes a <strong>singular</strong> verb. <em>Swimming is relaxing.</em>",
          "In <strong>look forward to</strong> and <strong>be used to</strong>, <em>to</em> is a preposition: use <strong>-ing</strong>."
        ]
      }
    ]
  };

  /* Practice quiz: Quiz 1 (Gerunds). */
  GRAMMAR_CONTENT.gerunds.practice = [
    {
      id: "gerunds-quiz-1",
      short: "Gerunds",
      type: "mc",
      title: "Quiz 1 — Gerunds",
      instructions: "Choose the best answer (A, B, C, or D).",
      questions: [
        { text: "_____ is my favorite way to relax.", options: ["Swim", "Swimming", "To swimming", "Swims"], correct: 1 },
        { text: "She enjoys _____ novels at night.", options: ["to read", "read", "reading", "reads"], correct: 2 },
        { text: "I look forward to _____ you next week.", options: ["see", "seeing", "to see", "saw"], correct: 1 },
        { text: "What is the -ing form of the verb \"run\"?", options: ["runing", "running", "runming", "runeing"], correct: 1 },
        { text: "Thank you for _____ me with my homework.", options: ["help", "to help", "helping", "helped"], correct: 2 },
        { text: "He finished _____ the report before lunch.", options: ["to write", "writing", "write", "wrote"], correct: 1 },
        { text: "What is the -ing form of the verb \"make\"?", options: ["makeing", "making", "makking", "makeng"], correct: 1 },
        { text: "She is very good at _____ problems.", options: ["solve", "to solve", "solving", "solved"], correct: 2 },
        { text: "Do you mind _____ the window?", options: ["to open", "open", "opening", "opened"], correct: 2 },
        { text: "Choose the correct sentence.", options: ["He avoided to answer.", "He avoided answering.", "He avoided answer.", "He avoided answered."], correct: 1 }
      ]
    }
  ];
