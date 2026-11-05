'use client';

import React, { useRef, useEffect } from 'react';

interface InputLineProps {
  value: string;
  cursorPosition: number;
  onSetCursorPosition: (pos: number) => void;
  error?: string | null;
}

export const InputLine: React.FC<InputLineProps> = ({
  value,
  cursorPosition,
  onSetCursorPosition,
  error,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  // Auto scroll horizontally to cursor if expression overflows
  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollLeft = containerRef.current.scrollWidth;
    }
  }, [value, cursorPosition]);

  const beforeCursor = value.slice(0, cursorPosition);
  const atCursor = value.slice(cursorPosition, cursorPosition + 1);
  const afterCursor = value.slice(cursorPosition + 1);

  return (
    <div className="h-[48px] min-h-[48px] px-4 flex flex-col justify-center border-b-2 border-blue-500/80 bg-slate-900/40 relative">
      <div
        ref={containerRef}
        onClick={(e) => {
          // If clicked near end, move cursor to end
          onSetCursorPosition(value.length);
        }}
        className="flex items-center text-slate-100 font-mono text-[26px] leading-none overflow-x-auto whitespace-nowrap scrollbar-none py-1 select-none"
      >
        <span>{beforeCursor}</span>
        {/* Blinking blue caret */}
        <span className="relative inline-block w-[2px] h-[28px] bg-blue-400 mx-[1px] animate-pulse">
          {atCursor && (
            <span className="absolute left-0 top-0 text-slate-100 opacity-90">{atCursor}</span>
          )}
        </span>
        <span>{afterCursor}</span>

        {value.length === 0 && (
          <span className="text-slate-600 text-lg select-none">0</span>
        )}
      </div>

      {error && (
        <div className="absolute right-3 top-1 text-[11px] text-amber-400 font-sans font-medium bg-amber-950/80 px-1.5 py-0.5 rounded border border-amber-600/50">
          {error}
        </div>
      )}
    </div>
  );
};
