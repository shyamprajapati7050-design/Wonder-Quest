import { ChildProfile, MasterTestRewardTier } from '../types';

export const REWARD_TIERS: MasterTestRewardTier[] = [
  {
    id: 'tier_1_mortarboard',
    tierNumber: 1,
    tierTitle: 'Novice Scholar',
    requiredMasterTests: 1,
    accessoryName: "Scholar's Mortarboard Cap",
    accessoryIcon: '🎓',
    accessorySlot: 'head',
    description: 'A classic velvet academic cap with a shimmering gold tassel for conquering your first Master Test.',
    lore: 'Worn by dedicated explorers who proved their mastery under pressure in the Master Test Arena.',
    bonusTitle: 'Certified Scholar',
    coinBonus: 150,
    xpBonus: 250,
    rarity: 'bronze',
    gradient: 'from-amber-600 via-amber-500 to-yellow-500',
    badgeColor: 'bg-amber-100 text-amber-900 border-amber-300',
  },
  {
    id: 'tier_2_laurel_crown',
    tierNumber: 2,
    tierTitle: 'Golden Champion',
    requiredMasterTests: 2,
    accessoryName: 'Imperial Golden Crown',
    accessoryIcon: '👑',
    accessorySlot: 'head',
    description: 'Forged from enchanted sunlight, this royal crown marks double-realm academic triumph.',
    lore: 'Gleams with golden filigree, recognizing consistent precision across multiple curriculum subjects.',
    bonusTitle: 'Dual-Realm Conqueror',
    coinBonus: 250,
    xpBonus: 400,
    rarity: 'silver',
    gradient: 'from-slate-400 via-slate-300 to-indigo-400',
    badgeColor: 'bg-slate-100 text-slate-800 border-slate-300',
  },
  {
    id: 'tier_3_angel_wings',
    tierNumber: 3,
    tierTitle: 'Celestial Polymath',
    requiredMasterTests: 3,
    accessoryName: 'Archangel Wings of Wisdom',
    accessoryIcon: '🪽',
    accessorySlot: 'wings',
    description: 'Iridescent feathered wings that lift your avatar with the power of deep understanding.',
    lore: 'Symbolizes soaring over tricky concepts and lifting curiosity to celestial heights.',
    bonusTitle: 'Skyward Luminary',
    coinBonus: 400,
    xpBonus: 650,
    rarity: 'gold',
    gradient: 'from-amber-400 via-yellow-400 to-orange-400',
    badgeColor: 'bg-amber-100 text-amber-800 border-amber-300',
  },
  {
    id: 'tier_4_lightning_aura',
    tierNumber: 4,
    tierTitle: 'Lightning Sage',
    requiredMasterTests: 4,
    accessoryName: 'Genius Lightning Aura',
    accessoryIcon: '⚡',
    accessorySlot: 'aura',
    description: 'Electrifying arcs of cyan sparks orbiting your player portrait whenever you answer questions.',
    lore: 'Crackles with cognitive velocity, awarded to scholars whose logic moves faster than lightning.',
    bonusTitle: 'Speed of Thought',
    coinBonus: 600,
    xpBonus: 900,
    rarity: 'platinum',
    gradient: 'from-cyan-500 via-blue-500 to-indigo-500',
    badgeColor: 'bg-cyan-100 text-cyan-900 border-cyan-300',
  },
  {
    id: 'tier_5_truth_orb',
    tierNumber: 5,
    tierTitle: 'Grandmaster Mage',
    requiredMasterTests: 5,
    accessoryName: 'Orb of Pure Truth',
    accessoryIcon: '🔮',
    accessorySlot: 'held',
    description: 'A glowing mystical orb containing concentrated insights across science, math, and languages.',
    lore: 'Reveals answers clearly in the mind of true explorers who overcome every challenge.',
    bonusTitle: 'Archmage of Discovery',
    coinBonus: 850,
    xpBonus: 1300,
    rarity: 'diamond',
    gradient: 'from-purple-500 via-violet-500 to-indigo-600',
    badgeColor: 'bg-purple-100 text-purple-900 border-purple-300',
  },
  {
    id: 'tier_6_supernova_halo',
    tierNumber: 6,
    tierTitle: 'Cosmic Luminary',
    requiredMasterTests: 7,
    accessoryName: 'Supernova Halo of Brilliance',
    accessoryIcon: '🌟',
    accessorySlot: 'halo',
    description: 'A stellar halo pulsating with starlight, the absolute crowning achievement of WonderQuest.',
    lore: 'The ultimate badge of scholarly excellence, illuminating every corner of the questing multiverse.',
    bonusTitle: 'Omni Scholar Grandmaster',
    coinBonus: 1200,
    xpBonus: 2000,
    rarity: 'legendary',
    gradient: 'from-amber-400 via-rose-500 to-violet-600',
    badgeColor: 'bg-gradient-to-r from-amber-100 to-purple-100 text-purple-950 border-purple-300',
  },
];

/**
 * Counts total Master Tests passed by the child profile.
 */
export function getMasterTestPassedCount(child: ChildProfile): number {
  if (!child || !child.masterTestResults) return 0;
  return Object.values(child.masterTestResults).filter((attempt) => attempt.passed).length;
}

/**
 * Checks whether a specific tier is unlocked based on total passed Master Tests.
 */
export function isTierUnlocked(tier: MasterTestRewardTier, child: ChildProfile): boolean {
  const passedCount = getMasterTestPassedCount(child);
  return passedCount >= tier.requiredMasterTests;
}

/**
 * Returns the highest unlocked tier for the child, or null if none unlocked yet.
 */
export function getHighestUnlockedTier(child: ChildProfile): MasterTestRewardTier | null {
  const passedCount = getMasterTestPassedCount(child);
  const unlocked = REWARD_TIERS.filter((t) => passedCount >= t.requiredMasterTests);
  return unlocked.length > 0 ? unlocked[unlocked.length - 1] : null;
}

/**
 * Returns the next locked tier that the child is currently aiming for.
 */
export function getNextLockedTier(child: ChildProfile): MasterTestRewardTier | null {
  const passedCount = getMasterTestPassedCount(child);
  return REWARD_TIERS.find((t) => passedCount < t.requiredMasterTests) || null;
}
