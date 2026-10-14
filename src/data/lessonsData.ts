import { Lesson, SubjectId, AgeGroup } from '../types';

export const LESSONS: Record<string, Lesson> = {
  lesson_1: {
    id: 'lesson_1',
    levelId: 1,
    title: 'Discovering Numbers & The Living World',
    subjectId: 'math',
    ageGroup: '9-11',
    estimatedMinutes: 3,
    summary: 'Learn how patterns in mathematics and living organisms interact in our everyday world!',
    sections: [
      {
        heading: '1. The Magic of Addition & Grouping',
        content:
          'Addition is joining two or more groups of things together. When you have 15 shining stars and gather 7 more, you combine them: 15 + 7 = 22. Grouping by tens makes mental arithmetic lightning fast!',
        speechText:
          'Addition is joining two or more groups of things together. Grouping numbers by tens makes calculating super fast and fun!',
        illustrationType: 'diagram',
      },
      {
        heading: '2. Cells: The Building Blocks of Life',
        content:
          'Every living creature—from the tiniest garden ant to the giant blue whale—is made of microscopic building blocks called cells. Plant cells have sturdy walls and green chloroplasts that capture sunlight.',
        speechText:
          'Every living creature on Earth is made of cells. Plant cells use green chloroplasts to capture warm sunlight and make food!',
        illustrationType: 'experiment',
      },
      {
        heading: '3. Input & Output in Technology',
        content:
          'Computers take instructions from us using input devices like your mouse, touchscreen, and keyboard. They process this information in the CPU and display results on your screen as output!',
        speechText:
          'Computers use input devices like your keyboard to receive commands, process them, and show you amazing results on your screen!',
        illustrationType: 'story',
      },
    ],
    keyWords: [
      {
        word: 'Chloroplast',
        meaning: 'A tiny green part inside plant cells that absorbs sunlight to make sugar through photosynthesis.',
        example: 'Leaves look vibrant green because of thousands of chloroplasts absorbing light.',
      },
      {
        word: 'Algorithm',
        meaning: 'A clear list of step-by-step instructions to solve a problem or finish a task.',
        example: 'A recipe for baking chocolate cookies is like a delicious algorithm.',
      },
      {
        word: 'Variable',
        meaning: 'A placeholder or symbol that can hold different values or numbers.',
        example: 'In the equation x + 3 = 10, the letter x is a variable representing 7.',
      },
    ],
    miniActivity: {
      type: 'quick_check',
      title: 'Quick Concept Check',
      prompt: 'If you combine 2 groups of 8 apples and then eat 4 apples, how many apples are left?',
      options: ['12 Apples', '16 Apples', '10 Apples', '14 Apples'],
      correctOption: '12 Apples',
      feedback: 'Correct! 2 × 8 = 16 apples, and 16 - 4 = 12 apples remaining!',
    },
  },

  lesson_2: {
    id: 'lesson_2',
    levelId: 2,
    title: 'States of Matter & Atmospheric Wonders',
    subjectId: 'science',
    ageGroup: '9-11',
    estimatedMinutes: 4,
    summary: 'Discover how water transforms between solid ice, fluid liquid, and invisible steam.',
    sections: [
      {
        heading: '1. Solids, Liquids, and Gases',
        content:
          'Matter is everything around you that has mass and takes up space. In solids, atoms are packed tightly and vibrate in place. In liquids, they slide past each other. In gases, they fly apart with lots of energy!',
        speechText:
          'Matter has three common states on Earth: solid, liquid, and gas. Adding heat makes particles move faster and spread apart.',
        illustrationType: 'diagram',
      },
      {
        heading: '2. The Endless Water Cycle',
        content:
          'Water on Earth never disappears—it recycles! The sun warms ocean water, turning it into invisible vapor (evaporation). As it rises, it cools and forms clouds (condensation), before falling as rain (precipitation).',
        speechText:
          'The water cycle has three major steps: evaporation into the sky, condensation into fluffy clouds, and precipitation falling as rain.',
        illustrationType: 'story',
      },
    ],
    keyWords: [
      {
        word: 'Evaporation',
        meaning: 'The process where liquid warms up and turns into an invisible gas or vapor.',
        example: 'Puddles on the sidewalk disappear on sunny afternoons due to evaporation.',
      },
      {
        word: 'Condensation',
        meaning: 'When water vapor cools down and turns back into liquid droplets.',
        example: 'Tiny water droplets forming on the outside of an iced lemonade cup is condensation.',
      },
      {
        word: 'Precipitation',
        meaning: 'Any form of moisture falling from clouds to Earth, such as rain, snow, sleet, or hail.',
        example: 'Snowflakes gently drifting down on winter mornings is cold precipitation.',
      },
    ],
    miniActivity: {
      type: 'quick_check',
      title: 'Water Cycle Quiz',
      prompt: 'Which step in the water cycle is responsible for forming clouds in the sky?',
      options: ['Evaporation', 'Condensation', 'Precipitation', 'Collection'],
      correctOption: 'Condensation',
      feedback: 'Spot on! Water vapor cools and condenses around microscopic dust particles to form clouds.',
    },
  },

  lesson_3: {
    id: 'lesson_3',
    levelId: 3,
    title: 'Power of Words: Synonyms, Antonyms & Punctuation',
    subjectId: 'english',
    ageGroup: '9-11',
    estimatedMinutes: 3,
    summary: 'Unlock expressive writing skills and learn how commas, periods, and apostrophes give clarity.',
    sections: [
      {
        heading: '1. Painting with Synonyms',
        content:
          'Instead of saying "the big dog", great writers choose colorful synonyms like "the colossal hound" or "the majestic canine". Synonyms add flavor and excitement to stories!',
        speechText:
          'Synonyms are words with similar meanings. Using lively synonyms makes your stories captivating and colorful!',
        illustrationType: 'story',
      },
      {
        heading: '2. The Secret Punctuation Codes',
        content:
          'Punctuation marks are like traffic signs for reading. A period (.) tells you to come to a full stop. A comma (,) signals a gentle pause. An exclamation mark (!) shows joy, surprise, or urgent enthusiasm!',
        speechText:
          'Punctuation marks guide readers just like traffic lights guide drivers. Periods stop, commas pause, and exclamation points add excitement!',
        illustrationType: 'diagram',
      },
    ],
    keyWords: [
      {
        word: 'Synonym',
        meaning: 'A word having the same or nearly the same meaning as another word in the same language.',
        example: '"Courageous" is a heroic synonym for "brave".',
      },
      {
        word: 'Antonym',
        meaning: 'A word opposite in meaning to another word.',
        example: '"Transparent" is an antonym of "opaque".',
      },
      {
        word: 'Metaphor',
        meaning: 'A comparison stating one thing is another without using "like" or "as".',
        example: '"Her mind was a vibrant sponge of curiosity."',
      },
    ],
    miniActivity: {
      type: 'quick_check',
      title: 'Vocabulary Explorer',
      prompt: 'Which word is the best synonym for "Astonished"?',
      options: ['Bored', 'Amazed', 'Tired', 'Calm'],
      correctOption: 'Amazed',
      feedback: 'Wonderful! Both "astonished" and "amazed" describe being filled with sudden wonder.',
    },
  },

  lesson_4: {
    id: 'lesson_4',
    levelId: 4,
    title: 'How Computers Think: Bits, Bytes & Logic',
    subjectId: 'computer',
    ageGroup: '9-11',
    estimatedMinutes: 4,
    summary: 'Step behind the screen to discover the binary language of zeroes and ones that powers the world.',
    sections: [
      {
        heading: '1. The Binary Language: 0 and 1',
        content:
          'At the deepest level, computers are made of billions of microscopic electric switches called transistors. When a switch is OFF, that represents 0. When it is ON, it represents 1. Each 0 or 1 is called a BIT!',
        speechText:
          'Computers speak binary code using only zeroes and ones. A single 0 or 1 is called a bit, and eight bits together form one byte!',
        illustrationType: 'diagram',
      },
      {
        heading: '2. Internet Safety & Strong Passwords',
        content:
          'The internet connects millions of computers worldwide. Just like locking your front door, you protect your digital accounts with strong passwords containing upper and lower case letters, numbers, and symbols.',
        speechText:
          'Stay safe online by never sharing passwords with anyone except your parents, and never opening suspicious links.',
        illustrationType: 'story',
      },
    ],
    keyWords: [
      {
        word: 'Binary',
        meaning: 'A number system that uses only two digits, 0 and 1, to represent all computer data.',
        example: 'Every video, game, and picture is translated into binary code by computers.',
      },
      {
        word: 'Transistor',
        meaning: 'A microscopic electrical component in computer chips that switches electric currents on or off.',
        example: 'Modern computer processors pack billions of transistors onto a chip the size of a fingernail.',
      },
      {
        word: 'Encryption',
        meaning: 'Scrambling information so only the authorized recipient with the secret key can read it.',
        example: 'Websites use encryption to keep your passwords secure as they travel across the network.',
      },
    ],
    miniActivity: {
      type: 'quick_check',
      title: 'Byte Math Check',
      prompt: 'How many bits are packed together to make one standard computer Byte?',
      options: ['4 Bits', '8 Bits', '16 Bits', '32 Bits'],
      correctOption: '8 Bits',
      feedback: 'Spot on! Exactly 8 bits combine to create 1 byte of digital storage.',
    },
  },

  lesson_5: {
    id: 'lesson_5',
    levelId: 5,
    title: 'World 1 Milestone: The Logic of Deductive Reasoning',
    subjectId: 'logic',
    ageGroup: '9-11',
    estimatedMinutes: 4,
    summary: 'Prepare for the Master Test by mastering clues, logic grids, and eliminating false leads.',
    sections: [
      {
        heading: '1. How Detectives Use Deductive Logic',
        content:
          'Deductive reasoning means starting with facts and following logical rules to reach a certain conclusion. If all birds have feathers, and a penguin is a bird, then a penguin must have feathers!',
        speechText:
          'Deductive reasoning helps you solve mysteries by combining true clues to reach guaranteed answers.',
        illustrationType: 'story',
      },
      {
        heading: '2. Preparing for the Master Test',
        content:
          'The Master Test will test 15 questions across Math, Science, English, Logic, and Tech. You have 60 seconds per question. Stay calm, read carefully, and remember the concepts you practiced in Levels 1 through 5!',
        speechText:
          'You are ready for the Master Test! Take your time, trust your knowledge, and aim for a score of 12 or higher to pass with flying colors.',
        illustrationType: 'experiment',
      },
    ],
    keyWords: [
      {
        word: 'Deduction',
        meaning: 'A logical conclusion reached by applying reasoning to established facts.',
        example: 'Through deduction, Sherlock Holmes determined which key opened the chest.',
      },
      {
        word: 'Hypothesis',
        meaning: 'A proposed educated explanation for an observation that can be tested through experiments.',
        example: 'Our hypothesis was that plants in sunlight would grow taller than plants in darkness.',
      },
      {
        word: 'Synthesis',
        meaning: 'Combining different ideas and skills into a complete, unified understanding.',
        example: 'The Master Test requires synthesis of your math, science, and reading skills.',
      },
    ],
    miniActivity: {
      type: 'quick_check',
      title: 'Milestone Logic Warm-up',
      prompt: 'Rule: If it rains, the grass gets wet. The grass is dry. What must be true?',
      options: ['It rained all morning', 'It did not rain', 'The sky is green', 'It is snowing'],
      correctOption: 'It did not rain',
      feedback: 'Brilliant deduction! If it had rained, the grass would be wet. Since it is dry, it did not rain.',
    },
  },

  lesson_nursery: {
    id: 'lesson_nursery',
    levelId: 1,
    title: 'Early Explorers: Phonics, Colors & Animal Friends (Nursery & KG)',
    subjectId: 'english',
    ageGroup: '3-5',
    estimatedMinutes: 2,
    summary: 'A cheerful, bite-sized story introducing the alphabet, bright rainbow colors, and friendly baby animals!',
    sections: [
      {
        heading: '1. Singing Letters: Phonics A, B, C',
        content:
          'Letters are magical building blocks! "A" is for crunchy sweet Apple 🍎. "B" is for bouncy Ball ⚽. "C" is for cute cuddly Cat 🐱. Every letter makes a fun sound!',
        speechText:
          'A is for Apple! B is for Ball! C is for Cat! Singing phonics helps us read wonderful storybooks.',
        illustrationType: 'story',
      },
      {
        heading: '2. Joyful Counting from 1 to 5',
        content:
          'Hold up your fingers and count along! 1 shining sun in the sky ☀️, 2 smiling eyes 👀, 3 fluffy clouds ☁️, 4 cute puppy paws 🐾, and 5 stars on a high-five hand 🖐️!',
        speechText:
          'One, two, three, four, five! Counting objects around your room is a super explorer superpower.',
        illustrationType: 'diagram',
      },
      {
        heading: '3. Animals & Their Cheerful Sounds',
        content:
          'Animals have their own happy languages! Puppies say "Woof Woof" 🐶, kittens purr "Meow Meow" 🐱, cows say "Mooo" 🐮, and ducklings splash with "Quack Quack" 🦆!',
        speechText:
          'Dogs say Woof Woof! Cats say Meow! Cows say Mooo! What animal sound is your favorite?',
        illustrationType: 'experiment',
      },
    ],
    keyWords: [
      {
        word: 'Phonics',
        meaning: 'The fun sounds that letters make when we say and read them.',
        example: 'Phonics helps us read "C-A-T" as Cat!',
      },
      {
        word: 'Rainbow',
        meaning: 'An arc of seven vibrant colors that lights up the sky after warm rain.',
        example: 'Red, orange, yellow, green, blue, indigo, and violet shine in the rainbow.',
      },
      {
        word: 'Pair',
        meaning: 'Two things that belong together, like two shoes or two socks.',
        example: 'You have a cozy pair of bunny slippers!',
      },
    ],
    miniActivity: {
      type: 'quick_check',
      title: 'Baby Animal Sound Check',
      prompt: 'What sound does a friendly puppy make? 🐶',
      options: ['Woof Woof', 'Meow Meow', 'Quack Quack', 'Mooo'],
      correctOption: 'Woof Woof',
      feedback: 'Yay! High five! 🐾 Puppies say Woof Woof happily!',
    },
  },

  lesson_senior: {
    id: 'lesson_senior',
    levelId: 5,
    title: 'Senior Secondary: Calculus, Electromagnetism & Genetic Code (Class 11 & 12)',
    subjectId: 'science',
    ageGroup: '17-18',
    estimatedMinutes: 5,
    summary: 'Collegiate principles of infinitesimal change, electromagnetic flux, and macromolecular translation.',
    sections: [
      {
        heading: '1. The Calculus of Instantaneous Change',
        content:
          'Calculus models continuous change. The derivative f\'(x) represents the limiting value of Δy/Δx as Δx approaches zero—yielding the exact instantaneous rate of change or tangent slope at any point along a curve.',
        speechText:
          'Calculus models dynamic systems in physics and economics by calculating exact instantaneous slopes through limits.',
        illustrationType: 'diagram',
      },
      {
        heading: '2. Electromagnetic Induction & Maxwell’s Insights',
        content:
          'Faraday’s Law demonstrates that a time-varying magnetic field induces an electromotive force (EMF) around a closed loop: ε = -dΦ/dt. Lenz’s law accounts for the negative sign, conserving energy by opposing the change in flux.',
        speechText:
          'Faraday’s Law reveals that changing magnetic flux generates electric currents, the bedrock of electrical generators and modern power grids.',
        illustrationType: 'experiment',
      },
      {
        heading: '3. Molecular Translation: DNA to Polypeptide',
        content:
          'Messenger RNA (mRNA) carries codon triplets transcribed from nuclear DNA. Transfer RNA (tRNA) with matching anticodons brings specific amino acids to ribosomal active sites, sequentially polymerizing peptide chains.',
        speechText:
          'Ribosomes read mRNA codons and synthesize proteins with high fidelity, creating the structural and enzymatic molecules of living organisms.',
        illustrationType: 'story',
      },
    ],
    keyWords: [
      {
        word: 'Derivative',
        meaning: 'A mathematical measure of how a function value changes as its input parameter changes.',
        example: 'Velocity is the first derivative of position with respect to time.',
      },
      {
        word: 'Electromagnetic Flux',
        meaning: 'A measure of the total quantity of magnetic field lines passing through a given surface area.',
        example: 'Rotating a conductive coil alters the magnetic flux and induces an electric voltage.',
      },
      {
        word: 'Anticodon',
        meaning: 'A trinucleotide sequence located at one end of a transfer RNA (tRNA) molecule complementary to mRNA.',
        example: 'The AUG start codon pairs specifically with the UAC anticodon on initiator tRNA.',
      },
    ],
    miniActivity: {
      type: 'quick_check',
      title: 'Instantaneous Rate Check',
      prompt: 'What is the derivative of f(x) = x² with respect to x?',
      options: ['2x', 'x', '2', 'x³'],
      correctOption: '2x',
      feedback: 'Correct! By the power rule d/dx(x^n) = n·x^(n-1), d/dx(x²) = 2x.',
    },
  },
};
