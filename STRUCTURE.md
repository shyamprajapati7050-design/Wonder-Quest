# 📁 WonderQuest: Full-Stack Architecture & Data Storage Guide

## 1. Data Store Kaha Hoga? (Where is User Data Stored?)

### 🚀 10,000 Maximum User Capability Architecture
Platform ko **10,000 concurrent learners (10k user capacity)** handle karne ke liye optimize kiya gaya hai:
- **Max User Capacity**: `10,000 Users` (Dedicated concurrency tier)
- **Peak Request Throughput**: `600,000 Requests/min` (10,000 req/sec peak capability)
- **Write-Back Debounce Buffer**: `1,200ms - 1,500ms` debounce batching (prevents 10k users from causing write contention in Firestore)
- **Hot Cache TTL**: `300s` in-memory query cache for curricula, subjects, and study buddy hints
- **Rate Limit Guard**: `120 req/min per user`
- **Database Engine**: Google Cloud Firestore Enterprise Auto-Scaling (`ai-studio-wonderquestkidse-428a50dd-fe91-4e2f-abe4-55a03559aed9`)
- **Backend Concurrency Headers**: `X-Max-User-Capacity: 10000`, `Keep-Alive: timeout=30, max=10000`

---

### 🌐 Online & Offline Dual-Mode Architecture (ऑनलाइन और ऑफ़लाइन दोनों स्थितियों में समर्थन)
App ko online aur offline dono situations me 100% seamlessly chalane ke liye 4 layers implement ki gayi hain:

1. **PWA Service Worker & Asset Precaching (`vite-plugin-pwa` + Workbox)**:
   - Application scripts, stylesheets, Google Fonts (`Fredoka`, `Plus Jakarta Sans`, `JetBrains Mono`), aur icons device memory me precached hain.
   - PWA Manifest standard: standalone display mode, 192px/512px icons, apple-touch-icon.
   - Users browser URL bar ke bina direct home screen se install karke fullscreen app chala sakte hain.

2. **Zero-Network Client Engine**:
   - Sabhi 100+ Levels, exactly 25-Question quizzes, Master Tests, aur Read & Learn lessons client-side bundled hain.
   - Web Audio Sound Synthesizer (`src/utils/audio.ts`) pure math frequencies & oscillator nodes se sound generate karta hai, isliye sounds play karne ke liye kisi external audio file download ki zaroorat nahi hai.

3. **Firestore Persistent Local Cache (IndexedDB)**:
   - Firestore SDK me `persistentLocalCache` aur `persistentMultipleTabManager` enabled hai.
   - Offline hone par sabhi writes (progress, level completion, coins, star rewards) browser ke IndexedDB me save hote hain.
   - Jaise hi device internet se reconnect hota hai, sabhi offline transactions background me **Google Cloud Firestore** ke saath automatically synchronize ho jate hain.

4. **Live Connectivity Detection & Install Flow**:
   - `useOnlineStatus` hook live network status (`navigator.onLine`, `window.online`, `window.offline`) monitor karta hai.
   - `OfflineIndicator`: Network disconnect hone par non-intrusive banner dikhata hai ki sabhi games offline chal rahe hain, aur restore hone par green confirmation banner dikhata hai.
   - `PWAInstallButton`: Android, Chrome, Edge, aur iOS Safari ke liye custom in-app 1-click install prompt provide karta hai.

---

### 🇮🇳 5-Language Multilingual System (हिन्दी, English, తెలుగు, ಕನ್ನಡ, മലയാളം)
Bachha jab chahe tab kisi bhi language me switch kar sakta hai:
1. **5 Supported Indian Languages**:
   - **English** (`en`, voice: `en-IN`): International & CBSE curricula
   - **Hindi** (`hi`, voice: `hi-IN`): हिन्दी भाषी छात्र
   - **Telugu** (`te`, voice: `te-IN`): ఆంధ్రప్రదేశ్ & తెలంగాణ విద్యార్థులు
   - **Kannada** (`kn`, voice: `kn-IN`): ಕರ್ನಾಟಕ ವಿದ್ಯಾರ್ಥಿಗಳು
   - **Malayalam** (`ml`, voice: `ml-IN`): കേരളത്തിലെ വിദ്യാർത്ഥികൾ

2. **Anytime Switch Availability**:
   - **Navbar Quick-Pill**: Header me 1-click 🌐 button hamesha visible rehta hai.
   - **Mid-Quiz Switch**: Question Screen me play karte waqt bina progress lose kiye language badal sakte hain.
   - **Home Dashboard Showcase**: Quick toggle chips for each language.
   - **Settings Screen**: Persistent preference selection.

