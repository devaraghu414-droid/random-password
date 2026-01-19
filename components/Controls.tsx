
import React from 'react';
import { PasswordOptions } from '../types';

interface ControlsProps {
  options: PasswordOptions;
  setOptions: React.Dispatch<React.SetStateAction<PasswordOptions>>;
}

const Controls: React.FC<ControlsProps> = ({ options, setOptions }) => {
  const toggleOption = (key: keyof PasswordOptions) => {
    setOptions(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const handleLengthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setOptions(prev => ({ ...prev, length: parseInt(e.target.value) }));
  };

  return (
    <div className="mt-8 space-y-6">
      <div className="space-y-4">
        <div className="flex justify-between px-1">
          <span className="text-slate-300 font-medium">Character Length</span>
          <span className="text-indigo-400 mono font-bold text-xl">{options.length}</span>
        </div>
        <input
          type="range"
          min="4"
          max="50"
          value={options.length}
          onChange={handleLengthChange}
          className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-indigo-500"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <OptionToggle
          label="Uppercase Letters"
          active={options.useUppercase}
          onClick={() => toggleOption('useUppercase')}
        />
        <OptionToggle
          label="Lowercase Letters"
          active={options.useLowercase}
          onClick={() => toggleOption('useLowercase')}
        />
        <OptionToggle
          label="Numbers"
          active={options.useNumbers}
          onClick={() => toggleOption('useNumbers')}
        />
        <OptionToggle
          label="Symbols"
          active={options.useSymbols}
          onClick={() => toggleOption('useSymbols')}
        />
      </div>
    </div>
  );
};

interface OptionToggleProps {
  label: string;
  active: boolean;
  onClick: () => void;
}

const OptionToggle: React.FC<OptionToggleProps> = ({ label, active, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={`flex items-center justify-between p-4 rounded-xl border transition-all duration-200 ${
        active 
          ? 'bg-indigo-500/10 border-indigo-500/50 text-white' 
          : 'bg-slate-900/50 border-slate-800 text-slate-500 hover:border-slate-700'
      }`}
    >
      <span className="text-sm font-medium">{label}</span>
      <div className={`w-10 h-5 rounded-full relative transition-colors duration-200 ${active ? 'bg-indigo-600' : 'bg-slate-700'}`}>
        <div className={`absolute top-1 w-3 h-3 bg-white rounded-full transition-all duration-200 ${active ? 'left-6' : 'left-1'}`} />
      </div>
    </button>
  );
};

export default Controls;
