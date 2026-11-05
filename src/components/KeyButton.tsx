'use client';

import React from 'react';

export interface KeyModifierAlternates {
  shift?: string;
  alpha?: string;
  inv?: string;
  hyp?: string;
  invHyp?: string;
}

interface KeyButtonProps {
  label: string;
  action: () => void;
  alternates?: KeyModifierAlternates;
  shiftActive?: boolean;
  alphaActive?: boolean;
  invActive?: boolean;
  hypActive?: boolean;
  className?: string;
  isSpecial?: boolean;
  isEquals?: boolean;
  isAC?: boolean;
  tooltip?: string;
}

export const KeyButton: React.FC<KeyButtonProps> = ({
  label,
  action,
  alternates,
  shiftActive = false,
  alphaActive = false,
  invActive = false,
  hypActive = false,
  className = '',
  isSpecial = false,
  isEquals = false,
  isAC = false,
  tooltip,
}) => {
  // Determine current active display label and active color
  let activeLabel = label;
  let labelColor = 'text-slate-100';
  let isDimmed = false;

  if (invActive && hypActive && alternates?.invHyp) {
    activeLabel = alternates.invHyp;
    labelColor = 'text-pink-300';
  } else if (invActive && alternates?.inv) {
    activeLabel = alternates.inv;
    labelColor = 'text-amber-300';
  } else if (hypActive && alternates?.hyp) {
    activeLabel = alternates.hyp;
    labelColor = 'text-pink-300';
  } else if (shiftActive && alternates?.shift) {
    activeLabel = alternates.shift;
    labelColor = 'text-cyan-300';
  } else if (alphaActive && alternates?.alpha) {
    activeLabel = alternates.alpha;
    labelColor = 'text-violet-300';
  } else if (shiftActive || alphaActive || invActive || hypActive) {
    // Has no alternate for the active modifier: keep normal label dimmed, NEVER blank
    isDimmed = true;
    labelColor = 'text-slate-500';
  }

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (typeof window !== 'undefined' && navigator.vibrate) {
      try {
        navigator.vibrate(10);
      } catch {}
    }
    action();
  };

  if (isEquals) {
    return (
      <button
        onClick={handleClick}
        title={tooltip || 'Equals'}
        className={`aurikrex-key aurikrex-equals-key font-mono font-bold text-xl ${className}`}
      >
        <span>=</span>
      </button>
    );
  }

  if (isAC) {
    return (
      <button
        onClick={handleClick}
        title={tooltip || 'All Clear'}
        className={`aurikrex-key bg-red-950/40 text-red-400 hover:bg-red-900/50 border border-red-900/50 font-mono font-bold text-base active:bg-red-800/60 ${className}`}
      >
        <span>AC</span>
      </button>
    );
  }

  return (
    <button
      onClick={handleClick}
      title={tooltip}
      className={`aurikrex-key relative text-sm font-mono overflow-hidden ${
        isSpecial ? 'bg-slate-800 text-slate-200' : 'bg-slate-800/80'
      } ${isDimmed ? 'opacity-60' : 'opacity-100'} ${className}`}
    >
      {/* Corner indicators for modifiers when idle */}
      {!shiftActive && !alphaActive && alternates && (
        <div className="absolute top-1 inset-x-1.5 flex justify-between pointer-events-none text-[8px] leading-none">
          {alternates.shift ? (
            <span className="text-cyan-400/80 font-mono scale-90 origin-top-left">{alternates.shift}</span>
          ) : <span />}
          {alternates.alpha ? (
            <span className="text-violet-400/80 font-mono scale-90 origin-top-right">{alternates.alpha}</span>
          ) : <span />}
        </div>
      )}

      {/* Main key label with smooth transition */}
      <span className={`transition-all duration-150 transform ${labelColor} font-medium tracking-tight text-center px-1`}>
        {activeLabel}
      </span>
    </button>
  );
};
