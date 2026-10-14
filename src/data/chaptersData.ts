import { ChapterInfo, GradeLevel, Question, SubjectId, QuestionType, AgeGroup, AppLanguage } from '../types';
import { getAgeGroupFromGrade } from './gradesData';
import { ASSET_PATHS } from '../assets/assetRegistry';
import { SUBJECTS, getSubjectById } from './subjects';
import { ALL_NCERT_CHAPTERS } from './ncert';

export type { ChapterInfo };

/**
 * Complete Curriculum Chapters Registry for All Classes:
 * Nursery, LKG/UKG, Class 1 to Class 12.
 * Includes official NCERT textbook aligned chapters!
 */
export const CHAPTERS_REGISTRY: ChapterInfo[] = [
  ...ALL_NCERT_CHAPTERS,
  // Nursery & Pre-Primary Base Chapters
  // ==========================================
  // NURSERY (Ages 3-4)
  // ==========================================
  // Math
  {
    id: 'nursery_math_ch1',
    chapterNumber: 1,
    gradeLevel: 'nursery',
    subjectId: 'math',
    title: 'Chapter 1: Counting Numbers 1 to 5',
    hindiTitle: 'अध्याय 1: 1 से 5 तक गिनती',
    description: 'Learn to count fingers, toys, fruits, and stars from 1 to 5 with cheerful visuals.',
    keyConcepts: ['Number recognition 1-5', 'Finger counting', 'One-to-one correspondence', 'Star counting'],
    difficulty: 'easy',
    questionCount: 25,
    icon: '🔢',
    tags: ['Counting', 'Basics', 'Visuals'],
  },
  {
    id: 'nursery_math_ch2',
    chapterNumber: 2,
    gradeLevel: 'nursery',
    subjectId: 'math',
    title: 'Chapter 2: Shapes & Primary Colors',
    hindiTitle: 'अध्याय 2: आकृतियां और प्राथमिक रंग',
    description: 'Discover circles, squares, triangles, and bright colors like red, blue, and yellow.',
    keyConcepts: ['Circle, Square, Triangle', 'Red, Blue, Yellow colors', 'Shape tracing', 'Real-world shape matching'],
    difficulty: 'easy',
    questionCount: 25,
    icon: '🔴',
    tags: ['Shapes', 'Colors', 'Visuals'],
  },
  {
    id: 'nursery_math_ch3',
    chapterNumber: 3,
    gradeLevel: 'nursery',
    subjectId: 'math',
    title: 'Chapter 3: Big vs Small Comparison',
    hindiTitle: 'अध्याय 3: बड़ा और छोटा तुलना',
    description: 'Compare heights, sizes, big elephants vs tiny ants, and heavy vs light objects.',
    keyConcepts: ['Big vs Small', 'Tall vs Short', 'Heavy vs Light', 'Size sorting'],
    difficulty: 'easy',
    questionCount: 25,
    icon: '🐘',
    tags: ['Comparison', 'Sizes', 'Observational'],
  },
  // Science
  {
    id: 'nursery_science_ch1',
    chapterNumber: 1,
    gradeLevel: 'nursery',
    subjectId: 'science',
    title: 'Chapter 1: My Five Senses',
    hindiTitle: 'अध्याय 1: हमारी पांच इंद्रियां',
    description: 'Explore eyes to see, ears to hear, nose to smell, tongue to taste, and hands to touch.',
    keyConcepts: ['Sight (Eyes)', 'Hearing (Ears)', 'Smell (Nose)', 'Taste (Tongue)', 'Touch (Hands)'],
    difficulty: 'easy',
    questionCount: 25,
    icon: '👀',
    tags: ['Body', 'Five Senses', 'Nature'],
  },
  {
    id: 'nursery_science_ch2',
    chapterNumber: 2,
    gradeLevel: 'nursery',
    subjectId: 'science',
    title: 'Chapter 2: Animal Friends & Sounds',
    hindiTitle: 'अध्याय 2: पशु मित्र और उनकी बोलियां',
    description: 'Meet cheerful animals like dogs, cats, cows, ducks, and listen to their sounds.',
    keyConcepts: ['Dog (Woof)', 'Cat (Meow)', 'Cow (Moo)', 'Duck (Quack)', 'Lion (Roar)'],
    difficulty: 'easy',
    questionCount: 25,
    icon: '🐶',
    tags: ['Animals', 'Sounds', 'Habitats'],
  },
  // English
  {
    id: 'nursery_english_ch1',
    chapterNumber: 1,
    gradeLevel: 'nursery',
    subjectId: 'english',
    title: 'Chapter 1: Phonics Alphabet A to G',
    hindiTitle: 'अध्याय 1: वर्णमाला ध्वनि A से G',
    description: 'Learn letter sounds and cheerful words from Apple (A) to Grapes (G).',
    keyConcepts: ['A for Apple', 'B for Ball', 'C for Cat', 'D for Dog', 'E for Elephant', 'F for Fish', 'G for Grapes'],
    difficulty: 'easy',
    questionCount: 25,
    icon: '🔤',
    tags: ['Phonics', 'Letters', 'Vocabulary'],
  },
  {
    id: 'nursery_english_ch2',
    chapterNumber: 2,
    gradeLevel: 'nursery',
    subjectId: 'english',
    title: 'Chapter 2: Phonics Alphabet H to N',
    hindiTitle: 'अध्याय 2: वर्णमाला ध्वनि H से N',
    description: 'Explore Hat, Ice cream, Jug, Kite, Lion, Monkey, and Nest phonics.',
    keyConcepts: ['H for Hat', 'I for Ice cream', 'J for Jug', 'K for Kite', 'L for Lion', 'M for Monkey', 'N for Nest'],
    difficulty: 'easy',
    questionCount: 25,
    icon: '🦁',
    tags: ['Phonics', 'Letters', 'Vocabulary'],
  },

  // ==========================================
  // LKG / UKG (Ages 4-6)
  // ==========================================
  // Math
  {
    id: 'lkg_ukg_math_ch1',
    chapterNumber: 1,
    gradeLevel: 'lkg_ukg',
    subjectId: 'math',
    title: 'Chapter 1: Numbers 1 to 20 & Counting',
    hindiTitle: 'अध्याय 1: संख्याएं 1 से 20 और गिनती',
    description: 'Count objects, understand forward and backward counting up to 20.',
    keyConcepts: ['Counting 1-20', 'What comes before/after', 'Missing numbers', 'Number names'],
    difficulty: 'easy',
    questionCount: 25,
    icon: '🔟',
    tags: ['Numbers', 'Counting', 'Sequences'],
  },
  {
    id: 'lkg_ukg_math_ch2',
    chapterNumber: 2,
    gradeLevel: 'lkg_ukg',
    subjectId: 'math',
    title: 'Chapter 2: Simple Visual Addition (1 to 10)',
    hindiTitle: 'अध्याय 2: सरल चित्र जोड़ (1 से 10)',
    description: 'Add cheerful apples, balls, and stars together with visual plus symbols.',
    keyConcepts: ['Adding objects', 'Plus sign (+)', 'Equals sign (=)', 'Sum totals up to 10'],
    difficulty: 'easy',
    questionCount: 25,
    icon: '➕',
    tags: ['Addition', 'Visuals', 'Arithmetic'],
  },
  // Science
  {
    id: 'lkg_ukg_science_ch1',
    chapterNumber: 1,
    gradeLevel: 'lkg_ukg',
    subjectId: 'science',
    title: 'Chapter 1: Plants, Trees & Flowers',
    hindiTitle: 'अध्याय 1: पौधे, पेड़ और फूल',
    description: 'Learn parts of a plant, green leaves, roots in soil, and colorful flowers.',
    keyConcepts: ['Roots & Stem', 'Green Leaves', 'Flower & Petals', 'Watering plants', 'Sunlight'],
    difficulty: 'easy',
    questionCount: 25,
    icon: '🌻',
    tags: ['Plants', 'Botany', 'Nature'],
  },
  {
    id: 'lkg_ukg_science_ch2',
    chapterNumber: 2,
    gradeLevel: 'lkg_ukg',
    subjectId: 'science',
    title: 'Chapter 2: Day, Night & The Weather',
    hindiTitle: 'अध्याय 2: दिन, रात और मौसम',
    description: 'Sunny mornings, glowing moon at night, rainy clouds, and rainbow colors.',
    keyConcepts: ['Sun & Daytime', 'Moon & Stars at Night', 'Rainy & Cloudy', 'Rainbow 7 Colors'],
    difficulty: 'easy',
    questionCount: 25,
    icon: '🌈',
    tags: ['Weather', 'Sky', 'Seasons'],
  },
  // English
  {
    id: 'lkg_ukg_english_ch1',
    chapterNumber: 1,
    gradeLevel: 'lkg_ukg',
    subjectId: 'english',
    title: 'Chapter 1: 3-Letter Sight Words (CVC)',
    hindiTitle: 'अध्याय 1: तीन अक्षरों वाले शब्द (CVC)',
    description: 'Read and identify Cat, Bat, Sun, Pen, Dog, and Hen with cheerful phonics.',
    keyConcepts: ['Short vowel a, e, i, o, u', 'Cat, Bat, Rat', 'Sun, Run, Fun', 'Rhyme words'],
    difficulty: 'easy',
    questionCount: 25,
    icon: '🐱',
    tags: ['Reading', 'Sight Words', 'Phonics'],
  },

  // ==========================================
  // CLASS 1 (Age 6-7)
  // ==========================================
  {
    id: 'class_1_math_ch1',
    chapterNumber: 1,
    gradeLevel: 'class_1',
    subjectId: 'math',
    title: 'Chapter 1: Addition & Subtraction up to 20',
    hindiTitle: 'अध्याय 1: 20 तक जोड़ और घटाव',
    description: 'Master number line addition, takeaway subtraction, and story word problems.',
    keyConcepts: ['Number line addition', 'Takeaway subtraction', 'Word problems', 'Zero concept'],
    difficulty: 'easy',
    questionCount: 25,
    icon: '➕',
    tags: ['Arithmetic', 'Addition', 'Subtraction'],
  },
  {
    id: 'class_1_math_ch2',
    chapterNumber: 2,
    gradeLevel: 'class_1',
    subjectId: 'math',
    title: 'Chapter 2: Shapes & Spatial Understanding',
    hindiTitle: 'अध्याय 2: आकृतियां और स्थान समझ',
    description: 'Inside vs Outside, Top vs Bottom, rolling vs sliding shapes.',
    keyConcepts: ['Inside / Outside', 'Top / Bottom', 'Rolling vs Sliding', 'Rectangles & Triangles'],
    difficulty: 'easy',
    questionCount: 25,
    icon: '📐',
    tags: ['Geometry', 'Spatial', 'Shapes'],
  },
  {
    id: 'class_1_science_ch1',
    chapterNumber: 1,
    gradeLevel: 'class_1',
    subjectId: 'science',
    title: 'Chapter 1: Living and Non-Living Things',
    hindiTitle: 'अध्याय 1: सजीव और निर्जीव वस्तुएं',
    description: 'Discover why plants, birds, and humans are living, while stones and cars are non-living.',
    keyConcepts: ['Need food and water', 'Growth & Breathing', 'Moving on their own', 'Natural vs Man-made'],
    difficulty: 'easy',
    questionCount: 25,
    icon: '🌱',
    tags: ['Biology', 'Living', 'Nature'],
  },
  {
    id: 'class_1_english_ch1',
    chapterNumber: 1,
    gradeLevel: 'class_1',
    subjectId: 'english',
    title: 'Chapter 1: Naming Words (Nouns) & Pronouns',
    hindiTitle: 'अध्याय 1: संज्ञा (Nouns) और सर्वनाम',
    description: 'Identify person, place, animal, and thing names, plus He, She, and It.',
    keyConcepts: ['Names of persons', 'Names of places', 'Animals & things', 'He, She, It, They'],
    difficulty: 'easy',
    questionCount: 25,
    icon: '📖',
    tags: ['Grammar', 'Nouns', 'Pronouns'],
  },

  // ==========================================
  // CLASS 2 (Age 7-8)
  // ==========================================
  {
    id: 'class_2_math_ch1',
    chapterNumber: 1,
    gradeLevel: 'class_2',
    subjectId: 'math',
    title: 'Chapter 1: Place Value (Tens & Ones) to 100',
    hindiTitle: 'अध्याय 1: स्थानीय मान (इकाई और दहाई)',
    description: 'Understand tens and ones, expanded notation, and comparing two-digit numbers.',
    keyConcepts: ['Tens and Ones', 'Expanded form (45 = 40 + 5)', 'Greater than / Less than', 'Ascending order'],
    difficulty: 'medium',
    questionCount: 25,
    icon: '💯',
    tags: ['Place Value', 'Numbers', 'Math'],
  },
  {
    id: 'class_2_math_ch2',
    chapterNumber: 2,
    gradeLevel: 'class_2',
    subjectId: 'math',
    title: 'Chapter 2: Telling Time, Calendar & Money',
    hindiTitle: 'अध्याय 2: समय, कैलेंडर और मुद्रा',
    description: 'Read clock hands (O’clock and half past), days of week, and counting coins/rupees.',
    keyConcepts: ['Clock hour & minute hands', 'Half past / O’clock', 'Days of the week', 'Indian Rupee coins & notes'],
    difficulty: 'medium',
    questionCount: 25,
    icon: '⏰',
    tags: ['Time', 'Money', 'Measurement'],
  },
  {
    id: 'class_2_science_ch1',
    chapterNumber: 1,
    gradeLevel: 'class_2',
    subjectId: 'science',
    title: 'Chapter 1: Animals, Their Homes & Babies',
    hindiTitle: 'अध्याय 1: जीव-जंतु, उनके घर और बच्चे',
    description: 'Herbivores, carnivores, bird nests, caves, burrows, and baby animal names.',
    keyConcepts: ['Cow calf, Dog puppy, Cat kitten', 'Lions in dens, birds in nests', 'Herbivores vs Carnivores', 'Water animals'],
    difficulty: 'medium',
    questionCount: 25,
    icon: '🐾',
    tags: ['Zoology', 'Animals', 'Habitats'],
  },

  // ==========================================
  // CLASS 3 (Age 8-9)
  // ==========================================
  {
    id: 'class_3_math_ch1',
    chapterNumber: 1,
    gradeLevel: 'class_3',
    subjectId: 'math',
    title: 'Chapter 1: Multiplication Basics & Times Tables',
    hindiTitle: 'अध्याय 1: गुणन (गुणा) और पहाड़े',
    description: 'Master repeated addition, multiplication tables 1 to 10, and word problems.',
    keyConcepts: ['Multiplication as repeated addition', 'Times tables 2, 3, 4, 5, 10', 'Product of 2-digit numbers', 'Word problems'],
    difficulty: 'medium',
    questionCount: 25,
    icon: '✖️',
    tags: ['Multiplication', 'Tables', 'Math'],
  },
  {
    id: 'class_3_science_ch1',
    chapterNumber: 1,
    gradeLevel: 'class_3',
    subjectId: 'science',
    title: 'Chapter 1: Matter: Solids, Liquids & Gases',
    hindiTitle: 'अध्याय 1: पदार्थ: ठोस, द्रव और गैस',
    description: 'Discover ice, water, and water vapor, states of matter, melting, and evaporation.',
    keyConcepts: ['Definite shape of solids', 'Liquids take shape of container', 'Gases expand freely', 'Water cycle basics'],
    difficulty: 'medium',
    questionCount: 25,
    icon: '🧊',
    tags: ['Physics', 'Matter', 'Chemistry'],
  },

  // ==========================================
  // CLASS 4 (Age 9-10)
  // ==========================================
  {
    id: 'class_4_math_ch1',
    chapterNumber: 1,
    gradeLevel: 'class_4',
    subjectId: 'math',
    title: 'Chapter 1: Fractions & Parts of a Whole',
    hindiTitle: 'अध्याय 1: भिन्न और पूर्ण के भाग',
    description: 'Numerator, denominator, equal shares, proper fractions, and equivalent fractions.',
    keyConcepts: ['Numerator & Denominator', 'Half (1/2), Quarter (1/4)', 'Comparing like fractions', 'Adding like fractions'],
    difficulty: 'medium',
    questionCount: 25,
    icon: '🍰',
    tags: ['Fractions', 'Math', 'Arithmetic'],
  },
  {
    id: 'class_4_science_ch1',
    chapterNumber: 1,
    gradeLevel: 'class_4',
    subjectId: 'science',
    title: 'Chapter 1: Food Chains & Ecosystems',
    hindiTitle: 'अध्याय 1: खाद्य श्रृंखला और पारिस्थितिकी',
    description: 'Producers, herbivores, carnivores, decomposers, and energy flow in nature.',
    keyConcepts: ['Sun as primary energy source', 'Plants as producers', 'Primary & secondary consumers', 'Decomposers in soil'],
    difficulty: 'medium',
    questionCount: 25,
    icon: '🌿',
    tags: ['Ecology', 'Food Chain', 'Science'],
  },

  // ==========================================
  // CLASS 5 (Age 10-11)
  // ==========================================
  {
    id: 'class_5_math_ch1',
    chapterNumber: 1,
    gradeLevel: 'class_5',
    subjectId: 'math',
    title: 'Chapter 1: Decimals & Long Division',
    hindiTitle: 'अध्याय 1: दशमलव और भाग',
    description: 'Convert fractions to decimals, decimal place value, quotients, and remainders.',
    keyConcepts: ['Tenths and Hundredths', 'Decimal point placement', 'Dividing multi-digit numbers', 'Remainder interpretation'],
    difficulty: 'medium',
    questionCount: 25,
    icon: '➗',
    tags: ['Decimals', 'Division', 'Math'],
  },
  {
    id: 'class_5_math_ch2',
    chapterNumber: 2,
    gradeLevel: 'class_5',
    subjectId: 'math',
    title: 'Chapter 2: Area and Perimeter of Shapes',
    hindiTitle: 'अध्याय 2: क्षेत्रफल और परिमाप',
    description: 'Calculate the perimeter (sum of boundary) and area (length × width) of rectangles and squares.',
    keyConcepts: ['Perimeter formula: 2(l + w)', 'Area of rectangle: l × w', 'Area of square: side²', 'Square unit measurement'],
    difficulty: 'medium',
    questionCount: 25,
    icon: '📏',
    tags: ['Geometry', 'Area', 'Perimeter'],
  },
  {
    id: 'class_5_science_ch1',
    chapterNumber: 1,
    gradeLevel: 'class_5',
    subjectId: 'science',
    title: 'Chapter 1: Human Body: Bones, Muscles & Organs',
    hindiTitle: 'अध्याय 1: मानव शरीर: हड्डियां, मांसपेशियां और अंग',
    description: 'Explore the human skeleton (206 bones), heart pumping blood, lungs, and brain control.',
    keyConcepts: ['Skeletal system (206 bones)', 'Heart circulation', 'Lungs respiration', 'Digestive tract basics'],
    difficulty: 'medium',
    questionCount: 25,
    icon: '🫀',
    tags: ['Anatomy', 'Human Body', 'Biology'],
  },
  {
    id: 'class_5_science_ch2',
    chapterNumber: 2,
    gradeLevel: 'class_5',
    subjectId: 'science',
    title: 'Chapter 2: Force, Work & Simple Machines',
    hindiTitle: 'अध्याय 2: बल, कार्य और सरल मशीनें',
    description: 'Friction, gravity, lever, pulley, inclined plane, wheel, and axle mechanics.',
    keyConcepts: ['Gravity pulls downward', 'Friction resists motion', 'Lever and Fulcrum', 'Pulleys lift heavy loads'],
    difficulty: 'medium',
    questionCount: 25,
    icon: '⚙️',
    tags: ['Physics', 'Forces', 'Mechanics'],
  },

  // ==========================================
  // CLASS 6 (Age 11-12)
  // ==========================================
  {
    id: 'class_6_math_ch1',
    chapterNumber: 1,
    gradeLevel: 'class_6',
    subjectId: 'math',
    title: 'Chapter 1: Integers & Number Line Operations',
    hindiTitle: 'अध्याय 1: पूर्णांक और संख्या रेखा',
    description: 'Positive and negative numbers, zero, absolute value, and integer addition/subtraction.',
    keyConcepts: ['Positive & negative integers', 'Number line moves left for negative', 'Rules of signs (- × - = +)', 'Absolute values'],
    difficulty: 'medium',
    questionCount: 25,
    icon: '➖',
    tags: ['Integers', 'Algebra', 'Math'],
  },
  {
    id: 'class_6_science_ch1',
    chapterNumber: 1,
    gradeLevel: 'class_6',
    subjectId: 'science',
    title: 'Chapter 1: Components of Food & Nutrients',
    hindiTitle: 'अध्याय 1: भोजन के घटक और पोषक तत्व',
    description: 'Carbohydrates, proteins, fats, vitamins, minerals, and deficiency diseases.',
    keyConcepts: ['Energy-giving carbs & fats', 'Body-building proteins', 'Vitamin C scurvy, Vitamin D rickets', 'Balanced diet'],
    difficulty: 'medium',
    questionCount: 25,
    icon: '🥗',
    tags: ['Nutrition', 'Health', 'Biology'],
  },

  // ==========================================
  // CLASS 7 (Age 12-13)
  // ==========================================
  {
    id: 'class_7_math_ch1',
    chapterNumber: 1,
    gradeLevel: 'class_7',
    subjectId: 'math',
    title: 'Chapter 1: Algebraic Expressions & Equations',
    hindiTitle: 'अध्याय 1: बीजीय व्यंजक और समीकरण',
    description: 'Variables, coefficients, constants, combining like terms, and solving for x.',
    keyConcepts: ['Variables (x, y)', 'Coefficients & constants', 'Combining like terms', 'Linear equations in one variable'],
    difficulty: 'medium',
    questionCount: 25,
    icon: '🔣',
    tags: ['Algebra', 'Equations', 'Math'],
  },
  {
    id: 'class_7_science_ch1',
    chapterNumber: 1,
    gradeLevel: 'class_7',
    subjectId: 'science',
    title: 'Chapter 1: Acids, Bases and Salts',
    hindiTitle: 'अध्याय 1: अम्ल, क्षार और लवण',
    description: 'Litmus paper, indicators, pH scale, neutralization reaction, and real-life examples.',
    keyConcepts: ['Acids turn blue litmus red', 'Bases turn red litmus blue', 'Neutralization: Acid + Base = Salt + Water', 'pH scale 0-14'],
    difficulty: 'medium',
    questionCount: 25,
    icon: '🧪',
    tags: ['Chemistry', 'Acids', 'Bases'],
  },

  // ==========================================
  // CLASS 8 (Age 13-14)
  // ==========================================
  {
    id: 'class_8_math_ch1',
    chapterNumber: 1,
    gradeLevel: 'class_8',
    subjectId: 'math',
    title: 'Chapter 1: Linear Equations & Exponents',
    hindiTitle: 'अध्याय 1: एक चर वाले रैखिक समीकरण और घातांक',
    description: 'Multi-step equations, distributive property, laws of exponents, and scientific notation.',
    keyConcepts: ['Laws of exponents (aᵐ × aⁿ = aᵐ⁺ⁿ)', 'Negative exponents', 'Solving for x with brackets', 'Standard form'],
    difficulty: 'hard',
    questionCount: 25,
    icon: '📈',
    tags: ['Algebra', 'Exponents', 'Equations'],
  },
  {
    id: 'class_8_science_ch1',
    chapterNumber: 1,
    gradeLevel: 'class_8',
    subjectId: 'science',
    title: 'Chapter 1: Cell Structure & Functions',
    hindiTitle: 'अध्याय 1: कोशिका: संरचना एवं प्रकार्य',
    description: 'Cell membrane, nucleus, cytoplasm, mitochondria, plant vs animal cell comparison.',
    keyConcepts: ['Mitochondria powerhouse', 'Nucleus genetic control', 'Chloroplasts in plant cells', 'Cell wall vs cell membrane'],
    difficulty: 'hard',
    questionCount: 25,
    icon: '🔬',
    tags: ['Cytology', 'Cells', 'Biology'],
  },

  // ==========================================
  // CLASS 9 (Age 14-15)
  // ==========================================
  {
    id: 'class_9_math_ch1',
    chapterNumber: 1,
    gradeLevel: 'class_9',
    subjectId: 'math',
    title: 'Chapter 1: Polynomials & Coordinate Geometry',
    hindiTitle: 'अध्याय 1: बहुपद और निर्देशांक ज्यामिति',
    description: 'Degrees of polynomials, factor theorem, Cartesian plane quadrants, and plotting coordinates.',
    keyConcepts: ['Degree of polynomial', 'Remainder theorem & factoring', 'Cartesian coordinates (x, y)', 'Four quadrants'],
    difficulty: 'hard',
    questionCount: 25,
    icon: '📐',
    tags: ['Polynomials', 'Coordinate Geometry', 'Math'],
  },
  {
    id: 'class_9_science_ch1',
    chapterNumber: 1,
    gradeLevel: 'class_9',
    subjectId: 'science',
    title: 'Chapter 1: Laws of Motion & Gravitation',
    hindiTitle: 'अध्याय 1: गति के नियम और गुरुत्वाकर्षण',
    description: "Newton's 3 laws of motion, inertia, momentum (p = mv), and universal gravitation formula.",
    keyConcepts: ["1st Law (Inertia)", "2nd Law (F = ma)", "3rd Law (Equal & opposite reaction)", "Gravitation F = G(m₁m₂)/r²"],
    difficulty: 'hard',
    questionCount: 25,
    icon: '🌌',
    tags: ['Physics', 'Motion', 'Gravity'],
  },

  // ==========================================
  // CLASS 10 (Age 15-16) - Board Exam Grade
  // ==========================================
  {
    id: 'class_10_math_ch1',
    chapterNumber: 1,
    gradeLevel: 'class_10',
    subjectId: 'math',
    title: 'Chapter 1: Quadratic Equations & Roots',
    hindiTitle: 'अध्याय 1: द्विघात समीकरण और मूल',
    description: 'Solving ax² + bx + c = 0 using factoring, completing square, and the quadratic formula.',
    keyConcepts: ['Standard form ax² + bx + c = 0', 'Discriminant D = b² - 4ac', 'Nature of roots (real/distinct/imaginary)', 'Quadratic formula'],
    difficulty: 'hard',
    questionCount: 25,
    icon: '🧮',
    tags: ['Algebra', 'Quadratic', 'Board Exam'],
  },
  {
    id: 'class_10_math_ch2',
    chapterNumber: 2,
    gradeLevel: 'class_10',
    subjectId: 'math',
    title: 'Chapter 2: Trigonometry Ratios & Identities',
    hindiTitle: 'अध्याय 2: त्रिकोणमिति का परिचय और सर्वसमिकाएं',
    description: 'Sine, Cosine, Tangent in right triangles, standard angles (30°, 45°, 60°), and sin²θ + cos²θ = 1.',
    keyConcepts: ['sin θ = Opp/Hyp, cos θ = Adj/Hyp, tan θ = Opp/Adj', 'Values at 0°, 30°, 45°, 60°, 90°', 'Identity sin²θ + cos²θ = 1', 'Heights and distances application'],
    difficulty: 'hard',
    questionCount: 25,
    icon: '📐',
    tags: ['Trigonometry', 'Math', 'Formulas'],
  },
  {
    id: 'class_10_science_ch1',
    chapterNumber: 1,
    gradeLevel: 'class_10',
    subjectId: 'science',
    title: 'Chapter 1: Electricity & Ohm’s Law',
    hindiTitle: 'अध्याय 1: विद्युत और ओम का नियम',
    description: 'Electric potential, current (I = Q/t), resistance (V = IR), series vs parallel circuits, and power.',
    keyConcepts: ["Ohm's Law: V = I × R", "Resistors in series: R = R₁ + R₂", "Resistors in parallel: 1/R = 1/R₁ + 1/R₂", "Electric Power P = VI = I²R"],
    difficulty: 'hard',
    questionCount: 25,
    icon: '⚡',
    tags: ['Physics', 'Electricity', 'Circuits'],
  },
  {
    id: 'class_10_science_ch2',
    chapterNumber: 2,
    gradeLevel: 'class_10',
    subjectId: 'science',
    title: 'Chapter 2: Heredity, Evolution & Genetics',
    hindiTitle: 'अध्याय 2: आनुवंशिकता एवं जैव विकास',
    description: "Mendelian genetics, monohybrid crosses, dominant and recessive alleles, and DNA inheritance.",
    keyConcepts: ["Mendel's laws of inheritance", "Dominant vs Recessive traits", "Phenotype vs Genotype ratios", "Sex determination (XX vs XY)"],
    difficulty: 'hard',
    questionCount: 25,
    icon: '🧬',
    tags: ['Genetics', 'Biology', 'DNA'],
  },

  // ==========================================
  // CLASS 11 (Age 16-17)
  // ==========================================
  {
    id: 'class_11_math_ch1',
    chapterNumber: 1,
    gradeLevel: 'class_11',
    subjectId: 'math',
    title: 'Chapter 1: Sets, Relations & Trigonometric Functions',
    hindiTitle: 'अध्याय 1: समुच्चय, संबंध और त्रिकोणमितीय फलन',
    description: 'Set theory union and intersection, domain and range of relations, compound angle formulas.',
    keyConcepts: ['Union (A ∪ B) & Intersection (A ∩ B)', 'Cartesian product of sets', 'sin(A + B) = sin A cos B + cos A sin B', 'Radian vs Degree measures'],
    difficulty: 'hard',
    questionCount: 25,
    icon: '📊',
    tags: ['Advanced Math', 'Sets', 'Functions'],
  },
  {
    id: 'class_11_science_ch1',
    chapterNumber: 1,
    gradeLevel: 'class_11',
    subjectId: 'science',
    title: 'Chapter 1: Kinematics & Thermodynamics',
    hindiTitle: 'अध्याय 1: शुद्ध गतिकी और ऊष्मागतिकी',
    description: 'Equations of motion with calculus, projectile vectors, 1st and 2nd laws of thermodynamics.',
    keyConcepts: ['v = u + at, s = ut + 0.5at², v² = u² + 2as', 'Projectile motion parabola', 'First law ΔU = Q - W', 'Carnot heat engines'],
    difficulty: 'hard',
    questionCount: 25,
    icon: '🔥',
    tags: ['Physics', 'Thermodynamics', 'Kinematics'],
  },

  // ==========================================
  // CLASS 12 (Age 17-18) - Senior Secondary
  // ==========================================
  {
    id: 'class_12_math_ch1',
    chapterNumber: 1,
    gradeLevel: 'class_12',
    subjectId: 'math',
    title: 'Chapter 1: Differential Calculus & Derivatives',
    hindiTitle: 'अध्याय 1: अवकलन (Derivatives) और सीमाएं',
    description: 'Limits, chain rule, product rule, finding slopes, maxima and minima of functions.',
    keyConcepts: ['d/dx(xⁿ) = n·xⁿ⁻¹', 'd/dx(sin x) = cos x', 'Chain rule d/dx[f(g(x))]', 'Maxima and Minima test (f’(x) = 0)'],
    difficulty: 'hard',
    questionCount: 25,
    icon: '∫',
    tags: ['Calculus', 'Derivatives', 'Higher Math'],
  },
  {
    id: 'class_12_math_ch2',
    chapterNumber: 2,
    gradeLevel: 'class_12',
    subjectId: 'math',
    title: 'Chapter 2: Matrices, Determinants & Vectors',
    hindiTitle: 'अध्याय 2: आव्यूह (Matrices), सारणिक और सदिश',
    description: 'Matrix multiplication, inverse matrix A⁻¹ = (1/|A|)adj(A), dot and cross products of 3D vectors.',
    keyConcepts: ['Matrix multiplication row by column', 'Determinant 2x2 and 3x3', 'Dot product A·B = |A||B|cos θ', 'Cross product A×B perpendicular'],
    difficulty: 'hard',
    questionCount: 25,
    icon: '📐',
    tags: ['Linear Algebra', 'Vectors', 'Matrices'],
  },
  {
    id: 'class_12_science_ch1',
    chapterNumber: 1,
    gradeLevel: 'class_12',
    subjectId: 'science',
    title: 'Chapter 1: Electromagnetic Induction & AC',
    hindiTitle: 'अध्याय 1: विद्युत चुंबकीय प्रेरण और प्रत्यावर्ती धारा',
    description: "Faraday's laws of induction, Lenz's law, magnetic flux, transformers, and root-mean-square current.",
    keyConcepts: ['Magnetic flux Φ = B·A cos θ', 'Faraday induced EMF = -dΦ/dt', 'Lenz law opposition of change', 'Transformer ratio Vs/Vp = Ns/Np'],
    difficulty: 'hard',
    questionCount: 25,
    icon: '🧲',
    tags: ['Electromagnetism', 'Physics', 'AC'],
  },
  {
    id: 'class_12_science_ch2',
    chapterNumber: 2,
    gradeLevel: 'class_12',
    subjectId: 'science',
    title: 'Chapter 2: Molecular Biology & Biotechnology',
    hindiTitle: 'अध्याय 2: आणविक जीव विज्ञान और जैव प्रौद्योगिकी',
    description: 'DNA double helix, transcription (mRNA), translation (protein synthesis), CRISPR, and genetic engineering.',
    keyConcepts: ['Watson & Crick DNA double helix', 'Adenine pairs with Thymine, Cytosine with Guanine', 'Central Dogma: DNA -> RNA -> Protein', 'Recombinant DNA & PCR'],
    difficulty: 'hard',
    questionCount: 25,
    icon: '🧬',
    tags: ['Biotechnology', 'DNA', 'Genetics'],
  },
];

