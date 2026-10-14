import { AppLanguage, LanguageOption } from '../types';

export const SUPPORTED_LANGUAGES: Record<AppLanguage, LanguageOption> = {
  en: {
    code: 'en',
    name: 'English',
    nativeName: 'English',
    flag: '🇬🇧',
    scriptLabel: 'ABC',
    greeting: 'Hello Explorer!',
    voiceLangCode: 'en-IN',
  },
  hi: {
    code: 'hi',
    name: 'Hindi',
    nativeName: 'हिन्दी',
    flag: '🇮🇳',
    scriptLabel: 'अ',
    greeting: 'नमस्ते नन्हे खोजी!',
    voiceLangCode: 'hi-IN',
  },
  te: {
    code: 'te',
    name: 'Telugu',
    nativeName: 'తెలుగు',
    flag: '🇮🇳',
    scriptLabel: 'తె',
    greeting: 'నమస్కారం అన్వేషకుడా!',
    voiceLangCode: 'te-IN',
  },
  kn: {
    code: 'kn',
    name: 'Kannada',
    nativeName: 'ಕನ್ನಡ',
    flag: '🇮🇳',
    scriptLabel: 'ಕ',
    greeting: 'ನಮಸ್ಕಾರ ಅನ್ವೇಷಕ!',
    voiceLangCode: 'kn-IN',
  },
  ml: {
    code: 'ml',
    name: 'Malayalam',
    nativeName: 'മലയാളം',
    flag: '🇮🇳',
    scriptLabel: 'മ',
    greeting: 'നമസ്കാരം കുട്ടി പര്യവേക്ഷകാ!',
    voiceLangCode: 'ml-IN',
  },
};

export interface TranslationDictionary {
  // Navigation
  navMap: string;
  navChapters: string;
  navSubjects: string;
  navReadLearn: string;
  navShop: string;
  navBadges: string;
  navProgress: string;
  navParents: string;
  navSettings: string;
  switchLanguage: string;
  selectLanguage: string;
  switchClass: string;
  installApp: string;

  // Status & Badges
  onlineMode: string;
  offlineMode: string;
  coins: string;
  streak: string;
  streakFlame: string;
  streakFlameSub: string;
  streakDaysActive: string;
  streakActiveToday: string;
  level: string;
  explorer: string;
  stars: string;
  xp: string;

  // Actions
  play: string;
  startQuiz: string;
  continueBtn: string;
  retry: string;
  nextQuestion: string;
  submitAnswer: string;
  finishQuiz: string;
  viewDetails: string;
  backToDashboard: string;
  seeExplanation: string;
  claimReward: string;

  // Question Screen
  questionOf: string;
  timeLeft: string;
  hints: string;
  needHint: string;
  explanation: string;
  correctAwesome: string;
  incorrectKeepGoing: string;
  scoreSummary: string;
  selectOptionPrompt: string;

  // Dashboard & Learning
  heroSubtitle: string;
  dailyQuests: string;
  dailyGoals: string;
  dailyGoalsSub: string;
  dailyGoalsProgress: string;
  dailyGoalsCompleted: string;
  dailyGoalsClaimBonus: string;
  masterTestTitle: string;
  masterTestSubtitle: string;
  studyBuddyTitle: string;
  hearBuddy: string;
  changeBuddy: string;
  allLevelsAvailable: string;
  dualSituationInfo: string;

  // Login & Registration
  loginTab: string;
  signUpTab: string;
  emailId: string;
  password: string;
  phoneNumber: string;
  childName: string;
  age: string;
  whichClass: string;
  languageSelect: string;
  quickDemoLogin: string;
  exploreAsGuest: string;
  signInBtn: string;
  createAccountBtn: string;
}

