"use strict";
/* Contenido de la zona de habilidades: pasajes de Reading, prompts de Writing, frases de Speaking y cartas de Letter, por nivel (antes en js/app.js) */
  /* ============================================================
     SKILLS — Reading / Writing / Speaking / Letter
     Gamified "language app" style practice zone, with XP,
     daily streak, and four types of interactive exercise.
     ============================================================ */

  var SKILLS = {
    A1: {
      reading: {
        title: "My name is Sofía",
        passage: "Hello! My name is Sofía and I {{study|estudiar}} Software Engineering at UTN. I am {{from|de / desde}} Nezahualcóyotl, in Mexico. Nice to meet you!",
        questions: [
          { q: "Where does Sofía study?", options: ["At home", "At UTN", "At a café"], correct: 1 },
          { q: "Where is Sofía from?", options: ["Spain", "Nezahualcóyotl", "Canada"], correct: 1 }
        ]
      },
      writing: {
        prompts: [
          { es: "Mi nombre es Sofía.", en: ["My", "name", "is", "Sofía", "."] },
          { es: "Yo estudio en la UTN.", en: ["I", "study", "at", "UTN", "."] },
          { es: "¿De dónde eres?", en: ["Where", "are", "you", "from", "?"] }
        ]
      },
      speaking: {
        phrases: [
          { en: "Hello, my name is Sofía.", es: "Basic greeting with introduction" },
          { en: "Nice to meet you.", es: "Nice to meet you" },
          { en: "Where are you from?", es: "Asking about origin" },
          { en: "See you later!", es: "Informal farewell" }
        ]
      },
      letter: {
        salutation: "Dear Ana,",
        body: "Hello! My name {{1}} Sofía. I {{2}} at UTN in Nezahualcóyotl. I {{3}} from Mexico. See you {{4}}!",
        closing: "Best, Sofía",
        blanks: [
          { id: 1, answer: "is" },
          { id: 2, answer: "study" },
          { id: 3, answer: "am" },
          { id: 4, answer: "soon" }
        ],
        distractors: ["are", "live"]
      }
    },
    A2: {
      reading: {
        title: "My daily routine",
        passage: "I {{usually|normalmente}} wake up at seven in the morning. After breakfast, I go to class at UTN. In the afternoon, I study at the {{library|biblioteca}}. On weekends, I visit my family or go to the park.",
        questions: [
          { q: "What does Sofía do in the afternoon?", options: ["She sleeps", "She studies at the library", "She works"], correct: 1 },
          { q: "What time does she usually wake up?", options: ["At seven", "At nine", "At twelve"], correct: 0 }
        ]
      },
      writing: {
        prompts: [
          { es: "Yo normalmente me despierto a las siete.", en: ["I", "usually", "wake", "up", "at", "seven", "."] },
          { es: "Voy a la biblioteca por la tarde.", en: ["I", "go", "to", "the", "library", "in", "the", "afternoon", "."] },
          { es: "El próximo fin de semana visitaré a mi familia.", en: ["Next", "weekend", "I", "am", "going", "to", "visit", "my", "family", "."] }
        ]
      },
      speaking: {
        phrases: [
          { en: "I usually wake up at seven.", es: "Describing a routine" },
          { en: "I go to class every morning.", es: "Talking about habits" },
          { en: "What is your daily routine like?", es: "Asking about someone's routine" },
          { en: "See you at the library!", es: "Farewell with meeting place" }
        ]
      },
      letter: {
        salutation: "Hi Diego,",
        body: "Next weekend I {{1}} going to visit the park. Do you want {{2}} come with me? We can {{3}} lunch downtown after the walk.",
        closing: "See you soon, Sofía",
        blanks: [
          { id: 1, answer: "am" },
          { id: 2, answer: "to" },
          { id: 3, answer: "have" }
        ],
        distractors: ["is", "for"]
      }
    },
    B1: {
      reading: {
        title: "Learning English",
        passage: "In my opinion, learning English opens many doors. Some people believe {{practice|práctica}} is more important than perfection, while others prefer studying grammar first. Personally, I enjoy group {{discussions|discusiones}} because they help me improve my speaking skills quickly.",
        questions: [
          { q: "What does the author enjoy?", options: ["Studying alone", "Group discussions", "Watching TV"], correct: 1 },
          { q: "For some people, what is more important than perfection?", options: ["Practice", "Grammar", "Vocabulary"], correct: 0 }
        ]
      },
      writing: {
        prompts: [
          { es: "En mi opinión, la práctica es más importante que la perfección.", en: ["In", "my", "opinion", ",", "practice", "is", "more", "important", "than", "perfection", "."] },
          { es: "Personalmente, disfruto las discusiones en grupo.", en: ["Personally", ",", "I", "enjoy", "group", "discussions", "."] },
          { es: "Por otro lado, algunas personas prefieren estudiar solas.", en: ["On", "the", "other", "hand", ",", "some", "people", "prefer", "studying", "alone", "."] }
        ]
      },
      speaking: {
        phrases: [
          { en: "In my opinion, practice matters most.", es: "Giving a point of view" },
          { en: "I believe practice makes progress.", es: "Expressing a belief" },
          { en: "What do you think about studying abroad?", es: "Asking someone's opinion" },
          { en: "Let's discuss the advantages and disadvantages.", es: "Proposing a debate" }
        ]
      },
      letter: {
        salutation: "Dear Professor López,",
        body: "I {{1}} writing to ask about the study abroad program. In my opinion, this {{2}} a great opportunity for students. Could you send me more information? I would {{3}} grateful for your help.",
        closing: "Sincerely, Sofía",
        blanks: [
          { id: 1, answer: "am" },
          { id: 2, answer: "is" },
          { id: 3, answer: "be" }
        ],
        distractors: ["was", "were"]
      }
    },
    B2: {
      reading: {
        title: "Renewable energy",
        passage: "Today's lecture is about renewable energy sources. Solar and wind power are growing rapidly worldwide because they reduce dependence on {{fossil fuels|combustibles fósiles}}. However, {{storage|almacenamiento}} remains a technical challenge that researchers are still trying to solve.",
        questions: [
          { q: "What is the lecture about?", options: ["Renewable energy", "World history", "Finance"], correct: 0 },
          { q: "What is the challenge mentioned?", options: ["Cost", "Storage", "Transportation"], correct: 1 }
        ]
      },
      writing: {
        prompts: [
          { es: "La energía solar y eólica está creciendo rápidamente.", en: ["Solar", "and", "wind", "power", "are", "growing", "rapidly", "."] },
          { es: "El almacenamiento sigue siendo un reto técnico.", en: ["Storage", "remains", "a", "technical", "challenge", "."] },
          { es: "Analicemos ambos lados del argumento.", en: ["Let's", "weigh", "both", "sides", "of", "the", "argument", "."] }
        ]
      },
      speaking: {
        phrases: [
          { en: "Today's lecture is about renewable energy.", es: "Introducing a topic" },
          { en: "However, storage remains a challenge.", es: "Contrasting an idea" },
          { en: "Let's summarize the key points.", es: "Closing an explanation" },
          { en: "Some researchers argue that timelines vary.", es: "Citing an academic stance" }
        ]
      },
      letter: {
        salutation: "Dear classmates,",
        body: "I {{1}} attaching a summary of today's lecture. The main topic {{2}} renewable energy sources. Please feel {{3}} to add your notes. Looking forward to our discussion.",
        closing: "Best regards, Sofía",
        blanks: [
          { id: 1, answer: "am" },
          { id: 2, answer: "is" },
          { id: 3, answer: "free" }
        ],
        distractors: ["was", "for"]
      }
    },
    C1: {
      reading: {
        title: "Academic writing",
        passage: "A strong {{thesis statement|declaración de tesis}} guides the entire essay. Each paragraph should support the main argument with clear {{evidence|evidencia}}. Avoid vague statements without proof, and remember that a well-structured conclusion restates your position without repeating it word for word.",
        questions: [
          { q: "What guides the whole essay?", options: ["The conclusion", "The thesis statement", "The title"], correct: 1 },
          { q: "What should a good conclusion do?", options: ["Repeat the whole text", "Restate the position without repeating word for word", "Add new evidence"], correct: 1 }
        ]
      },
      writing: {
        prompts: [
          { es: "Cada párrafo debe apoyar el argumento principal.", en: ["Each", "paragraph", "should", "support", "the", "main", "argument", "."] },
          { es: "Evita afirmaciones vagas sin pruebas.", en: ["Avoid", "vague", "statements", "without", "proof", "."] },
          { es: "Toda afirmación necesita evidencia de una fuente confiable.", en: ["Every", "claim", "needs", "evidence", "from", "a", "reliable", "source", "."] }
        ]
      },
      speaking: {
        phrases: [
          { en: "A strong thesis guides the essay.", es: "Explaining the thesis's function" },
          { en: "Let me support this claim with evidence.", es: "Reinforcing an argument" },
          { en: "In conclusion, my position is clear.", es: "Closing an argument" },
          { en: "This argument is backed by reliable sources.", es: "Citing reliable sources" }
        ]
      },
      letter: {
        salutation: "Dear Committee,",
        body: "I {{1}} writing to submit my final essay for review. This paper {{2}} a clear thesis supported by extensive evidence. I {{3}} confident that the argument {{4}} well-structured.",
        closing: "Respectfully, Sofía",
        blanks: [
          { id: 1, answer: "am" },
          { id: 2, answer: "presents" },
          { id: 3, answer: "am" },
          { id: 4, answer: "is" }
        ],
        distractors: ["was", "presented"]
      }
    },
    C2: {
      reading: {
        title: "A quarterly call",
        passage: "Good morning everyone, thank you for joining this call. Today we will present our {{quarterly results|resultados trimestrales}}, which exceeded expectations. Please feel free to ask questions at any point, and I will now hand it over to my colleague for the {{roadmap|hoja de ruta}}.",
        questions: [
          { q: "What exceeded expectations?", options: ["The weather", "The quarterly results", "The budget"], correct: 1 },
          { q: "What happens after the presentation?", options: ["The call is cancelled", "The floor is handed to a colleague", "The introduction is repeated"], correct: 1 }
        ]
      },
      writing: {
        prompts: [
          { es: "Nuestros resultados superaron las expectativas.", en: ["Our", "results", "exceeded", "expectations", "."] },
          { es: "Le cedo la palabra a mi colega.", en: ["I'll", "hand", "it", "over", "to", "my", "colleague", "."] },
          { es: "Pasemos a la siguiente diapositiva de la hoja de ruta.", en: ["Let's", "move", "on", "to", "the", "next", "slide", "of", "the", "roadmap", "."] }
        ]
      },
      speaking: {
        phrases: [
          { en: "Thank you for joining this call.", es: "Opening a formal meeting" },
          { en: "Our results exceeded expectations.", es: "Presenting positive results" },
          { en: "I'll hand it over to my colleague.", es: "Handing over the floor" },
          { en: "Let's move on to the next slide.", es: "Transitioning in a presentation" }
        ]
      },
      letter: {
        salutation: "Dear team,",
        body: "I {{1}} pleased to share that our quarterly results {{2}} exceeded expectations. I would like {{3}} thank everyone for their hard work. Please feel free {{4}} reach out with any questions.",
        closing: "Best regards, Sofía",
        blanks: [
          { id: 1, answer: "am" },
          { id: 2, answer: "have" },
          { id: 3, answer: "to" },
          { id: 4, answer: "to" }
        ],
        distractors: ["is", "has"]
      }
    }
  };

