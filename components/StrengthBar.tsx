
import React from 'react';
import { StrengthScore } from '../types';

interface StrengthBarProps {
  strength: StrengthScore;
}

const StrengthBar: React.FC<StrengthBarProps> = ({ strength }) => {
  return (
    <div className="mt-6 space-y-2">
      <div className="flex justify-between items-center px-1">
        <span className="text-sm font-medium text-slate-400 uppercase tracking-widest">Security Strength</span>
        <span className={`text-sm font-bold uppercase tracking-wider ${strength.color.replace('bg-', 'text-')}`}>
          {strength.label}
        </span>
      </div>
      <div className="flex gap-2 h-2 w-full">
        {[0, 1, 2, 3].map((index) => (
          <div
            key={index}
            className={`h-full flex-1 rounded-full transition-all duration-500 ${
              index <= strength.score ? strength.color : 'bg-slate-800'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default StrengthBar;
