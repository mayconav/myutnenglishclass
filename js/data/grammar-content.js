"use strict";
/* Contenido de gramatica: lecciones y adjetivos (app.js original: L1655-L1928) */
  /* ============ GRAMMAR LESSONS ============
     Content arrives progressively from Professor Aguilar. Each entry in
     GRAMMAR_CONTENT unlocks its matching topic in the syllabus menu
     (data-topic attribute). Topics with no entry stay locked (🔒) and
     show a "coming soon" toast when tapped. */
  var GRAMMAR_CONTENT = {
    nouns: {
      label: "Nouns",
      definitionTitle: "What is a Noun?",
      definition: "A noun is a word that names a person, animal, place, thing, idea, or quality. Nouns are one of the most essential building blocks of English &mdash; almost every sentence contains at least one.",
      definitionExamples: ["teacher", "Mexico", "book", "happiness", "team", "water"],
      modules: [
        {
          title: "Rules for Forming Plural Nouns",
          objectives: [
            "Form the plural of regular and irregular nouns correctly.",
            "Identify spelling changes when making nouns plural.",
            "Recognize nouns that do not change in the plural.",
            "Avoid common mistakes made by Spanish-speaking learners."
          ],
          rules: [
            {
              title: "General Rule",
              desc: "Most nouns form the plural by adding <strong>-s</strong> to the singular form.",
              structure: "Singular + -s = Plural",
              table: [["book","books"],["student","students"],["computer","computers"],["teacher","teachers"],["phone","phones"]],
              examples: ["I have two <strong>books</strong>.", "There are thirty <strong>students</strong> in the classroom.", "My brothers have new <strong>computers</strong>."]
            },
            {
              number: 1,
              title: "Add -es to nouns ending in -s, -ss, -sh, -ch, -x, or -z",
              desc: "If a noun ends in one of these sounds, add <strong>-es</strong>.",
              table: [["bus","buses"],["class","classes"],["watch","watches"],["dish","dishes"],["box","boxes"],["quiz","quizzes"]],
              examples: ["There are many <strong>boxes</strong> in the office.", "The students took several <strong>quizzes</strong>.", "She washed the <strong>dishes</strong>."]
            },
            {
              number: 2,
              title: "Nouns Ending in Consonant + y",
              desc: "If a noun ends in a <strong>consonant + y</strong>, change the <strong>y</strong> to <strong>i</strong> and add -es.",
              table: [["city","cities"],["country","countries"],["baby","babies"],["family","families"],["dictionary","dictionaries"]],
              examples: ["Mexico has many beautiful <strong>cities</strong>.", "Their <strong>families</strong> are very friendly."]
            },
            {
              number: 3,
              title: "Nouns Ending in Vowel + y",
              desc: "If the <strong>y</strong> comes after a vowel, simply add <strong>-s</strong>.",
              table: [["boy","boys"],["toy","toys"],["key","keys"],["monkey","monkeys"],["day","days"]],
              examples: ["The children have many <strong>toys</strong>.", "We found our <strong>keys</strong>."]
            },
            {
              number: 4,
              title: "Nouns Ending in -o",
              desc: "<strong>A. Most nouns ending in -o add -es:</strong>",
              table: [["potato","potatoes"],["tomato","tomatoes"],["hero","heroes"],["echo","echoes"]],
              examples: ["We bought several <strong>potatoes</strong>.", "The <strong>heroes</strong> received awards."],
              table2Label: "B. Many borrowed words simply add -s:",
              table2: [["photo","photos"],["piano","pianos"],["radio","radios"],["video","videos"],["studio","studios"],["zoo","zoos"]],
              examples2: ["She takes many <strong>photos</strong>.", "There are two <strong>pianos</strong> in the music room."],
              tip: "There is no single rule for all nouns ending in <strong>-o</strong>. When in doubt, consult a reliable dictionary."
            },
            {
              number: 5,
              title: "Nouns Ending in -f or -fe",
              desc: "Some nouns change <strong>-f</strong> or <strong>-fe</strong> to <strong>-ves</strong>.",
              table: [["leaf","leaves"],["life","lives"],["wife","wives"],["knife","knives"],["wolf","wolves"],["shelf","shelves"]],
              examples: ["The trees lost their <strong>leaves</strong>.", "The <strong>wolves</strong> live in the forest."],
              table2Label: "Exceptions (add -s):",
              table2: [["roof","roofs"],["chief","chiefs"],["belief","beliefs"],["cliff","cliffs"],["proof","proofs"]],
              examples2: ["The houses have red <strong>roofs</strong>.", "The <strong>chiefs</strong> attended the meeting."]
            },
            {
              number: 6,
              title: "Irregular Plurals",
              desc: "Some nouns have completely irregular plural forms.",
              table: [["man","men"],["woman","women"],["child","children"],["person","people"],["mouse","mice"],["goose","geese"],["foot","feet"],["tooth","teeth"],["ox","oxen"],["louse","lice"]],
              examples: ["The <strong>children</strong> are playing.", "Two <strong>men</strong> entered the classroom.", "My <strong>feet</strong> hurt after the walk."]
            },
            {
              number: 7,
              title: "Nouns with the Same Singular and Plural Form",
              desc: "Some nouns do not change.",
              table: [["sheep","sheep"],["deer","deer"],["fish*","fish"],["aircraft","aircraft"],["series","series"],["species","species"]],
              examples: ["We saw three <strong>deer</strong>.", "The farmer has many <strong>sheep</strong>."],
              tip: "*<strong>Fishes</strong> is also used in biology when referring to different species of fish."
            },
            {
              number: 8,
              title: "Foreign Plurals",
              desc: "Some nouns borrowed from Latin or Greek keep their original plural forms.",
              table: [["datum","data"],["phenomenon","phenomena"],["criterion","criteria"],["analysis","analyses"],["basis","bases"],["thesis","theses"],["crisis","crises"],["cactus","cacti / cactuses"],["fungus","fungi / funguses"],["nucleus","nuclei"]],
              examples: ["The <strong>analyses</strong> were completed yesterday.", "Several <strong>criteria</strong> were considered."]
            },
            {
              number: 9,
              title: "Compound Nouns",
              desc: "Usually, the main noun becomes plural:",
              table: [["mother-in-law","mothers-in-law"],["passer-by","passers-by"],["editor-in-chief","editors-in-chief"],["attorney general","attorneys general"]],
              examples: ["Two <strong>mothers-in-law</strong> attended the party."],
              table2Label: "Other compounds simply add -s:",
              table2: [["notebook","notebooks"],["toothbrush","toothbrushes"],["classroom","classrooms"]],
              examples2: ["We bought new <strong>notebooks</strong>."]
            },
            {
              number: 10,
              title: "Numbers, Letters, and Symbols",
              desc: "To avoid confusion, apostrophes may occasionally be used with letters, but modern style generally prefers <strong>-s</strong>.",
              examples: ["Mind your <strong>p's</strong> and <strong>q's</strong>. <em>(traditional style)</em>", "She got three <strong>As</strong> in her exams. <em>(modern style)</em>"]
            }
          ],
          commonMistakes: [
            ["childs","children"], ["womans","women"], ["informations","information"],
            ["furnitures","furniture"], ["advices","advice"], ["peoples","people"]
          ],
          commonMistakesNote: "\"Peoples\" is correct only when referring to different ethnic groups or nations (e.g., the Indigenous peoples of the Americas) — as the plural of \"person\" in general, use \"people\".",
          quickReference: [
            ["Most nouns", "+ s", "book → books"],
            ["-s, -ss, -sh, -ch, -x, -z", "+ es", "bus → buses"],
            ["Consonant + y", "y → ies", "city → cities"],
            ["Vowel + y", "+ s", "boy → boys"],
            ["Some -o", "+ es", "potato → potatoes"],
            ["Many borrowed -o", "+ s", "photo → photos"],
            ["Some -f / -fe", "→ ves", "knife → knives"],
            ["Exceptions", "+ s", "roof → roofs"],
            ["Irregular", "change form", "child → children"],
            ["Same form", "no change", "sheep → sheep"]
          ],
          memoryTips: [
            "<strong>Most nouns:</strong> add -s.",
            "<strong>Hissing endings</strong> (s, sh, ch, x, z): add -es.",
            "<strong>Consonant + y:</strong> change y to ies.",
            "<strong>Vowel + y:</strong> just add -s.",
            "Learn irregular plurals by memory — they do not follow a predictable pattern.",
            "Use a dictionary when unsure about nouns ending in -o or -f/-fe."
          ]
        }
      ]
    }
  };

  /* Practice quizzes sent by Professor Aguilar (Quizes 1-2 Nouns.docx).
     Rendered as a self-checking worksheet under the Nouns topic. */
  GRAMMAR_CONTENT.nouns.practice = [
    {
      id: "nouns-quiz-1",
      short: "Plurals",
      title: "Quiz 1 — Write the Plurals",
      instructions: "Write the plural of each singular word or phrase.",
      example: { text: "a nice sofa", prefix: "", suffix: "", result: "nice sofas" },
      items: [
        { text: "a university", prefix: "", suffix: "", answers: ["universities"], rule: "consonant + y → change y to -ies" },
        { text: "a sandwich", prefix: "", suffix: "", answers: ["sandwiches"], rule: "ends in -ch → add -es" },
        { text: "a street", prefix: "", suffix: "", answers: ["streets"], rule: "regular noun → just add -s" },
        { text: "a rich man", prefix: "rich ", suffix: "", answers: ["men"], rule: "irregular plural — memorize it" },
        { text: "one foot", prefix: "two ", suffix: "", answers: ["feet"], rule: "irregular plural — memorize it" },
        { text: "a dirty bag", prefix: "dirty ", suffix: "", answers: ["bags"], rule: "regular noun → just add -s" },
        { text: "an expensive watch", prefix: "expensive ", suffix: "", answers: ["watches"], rule: "ends in -ch → add -es" },
        { text: "a new phone", prefix: "new ", suffix: "", answers: ["phones"], rule: "regular noun → just add -s" },
        { text: "a nice photograph", prefix: "nice ", suffix: "", answers: ["photographs"], rule: "regular noun → just add -s" },
        { text: "one glass of wine", prefix: "two ", suffix: " of wine", answers: ["glasses"], rule: "ends in -s → add -es" }
      ]
    },
    {
      id: "nouns-quiz-2",
      short: "Articles & Plurals",
      title: "Quiz 2 — Articles (a/an) and Plurals",
      instructions: "Write a/an before the singular word, then write the plural form.",
      example: { text: "olive", article: "an", prefix: "", suffix: "", result: "olives" },
      items: [
        { text: "bus", article: ["a"], prefix: "", suffix: "", answers: ["buses"], rule: "ends in -s → add -es" },
        { text: "nice family", article: ["a"], prefix: "nice ", suffix: "", answers: ["families"], rule: "consonant + y → change y to -ies" },
        { text: "Italian child", article: ["an"], prefix: "Italian ", suffix: "", answers: ["children"], rule: "irregular plural — memorize it" },
        { text: "strong tooth", article: ["a"], prefix: "strong ", suffix: "", answers: ["teeth"], rule: "irregular plural — memorize it" },
        { text: "nice dress", article: ["a"], prefix: "nice ", suffix: "", answers: ["dresses"], rule: "ends in -ss → add -es" },
        { text: "angry wife", article: ["an"], prefix: "angry ", suffix: "", answers: ["wives"], rule: "ends in -fe → change to -ves" },
        { text: "uniform", article: ["a"], prefix: "", suffix: "", answers: ["uniforms"], rule: "regular noun → just add -s" },
        { text: "amazing website", article: ["an"], prefix: "amazing ", suffix: "", answers: ["websites"], rule: "regular noun → just add -s" },
        { text: "elephant", article: ["an"], prefix: "", suffix: "", answers: ["elephants"], rule: "regular noun → just add -s" },
        { text: "empty library", article: ["an"], prefix: "empty ", suffix: "", answers: ["libraries"], rule: "consonant + y → change y to -ies" }
      ]
    }
  ];

  /* ============ ADJECTIVES ============ */
  GRAMMAR_CONTENT.adjectives = {
    label: "Adjectives",
    definitionTitle: "What Is an Adjective?",
    definition: "An adjective is a word that describes, identifies, or quantifies a noun or a pronoun. It tells us more about size, color, shape, quantity, origin, or which one.",
    definitionExamples: ["a <strong>tall</strong> building", "<strong>her</strong> car", "<strong>this</strong> book", "<strong>Mexican</strong> food"],
    modules: [
      {
        title: "The 10 Types of Adjectives",
        objectives: [
          "Recognize the ten main categories of adjectives used in everyday English.",
          "Identify which type of adjective is used in a sentence.",
          "Use each type correctly before a noun."
        ],
        rules: [
          { number: 1, title: "Descriptive Adjectives", desc: "Describe the quality, size, shape, or color of a noun — the most common type.", examples: ["The <strong>beautiful</strong> garden is full of flowers.", "My backpack is <strong>blue</strong>."] },
          { number: 2, title: "Possessive Adjectives", desc: "Show who or what something belongs to: my, your, his, her, its, our, their.", examples: ["<strong>Her</strong> teacher is kind.", "<strong>Their</strong> house is big."] },
          { number: 3, title: "Demonstrative Adjectives", desc: "Point out a specific noun: this, that, these, those.", examples: ["<strong>Those</strong> cars are expensive.", "<strong>This</strong> exercise is easy."] },
          { number: 4, title: "Quantitative Adjectives", desc: "Tell us how much or how many, without giving an exact number: many, few, some, several, little.", examples: ["We have <strong>little</strong> time.", "She has <strong>several</strong> sisters."] },
          { number: 5, title: "Interrogative Adjectives", desc: "Ask a question about a noun: which, what, whose.", examples: ["<strong>Which</strong> color do you prefer?", "<strong>Whose</strong> book is this?"] },
          { number: 6, title: "Distributive Adjectives", desc: "Refer to members of a group one at a time: each, every, either, neither.", examples: ["<strong>Every</strong> student passed the exam.", "<strong>Each</strong> participant received a certificate."] },
          { number: 7, title: "Proper Adjectives", desc: "Come from a proper noun (a nationality, place, or name) and are always capitalized.", examples: ["They visited a <strong>Canadian</strong> museum.", "She loves <strong>Mexican</strong> food."] },
          { number: 8, title: "Compound Adjectives", desc: "Two or more words that work together as a single adjective, usually joined with a hyphen.", examples: ["He is a <strong>well-known</strong> actor.", "She is a <strong>hard-working</strong> student."] },
          { number: 9, title: "Comparative Adjectives", desc: "Compare two people or things, usually formed with -er or more + adjective.", examples: ["This exercise is <strong>easier</strong> than yesterday's.", "She is <strong>taller</strong> than her brother."] },
          { number: 10, title: "Superlative Adjectives", desc: "Compare three or more people or things, showing the highest degree, usually formed with -est or most + adjective.", examples: ["She is the <strong>tallest</strong> student.", "This is the <strong>most interesting</strong> book I've read."] }
        ]
      }
    ]
  };

  /* Practice quizzes sent by Professor Aguilar (Adjectives_Quizzes.docx). Multiple-choice,
     rendered inside the same tabbed quiz box used for Nouns. */
  GRAMMAR_CONTENT.adjectives.practice = [
    {
      id: "adjectives-quiz-1",
      short: "Types of Adjectives",
      type: "mc",
      title: "Quiz 1 — Types of Adjectives",
      instructions: "Choose the correct answer for each question.",
      questions: [
        { text: "Which sentence contains a descriptive adjective?", options: ["Those books are interesting.", "The beautiful garden is full of flowers.", "My backpack is blue.", "Every student passed the exam."], correct: 1 },
        { text: "Which adjective is possessive?", options: ["This", "Several", "Her", "Tall"], correct: 2 },
        { text: "Which sentence contains a demonstrative adjective?", options: ["Those cars are expensive.", "John is intelligent.", "She has three sisters.", "The weather is cold."], correct: 0 },
        { text: "Which adjective is quantitative?", options: ["Happy", "Many", "Italian", "This"], correct: 1 },
        { text: "Which sentence contains an interrogative adjective?", options: ["Which color do you prefer?", "My brother is funny.", "Those houses are new.", "Every child smiled."], correct: 0 },
        { text: "Which adjective is distributive?", options: ["Blue", "Every", "Four", "American"], correct: 1 },
        { text: "Which is a proper adjective?", options: ["Wooden", "Mexican", "Happy", "Several"], correct: 1 },
        { text: "Which sentence contains a compound adjective?", options: ["She bought a red dress.", "He is a well-known actor.", "My car is old.", "They have many friends."], correct: 1 },
        { text: "Which adjective is comparative?", options: ["Fastest", "Faster", "Fast", "Most fast"], correct: 1 },
        { text: "Which adjective is superlative?", options: ["Better", "Good", "Best", "More good"], correct: 2 }
      ]
    },
    {
      id: "adjectives-quiz-2",
      short: "Identifying Adjectives",
      type: "mc",
      title: "Quiz 2 — Identifying Adjectives",
      instructions: "Choose the correct answer for each question.",
      questions: [
        { text: "Which sentence contains a possessive adjective?", options: ["Their teacher is kind.", "The dog is friendly.", "This is easy.", "Every book is interesting."], correct: 0 },
        { text: "Which adjective is descriptive?", options: ["Friendly", "Five", "Each", "That"], correct: 0 },
        { text: "Which sentence contains a quantitative adjective?", options: ["We have little time.", "This car is fast.", "My house is big.", "The French restaurant is excellent."], correct: 0 },
        { text: "Which adjective is demonstrative?", options: ["Their", "Those", "Tall", "Every"], correct: 1 },
        { text: "Which sentence contains a proper adjective?", options: ["They visited a Canadian museum.", "I have two dogs.", "This pencil is mine.", "Every student arrived."], correct: 0 },
        { text: "Which adjective is interrogative?", options: ["Which", "Happy", "Three", "Large"], correct: 0 },
        { text: "Which adjective is compound?", options: ["Hard-working", "Blue", "Many", "Your"], correct: 0 },
        { text: "Which adjective is distributive?", options: ["Every", "Small", "Five", "Italian"], correct: 0 },
        { text: "Which sentence contains a comparative adjective?", options: ["This exercise is easier than yesterday's.", "This is the easiest exercise.", "This exercise is easy.", "This exercise is very easy."], correct: 0 },
        { text: "Which sentence contains a superlative adjective?", options: ["She is taller than her brother.", "She is the tallest student.", "She is tall.", "She is very tall."], correct: 1 }
      ]
    },
    {
      id: "adjectives-quiz-3",
      short: "Comprehensive Review",
      type: "mc",
      title: "Quiz 3 — Comprehensive Review",
      instructions: "Choose the correct answer for each question.",
      questions: [
        { text: "Which adjective tells who owns something?", options: ["Demonstrative", "Possessive", "Proper", "Compound"], correct: 1 },
        { text: "Which adjective asks about a noun?", options: ["Descriptive", "Comparative", "Interrogative", "Proper"], correct: 2 },
        { text: "Which adjective refers to nationality?", options: ["Beautiful", "Canadian", "Several", "This"], correct: 1 },
        { text: "Which adjective expresses quantity?", options: ["Many", "Tall", "These", "My"], correct: 0 },
        { text: "Which sentence contains a demonstrative adjective?", options: ["Those students are excellent.", "John is kind.", "I have many books.", "The movie is interesting."], correct: 0 },
        { text: "Which adjective is compound?", options: ["Well-prepared", "Friendly", "Those", "Four"], correct: 0 },
        { text: "Which adjective is comparative?", options: ["Biggest", "Big", "Bigger", "Most big"], correct: 2 },
        { text: "Which adjective is superlative?", options: ["More interesting", "Most interesting", "Interesting", "Interest"], correct: 1 },
        { text: "Which sentence contains a distributive adjective?", options: ["Each participant received a certificate.", "The teacher is happy.", "We visited Paris.", "She bought a blue dress."], correct: 0 },
        { text: "Which sentence contains a descriptive adjective?", options: ["The clever student solved the problem.", "These books are heavy.", "Every teacher attended.", "Which answer is correct?"], correct: 0 }
      ]
    }
  ];

