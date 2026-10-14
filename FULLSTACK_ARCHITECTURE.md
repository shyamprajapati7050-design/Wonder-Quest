# 🌐 WonderQuest: Frontend & Backend One-to-One Architecture

This document describes the separation of **Frontend (Client)** and **Backend (Server)** in WonderQuest, detailing the exact 1-to-1 flow for each user interaction and system process.

---

## 1. 🖥️ Frontend File Structure (`/src`)

The client side is built with React 19, TypeScript, and Tailwind CSS. It handles the interactive user interface, local state, animations, Web Audio API synthesis, and Web Speech API (TTS).

```
src/
├── main.tsx                         # React application DOM mount
├── App.tsx                          # App coordinator, screen switching & top-level layout
├── index.css                        # Global styles, Tailwind base & Study Buddy keyframe animations
│
├── components/                      # Reusable UI & interactive widgets
│   ├── Navbar.tsx                   # Top navigation bar (Class badge, Currency, Buddy, Parent portal)
│   ├── FloatingStudyBuddy.tsx       # Floating animated mentor with speech bubbles & navigation cues
│   ├── BuddyAvatar.tsx              # Vector animated SVG characters (waving, celebrate spin, talking)
│   ├── BuddySelectorModal.tsx       # 5 Study Buddies browser with TTS voice preview
│   └── ParentPinModal.tsx           # 4-digit PIN security dialog for parental gates
│
├── screens/                         # View screens & learning game modes
│   ├── SplashScreen.tsx             # Welcome splash with curriculum age introduction
│   ├── WelcomeOnboarding.tsx        # Initial child profile onboarding
│   ├── ChildProfileSelect.tsx       # Explorer profile switcher & class picker
│   ├── AgeSelectionScreen.tsx       # Nursery to 12th Class dual-tab grade browser
│   ├── HomeDashboard.tsx            # Main hub with quest cards, syllabus & mentor spotlight
│   ├── LevelMapScreen.tsx           # World adventure map with progressive level nodes
│   ├── LevelDetailsModal.tsx        # Pre-level objectives & rewards preview modal
│   ├── QuestionScreen.tsx           # 25-Question timed level interactive challenge
│   ├── LevelResultScreen.tsx        # Quiz completion celebration, accuracy breakdown & badges
│   ├── ReadAndLearnScreen.tsx       # Interactive concept modules with Floating Study Buddy
│   ├── MasterTestScreen.tsx         # 15-Question milestone certification test
│   ├── MasterTestResultScreen.tsx   # Official certificate & test diagnostic report
│   ├── SubjectsScreen.tsx           # 8 Subjects topic tree & syllabus preview
│   ├── AchievementsScreen.tsx       # Badges, trophies & unlocked awards gallery
│   ├── RewardsShopScreen.tsx        # In-game cosmetic shop & parent-approved reward claims
│   ├── ProgressDashboardScreen.tsx   # Weak topics diagnostics & accuracy statistics
│   ├── ParentDashboardScreen.tsx   # Parent controls (screen limits, PIN, approvals)
│   ├── SettingsScreen.tsx           # Audio, narration voice & accessibility options
│   └── AdminPanelScreen.tsx         # Custom level designer & question editor
│
├── context/                         # Client state management
│   └── GameContext.tsx              # Central state (profiles, levels, coins, XP, active buddy)
│
├── services/                        # Client API communication layer
│   └── apiClient.ts                 # HTTP calls to backend endpoints (`/api/...`) with offline fallback
│
├── data/                            # Educational content definitions
│   ├── buddiesData.ts               # Study Buddy mentor personalities, catchphrases & voice configs
│   ├── gradesData.ts                # Nursery to 12th Class syllabus metadata & stages
│   ├── lessonsData.ts               # Read & Learn interactive modules with key words & activities
│   ├── levelsData.ts                # 25-Question level engine (MCQ, true/false, match, drag-drop)
│   ├── subjects.ts                  # 8 Core subjects & topic taxonomy
│   └── shopItems.ts                 # Avatars, pets, frames & reward shop catalog
│
├── types/                           # TypeScript interfaces
│   └── index.ts                     # StudyBuddy, Lesson, Question, ChildProfile, GradeLevel
│
└── utils/                           # Audio & speech utilities
    └── audio.ts                     # Web Audio API synthesizers & Web Speech API (TTS)
```

---

## 2. ⚙️ Backend File Structure (`/server` & root)

The server side is built with Node.js and Express. It provides REST API endpoints, business logic validation, quiz grading, and mentor guidance services.

