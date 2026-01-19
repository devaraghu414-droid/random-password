
import React, { useState, useEffect } from 'react';
import { GoogleGenAI } from '@google/genai';
import { ShieldCheck, Sparkles } from 'lucide-react';

interface AITipsProps {
  passwordStrength: string;
}

const AITips: React.FC<AITipsProps> = ({ passwordStrength }) => {
  const [tip, setTip] = useState<string>('Analyzing security landscape...');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTip = async () => {
      setLoading(true);
      try {
        const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
        const response = await ai.models.generateContent({
          model: 'gemini-3-flash-preview',
          contents: `Provide one short, professional, and slightly futuristic security tip for someone using a password with ${passwordStrength} strength. Keep it under 15 words.`,
          config: { temperature: 0.7 }
        });
        setTip(response.text || "Always use unique passwords for every digital vault you own.");
      } catch (error) {
        setTip("Multi-factor authentication is your second layer of defense.");
      } finally {
        setLoading(false);
      }
    };

    fetchTip();
  }, [passwordStrength]);

  return (
    <div className="mt-8 p-4 bg-indigo-500/5 rounded-2xl border border-indigo-500/10 flex gap-4 items-center">
      <div className="bg-indigo-500/10 p-2 rounded-lg text-indigo-400 shrink-0">
        <Sparkles size={20} />
      </div>
      <div>
        <h4 className="text-[10px] uppercase tracking-[0.2em] text-indigo-400/70 font-bold mb-1">AI Security Insight</h4>
        <p className={`text-sm text-slate-300 italic transition-opacity duration-500 ${loading ? 'opacity-50' : 'opacity-100'}`}>
          "{tip}"
        </p>
      </div>
    </div>
  );
};

export default AITips;