/**
 * Filter chapters by Grade and Subject
 */
export function getChapters(grade: GradeLevel, subjectId?: SubjectId): ChapterInfo[] {
  let list = CHAPTERS_REGISTRY.filter((c) => c.gradeLevel === grade);
  if (subjectId) {
    list = list.filter((c) => c.subjectId === subjectId);
    // If no chapters defined specifically in registry for this subject yet, synthesize adaptive NCERT chapters
    if (list.length === 0) {
      list = getFallbackChaptersForSubject(grade, subjectId);
    }
    return list;
  }
  // Return all subjects for this grade
  return getAllChaptersForGrade(grade);
}

/**
 * Get all chapters across all subjects for a specific Grade
 * Guarantees every subject (Hindi, Social Science, Physics, Chemistry, Biology, Math, English, etc.)
 * has complete NCERT curriculum chapters for Class 1 through Class 12.
 */
export function getAllChaptersForGrade(grade: GradeLevel): ChapterInfo[] {
  const direct = CHAPTERS_REGISTRY.filter((c) => c.gradeLevel === grade);
  const all: ChapterInfo[] = [...direct];
  for (const sub of SUBJECTS) {
    if (!all.some((c) => c.subjectId === sub.id)) {
      all.push(...getFallbackChaptersForSubject(grade, sub.id));
    }
  }
  return all;
}