3. **Regional Voice Pronunciation (Text-to-Speech)**:
   - Browser Web Speech API me regional voice selection (`hi-IN`, `te-IN`, `kn-IN`, `ml-IN`, `en-IN`) integrate hai, jisse Study Buddies (Pip the Owl, Nova the Fox) usi bhasha me greeting aur audio padh kar sunate hain.

4. **Persistence**:
   - Selected language preference `localStorage` (offline) aur `/users/{userId}` / `children` document (cloud Firestore) me save rehti hai.

---

Jab user apna **Email, Password, aur Age** enter karke Sign Up karta hai:

1. **Authentication Layer**: 
   - **Google Firebase Authentication** me user register hota hai.
   - User ka password client ya server par plain text me kabhi nahi rehta; Firebase secure one-way cryptographic hashing (bcrypt/argon2) use karta hai.

2. **Database Layer (Persistent Storage)**:
   - User profile aur progress **Google Cloud Firestore Database** (Enterprise NoSQL Database) me store hoti hai.
   - **Database ID**: `ai-studio-wonderquestkidse-428a50dd-fe91-4e2f-abe4-55a03559aed9`
   - **GCP Project ID**: `gen-lang-client-0524975703`

### Data Storage Collections:
- **`📁 /users/{userId}`** (Initialized via `initializeUserProfile`):
  - `id`: Firebase Auth User UID (`string`)
  - **`email`**: User login/verified email address (`string`)
  - **`age`**: User age (`number`, e.g. 10)
  - **`gradeLevel`**: Academic grade level (`string`, e.g. `class_5`, `nursery` to `class_12`)
  - **`progress`**: Object tracking learning journey:
    - `currentLevel`: Current story map challenge level (`number`)
    - `currentWorld`: World map identifier (`number`)
    - `xp`: Total experience points (`number`)
    - `coins`: Wonder Coins balance (`number`)
    - `stars`: Star achievements (`number`)
    - `streakDays`: Consecutive active days (`number`)
    - `completedLevels`: List of completed level IDs (`number[]`)
    - `activeStudyBuddy`: Virtual mentor ID (`string`, e.g. `owl_pip`)
    - `lastPlayedDate`: Last play session timestamp (`string`)
  - `displayName`: User ka naam / nickname (`string`)
  - `role`: `'parent' | 'student' | 'teacher' | 'admin'` (`string`)
  - `createdAt` & `updatedAt`: Server timestamp ISO strings
- **`📁 /users/{userId}/children/{childId}`**:
  - `id`: Child learner profile identifier
  - `userId`: Parent user UID
  - `name`: Child profile name
  - `age`: Learner age & `ageGroup` ('3-5' | '6-8' | '9-11' | '12-14' | '15-16' | '17-18')
  - `gradeLevel`: Nursery se Class 12
  - `avatar`: Emoji / custom badge
  - `activeStudyBuddy`: Pip the Owl / Nova the Fox / Barnaby the Bear / Sparky / Kira
  - `currentLevel` & `currentWorld`: Story progression state
  - `xp`, `coins`, `stars`, `streakDays`: Gamification rewards and balance
  - `weakTopics`: Adaptive learning topic diagnostics
- **Security Rules (ABAC)**:
  - `firestore.rules` me zero-trust attribute access rules deployed hain (`request.auth.uid == userId`). Sirf authenticated owner hi apna data padh ya update kar sakta hai.

---

## 2. Complete File Structure (Frontend & Backend 1-to-1 Flow)

