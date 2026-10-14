import React from 'react';
import { BuddyAnimationState } from '../types';

interface BuddyAvatarProps {
  buddyId: string;
  animationState?: BuddyAnimationState;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  showReactionBadge?: boolean;
}

export const BuddyAvatar: React.FC<BuddyAvatarProps> = ({
  buddyId,
  animationState = 'idle',
  size = 'md',
  className = '',
  showReactionBadge = true,
}) => {
  const sizeMap = {
    sm: 'w-12 h-12',
    md: 'w-20 h-20',
    lg: 'w-28 h-28',
    xl: 'w-36 h-36',
  };

  // Determine root animation class
  let animClass = 'transition-transform duration-300';
  if (animationState === 'celebrating') {
    animClass += ' animate-buddy-celebrate';
  } else if (animationState === 'waving') {
    animClass += ' animate-buddy-wave';
  } else if (animationState === 'speaking') {
    animClass += ' animate-buddy-talk';
  } else if (animationState === 'thinking') {
    animClass += ' -rotate-6 transition-transform duration-300';
  } else {
    animClass += ' animate-float-subtle';
  }

  // Render character specific SVG
  const renderCharacterSvg = () => {
    switch (buddyId) {
      case 'fox_nova':
        return (
          <svg viewBox="0 0 120 120" className="w-full h-full drop-shadow-md select-none overflow-visible">
            {/* Cosmic Glow Aura */}
            <circle cx="60" cy="60" r="54" fill="#FEF3C7" opacity="0.6" className="animate-pulse" />
            {/* Astronaut Collar / Halo */}
            <ellipse cx="60" cy="98" rx="34" ry="10" fill="#F97316" opacity="0.25" />
            
            {/* Tail with white tip */}
            <path
              d="M24 75 C10 65 8 45 20 40 C28 36 38 48 34 68 Z"
              fill="#EA580C"
              stroke="#C2410C"
              strokeWidth="2.5"
            />
            <path d="M14 48 C16 42 22 41 24 45 C22 52 18 52 14 48 Z" fill="#FFFFFF" />

            {/* Fox Body */}
            <path
              d="M36 70 Q60 58 84 70 Q92 104 60 106 Q28 104 36 70 Z"
              fill="#F97316"
              stroke="#EA580C"
              strokeWidth="2.5"
            />
            {/* White Chest Fur */}
            <path d="M50 72 Q60 66 70 72 Q68 96 60 98 Q52 96 50 72 Z" fill="#FFF7ED" />

            {/* Ears */}
            {/* Left Ear */}
            <polygon points="34,44 26,14 48,28" fill="#EA580C" stroke="#C2410C" strokeWidth="2" />
            <polygon points="35,38 30,22 44,30" fill="#FDE047" />
            {/* Right Ear */}
            <polygon points="86,44 94,14 72,28" fill="#EA580C" stroke="#C2410C" strokeWidth="2" />
            <polygon points="85,38 90,22 76,30" fill="#FDE047" />

            {/* Head */}
            <ellipse cx="60" cy="48" rx="30" ry="24" fill="#F97316" stroke="#EA580C" strokeWidth="2.5" />
            {/* White Cheeks */}
            <path d="M34 50 Q48 58 60 58 Q72 58 86 50 Q78 68 60 70 Q42 68 34 50 Z" fill="#FFF7ED" />

            {/* Cosmic Helmet Goggles */}
            <rect x="38" y="36" width="44" height="15" rx="7.5" fill="#38BDF8" fillOpacity="0.85" stroke="#0284C7" strokeWidth="2" />
            <line x1="42" y1="40" x2="52" y2="40" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" />
            <line x1="68" y1="40" x2="78" y2="40" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" />

            {/* Eyes behind visor */}
            <circle cx="48" cy="43.5" r="3" fill="#0F172A" />
            <circle cx="49" cy="42" r="1" fill="#FFFFFF" />
            <circle cx="72" cy="43.5" r="3" fill="#0F172A" />
            <circle cx="73" cy="42" r="1" fill="#FFFFFF" />

            {/* Cute Nose */}
            <polygon points="57,59 63,59 60,63" fill="#1E293B" />
            {/* Mouth */}
            {animationState === 'speaking' ? (
              <ellipse cx="60" cy="66" rx="4" ry="3" fill="#DC2626" />
            ) : (
              <path d="M56 64 Q60 67 64 64" fill="none" stroke="#1E293B" strokeWidth="2" strokeLinecap="round" />
            )}

            {/* Waving Paw (Right Arm) */}
            <g className={animationState === 'waving' ? 'animate-buddy-arm-wave' : ''} style={{ transformOrigin: '82px 76px' }}>
              <ellipse cx="86" cy="74" rx="7" ry="10" fill="#EA580C" stroke="#C2410C" strokeWidth="2" transform="rotate(-20 86 74)" />
              <circle cx="89" cy="68" r="4.5" fill="#FFF7ED" />
            </g>
            {/* Left Arm Resting */}
            <ellipse cx="34" cy="78" rx="6" ry="9" fill="#EA580C" stroke="#C2410C" strokeWidth="2" transform="rotate(15 34 78)" />
          </svg>
        );

      case 'bear_barnaby':
        return (
          <svg viewBox="0 0 120 120" className="w-full h-full drop-shadow-md select-none overflow-visible">
            {/* Gentle Nature Aura */}
            <circle cx="60" cy="60" r="54" fill="#D1FAE5" opacity="0.6" className="animate-pulse" />
            
            {/* Ears */}
            <circle cx="36" cy="30" r="12" fill="#78350F" stroke="#522409" strokeWidth="2" />
            <circle cx="36" cy="30" r="6" fill="#FDE68A" />
            <circle cx="84" cy="30" r="12" fill="#78350F" stroke="#522409" strokeWidth="2" />
            <circle cx="84" cy="30" r="6" fill="#FDE68A" />

            {/* Body */}
            <ellipse cx="60" cy="85" rx="32" ry="26" fill="#854D0E" stroke="#522409" strokeWidth="2.5" />
            {/* Honey Belly */}
            <ellipse cx="60" cy="86" rx="20" ry="17" fill="#FEF08A" opacity="0.9" />

            {/* Head */}
            <ellipse cx="60" cy="50" rx="30" ry="24" fill="#92400E" stroke="#522409" strokeWidth="2.5" />

            {/* Forest Scarf */}
            <path d="M40 68 Q60 76 80 68 Q75 80 60 79 Q45 80 40 68 Z" fill="#059669" stroke="#047857" strokeWidth="2" />
            <path d="M68 76 L74 94 L62 92 Z" fill="#047857" />

            {/* Muzzle */}
            <ellipse cx="60" cy="55" rx="14" ry="10" fill="#FEF3C7" />
            {/* Nose */}
            <ellipse cx="60" cy="51" rx="5" ry="3.5" fill="#1C1917" />
            {/* Mouth */}
            {animationState === 'speaking' ? (
              <ellipse cx="60" cy="60" rx="3.5" ry="3" fill="#B91C1C" />
            ) : (
              <path d="M56 57 Q60 61 64 57" fill="none" stroke="#1C1917" strokeWidth="2" strokeLinecap="round" />
            )}

            {/* Eyes */}
            <circle cx="48" cy="44" r="3.5" fill="#1C1917" />
            <circle cx="49" cy="42.5" r="1.2" fill="#FFFFFF" />
            <circle cx="72" cy="44" r="3.5" fill="#1C1917" />
            <circle cx="73" cy="42.5" r="1.2" fill="#FFFFFF" />

            {/* Friendly Eyebrows */}
            <path d="M44 38 Q48 36 52 38" fill="none" stroke="#522409" strokeWidth="2" strokeLinecap="round" />
            <path d="M68 38 Q72 36 76 38" fill="none" stroke="#522409" strokeWidth="2" strokeLinecap="round" />

            {/* Waving Paw */}
            <g className={animationState === 'waving' ? 'animate-buddy-arm-wave' : ''} style={{ transformOrigin: '84px 75px' }}>
              <ellipse cx="88" cy="70" rx="9" ry="12" fill="#78350F" stroke="#522409" strokeWidth="2" transform="rotate(-25 88 70)" />
              <circle cx="91" cy="65" r="5" fill="#FEF08A" />
              <circle cx="87" cy="60" r="1.5" fill="#522409" />
              <circle cx="92" cy="59" r="1.5" fill="#522409" />
              <circle cx="96" cy="61" r="1.5" fill="#522409" />
            </g>
            {/* Left Paw */}
            <ellipse cx="32" cy="78" rx="8" ry="11" fill="#78350F" stroke="#522409" strokeWidth="2" transform="rotate(20 32 78)" />
          </svg>
        );

      case 'bot_sparky':
        return (
          <svg viewBox="0 0 120 120" className="w-full h-full drop-shadow-md select-none overflow-visible">
            {/* Electric Pulse Aura */}
            <circle cx="60" cy="60" r="54" fill="#CFFAFE" opacity="0.6" className="animate-pulse" />

            {/* Antenna with glowing beacon */}
            <line x1="60" y1="28" x2="60" y2="12" stroke="#0284C7" strokeWidth="3" strokeLinecap="round" />
            <circle cx="60" cy="10" r="6" fill="#F59E0B" className="animate-pulse" stroke="#B45309" strokeWidth="1.5" />
            <circle cx="60" cy="10" r="2.5" fill="#FEF3C7" />

            {/* Robot Head */}
            <rect x="34" y="26" width="52" height="38" rx="10" fill="#0EA5E9" stroke="#0369A1" strokeWidth="2.5" />
            {/* Ear Bolts */}
            <rect x="28" y="38" width="6" height="14" rx="2" fill="#64748B" stroke="#334155" strokeWidth="1.5" />
            <rect x="86" y="38" width="6" height="14" rx="2" fill="#64748B" stroke="#334155" strokeWidth="1.5" />

            {/* Visor Screen */}
            <rect x="40" y="32" width="40" height="24" rx="6" fill="#0F172A" />

            {/* Glowing Pixel Eyes */}
            <circle cx="50" cy="42" r="4.5" fill="#38BDF8" className="animate-pulse" />
            <circle cx="70" cy="42" r="4.5" fill="#38BDF8" className="animate-pulse" />

            {/* Digital Mouth Display */}
            {animationState === 'speaking' ? (
              <path d="M48 50 L52 48 L56 52 L60 48 L64 52 L68 48 L72 50" fill="none" stroke="#F43F5E" strokeWidth="2.5" strokeLinecap="round" />
            ) : (
              <path d="M52 49 Q60 54 68 49" fill="none" stroke="#22C55E" strokeWidth="2.5" strokeLinecap="round" />
            )}

            {/* Neck Joint */}
            <rect x="54" y="64" width="12" height="6" fill="#64748B" />

            {/* Robot Chassis Body */}
            <rect x="36" y="70" width="48" height="36" rx="8" fill="#0284C7" stroke="#0369A1" strokeWidth="2.5" />
            {/* Battery / Energy Gauge */}
            <rect x="44" y="76" width="32" height="12" rx="4" fill="#0F172A" />
            <rect x="47" y="79" width="7" height="6" rx="1.5" fill="#22C55E" />
            <rect x="56" y="79" width="7" height="6" rx="1.5" fill="#22C55E" />
            <rect x="65" y="79" width="7" height="6" rx="1.5" fill="#22C55E" />

            {/* Heart Core Button */}
            <circle cx="60" cy="96" r="4" fill="#F43F5E" className="animate-pulse" />

            {/* Robotic Waving Arm */}
            <g className={animationState === 'waving' ? 'animate-buddy-arm-wave' : ''} style={{ transformOrigin: '84px 76px' }}>
              <rect x="84" y="74" width="16" height="8" rx="4" fill="#0EA5E9" stroke="#0369A1" strokeWidth="2" transform="rotate(-35 84 76)" />
              <circle cx="98" cy="65" r="5" fill="#F59E0B" />
            </g>
            {/* Left Arm */}
            <rect x="20" y="74" width="16" height="8" rx="4" fill="#0EA5E9" stroke="#0369A1" strokeWidth="2" transform="rotate(35 34 76)" />
          </svg>
        );

      case 'dolphin_kira':
        return (
          <svg viewBox="0 0 120 120" className="w-full h-full drop-shadow-md select-none overflow-visible">
            {/* Ocean Splash Aura */}
            <circle cx="60" cy="60" r="54" fill="#CCFBF1" opacity="0.6" className="animate-pulse" />

            {/* Crown of Sea Stars / Pearls */}
            <circle cx="50" cy="24" r="3" fill="#FDE047" />
            <circle cx="60" cy="21" r="4" fill="#F472B6" />
            <circle cx="70" cy="24" r="3" fill="#38BDF8" />

            {/* Dolphin Arching Body */}
            <path
              d="M25 80 C20 40 45 28 75 32 C95 35 105 48 98 68 C90 85 55 95 25 80 Z"
              fill="#0D9488"
              stroke="#0f766e"
              strokeWidth="2.5"
            />
            {/* Cream Underbelly */}
            <path
              d="M32 78 C35 55 55 45 78 48 C68 75 50 82 32 78 Z"
              fill="#F0FDFA"
            />

            {/* Dorsal Fin */}
            <path d="M62 30 C64 16 75 18 78 28 Z" fill="#0F766E" />

            {/* Flukes / Tail */}
            <path d="M22 80 C12 75 8 88 18 94 C24 96 26 86 22 80 Z" fill="#0F766E" stroke="#115E59" strokeWidth="1.5" />

            {/* Cute Dolphin Snout */}
            <path d="M96 52 C104 54 106 60 98 64 Z" fill="#0D9488" />

            {/* Sparkling Big Eye */}
            <circle cx="82" cy="46" r="4.5" fill="#0F172A" />
            <circle cx="84" cy="44" r="1.6" fill="#FFFFFF" />
            <circle cx="81" cy="48" r="0.8" fill="#FFFFFF" />

            {/* Friendly Smile */}
            {animationState === 'speaking' ? (
              <ellipse cx="92" cy="58" rx="4" ry="3" fill="#F43F5E" />
            ) : (
              <path d="M88 56 Q93 61 98 56" fill="none" stroke="#134E4A" strokeWidth="2" strokeLinecap="round" />
            )}

            {/* Rosy Cheek */}
            <circle cx="82" cy="54" r="3" fill="#F472B6" opacity="0.6" />

            {/* Waving Flipper */}
            <g className={animationState === 'waving' ? 'animate-buddy-arm-wave' : ''} style={{ transformOrigin: '68px 66px' }}>
              <path d="M68 64 C80 66 84 76 74 80 C68 78 66 70 68 64 Z" fill="#14B8A6" stroke="#0F766E" strokeWidth="2" />
            </g>
          </svg>
        );

      case 'owl_pip':
      default:
        return (
          <svg viewBox="0 0 120 120" className="w-full h-full drop-shadow-md select-none overflow-visible">
            {/* Wisdom Glow Aura */}
            <circle cx="60" cy="60" r="54" fill="#E0E7FF" opacity="0.6" className="animate-pulse" />

            {/* Scholar Graduation Cap */}
            <polygon points="60,10 90,20 60,30 30,20" fill="#1E1B4B" stroke="#312E81" strokeWidth="1.5" />
            <rect x="52" y="27" width="16" height="7" rx="3" fill="#312E81" />
            {/* Cap Tassel */}
            <path d="M85 20 Q92 28 88 38" fill="none" stroke="#F59E0B" strokeWidth="2" strokeLinecap="round" />
            <circle cx="88" cy="38" r="2.5" fill="#F59E0B" />

            {/* Owl Body */}
            <ellipse cx="60" cy="68" rx="34" ry="32" fill="#4338CA" stroke="#3730A3" strokeWidth="2.5" />
            {/* Cream Belly with feather chevrons */}
            <ellipse cx="60" cy="74" rx="22" ry="22" fill="#EEF2FF" />
            <path d="M52 68 Q60 74 68 68" fill="none" stroke="#818CF8" strokeWidth="2" strokeLinecap="round" />
            <path d="M50 78 Q60 84 70 78" fill="none" stroke="#818CF8" strokeWidth="2" strokeLinecap="round" />
            <path d="M54 87 Q60 92 66 87" fill="none" stroke="#818CF8" strokeWidth="2" strokeLinecap="round" />

            {/* Feet / Talons */}
            <ellipse cx="48" cy="100" rx="6" ry="3.5" fill="#F59E0B" />
            <ellipse cx="72" cy="100" rx="6" ry="3.5" fill="#F59E0B" />

            {/* Left Eye & Spectacle */}
            <circle cx="46" cy="50" r="14" fill="#FFFFFF" stroke="#F59E0B" strokeWidth="3" />
            <circle cx="46" cy="50" r="6" fill="#1E1B4B" />
            <circle cx="48" cy="48" r="2" fill="#FFFFFF" />

            {/* Right Eye & Spectacle */}
            <circle cx="74" cy="50" r="14" fill="#FFFFFF" stroke="#F59E0B" strokeWidth="3" />
            <circle cx="74" cy="50" r="6" fill="#1E1B4B" />
            <circle cx="76" cy="48" r="2" fill="#FFFFFF" />

            {/* Spectacle Bridge */}
            <path d="M57 49 Q60 46 63 49" fill="none" stroke="#F59E0B" strokeWidth="3" strokeLinecap="round" />

            {/* Owl Golden Beak */}
            <polygon points="56,58 64,58 60,67" fill="#F59E0B" stroke="#D97706" strokeWidth="1.5" />
            {animationState === 'speaking' && (
              <polygon points="57,64 63,64 60,70" fill="#DC2626" />
            )}

            {/* Left Wing */}
            <path
              d="M26 62 Q16 75 28 88 Q34 76 34 64 Z"
              fill="#3730A3"
              stroke="#312E81"
              strokeWidth="2"
            />

            {/* Right Waving Wing */}
            <g
              className={animationState === 'waving' ? 'animate-buddy-arm-wave' : ''}
              style={{ transformOrigin: '86px 64px' }}
            >
              <path
                d="M86 62 Q102 52 98 78 Q90 84 84 72 Z"
                fill="#3730A3"
                stroke="#312E81"
                strokeWidth="2"
              />
            </g>
          </svg>
        );
    }
  };

  return (
    <div className={`relative inline-flex items-center justify-center ${sizeMap[size]} ${className}`}>
      {/* Animated SVG Character */}
      <div className={`w-full h-full ${animClass}`}>
        {renderCharacterSvg()}
      </div>

      {/* Floating Reaction Badge */}
      {showReactionBadge && (
        <>
          {animationState === 'celebrating' && (
            <div className="absolute -top-3 -right-2 bg-amber-400 text-slate-950 p-1 rounded-full shadow-md animate-bounce">
              <span className="text-xs">⭐</span>
            </div>
          )}
          {animationState === 'speaking' && (
            <div className="absolute -top-2 -right-1 bg-blue-500 text-white p-1 rounded-full shadow-sm animate-pulse">
              <span className="text-[10px]">💬</span>
            </div>
          )}
          {animationState === 'waving' && (
            <div className="absolute -top-2 -left-1 bg-amber-100 text-amber-800 p-1 rounded-full shadow-xs border border-amber-300 animate-wiggle">
              <span className="text-[10px]">👋</span>
            </div>
          )}
        </>
      )}
    </div>
  );
};