/**
 * Lookup single chapter by ID
 */
export function getChapterById(chapterId: string): ChapterInfo | undefined {
  const found = CHAPTERS_REGISTRY.find((c) => c.id === chapterId);
  if (found) return found;

  // Parse synthesized ID e.g. class_7_english_ch2
  const parts = chapterId.split('_');
  if (parts.length >= 3) {
    const grade = (parts[0] + '_' + parts[1]) as GradeLevel;
    const sub = parts[2] as SubjectId;
    const fallback = getFallbackChaptersForSubject(grade, sub);
    return fallback.find((c) => c.id === chapterId) || fallback[0];
  }
  return undefined;
}

/**
 * Fallback chapter synthesizer to guarantee every class & every subject has full 25-Q chapters
 */
function getFallbackChaptersForSubject(grade: GradeLevel, subjectId: SubjectId): ChapterInfo[] {
  const ageGroup = getAgeGroupFromGrade(grade);
  const subData = getSubjectById(subjectId);
  const subjectName = subData.name;
  const gradeLabel = grade.replace('_', ' ').toUpperCase();
  const topics = subData.topicsByAge[ageGroup] || subData.topicsByAge['9-11'] || [
    'Fundamental Concepts',
    'Core Principles & Rules',
    'Practical Applications',
    'Mastery Problems',
  ];

  const t1 = topics[0] || 'Core Foundations';
  const t2 = topics[1] || 'Applied Concepts';
  const t3 = topics[2] || 'Advanced Problem Solving';
  const t4 = topics[3] || 'Mastery Exercises';

  const icon =
    subjectId === 'hindi'
      ? '📖'
      : subjectId === 'sanskrit'
      ? '📜'
      : subjectId === 'math'
      ? '🔢'
      : subjectId === 'physics'
      ? '⚛️'
      : subjectId === 'chemistry'
      ? '🧪'
      : subjectId === 'biology'
      ? '🌿'
      : subjectId === 'history'
      ? '🏛️'
      : subjectId === 'geography'
      ? '🗺️'
      : subjectId === 'economy'
      ? '📈'
      : subjectId === 'mahabharat'
      ? '🏹'
      : subjectId === 'home_science'
      ? '🍲'
      : subjectId === 'computer'
      ? '💻'
      : subjectId === 'social_science'
      ? '👥'
      : '📚';

  const ncertBookName =
    subjectId === 'hindi'
      ? (grade.includes('11') || grade.includes('12') ? 'NCERT आरोह / वितान' : grade.includes('9') || grade.includes('10') ? 'NCERT क्षितिज / कृतिका' : grade.includes('6') || grade.includes('7') || grade.includes('8') ? 'NCERT वसंत' : 'NCERT रिमझिम')
      : subjectId === 'english'
      ? (grade.includes('12') ? 'NCERT Flamingo' : grade.includes('11') ? 'NCERT Hornbill' : grade.includes('10') ? 'NCERT First Flight' : grade.includes('9') ? 'NCERT Beehive' : grade.includes('7') ? 'NCERT Honeycomb' : grade.includes('8') ? 'NCERT Honeydew' : grade.includes('6') ? 'NCERT Honeysuckle' : 'NCERT Marigold')
      : subjectId === 'physics'
      ? 'NCERT भौतिकी (Physics)'
      : subjectId === 'chemistry'
      ? 'NCERT रसायन विज्ञान (Chemistry)'
      : subjectId === 'biology'
      ? 'NCERT जीव विज्ञान (Biology)'
      : subjectId === 'history'
      ? 'NCERT हमारे अतीत / Themes in Indian History'
      : subjectId === 'geography'
      ? 'NCERT पृथ्वी हमारा आवास / समकालीन भारत'
      : subjectId === 'economy'
      ? 'NCERT अर्थशास्त्र / Economic Development'
      : subjectId === 'sanskrit'
      ? (grade.includes('9') || grade.includes('10') ? 'NCERT शेमुषी' : 'NCERT रुचिरा')
      : subjectId === 'computer'
      ? 'NCERT कंप्यूटर विज्ञान / Python & SQL'
      : subjectId === 'mahabharat'
      ? 'NCERT बाल महाभारत कथा / भगवद्गीता'
      : subjectId === 'home_science'
      ? 'NCERT मानव पारिस्थितिकी एवं परिवार विज्ञान'
      : subjectId === 'social_science'
      ? 'NCERT सामाजिक एवं राजनीतिक जीवन'
      : `NCERT ${subjectName}`;

  return [
    {
      id: `${grade}_${subjectId}_ch1`,
      chapterNumber: 1,
      gradeLevel: grade,
      subjectId,
      title: `Chapter 1: ${t1}`,
      hindiTitle: `अध्याय 1: ${subData.translations.hi?.name || subjectName} - ${t1}`,
      ncertBookName,
      description: `Comprehensive study of ${t1} in ${subjectName} for ${gradeLabel} students. Exactly 25 interactive questions.`,
      keyConcepts: [t1, 'Basic Terminology', 'Key Rules & Principles', 'Interactive Practice'],
      difficulty: 'easy',
      questionCount: 25,
      icon,
      tags: [subData.shortName, gradeLabel, 'NCERT Aligned', 'Beginner'],
    },
    {
      id: `${grade}_${subjectId}_ch2`,
      chapterNumber: 2,
      gradeLevel: grade,
      subjectId,
      title: `Chapter 2: ${t2}`,
      hindiTitle: `अध्याय 2: ${subData.translations.hi?.name || subjectName} - ${t2}`,
      ncertBookName,
      description: `Deep dive into ${t2} with conceptual reasoning and applications for ${gradeLabel}. Exactly 25 interactive questions.`,
      keyConcepts: [t2, t3, 'Analysis & Logic', 'Real-world Context'],
      difficulty: 'medium',
      questionCount: 25,
      icon,
      tags: [subData.shortName, gradeLabel, 'NCERT Aligned', 'Intermediate'],
    },
    {
      id: `${grade}_${subjectId}_ch3`,
      chapterNumber: 3,
      gradeLevel: grade,
      subjectId,
      title: `Chapter 3: ${t3}`,
      hindiTitle: `अध्याय 3: ${subData.translations.hi?.name || subjectName} - ${t3}`,
      ncertBookName,
      description: `Mastery challenges and multi-step questions covering ${t3} and ${t4}. Exactly 25 interactive questions.`,
      keyConcepts: [t3, t4, 'Critical Thinking', 'Exam Mastery'],
      difficulty: 'hard',
      questionCount: 25,
      icon: '⭐',
      tags: [subData.shortName, gradeLabel, 'NCERT Aligned', 'Advanced'],
    },
  ];
}