```
wonderquest/
├── server.ts                        # Express server entry point mounting routes & middleware
│
└── server/
    ├── routes/                      # API route definitions
    │   ├── buddy.routes.ts          # Routes: GET /api/buddies/:buddyId/hint
    │   └── quiz.routes.ts           # Routes: POST /api/quiz/submit
    │
    ├── controllers/                 # Request parsing, HTTP status & response serialization
    │   ├── buddy.controller.ts      # Controller for Study Buddy audio hints
    │   └── quiz.controller.ts       # Controller for quiz verification & rewards
    │
    ├── services/                    # Pure business logic & evaluation algorithms
    │   ├── buddy.service.ts         # Mentor voice configuration & hint generation
    │   └── quiz.service.ts          # Score evaluation, coin/XP formula & badge unlocking
    │
    └── types/                       # Backend data contracts & DTOs
        └── api.types.ts             # ApiResponse, BuddyHintRequest/Response, QuizSubmitResult
```

---

## 3. 🔄 One-to-One Flow Architecture (End-to-End Data Flow)

Below is the step-by-step 1-to-1 mapping connecting the Frontend Client to the Backend Server.

### 🔷 Flow 1: Study Buddy Audio Hint Request

```
[Student in ReadAndLearnScreen.tsx]
           │
           ▼
[Clicks "Ask Hint" in FloatingStudyBuddy.tsx]
           │
           ▼ (1. Frontend Service)
[src/services/apiClient.ts -> getBuddyHint(buddyId, lessonId, sectionIndex)]
           │
           ▼ (2. HTTP GET /api/buddies/:buddyId/hint)
[server/routes/buddy.routes.ts]
           │
           ▼ (3. Controller Validation)
[server/controllers/buddy.controller.ts -> getBuddyHint()]
           │
           ▼ (4. Business Logic)
[server/services/buddy.service.ts -> buddyService.getHint()]
           │
           ▼ (5. JSON Response)
{
  "success": true,
  "data": {
    "buddyName": "Pip",
    "speechText": "Hey Leo! Look closely at the key words...",
    "voiceConfig": { "pitch": 1.05, "rate": 0.92 }
  }
}
           │
           ▼ (6. UI & Audio Playback)
[FloatingStudyBuddy.tsx updates speech bubble]
           │
           ▼ (7. Text-To-Speech Execution)
[src/utils/audio.ts -> soundEngine.speakText(speechText, voiceConfig)]
```

---

### 🔷 Flow 2: 25-Question Quiz Verification & Reward Calculation

```
[Student finishes Question 25 in QuestionScreen.tsx]
           │
           ▼ (1. Formulate Submission)
[GameContext.tsx collects 25 user answers & time spent]
           │
           ▼ (2. Frontend Client)
[src/services/apiClient.ts -> submitQuiz({ childId, levelId, answers, timeSpentSeconds })]
           │
           ▼ (3. HTTP POST /api/quiz/submit)
[server/routes/quiz.routes.ts]
           │
           ▼ (4. Controller Execution)
[server/controllers/quiz.controller.ts -> submitQuiz()]
           │
           ▼ (5. Scoring Engine & Anti-Cheat Validation)
[server/services/quiz.service.ts -> evaluateQuiz()]
  - Calculates accuracy percentage
  - Verifies pass threshold (>= 70%)
  - Computes coins & XP rewards
  - Checks milestone achievements (e.g. 100% accuracy -> "Perfectionist" badge)
           │
           ▼ (6. JSON Response)
{
  "success": true,
  "data": {
    "levelId": 1,
    "score": 24,
    "totalQuestions": 25,
    "accuracy": 96,
    "passed": true,
    "rewardCoins": 95,
    "rewardXp": 190,
    "newBadgesEarned": ["speed_demon"]
  }
}
           │
           ▼ (7. Client State Update)
[GameContext.tsx records attempt, awards coins/XP, unlocks next level]
           │
           ▼ (8. Celebration View)
[LevelResultScreen.tsx launches confetti & victory fanfare sound]
```

---

### 🔷 Flow 3: Nursery to Class 12 Curriculum Switching

```
[User clicks Grade Badge in Navbar.tsx or HomeDashboard.tsx]
           │
           ▼
[AgeSelectionScreen.tsx opens with Dual Tabs: "By Class" & "By Age Group"]
           │
           ▼ (Student selects e.g. "Class 10" or "Nursery")
[GameContext.tsx -> setGradeLevel('class_10')]
           │
           ▼
[gradesData.ts maps GradeLevel to AgeGroup, stages, colors, syllabus]
           │
           ▼
[State updates across HomeDashboard, ReadAndLearnScreen & levelsData questions]
```

---

### 🔷 Flow 4: Parent Portal PIN Security Gate

```
[User clicks "Parents" in Navbar.tsx]
           │
           ▼
[GameContext.tsx -> requestParentAction(callback)]
           │
           ▼
[ParentPinModal.tsx renders with 4-Digit PIN pad]
           │
           ▼ (Parent inputs PIN '1234')
[GameContext.tsx -> verifyParentPin(pin)]
           │
     ┌─────┴──────────────┐
  [Correct]            [Incorrect]
     │                    │
     ▼                    ▼
[ParentDashboardScreen] [Friendly error sound & shake animation]
```
