
import React from 'react';
import { PasswordStrength } from '../types';

interface StrengthMeterProps {
  strength: PasswordStrength;
  score: number;
}

const StrengthMeter: React.FC<StrengthMeterProps> = ({ strength, score }) => {
  const getBarColor = () => {
    if (score <= 2) return 'bg-red-500';
    if (score <= 4) return 'bg-yellow-500';
    return 'bg-green-500';
  };

  const getTextColor = () => {
    if (score <= 2) return 'text-red-400';
    if (score <= 4) return 'text-yellow-400';
    return 'text-green-400';
  };

  return (
    <div className="w-full space-y-2">
      <div className="flex justify-between items-center">
        <span className="text-sm text-slate-400">Security Level</span>
        <span className={`text-sm font-bold ${getTextColor()}`}>{strength.toUpperCase()}</span>
      </div>
      <div className="h-3 w-full bg-slate-800 rounded-full overflow-hidden flex gap-1 p-0.5">
        {[1, 2, 3, 4, 5].map((idx) => (
          <div
            key={idx}
            className={`h-full flex-1 rounded-sm transition-all duration-500 ${
              idx <= score ? getBarColor() : 'bg-slate-700'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default StrengthMeter;
