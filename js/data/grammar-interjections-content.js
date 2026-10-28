"use strict";
/* Contenido de gramatica: INTERJECTIONS ("The Interjection as a Part of Speech in English").
   Se registra en GRAMMAR_CONTENT.interjections, asi que desbloquea automaticamente el
   tema "Interjections" del menu (partials/recursos.html, data-topic="interjections").

   Usa los mismos campos que los temas Verbs, Adverbs y Prepositions:
     rule.tableHead      -> encabezados de tabla
     mod.quickReferenceHead, mod.memoryTipsTitle */

  GRAMMAR_CONTENT.interjections = {
    label: "Interjections",
    definitionTitle: "What Is an Interjection?",
    definition: "An interjection is a word, sound, or short expression used to communicate an <strong>emotion</strong>, <strong>reaction</strong>, or <strong>communicative intention</strong>. It often appears independently of the grammatical structure of the sentence. A simple definition: an interjection is a word or expression that shows a feeling or reaction, such as surprise, happiness, pain, or disappointment.",
    definitionExamples: [
      "<strong>Wow!</strong> That is an amazing project.",
      "<strong>Ouch!</strong> My finger hurts.",
      "<strong>Oops!</strong> I made a mistake.",
      "<strong>Hooray!</strong> We passed the exam."
    ],
    modules: [

      /* ---------- 1. Definition, characteristics and emotions (guide sections 1-3A) ---------- */
      {
        title: "Characteristics and Interjections of Emotion",
        objectives: [
          "Explain what an interjection is and why it is important in spoken English.",
          "Recognize the main characteristics of interjections.",
          "Use common interjections to express happiness, surprise, pain, and disgust."
        ],
        rules: [
          {
            number: 1,
            title: "Main Characteristics",
            desc: "Interjections help speakers express emotions, react to situations, attract attention, and communicate attitudes naturally.",
            tableHead: ["Characteristic", "Explanation", "Example"],
            table: [
              ["<strong>They express feelings and reactions</strong>", "They show what the speaker feels at that moment.", "<strong>Wow!</strong> <strong>Oh!</strong> <strong>Ouch!</strong> <strong>Yuck!</strong>"],
              ["<strong>They are often grammatically independent</strong>", "The sentence remains complete without the interjection.", "<strong>Oh</strong>, I forgot my homework."],
              ["<strong>They are more common in spoken language</strong>", "They make conversations sound natural and show the speaker's attitude.", "<strong>Hey!</strong> Wait for me."],
              ["<strong>They can have one word or several words</strong>", "Some interjections are short expressions.", "<strong>Hey!</strong> · <strong>Oh no!</strong> · <strong>Good grief!</strong> · <strong>My goodness!</strong>"]
            ],
            tip: "Take the interjection out of the sentence: if the sentence is still complete, the word was an interjection. “I forgot my homework” works without “Oh”."
          },
          {
            number: 2,
            title: "Interjections Expressing Emotions",
            desc: "For teaching purposes, it is useful to classify interjections according to their <strong>communicative function</strong>. There is no single classification used by every grammar book.",
            tableHead: ["Emotion", "Interjections", "Example"],
            table: [
              ["<strong>Happiness and excitement</strong>", "Hooray! · Yay! · Woo-hoo! · Yippee!", "<strong>Hooray!</strong> We won the competition."],
              ["<strong>Surprise and amazement</strong>", "Wow! · Oh! · Whoa! · Really?", "<strong>Wow!</strong> Your presentation is excellent."],
              ["<strong>Pain and discomfort</strong>", "Ouch! · Ow! · Ugh!", "<strong>Ouch!</strong> I hit my knee."],
              ["<strong>Disgust</strong>", "Yuck! · Eww! · Ugh!", "<strong>Yuck!</strong> This milk smells bad."]
            ]
          }
        ]
      },

      /* ---------- 2. Other reactions (guide section 3B) ---------- */
      {
        title: "Interjections Expressing Other Reactions",
        objectives: [
          "Use interjections for disappointment, frustration, relief, hesitation, and more.",
          "Understand that the meaning of an interjection depends on context and tone of voice."
        ],
        rules: [
          {
            number: 1,
            title: "Other Reactions and Functions",
            desc: "Interjections do more than show emotion: they also greet, call attention, encourage, agree, or reject.",
            tableHead: ["Function", "Common interjections", "Example"],
            table: [
              ["Disappointment or sadness", "Oh no!, Alas!", "<strong>Oh no!</strong> I missed the bus."],
              ["Frustration", "Argh!, Darn!", "<strong>Argh!</strong> My computer crashed."],
              ["Relief", "Phew!", "<strong>Phew!</strong> The exam is over."],
              ["Hesitation or thinking", "Hmm…, Er…, Uh…", "<strong>Hmm</strong>, I need more time."],
              ["Attracting attention", "Hey!, Look!", "<strong>Hey!</strong> Wait for me."],
              ["Greeting", "Hi!, Hello!", "<strong>Hi!</strong> How are you?"],
              ["Encouragement", "Come on!, Bravo!", "<strong>Bravo!</strong> Excellent work."],
              ["Agreement or recognition", "Yes!, Exactly!, Aha!", "<strong>Aha!</strong> Now I understand."],
              ["Disagreement or rejection", "No!, Nah!, Uh-uh!", "<strong>Uh-uh</strong>, that isn't mine."],
              ["Indifference", "Meh.", "<strong>Meh</strong>, I don't like it."]
            ],
            tip: "The exact meaning depends on context, tone of voice, and the situation. For example, <strong>Oh!</strong> can communicate surprise, disappointment, understanding, or realization."
          }
        ]
      },

      /* ---------- 3. Primary vs secondary and punctuation (guide sections 4-5) ---------- */
      {
        title: "Primary and Secondary Interjections, and Punctuation",
        objectives: [
          "Distinguish primary interjections from secondary interjections.",
          "Choose the correct punctuation: exclamation mark, comma, question mark, or ellipsis."
        ],
        rules: [
          {
            number: 1,
            title: "Primary Interjections",
            desc: "Expressions that function specifically as interjections rather than as ordinary words belonging to another grammatical category.",
            tableHead: ["Interjection", "Typical meaning", "Example"],
            table: [
              ["<strong>Ah!</strong>", "Understanding or realization", "<strong>Ah!</strong> Now I understand."],
              ["<strong>Ouch!</strong>", "Pain", "<strong>Ouch!</strong> That hurts."],
              ["<strong>Wow!</strong>", "Surprise or admiration", "<strong>Wow!</strong> What a beautiful building!"],
              ["<strong>Hmm…</strong>", "Thinking or hesitation", "<strong>Hmm…</strong> Let me think."],
              ["<strong>Phew!</strong>", "Relief", "<strong>Phew!</strong> We are safe."],
              ["<strong>Ugh!</strong>", "Disgust or annoyance", "<strong>Ugh!</strong> This smells terrible."]
            ]
          },
          {
            number: 2,
            title: "Secondary Interjections",
            desc: "Words or expressions that originate in other grammatical categories but can also function as interjections.",
            tableHead: ["Expression", "Other grammatical use", "Interjectional use"],
            table: [
              ["<strong>Goodness!</strong>", "Noun", "<strong>Goodness!</strong> That was close."],
              ["<strong>Great!</strong>", "Adjective", "<strong>Great!</strong> We finished early."],
              ["<strong>Well…</strong>", "Adverb or discourse marker", "<strong>Well</strong>, I disagree."],
              ["<strong>Look!</strong>", "Verb", "<strong>Look!</strong> There is a rainbow."],
              ["<strong>Damn!</strong>", "Profanity with other uses", "<strong>Damn!</strong> I forgot my keys."],
              ["<strong>My goodness!</strong>", "Multiword expression", "<strong>My goodness!</strong> That is expensive."]
            ],
            tip: "The distinction depends on how an expression <strong>functions in context</strong>, not merely on its spelling. Some expressions can be analyzed differently by different linguistic frameworks."
          },
          {
            number: 3,
            title: "Interjections and Punctuation",
            desc: "Interjections do not always require an exclamation mark. Punctuation depends on the strength of the emotion and on how the expression is integrated into the sentence.",
            tableHead: ["Punctuation", "Use", "Examples"],
            table: [
              ["<strong>Exclamation mark ( ! )</strong>", "Strong emotions or independent exclamations", "Wow! That is fantastic. · Ouch! My foot hurts."],
              ["<strong>Comma ( , )</strong>", "When the interjection is followed by the rest of the sentence", "Oh, I forgot my notebook. · Well, let's begin the lesson."],
              ["<strong>Question mark ( ? )</strong>", "When the expression communicates a question or request for clarification", "Huh? What did you say? · Oh? Is that true?"],
              ["<strong>Ellipsis ( … )</strong>", "Hesitation or an unfinished thought in informal writing", "Hmm… I am not sure."]
            ],
            tip: "These are common conventions, not rigid rules for every expression. In formal academic writing, interjections are generally uncommon unless the writer is quoting speech or analyzing dialogue."
          }
        ]
      },

      /* ---------- 4. Academic / IT contexts and other parts of speech (guide sections 6-7) ---------- */
      {
        title: "Interjections in Academic and IT Contexts",
        objectives: [
          "Use interjections in situations related to technology and university life.",
          "Tell the difference between an interjection and a formal transition or discourse marker.",
          "Classify a word by its function in context, not by one fixed category."
        ],
        rules: [
          {
            number: 1,
            title: "Interjections in Academic and IT Contexts",
            desc: "Technology-related examples help connect grammar with your studies.",
            tableHead: ["Context", "Example", "Communicative function"],
            table: [
              ["Computer programming", "<strong>Oops!</strong> I made a coding error.", "Recognizing a mistake"],
              ["Software development", "<strong>Great!</strong> The application works.", "Expressing satisfaction"],
              ["Classroom", "<strong>Hmm</strong>, I need to check my answer.", "Showing thought"],
              ["Research presentation", "<strong>Wow!</strong> The results are interesting.", "Expressing surprise"],
              ["Computer troubleshooting", "<strong>Uh-oh!</strong> The server is down.", "Signaling a problem"],
              ["Team project", "<strong>Hooray!</strong> We finished the project.", "Celebrating success"],
              ["Laboratory", "<strong>Ouch!</strong> Be careful with that tool.", "Expressing pain or warning"]
            ],
            tip: "An interjection is <strong>not</strong> the same as a formal transition or discourse marker. <em>Wow!</em> expresses a reaction, while <em>therefore</em> introduces a logical relationship. In a research paper, <em>therefore</em>, <em>however</em>, and <em>consequently</em> are usually more appropriate for connecting arguments."
          },
          {
            number: 2,
            title: "Interjections versus Other Parts of Speech",
            desc: "The same word can have different grammatical functions depending on its use.",
            tableHead: ["Word", "Function 1", "Function 2"],
            table: [
              ["<strong>Well</strong>", "Adverb: She speaks <strong>well</strong>.", "Interjection: <strong>Well</strong>, let's start."],
              ["<strong>Great</strong>", "Adjective: It is a <strong>great</strong> idea.", "Interjection: <strong>Great!</strong> We agree."],
              ["<strong>Look</strong>", "Verb: <strong>Look</strong> at the screen.", "Attention-getting interjection: <strong>Look!</strong> The screen is off."],
              ["<strong>Oh</strong>", "Interjection: <strong>Oh</strong>, I see.", "Usually not a conventional noun, verb, or adjective"],
              ["<strong>Yes</strong>", "Response word: <strong>Yes</strong>, I agree.", "Often classified as an interjection or a response particle, depending on the grammar framework"]
            ],
            tip: "Key principle: classify words according to their <strong>function in context</strong>, rather than memorizing one fixed category for every word."
          }
        ],
        quickReferenceHead: ["Function", "Interjections"],
        quickReference: [
          ["Happiness", "Hooray!, Yay!, Woo-hoo!, Yippee!"],
          ["Surprise", "Wow!, Oh!, Whoa!, Really?"],
          ["Pain", "Ouch!, Ow!, Ugh!"],
          ["Disgust", "Yuck!, Eww!, Ugh!"],
          ["Relief", "Phew!"],
          ["Frustration", "Argh!, Darn!"],
          ["Hesitation", "Hmm…, Er…, Uh…"],
          ["Recognition", "Aha!, Ah!, Oops!, Uh-oh!"]
        ],
        memoryTipsTitle: "⭐ Quick Review",
        memoryTips: [
          "An interjection shows a <strong>feeling or reaction</strong> and is usually <strong>grammatically independent</strong> from the rest of the sentence.",
          "Interjections are most common in <strong>spoken English</strong>; in formal academic writing they are generally uncommon.",
          "Use an <strong>exclamation mark</strong> for strong emotion, a <strong>comma</strong> when the sentence continues, a <strong>question mark</strong> for clarification, and an <strong>ellipsis</strong> for hesitation.",
          "Words like <strong>well</strong>, <strong>great</strong>, and <strong>look</strong> can be other parts of speech: always check their <strong>function in context</strong>."
        ]
      }
    ]
  };

  /* Practice quiz for the Interjections guide (section 8, "Choose the correct interjection", A2).
     Multiple-choice, rendered inside the same tabbed quiz box used for the other topics. */
  GRAMMAR_CONTENT.interjections.practice = [
    {
      id: "interjections-quiz-1",
      short: "Correct Interjection",
      type: "mc",
      title: "Quiz 1 — Choose the Correct Interjection",
      instructions: "Select one answer for each situation, then check your results.",
      questions: [
        { text: "You see an amazing new computer. What do you say?", options: ["Ouch!", "Wow!", "Ugh!"], correct: 1 },
        { text: "You accidentally delete your homework file.", options: ["Hooray!", "Oops!", "Yuck!"], correct: 1 },
        { text: "Your friend hits their finger and feels pain.", options: ["Ouch!", "Aha!", "Yippee!"], correct: 0 },
        { text: "You finish a difficult exam and feel relieved.", options: ["Phew!", "Eww!", "Argh!"], correct: 0 },
        { text: "You finally understand a difficult grammar rule.", options: ["Aha!", "Yuck!", "Uh-uh!"], correct: 0 },
        { text: "You smell spoiled food.", options: ["Bravo!", "Yuck!", "Hooray!"], correct: 1 }
      ]
    }
  ];
