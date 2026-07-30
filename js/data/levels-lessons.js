"use strict";
/* Contenido: niveles (A1-C2) y lecciones con captions y quizzes (app.js original: L4-L222) */
  /* ============ CONTENT DATA ============ */
  var LEVELS = [
    { code: "A1", name: "Beginner", skill: "Essential Vocabulary", desc: "Greetings, introductions, and everyday vocabulary." },
    { code: "A2", name: "Elementary", skill: "Daily Routines", desc: "Describing routines, places, and simple plans." },
    { code: "B1", name: "Intermediate", skill: "Fluent Speaking", desc: "Conversations about studies, work, and opinions." },
    { code: "B2", name: "Upper Intermediate", skill: "Listening Comprehension", desc: "Listening to and discussing academic topics." },
    { code: "C1", name: "Advanced", skill: "Academic Writing", desc: "Essay writing and argumentation." },
    { code: "C2", name: "Mastery", skill: "Professional Fluency", desc: "Presentations and specialized communication." }
  ];

  /* Each level has 2 lessons. Lesson 1 uses multiple choice;
     lesson 2 mixes fill-in-the-blank and matching, to vary the exercise type. */
  var LESSONS = {
    A1: [
      {
        title: "Essential Vocabulary",
        duration: 40,
        captions: [
          { t: 0, text: "Hello! My name is Sofía and I study at UTN." },
          { t: 10, text: "Nice to meet you. Where are you from?" },
          { t: 20, text: "I am from Nezahualcóyotl, in Mexico." },
          { t: 30, text: "Great! Let's practice some everyday words." }
        ],
        quiz: [
          { type: "mcq", q: "How do you say 'nice to meet you'?", options: ["Nice to meet you", "See you later", "Good night"], correct: 0 },
          { type: "mcq", q: "'Where are you from?' asks about...", options: ["Age", "Origin", "Time"], correct: 1 }
        ]
      },
      {
        title: "Greetings and Farewells",
        duration: 35,
        captions: [
          { t: 0, text: "Good morning! How are you today?" },
          { t: 10, text: "I'm fine, thank you. And you?" },
          { t: 20, text: "See you later, have a nice day!" }
        ],
        quiz: [
          { type: "fill", q: "Complete: 'Good ___, how are you?' (morning greeting)", answer: ["morning"] },
          { type: "match", instructions: "Match each English greeting with its translation.", pairs: [
            ["Good morning", "Buenos días"],
            ["See you later", "Nos vemos luego"],
            ["Thank you", "Gracias"]
          ]}
        ]
      }
    ],
    A2: [
      {
        title: "Daily Routines",
        duration: 40,
        captions: [
          { t: 0, text: "I usually wake up at seven in the morning." },
          { t: 10, text: "Then I have breakfast and go to class." },
          { t: 20, text: "In the afternoon, I study at the library." },
          { t: 30, text: "What is your daily routine like?" }
        ],
        quiz: [
          { type: "mcq", q: "'I usually wake up at seven' describes...", options: ["A future plan", "A routine", "A piece of advice"], correct: 1 },
          { type: "mcq", q: "Which word indicates frequency?", options: ["Usually", "Library", "Afternoon"], correct: 0 }
        ]
      },
      {
        title: "Places and Plans",
        duration: 35,
        captions: [
          { t: 0, text: "Next weekend I am going to visit my family." },
          { t: 10, text: "We are planning to go to the park." },
          { t: 20, text: "After that, we will have lunch downtown." }
        ],
        quiz: [
          { type: "fill", q: "Complete: 'I am going ___ visit my family.' (future plan preposition)", answer: ["to"] },
          { type: "match", instructions: "Match the English place with its translation.", pairs: [
            ["Park", "Parque"],
            ["Downtown", "Centro"],
            ["Library", "Biblioteca"]
          ]}
        ]
      }
    ],
    B1: [
      {
        title: "Fluent Speaking",
        duration: 45,
        captions: [
          { t: 0, text: "In my opinion, learning English opens many doors." },
          { t: 12, text: "I think practice is more important than perfection." },
          { t: 24, text: "What do you think about studying abroad?" },
          { t: 36, text: "Let's discuss the advantages and disadvantages." }
        ],
        quiz: [
          { type: "mcq", q: "'In my opinion' is used to...", options: ["State a fact", "Express a point of view", "Ask a question"], correct: 1 },
          { type: "mcq", q: "Synonym for 'advantages'", options: ["Benefits", "Mistakes", "Schedules"], correct: 0 }
        ]
      },
      {
        title: "Giving Opinions",
        duration: 38,
        captions: [
          { t: 0, text: "I believe practice makes progress, not perfection." },
          { t: 10, text: "On the other hand, some people prefer studying alone." },
          { t: 20, text: "Personally, I enjoy group discussions." }
        ],
        quiz: [
          { type: "fill", q: "Complete: 'On the other ___, some people prefer studying alone.'", answer: ["hand"] },
          { type: "match", instructions: "Match the opinion phrase with its translation.", pairs: [
            ["I believe", "Yo creo"],
            ["Personally", "Personalmente"],
            ["On the other hand", "Por otro lado"]
          ]}
        ]
      }
    ],
    B2: [
      {
        title: "Listening Comprehension",
        duration: 45,
        captions: [
          { t: 0, text: "Today's lecture is about renewable energy sources." },
          { t: 12, text: "Solar and wind power are growing rapidly worldwide." },
          { t: 24, text: "However, storage remains a technical challenge." },
          { t: 36, text: "Let's summarize the key points together." }
        ],
        quiz: [
          { type: "mcq", q: "The main topic of the lecture is...", options: ["Renewable energy", "World history", "Finance"], correct: 0 },
          { type: "mcq", q: "'Challenge' in this context means...", options: ["Achievement", "Difficulty", "Award"], correct: 1 }
        ]
      },
      {
        title: "Debating Academic Topics",
        duration: 40,
        captions: [
          { t: 0, text: "Some researchers argue that storage technology will improve soon." },
          { t: 12, text: "Others remain skeptical about the timeline." },
          { t: 24, text: "Let's weigh both sides of the argument." }
        ],
        quiz: [
          { type: "fill", q: "Complete: 'Let's weigh both ___ of the argument.'", answer: ["sides"] },
          { type: "match", instructions: "Match the academic term with its translation.", pairs: [
            ["Researchers", "Investigadores"],
            ["Skeptical", "Escéptico"],
            ["Argument", "Argumento"]
          ]}
        ]
      }
    ],
    C1: [
      {
        title: "Academic Writing",
        duration: 45,
        captions: [
          { t: 0, text: "A strong thesis statement guides the entire essay." },
          { t: 12, text: "Each paragraph should support your main argument." },
          { t: 24, text: "Use evidence to strengthen your claims." },
          { t: 36, text: "Finally, the conclusion restates your position." }
        ],
        quiz: [
          { type: "mcq", q: "An essay's thesis should...", options: ["Go at the end", "Guide the argument", "Be irrelevant"], correct: 1 },
          { type: "mcq", q: "'Evidence' translates to...", options: ["Evidence", "Emotion", "Extension"], correct: 0 }
        ]
      },
      {
        title: "Writing with Evidence",
        duration: 38,
        captions: [
          { t: 0, text: "Every claim needs supporting evidence from a reliable source." },
          { t: 12, text: "Avoid vague statements without proof." },
          { t: 24, text: "A clear conclusion restates your main point." }
        ],
        quiz: [
          { type: "fill", q: "Complete: 'Every claim needs supporting ___.'", answer: ["evidence"] },
          { type: "match", instructions: "Match the academic writing term with its translation.", pairs: [
            ["Claim", "Afirmación"],
            ["Source", "Fuente"],
            ["Conclusion", "Conclusión"]
          ]}
        ]
      }
    ],
    C2: [
      {
        title: "Professional Fluency",
        duration: 45,
        captions: [
          { t: 0, text: "Good morning everyone, thank you for joining this call." },
          { t: 12, text: "Today we will present our quarterly results." },
          { t: 24, text: "Please feel free to ask questions at any point." },
          { t: 36, text: "Let's begin with an overview of the project." }
        ],
        quiz: [
          { type: "mcq", q: "This lesson simulates...", options: ["A party", "A professional presentation", "A recipe"], correct: 1 },
          { type: "mcq", q: "'Feel free to ask' invites you to...", options: ["Stay silent", "Ask questions", "End the call"], correct: 0 }
        ]
      },
      {
        title: "Specialized Presentations",
        duration: 40,
        captions: [
          { t: 0, text: "Let's move on to the next slide of our roadmap." },
          { t: 12, text: "As you can see, our results exceeded expectations." },
          { t: 24, text: "I'll now hand it over to my colleague for questions." }
        ],
        quiz: [
          { type: "fill", q: "Complete: 'Let's move on to the next ___.'", answer: ["slide"] },
          { type: "match", instructions: "Match the professional phrase with its translation.", pairs: [
            ["Roadmap", "Hoja de ruta"],
            ["Exceeded expectations", "Superó las expectativas"],
            ["Hand it over", "Cederle la palabra"]
          ]}
        ]
      }
    ]
  };

  var AVATARS = ["🎓", "🦉", "🦅", "🐺", "🦊", "🐢", "🌵", "⭐"];

  var DELIVERABLES = LEVELS.map(function (lvl) {
    return { code: lvl.code, text: "Deliverable " + lvl.code + ": " + lvl.skill };
  });

