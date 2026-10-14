import { StudyBuddy } from '../types';

export const STUDY_BUDDIES: Record<string, StudyBuddy> = {
  owl_pip: {
    id: 'owl_pip',
    name: 'Pip',
    species: 'Curious Forest Owl',
    title: 'The Curious Scholar',
    personality: 'Thoughtful, calm, and loves uncovering fascinating facts about the world.',
    catchphrase: 'Whoo-whoo! Every question opens a brand-new doorway to discovery!',
    avatarEmoji: '🦉',
    colorTheme: {
      primary: 'bg-indigo-600 text-white',
      light: 'bg-indigo-50 text-indigo-900 border-indigo-200',
      border: 'border-indigo-300',
      badge: 'bg-indigo-100 text-indigo-800',
      glow: 'shadow-indigo-200',
    },
    strengths: ['Reading & Comprehension', 'Natural Sciences', 'Observation Skills'],
    voiceConfig: {
      pitch: 1.05,
      rate: 0.92,
    },
    dialogue: {
      greeting: "Hello, explorer! I'm Pip the Owl. Let's read this lesson together and sharpen our minds!",
      progressEncouragement: "Superb observation! Notice how every piece of knowledge connects to the big picture.",
      celebration: "Whoo-whoo! Look at you soar! You've mastered another milestone!",
      hintLead: "Pip's Wisdom Insight: Pay close attention to the highlighted words. The answer is hidden right in plain sight!",
      nextStepCue: "Ready for the next concept? Turn the page when you feel prepared!",
    },
  },
  fox_nova: {
    id: 'fox_nova',
    name: 'Nova',
    species: 'Cosmic Explorer Fox',
    title: 'The Cosmic Problem Solver',
    personality: 'Energetic, quick-witted, and ready to blast off through numbers and riddles!',
    catchphrase: '3, 2, 1... Blast off! You are orbiting closer to mastery every minute!',
    avatarEmoji: '🦊',
    colorTheme: {
      primary: 'bg-amber-600 text-white',
      light: 'bg-amber-50 text-amber-950 border-amber-200',
      border: 'border-amber-300',
      badge: 'bg-amber-100 text-amber-800',
      glow: 'shadow-amber-200',
    },
    strengths: ['Fast Math', 'Space Science', 'Logic Riddles'],
    voiceConfig: {
      pitch: 1.25,
      rate: 1.02,
    },
    dialogue: {
      greeting: "Cosmic cadet reporting for duty! I'm Nova the Fox. Let's crack this lesson with star-power!",
      progressEncouragement: "High gear activated! You're cruising through this concept with rocket speed!",
      celebration: "Stellar achievement unlocked! That was pure cosmic genius!",
      hintLead: "Nova's Astro-Tip: Break tricky problems into bite-sized meteorite pieces! One step at a time!",
      nextStepCue: "Thrusters ready! Jump to the next section or test your skills in the mini-check!",
    },
  },
  bear_barnaby: {
    id: 'bear_barnaby',
    name: 'Barnaby',
    species: 'Gentle Mountain Bear',
    title: 'The Patient Mentor',
    personality: 'Warm, reassuring, and encourages taking steady breaths and enjoying the journey.',
    catchphrase: 'Take a deep breath and take your time! Learning is a cozy path, and I am right here with you.',
    avatarEmoji: '🐻',
    colorTheme: {
      primary: 'bg-emerald-700 text-white',
      light: 'bg-emerald-50 text-emerald-950 border-emerald-200',
      border: 'border-emerald-300',
      badge: 'bg-emerald-100 text-emerald-800',
      glow: 'shadow-emerald-200',
    },
    strengths: ['Patience & Focus', 'Earth & Life Science', 'Building Confidence'],
    voiceConfig: {
      pitch: 0.88,
      rate: 0.88,
    },
    dialogue: {
      greeting: "Welcome, little explorer. I'm Barnaby the Bear. There's no rush here—let's enjoy learning together.",
      progressEncouragement: "Wonderful patience! You're absorbing every single detail like warm sunshine.",
      celebration: "Big warm bear hug for your great effort! You should be very proud of your persistence.",
      hintLead: "Barnaby's Gentle Hint: Don't worry if it looks tricky at first. Reread the sentences slowly and let the ideas bloom.",
      nextStepCue: "Whenever you feel ready, we can wander over to the next topic together.",
    },
  },
  bot_sparky: {
    id: 'bot_sparky',
    name: 'Sparky',
    species: 'Quantum Helper Droid',
    title: 'The Logic Navigator',
    personality: 'Upbeat, high-tech, and loves breaking down algorithms, computers, and puzzle patterns.',
    catchphrase: 'Beep-boop-cheer! Optimal algorithm detected: Keep learning and powering up your brain!',
    avatarEmoji: '🤖',
    colorTheme: {
      primary: 'bg-cyan-600 text-white',
      light: 'bg-cyan-50 text-cyan-950 border-cyan-200',
      border: 'border-cyan-300',
      badge: 'bg-cyan-100 text-cyan-800',
      glow: 'shadow-cyan-200',
    },
    strengths: ['Computer Science', 'Pattern Recognition', 'Systematic Thinking'],
    voiceConfig: {
      pitch: 1.35,
      rate: 0.98,
    },
    dialogue: {
      greeting: "BEEP-BOOP! System online! I am Sparky your robotic mentor. Ready to process fascinating data?",
      progressEncouragement: "Memory cache updated! Neural pathways firing at 100% efficiency!",
      celebration: "BEEP-WHIRR-HOORAY! Task executed with 100% precision! Super computation!",
      hintLead: "Sparky's Circuit Insight: Look at the pattern! Input leads to process, and process leads to the correct output!",
      nextStepCue: "Next sequence loaded! Execute navigation to the upcoming concept node!",
    },
  },
  dolphin_kira: {
    id: 'dolphin_kira',
    name: 'Kira',
    species: 'Joyful Ocean Dolphin',
    title: 'The Creative Explorer',
    personality: 'Bubbly, musical, and turns every lesson into an imaginative splash of fun!',
    catchphrase: 'Splash into learning! Together we can dive deep and leap over any puzzle wave!',
    avatarEmoji: '🐬',
    colorTheme: {
      primary: 'bg-teal-600 text-white',
      light: 'bg-teal-50 text-teal-950 border-teal-200',
      border: 'border-teal-300',
      badge: 'bg-teal-100 text-teal-800',
      glow: 'shadow-teal-200',
    },
    strengths: ['Creative Writing', 'World Geography', 'Joyful Curiosity'],
    voiceConfig: {
      pitch: 1.18,
      rate: 0.96,
    },
    dialogue: {
      greeting: "Yay, splash! I'm Kira the Dolphin! Are you ready to dive into exciting new ideas today?",
      progressEncouragement: "You're swimming like a champion through these ideas! Beautiful flow!",
      celebration: "High-flying dolphin leap! You just accomplished something truly magnificent!",
      hintLead: "Kira's Coral Clue: Think of this like a puzzle in the ocean. Connect what you already know with what's new!",
      nextStepCue: "Catch the next wave! Head to the next section or test what you've learned!",
    },
  },
};

export const DEFAULT_BUDDY_ID = 'owl_pip';

export const getStudyBuddy = (buddyId?: string): StudyBuddy => {
  if (buddyId && STUDY_BUDDIES[buddyId]) {
    return STUDY_BUDDIES[buddyId];
  }
  return STUDY_BUDDIES[DEFAULT_BUDDY_ID];
};

export const ALL_BUDDIES = Object.values(STUDY_BUDDIES);
