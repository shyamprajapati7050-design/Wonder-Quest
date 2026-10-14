import { AppLanguage, SubjectId } from '../types';

export interface SubjectTranslation {
  name: string;
  shortName: string;
  tagline: string;
  description: string;
}

export interface SubjectData {
  id: SubjectId;
  name: string;
  shortName: string;
  icon: string;
  color: string;
  bgLight: string;
  borderLight: string;
  tagline: string;
  description: string;
  topicsByAge: Record<string, string[]>;
  translations: Record<AppLanguage, SubjectTranslation>;
}

export const SUBJECTS: SubjectData[] = [
  // 1. Hindi (हिंदी)
  {
    id: 'hindi',
    name: 'Hindi Language & Literature',
    shortName: 'Hindi',
    icon: 'Languages',
    color: 'from-orange-500 to-amber-600',
    bgLight: 'bg-orange-50 text-orange-800',
    borderLight: 'border-orange-200',
    tagline: 'Varnamala, Matras, Stories & Poetry',
    description: 'Learn Hindi vowels, consonants, rich stories, grammar, sandhi, samas, and classical literature.',
    topicsByAge: {
      '3-5': ['स्वर व व्यंजन (अ से ज्ञ)', 'दो अक्षर वाले शब्द', 'बाल कविताएं व कहानियां', 'रंगों और फलों के नाम'],
      '6-8': ['मात्राओं का ज्ञान', 'संज्ञा व सर्वनाम', 'विलोम व पर्यायवाची', 'पंचतंत्र की प्रेरक कहानियां'],
      '9-11': ['विशेषण व क्रिया', 'मुहावरे व लोकोक्तियां', 'अनुच्छेद लेखन', 'कविताओं का भावार्थ'],
      '12-14': ['संधि व समास', 'रस, छंद व अलंकार परिचय', 'उपसर्ग व प्रत्यय', 'कबीर व रहीम के दोहे'],
      '15-16': ['गद्य व पद्य संकलन', 'वाक्य भेद व वाच्य', 'निबंध व पत्र लेखन', 'छायावादी कविताएं'],
      '17-18': ['हिन्दी साहित्य का इतिहास', 'आधुनिक गद्य विधाएं', 'काव्य सौंदर्य व रस विवेचन', 'प्रयोजनमूलक हिन्दी'],
    },
    translations: {
      en: {
        name: 'Hindi Language & Literature',
        shortName: 'Hindi',
        tagline: 'Varnamala, Matras, Stories & Poetry',
        description: 'Learn Hindi vowels, consonants, rich stories, grammar, sandhi, samas, and classical literature.',
      },
      hi: {
        name: 'हिन्दी भाषा एवं साहित्य',
        shortName: 'हिन्दी',
        tagline: 'वर्णमाला, मात्राएं, व्याकरण व दोहे',
        description: 'स्वर, व्यंजन, बाल कविताएं, व्याकरण, संधि, समास और अमर साहित्यकारों की कृतियों का अध्ययन।',
      },
      te: {
        name: 'హిందీ భాష & సాహిత్యం',
        shortName: 'హిందీ',
        tagline: 'వర్ణమాల, వ్యాకరణం & కథలు',
        description: 'హిందీ అక్షరాలు, పదాలు, కథలు, వ్యాకరణం మరియు ప్రసిద్ధ హిందీ సాహిత్యం నేర్చుకోండి.',
      },
      kn: {
        name: 'ಹಿಂದಿ ಭಾಷೆ ಮತ್ತು ಸಾಹಿತ್ಯ',
        shortName: 'ಹಿಂದಿ',
        tagline: 'ವರ್ಣಮಾಲೆ, ವ್ಯಾಕರಣ ಮತ್ತು ಕಥೆಗಳು',
        description: 'ಹಿಂದಿ ಅಕ್ಷರಗಳು, ಶಬ್ದಕೋಶ, ಕಥೆಗಳು ಮತ್ತು ವ್ಯಾಕರಣವನ್ನು ಸುಲಭವಾಗಿ ಕಲಿಯಿರಿ.',
      },
      ml: {
        name: 'ഹിന്ദി ഭാഷയും സാഹിത്യവും',
        shortName: 'ഹിന്ദി',
        tagline: 'വർണ്ണമാല, വ്യാകരണം & കഥകൾ',
        description: 'ഹിന്ദി അക്ഷരമാല, കഥകൾ, കവിതകൾ, വ്യാകരണം എന്നിവ എളുപ്പത്തിൽ പഠിക്കുക.',
      },
    },
  },

  // 2. Social Science (सामाजिक विज्ञान)
  {
    id: 'social_science',
    name: 'Social Science',
    shortName: 'Social Science',
    icon: 'Users',
    color: 'from-amber-600 to-yellow-600',
    bgLight: 'bg-amber-50 text-amber-800',
    borderLight: 'border-amber-200',
    tagline: 'Community, Civics, Society & Governance',
    description: 'Explore human societies, democratic institutions, citizenship rights, and social development.',
    topicsByAge: {
      '3-5': ['Our Family & Friends', 'Community Helpers (Police, Doctors)', 'Good Habits & Safety', 'Festivals of India'],
      '6-8': ['Neighborhood & Panchayat', 'National Symbols', 'Rights & Duties of Children', 'Unity in Diversity'],
      '9-11': ['Local Self Government', 'The Indian Constitution Basics', 'Diversity & Discrimination', 'Livelihoods in Villages & Towns'],
      '12-14': ['Democratic Governance', 'Judiciary & Rule of Law', 'Understanding Secularism', 'Social Justice & Marginalisation'],
      '15-16': ['Democracy & Diversity', 'Political Parties & Elections', 'Outcomes & Challenges to Democracy', 'Gender, Religion & Caste'],
      '17-18': ['Political Theory & Freedom', 'Constitution at Work', 'Social Movements & Change', 'Global Politics & Governance'],
    },
    translations: {
      en: {
        name: 'Social Science',
        shortName: 'Social Science',
        tagline: 'Community, Civics, Society & Governance',
        description: 'Explore human societies, democratic institutions, citizenship rights, and social development.',
      },
      hi: {
        name: 'सामाजिक विज्ञान',
        shortName: 'सामाजिक विज्ञान',
        tagline: 'समाज, संविधान, नागरिक शास्त्र व शासन',
        description: 'मानव समाज, लोकतांत्रिक संस्थाएं, मौलिक अधिकार, कर्तव्य और सामाजिक विकास का संपूर्ण अध्ययन।',
      },
      te: {
        name: 'సాంఘిక శాస్త్రం',
        shortName: 'సోషల్ సైన్స్',
        tagline: 'సమాజం, పౌరనీతి & రాజ్యాంగం',
        description: 'మానవ సమాజాలు, ప్రజాస్వామ్య వ్యవస్థలు, పౌర హక్కులు మరియు సామాజిక వికాసం.',
      },
      kn: {
        name: 'ಸಮಾಜ ವಿಜ್ಞಾನ',
        shortName: 'ಸಮಾಜ ವಿಜ್ಞಾನ',
        tagline: 'ಸಮುದಾಯ, ನಾಗರಿಕಶಾಸ್ತ್ರ ಮತ್ತು ಆಡಳಿತ',
        description: 'ಮಾನವ ಸಮಾಜ, ಪ್ರಜಾಪ್ರಭುತ್ವ ಸಂಸ್ಥೆಗಳು ಮತ್ತು ನಾಗರಿಕ ಹಕ್ಕುಗಳ ಪರಿಚಯ.',
      },
      ml: {
        name: 'സോഷ്യൽ സയൻസ്',
        shortName: 'സോഷ്യൽ സയൻസ്',
        tagline: 'സമൂഹം, പൗരധർമ്മം & ഭരണം',
        description: 'സമൂഹത്തിന്റെ ഘടന, ജനാധിപത്യ സ്ഥാപനങ്ങൾ, ഭരണഘടന എന്നിവ പഠിക്കുക.',
      },
    },
  },

  // 3. Physics (भौतिक विज्ञान)
  {
    id: 'physics',
    name: 'Physics',
    shortName: 'Physics',
    icon: 'Atom',
    color: 'from-indigo-600 to-blue-700',
    bgLight: 'bg-indigo-50 text-indigo-800',
    borderLight: 'border-indigo-200',
    tagline: 'Matter, Energy, Forces, Light & Universe',
    description: 'Investigate mechanics, Newton’s laws, optics, electricity, magnetism, thermodynamics, and astrophysics.',
    topicsByAge: {
      '3-5': ['Push & Pull', 'Light & Shadow', 'Floating in Water', 'Sounds Around Us'],
      '6-8': ['Simple Machines (Levers, Wheels)', 'Magnets & Poles', 'Sunlight & Rainbows', 'Speed & Movement'],
      '9-11': ['Force, Work & Energy', 'Friction & Gravity', 'Electric Circuits & Cells', 'Reflection of Light'],
      '12-14': ['Motion & Speed Calculation', 'Pressure in Fluids', 'Sound Frequency & Amplitude', 'Electrostatic Forces'],
      '15-16': ['Laws of Motion & Momentum', 'Gravitation & Planetary Orbits', 'Ohm’s Law & Resistance', 'Magnetic Effect of Current'],
      '17-18': ['Kinematics & Rotational Dynamics', 'Thermodynamics & Heat Engines', 'Electromagnetic Waves & Ray Optics', 'Quantum Dual Nature & Atoms'],
    },
    translations: {
      en: {
        name: 'Physics',
        shortName: 'Physics',
        tagline: 'Matter, Energy, Forces, Light & Universe',
        description: 'Investigate mechanics, Newton’s laws, optics, electricity, magnetism, thermodynamics, and astrophysics.',
      },
      hi: {
        name: 'भौतिक विज्ञान',
        shortName: 'भौतिकी',
        tagline: 'ऊर्जा, बल, गति, प्रकाश व ब्रह्मांड',
        description: 'न्यूटन के गति नियम, प्रकाशिकी, विद्युत, चुंबकत्व, ऊष्मागतिकी और खगोल भौतिकी का वैज्ञानिक अध्ययन।',
      },
      te: {
        name: 'భౌతిక శాస్త్రం',
        shortName: 'ఫిజిక్స్',
        tagline: 'శక్తి, బలం, కాంతి & విద్యుత్',
        description: 'గతిశాస్త్రం, కాంతి, విద్యుదయస్కాంతత్వం, థర్మోడైనమిక్స్ మరియు విశ్వ విజ్ఞానం.',
      },
      kn: {
        name: 'ಭೌತಶಾಸ್ತ್ರ',
        shortName: 'ಭೌತಶಾಸ್ತ್ರ',
        tagline: 'ಶಕ್ತಿ, ಬಲ, ಬೆಳಕು ಮತ್ತು ಚಲನೆ',
        description: 'ನ್ಯೂಟನ್ ನಿಯಮಗಳು, ಬೆಳಕು, ವಿದ್ಯುತ್ ಮತ್ತು ಬ್ರಹ್ಮಾಂಡದ ಶಕ್ತಿಗಳನ್ನು ಅನ್ವೇಷಿಸಿ.',
      },
      ml: {
        name: 'ഭൗതികശാസ്ത്രം',
        shortName: 'ഫിസിക്സ്',
        tagline: 'ഊർജ്ജം, ബലം, പ്രകാശം & വിദ്യുച്ഛക്തി',
        description: 'ചലന നിയമങ്ങൾ, പ്രകാശശാസ്ത്രം, താപഗതികം, കാന്തികത എന്നിവ പഠിക്കുക.',
      },
    },
  },

  // 4. Chemistry (रसायन विज्ञान)
  {
    id: 'chemistry',
    name: 'Chemistry',
    shortName: 'Chemistry',
    icon: 'FlaskConical',
    color: 'from-teal-500 to-emerald-600',
    bgLight: 'bg-teal-50 text-teal-800',
    borderLight: 'border-teal-200',
    tagline: 'Molecules, Elements, Reactions & Compounds',
    description: 'Explore the periodic table, chemical bonds, acids and bases, organic chemistry, and molecular reactions.',
    topicsByAge: {
      '3-5': ['Mixing Colors', 'Ice Melting to Water', 'Baking Soda Bubbles', 'Sweet & Sour Tastes'],
      '6-8': ['States of Matter (Solid, Liquid, Gas)', 'Solutions (Sugar in Water)', 'Rusting of Iron', 'Air & Oxygen'],
      '9-11': ['Acids, Bases & Indicators', 'Physical vs Chemical Changes', 'Water Purification', 'Combustion & Flames'],
      '12-14': ['Metals & Non-Metals', 'Coal & Petroleum Resources', 'Chemical Equations & Balancing', 'Synthetic Fibers'],
      '15-16': ['Periodic Classification of Elements', 'Chemical Reactions & Equations', 'Carbon & Its Compounds', 'Ionic & Covalent Bonding'],
      '17-18': ['Atomic Structure & Orbitals', 'Thermodynamics & Equilibrium', 'Coordination Chemistry', 'Organic Reaction Mechanisms'],
    },
    translations: {
      en: {
        name: 'Chemistry',
        shortName: 'Chemistry',
        tagline: 'Molecules, Elements, Reactions & Compounds',
        description: 'Explore the periodic table, chemical bonds, acids and bases, organic chemistry, and molecular reactions.',
      },
      hi: {
        name: 'रसायन विज्ञान',
        shortName: 'रसायन',
        tagline: 'परमाणु, तत्व, यौगिक व रासायनिक अभिक्रियाएं',
        description: 'आवर्त सारणी, अम्ल, क्षार, लवण, कार्बनिक यौगिक और रासायनिक बंधों का व्यावहारिक अध्ययन।',
      },
      te: {
        name: 'రసాయన శాస్త్రం',
        shortName: 'కెమిస్ట్రీ',
        tagline: 'పరమాణువులు, మూలకాలు & రసాయన చర్యలు',
        description: 'ఆవర్తన పట్టిక, రసాయన బంధాలు, ఆమ్లాలు, క్షారాలు మరియు సేంద్రీయ రసాయన శాస్త్రం.',
      },
      kn: {
        name: 'ರಸಾಯನಶಾಸ್ತ್ರ',
        shortName: 'ರಸಾಯನಶಾಸ್ತ್ರ',
        tagline: 'ಅಣುಗಳು, ಧಾತುಗಳು ಮತ್ತು ರಾಸಾಯನಿಕ ಕ್ರಿಯೆಗಳು',
        description: 'ಆವರ್ತಕ ಕೋಷ್ಟಕ, ರಾಸಾಯನಿಕ ಬಂಧಗಳು ಮತ್ತು ಆಮ್ಲ-ಕ್ಷಾರಗಳ ಅಧ್ಯಯನ.',
      },
      ml: {
        name: 'രസതന്ത്രം',
        shortName: 'കെമിസ്ട്രി',
        tagline: 'തന്മാത്രകൾ, മൂലകങ്ങൾ & രാസപ്രവർത്തനങ്ങൾ',
        description: 'ആവർത്തനപ്പട്ടിക, രാസബന്ധനങ്ങൾ, അമ്ളങ്ങൾ, ക്ഷാരങ്ങൾ എന്നിവ മനസ്സിലാക്കുക.',
      },
    },
  },

  // 5. Biology (जीव विज्ञान)
  {
    id: 'biology',
    name: 'Biology & Life Sciences',
    shortName: 'Biology',
    icon: 'Leaf',
    color: 'from-emerald-500 to-green-600',
    bgLight: 'bg-emerald-50 text-emerald-800',
    borderLight: 'border-emerald-200',
    tagline: 'Living Cells, Human Anatomy, Botany & Genetics',
    description: 'Understand the living world, photosynthesis, human organs, ecosystems, genetics, and biotechnology.',
    topicsByAge: {
      '3-5': ['Plants & Flowers', 'Pet Animals & Birds', 'Body Parts (Eyes, Ears, Hands)', 'Healthy Food & Fruits'],
      '6-8': ['Plant Life Cycle (Seeds to Trees)', 'Herbivores & Carnivores', 'Human Senses', 'Animal Habitats'],
      '9-11': ['Photosynthesis in Leaves', 'Human Digestive & Respiratory System', 'Microorganisms: Friend & Foe', 'Forest Ecosystems'],
      '12-14': ['Cell Structure & Organelles', 'Reproduction in Animals & Plants', 'Endocrine Glands & Hormones', 'Biodiversity Conservation'],
      '15-16': ['Life Processes (Respiration, Circulation)', 'Heredity & Mendel’s Laws', 'Control & Coordination (Brain & Nerves)', 'Ecology & Food Webs'],
      '17-18': ['Molecular Basis of Inheritance (DNA/RNA)', 'Biotechnology Principles & Processes', 'Ecosystem Ecology & Biomes', 'Human Health, Immunity & Diseases'],
    },
    translations: {
      en: {
        name: 'Biology & Life Sciences',
        shortName: 'Biology',
        tagline: 'Living Cells, Human Anatomy, Botany & Genetics',
        description: 'Understand the living world, photosynthesis, human organs, ecosystems, genetics, and biotechnology.',
      },
      hi: {
        name: 'जीव विज्ञान व पर्यावरण',
        shortName: 'जीव विज्ञान',
        tagline: 'कोशिकाएं, मानव शरीर, वनस्पति व आनुवंशिकी',
        description: 'प्रकाश संश्लेषण, मानव अंग तंत्र, डीएनए, आनुवंशिकी, जैव प्रौद्योगिकी और पारिस्थितिकी तंत्र का अध्ययन।',
      },
      te: {
        name: 'జీవ శాస్త్రం',
        shortName: 'బయాలజీ',
        tagline: 'కణాలు, మానవ శరీర నిర్మాణం & జీవావరణం',
        description: 'మొక్కలు, జంతువులు, మానవ అవయవ వ్యవస్థలు, జన్యుశాస్త్రం మరియు పర్యావరణ పరిరక్షణ.',
      },
      kn: {
        name: 'ಜೀವಶಾಸ್ತ್ರ',
        shortName: 'ಜೀವಶಾಸ್ತ್ರ',
        tagline: 'ಕೋಶಗಳು, ಮಾನವ ಅಂಗರಚನೆ ಮತ್ತು ಪರಿಸರ',
        description: 'ಸಸ್ಯ ಮತ್ತು ಪ್ರಾಣಿ ಜೀವನ, ಜೀವಕೋಶ ರಚನೆ ಮತ್ತು ಅನುವಂಶೀಯತೆಯ ರಹಸ್ಯಗಳು.',
      },
      ml: {
        name: 'ജീവശാസ്ത്രം',
        shortName: 'ബയോളജി',
        tagline: 'കോശങ്ങൾ, മനുഷ്യശരീരം & ജൈവവൈവിധ്യം',
        description: 'സസ്യ-ജന്തു ജാലങ്ങൾ, ശാരീരിക പ്രവർത്തനങ്ങൾ, ജനിതകശാസ്ത്രം എന്നിവ പഠിക്കുക.',
      },
    },
  },

  // 6. English (अंग्रेजी)
  {
    id: 'english',
    name: 'English Language & Literature',
    shortName: 'English',
    icon: 'BookOpen',
    color: 'from-blue-500 to-indigo-600',
    bgLight: 'bg-blue-50 text-blue-700',
    borderLight: 'border-blue-200',
    tagline: 'Grammar, Words, Expression & Classics',
    description: 'Enhance phonics, vocabulary, grammatical mastery, sentence structures, rhetoric, and literature.',
    topicsByAge: {
      '3-5': ['Alphabet Phonics (A-Z)', 'Rhyming Nursery Tunes', 'Animal & Fruit Names', 'Simple Word Sounds'],
      '6-8': ['Nouns, Pronouns & Verbs', 'Opposites & Synonyms', 'Sight Words & Spellings', 'Simple Sentences'],
      '9-11': ['Tenses & Punctuation Rules', 'Adjectives & Adverbs', 'Prefixes & Suffixes', 'Short Story Comprehension'],
      '12-14': ['Active & Passive Voice', 'Direct & Indirect Speech', 'Idioms & Figures of Speech', 'Formal Letter & Essay Writing'],
      '15-16': ['Clause Analysis & Syntax', 'Poetic Devices & Rhetoric', 'Shakespearean & Classic Texts', 'Speech & Debate Drafting'],
      '17-18': ['Critical Discourse Analysis', 'Literary Criticism & Theories', 'Advanced Stylistics & Semantics', 'Academic Research Writing'],
    },
    translations: {
      en: {
        name: 'English Language & Literature',
        shortName: 'English',
        tagline: 'Grammar, Words, Expression & Classics',
        description: 'Enhance phonics, vocabulary, grammatical mastery, sentence structures, rhetoric, and literature.',
      },
      hi: {
        name: 'अंग्रेजी भाषा व साहित्य',
        shortName: 'अंग्रेजी',
        tagline: 'व्याकरण, शब्दकोश, रचना व क्लासिक्स',
        description: 'फोनिक्स, व्याकरण नियम, काल, सक्रिय-कर्मवाच्य, मुहावरे और महान अंग्रेजी साहित्यकारों की कृतियां।',
      },
      te: {
        name: 'ఇంగ్లీష్ భాష & సాహిత్యం',
        shortName: 'ఇంగ్లీష్',
        tagline: 'వ్యాకరణం, పదజాలం & రచన',
        description: 'ఫోనిక్స్, వ్యాకరణ నియమాలు, పదసంపద, కథలు మరియు ఆధునిక ఆంగ్ల రచనా నైపుణ్యాలు.',
      },
      kn: {
        name: 'ಇಂಗ್ಲಿಷ್ ಭಾಷೆ ಮತ್ತು ಸಾಹಿತ್ಯ',
        shortName: 'ಇಂಗ್ಲಿಷ್',
        tagline: 'ವ್ಯಾಕರಣ, ಶಬ್ದಕೋಶ ಮತ್ತು ಸಾಹಿತ್ಯ',
        description: 'ಫೋನಿಕ್ಸ್, ವ್ಯಾಕರಣ, ವಾಕ್ಯ ರಚನೆ ಮತ್ತು ಇಂಗ್ಲಿಷ್ ಭಾಷಾ ಪ್ರಾವೀಣ್ಯತೆಯನ್ನು ಬೆಳೆಸಿಕೊಳ್ಳಿ.',
      },
      ml: {
        name: 'ഇംഗ്ലീഷ് ഭാഷയും സാഹിത്യവും',
        shortName: 'ഇംഗ്ലീഷ്',
        tagline: 'വ്യാകരണം, പദാവലി & സാഹിത്യം',
        description: 'ഇംഗ്ലീഷ് അക്ഷരങ്ങൾ, വ്യാകരണ നിയമങ്ങൾ, പദസമ്പത്ത്, രചനാപാടവം എന്നിവ വികസിപ്പിക്കുക.',
      },
    },
  },

  // 7. Geography (भूगोल)
  {
    id: 'geography',
    name: 'Geography & Earth Sciences',
    shortName: 'Geography',
    icon: 'Map',
    color: 'from-emerald-600 to-teal-700',
    bgLight: 'bg-emerald-50 text-emerald-800',
    borderLight: 'border-emerald-200',
    tagline: 'Continents, Oceans, Climate & Maps',
    description: 'Traverse Earth’s landscapes, tectonic plates, rivers, climate zones, maps, and environmental resources.',
    topicsByAge: {
      '3-5': ['Day & Night on Earth', 'Land & Sea', 'Mountains & Rivers in Pictures', 'Sunny, Rainy & Cold Weather'],
      '6-8': ['7 Continents & 5 Oceans', 'Compass Directions (N, S, E, W)', 'Weather vs Seasons', 'Mountains, Deserts & Forests'],
      '9-11': ['Major Landforms of Earth', 'Latitudes & Longitudes', 'Motions of the Earth (Rotation/Revolution)', 'Maps & Scale Reading'],
      '12-14': ['Inside Our Earth (Crust, Mantle, Core)', 'Atmosphere & Air Pressure', 'Water Cycles & Ocean Currents', 'Agriculture & Natural Vegetation'],
      '15-16': ['Resources & Development in India', 'Forest & Wildlife Resources', 'Water Resources & Dams', 'Minerals & Energy Power Plants'],
      '17-18': ['Physical Geography of the World', 'Geomorphology & Plate Tectonics', 'Climatology & Monsoons', 'Human Geography, Demographics & Urbanisation'],
    },
    translations: {
      en: {
        name: 'Geography & Earth Sciences',
        shortName: 'Geography',
        tagline: 'Continents, Oceans, Climate & Maps',
        description: 'Traverse Earth’s landscapes, tectonic plates, rivers, climate zones, maps, and environmental resources.',
      },
      hi: {
        name: 'भूगोल व पर्यावरण',
        shortName: 'भूगोल',
        tagline: 'महाद्वीप, महासागर, मौसम, नदियां व मानचित्र',
        description: 'पृथ्वी की संरचना, जलवायु, महाद्वीप, पर्वत, नदियां, प्राकृतिक संसाधन और मानचित्र पठन कौशल।',
      },
      te: {
        name: 'భూగోళ శాస్త్రం',
        shortName: 'భూగోళం',
        tagline: 'ఖండాలు, మహాసముద్రాలు & వాతావరణం',
        description: 'భూమి నిర్మాణం, నదులు, పర్వతాలు, శీతోష్ణస్థితి, పటాల పఠనం మరియు సహజ వనరులు.',
      },
      kn: {
        name: 'ಭೂಗೋಳಶಾಸ್ತ್ರ',
        shortName: 'ಭೂಗೋಳ',
        tagline: 'ಖಂಡಗಳು, ಸಾಗರಗಳು ಮತ್ತು ಹವಾಮಾನ',
        description: 'ಭೂಮಿಯ ರಚನೆ, ನದಿಗಳು, ಪರ್ವತಗಳು, ಹವಾಮಾನ ಮತ್ತು ನಕ್ಷೆಗಳ ಅಧ್ಯಯನ.',
      },
      ml: {
        name: 'ഭൂമിശാസ്ത്രം',
        shortName: 'ഭൂമിശാസ്ത്രം',
        tagline: 'വൻകരകൾ, സമുദ്രങ്ങൾ & കാലാവസ്ഥ',
        description: 'ഭൂമിയുടെ ഘടന, പർവ്വതങ്ങൾ, നദികൾ, കാലാവസ്ഥാ മേഖലകൾ എന്നിവ പഠിക്കുക.',
      },
    },
  },

  // 8. History (इतिहास)
  {
    id: 'history',
    name: 'History & Civilizations',
    shortName: 'History',
    icon: 'Hourglass',
    color: 'from-amber-700 to-orange-800',
    bgLight: 'bg-amber-50 text-amber-900',
    borderLight: 'border-amber-200',
    tagline: 'Ancient Empires, Freedom Struggles & World Milestones',
    description: 'Uncover archaeological treasures, the Indus Valley, Vedic age, medieval dynasties, and independence movements.',
    topicsByAge: {
      '3-5': ['Olden Days Stories', 'Kings & Forts in Pictures', 'Ancient Caves & Paintings', 'Grandparent Memories'],
      '6-8': ['Early Humans & Fire Discovery', 'Farming & Wheel Invention', 'Stories of Great Kings (Ashoka, Shivaji)', 'Monuments of India'],
      '9-11': ['Indus Valley Harappan Civilization', 'Vedic Age & Early Kingdoms', 'Mauryan Empire & Ashoka’s Pillars', 'Golden Age of Guptas'],
      '12-14': ['Delhi Sultanate & Mughals', 'Bhakti & Sufi Traditions', 'The Revolt of 1857', 'Colonial Rule & Modern Education'],
      '15-16': ['Nationalism in Europe & India', 'Mahatma Gandhi & Freedom Movement', 'The Making of a Global World', 'Print Culture & Modern Ideas'],
      '17-18': ['Themes in Indian History (Archaeology to Constitution)', 'World Wars & Decolonisation', 'Cold War Politics & Non-Alignment', 'Historiography & Archival Sources'],
    },
    translations: {
      en: {
        name: 'History & Civilizations',
        shortName: 'History',
        tagline: 'Ancient Empires, Freedom Struggles & World Milestones',
        description: 'Uncover archaeological treasures, the Indus Valley, Vedic age, medieval dynasties, and independence movements.',
      },
      hi: {
        name: 'इतिहास व प्राचीन सभ्यताएं',
        shortName: 'इतिहास',
        tagline: 'सिंधु सभ्यता, मौर्य, गुप्त व स्वतंत्रता संग्राम',
        description: 'प्राचीन सभ्यताएं, मध्यकालीन भारत, स्वतंत्रता सेनानियों का योगदान और विश्व इतिहास के ऐतिहासिक मोड़।',
      },
      te: {
        name: 'చరిత్ర & ప్రాచీన సంస్కృతులు',
        shortName: 'చరిత్ర',
        tagline: 'సామ్రాజ్యాలు, స్వాతంత్ర్య పోరాటం & ప్రపంచ చరిత్ర',
        description: 'సింధు నాగరికత, మౌర్య, గుప్త సామ్రాజ్యాలు, స్వాతంత్ర్య సమరం మరియు ప్రపంచ మైలురాళ్లు.',
      },
      kn: {
        name: 'ಇತಿಹಾಸ ಮತ್ತು ನಾಗರಿಕತೆಗಳು',
        shortName: 'ಇತಿಹಾಸ',
        tagline: 'ಪ್ರಾಚೀನ ಸಾಮ್ರಾಜ್ಯಗಳು ಮತ್ತು ಸ್ವಾತಂತ್ರ್ಯ ಸಂಗ್ರಾಮ',
        description: 'ಸಿಂಧೂ ನಾಗರಿಕತೆ, ಭಾರತೀಯ ರಾಜವಂಶಗಳು ಮತ್ತು ಸ್ವಾತಂತ್ರ್ಯ ಹೋರಾಟದ ಮಹಾನ್ ಕಥೆಗಳು.',
      },
      ml: {
        name: 'ചരിത്രവും സംസ്കാരവും',
        shortName: 'ചരിത്രം',
        tagline: 'സാമ്രാജ്യങ്ങൾ, സ്വാതന്ത്ര്യസമരം & ലോകസംഭവങ്ങൾ',
        description: 'സിന്ധുനദീതട സംസ്കാരം, മൗര്യ-ഗുപ്ത കാലഘട്ടങ്ങൾ, ഇന്ത്യൻ സ്വാതന്ത്ര്യസമരം എന്നിവ പഠിക്കുക.',
      },
    },
  },

  // 9. Economy (अर्थशास्त्र)
  {
    id: 'economy',
    name: 'Economics & Financial Literacy',
    shortName: 'Economy',
    icon: 'TrendingUp',
    color: 'from-green-600 to-emerald-700',
    bgLight: 'bg-green-50 text-green-800',
    borderLight: 'border-green-200',
    tagline: 'Markets, Banking, Trade, Budget & Wealth',
    description: 'Learn supply and demand, money, banking, smart savings, GDP, inflation, government budgets, and global trade.',
    topicsByAge: {
      '3-5': ['Coins & Currency Notes', 'Piggy Bank Savings', 'Needs vs Wants (Food vs Toys)', 'Visiting the Market'],
      '6-8': ['Buying & Selling Goods', 'Understanding Pocket Money', 'Why Saving Matters', 'Banks & ATM Cards'],
      '9-11': ['Goods vs Services', 'Village Economy & Farming', 'Income, Expense & Family Budgets', 'Barter System to Digital UPI'],
      '12-14': ['Sectors of the Indian Economy (Primary, Secondary, Tertiary)', 'Money & Credit (Loans, Interest)', 'Inflation & Purchasing Power', 'Public Facilities & Taxes'],
      '15-16': ['Development Indicators (HDI, Per Capita Income)', 'Globalisation & The Indian Economy', 'Consumer Rights & Protections', 'Digital Banking & Entrepreneurship'],
      '17-18': ['Microeconomics (Consumer Behaviour, Elasticity)', 'Macroeconomics (National Income, GDP)', 'Government Budget, Fiscal Policy & Monetary Tools', 'Indian Economic Development (1947 to Present)'],
    },
    translations: {
      en: {
        name: 'Economics & Financial Literacy',
        shortName: 'Economy',
        tagline: 'Markets, Banking, Trade, Budget & Wealth',
        description: 'Learn supply and demand, money, banking, smart savings, GDP, inflation, government budgets, and global trade.',
      },
      hi: {
        name: 'अर्थशास्त्र व वित्तीय साक्षरता',
        shortName: 'अर्थशास्त्र',
        tagline: 'बाजार, बैंकिंग, बजट, जीडीपी व बचत',
        description: 'मांग और आपूर्ति, मुद्रा, बैंकिंग प्रणाली, पारिवारिक बजट, राष्ट्रीय आय, मुद्रास्फीति और वित्तीय कौशल।',
      },
      te: {
        name: 'ఆర్థిక శాస్త్రం',
        shortName: 'ఎకానమీ',
        tagline: 'మార్కెట్లు, బ్యాంకింగ్, బడ్జెట్ & పొదుపు',
        description: 'ద్రవ్యం, బ్యాంకులు, జీడీపీ, మార్కెట్ ధరలు, పొదుపు మరియు ఆర్థిక విజ్ఞానం.',
      },
      kn: {
        name: 'ಅರ್ಥಶಾಸ್ತ್ರ ಮತ್ತು ಹಣಕಾಸು',
        shortName: 'ಅರ್ಥಶಾಸ್ತ್ರ',
        tagline: 'ಮಾರುಕಟ್ಟೆ, ಬ್ಯಾಂಕಿಂಗ್, ಬಜೆಟ್ ಮತ್ತು ಉಳಿತಾಯ',
        description: 'ಹಣದ ಬಳಕೆ, ಬ್ಯಾಂಕಿಂಗ್ ವ್ಯವಸ್ಥೆ, ಜಿಡಿಪಿ ಮತ್ತು ಆರ್ಥಿಕ ಯೋಜನೆಯ ಮೂಲಭೂತ ಜ್ಞಾನ.',
      },
      ml: {
        name: 'സാമ്പത്തിക ശാസ്ത്രം',
        shortName: 'ഇക്കണോമിക്സ്',
        tagline: 'വിപണി, ബാങ്കിങ്, ബജറ്റ് & സമ്പാദ്യം',
        description: 'പണം, ബാങ്കുകൾ, ബജറ്റ്, ജിഡിപി, വ്യാപാരം എന്നിവ മനസ്സിലാക്കുക.',
      },
    },
  },

  // 10. Mahabharat (महाभारत)
  {
    id: 'mahabharat',
    name: 'Mahabharat & Epic Literature',
    shortName: 'Mahabharat',
    icon: 'Shield',
    color: 'from-amber-600 to-red-600',
    bgLight: 'bg-amber-50 text-amber-900',
    borderLight: 'border-amber-200',
    tagline: 'Epic Wisdom, Moral Courage, Dharma & Gita Lessons',
    description: 'Immerse in the greatest epic of Bharat: moral dilemmas, righteousness (Dharma), resilience, and Bhagavad Gita ethics.',
    topicsByAge: {
      '3-5': ['Childhood of Pandavas', 'The Golden Deer & Forest Friends', 'Friendly Archery Games', 'Honesty & Brotherhood'],
      '6-8': ['Arjuna’s Concentrated Aim (Bird’s Eye)', 'Eklavya’s Dedication to Learning', 'Bhima’s Courage & Kindness', 'Keeping Promises'],
      '9-11': ['The Pandavas in the Forest', 'Karna’s Generosity (Daanveera)', 'Yudhishthira and the Yaksha Prashna (Wisdom Quiz)', 'The Palace of Illusions'],
      '12-14': ['The Embassy of Peace (Shanti Doot Krishna)', 'Dharma Sankat: Moral Dilemmas of Warriors', 'The Core Teachings of the Bhagavad Gita', 'Great Characters (Bhishma, Drona, Vidura)'],
      '15-16': ['The Kurukshetra Discourse & Duty (Karma Yoga)', 'Justice vs Retribution in Ancient Epics', 'Leadership Styles in Mahabharat', 'Literary Genius of Sage Vyasa'],
      '17-18': ['Philosophical Synthesis of the Gita', 'Comparative Epic Literature (Iliad, Odyssey, Ramayana)', 'Dharmic Jurisprudence & Ethical Statecraft', 'Existential Themes of Destiny vs Free Will'],
    },
    translations: {
      en: {
        name: 'Mahabharat & Epic Literature',
        shortName: 'Mahabharat',
        tagline: 'Epic Wisdom, Moral Courage, Dharma & Gita Lessons',
        description: 'Immerse in the greatest epic of Bharat: moral dilemmas, righteousness (Dharma), resilience, and Bhagavad Gita ethics.',
      },
      hi: {
        name: 'महाभारत कथा व नैतिक मूल्य',
        shortName: 'महाभारत',
        tagline: 'धर्म, एकाग्रता, त्याग, भगवद्गीता व नीति कथाएं',
        description: 'अर्जुन का लक्ष्य संधान, यक्ष प्रश्न, दानवीर कर्ण, शांतिदूत श्रीकृष्ण और भगवद्गीता के अमर जीवन उपदेश।',
      },
      te: {
        name: 'మహాభారతం & నైతిక విలువలు',
        shortName: 'మహాభారతం',
        tagline: 'ధర్మం, భగవద్గీత బోధనలు & వీరగాథలు',
        description: 'అర్జునుని ఏకాగ్రత, యక్ష ప్రశ్నలు, కర్ణుని దాతృత్వం మరియు భగవద్గీత జీవన సందేశం.',
      },
      kn: {
        name: 'ಮಹಾಭಾರತ ಮತ್ತು ನೈತಿಕ ಮೌಲ್ಯಗಳು',
        shortName: 'ಮಹಾಭಾರತ',
        tagline: 'ಧರ್ಮ, ಭಗವದ್ಗೀತೆ ಮತ್ತು ಶ್ರೇಷ್ಠ ನಾಯಕತ್ವ',
        description: 'ಅರ್ಜುನನ ಗುರಿ ಸಾಧನೆ, ಯಕ್ಷ ಪ್ರಶ್ನೆಗಳು, ಕರ್ಣನ ದಾನಗುಣ ಮತ್ತು ಶ್ರೀಕೃಷ್ಣನ ಗೀತಾ ಸಂದೇಶ.',
      },
      ml: {
        name: 'മഹാഭാരതം & ധാർമ്മിക മൂല്യങ്ങൾ',
        shortName: 'മഹാഭാരതം',
        tagline: 'ധർമ്മം, ഭഗവദ്ഗീത & പൗരാണിക ജ്ഞാനം',
        description: 'അർജ്ജുനന്റെ ഏകാഗ്രത, യക്ഷപ്രശ്നം, കർണ്ണന്റെ ത്യാഗം, ഭഗവദ്ഗീതാ സന്ദേശങ്ങൾ എന്നിവ ഉൾക്കൊള്ളുക.',
      },
    },
  },

  // 11. Home Science (गृह विज्ञान)
  {
    id: 'home_science',
    name: 'Home Science & Nutrition',
    shortName: 'Home Science',
    icon: 'Home',
    color: 'from-rose-500 to-pink-600',
    bgLight: 'bg-rose-50 text-rose-800',
    borderLight: 'border-rose-200',
    tagline: 'Nutrition, Health, Family Care & Resource Management',
    description: 'Learn balanced diets, food nutrients, hygiene, textile care, home budgeting, human development, and wellness.',
    topicsByAge: {
      '3-5': ['Washing Hands with Soap', 'Colorful Healthy Veggies & Fruits', 'Keeping Toys Tidy', 'Brushing Teeth Routine'],
      '6-8': ['The 5 Food Groups (Grains, Pulses, Dairy, Fruits, Veggies)', 'Kitchen Safety Rules', 'Drinking Clean Water', 'Caring for Grandparents'],
      '9-11': ['Balanced Diet & Deficiency Diseases', 'Personal Hygiene & Posture', 'First Aid for Cuts & Burns', 'Fabric Types (Cotton, Wool, Silk)'],
      '12-14': ['Nutrient Preservation in Cooking', 'Food Adulteration Detection', 'Family Budgeting & Time Management', 'Stain Removal & Laundry Care'],
      '15-16': ['Adolescent Nutrition & Fitness', 'Consumer Education in Supermarkets', 'Child Development Milestones', 'Interior Space Design & Aesthetics'],
      '17-18': ['Clinical Nutrition & Diet Therapy', 'Human Development & Family Dynamics', 'Textile Science & Quality Testing', 'Community Health, Resource Ecology & Sanitation'],
    },
    translations: {
      en: {
        name: 'Home Science & Nutrition',
        shortName: 'Home Science',
        tagline: 'Nutrition, Health, Family Care & Resource Management',
        description: 'Learn balanced diets, food nutrients, hygiene, textile care, home budgeting, human development, and wellness.',
      },
      hi: {
        name: 'गृह विज्ञान व पोषण',
        shortName: 'गृह विज्ञान',
        tagline: 'संतुलित आहार, स्वास्थ्य, वस्त्र व पारिवारिक प्रबंधन',
        description: 'पोषक तत्व, स्वच्छता, पाक कला, प्राथमिक चिकित्सा, वस्त्र चयन, पारिवारिक बजट और बाल विकास।',
      },
      te: {
        name: 'గృహ విజ్ఞానం & పోషకాహారం',
        shortName: 'హోమ్ సైన్స్',
        tagline: 'ఆరోగ్యం, ఆహారం, కుటుంబ సంరక్షణ & బడ్జెట్',
        description: 'సమతుల్య ఆహారం, పోషకాలు, వస్త్రాల నిర్వహణ, ప్రథమ చికిత్స మరియు కుటుంబ వనరుల నిర్వహణ.',
      },
      kn: {
        name: 'ಗೃಹ ವಿಜ್ಞಾನ ಮತ್ತು ಪೋಷಣೆ',
        shortName: 'ಗೃಹ ವಿಜ್ಞಾನ',
        tagline: 'ಆರೋಗ್ಯ, ಸಮತೋಲನ ಆಹಾರ ಮತ್ತು ಕುಟುಂಬ ನಿರ್ವಹಣೆ',
        description: 'ಪೌಷ್ಟಿಕಾಂಶಗಳು, ನೈರ್ಮಲ್ಯ, ಬಟ್ಟೆಗಳ ಆರೈಕೆ ಮತ್ತು ಮನೆ ವೆಚ್ಚ ನಿರ್ವಹಣೆ.',
      },
      ml: {
        name: 'ഗാർഹിക ശാസ്ത്രം & പോഷകാഹാരം',
        shortName: 'ഹോം സയൻസ്',
        tagline: 'പോഷകാഹാരം, ആരോഗ്യം & കുടുംബ പരിപാലനം',
        description: 'സമീകൃതാഹാരം, ശുചിത്വം, വസ്ത്ര പരിപാലനം, ഗാർഹിക ബജറ്റ് എന്നിവ പഠിക്കുക.',
      },
    },
  },

  // 12. Science (सामान्य विज्ञान)
  {
    id: 'science',
    name: 'General Science',
    shortName: 'Science',
    icon: 'Microscope',
    color: 'from-emerald-500 to-teal-600',
    bgLight: 'bg-emerald-50 text-emerald-800',
    borderLight: 'border-emerald-200',
    tagline: 'Nature, Experiments, Space & Inquiry',
    description: 'Foster scientific inquiry from curious observation to physical, biological, and environmental phenomena.',
    topicsByAge: {
      '3-5': ['Five Senses (Eyes, Ears, Nose, Tongue, Skin)', 'Animal Sounds & Homes', 'Day Sky vs Night Sky', 'Sink or Float Experiments'],
      '6-8': ['Living vs Non-Living Things', 'Parts of a Plant', 'Air, Water & Weather', 'Human Skeleton & Muscles'],
      '9-11': ['Solar System & Planets', 'Magnets & Poles', 'Adaptation in Deserts & Mountains', 'States of Matter Experiments'],
      '12-14': ['Microorganisms & Fungi', 'Synthetic Materials & Plastics', 'Combustion & Fuel Conservation', 'Cell Division Basics'],
      '15-16': ['Chemical Reactions & Redox', 'Electricity & Circuits', 'Heredity & Evolution', 'Environmental Sustainability'],
      '17-18': ['Integrated Scientific Principles', 'Scientific Method & Empirical Testing', 'Bioenergetics & Global Warming', 'Frontiers of Modern Science'],
    },
    translations: {
      en: {
        name: 'General Science',
        shortName: 'Science',
        tagline: 'Nature, Experiments, Space & Inquiry',
        description: 'Foster scientific inquiry from curious observation to physical, biological, and environmental phenomena.',
      },
      hi: {
        name: 'सामान्य विज्ञान व अन्वेषण',
        shortName: 'विज्ञान',
        tagline: 'प्रकृति, प्रयोग, अंतरिक्ष व वैज्ञानिक दृष्टिकोण',
        description: 'दैनिक जीवन में विज्ञान, सौरमंडल, इंद्रियां, बल, गति, पदार्थ और पर्यावरण का समग्र अध्ययन।',
      },
      te: {
        name: 'సామాన్య శాస్త్రం',
        shortName: 'సైన్స్',
        tagline: 'ప్రకృతి, ప్రయోగాలు & అంతరిక్షం',
        description: 'రోజువారీ జీవితంలో సైన్స్, సౌరకుటుంబం, శరీర భాగాలు మరియు పర్యావరణ పరిరక్షణ.',
      },
      kn: {
        name: 'ಸಾಮಾನ್ಯ ವಿಜ್ಞಾನ',
        shortName: 'ವಿಜ್ಞಾನ',
        tagline: 'ಪ್ರಕೃತಿ, ಪ್ರಯೋಗಗಳು ಮತ್ತು ಬಾಹ್ಯಾಕಾಶ',
        description: 'ವಿಜ್ಞಾನದ ಕುತೂಹಲಕಾರಿ ಪ್ರಯೋಗಗಳು, ಸೌರವ್ಯೂಹ ಮತ್ತು ಪರಿಸರದ ಅನ್ವೇಷಣೆ.',
      },
      ml: {
        name: 'ജനറൽ സയൻസ്',
        shortName: 'സയൻസ്',
        tagline: 'പ്രകൃതി, പരീക്ഷണങ്ങൾ & ജ്യോതിശാസ്ത്രം',
        description: 'ശാസ്ത്രീയ ചിന്താഗതി, പ്രകൃതി നിയമങ്ങൾ, പരീക്ഷണങ്ങൾ എന്നിവ മനസ്സിലാക്കുക.',
      },
    },
  },

  // 13. Computer Science Basic (कंप्यूटर विज्ञान मूल बातें)
  {
    id: 'computer',
    name: 'Computer Science Basics',
    shortName: 'Computers',
    icon: 'Cpu',
    color: 'from-cyan-500 to-blue-600',
    bgLight: 'bg-cyan-50 text-cyan-800',
    borderLight: 'border-cyan-200',
    tagline: 'Hardware, Coding, Internet Safety & AI Basics',
    description: 'Understand technology from kindergarten screen safety to high school programming, algorithms, and AI fundamentals.',
    topicsByAge: {
      '3-5': ['Screen Time Safety Rules', 'Keyboard Letter Hunt', 'Mouse Clicking & Dragging', 'Friendly Robots in Stories'],
      '6-8': ['Input vs Output Devices (Keyboard, Monitor, Printer)', 'Hardware vs Software', 'Drawing in Paint', 'What is a Computer Program?'],
      '9-11': ['Files, Folders & Storage (GB/MB)', 'Block-Based Coding Logic (Scratch)', 'Web Browsers & Safe Search', 'Word Processing Basics'],
      '12-14': ['Algorithms & Flowcharts', 'Binary Number System (0s & 1s)', 'Introduction to Python & Variables', 'Cyber Safety & Password Security'],
      '15-16': ['Python Conditionals & Loops', 'HTML & Web Page Basics', 'Relational Databases & SQL Queries', 'Cyber Ethics & Intellectual Property'],
      '17-18': ['Object-Oriented Programming (Classes/Methods)', 'Data Structures (Stacks, Queues, Arrays)', 'Computer Networks & Protocols', 'AI, Machine Learning & Cloud Computing Basics'],
    },
    translations: {
      en: {
        name: 'Computer Science Basics',
        shortName: 'Computers',
        tagline: 'Hardware, Coding, Internet Safety & AI Basics',
        description: 'Understand technology from kindergarten screen safety to high school programming, algorithms, and AI fundamentals.',
      },
      hi: {
        name: 'कंप्यूटर विज्ञान मूल बातें',
        shortName: 'कंप्यूटर',
        tagline: 'हार्डवेयर, कोडिंग, इंटरनेट सुरक्षा व एआई मूल बातें',
        description: 'कीबोर्ड, माउस, सॉफ्टवेयर, पायथन कोडिंग, एल्गोरिदम, साइबर सुरक्षा और आर्टिफिशियल इंटेलिजेंस का परिचय।',
      },
      te: {
        name: 'కంప్యూటర్ సైన్స్ బేసిక్స్',
        shortName: 'కంప్యూటర్లు',
        tagline: 'హార్డ్‌వేర్, కోడింగ్ & ఇంటర్నెట్ భద్రత',
        description: 'కీబోర్డ్, మౌస్, సాఫ్ట్‌వేర్, పైథాన్ కోడింగ్, అల్గారిథమ్స్ మరియు సైబర్ సెక్యూరిటీ.',
      },
      kn: {
        name: 'ಕಂಪ್ಯೂಟರ್ ಸೈನ್ಸ್ ಮೂಲಗಳು',
        shortName: 'ಕಂಪ್ಯೂಟರ್',
        tagline: 'ಹಾರ್ಡ್‌ವೇರ್, ಕೋಡಿಂಗ್ ಮತ್ತು ಇಂಟರ್ನೆಟ್ ಸುರಕ್ಷತೆ',
        description: 'ಕಂಪ್ಯೂಟರ್ ಭಾಗಗಳು, ಕೋಡಿಂಗ್ ತರ್ಕ, ಇಂಟರ್ನೆಟ್ ಮತ್ತು ಸುರಕ್ಷಿತ ಬಳಕೆ.',
      },
      ml: {
        name: 'കമ്പ്യൂട്ടർ സയൻസ് അടിസ്ഥാനങ്ങൾ',
        shortName: 'കമ്പ്യൂട്ടർ',
        tagline: 'ഹാർഡ്‌വെയർ, കോഡിങ് & ഇന്റർനെറ്റ് സുരക്ഷ',
        description: 'കമ്പ്യൂട്ടർ ഘടകങ്ങൾ, കോഡിംഗ് അടിസ്ഥാനങ്ങൾ, സൈബർ സുരക്ഷ എന്നിവ പഠിക്കുക.',
      },
    },
  },

  // 14. Sanskrit (संस्कृत)
  {
    id: 'sanskrit',
    name: 'Sanskrit Language & Shlokas',
    shortName: 'Sanskrit',
    icon: 'ScrollText',
    color: 'from-amber-600 to-yellow-700',
    bgLight: 'bg-amber-50 text-amber-900',
    borderLight: 'border-amber-200',
    tagline: 'Devavani, Shlokas, Subhashitani & Grammar',
    description: 'Learn the mother of classical Indian languages: pronunciation, subhashitani, vibhakti, dhatu roop, and ancient texts.',
    topicsByAge: {
      '3-5': ['संस्कृत वर्णाः (अ, आ, इ, ई)', 'सरल शब्दाः (गजः, अश्वः, बालकः)', 'गायत्री मन्त्र श्रवणम्', 'संस्कृत संख्या (एकम्, द्वे, त्रीणि)'],
      '6-8': ['अकारान्त पुंल्लिंग शब्दाः (रामः, बालकः)', 'सरल सुभाषित श्लोकाः (विद्या ददाति विनयं)', 'संस्कृत सम्भाषणम् (हरि ॐ, नमस्ते)', 'फल-पुष्प-पशूनां नामानि'],
      '9-11': ['कारक व विभक्ति परिचय (प्रथमा तः सप्तमी)', 'लट् लकार (वर्तमान काल - पठति, पठतः, पठन्ति)', 'सर्वनाम शब्दाः (सः, तौ, ते)', 'हितोपदेश कथाः'],
      '12-14': ['लृट् व लङ् लकार (भविष्य व भूतकाल)', 'सन्धि परिचय (दीर्घ, गुण, वृद्धि)', 'उपसर्गाः व प्रत्ययाः (क्त्वा, ल्यप्, तुमुन्)', 'सुभाषित-रत्न-भाण्डागारम्'],
      '15-16': ['समास परिचय (तत्पुरुष, द्वन्द्व, कर्मधारय)', 'पत्र व संवाद लेखनम्', 'कालिदासस्य ग्रन्थाः (रघुवंशम्, मेघदूतम्)', 'वेद-उपनिषद् वाक्यानि'],
      '17-18': ['संस्कृत साहित्यस्य इतिहासः', 'अभिज्ञानशाकुन्तलम् पठनम्', 'छन्दः व अलङ्कार शास्त्रम्', 'पाणिनीय व्याकरण नियमाः'],
    },
    translations: {
      en: {
        name: 'Sanskrit Language & Shlokas',
        shortName: 'Sanskrit',
        tagline: 'Devavani, Shlokas, Subhashitani & Grammar',
        description: 'Learn the mother of classical Indian languages: pronunciation, subhashitani, vibhakti, dhatu roop, and ancient texts.',
      },
      hi: {
        name: 'संस्कृत भाषा, श्लोक व व्याकरण',
        shortName: 'संस्कृत',
        tagline: 'देववाणी, सुभाषित, विभक्ति, धातु रूप व वैदिक ज्ञान',
        description: 'संस्कृत वर्णमाला, श्लोक, शब्द रूप, धातु रूप, संधि, समास, नीति कथाएं और प्राचीन ग्रंथों का अध्ययन।',
      },
      te: {
        name: 'సంస్కృత భాష & శ్లోకాలు',
        shortName: 'సంస్కృతం',
        tagline: 'సుభాషితాలు, విభక్తులు & ప్రాచీన విజ్ఞానం',
        description: 'సంస్కృత వర్ణమాల, శ్లోకాలు, వ్యాకరణం, సంధులు మరియు ప్రాచీన భారతీయ కావ్యాలు.',
      },
      kn: {
        name: 'ಸಂಸ್ಕೃತ ಭಾಷೆ ಮತ್ತು ಶ್ಲೋಕಗಳು',
        shortName: 'ಸಂಸ್ಕೃತ',
        tagline: 'ದೇವವಾಣಿ, ಸುಭಾಷಿತಗಳು ಮತ್ತು ವ್ಯಾಕರಣ',
        description: 'ಸಂಸ್ಕೃತ ಶ್ಲೋಕಗಳು, ವಿಭಕ್ತಿಗಳು, ಸಂಸ್ಕೃತ ಸಂಭಾಷಣೆ ಮತ್ತು ಪ್ರಾಚೀನ ಸಾಹಿತ್ಯ.',
      },
      ml: {
        name: 'സംസ്കൃത ഭാഷയും ശ്ലോകങ്ങളും',
        shortName: 'സംസ്കൃതം',
        tagline: 'സുഭാഷിതങ്ങൾ, വ്യാകരണം & വേദജ്ഞാനം',
        description: 'സംസ്കൃത അക്ഷരമാല, ശ്ലോകങ്ങൾ, ശബ്ദരൂപങ്ങൾ, വ്യാകരണം എന്നിവ പഠിക്കുക.',
      },
    },
  },

  // 15. Mathematics (गणित)
  {
    id: 'math',
    name: 'Mathematics',
    shortName: 'Math',
    icon: 'Calculator',
    color: 'from-amber-500 to-orange-500',
    bgLight: 'bg-amber-50 text-amber-700',
    borderLight: 'border-amber-200',
    tagline: 'Numbers, Shapes, Arithmetic, Algebra & Calculus',
    description: 'Master counting, arithmetic, geometry, fractions, algebra, trigonometry, and calculus from Nursery to 12th.',
    topicsByAge: {
      '3-5': ['Counting 1-10', 'Big vs Small', 'Circles, Squares & Triangles', 'Matching Numbers'],
      '6-8': ['Addition & Subtraction', 'Counting Money', '2D & 3D Shapes', 'Simple Patterns'],
      '9-11': ['Multiplication & Division', 'Fractions & Decimals', 'Area & Perimeter', 'Time & Measurement'],
      '12-14': ['Pre-Algebra', 'Ratios & Percentages', 'Angles & Triangles', 'Data & Graphs'],
      '15-16': ['Linear Equations', 'Pythagorean Theorem', 'Probability', 'Coordinate Geometry'],
      '17-18': ['Calculus & Derivatives', 'Vectors & 3D Geometry', 'Probability Distributions', 'Matrix Algebra'],
    },
    translations: {
      en: {
        name: 'Mathematics',
        shortName: 'Math',
        tagline: 'Numbers, Shapes, Arithmetic, Algebra & Calculus',
        description: 'Master counting, arithmetic, geometry, fractions, algebra, trigonometry, and calculus from Nursery to 12th.',
      },
      hi: {
        name: 'गणित व अंकगणित',
        shortName: 'गणित',
        tagline: 'संख्याएं, ज्यामिति, बीजगणित व कलन',
        description: 'गिनती, जोड़, घटाव, भिन्न, दशमलव, ज्यामिति, बीजगणित, त्रिकोणमिति और कलन का संपूर्ण अभ्यास।',
      },
      te: {
        name: 'గణితం & సంఖ్యలు',
        shortName: 'మ్యాథ్స్',
        tagline: 'అంకగణితం, జ్యామితి & బీజగణితం',
        description: 'సంఖ్యలు, కూడికలు, తీసివేతలు, భిన్నాలు, జ్యామితి, త్రికోణమితి మరియు కలనగణితం.',
      },
      kn: {
        name: 'ಗಣಿತ ಮತ್ತು ಅಂಕಗಣಿತ',
        shortName: 'ಗಣಿತ',
        tagline: 'ಸಂಖ್ಯೆಗಳು, ಜ್ಯಾಮಿತಿ ಮತ್ತು ಬೀಜಗಣಿತ',
        description: 'ಅಂಕಿಅಂಶಗಳು, ಲೆಕ್ಕಾಚಾರ, ಜ್ಯಾಮಿತಿ ಮತ್ತು ಸುಧಾರಿತ ಗಣಿತದ ಸಮಸ್ಯೆ ಪರಿಹಾರ.',
      },
      ml: {
        name: 'ഗണിതം',
        shortName: 'കണക്ക്',
        tagline: 'സംഖ്യകൾ, ജ്യാമിതി & ബീജഗണിതം',
        description: 'എണ്ണൽ, ഗുണനം, ഹരണം, ഭിന്നസംഖ്യകൾ, ജ്യാമിതി എന്നിവയിൽ മികവ് നേടുക.',
      },
    },
  },

  // 16. General Knowledge (सामान्य ज्ञान)
  {
    id: 'gk',
    name: 'General Knowledge',
    shortName: 'GK',
    icon: 'Globe',
    color: 'from-rose-500 to-pink-500',
    bgLight: 'bg-rose-50 text-rose-700',
    borderLight: 'border-rose-200',
    tagline: 'World Wonders, Great Inventions & Current Affairs',
    description: 'Discover animal kingdoms, world capitals, historic milestones, Nobel prizes, and modern geopolitics.',
    topicsByAge: {
      '3-5': ['Baby Animals', 'Our Beautiful Earth', 'Colors of the Rainbow', 'Our Helpers (Doctors, Teachers)'],
      '6-8': ['Animal Wonders', 'Our World Continents', 'Famous Landmarks', 'Inventions Around Us'],
      '9-11': ['World Capitals', 'Solar Explorers', 'Great Inventors', 'Oceans & Mountains'],
      '12-14': ['World Civilizations', 'United Nations & Peace', 'Scientific Breakthroughs', 'Global Geography'],
      '15-16': ['Modern Geopolitics', 'Nobel Laureates', 'Environmental Summits', 'Economic Milestones'],
      '17-18': ['Global Treaties & Alliances', 'Constitutional Law & Rights', 'World Economic Systems', 'Current Affairs'],
    },
    translations: {
      en: {
        name: 'General Knowledge',
        shortName: 'GK',
        tagline: 'World Wonders, Great Inventions & Current Affairs',
        description: 'Discover animal kingdoms, world capitals, historic milestones, Nobel prizes, and modern geopolitics.',
      },
      hi: {
        name: 'सामान्य ज्ञान व विश्व परिचय',
        shortName: 'सामान्य ज्ञान',
        tagline: 'विश्व धरोहर, महान आविष्कार व समसामयिक घटनाएं',
        description: 'राजधानियां, वैज्ञानिक, महाद्वीप, महासागर, पुरस्कार और अंतरराष्ट्रीय समसामयिक ज्ञान।',
      },
      te: {
        name: 'సాధారణ జ్ఞానం',
        shortName: 'జీకే',
        tagline: 'ప్రపంచ వింతలు & గొప్ప ఆవిష్కరణలు',
        description: 'దేశాల రాజధానులు, శాస్త్రవేత్తలు, అంతరిక్షం మరియు తాజా వర్తమాన వ్యవహారాలు.',
      },
      kn: {
        name: 'ಸಾಮಾನ್ಯ ಜ್ಞಾನ',
        shortName: 'ಜಿಕೆ',
        tagline: 'ವಿಶ್ವದ ವಿಸ್ಮಯಗಳು ಮತ್ತು ಆವಿಷ್ಕಾರಗಳು',
        description: 'ವಿಶ್ವ ರಾಜಧಾನಿಗಳು, ಇತಿಹಾಸದ ಮೈಲಿಗಲ್ಲುಗಳು ಮತ್ತು ಪ್ರಚಲಿತ ಘಟನೆಗಳು.',
      },
      ml: {
        name: 'പൊതുവിജ്ഞാനം',
        shortName: 'ജികെ',
        tagline: 'ലോകവിശേഷങ്ങൾ & കണ്ടുപിടുത്തങ്ങൾ',
        description: 'തലസ്ഥാനങ്ങൾ, ശാസ്ത്ര നേട്ടങ്ങൾ, രാജ്യാന്തര കാര്യങ്ങൾ എന്നിവ അറിയുക.',
      },
    },
  },

  // 17. Logical Reasoning (तर्कशक्ति)
  {
    id: 'logic',
    name: 'Logical Reasoning',
    shortName: 'Logic',
    icon: 'Lightbulb',
    color: 'from-yellow-500 to-amber-600',
    bgLight: 'bg-amber-50 text-amber-800',
    borderLight: 'border-amber-200',
    tagline: 'Patterns, Deductions, Puzzles & Mental Ability',
    description: 'Sharpen cognitive reflexes, spatial transformations, analogical reasoning, and analytical problem-solving.',
    topicsByAge: {
      '3-5': ['Shape Sorting', 'Odd One Out (Pictures)', 'Color Patterns', 'Matching Shadows'],
      '6-8': ['Color & Shape Sequences', 'Odd One Out', 'Direction Clues', 'Simple Grid Paths'],
      '9-11': ['Number Series', 'Venn Diagrams', 'Mirror Images', 'Blood Relations Basics'],
      '12-14': ['Syllogisms & Premises', 'Coding-Decoding', 'Seating Arrangements', 'Analogy Chains'],
      '15-16': ['Critical Thinking Puzzles', 'Truth-Teller Riddles', 'Direction Sense Pro', 'Matrix Reasoning'],
      '17-18': ['Propositional Logic', 'Complex Analytical Puzzles', 'Formal Syllogisms', 'Game Theory Deductions'],
    },
    translations: {
      en: {
        name: 'Logical Reasoning',
        shortName: 'Logic',
        tagline: 'Patterns, Deductions, Puzzles & Mental Ability',
        description: 'Sharpen cognitive reflexes, spatial transformations, analogical reasoning, and analytical problem-solving.',
      },
      hi: {
        name: 'तर्कशक्ति व मानसिक क्षमता',
        shortName: 'तर्कशक्ति',
        tagline: 'पैटर्न, दिशा ज्ञान, कोडिंग-डिकोडिंग व पहेलियां',
        description: 'श्रृंखला, वेन आरेख, दर्पण प्रतिबिम्ब, रक्त संबंध और विश्लेषणात्मक तर्क क्षमता का विकास।',
      },
      te: {
        name: 'తార్కిక ఆలోచన',
        shortName: 'లాజిక్',
        tagline: 'ప్యాటర్న్స్, కోడింగ్ & రీజనింగ్',
        description: 'క్రమాలు, దిశలు, కోడింగ్-డీకోడింగ్ మరియు సమస్య పరిష్కార నైపుణ్యాలు.',
      },
      kn: {
        name: 'ತಾರ್ಕಿಕ ಚಿಂತನೆ',
        shortName: 'ಲಾಜಿಕ್',
        tagline: 'ಮಾದರಿಗಳು, ಸಂಕೇತಗಳು ಮತ್ತು ಒಗಟುಗಳು',
        description: 'ಚಿಂತನಾ ಸಾಮರ್ಥ್ಯ, ಸಂಖ್ಯಾ ಸರಣಿ ಮತ್ತು ತಾರ್ಕಿಕ ಸಮಸ್ಯೆ ಪರಿಹಾರ.',
      },
      ml: {
        name: 'ലോജിക്കൽ ചിന്ത',
        shortName: 'റീസണിംഗ്',
        tagline: 'പാറ്റേണുകൾ, കോഡിങ് & ചിന്താശേഷി',
        description: 'യുക്തിസഹമായ ചിന്ത, പാറ്റേണുകൾ, അനലിറ്റിക്കൽ പ്രശ്നപരിഹാരം എന്നിവ പഠിക്കുക.',
      },
    },
  },

  // 18. Reading Comprehension (पठन बोध)
  {
    id: 'reading',
    name: 'Reading Comprehension',
    shortName: 'Reading',
    icon: 'Glasses',
    color: 'from-violet-500 to-purple-500',
    bgLight: 'bg-violet-50 text-violet-700',
    borderLight: 'border-violet-200',
    tagline: 'Stories, Inferences, Analysis & Critical Thinking',
    description: 'Develop picture reading, moral stories, speed-reading, critical deduction, and text analysis.',
    topicsByAge: {
      '3-5': ['Picture Stories', 'Who is in the Picture?', 'Story Animals', 'Happy vs Sad Characters'],
      '6-8': ['Fairy Tales & Morals', 'Character Clues', 'Sequencing Events', 'Picture Clues'],
      '9-11': ['Fact vs Opinion', 'Cause & Effect', 'Story Context', 'Author Purpose'],
      '12-14': ['Inference & Tone', 'Theme Analysis', 'Cross-Text Comparison', 'Non-Fiction Essays'],
      '15-16': ['Literary Analysis', 'Editorial Critiques', 'Historical Documents', 'Implicit Bias'],
      '17-18': ['Philosophical Synthesis', 'Scholarly Articles', 'Comparative Literature', 'Argumentative Rhetoric'],
    },
    translations: {
      en: {
        name: 'Reading Comprehension',
        shortName: 'Reading',
        tagline: 'Stories, Inferences, Analysis & Critical Thinking',
        description: 'Develop picture reading, moral stories, speed-reading, critical deduction, and text analysis.',
      },
      hi: {
        name: 'पठन बोध व कहानियां',
        shortName: 'पठन बोध',
        tagline: 'चित्र कथाएं, सार संक्षेप, निष्कर्ष व भावार्थ',
        description: 'कहानियों का सार, पात्र विश्लेषण, त्वरित पठन और भाषा बोध क्षमता का विकास।',
      },
      te: {
        name: 'పఠన నైపుణ్యం & కథలు',
        shortName: 'పఠనం',
        tagline: 'కథలు, భావార్థం & విశ్లేషణ',
        description: 'కథలు చదవడం, సారాంశం అర్థం చేసుకోవడం మరియు పఠన నైపుణ్యాలు.',
      },
      kn: {
        name: 'ಓದುವ ಕೌಶಲ್ಯ ಮತ್ತು ಕಥೆಗಳು',
        shortName: 'ಓದುವಿಕೆ',
        tagline: 'ಕಥೆಗಳು, ತಾತ್ಪರ್ಯ ಮತ್ತು ವಿಶ್ಲೇಷಣೆ',
        description: 'ಚಿತ್ರ ಕಥೆಗಳು, ಸಾರಾಂಶ ಗ್ರಹಿಕೆ ಮತ್ತು ವೇಗದ ಓದುವ ಕೌಶಲ್ಯ.',
      },
      ml: {
        name: 'വായനയും ഗ്രഹണശേഷിയും',
        shortName: 'വായന',
        tagline: 'കഥകൾ, ആശയങ്ങൾ & വിശകലനം',
        description: 'ചിത്രകഥകൾ, വായനാ പാടവം, സാരാംശ ഗ്രഹണം എന്നിവ വികസിപ്പിക്കുക.',
      },
    },
  },

  // 19. Brain Puzzles (पहेलियां)
  {
    id: 'puzzles',
    name: 'Puzzles & Brain Games',
    shortName: 'Puzzles',
    icon: 'Puzzle',
    color: 'from-fuchsia-500 to-pink-600',
    bgLight: 'bg-fuchsia-50 text-fuchsia-700',
    borderLight: 'border-fuchsia-200',
    tagline: 'Memory, Sudoku, Mazes & Cryptic Challenges',
    description: 'Fun cognitive exercises, nursery picture matching, anagrams, Sudoku, and lateral thinking ciphers.',
    topicsByAge: {
      '3-5': ['2-Piece Picture Puzzles', 'Animal Memory Cards', 'Color Matching', 'Follow the Line Maze'],
      '6-8': ['Animal Memory Match', 'Word Unscramblers', 'Color Mazes', 'Picture Differences'],
      '9-11': ['Sudoku 4x4 & 6x6', 'Anagram Quests', 'Crossword Clues', 'Matchstick Math'],
      '12-14': ['Cryptarithms', 'Tower of Hanoi Logic', 'Word Ladders', 'Spatial Cubes'],
      '15-16': ['Sudoku Master', 'KenKen Math Logic', 'Cipher Cracking', 'Lateral Thinking Paradoxes'],
      '17-18': ['Cryptanalysis & Hashes', 'Combinatorial Puzzles', 'Graph Theory Paths', 'Algorithmic Mazes'],
    },
    translations: {
      en: {
        name: 'Puzzles & Brain Games',
        shortName: 'Puzzles',
        tagline: 'Memory, Sudoku, Mazes & Cryptic Challenges',
        description: 'Fun cognitive exercises, nursery picture matching, anagrams, Sudoku, and lateral thinking ciphers.',
      },
      hi: {
        name: 'मस्तिष्क पहेलियां व खेल',
        shortName: 'पहेलियां',
        tagline: 'सुडोकू, भूलभुलैया, स्मृति खेल व शब्द पहेलियां',
        description: 'मस्तिष्क को तेज करने वाली पहेलियां, मेमोरी कार्ड, शब्द जाल और तार्किक चुनौतियां।',
      },
      te: {
        name: 'బ్రెయిన్ పజిల్స్ & ఆటలు',
        shortName: 'పజిల్స్',
        tagline: 'సుడోకు, మెమరీ గేమ్స్ & చిక్కుముడులు',
        description: 'మెదడుకు మేత వేసే పజిల్స్, సుడోకు మరియు జ్ఞాపకశక్తి ఆటలు.',
      },
      kn: {
        name: 'ಮೆದುಳಿನ ಒಗಟುಗಳು',
        shortName: 'ಒಗಟುಗಳು',
        tagline: 'ಸುಡೋಕು, ಮೆಮೊರಿ ಆಟಗಳು ಮತ್ತು ಬುದ್ಧಿವಂತಿಕೆ',
        description: 'ಮೆದುಳಿಗೆ ವ್ಯಾಯಾಮ ನೀಡುವ ಒಗಟುಗಳು, ಸುಡೋಕು ಮತ್ತು ಮೆಮೊರಿ ಆಟಗಳು.',
      },
      ml: {
        name: 'ബുദ്ധിപരമായ പസിലുകൾ',
        shortName: 'പസിലുകൾ',
        tagline: 'സുഡോകു, മെമ്മറി ഗെയിംസ് & വിനോദങ്ങൾ',
        description: 'ഓർമ്മശക്തിയും ചിന്താശേഷിയും വർദ്ധിപ്പിക്കുന്ന രസകരമായ പസിലുകൾ.',
      },
    },
  },
];

// Helper functions for localized subject presentation
export function getSubjectById(id: SubjectId): SubjectData {
  const found = SUBJECTS.find((s) => s.id === id);
  return found || SUBJECTS[0];
}

export function getLocalizedSubjectName(subject: SubjectData, lang: AppLanguage = 'en'): string {
  if (subject.translations && subject.translations[lang]?.name) {
    return subject.translations[lang].name;
  }
  return subject.name;
}

export function getLocalizedSubjectShortName(subject: SubjectData, lang: AppLanguage = 'en'): string {
  if (subject.translations && subject.translations[lang]?.shortName) {
    return subject.translations[lang].shortName;
  }
  return subject.shortName;
}

export function getLocalizedSubjectTagline(subject: SubjectData, lang: AppLanguage = 'en'): string {
  if (subject.translations && subject.translations[lang]?.tagline) {
    return subject.translations[lang].tagline;
  }
  return subject.tagline;
}

export function getLocalizedSubjectDescription(subject: SubjectData, lang: AppLanguage = 'en'): string {
  if (subject.translations && subject.translations[lang]?.description) {
    return subject.translations[lang].description;
  }
  return subject.description;
}
