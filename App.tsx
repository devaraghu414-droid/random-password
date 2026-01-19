
import React, { useState, useEffect, useCallback } from 'react';
import { Shield, ShieldAlert, ShieldCheck } from 'lucide-react';
import PasswordDisplay from './components/PasswordDisplay';
import Controls from './components/Controls';
import StrengthBar from './components/StrengthBar';
import History from './components/History';
import AITips from './components/AITips';
import { generatePassword, calculateStrength } from './utils/passwordUtils';
import { PasswordOptions, PasswordHistoryItem } from './types';

const App: React.FC = () => {
  const [options, setOptions] = useState<PasswordOptions>({
    length: 16,
    useUppercase: true,
    useLowercase: true,
    useNumbers: true,
    useSymbols: true,
  });

  const [password, setPassword] = useState('');
  const [history, setHistory] = useState<PasswordHistoryItem[]>([]);
  const strength = calculateStrength(password);

  const handleGenerate = useCallback(() => {
    const newPassword = generatePassword(options);
    if (!newPassword) return;
    
    setPassword(newPassword);
    
    // Calculate strength for history
    const s = calculateStrength(newPassword);
    
    setHistory(prev => [
      {
        id: crypto.randomUUID(),
        value: newPassword,
        strength: s.label,
        timestamp: Date.now()
      },
      ...prev.slice(0, 9) // Keep last 10
    ]);
  }, [options]);

  // Initial generation
  useEffect(() => {
    handleGenerate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center p-4 sm:p-8">
      <div className="w-full max-w-2xl bg-slate-900/40 backdrop-blur-xl border border-slate-800 rounded-[2.5rem] p-6 sm:p-10 shadow-2xl relative overflow-hidden">
        {/* Decorative background elements */}
        <div className="absolute -top-24 -right-24 w-64 h-64 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

        <header className="flex items-center gap-4 mb-10 relative z-10">
          <div className="p-3 bg-indigo-600 rounded-2xl shadow-lg shadow-indigo-500/20">
            <ShieldCheck className="text-white" size={32} />
          </div>
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-white">VaultGen</h1>
            <p className="text-slate-400 text-sm font-medium tracking-wide">SECURE ARCHITECT v3.0</p>
          </div>
        </header>

        <main className="relative z-10">
          <PasswordDisplay 
            password={password} 
            onRegenerate={handleGenerate} 
          />
          
          <StrengthBar strength={strength} />
          
          <Controls options={options} setOptions={setOptions} />

          <AITips passwordStrength={strength.label} />
          
          <History history={history} onClear={() => setHistory([])} />
        </main>

        <footer className="mt-10 text-center text-slate-600 text-[10px] tracking-widest uppercase font-medium">
          Encrypted with Web Crypto API • Military Grade Randomization
        </footer>
      </div>
    </div>
  );
};

export default App;