/**
 * GENERATES EXACTLY 25 QUESTIONS FOR ANY CHAPTER
 * Ensures rich mix of QuestionTypes:
 * - 8 MCQs (Q1 - Q8)
 * - 4 True/False (Q9 - Q12)
 * - 4 Match pairs (Q13 - Q16)
 * - 3 Image / Diagram questions (Q17 - Q19)
 * - 2 Drag & Drop ordering questions (Q20 - Q21)
 * - 2 Memory card flip questions (Q22 - Q23)
 * - 2 Problem-Solving challenges (Q24 - Q25)
 */
export function getQuestionsForChapter(chapter: ChapterInfo, language: AppLanguage = 'en'): Question[] {
  const ageGroup = getAgeGroupFromGrade(chapter.gradeLevel);
  const questions: Question[] = [];
  const chNum = chapter.chapterNumber;
  const subData = getSubjectById(chapter.subjectId);

  // Localized title & subject short name
  const isHi = language === 'hi';
  const isTe = language === 'te';
  const isKn = language === 'kn';
  const isMl = language === 'ml';

  const chTitle = isHi && chapter.hindiTitle ? chapter.hindiTitle : chapter.title;
  const subName = subData.translations[language]?.name || subData.name;
  const subShort = subData.translations[language]?.shortName || subData.shortName;

  const concepts = chapter.keyConcepts;
  const c1 = concepts[0] || (isHi ? 'मुख्य नियम' : 'Core Rules');
  const c2 = concepts[1] || (isHi ? 'प्रमुख सूत्र' : 'Key Formulas');
  const c3 = concepts[2] || (isHi ? 'वास्तविक उदाहरण' : 'Real-World Examples');
  const c4 = concepts[3] || (isHi ? 'व्यावहारिक अनुप्रयोग' : 'Practical Applications');

  // True / False options & answers localized
  const tfLabels: Record<AppLanguage, { trueText: string; falseText: string }> = {
    hi: { trueText: 'सत्य', falseText: 'असत्य' },
    te: { trueText: 'నిజం', falseText: 'అబద్ధం' },
    kn: { trueText: 'ಸರಿ', falseText: 'ತಪ್ಪು' },
    ml: { trueText: 'ശരി', falseText: 'തെറ്റ്' },
    en: { trueText: 'True', falseText: 'False' },
  };
  const currentTf = tfLabels[language] || tfLabels.en;

  // 1. Eight Multiple Choice Questions (Q1 to Q8)
  const mcqData = isHi
    ? [
        {
          q: `[${subShort}] ${chTitle} में, "${c1}" को समझने के लिए कौन सा सिद्धांत सबसे महत्वपूर्ण है?`,
          opts: [`${c1} का प्राथमिक नियम`, `विरोधी द्वितीयक भिन्नता`, `गैर-मानक अपवाद`, `यादृच्छिक अनुमान`],
          ans: `${c1} का प्राथमिक नियम`,
          exp: `${chapter.gradeLevel.toUpperCase()} पाठ्यक्रम के अनुसार, ${c1} विषय का मुख्य आधार है।`,
        },
        {
          q: `इस अध्याय में "${c2}" का सही अनुप्रयोग कौन सा है?`,
          opts: [
            `यह व्यवस्थित नियमों के माध्यम से ${c1} से प्रत्यक्ष जुड़ा है`,
            `यह किसी भी वैज्ञानिक या गणितीय नियम के बिना स्वतंत्र कार्य करता है`,
            `यह केवल शून्य मान होने पर ही काम करता है`,
            `इसका कोई व्यावहारिक उपयोग नहीं है`,
          ],
          ans: `यह व्यवस्थित नियमों के माध्यम से ${c1} से प्रत्यक्ष जुड़ा है`,
          exp: `${c2} सीधे उस व्यवस्थित संबंध को प्रकट करता है जो ${chTitle} के प्रश्नों को हल करता है।`,
        },
        {
          q: `"${c3}" का अध्ययन करते समय सबसे मुख्य निष्कर्ष क्या प्राप्त होता है?`,
          opts: [
            `किताबी सिद्धांतों का व्यावहारिक वास्तविक जीवन में उपयोग समझना`,
            `अवलोकन आंकड़ों को पूरी तरह नजरअंदाज कर देना`,
            `बिना समझे केवल अनुमान लगाना`,
            `इकाई और मात्रक को हटा देना`,
          ],
          ans: `किताबी सिद्धांतों का व्यावहारिक वास्तविक जीवन में उपयोग समझना`,
          exp: `${c3} जैसे वास्तविक उदाहरण अमूर्त सिद्धांतों को ठोस और समझने योग्य बनाते हैं।`,
        },
        {
          q: `यदि विद्यार्थी के समक्ष "${c4}" से जुड़ी कोई समस्या आती है, तो पहला कदम क्या होना चाहिए?`,
          opts: [
            `दिए गए आंकड़े पहचानें और संबंधित नियम या सूत्र चुनें`,
            `बिना सोचे-समझे तुरंत मनमाना उत्तर लिख देना`,
            `प्रश्न को पूरा पढ़े बिना आगे बढ़ जाना`,
            `सभी संख्याओं को बिना वजह आपस में गुणा करना`,
          ],
          ans: `दिए गए आंकड़े पहचानें और संबंधित नियम या सूत्र चुनें`,
          exp: `व्यवस्थित समाधान के लिए सबसे पहले ज्ञात मानों की पहचान कर सही नियम चुनना अनिवार्य है।`,
        },
        {
          q: `"${c1}" से सबसे निकटतम रूप से संबंधित पद कौन सा है?`,
          opts: [`सुसंगत वैज्ञानिक नियम`, `यादृच्छिक उतार-चढ़ाव`, `शून्य मान`, `अपरिभाषित मात्रा`],
          ans: `सुसंगत वैज्ञानिक नियम`,
          exp: `${c1} पूरे अध्याय ${chTitle} में सुसंगत और नियमबद्ध व्यवहार प्रदर्शित करता है।`,
        },
        {
          q: `परीक्षा की तैयारी में "${c2}" पर महारत हासिल करने से क्या लाभ होता है?`,
          opts: [
            `तीव्र गति, सटीक गणना और वैचारिक स्पष्टता प्राप्त होती है`,
            `केवल गलतियों को याद करना पड़ता है`,
            `अभ्यास करने की कोई आवश्यकता नहीं रह जाती`,
            `केवल चित्र बनाने में ही मदद मिलती है`,
          ],
          ans: `तीव्र गति, सटीक गणना और वैचारिक स्पष्टता प्राप्त होती है`,
          exp: `${c2} पर पकड़ होने से विद्यार्थी कठिन से कठिन प्रश्न भी आत्मविश्वास से हल कर सकते हैं।`,
        },
        {
          q: `${chTitle} में सीखा गया सबसे महत्वपूर्ण तथ्य क्या है?`,
          opts: [
            `ज्ञान की प्रत्येक कड़ी मूलभूत नियमों की मजबूत नींव पर बनती है`,
            `गणित व विज्ञान के नियम हर घंटे बदल जाते हैं`,
            `मात्रकों और इकाइयों का कोई अर्थ नहीं होता`,
            `उत्तरों के सत्यापन की कोई आवश्यकता नहीं है`,
          ],
          ans: `ज्ञान की प्रत्येक कड़ी मूलभूत नियमों की मजबूत नींव पर बनती है`,
          exp: `कक्षा ${chapter.gradeLevel.toUpperCase()} के पाठ्यक्रम में हर नई अवधारणा पिछली नींव पर आधारित होती है।`,
        },
        {
          q: `"${c4}" के संदर्भ में, जब संतुलित परिस्थितियां बनी रहती हैं तो क्या होता है?`,
          opts: [
            `प्रणाली स्थिर रहती है और सटीक अपेक्षित परिणाम प्राप्त होते हैं`,
            `तुरंत अप्रत्याशित विचलन और अव्यवस्था उत्पन्न होती है`,
            `सभी गणनाएं पूरी तरह रुक जाती हैं`,
            `समीकरण परस्पर विरोधाभासी हो जाते हैं`,
          ],
          ans: `प्रणाली स्थिर रहती है और सटीक अपेक्षित परिणाम प्राप्त होते हैं`,
          exp: `संतुलित अवस्था ${subName} के सैद्धांतिक अनुमानों की सत्यता की पुष्टि करती है।`,
        },
      ]
    : [
        {
          q: `[${subShort}] In ${chTitle}, which principle is fundamental to understanding ${c1}?`,
          opts: [`Primary law of ${c1}`, `Opposing secondary variation`, `Non-standard exception`, `Arbitrary estimation`],
          ans: `Primary law of ${c1}`,
          exp: `According to the syllabus for ${chapter.gradeLevel.toUpperCase()}, ${c1} establishes the foundational behavior.`,
        },
        {
          q: `Which of the following correctly describes the application of "${c2}" in this chapter?`,
          opts: [
            `It accurately relates to ${c1} through systematic properties`,
            `It operates independently of any physical or mathematical laws`,
            `It is solely applied in pre-school counting`,
            `It only works when values are zero`,
          ],
          ans: `It accurately relates to ${c1} through systematic properties`,
          exp: `${c2} directly provides the systematic relationship used to evaluate problems in ${chTitle}.`,
        },
        {
          q: `What is the key takeaway when evaluating ${c3}?`,
          opts: [
            `Understanding how theory translates to real observations`,
            `Ignoring observation data completely`,
            `Guessing without checking equations`,
            `Discarding the units of measurement`,
          ],
          ans: `Understanding how theory translates to real observations`,
          exp: `Real-world examples like ${c3} reinforce theoretical understanding through concrete observation.`,
        },
        {
          q: `If an explorer encounters a challenge involving "${c4}", what is the recommended first step?`,
          opts: [
            `Identify the given data and state the relevant formula`,
            `Immediately write a random conclusion`,
            `Skip reading the question prompt`,
            `Multiply all values without purpose`,
          ],
          ans: `Identify the given data and state the relevant formula`,
          exp: `Systematic problem-solving begins by identifying the known values and choosing the correct principle.`,
        },
        {
          q: `Which term is most closely linked with ${c1}?`,
          opts: [`Consistent Property`, `Random Fluctuation`, `Null Value`, `Undefined Quantity`],
          ans: `Consistent Property`,
          exp: `${c1} exhibits consistent and predictable properties throughout ${chTitle}.`,
        },
        {
          q: `How does mastering "${c2}" benefit a student preparing for examinations?`,
          opts: [
            `Enables rapid, accurate calculation and conceptual clarity`,
            `Requires memorizing errors`,
            `Eliminates the need for practice questions`,
            `Only helps in drawing diagrams`,
          ],
          ans: `Enables rapid, accurate calculation and conceptual clarity`,
          exp: `Mastery of ${c2} gives learners high confidence and accuracy during complex problem solving.`,
        },
        {
          q: `Which statement represents a critical fact learned in ${chTitle}?`,
          opts: [
            `Every concept builds systematically upon foundational rules`,
            `Math and science principles change every hour`,
            `Units and labels have no meaning`,
            `Answers never require verification`,
          ],
          ans: `Every concept builds systematically upon foundational rules`,
          exp: `In ${chapter.gradeLevel.toUpperCase()} curriculum, knowledge is built layer upon layer.`,
        },
        {
          q: `In the context of ${c4}, what occurs when balanced conditions are maintained?`,
          opts: [
            `The system functions stably and yields expected outcomes`,
            `Immediate chaos and unpredictable deviation`,
            `All calculations cease completely`,
            `Equations become contradictory`,
          ],
          ans: `The system functions stably and yields expected outcomes`,
          exp: `Stable conditions confirm theoretical predictions in ${chapter.subjectId}.`,
        },
      ];

  for (let i = 0; i < 8; i++) {
    const item = mcqData[i];
    questions.push({
      id: `${chapter.id}_q${i + 1}`,
      levelId: chNum,
      questionNumber: i + 1,
      type: 'mcq',
      prompt: item.q,
      subjectId: chapter.subjectId,
      topic: `${chapter.title} · Q${i + 1}`,
      ageGroup,
      difficulty: i < 3 ? 'easy' : i < 6 ? 'medium' : 'hard',
      points: 10 + i * 2,
      explanation: item.exp,
      hints: [`Recall the main lesson on ${c1}.`, `Look closely at the definition of ${c2}.`],
      options: item.opts,
      correctAnswer: item.ans,
    });
  }

  // 2. Four True / False Questions (Q9 to Q12)
  const tfData = [
    {
      q: `[True/False] In ${chapter.title}, ${c1} remains valid under standard experimental or mathematical conditions.`,
      ans: true,
      exp: `True! Standard conditions preserve the integrity of ${c1}.`,
    },
    {
      q: `[True/False] The concept of "${c2}" contradicts the fundamental axioms of ${chapter.subjectId}.`,
      ans: false,
      exp: `False! ${c2} is fully compliant and harmonized with ${chapter.subjectId} principles.`,
    },
    {
      q: `[True/False] Understanding ${c3} helps bridge textbook formulas with practical real-world problems.`,
      ans: true,
      exp: `True! Practical examples like ${c3} make abstract equations intuitive and actionable.`,
    },
    {
      q: `[True/False] You can ignore the units of measurement when solving problems involving ${c4}.`,
      ans: false,
      exp: `False! Correct units are essential to arriving at valid mathematical and scientific solutions.`,
    },
  ];

  for (let i = 0; i < 4; i++) {
    const item = tfData[i];
    const qNum = 9 + i;
    questions.push({
      id: `${chapter.id}_q${qNum}`,
      levelId: chNum,
      questionNumber: qNum,
      type: 'true_false',
      prompt: item.q,
      subjectId: chapter.subjectId,
      topic: `${chapter.title} · Concept Check`,
      ageGroup,
      difficulty: 'medium',
      points: 15,
      explanation: item.exp,
      hints: ['Consider whether this rule has any exceptions in standard textbook lessons.'],
      options: ['True', 'False'],
      correctAnswer: item.ans ? 'True' : 'False',
    });
  }

  // 3. Four Match the Following Questions (Q13 to Q16)
  const matchSets = [
    [
      { id: 'm1_1', left: c1, right: 'Fundamental Core Principle' },
      { id: 'm1_2', left: c2, right: 'Structured Relationship / Equation' },
      { id: 'm1_3', left: c3, right: 'Observational Real-World Example' },
      { id: 'm1_4', left: c4, right: 'Practical Application in Quest' },
    ],
    [
      { id: 'm2_1', left: 'Cause', right: 'Triggering Action or Condition' },
      { id: 'm2_2', left: 'Effect', right: 'Resulting Observation or Product' },
      { id: 'm2_3', left: 'Measurement', right: 'Quantified Standard Units' },
      { id: 'm2_4', left: 'Verification', right: 'Confirmation by Proof / Check' },
    ],
    [
      { id: 'm3_1', left: 'Component A', right: 'Input / Initial State' },
      { id: 'm3_2', left: 'Component B', right: 'Transformative Process' },
      { id: 'm3_3', left: 'Component C', right: 'Equilibrium / Output' },
      { id: 'm3_4', left: 'Component D', right: 'Evaluation / Margin' },
    ],
    [
      { id: 'm4_1', left: 'Primary Concept', right: 'Core Knowledge Pillar' },
      { id: 'm4_2', left: 'Secondary Detail', right: 'Supporting Characteristic' },
      { id: 'm4_3', left: 'Formula Symbol', right: 'Representation of Quantity' },
      { id: 'm4_4', left: 'Final Solution', right: 'Verified Correct Output' },
    ],
  ];

  for (let i = 0; i < 4; i++) {
    const pairs = matchSets[i];
    const qNum = 13 + i;
    questions.push({
      id: `${chapter.id}_q${qNum}`,
      levelId: chNum,
      questionNumber: qNum,
      type: 'match',
      prompt: `[Match Pairs] Connect each concept in "${chapter.title}" to its correct scientific or mathematical partner:`,
      subjectId: chapter.subjectId,
      topic: `${chapter.title} · Match the Pairs`,
      ageGroup,
      difficulty: 'medium',
      points: 25,
      explanation: `Terrific linking! Each pair corresponds directly to the definitions in ${chapter.title}.`,
      hints: ['Tap a term on the left, then tap its matching definition on the right.'],
      matchPairs: pairs,
      correctAnswer: 'matched_all',
    });
  }

  // 4. Three Image / Visual Concept Questions (Q17 to Q19)
  const imageAssets = [ASSET_PATHS.scienceLab, ASSET_PATHS.worldMap, ASSET_PATHS.milestoneChest];
  const imagePrompts = [
    `Analyze this conceptual illustration. Which core element of "${chapter.title}" is being demonstrated?`,
    `In this graphic diagram, what is the significance of the central focal structure regarding ${c1}?`,
    `Inspect the visual model below. How does this representation clarify ${c2}?`,
  ];

  for (let i = 0; i < 3; i++) {
    const qNum = 17 + i;
    questions.push({
      id: `${chapter.id}_q${qNum}`,
      levelId: chNum,
      questionNumber: qNum,
      type: 'image',
      prompt: imagePrompts[i],
      subjectId: chapter.subjectId,
      topic: `${chapter.title} · Visual Analysis`,
      ageGroup,
      difficulty: 'medium',
      points: 20,
      imageUrl: imageAssets[i],
      options: [
        `Demonstrates ${c1} in active operation`,
        `Shows the breakdown of unrelated variables`,
        `Indicates an incorrect calculation method`,
        `Represents static background art only`,
      ],
      correctAnswer: `Demonstrates ${c1} in active operation`,
      explanation: `The diagram visually highlights how ${c1} is applied step-by-step in ${chapter.title}.`,
      hints: ['Observe the highlighted focal area and think back to the chapter lesson.'],
    });
  }

  // 5. Two Drag & Drop Ordering Questions (Q20 to Q21)
  const dragSets = [
    {
      prompt: `[Step Ordering] Drag and reorder the correct sequence of steps to solve problems in ${chapter.title}:`,
      items: [
        '1. Read problem & identify given data',
        '2. Recall the relevant rule or formula',
        '3. Substitute values & compute carefully',
        '4. Check units & verify the final answer',
      ],
    },
    {
      prompt: `[Chronological Progression] Arrange these developmental stages of ${c1} from beginning to end:`,
      items: [
        'Phase 1: Initial Observation & Hypothesis',
        'Phase 2: Formal Formulation & Calculation',
        'Phase 3: Verification with Test Data',
        'Phase 4: Synthesis & Practical Deployment',
      ],
    },
  ];

  for (let i = 0; i < 2; i++) {
    const qNum = 20 + i;
    const dragItem = dragSets[i];
    questions.push({
      id: `${chapter.id}_q${qNum}`,
      levelId: chNum,
      questionNumber: qNum,
      type: 'drag_drop',
      prompt: dragItem.prompt,
      subjectId: chapter.subjectId,
      topic: `${chapter.title} · Sequence & Order`,
      ageGroup,
      difficulty: 'hard',
      points: 30,
      dragItems: dragItem.items,
      correctOrder: dragItem.items,
      correctAnswer: 'ordered_correct',
      explanation: 'Superb ordering! Following this exact sequence ensures zero mistakes in examinations.',
      hints: ['Use the up and down arrow buttons to arrange the steps logically.'],
    });
  }

  // 6. Two Memory Card Flip Questions (Q22 to Q23)
  const memoryCardSets = [
    [
      { id: 'mem1_a', label: c1.slice(0, 18), matchId: 'pair_1' },
      { id: 'mem1_b', label: 'Primary Rule', matchId: 'pair_1' },
      { id: 'mem2_a', label: c2.slice(0, 18), matchId: 'pair_2' },
      { id: 'mem2_b', label: 'Formula Core', matchId: 'pair_2' },
      { id: 'mem3_a', label: 'Units Check', matchId: 'pair_3' },
      { id: 'mem3_b', label: 'Dimension Valid', matchId: 'pair_3' },
    ],
    [
      { id: 'mem4_a', label: c3.slice(0, 18), matchId: 'pair_4' },
      { id: 'mem4_b', label: 'Observation', matchId: 'pair_4' },
      { id: 'mem5_a', label: c4.slice(0, 18), matchId: 'pair_5' },
      { id: 'mem5_b', label: 'Application', matchId: 'pair_5' },
      { id: 'mem6_a', label: 'Mastery Star', matchId: 'pair_6' },
      { id: 'mem6_b', label: '100% Correct', matchId: 'pair_6' },
    ],
  ];

  for (let i = 0; i < 2; i++) {
    const qNum = 22 + i;
    const cards = memoryCardSets[i];
    questions.push({
      id: `${chapter.id}_q${qNum}`,
      levelId: chNum,
      questionNumber: qNum,
      type: 'memory',
      prompt: `[Memory Matrix] Flip and match the corresponding concept cards from "${chapter.title}":`,
      subjectId: chapter.subjectId,
      topic: `${chapter.title} · Memory Check`,
      ageGroup,
      difficulty: 'medium',
      points: 25,
      memoryCards: cards,
      correctAnswer: 'all_matched',
      explanation: 'Fantastic memory recall! You matched all pairs corresponding to this chapter.',
      hints: ['Remember the position of previously flipped cards.'],
    });
  }

  // 7. Two Problem Solving Challenges (Q24 to Q25)
  const problemChallenges = [
    {
      q: `[Master Challenge] A student tests the relationship in "${c1}" with double the initial input. What is the expected logical outcome according to ${chTitle}?`,
      opts: [
        'The output scales predictably according to the governing formula',
        'The output completely vanishes to zero',
        'The equation breaks and produces negative infinity',
        'No change occurs under any circumstances',
      ],
      ans: 'The output scales predictably according to the governing formula',
      exp: `Direct scaling adheres strictly to the mathematical relationship established in ${chapter.title}.`,
    },
    {
      q: `[Critical Thinking] In an examination question covering ${c2} and ${c3}, how does one verify that a derived solution is 100% correct?`,
      opts: [
        'Substitute the solution back into the original condition and check unit balance',
        'Assume the first calculated number is always right without proof',
        'Erase the work and pick option A randomly',
        'Check if the number is an even integer only',
      ],
      ans: 'Substitute the solution back into the original condition and check unit balance',
      exp: `Back-substitution and dimension checking is the gold standard for verifying answers in ${chapter.subjectId}.`,
    },
  ];

  for (let i = 0; i < 2; i++) {
    const qNum = 24 + i;
    const item = problemChallenges[i];
    questions.push({
      id: `${chapter.id}_q${qNum}`,
      levelId: chNum,
      questionNumber: qNum,
      type: 'problem_solving',
      prompt: item.q,
      subjectId: chapter.subjectId,
      topic: `${chapter.title} · Grand Challenge`,
      ageGroup,
      difficulty: 'hard',
      points: 35,
      options: item.opts,
      correctAnswer: item.ans,
      explanation: item.exp,
      hints: ['Think critically about the cause-and-effect relationship learned throughout the 25 questions.'],
    });
  }

  return questions;
}
