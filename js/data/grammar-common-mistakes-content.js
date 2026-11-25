"use strict";
/* Contenido de gramatica: COMMON GRAMMAR MISTAKES (categoria XII del menu).
   Se registra en GRAMMAR_CONTENT con un slug por tema; cada slug se activa al poner
   data-topic="<slug>" en partials/recursos.html. Usa los mismos campos que los demas
   temas (rules, commonMistakes, memoryTips, practice). Contenido redactado para
   revision del profesor. */

  var CGM_EYEBROW = "Common Grammar Mistakes";

  /* ============ FALSE FRIENDS ============ */
  GRAMMAR_CONTENT["false-friends"] = {
    label: "False Friends",
    eyebrowPrefix: CGM_EYEBROW,
    definitionTitle: "What Are False Friends?",
    definition: "False friends are English words that look or sound like a Spanish word but have a <strong>different meaning</strong>. They cause some of the most common mistakes for Spanish speakers.",
    definitionExamples: ["<strong>actually</strong> ≠ actualmente", "<strong>library</strong> ≠ librería", "<strong>embarrassed</strong> ≠ embarazada"],
    modules: [{
      title: "Watch Out for These Words",
      objectives: ["Recognize the most common English–Spanish false friends.", "Choose the correct English word for the Spanish meaning."],
      rules: [
        { number: 1, title: "Same Look, Different Meaning", desc: "These English words resemble Spanish words, but they do not mean the same thing.",
          tableHead: ["English word", "Looks like", "Real meaning"],
          table: [["actually", "actualmente", "in fact, really"], ["embarrassed", "embarazada", "ashamed, uncomfortable"], ["library", "librería", "a place to borrow books"], ["assist", "asistir", "to help"], ["sensible", "sensible", "practical, reasonable"], ["carpet", "carpeta", "a rug on the floor"], ["realize", "realizar", "to understand suddenly"], ["fabric", "fábrica", "cloth, material"]],
          examples: ["<strong>Actually</strong>, I don't like coffee. <em>(= in fact)</em>", "She was <strong>embarrassed</strong> when she forgot his name."] },
        { number: 2, title: "How to Say the Spanish Meaning", desc: "When you want to say the Spanish word, use these English words instead.",
          tableHead: ["Spanish", "Correct English"],
          table: [["actualmente", "currently, nowadays"], ["embarazada", "pregnant"], ["librería", "bookstore"], ["asistir (a clase)", "to attend"], ["sensible", "sensitive"], ["carpeta", "folder"], ["realizar", "to do, to carry out"], ["fábrica", "factory"]],
          examples: ["<strong>Currently</strong>, I live in Mexico City.", "I <strong>attend</strong> English class on Mondays."],
          tip: "If an English word looks too easy because it is almost the same in Spanish, check a dictionary before you use it." }
      ],
      commonMistakes: [["I went to the library to buy a book.", "I went to the bookstore to buy a book."], ["I assisted the class yesterday.", "I attended the class yesterday."], ["He is very sensible. (= sensitive)", "He is very sensitive."], ["I saved it in a carpet.", "I saved it in a folder."], ["Actually I live in Toluca. (= currently)", "Currently I live in Toluca."], ["She is embarrassed. (= pregnant)", "She is pregnant."]],
      memoryTips: ["<strong>Library</strong> = borrow books. <strong>Bookstore</strong> = buy books.", "<strong>Attend</strong> = go to an event or class. <strong>Assist</strong> = help.", "<strong>Actually</strong> adds a surprise; it does not mean “now”.", "<strong>Pregnant</strong> is the word for embarazada."]
    }],
    practice: [{
      id: "false-friends-quiz-1", short: "False Friends", type: "mc", title: "Quiz 1 — Choose the Right Word",
      instructions: "Choose the correct answer for each question.",
      questions: [
        { text: "How do you say “Estoy embarazada” in English?", options: ["I am embarrassed.", "I am pregnant.", "I am sensitive."], correct: 1 },
        { text: "Where can you buy books?", options: ["At a library", "At a bookstore", "At a carpet"], correct: 1 },
        { text: "Which sentence means “Asisto a clase todos los días”?", options: ["I assist class every day.", "I attend class every day.", "I assistance class every day."], correct: 1 },
        { text: "“Actualmente vivo en Puebla” is…", options: ["Actually I live in Puebla.", "Currently I live in Puebla.", "Actual I live in Puebla."], correct: 1 },
        { text: "Where do you save files on a computer?", options: ["In a folder", "In a carpet", "In a fabric"], correct: 0 }
      ]
    }]
  };

  /* ============ SPANISH INTERFERENCE ============ */
  GRAMMAR_CONTENT["spanish-interference"] = {
    label: "Spanish Interference",
    eyebrowPrefix: CGM_EYEBROW,
    definitionTitle: "What Is Spanish Interference?",
    definition: "Spanish interference happens when we apply Spanish grammar to English. Some Spanish patterns simply do not work in English, so learning them helps you avoid mistakes.",
    definitionExamples: ["<strong>It</strong> is raining", "a <strong>red</strong> car", "I <strong>am</strong> 20 years old"],
    modules: [{
      title: "Four Spanish Habits to Change",
      objectives: ["Use a subject in every English sentence.", "Put adjectives before the noun, in singular form.", "Use be, not have, for age and feelings."],
      rules: [
        { number: 1, title: "Always Use a Subject", desc: "In Spanish the subject can be omitted. In English, almost every sentence needs a subject, even <strong>it</strong>.", examples: ["<strong>It</strong> is raining. <em>(not: Is raining)</em>", "<strong>I</strong> am tired. <em>(not: Am tired)</em>"] },
        { number: 2, title: "Adjective + Noun, Never Plural", desc: "Adjectives go <strong>before</strong> the noun and never take -s.", examples: ["a <strong>red</strong> car <em>(not: a car red)</em>", "<strong>red</strong> cars <em>(not: reds cars)</em>"] },
        { number: 3, title: "Age and Feelings Use “Be”", desc: "Spanish uses <em>tener</em>; English uses <strong>to be</strong>.", examples: ["I <strong>am</strong> 20 years old. <em>(not: I have 20 years)</em>", "I <strong>am</strong> hungry. <em>(not: I have hungry)</em>"] },
        { number: 4, title: "Use My/Your for Body and Clothes", desc: "English uses a possessive adjective, not “the”.", examples: ["I washed <strong>my</strong> hands. <em>(not: the hands)</em>", "She put on <strong>her</strong> jacket."] }
      ],
      commonMistakes: [["Is cold today.", "It is cold today."], ["Am a student.", "I am a student."], ["I have a car blue.", "I have a blue car."], ["I have 19 years.", "I am 19 years old."], ["I have cold.", "I am cold."], ["He brushed the teeth.", "He brushed his teeth."]],
      memoryTips: ["No subject? Add <strong>I, he, she, it, we, they</strong>.", "<strong>Adjective first, noun second.</strong>", "<strong>Age = be.</strong> Feelings = be.", "Body and clothes: <strong>my, your, his, her</strong>."]
    }],
    practice: [{
      id: "spanish-interference-quiz-1", short: "Spanish Interference", type: "mc", title: "Quiz 1 — Find the Correct Sentence",
      instructions: "Choose the correct answer for each question.",
      questions: [
        { text: "Which sentence is correct?", options: ["Is raining.", "It is raining.", "Raining is."], correct: 1 },
        { text: "Which sentence is correct?", options: ["She has a dress green.", "She has a green dress.", "She has a greens dress."], correct: 1 },
        { text: "How do you say “Tengo 25 años”?", options: ["I have 25 years.", "I am 25 years old.", "I am 25 years."], correct: 1 },
        { text: "Which sentence is correct?", options: ["I have thirsty.", "I am thirsty.", "I has thirsty."], correct: 1 },
        { text: "Which sentence is correct?", options: ["She washed the face.", "She washed her face.", "She washed face."], correct: 1 }
      ]
    }]
  };

  /* ============ SUBJECT-VERB AGREEMENT ============ */
  GRAMMAR_CONTENT["subject-verb-agreement"] = {
    label: "Subject-Verb Agreement",
    eyebrowPrefix: CGM_EYEBROW,
    definitionTitle: "What Is Subject-Verb Agreement?",
    definition: "The verb must <strong>agree</strong> with its subject: a singular subject takes a singular verb, and a plural subject takes a plural verb.",
    definitionExamples: ["She <strong>works</strong>", "Everyone <strong>is</strong>", "The people <strong>are</strong>"],
    modules: [{
      title: "Making the Verb Agree",
      objectives: ["Add -s to the verb with he, she, and it in the present simple.", "Recognize nouns and pronouns that are singular or plural in English."],
      rules: [
        { number: 1, title: "He / She / It + Verb-s", desc: "In the present simple, add <strong>-s</strong> (or -es) to the verb with a third-person singular subject.", examples: ["She <strong>works</strong> in a bank.", "My brother <strong>watches</strong> TV."] },
        { number: 2, title: "Everyone, Someone, Nobody = Singular", desc: "Indefinite pronouns ending in -one, -body, and -thing take a <strong>singular</strong> verb.", examples: ["Everyone <strong>is</strong> ready.", "Nobody <strong>knows</strong> the answer."] },
        { number: 3, title: "People, Children, Police = Plural", desc: "These nouns have no -s, but they take a <strong>plural</strong> verb.", examples: ["The people <strong>are</strong> friendly.", "The children <strong>play</strong> outside."] },
        { number: 4, title: "News, Information, Furniture = Singular", desc: "Uncountable nouns take a <strong>singular</strong> verb.", examples: ["The news <strong>is</strong> good.", "The information <strong>is</strong> useful."], tip: "With there is / there are, the verb agrees with the noun after it: <strong>There are</strong> two chairs." }
      ],
      commonMistakes: [["She work in a bank.", "She works in a bank."], ["Everyone are ready.", "Everyone is ready."], ["The people is angry.", "The people are angry."], ["The news are bad.", "The news is bad."], ["There is two chairs.", "There are two chairs."], ["My friends is nice.", "My friends are nice."]],
      memoryTips: ["<strong>He, she, it</strong> → verb + s.", "<strong>Every-, some-, no-</strong> + one/body/thing → singular.", "<strong>People, children, police</strong> → plural.", "<strong>News, information, furniture</strong> → singular."]
    }],
    practice: [{
      id: "subject-verb-agreement-quiz-1", short: "Agreement", type: "mc", title: "Quiz 1 — Choose the Correct Verb",
      instructions: "Choose the correct answer for each question.",
      questions: [
        { text: "My sister ___ English every day.", options: ["study", "studies", "studys"], correct: 1 },
        { text: "Everybody ___ here.", options: ["is", "are", "be"], correct: 0 },
        { text: "The police ___ at the door.", options: ["is", "are", "was"], correct: 1 },
        { text: "The news ___ very interesting.", options: ["are", "is", "were"], correct: 1 },
        { text: "There ___ three books on the table.", options: ["is", "are", "be"], correct: 1 }
      ]
    }]
  };
