
import React from 'react';
import { PasswordHistoryItem } from '../types';
import { History as HistoryIcon, Copy, Trash2 } from 'lucide-react';

interface HistoryProps {
  history: PasswordHistoryItem[];
  onClear: () => void;
}

const History: React.FC<HistoryProps> = ({ history, onClear }) => {
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  if (history.length === 0) return null;

  return (
    <div className="mt-10 border-t border-slate-800 pt-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2 text-slate-400">
          <HistoryIcon size={18} />
          <h3 className="font-semibold uppercase tracking-widest text-xs">Recent Vaults</h3>
        </div>
        <button 
          onClick={onClear}
          className="text-xs text-slate-500 hover:text-red-400 transition-colors flex items-center gap-1"
        >
          <Trash2 size={14} /> Clear All
        </button>
      </div>
      
      <div className="space-y-3 max-h-60 overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-slate-800">
        {history.map((item) => (
          <div 
            key={item.id}
            className="flex items-center justify-between p-3 bg-slate-900/30 rounded-lg group border border-transparent hover:border-slate-800 transition-all"
          >
            <div className="flex flex-col gap-1 overflow-hidden mr-2">
              <span className="mono text-sm text-slate-300 truncate">{item.value}</span>
              <span className="text-[10px] text-slate-600">
                {new Date(item.timestamp).toLocaleTimeString()} • {item.strength}
              </span>
            </div>
            <button
              onClick={() => copyToClipboard(item.value)}
              className="p-2 text-slate-500 hover:text-indigo-400 hover:bg-slate-800 rounded-md transition-all opacity-0 group-hover:opacity-100"
            >
              <Copy size={14} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default History;
