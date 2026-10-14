import { ChildProfile } from '../types';

export interface StreakMilestone {
  days: number;
  title: string;
  hindiTitle: string;
  description: string;
  rewardCoins: number;
  rewardXp: number;
  rewardBadgeId?: string;
  icon: string;
  flameLevel: string;
}

export const STREAK_MILESTONES: StreakMilestone[] = [
  {
    days: 3,
    title: 'Flame Keeper',
    hindiTitle: 'ज्वाला रक्षक (3 दिन)',
    description: 'Maintained 3 consecutive days of curious learning!',
    rewardCoins: 50,
    rewardXp: 100,
    rewardBadgeId: 'streak_3',
    icon: '🔥',
    flameLevel: 'Bronze Ember',
  },
  {
    days: 7,
    title: 'Ignited Mind',
    hindiTitle: 'प्रदीप्त मस्तिष्‍क (7 दिन)',
    description: '1 full week of daily learning! Mind is glowing bright!',
    rewardCoins: 150,
    rewardXp: 300,
    rewardBadgeId: 'streak_7',
    icon: '⚡',
    flameLevel: 'Silver Blaze',
  },
  {
    days: 14,
    title: 'Fortnight Blaze',
    hindiTitle: 'द्विसाप्ताहिक ज्वाला (14 दिन)',
    description: 'Two full weeks unbroken! Supercharged knowledge power!',
    rewardCoins: 350,
    rewardXp: 700,
    rewardBadgeId: 'streak_14',
    icon: '🌟',
    flameLevel: 'Gold Inferno',
  },
  {
    days: 30,
    title: 'Unstoppable Flame',
    hindiTitle: 'अजेय महाज्वाला (30 दिन)',
    description: '1 month legendary streak! A true master of WonderQuest!',
    rewardCoins: 1000,
    rewardXp: 2000,
    rewardBadgeId: 'streak_30',
    icon: '👑',
    flameLevel: 'Diamond Phoenix',
  },
];

/**
 * Returns YYYY-MM-DD formatted local calendar date string
 */
export function getTodayDateString(): string {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

/**
 * Returns YYYY-MM-DD for yesterday
 */
export function getYesterdayDateString(): string {
  const d = new Date();
  d.setDate(d.getDate() - 1);
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

/**
 * Calculates day difference between two YYYY-MM-DD date strings
 */
export function calculateDaysBetween(fromStr: string, toStr: string): number {
  if (!fromStr || !toStr) return 999;
  const d1 = new Date(fromStr + 'T00:00:00');
  const d2 = new Date(toStr + 'T00:00:00');
  const diffTime = d2.getTime() - d1.getTime();
  return Math.round(diffTime / (1000 * 60 * 60 * 24));
}

export interface DayStreakItem {
  dayLabel: string;
  dayShort: string;
  dateStr: string;
  isActive: boolean;
  isToday: boolean;
  isFuture: boolean;
}

/**
 * Generates the current 7-day rolling window for the streak tracker
 */
export function getWeeklyStreakHistory(
  streakDays: number,
  lastActiveDate: string,
  history: string[] = []
): DayStreakItem[] {
  const todayStr = getTodayDateString();
  const days: DayStreakItem[] = [];
  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  // 7 days: 6 days ago up to today
  for (let i = 6; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, '0');
    const dt = String(d.getDate()).padStart(2, '0');
    const dateStr = `${y}-${m}-${dt}`;
    const dayLabel = dayNames[d.getDay()];

    const isToday = dateStr === todayStr;
    const isFuture = i < 0;

    // Check if this day was active
    let isActive = false;
    if (history.includes(dateStr)) {
      isActive = true;
    } else if (dateStr === lastActiveDate) {
      isActive = true;
    } else if (isToday && streakDays > 0) {
      isActive = true;
    } else if (i < streakDays && streakDays > 0) {
      // Within consecutive streak count
      isActive = true;
    }

    days.push({
      dayLabel,
      dayShort: dayLabel.slice(0, 1),
      dateStr,
      isActive,
      isToday,
      isFuture,
    });
  }

  return days;
}

/**
 * Evaluates and computes daily login streak updates for a child
 */
export function processDailyStreak(child: ChildProfile): {
  updatedChild: ChildProfile;
  streakIncremented: boolean;
  isStreakBroken: boolean;
  awardedCoins: number;
  awardedXp: number;
  newMilestone?: StreakMilestone;
} {
  const todayStr = getTodayDateString();
  const yesterdayStr = getYesterdayDateString();

  const prevLastActive = child.lastActiveDate || '';
  const prevStreak = child.streakDays || 0;
  const prevHistory = child.streakHistory || [];
  const prevBadges = child.earnedBadges || [];
  const prevClaimed = child.claimedStreakRewards || [];

  // If already active today, no change
  if (prevLastActive === todayStr) {
    const safeStreak = Math.max(1, prevStreak);
    const safeHistory = Array.from(new Set([...prevHistory, todayStr]));
    return {
      updatedChild: {
        ...child,
        streakDays: safeStreak,
        lastActiveDate: todayStr,
        streakHistory: safeHistory,
      },
      streakIncremented: false,
      isStreakBroken: false,
      awardedCoins: 0,
      awardedXp: 0,
    };
  }

  // Consecutive day login (yesterday -> today)
  if (prevLastActive === yesterdayStr) {
    const newStreak = prevStreak + 1;
    const baseCoins = 25;
    const baseXp = 50;

    // Check if hit a milestone
    const milestone = STREAK_MILESTONES.find(
      (m) => m.days === newStreak && !prevClaimed.includes(m.days)
    );

    const bonusCoins = milestone ? milestone.rewardCoins : 0;
    const bonusXp = milestone ? milestone.rewardXp : 0;
    const totalAwardedCoins = baseCoins + bonusCoins;
    const totalAwardedXp = baseXp + bonusXp;

    const newBadges = [...prevBadges];
    if (milestone?.rewardBadgeId && !newBadges.includes(milestone.rewardBadgeId)) {
      newBadges.push(milestone.rewardBadgeId);
    }

    const updatedClaimed = milestone ? [...prevClaimed, milestone.days] : prevClaimed;
    const updatedHistory = Array.from(new Set([...prevHistory, todayStr]));

    return {
      updatedChild: {
        ...child,
        streakDays: newStreak,
        lastActiveDate: todayStr,
        streakHistory: updatedHistory,
        coins: child.coins + totalAwardedCoins,
        xp: child.xp + totalAwardedXp,
        earnedBadges: newBadges,
        claimedStreakRewards: updatedClaimed,
      },
      streakIncremented: true,
      isStreakBroken: false,
      awardedCoins: totalAwardedCoins,
      awardedXp: totalAwardedXp,
      newMilestone: milestone,
    };
  }

  // First time or missed 1+ days -> reset streak to 1
  const isBroken = prevLastActive !== '' && prevLastActive !== yesterdayStr;
  const newStreak = 1;
  const baseCoins = 15;
  const baseXp = 30;
  const updatedHistory = Array.from(new Set([...prevHistory, todayStr]));

  return {
    updatedChild: {
      ...child,
      streakDays: newStreak,
      lastActiveDate: todayStr,
      streakHistory: updatedHistory,
      coins: child.coins + baseCoins,
      xp: child.xp + baseXp,
    },
    streakIncremented: true,
    isStreakBroken: isBroken,
    awardedCoins: baseCoins,
    awardedXp: baseXp,
  };
}
