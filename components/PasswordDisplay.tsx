
import React, { useState, useEffect } from 'react';
import { Copy, Check, RefreshCw } from 'lucide-react';

interface PasswordDisplayProps {
  password: string;
  onRegenerate: () => void;
}

const PasswordDisplay: React.FC<PasswordDisplayProps> = ({ password, onRegenerate }) => {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (copied) {
      const timer = setTimeout(() => setCopied(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [copied]);

  const handleCopy = async () => {
    if (!password) return;
    try {
      await navigator.clipboard.writeText(password);
      setCopied(true);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  return (
    <div className="relative group">
      <div className="w-full bg-slate-900/50 border border-slate-700/50 rounded-2xl p-6 flex items-center justify-between backdrop-blur-sm transition-all duration-300 group-hover:border-indigo-500/50">
        <div className="overflow-x-auto scrollbar-hide mr-4">
          <span className={`text-2xl md:text-3xl mono break-all tracking-wider ${password ? 'text-slate-100' : 'text-slate-500'}`}>
            {password || 'P4ssw0rd!'}
          </span>
        </div>
        
        <div className="flex gap-2 flex-shrink-0">
          <button
            onClick={onRegenerate}
            className="p-3 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl transition-all active:scale-95"
            title="Regenerate"
          >
            <RefreshCw size={20} className={password ? '' : 'animate-spin'} />
          </button>
          
          <button
            onClick={handleCopy}
            className={`p-3 rounded-xl transition-all active:scale-95 flex items-center gap-2 ${
              copied ? 'bg-green-600/20 text-green-400' : 'bg-indigo-600 hover:bg-indigo-500 text-white'
            }`}
          >
            {copied ? <Check size={20} /> : <Copy size={20} />}
            <span className="hidden sm:inline font-medium">{copied ? 'Copied' : 'Copy'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default PasswordDisplay;
