'use client';

import React from 'react';
import { KeyButton } from './KeyButton';
import { Delete } from 'lucide-react';

interface NumberKeypadProps {
  shiftActive: boolean;
  onDigit: (digit: string) => void;
  onOperator: (op: string) => void;
  onBackspace: () => void;
  onClear: () => void;
  onEvaluate: () => void;
  onTogglePlusMinus: () => void;
}

export const NumberKeypad: React.FC<NumberKeypadProps> = ({
  shiftActive,
  onDigit,
  onOperator,
  onBackspace,
  onClear,
  onEvaluate,
  onTogglePlusMinus,
}) => {
  return (
    <div className="flex-[4] grid grid-rows-4 grid-cols-5 gap-1.5 px-3 pb-3 bg-slate-900/30 select-none min-h-0">
      {/* Row 1: 7, 8, 9, ⌫, AC */}
      <KeyButton label="7" action={() => onDigit('7')} className="text-lg font-semibold" />
      <KeyButton label="8" action={() => onDigit('8')} className="text-lg font-semibold" />
      <KeyButton label="9" action={() => onDigit('9')} className="text-lg font-semibold" />
      <button
        onClick={onBackspace}
        className="aurikrex-key bg-slate-800 text-slate-300 hover:text-white"
        title="Backspace"
      >
        <Delete className="w-5 h-5" />
      </button>
      <KeyButton label="AC" action={onClear} isAC />

      {/* Row 2: 4, 5, 6, ×, ÷ */}
      <KeyButton label="4" action={() => onDigit('4')} className="text-lg font-semibold" />
      <KeyButton label="5" action={() => onDigit('5')} className="text-lg font-semibold" />
      <KeyButton label="6" action={() => onDigit('6')} className="text-lg font-semibold" />
      <KeyButton label="×" action={() => onOperator(' × ')} className="text-xl text-blue-400 font-bold" />
      <KeyButton label="÷" action={() => onOperator(' ÷ ')} className="text-xl text-blue-400 font-bold" />

      {/* Row 3: 1, 2, 3, +, − */}
      <KeyButton label="1" action={() => onDigit('1')} className="text-lg font-semibold" />
      <KeyButton label="2" action={() => onDigit('2')} className="text-lg font-semibold" />
      <KeyButton label="3" action={() => onDigit('3')} className="text-lg font-semibold" />
      <KeyButton label="+" action={() => onOperator(' + ')} className="text-xl text-blue-400 font-bold" />
      <KeyButton label="−" action={() => onOperator(' − ')} className="text-xl text-blue-400 font-bold" />

      {/* Row 4: 0, ., ×10ˣ, Ans, = */}
      <KeyButton label="0" action={() => onDigit('0')} className="text-lg font-semibold" />
      <KeyButton
        label="."
        alternates={{ shift: '±' }}
        shiftActive={shiftActive}
        action={() => (shiftActive ? onTogglePlusMinus() : onDigit('.'))}
        className="text-lg font-semibold"
      />
      <KeyButton
        label="×10ˣ"
        alternates={{ shift: 'π' }}
        shiftActive={shiftActive}
        action={() => (shiftActive ? onDigit('π') : onOperator(' × 10^'))}
        className="text-xs font-semibold"
      />
      <KeyButton
        label="Ans"
        alternates={{ shift: 'e' }}
        shiftActive={shiftActive}
        action={() => (shiftActive ? onDigit('e') : onDigit('Ans'))}
        className="text-xs font-semibold text-blue-300"
      />
      <KeyButton label="=" action={onEvaluate} isEquals />
    </div>
  );
};