```
wonderquest/
├── firebase-applet-config.json     # Provisioned Firebase SDK credentials
├── firebase-blueprint.json        # Intermediate Representation schema (User & Child entities)
├── firestore.rules                # Deployed Zero-Trust Firestore Security Rules
├── STRUCTURE.md                   # Complete architectural documentation
├── index.html                     # HTML5 entry point with meta tags & Google fonts
├── metadata.json                  # AI Studio applet configuration & capabilities
├── package.json                   # Dependencies (React 19, Firebase 12, Express, Tailwind CSS)
├── tsconfig.json                  # TypeScript bundler compiler configuration
├── vite.config.ts                 # Vite frontend build pipeline
│
├── 🖥️ server/                      # BACKEND (Express / Node.js)
│   ├── server.ts                  # Backend server entry point & API route mounting
│   ├── routes/
│   │   ├── auth.routes.ts         # User auth & profile verification proxy routes
│   │   ├── buddies.routes.ts      # Study Buddy contextual AI hint routes
│   │   └── quiz.routes.ts         # 25-Question quiz submission & scoring routes
│   ├── controllers/
│   │   ├── buddies.controller.ts  # Hint generation & speech voice logic
│   │   └── quiz.controller.ts     # XP, coin calculation, and streak tracking
│   ├── services/
│   │   └── scoring.service.ts     # Mastery calculation & weak topic identification
│   └── types/
│       └── api.types.ts           # Shared 1-to-1 Request & Response interfaces
│
└── 🎨 src/                         # FRONTEND (React 19 + TypeScript + Tailwind)
    ├── main.tsx                   # React root hydration
    ├── App.tsx                    # App coordinator & screen view router
    ├── index.css                  # Tailwind styles & Study Buddy vector animations
    │
    ├── services/                  # Cloud & API Integration
    │   ├── auth.ts                # Firebase Auth sign-up, sign-in, sign-out & Firestore user doc creation
    │   ├── firebase.ts            # Firebase SDK setup, client instances, and OperationType error handlers
    │   └── apiClient.ts           # 1-to-1 REST client connecting frontend to backend
    │
    ├── context/
    │   ├── GlobalLanguageContext.tsx  # Dynamic 5-language provider (English, Hindi, Telugu, Kannada, Malayalam)
    │   └── GameContext.tsx            # Global state (Child, Levels, Coins, Buddy, Firebase Auth sync)
    │
    ├── data/
    │   └── languages.ts               # Translation dictionaries & regional voice metadata
    │
    ├── components/                # Interactive UI Components
    │   ├── Navbar.tsx             # 3-Zone navigation with Cloud Sync, Coins, Streak & Buddy
    │   ├── AuthModal.tsx          # Cloud Sign Up (Email, Password, Age), Sign In & Storage viewer
    │   ├── FloatingStudyBuddy.tsx # Floating animated mentor with audio hints & navigation cues
    │   ├── BuddyAvatar.tsx        # Vector animated SVG characters (waving, celebrate spin, talking)
    │   ├── BuddySelectorModal.tsx # 5-Character mentor selection with TTS voice preview
    │   └── ParentPinModal.tsx     # 4-Digit PIN modal for parental controls
    │
    ├── screens/                   # Application Views
    │   ├── SplashScreen.tsx       # Landing & hero entry screen
    │   ├── WelcomeOnboarding.tsx  # Initial onboarding workflow
    │   ├── ChildProfileSelect.tsx # Explorer profile management & grade assignment
    │   ├── AgeSelectionScreen.tsx # Nursery to Class 12 curriculum switcher
    │   ├── HomeDashboard.tsx      # Main dashboard with Cloud Database Card & Buddy spotlight
    │   ├── LevelMapScreen.tsx     # World adventure map with level nodes
    │   ├── LevelDetailsModal.tsx  # Level objectives & reward preview modal
    │   ├── QuestionScreen.tsx     # 25-Question timed challenge interface
    │   ├── LevelResultScreen.tsx  # Score summary, confetti, badge unlock celebrations
    │   ├── ReadAndLearnScreen.tsx # Interactive concept lessons with floating Study Buddy
    │   ├── MasterTestScreen.tsx   # 15-Question milestone certification test
    │   ├── MasterTestResultScreen.tsx # Master test scoring & certificate screen
    │   ├── SubjectsScreen.tsx     # Deep-dive browser across all 8 subjects
    │   ├── AchievementsScreen.tsx # Trophies, badges, and milestone showcase
    │   ├── RewardsShopScreen.tsx  # Shop for avatars, themes, and parent-approved rewards
    │   ├── ProgressDashboardScreen.tsx # Accuracy, weak topic diagnostics & statistics
    │   ├── ParentDashboardScreen.tsx # Parent control center (screen time, reports, approvals)
    │   ├── SettingsScreen.tsx     # Audio, narration, and accessibility toggles
    │   └── AdminPanelScreen.tsx   # Curriculum management & content creation
    │
    ├── data/                      # Educational Data & Static Resources
    │   ├── buddiesData.ts         # Study Buddies (Pip, Nova, Barnaby, Sparky, Kira)
    │   ├── gradesData.ts          # Nursery to Class 12 syllabus definitions & age mapping
    │   ├── lessonsData.ts         # Interactive Read & Learn modules (sections, vocabulary, checks)
    │   ├── levelsData.ts          # 25-Question progressive levels generator
    │   ├── subjects.ts            # 8 core learning subjects & topic trees
    │   └── shopItems.ts           # Avatars, pets, frames, and real-world reward catalog
    │
    ├── utils/
    │   └── audio.ts               # Web Audio synth + SpeechSynthesis engine for Study Buddies
    │
    └── types/
        └── index.ts               # Complete TypeScript domain contracts
```