export const TRANSLATIONS: Record<AppLanguage, TranslationDictionary> = {
  en: {
    navMap: 'Map',
    navChapters: 'Chapters (25-Q)',
    navSubjects: 'Subjects',
    navReadLearn: 'Read & Learn',
    navShop: 'Shop',
    navBadges: 'Badges',
    navProgress: 'Progress',
    navParents: 'Parents',
    navSettings: 'Settings',
    switchLanguage: 'Language',
    selectLanguage: 'Choose App Language',
    switchClass: 'Switch Class',
    installApp: 'Install App',

    onlineMode: 'Online Mode',
    offlineMode: 'Offline Mode',
    coins: 'Wonder Coins',
    streak: 'Streak',
    streakFlame: 'Streak Flame',
    streakFlameSub: 'Daily Learning Flame',
    streakDaysActive: 'Consecutive Days Active',
    streakActiveToday: 'Active Today!',
    level: 'Level',
    explorer: 'Explorer',
    stars: 'Stars',
    xp: 'XP',

    play: 'Play Now',
    startQuiz: 'Start 25-Question Level',
    continueBtn: 'Continue Journey',
    retry: 'Try Again',
    nextQuestion: 'Next Question',
    submitAnswer: 'Confirm Answer',
    finishQuiz: 'Complete Level',
    viewDetails: 'View Details',
    backToDashboard: 'Back to Dashboard',
    seeExplanation: 'Why is this correct?',
    claimReward: 'Claim Reward',

    questionOf: 'Question',
    timeLeft: 'Sec Remaining',
    hints: 'Buddy Hint',
    needHint: 'Need a hint?',
    explanation: 'Explanation & Concept',
    correctAwesome: 'Brilliant! That is correct!',
    incorrectKeepGoing: 'Almost there! Keep practicing!',
    scoreSummary: 'Level Score Summary',
    selectOptionPrompt: 'Tap on the correct answer to continue',

    heroSubtitle: 'Every answer unlocks new stars, coins, and worlds!',
    dailyQuests: 'Daily Quests & Challenges',
    dailyGoals: 'Daily Goals & Study Plan',
    dailyGoalsSub: 'Personalized targets based on your progress and subject weaknesses',
    dailyGoalsProgress: "Day's Targets Completed",
    dailyGoalsCompleted: 'All Daily Goals Completed! 🎉',
    dailyGoalsClaimBonus: 'Claim Bonus (+100 Coins · +200 XP)',
    masterTestTitle: 'Master Test Milestone (15 Questions)',
    masterTestSubtitle: 'Unlock the next world with a 80% passing grade!',
    studyBuddyTitle: 'Virtual Study Mentor',
    hearBuddy: 'Hear Voice',
    changeBuddy: 'Change Buddy',
    allLevelsAvailable: '100% Playable Offline & Online',
    dualSituationInfo: 'Switch between English, Hindi, Telugu, Kannada and Malayalam anytime!',

    loginTab: 'Log In',
    signUpTab: 'Create Account',
    emailId: 'Email ID',
    password: 'Password',
    phoneNumber: 'Phone Number',
    childName: 'Student / Child Name',
    age: 'Age (Years)',
    whichClass: 'Which Class / Grade',
    languageSelect: 'Choose App Language',
    quickDemoLogin: '1-Click Quick Demo Login',
    exploreAsGuest: 'Explore as Guest',
    signInBtn: 'Sign In to WonderQuest',
    createAccountBtn: 'Register & Start Adventure',
  },

  hi: {
    navMap: 'नक्शा (Map)',
    navChapters: 'अध्याय (25-Q)',
    navSubjects: 'विषय (Subjects)',
    navReadLearn: 'पढ़ें और सीखें',
    navShop: 'दुकान (Shop)',
    navBadges: 'मेडल व बैज',
    navProgress: 'प्रगति (Progress)',
    navParents: 'माता-पिता (Parents)',
    navSettings: 'सेटिंग्स',
    switchLanguage: 'भाषा बदलें (Language)',
    selectLanguage: 'अपनी पसंदीदा भाषा चुनें',
    switchClass: 'कक्षा बदलें (Class)',
    installApp: 'ऐप इंस्टॉल करें',

    onlineMode: 'ऑनलाइन मोड',
    offlineMode: 'ऑफ़लाइन मोड',
    coins: 'वंडर कॉइन्स',
    streak: 'लगातार दिन',
    streakFlame: 'स्ट्रीक फ्लेम',
    streakFlameSub: 'दैनिक ज्ञान की ज्वाला',
    streakDaysActive: 'लगातार सक्रिय दिन',
    streakActiveToday: 'आज सक्रिय!',
    level: 'स्तर (Level)',
    explorer: 'खोजी (Explorer)',
    stars: 'सितारे (Stars)',
    xp: 'अंक (XP)',

    play: 'अभी खेलें',
    startQuiz: '25-प्रश्नों का स्तर शुरू करें',
    continueBtn: 'आगे बढ़ें',
    retry: 'फिर से प्रयास करें',
    nextQuestion: 'अगला प्रश्न',
    submitAnswer: 'उत्तर जमा करें',
    finishQuiz: 'स्तर पूरा करें',
    viewDetails: 'विवरण देखें',
    backToDashboard: 'डैशबोर्ड पर लौटें',
    seeExplanation: 'यह उत्तर सही क्यों है?',
    claimReward: 'इनाम प्राप्त करें',

    questionOf: 'प्रश्न',
    timeLeft: 'सेकंड शेष',
    hints: 'स्टडी बडी संकेत',
    needHint: 'क्या आपको संकेत चाहिए?',
    explanation: 'व्याख्या और सही उत्तर',
    correctAwesome: 'शाबाश! आपका उत्तर बिल्कुल सही है!',
    incorrectKeepGoing: 'कोई बात नहीं! फिर से कोशिश करें!',
    scoreSummary: 'स्तर का परिणाम',
    selectOptionPrompt: 'आगे बढ़ने के लिए सही विकल्प पर टैप करें',

    heroSubtitle: 'हर सही उत्तर से नए सितारे, सिक्के और रोमांचक दुनिया खुलती हैं!',
    dailyQuests: 'दैनिक चुनौतियां व टास्क',
    dailyGoals: 'दैनिक लक्ष्य व अध्ययन योजना',
    dailyGoalsSub: 'आपकी प्रगति व कमज़ोर विषयों पर आधारित व्यक्तिगत लक्ष्य',
    dailyGoalsProgress: 'आज के लक्ष्य पूरे हुए',
    dailyGoalsCompleted: 'आज के सभी लक्ष्य पूरे हुए! 🎉',
    dailyGoalsClaimBonus: 'बोनस प्राप्त करें (+100 सिक्के · +200 XP)',
    masterTestTitle: 'मास्टर टेस्ट (15 प्रश्न)',
    masterTestSubtitle: 'अगली जादुई दुनिया खोलने के लिए 80% अंक लाएं!',
    studyBuddyTitle: 'आपका वर्चुअल स्टडी मेंटर',
    hearBuddy: 'आवाज़ सुनें',
    changeBuddy: 'दोस्त बदलें',
    allLevelsAvailable: '100% ऑनलाइन व ऑफ़लाइन उपलब्ध',
    dualSituationInfo: 'जब चाहें तब हिन्दी, इंग्लिश, तेलुगु, कन्नड़ या मलयालम में बदलें!',

    loginTab: 'लॉग इन',
    signUpTab: 'नया खाता बनाएं',
    emailId: 'ईमेल आईडी',
    password: 'पासवर्ड',
    phoneNumber: 'फ़ोन नंबर',
    childName: 'विद्यार्थी / बच्चे का नाम',
    age: 'आयु (उम्र)',
    whichClass: 'कौन सी कक्षा (कक्षा चयन)',
    languageSelect: 'ऐप की भाषा चुनें',
    quickDemoLogin: '1-क्लिक त्वरित डेमो लॉगिन',
    exploreAsGuest: 'गेस्ट के रूप में खेलें',
    signInBtn: 'वंडरक्वेस्ट में साइन इन करें',
    createAccountBtn: 'रजिस्टर करें और शुरू करें',
  },

  te: {
    navMap: 'మ్యాప్ (Map)',
    navChapters: 'అధ్యాయాలు (25-Q)',
    navSubjects: 'విషయాలు (Subjects)',
    navReadLearn: 'చదవండి & నేర్చుకోండి',
    navShop: 'షాప్ (Shop)',
    navBadges: 'పతకాలు (Badges)',
    navProgress: 'పురోగతి (Progress)',
    navParents: 'తల్లిదండ్రులు (Parents)',
    navSettings: 'సెట్టింగ్‌లు',
    switchLanguage: 'భాష మార్చండి (Language)',
    selectLanguage: 'మీ భాషను ఎంచుకోండి',
    switchClass: 'తరగతి మార్చండి (Class)',
    installApp: 'యాప్ ఇన్‌స్టాల్ చేయండి',

    onlineMode: 'ఆన్‌లైన్ మోడ్',
    offlineMode: 'ఆఫ్‌లైన్ మోడ్',
    coins: 'వండర్ కాయిన్స్',
    streak: 'వరుస రోజులు',
    streakFlame: 'స్ట్రీక్ జ్వాల',
    streakFlameSub: 'రోజువారీ అభ్యాస జ్వాల',
    streakDaysActive: 'వరుసగా యాక్టివ్ రోజులు',
    streakActiveToday: 'ఈరోజు యాక్టివ్!',
    level: 'స్థాయి (Level)',
    explorer: 'అన్వేషకుడు (Explorer)',
    stars: 'నక్షత్రాలు (Stars)',
    xp: 'పాయింట్లు (XP)',

    play: 'ఇప్పుడే ఆడండి',
    startQuiz: '25-ప్రశ్నల స్థాయిని ప్రారంభించండి',
    continueBtn: 'ముందుకు సాగండి',
    retry: 'మళ్ళీ ప్రయత్నించండి',
    nextQuestion: 'తరువాతి ప్రశ్న',
    submitAnswer: 'సమాధానం ధృవీకరించండి',
    finishQuiz: 'స్థాయి పూర్తి చేయండి',
    viewDetails: 'వివరాలు చూడండి',
    backToDashboard: 'డ్యాష్‌బోర్డ్‌కు వెళ్ళండి',
    seeExplanation: 'ఇది ఎందుకు సరైనది?',
    claimReward: 'బహుమతి తీసుకోండి',

    questionOf: 'ప్రశ్న',
    timeLeft: 'సెకన్లు మిగిలి ఉన్నాయి',
    hints: 'స్నేహితుడి సూచన (Hint)',
    needHint: 'సూచన కావాలా?',
    explanation: 'వివరణ & కాన్సెప్ట్',
    correctAwesome: 'అద్భుతం! మీ సమాధానం సరైనది!',
    incorrectKeepGoing: 'పర్వాలేదు! మళ్ళీ ప్రయత్నించండి!',
    scoreSummary: 'స్థాయి ఫలితాలు',
    selectOptionPrompt: 'ముందుకు సాగడానికి సరైన ఎంపికను నొక్కండి',

    heroSubtitle: 'ప్రతి సరైన సమాధానం కొత్త నక్షత్రాలు మరియు నాణేలను అన్‌లాక్ చేస్తుంది!',
    dailyQuests: 'రోజువారీ సవాళ్లు',
    dailyGoals: 'రోజువారీ లక్ష్యాలు & అధ్యయన ప్రణాళిక',
    dailyGoalsSub: 'మీ పురోగతి మరియు బలహీనమైన అంశాల ఆధారంగా వ్యక్తిగతీకరించిన ప్రణాళిక',
    dailyGoalsProgress: 'ఈ రోజు లక్ష్యాలు పూర్తయ్యాయి',
    dailyGoalsCompleted: 'అన్ని రోజువారీ లక్ష్యాలు పూర్తయ్యాయి! 🎉',
    dailyGoalsClaimBonus: 'బోనస్ పొందండి (+100 నాణేలు · +200 XP)',
    masterTestTitle: 'మాస్టర్ టెస్ట్ (15 ప్రశ్నలు)',
    masterTestSubtitle: 'తదుపరి ప్రపంచాన్ని అన్‌లాక్ చేయడానికి 80% స్కోర్ చేయండి!',
    studyBuddyTitle: 'వర్చువల్ స్టడీ మెంటార్',
    hearBuddy: 'వాయిస్ వినండి',
    changeBuddy: 'స్నేహితుడిని మార్చండి',
    allLevelsAvailable: '100% ఆఫ్‌లైన్ & ఆన్‌లైన్ పని చేస్తుంది',
    dualSituationInfo: 'మీకు ఇష్టమైనప్పుడు తెలుగు, ఇంగ్లీష్, హిందీ, కన్నడ, మలయాళంలోకి మారండి!',

    loginTab: 'లాగిన్',
    signUpTab: 'ఖాతా సృష్టించండి',
    emailId: 'ఈమెయిల్ ఐడి',
    password: 'పాస్‌వర్డ్',
    phoneNumber: 'ఫోన్ నంబర్',
    childName: 'విద్యార్థి / పిల్లల పేరు',
    age: 'వయస్సు (సంవత్సరాలు)',
    whichClass: 'ఏ తరగతి (తరగతి ఎంపిక)',
    languageSelect: 'యాప్ భాషను ఎంచుకోండి',
    quickDemoLogin: '1-క్లిక్ త్వరిత డెమో లాగిన్',
    exploreAsGuest: 'అతిథిగా అన్వేషించండి',
    signInBtn: 'సైన్ ఇన్ చేయండి',
    createAccountBtn: 'నమోదు చేసుకోండి & ప్రారంభించండి',
  },

  kn: {
    navMap: 'ನಕ್ಷೆ (Map)',
    navChapters: 'ಅಧ್ಯಾಯಗಳು (25-Q)',
    navSubjects: 'ವಿಷಯಗಳು (Subjects)',
    navReadLearn: 'ಓದಿ ಮತ್ತು ಕಲಿಯಿರಿ',
    navShop: 'ಅಂಗಡಿ (Shop)',
    navBadges: 'ಬ್ಯಾಡ್ಜ್‌ಗಳು (Badges)',
    navProgress: 'ಪ್ರಗತಿ (Progress)',
    navParents: 'ಪೋಷಕರು (Parents)',
    navSettings: 'ಸೆಟ್ಟಿಂಗ್‌ಗಳು',
    switchLanguage: 'ಭಾಷೆ ಬದಲಿಸಿ (Language)',
    selectLanguage: 'ನಿಮ್ಮ ಭಾಷೆಯನ್ನು ಆಯ್ಕೆಮಾಡಿ',
    switchClass: 'ತರಗತಿ ಬದಲಿಸಿ (Class)',
    installApp: 'ಆ್ಯಪ್ ಇನ್‌ಸ್ಟಾಲ್ ಮಾಡಿ',

    onlineMode: 'ಆನ್‌ಲೈನ್ ಮೋಡ್',
    offlineMode: 'ಆಫ್‌ಲೈನ್ ಮೋಡ್',
    coins: 'ವಂಡರ್ ನಾಣ್ಯಗಳು',
    streak: 'ನಿರಂತರ ದಿನಗಳು',
    streakFlame: 'ಸರಣಿ ಜ್ವಾಲೆ',
    streakFlameSub: 'ದೈನಂದಿನ ಕಲಿಕೆಯ ಜ್ವಾಲೆ',
    streakDaysActive: 'ಸತತವಾಗಿ ಸಕ್ರಿಯ ದಿನಗಳು',
    streakActiveToday: 'ಇಂದು ಸಕ್ರಿಯ!',
    level: 'ಹಂತ (Level)',
    explorer: 'ಅನ್ವೇಷಕ (Explorer)',
    stars: 'ನಕ್ಷತ್ರಗಳು (Stars)',
    xp: 'ಅಂಕಗಳು (XP)',

    play: 'ಈಗ ಆಟವಾಡಿ',
    startQuiz: '25-ಪ್ರಶ್ನೆಗಳ ಹಂತ ಪ್ರಾರಂಭಿಸಿ',
    continueBtn: 'ಮುಂದುವರಿಯಿರಿ',
    retry: 'ಮತ್ತೆ ಪ್ರಯತ್ನಿಸಿ',
    nextQuestion: 'ಮುಂದಿನ ಪ್ರಶ್ನೆ',
    submitAnswer: 'ಉತ್ತರ ಖಚಿತಪಡಿಸಿ',
    finishQuiz: 'ಹಂತ ಪೂರ್ಣಗೊಳಿಸಿ',
    viewDetails: 'ವಿವರಗಳನ್ನು ನೋಡಿ',
    backToDashboard: 'ಡ್ಯಾಶ್‌ಬೋರ್ಡ್‌ಗೆ ಹಿಂತಿರುಗಿ',
    seeExplanation: 'ಇದು ಏಕೆ ಸರಿಯಾಗಿದೆ?',
    claimReward: 'ಬಹುಮಾನ ಪಡೆಯಿರಿ',

    questionOf: 'ಪ್ರಶ್ನೆ',
    timeLeft: 'ಸೆಕೆಂಡುಗಳು ಬಾಕಿ ಇವೆ',
    hints: 'ಸ್ಟಡಿ ಬಡ್ಡಿ ಸುಳಿವು (Hint)',
    needHint: 'ಸುಳಿವು ಬೇಕೇ?',
    explanation: 'ವಿವರಣೆ ಮತ್ತು ಪರಿಕಲ್ಪನೆ',
    correctAwesome: 'ಅದ್ಭುತ! ನಿಮ್ಮ ಉತ್ತರ ಸರಿಯಾಗಿದೆ!',
    incorrectKeepGoing: 'ಚಿಂತಿಸಬೇಡಿ! ಮತ್ತೆ ಪ್ರಯತ್ನಿಸಿ!',
    scoreSummary: 'ಹಂತದ ಫಲಿತಾಂಶ',
    selectOptionPrompt: 'ಮುಂದುವರಿಯಲು ಸರಿಯಾದ ಆಯ್ಕೆಯನ್ನು ಸ್ಪರ್ಶಿಸಿ',

    heroSubtitle: 'ಪ್ರತಿ ಸರಿಯಾದ ಉತ್ತರವು ಹೊಸ ನಕ್ಷತ್ರಗಳು ಮತ್ತು ನಾಣ್ಯಗಳನ್ನು ನೀಡುತ್ತದೆ!',
    dailyQuests: 'ದೈನಂದಿನ ಸವಾಲುಗಳು',
    dailyGoals: 'ದೈನಂದಿನ ಗುರಿಗಳು ಮತ್ತು ಅಧ್ಯಯನ ಯೋಜನೆ',
    dailyGoalsSub: 'ನಿಮ್ಮ ಪ್ರಗತಿ ಮತ್ತು ದುರ್ಬಲ ವಿಷಯಗಳ ಆಧಾರದ ಮೇಲೆ ವೈಯಕ್ತಿಕಗೊಳಿಸಿದ ಯೋಜನೆ',
    dailyGoalsProgress: 'ಇಂದಿನ ಗುರಿಗಳು ಪೂರ್ಣಗೊಂಡಿವೆ',
    dailyGoalsCompleted: 'ಎಲ್ಲಾ ದೈನಂದಿನ ಗುರಿಗಳು ಪೂರ್ಣಗೊಂಡಿವೆ! 🎉',
    dailyGoalsClaimBonus: 'ಬೋನಸ್ ಪಡೆಯಿರಿ (+100 ನಾಣ್ಯಗಳು · +200 XP)',
    masterTestTitle: 'ಮಾಸ್ಟರ್ ಪರೀಕ್ಷೆ (15 ಪ್ರಶ್ನೆಗಳು)',
    masterTestSubtitle: 'ಮುಂದಿನ ಜಗತ್ತನ್ನು ಅನ್‌ಲಾಕ್ ಮಾಡಲು 80% ಅಂಕಗಳನ್ನು ಪಡೆಯಿರಿ!',
    studyBuddyTitle: 'ವರ್ಚುವಲ್ ಸ್ಟಡಿ ಮೆಂಟರ್',
    hearBuddy: 'ಧ್ವನಿ ಕೇಳಿ',
    changeBuddy: 'ಸ್ನೇಹಿತನನ್ನು ಬದಲಾಯಿಸಿ',
    allLevelsAvailable: '100% ಆಫ್‌ಲೈನ್ ಮತ್ತು ಆನ್‌ಲೈನ್‌ನಲ್ಲಿ ಲಭ್ಯ',
    dualSituationInfo: 'ಯಾವಾಗ ಬೇಕಾದರೂ ಕನ್ನಡ, ಇಂಗ್ಲಿಷ್, ಹಿಂದಿ, ತೆಲುಗು ಅಥವಾ ಮಲಯಾಳಂಗೆ ಬದಲಾಯಿಸಿ!',

    loginTab: 'ಲಾಗಿನ್',
    signUpTab: 'ಖಾತೆ ರಚಿಸಿ',
    emailId: 'ಇಮೇಲ್ ಐಡಿ',
    password: 'ಪಾಸ್‌ವರ್ಡ್',
    phoneNumber: 'ಫೋನ್ ಸಂಖ್ಯೆ',
    childName: 'ವಿದ್ಯಾರ್ಥಿ / ಮಗುವಿನ ಹೆಸರು',
    age: 'ವಯಸ್ಸು (ವರ್ಷಗಳು)',
    whichClass: 'ಯಾವ ತರಗತಿ (ತರಗತಿ ಆಯ್ಕೆ)',
    languageSelect: 'ಆ್ಯಪ್ ಭಾಷೆಯನ್ನು ಆಯ್ಕೆಮಾಡಿ',
    quickDemoLogin: '1-ಕ್ಲಿಕ್ ತ್ವರಿತ ಡೆಮೊ ಲಾಗಿನ್',
    exploreAsGuest: 'ಅತಿಥಿಯಾಗಿ ಅನ್ವೇಷಿಸಿ',
    signInBtn: 'ಸೈನ್ ಇನ್ ಮಾಡಿ',
    createAccountBtn: 'ನೋಂದಾಯಿಸಿ & ಪ್ರಾರಂಭಿಸಿ',
  },

  ml: {
    navMap: 'മാപ്പ് (Map)',
    navChapters: 'അധ്യായങ്ങൾ (25-Q)',
    navSubjects: 'വിഷയങ്ങൾ (Subjects)',
    navReadLearn: 'വായിക്കൂ പഠിക്കൂ',
    navShop: 'ഷോപ്പ് (Shop)',
    navBadges: 'ബാഡ്ജുകൾ (Badges)',
    navProgress: 'പുരോഗതി (Progress)',
    navParents: 'രക്ഷിതാക്കൾ (Parents)',
    navSettings: 'ക്രമീകരണങ്ങൾ',
    switchLanguage: 'ഭാഷ മാറ്റുക (Language)',
    selectLanguage: 'നിങ്ങളുടെ ഭാഷ തിരഞ്ഞെടുക്കുക',
    switchClass: 'ക്ലാസ്സ് മാറ്റുക (Class)',
    installApp: 'ആപ്പ് ഇൻസ്റ്റാൾ ചെയ്യുക',

    onlineMode: 'ഓൺലൈൻ മോഡ്',
    offlineMode: 'ഓഫ്‌ലൈൻ മോഡ്',
    coins: 'വണ്ടർ കോയിനുകൾ',
    streak: 'തുടർച്ചയായ ദിവസങ്ങൾ',
    streakFlame: 'സ്ട്രീക്ക് ജ്വാല',
    streakFlameSub: 'പ്രതിദിന പഠന ജ്വാല',
    streakDaysActive: 'തുടർച്ചയായി സജീവമായ ദിവസങ്ങൾ',
    streakActiveToday: 'ഇന്ന് സജീവം!',
    level: 'ലെവൽ (Level)',
    explorer: 'പര്യവേക്ഷകൻ (Explorer)',
    stars: 'നക്ഷത്രങ്ങൾ (Stars)',
    xp: 'പോയിന്റുകൾ (XP)',

    play: 'ഇപ്പോൾ കളിക്കാം',
    startQuiz: '25-ചോദ്യ ലെവൽ ആരംഭിക്കുക',
    continueBtn: 'തുടരുക',
    retry: 'വീണ്ടും ശ്രമിക്കുക',
    nextQuestion: 'അടുത്ത ചോദ്യം',
    submitAnswer: 'ഉത്തരം നൽകുക',
    finishQuiz: 'ലെവൽ പൂർത്തിയാക്കുക',
    viewDetails: 'വിവരങ്ങൾ കാണുക',
    backToDashboard: 'ഡാഷ്‌ബോർഡിലേക്ക് മടങ്ങുക',
    seeExplanation: 'എന്തുകൊണ്ട് ഈ ഉത്തരം ശരിയാണ്?',
    claimReward: 'സമ്മാനം നേടുക',

    questionOf: 'ചോദ്യം',
    timeLeft: 'സെക്കന്റുകൾ ബാക്കി',
    hints: 'സഹായ സൂചന (Hint)',
    needHint: 'സൂചന ആവശ്യമുണ്ടോ?',
    explanation: 'വിശദീകരണവും വിവരങ്ങളും',
    correctAwesome: 'ഗംഭീരം! ഉത്തരം തികച്ചും ശരിയാണ്!',
    incorrectKeepGoing: 'സാരമില്ല! വീണ്ടും ശ്രമിക്കൂ!',
    scoreSummary: 'ലെവൽ സ്കോർ സംഗ്രഹം',
    selectOptionPrompt: 'തുടരാൻ ശരിയായ ഉത്തരം തിരഞ്ഞെടുക്കുക',

    heroSubtitle: 'ഓരോ ശരിയുത്തരവും പുതിയ നಕ್ಷത്രങ്ങളും നാണയങ്ങളും നൽകുന്നു!',
    dailyQuests: 'പ്രതിദിന വെല്ലുവിളികൾ',
    dailyGoals: 'പ്രതിദിന ലക്ഷ്യങ്ങളും പഠന പദ്ധതിയും',
    dailyGoalsSub: 'നിങ്ങളുടെ പുരോഗതിയും ദുർബല വിഷയങ്ങളും അടിസ്ഥാനമാക്കിയുള്ള വ്യക്തിഗത പദ്ധതി',
    dailyGoalsProgress: 'ഇന്നത്തെ ലക്ഷ്യങ്ങൾ പൂർത്തിയായി',
    dailyGoalsCompleted: 'എല്ലാ പ്രതിദിന ലക്ഷ്യങ്ങളും പൂർത്തിയായി! 🎉',
    dailyGoalsClaimBonus: 'ബോണസ് നേടൂ (+100 നാണയങ്ങൾ · +200 XP)',
    masterTestTitle: 'മാസ്റ്റർ ടെസ്റ്റ് (15 ചോദ്യങ്ങൾ)',
    masterTestSubtitle: 'അടുത്ത ലോകം തുറക്കാൻ 80% മാർക്ക് നേടുക!',
    studyBuddyTitle: 'വെർച്വൽ സ്റ്റഡി മെന്റർ',
    hearBuddy: 'ശബ്ദം കേൾക്കൂ',
    changeBuddy: 'സുഹൃത്തിനെ മാറ്റുക',
    allLevelsAvailable: '100% ഓഫ്‌ലൈനിലും ഓൺലൈനിലും ലഭ്യമാണ്',
    dualSituationInfo: 'എപ്പോൾ വേണമെങ്കിലും മലയാളം, ഇംഗ്ലീഷ്, ഹിന്ദി, തെലുങ്ക് അല്ലെങ്കിൽ കന്നഡയിലേക്ക് മാറ്റാം!',

    loginTab: 'ലോഗിൻ',
    signUpTab: 'അക്കൗണ്ട് ഉണ്ടാക്കുക',
    emailId: 'ഇമെയിൽ ഐഡി',
    password: 'പാസ്‌വേഡ്',
    phoneNumber: 'ഫോൺ നമ്പർ',
    childName: 'വിദ്യാർത്ഥിയുടെ / കുട്ടിയുടെ പേര്',
    age: 'പ്രായം (വയസ്സ്)',
    whichClass: 'ഏത് ക്ലാസ് (ക്ലാസ് തിരഞ്ഞെടുക്കുക)',
    languageSelect: 'ആപ്പ് ഭാഷ തിരഞ്ഞെടുക്കുക',
    quickDemoLogin: '1-ക്ലിക്ക് ഡെമോ ലോഗിൻ',
    exploreAsGuest: 'ഗസ്റ്റായി തുടരുക',
    signInBtn: 'സൈൻ ഇൻ ചെയ്യുക',
    createAccountBtn: 'രജിസ്റ്റർ ചെയ്ത് തുടങ്ങാം',
  },
};

export function getTranslation(lang: AppLanguage = 'en'): TranslationDictionary {
  return TRANSLATIONS[lang] || TRANSLATIONS.en;
}
