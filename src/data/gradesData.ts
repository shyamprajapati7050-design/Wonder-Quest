import { GradeLevel, GradeMetadata, AgeGroup } from '../types';

export const GRADES_METADATA: GradeMetadata[] = [
  // Pre-Primary (Nursery, LKG, UKG)
  {
    id: 'nursery',
    label: 'Nursery (Early Explorers)',
    shortLabel: 'Nursery',
    stage: 'pre_primary',
    stageName: 'Pre-Primary',
    ageRange: '3–4 Years',
    ageGroup: '3-5',
    icon: '🧸',
    color: 'from-pink-400 to-rose-500',
    description: 'Phonics, primary colors, counting 1 to 5, animal sounds, and big vs small objects.',
    sampleTopics: ['Phonics A-Z', 'Counting 1-5', 'Colors & Shapes', 'Animal Sounds & Homes'],
  },
  {
    id: 'lkg_ukg',
    label: 'LKG / UKG (Kindergarten)',
    shortLabel: 'KG',
    stage: 'pre_primary',
    stageName: 'Pre-Primary',
    ageRange: '4–6 Years',
    ageGroup: '3-5',
    icon: '🎨',
    color: 'from-amber-400 to-orange-500',
    description: 'Letter tracing, three-letter words, counting 1 to 20, identifying animals, fruits, and shapes.',
    sampleTopics: ['Sight Words', 'Counting 1-20', 'Body Parts', 'Fruit & Veggie Sorting'],
  },

  // Primary School (Classes 1 - 5)
  {
    id: 'class_1',
    label: 'Class 1',
    shortLabel: 'Class 1',
    stage: 'primary',
    stageName: 'Primary School',
    ageRange: '6–7 Years',
    ageGroup: '6-8',
    icon: '🎒',
    color: 'from-yellow-400 to-amber-500',
    description: 'Single-digit addition & subtraction, phonics reading, living vs non-living, and computer mouse.',
    sampleTopics: ['Addition & Subtraction', 'Living Things', 'Opposites & Nouns', 'Computer Parts'],
  },
  {
    id: 'class_2',
    label: 'Class 2',
    shortLabel: 'Class 2',
    stage: 'primary',
    stageName: 'Primary School',
    ageRange: '7–8 Years',
    ageGroup: '6-8',
    icon: '🌱',
    color: 'from-lime-500 to-emerald-600',
    description: 'Two-digit addition, telling time, plants & seeds, sentences, and simple logic patterns.',
    sampleTopics: ['Tens & Ones Place Value', 'Plant Growth', 'Pronouns & Verbs', 'Pattern Clues'],
  },
  {
    id: 'class_3',
    label: 'Class 3',
    shortLabel: 'Class 3',
    stage: 'primary',
    stageName: 'Primary School',
    ageRange: '8–9 Years',
    ageGroup: '6-8',
    icon: '⭐',
    color: 'from-emerald-500 to-teal-600',
    description: 'Multiplication basics, states of matter, punctuation, world geography, and typing.',
    sampleTopics: ['Times Tables 1-10', 'Solids, Liquids, Gases', 'Compound Words', 'Solar System'],
  },
  {
    id: 'class_4',
    label: 'Class 4',
    shortLabel: 'Class 4',
    stage: 'primary',
    stageName: 'Primary School',
    ageRange: '9–10 Years',
    ageGroup: '9-11',
    icon: '🚀',
    color: 'from-teal-500 to-cyan-600',
    description: 'Long division, fractions introduction, habitats, food chains, and internet safety rules.',
    sampleTopics: ['Division & Fractions', 'Food Chains', 'Adjectives & Adverbs', 'Web Safety'],
  },
  {
    id: 'class_5',
    label: 'Class 5',
    shortLabel: 'Class 5',
    stage: 'primary',
    stageName: 'Primary School',
    ageRange: '10–11 Years',
    ageGroup: '9-11',
    icon: '🌍',
    color: 'from-cyan-500 to-blue-600',
    description: 'Decimals, area & perimeter, human skeleton & organs, prefixes, and algorithm steps.',
    sampleTopics: ['Decimals & Area', 'Human Organs', 'Grammar Tenses', 'Intro to Algorithms'],
  },

  // Middle School (Classes 6 - 8)
  {
    id: 'class_6',
    label: 'Class 6',
    shortLabel: 'Class 6',
    stage: 'middle',
    stageName: 'Middle School',
    ageRange: '11–12 Years',
    ageGroup: '9-11',
    icon: '🔬',
    color: 'from-blue-500 to-indigo-600',
    description: 'Integers, ratios, light & shadows, active/passive voice, CPU architecture, and world history.',
    sampleTopics: ['Integers & Ratios', 'Light Reflection', 'Voice & Clauses', 'CPU & Binary Basics'],
  },
  {
    id: 'class_7',
    label: 'Class 7',
    shortLabel: 'Class 7',
    stage: 'middle',
    stageName: 'Middle School',
    ageRange: '12–13 Years',
    ageGroup: '12-14',
    icon: '⚡',
    color: 'from-indigo-500 to-purple-600',
    description: 'Pre-algebra equations, acids & bases, nutrition in animals, computer networks, and syllogisms.',
    sampleTopics: ['Algebraic Equations', 'Acids, Bases & Salts', 'Respiration & Circulation', 'Network Basics'],
  },
  {
    id: 'class_8',
    label: 'Class 8',
    shortLabel: 'Class 8',
    stage: 'middle',
    stageName: 'Middle School',
    ageRange: '13–14 Years',
    ageGroup: '12-14',
    icon: '🔮',
    color: 'from-purple-500 to-violet-600',
    description: 'Linear equations, force & pressure, cell structure, microorganisms, idioms, and Python basics.',
    sampleTopics: ['Linear Equations', 'Forces & Friction', 'Cell Anatomy', 'Flowcharts & Loops'],
  },

  // Secondary School (Classes 9 - 10)
  {
    id: 'class_9',
    label: 'Class 9',
    shortLabel: 'Class 9',
    stage: 'secondary',
    stageName: 'Secondary School',
    ageRange: '14–15 Years',
    ageGroup: '12-14',
    icon: '📐',
    color: 'from-violet-500 to-fuchsia-600',
    description: 'Polynomials, coordinate geometry, laws of motion, gravitation, atoms, and data logic.',
    sampleTopics: ['Polynomials', 'Newton Laws of Motion', 'Atoms & Molecules', 'Deductive Logic'],
  },
  {
    id: 'class_10',
    label: 'Class 10 (Board Exam Prep)',
    shortLabel: 'Class 10',
    stage: 'secondary',
    stageName: 'Secondary School',
    ageRange: '15–16 Years',
    ageGroup: '15-16',
    icon: '🏆',
    color: 'from-fuchsia-500 to-pink-600',
    description: 'Quadratic equations, trigonometry, electricity & magnetism, heredity & evolution, and syntax.',
    sampleTopics: ['Quadratic Equations', 'Current Electricity', 'Chemical Reactions', 'Genetics & Heredity'],
  },

  // Senior Secondary (Classes 11 - 12)
  {
    id: 'class_11',
    label: 'Class 11 (Higher Secondary)',
    shortLabel: 'Class 11',
    stage: 'senior_secondary',
    stageName: 'Senior Secondary',
    ageRange: '16–17 Years',
    ageGroup: '15-16',
    icon: '🧬',
    color: 'from-rose-500 to-red-600',
    description: 'Trigonometric functions, thermodynamics, chemical bonding, organic chemistry intro, and vectors.',
    sampleTopics: ['Trigonometry & Sets', 'Kinematics & Thermodynamics', 'Chemical Bonding', 'Data Structures Intro'],
  },
  {
    id: 'class_12',
    label: 'Class 12 (Graduation Ready)',
    shortLabel: 'Class 12',
    stage: 'senior_secondary',
    stageName: 'Senior Secondary',
    ageRange: '17–18 Years',
    ageGroup: '17-18',
    icon: '🎓',
    color: 'from-red-500 to-rose-700',
    description: 'Calculus derivatives & integrals, electromagnetic waves, genetics, organic reaction mechanisms, and AI.',
    sampleTopics: ['Calculus & Probability', 'Electromagnetic Induction', 'Organic Mechanisms', 'Algorithms & Big-O'],
  },
];

export function getGradeDetails(gradeId?: GradeLevel): GradeMetadata {
  return (
    GRADES_METADATA.find((g) => g.id === gradeId) ||
    GRADES_METADATA.find((g) => g.id === 'class_5') ||
    GRADES_METADATA[0]
  );
}

export function getGradeFromAge(age: number): GradeLevel {
  if (age <= 4) return 'nursery';
  if (age <= 5) return 'lkg_ukg';
  if (age === 6) return 'class_1';
  if (age === 7) return 'class_2';
  if (age === 8) return 'class_3';
  if (age === 9) return 'class_4';
  if (age === 10) return 'class_5';
  if (age === 11) return 'class_6';
  if (age === 12) return 'class_7';
  if (age === 13) return 'class_8';
  if (age === 14) return 'class_9';
  if (age === 15) return 'class_10';
  if (age === 16) return 'class_11';
  return 'class_12';
}

export function getAgeGroupFromGrade(grade: GradeLevel): AgeGroup {
  const meta = GRADES_METADATA.find((g) => g.id === grade);
  return meta ? meta.ageGroup : '9-11';
}
