'use client';
import React from 'react';
import { Delete } from 'lucide-react';
import { KeyButton } from './KeyButton';

interface NumberKeypadProps {
  shiftActive: boolean;
  onDigit: (digit: string) => void;
  onOperator: (op: string) => void;
  onBackspace: () => void;
  onClear: () => void;
  onEvaluate: () => void;
  onTogglePlusMinus: () => void;
}

/** The primary surface intentionally follows a familiar standard-calculator layout. */
export const NumberKeypad: React.FC<NumberKeypadProps> = ({
  onDigit,
  onOperator,
  onBackspace,
  onClear,
  onEvaluate,
  onTogglePlusMinus,
}) => (
  <section aria-label="Standard calculator keypad" className="calculator-keypad">
    <div className="keypad-row keypad-row-utility" aria-label="Calculator controls">
      <KeyButton label="AC" action={onClear} isAC />
      <button type="button" onClick={onBackspace} className="aurikrex-key key-muted" title="Backspace" aria-label="Backspace">
        <Delete className="w-5 h-5" />
      </button>
      <KeyButton label="%" action={() => onOperator(' % ')} className="key-muted text-lg" />
      <KeyButton label="÷" action={() => onOperator(' ÷ ')} isSpecial className="key-operator text-xl" />
    </div>
    <div className="keypad-row">
      <KeyButton label="7" action={() => onDigit('7')} className="key-number" />
      <KeyButton label="8" action={() => onDigit('8')} className="key-number" />
      <KeyButton label="9" action={() => onDigit('9')} className="key-number" />
      <KeyButton label="×" action={() => onOperator(' × ')} isSpecial className="key-operator text-xl" />
    </div>
    <div className="keypad-row">
      <KeyButton label="4" action={() => onDigit('4')} className="key-number" />
      <KeyButton label="5" action={() => onDigit('5')} className="key-number" />
      <KeyButton label="6" action={() => onDigit('6')} className="key-number" />
      <KeyButton label="−" action={() => onOperator(' − ')} isSpecial className="key-operator text-xl" />
    </div>
    <div className="keypad-row">
      <KeyButton label="1" action={() => onDigit('1')} className="key-number" />
      <KeyButton label="2" action={() => onDigit('2')} className="key-number" />
      <KeyButton label="3" action={() => onDigit('3')} className="key-number" />
      <KeyButton label="+" action={() => onOperator(' + ')} isSpecial className="key-operator text-xl" />
    </div>
    <div className="keypad-row">
      <KeyButton label="±" action={onTogglePlusMinus} className="key-muted text-lg" />
      <KeyButton label="0" action={() => onDigit('0')} className="key-number" />
      <KeyButton label="." action={() => onDigit('.')} className="key-number text-xl" />
      <KeyButton label="=" action={onEvaluate} isEquals />
    </div>
  </section>
);
