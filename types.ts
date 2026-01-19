
export interface PasswordOptions {
  length: number;
  useUppercase: boolean;
  useLowercase: boolean;
  useNumbers: boolean;
  useSymbols: boolean;
}

export interface PasswordHistoryItem {
  id: string;
  value: string;
  strength: 'weak' | 'fair' | 'good' | 'strong' | 'epic';
  timestamp: number;
}

export interface StrengthScore {
  score: number; // 0-4
  label: 'weak' | 'fair' | 'good' | 'strong' | 'epic';
  color: string;
}
