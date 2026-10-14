import React, { useState } from 'react';
import { useGame } from '../context/GameContext';
import { SHOP_ITEMS } from '../data/shopItems';
import {
  REWARD_TIERS,
  getMasterTestPassedCount,
  isTierUnlocked,
  getHighestUnlockedTier,
  getNextLockedTier,
} from '../data/rewardTiersData';
import { soundEngine } from '../utils/audio';
import {
  Coins,
  Sparkles,
  Check,
  Lock,
  ArrowLeft,
  Gift,
  Send,
  Heart,
  ShieldCheck,
  Trophy,
  Crown,
  Award,
  Zap,
  ArrowRight,
  Eye,
  RotateCcw,
  Star,
  CheckCircle2,
} from 'lucide-react';
import { MasterTestRewardTier } from '../types';

export const RewardsShopScreen: React.FC = () => {
  const {
    activeChild,
    buyShopItem,
    equipAvatar,
    equipPet,
    equipFrame,
    equipAccessory,
    requestRealReward,
    setCurrentScreen,
    startMasterTest,
  } = useGame();

  const [activeTab, setActiveTab] = useState<'reward_tiers' | 'avatar' | 'pet' | 'frame' | 'real_world'>('reward_tiers');

  // Preview accessory state in the dressing room mirror
  const [previewTier, setPreviewTier] = useState<MasterTestRewardTier | null>(null);

  // Real world request form state
  const [realTitle, setRealTitle] = useState('');
  const [realCost, setRealCost] = useState(150);
  const [realDesc, setRealDesc] = useState('');
  const [submittedMessage, setSubmittedMessage] = useState<string | null>(null);

  // Master Test calculations
  const totalMasterTestsPassed = getMasterTestPassedCount(activeChild);
  const highestTier = getHighestUnlockedTier(activeChild);
  const nextTier = getNextLockedTier(activeChild);

  const filteredItems = SHOP_ITEMS.filter((item) => item.type === activeTab);

  // Active accessory icon to display in the dressing mirror
  const displayedAccessory = previewTier ? previewTier.accessoryIcon : activeChild.activeAccessory;

  const handleBuyOrEquip = (item: (typeof SHOP_ITEMS)[0]) => {
    const isUnlocked =
      activeChild.unlockedItems.includes(item.id) || item.unlockedByDefault;

    if (isUnlocked) {
      if (item.type === 'avatar') equipAvatar(item.icon);
      if (item.type === 'pet') equipPet(item.icon);
      if (item.type === 'frame') equipFrame(item.icon);
    } else {
      buyShopItem(item.id);
    }
  };

  const handleEquipTierAccessory = (tier: MasterTestRewardTier) => {
    equipAccessory(tier.accessoryIcon);
    soundEngine.playFanfare();
    setPreviewTier(null);
  };

  const handleUnequipAccessory = () => {
    equipAccessory(null);
    soundEngine.playCardFlip();
    setPreviewTier(null);
  };

  const handleRealRewardSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!realTitle.trim()) return;

    const ok = requestRealReward(realTitle.trim(), realCost, realDesc.trim());
    if (ok) {
      setSubmittedMessage('Reward request sent to your parents for approval!');
      setRealTitle('');
      setRealDesc('');
      setTimeout(() => setSubmittedMessage(null), 4000);
    }
  };

  return (
    <div className="space-y-6 sm:space-y-8 animate-fadeIn pb-24">
      {/* Top Header & Balances */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <button
          onClick={() => setCurrentScreen('home_dashboard')}
          className="flex items-center gap-2 text-xs font-semibold text-slate-700 hover:text-slate-900 bg-white border border-slate-200 px-4 py-2.5 rounded-2xl transition-all cursor-pointer shadow-2xs hover:shadow-xs"
        >
          <ArrowLeft className="w-4 h-4 text-slate-500" />
          <span>Back to Dashboard</span>
        </button>

        <div className="flex items-center gap-3">
          {/* Master Tests Passed Counter Pill */}
          <div className="flex items-center gap-2 px-3.5 py-2 bg-gradient-to-r from-amber-500/10 to-amber-500/5 border border-amber-300 rounded-2xl">
            <Trophy className="w-4 h-4 text-amber-600 fill-amber-400" />
            <span className="text-xs font-bold text-amber-950 font-heading">
              {totalMasterTestsPassed} Master Test{totalMasterTestsPassed === 1 ? '' : 's'} Passed
            </span>
          </div>

          {/* Wonder Coins Balance Pill */}
          <div className="flex items-center gap-2 px-4 py-2 bg-amber-50 border border-amber-200 rounded-2xl shadow-2xs">
            <Coins className="w-5 h-5 text-amber-500 fill-amber-400" />
            <span className="text-sm font-extrabold text-amber-950 font-mono tabular-nums">
              {activeChild.coins} Coins
            </span>
          </div>
        </div>
      </div>

      {/* Main Page Title */}
      <div className="text-center max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-200 text-xs font-bold text-indigo-700 mb-2">
          <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
          <span>Explorer Rewards & Prestigious Unlocks</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-heading tracking-tight">
          Wonder Rewards Shop
        </h1>
        <p className="mt-2 text-xs sm:text-sm text-slate-600 leading-relaxed">
          Unlock exclusive avatar accessories through Master Test scores, spend Wonder Coins on explorer companions, and submit custom family rewards!
        </p>
      </div>

      {/* Navigation Tabs */}
      <div className="flex items-center justify-start sm:justify-center gap-1.5 p-1.5 bg-slate-100 rounded-2xl max-w-2xl mx-auto overflow-x-auto scrollbar-none">
        {(
          [
            { id: 'reward_tiers', label: 'Reward Tiers', icon: '🏆', highlight: true },
            { id: 'avatar', label: 'Avatars', icon: '🦉' },
            { id: 'pet', label: 'Companions', icon: '🐶' },
            { id: 'frame', label: 'Frames', icon: '🌿' },
            { id: 'real_world', label: 'Family Prizes', icon: '🎁' },
          ] as const
        ).map((tab) => {
          const isSelected = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => {
                soundEngine.playCardFlip();
                setActiveTab(tab.id);
              }}
              className={`flex items-center gap-1.5 px-3.5 py-2 text-xs font-extrabold rounded-xl transition-all cursor-pointer whitespace-nowrap ${
                isSelected
                  ? 'bg-white text-slate-900 shadow-sm border border-slate-200/80 ring-1 ring-slate-900/5'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/50'
              }`}
            >
              <span>{tab.icon}</span>
              <span>{tab.label}</span>
              {tab.id === 'reward_tiers' && (
                <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
              )}
            </button>
          );
        })}
      </div>

      {/* SECTION 1: MASTER TEST REWARD TIERS (Primary Feature Requested) */}
      {activeTab === 'reward_tiers' && (
        <div className="space-y-6 sm:space-y-8 animate-fadeIn">
          {/* Master Test Prestige Status & Progress Hero Banner */}
          <div className="bg-gradient-to-br from-amber-500/10 via-amber-50/40 to-indigo-50/30 rounded-3xl p-6 sm:p-8 border border-amber-200/90 shadow-xs relative overflow-hidden">
            <div className="relative flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
              <div className="space-y-2 max-w-xl">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-extrabold bg-amber-400 text-slate-950 shadow-2xs">
                    <Trophy className="w-3.5 h-3.5 fill-slate-950" />
                    <span>Master Test Prestige</span>
                  </span>
                  <span className="text-xs font-semibold text-amber-900 bg-amber-100/70 border border-amber-200 px-2.5 py-0.5 rounded-full">
                    Score ≥12/15 (80%) to Pass
                  </span>
                  {highestTier && (
                    <span className="text-xs font-bold text-indigo-700 bg-indigo-50 border border-indigo-200 px-2.5 py-0.5 rounded-full">
                      Rank: {highestTier.tierTitle}
                    </span>
                  )}
                </div>

                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-heading">
                  Avatar Accessories via Master Tests
                </h2>

                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  Conquer the 15-question Master Test at the end of each curriculum world! Every passed Master Test unlocks prestigious, glowing avatar accessories, bonus Wonder Coins, and exclusive scholar titles.
                </p>

                {/* Progress toward next tier milestone */}
                <div className="pt-2">
                  <div className="flex items-center justify-between text-xs font-bold text-slate-700 mb-1.5">
                    <span>
                      {nextTier ? (
                        <>
                          Next Unlock:{' '}
                          <span className="text-indigo-700">
                            Tier {nextTier.tierNumber} · {nextTier.accessoryName}
                          </span>
                        </>
                      ) : (
                        <span className="text-emerald-700 font-extrabold">
                          🎉 All Master Test Reward Tiers Completed!
                        </span>
                      )}
                    </span>
                    <span className="font-mono text-slate-500 tabular-nums">
                      {totalMasterTestsPassed} /{' '}
                      {nextTier ? nextTier.requiredMasterTests : REWARD_TIERS[REWARD_TIERS.length - 1].requiredMasterTests}{' '}
                      Passed
                    </span>
                  </div>

                  <div className="w-full bg-slate-200/90 h-3 rounded-full overflow-hidden border border-slate-300/60 p-0.5">
                    <div
                      className="bg-gradient-to-r from-amber-500 via-orange-500 to-indigo-600 h-full rounded-full transition-all duration-700"
                      style={{
                        width: `${
                          nextTier
                            ? Math.min(
                                100,
                                Math.round((totalMasterTestsPassed / nextTier.requiredMasterTests) * 100)
                              )
                            : 100
                        }%`,
                      }}
                    />
                  </div>
                </div>
              </div>

              {/* Action & Direct Test CTA */}
              <div className="shrink-0 flex flex-col sm:flex-row lg:flex-col gap-3 w-full lg:w-auto">
                <button
                  onClick={() => {
                    soundEngine.playFanfare();
                    startMasterTest(5);
                  }}
                  className="px-6 py-3.5 bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-400 hover:from-amber-400 hover:to-yellow-300 text-slate-950 font-bold text-xs sm:text-sm rounded-2xl shadow-md shadow-amber-500/20 flex items-center justify-center gap-2 transform active:scale-95 transition-all cursor-pointer"
                >
                  <Trophy className="w-4 h-4 fill-slate-950" />
                  <span>Take Master Test (15 Qs)</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  onClick={() => setCurrentScreen('level_map')}
                  className="px-5 py-2.5 bg-white hover:bg-slate-50 text-slate-700 font-bold text-xs rounded-xl border border-slate-200 transition-colors cursor-pointer text-center"
                >
                  View World Map Milestones
                </button>
              </div>
            </div>
          </div>

          {/* Interactive Avatar Dressing Room / Mirror */}
          <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-7 shadow-xs">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-6 border-b border-slate-100">
              <div className="flex items-center gap-5">
                {/* Live Avatar Preview Container */}
                <div className="relative">
                  <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-3xl bg-gradient-to-tr from-amber-50 via-white to-indigo-50 border-2 border-amber-300 flex items-center justify-center text-5xl sm:text-6xl shadow-sm relative overflow-visible">
                    {activeChild.avatar}

                    {/* Equipped/Previewed Accessory */}
                    {displayedAccessory && (
                      <div
                        title={`Accessory: ${displayedAccessory}`}
                        className="absolute -top-3.5 -right-2.5 w-11 h-11 rounded-2xl bg-white border-2 border-amber-400 flex items-center justify-center text-2xl shadow-md animate-gentle-bounce z-10"
                      >
                        {displayedAccessory}
                      </div>
                    )}
                  </div>

                  {/* Active Pet Pill */}
                  {activeChild.activePet && (
                    <div
                      title="Equipped Companion Pet"
                      className="absolute -bottom-2 -left-2 w-9 h-9 rounded-full bg-amber-400 border-2 border-white flex items-center justify-center text-lg shadow-sm"
                    >
                      {activeChild.activePet}
                    </div>
                  )}
                </div>

                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-amber-700 uppercase tracking-wider">
                      Avatar Dressing Room
                    </span>
                    <span className="text-slate-300">·</span>
                    <span className="text-xs font-semibold text-slate-500">Live Preview</span>
                  </div>

                  <h3 className="text-lg sm:text-xl font-bold text-slate-900 font-heading mt-0.5">
                    {activeChild.name}'s Explorer Look
                  </h3>

                  <p className="text-xs text-slate-600 mt-1">
                    {previewTier ? (
                      <span className="text-indigo-700 font-semibold flex items-center gap-1">
                        <Eye className="w-3.5 h-3.5" />
                        Previewing {previewTier.accessoryName} ({previewTier.accessoryIcon})
                      </span>
                    ) : activeChild.activeAccessory ? (
                      <span className="text-emerald-700 font-semibold flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        Equipped: {activeChild.activeAccessory}
                      </span>
                    ) : (
                      <span className="text-slate-400">No accessory equipped yet</span>
                    )}
                  </p>
                </div>
              </div>

              {/* Action buttons for preview & unequip */}
              <div className="flex flex-wrap items-center gap-2.5">
                {previewTier && isTierUnlocked(previewTier, activeChild) && (
                  <button
                    onClick={() => handleEquipTierAccessory(previewTier)}
                    className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-xl shadow-xs transition-colors cursor-pointer flex items-center gap-1.5"
                  >
                    <Check className="w-4 h-4" />
                    <span>Equip Previewed ({previewTier.accessoryIcon})</span>
                  </button>
                )}

                {previewTier && (
                  <button
                    onClick={() => setPreviewTier(null)}
                    className="px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs rounded-xl transition-colors cursor-pointer flex items-center gap-1"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Clear Preview</span>
                  </button>
                )}

                {activeChild.activeAccessory && (
                  <button
                    onClick={handleUnequipAccessory}
                    className="px-3.5 py-2 bg-white hover:bg-rose-50 border border-slate-200 hover:border-rose-300 text-slate-600 hover:text-rose-700 font-semibold text-xs rounded-xl transition-colors cursor-pointer"
                  >
                    Unequip Accessory
                  </button>
                )}
              </div>
            </div>

            {/* Reward Tiers Progression Grid */}
            <div className="pt-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-base font-bold text-slate-900 font-heading">
                    Unlockable Master Test Tiers
                  </h3>
                  <p className="text-xs text-slate-500">
                    Earn high scores in Master Tests (Level 5, 10, 15 milestones) to conquer all 6 tiers.
                  </p>
                </div>

                <span className="text-xs font-semibold text-slate-400">
                  {totalMasterTestsPassed} Tests Logged
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {REWARD_TIERS.map((tier) => {
                  const unlocked = isTierUnlocked(tier, activeChild);
                  const isCurrentlyEquipped = activeChild.activeAccessory === tier.accessoryIcon;
                  const isPreviewing = previewTier?.id === tier.id;
                  const testsRemaining = Math.max(0, tier.requiredMasterTests - totalMasterTestsPassed);

                  return (
                    <div
                      key={tier.id}
                      className={`rounded-3xl p-5 border-2 transition-all flex flex-col justify-between ${
                        isCurrentlyEquipped
                          ? 'bg-emerald-50/40 border-emerald-400 ring-2 ring-emerald-400/20 shadow-xs'
                          : isPreviewing
                          ? 'bg-indigo-50/40 border-indigo-400 ring-2 ring-indigo-400/20 shadow-xs'
                          : unlocked
                          ? 'bg-white border-slate-200 hover:border-slate-300 shadow-2xs hover:shadow-xs'
                          : 'bg-slate-50/70 border-slate-200 opacity-90'
                      }`}
                    >
                      <div>
                        {/* Tier Header Line */}
                        <div className="flex items-center justify-between gap-2 mb-3">
                          <span
                            className={`text-[10px] font-extrabold uppercase tracking-wider px-2.5 py-0.5 rounded-full border ${tier.badgeColor}`}
                          >
                            Tier {tier.tierNumber} · {tier.tierTitle}
                          </span>

                          {isCurrentlyEquipped ? (
                            <span className="flex items-center gap-1 text-[11px] font-extrabold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-full border border-emerald-300">
                              <Check className="w-3 h-3" /> Equipped
                            </span>
                          ) : unlocked ? (
                            <span className="text-[11px] font-bold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded-full border border-indigo-200">
                              Unlocked
                            </span>
                          ) : (
                            <span className="flex items-center gap-1 text-[11px] font-bold text-slate-500 bg-slate-200/80 px-2 py-0.5 rounded-full">
                              <Lock className="w-3 h-3" /> {testsRemaining} More Test{testsRemaining > 1 ? 's' : ''}
                            </span>
                          )}
                        </div>

                        {/* Large Accessory Preview & Slot */}
                        <div className="flex items-center gap-4 my-3 bg-white p-3.5 rounded-2xl border border-slate-100 shadow-2xs">
                          <div
                            className={`w-16 h-16 rounded-2xl flex items-center justify-center text-4xl shadow-inner shrink-0 relative ${
                              unlocked
                                ? 'bg-gradient-to-tr from-amber-50 to-indigo-50 border border-amber-200'
                                : 'bg-slate-100 border border-slate-200 text-slate-400 grayscale'
                            }`}
                          >
                            <span>{tier.accessoryIcon}</span>
                            {!unlocked && (
                              <div className="absolute inset-0 bg-slate-900/10 rounded-2xl flex items-center justify-center">
                                <Lock className="w-4 h-4 text-slate-500" />
                              </div>
                            )}
                          </div>

                          <div className="min-w-0">
                            <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400 block">
                              {tier.accessorySlot} accessory
                            </span>
                            <h4 className="text-sm font-bold text-slate-900 font-heading truncate">
                              {tier.accessoryName}
                            </h4>
                            <span className="text-xs font-semibold text-amber-700 block mt-0.5">
                              "{tier.bonusTitle}"
                            </span>
                          </div>
                        </div>

                        {/* Lore & Description */}
                        <p className="text-xs text-slate-600 leading-relaxed mb-3">
                          {tier.description}
                        </p>

                        <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 text-[11px] text-slate-500 italic mb-4">
                          "{tier.lore}"
                        </div>

                        {/* Bonus Rewards Tag Strip */}
                        <div className="flex items-center gap-3 text-xs font-bold text-amber-700 mb-4 pb-2 border-b border-slate-100">
                          <span className="flex items-center gap-1">
                            <Coins className="w-3.5 h-3.5 text-amber-500 fill-amber-400" />
                            <span>+{tier.coinBonus} Bonus</span>
                          </span>
                          <span className="text-slate-300">·</span>
                          <span className="text-indigo-700 font-mono">+{tier.xpBonus} XP</span>
                          <span className="text-slate-300">·</span>
                          <span className="text-slate-500 text-[11px]">
                            {tier.requiredMasterTests} Test{tier.requiredMasterTests > 1 ? 's' : ''} Req.
                          </span>
                        </div>
                      </div>

                      {/* Action Button Footer */}
                      <div className="pt-2">
                        {isCurrentlyEquipped ? (
                          <button
                            onClick={handleUnequipAccessory}
                            className="w-full py-2.5 rounded-xl text-xs font-bold bg-white hover:bg-slate-100 border border-slate-200 text-slate-700 transition-colors cursor-pointer"
                          >
                            Unequip from Avatar
                          </button>
                        ) : unlocked ? (
                          <div className="grid grid-cols-2 gap-2">
                            <button
                              onClick={() => {
                                soundEngine.playCardFlip();
                                setPreviewTier(tier);
                              }}
                              className="py-2.5 rounded-xl text-xs font-bold bg-slate-100 hover:bg-slate-200 text-slate-800 transition-colors cursor-pointer flex items-center justify-center gap-1"
                            >
                              <Eye className="w-3.5 h-3.5" />
                              <span>Preview</span>
                            </button>
                            <button
                              onClick={() => handleEquipTierAccessory(tier)}
                              className="py-2.5 rounded-xl text-xs font-bold bg-indigo-600 hover:bg-indigo-700 text-white transition-colors cursor-pointer shadow-xs flex items-center justify-center gap-1"
                            >
                              <Check className="w-3.5 h-3.5" />
                              <span>Equip Now</span>
                            </button>
                          </div>
                        ) : (
                          <button
                            onClick={() => {
                              soundEngine.playCardFlip();
                              startMasterTest(5);
                            }}
                            className="w-full py-2.5 rounded-xl text-xs font-bold bg-amber-400 hover:bg-amber-300 text-slate-950 transition-colors cursor-pointer flex items-center justify-center gap-1.5 shadow-2xs"
                          >
                            <Trophy className="w-3.5 h-3.5 fill-slate-950" />
                            <span>
                              Pass Test ({totalMasterTestsPassed}/{tier.requiredMasterTests})
                            </span>
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SECTION 2: VIRTUAL ITEMS SHOP (Avatars, Pets, Frames) */}
      {activeTab !== 'reward_tiers' && activeTab !== 'real_world' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 animate-fadeIn">
          {filteredItems.map((item) => {
            const isUnlocked =
              activeChild.unlockedItems.includes(item.id) || item.unlockedByDefault;

            const isEquipped =
              (item.type === 'avatar' && activeChild.avatar === item.icon) ||
              (item.type === 'pet' && activeChild.activePet === item.icon) ||
              (item.type === 'frame' && activeChild.activeFrame === item.icon);

            const canAfford = activeChild.coins >= item.cost;

            return (
              <div
                key={item.id}
                className={`bg-white rounded-3xl p-6 border-2 transition-all flex flex-col justify-between ${
                  isEquipped
                    ? 'border-indigo-500 ring-2 ring-indigo-500/20 shadow-sm'
                    : 'border-slate-200 hover:border-slate-300 shadow-2xs'
                }`}
              >
                <div>
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-16 h-16 rounded-2xl bg-slate-100 border border-slate-200 flex items-center justify-center text-4xl shadow-inner">
                      {item.icon}
                    </div>

                    {isEquipped ? (
                      <span className="flex items-center gap-1 text-[11px] font-bold text-indigo-700 bg-indigo-50 px-2.5 py-1 rounded-full border border-indigo-200">
                        <Check className="w-3.5 h-3.5" /> Equipped
                      </span>
                    ) : isUnlocked ? (
                      <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                        Owned
                      </span>
                    ) : (
                      <span className="flex items-center gap-1 text-xs font-bold text-amber-700 bg-amber-50 px-2.5 py-1 rounded-full border border-amber-200">
                        <Coins className="w-3.5 h-3.5 text-amber-500 fill-amber-400" />
                        {item.cost}
                      </span>
                    )}
                  </div>

                  <h3 className="text-base font-bold text-slate-900 font-heading">
                    {item.name}
                  </h3>
                  <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-100">
                  {isEquipped ? (
                    <button
                      disabled
                      className="w-full py-2.5 rounded-xl text-xs font-bold bg-slate-100 text-slate-400 cursor-default"
                    >
                      Currently Active
                    </button>
                  ) : isUnlocked ? (
                    <button
                      onClick={() => handleBuyOrEquip(item)}
                      className="w-full py-2.5 rounded-xl text-xs font-bold bg-indigo-600 hover:bg-indigo-700 text-white transition-colors cursor-pointer shadow-xs"
                    >
                      Equip Item
                    </button>
                  ) : (
                    <button
                      disabled={!canAfford}
                      onClick={() => handleBuyOrEquip(item)}
                      className={`w-full py-2.5 rounded-xl text-xs font-bold transition-colors cursor-pointer flex items-center justify-center gap-1.5 ${
                        canAfford
                          ? 'bg-amber-400 hover:bg-amber-300 text-slate-950 shadow-xs'
                          : 'bg-slate-100 text-slate-400 cursor-not-allowed'
                      }`}
                    >
                      <Coins className="w-4 h-4 fill-slate-950" />
                      <span>{canAfford ? `Unlock for ${item.cost} Coins` : `Need ${item.cost - activeChild.coins} More Coins`}</span>
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* SECTION 3: REAL-WORLD FAMILY PRIZES */}
      {activeTab === 'real_world' && (
        <div className="space-y-6 animate-fadeIn">
          {/* Information Notice */}
          <div className="p-5 rounded-3xl bg-indigo-50/80 border border-indigo-200 flex items-start gap-4">
            <ShieldCheck className="w-6 h-6 text-indigo-600 shrink-0 mt-0.5" />
            <div className="text-xs sm:text-sm text-indigo-950">
              <span className="font-bold block mb-0.5">Parent Approval Required:</span>
              To claim real-world rewards (like bedtime extensions, family pizza nights, or science toys), your request is sent to your Parent Dashboard for authorization.
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Request Form */}
            <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-7 shadow-xs">
              <h3 className="text-lg font-bold text-slate-900 font-heading mb-1">
                Request a Custom Family Prize
              </h3>
              <p className="text-xs text-slate-500 mb-5">
                Propose a prize to your parents using your Wonder Coins balance.
              </p>

              {submittedMessage && (
                <div className="p-3.5 mb-4 rounded-xl bg-emerald-50 border border-emerald-200 text-xs font-bold text-emerald-800 animate-fadeIn">
                  {submittedMessage}
                </div>
              )}

              <form onSubmit={handleRealRewardSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Prize Name
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Choose Weekend Dinner Menu / 30m Extra Game Time"
                    value={realTitle}
                    onChange={(e) => setRealTitle(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Coins Offered: <span className="text-amber-600 font-extrabold">{realCost} Wonder Coins</span>
                  </label>
                  <input
                    type="range"
                    min="50"
                    max="500"
                    step="25"
                    value={realCost}
                    onChange={(e) => setRealCost(Number(e.target.value))}
                    className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-amber-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Note for Parents (Optional)
                  </label>
                  <textarea
                    rows={2}
                    placeholder="Why you would like to earn this reward..."
                    value={realDesc}
                    onChange={(e) => setRealDesc(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>

                <button
                  type="submit"
                  disabled={activeChild.coins < realCost}
                  className="w-full py-3 bg-amber-400 hover:bg-amber-300 disabled:bg-slate-100 disabled:text-slate-400 text-slate-950 font-bold text-xs rounded-xl shadow-xs transition-colors cursor-pointer flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  <span>Submit Request to Parent</span>
                </button>
              </form>
            </div>

            {/* Request Queue History */}
            <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-7 shadow-xs">
              <h3 className="text-lg font-bold text-slate-900 font-heading mb-1">
                Your Prize Requests
              </h3>
              <p className="text-xs text-slate-500 mb-5">
                Current status of your reward requests.
              </p>

              <div className="space-y-3">
                {activeChild.realRewardRequests.length === 0 ? (
                  <div className="text-center py-10 text-xs text-slate-400 border border-dashed border-slate-200 rounded-2xl">
                    No reward requests sent yet.
                  </div>
                ) : (
                  activeChild.realRewardRequests.map((req) => (
                    <div
                      key={req.id}
                      className="p-4 rounded-2xl border border-slate-200 bg-slate-50 flex items-center justify-between gap-3"
                    >
                      <div>
                        <h4 className="text-xs sm:text-sm font-bold text-slate-900">
                          {req.title}
                        </h4>
                        <span className="text-[11px] text-slate-500">
                          {req.cost} Coins · Sent {req.requestedAt}
                        </span>
                      </div>

                      <span
                        className={`text-[11px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider ${
                          req.status === 'approved'
                            ? 'bg-emerald-100 text-emerald-800'
                            : req.status === 'rejected'
                            ? 'bg-rose-100 text-rose-800'
                            : 'bg-amber-100 text-amber-800'
                        }`}
                      >
                        {req.status}
                      </span>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
