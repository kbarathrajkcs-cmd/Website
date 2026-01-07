
export interface StrengthCriteria {
  length: boolean;
  uppercase: boolean;
  lowercase: boolean;
  number: boolean;
  special: boolean;
}

export type PasswordStrength = 'Weak' | 'Medium' | 'Strong';

export interface AnalysisResult {
  score: number;
  strength: PasswordStrength;
  criteria: StrengthCriteria;
  feedback: string[];
}

export interface ChatMessage {
  role: 'user' | 'model';
  content: string;
}
