
import { PasswordOptions, StrengthScore } from '../types';

const UPPERCASE = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const LOWERCASE = 'abcdefghijklmnopqrstuvwxyz';
const NUMBERS = '0123456789';
const SYMBOLS = '!@#$%^&*()_+-=[]{}|;:,.<>?';

export const generatePassword = (options: PasswordOptions): string => {
  let charset = '';
  if (options.useUppercase) charset += UPPERCASE;
  if (options.useLowercase) charset += LOWERCASE;
  if (options.useNumbers) charset += NUMBERS;
  if (options.useSymbols) charset += SYMBOLS;

  if (charset === '') return '';

  let password = '';
  const array = new Uint32Array(options.length);
  window.crypto.getRandomValues(array);

  for (let i = 0; i < options.length; i++) {
    password += charset[array[i] % charset.length];
  }

  return password;
};

export const calculateStrength = (password: string): StrengthScore => {
  let score = 0;
  if (!password) return { score: 0, label: 'weak', color: 'bg-red-500' };

  if (password.length >= 8) score++;
  if (password.length >= 14) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/[0-9]/.test(password)) score++;
  if (/[^A-Za-z0-9]/.test(password)) score++;

  // Normalize score to 0-4 range
  const finalScore = Math.min(4, Math.floor((score / 5) * 4));

  const map: Record<number, StrengthScore> = {
    0: { score: 0, label: 'weak', color: 'bg-red-500' },
    1: { score: 1, label: 'fair', color: 'bg-orange-500' },
    2: { score: 2, label: 'good', color: 'bg-yellow-500' },
    3: { score: 3, label: 'strong', color: 'bg-green-500' },
    4: { score: 4, label: 'epic', color: 'bg-indigo-500' },
  };

  return map[finalScore];
};
