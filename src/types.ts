export interface Project {
  id: string;
  title: string;
  category: 'ml' | 'bi' | 'sql' | 'excel';
  categoryLabel: string;
  icon: string;
  description: string;
  tags: string[];
  bullets: string[];
  hasSimulator: boolean;
  simulatorType?: 'ctc' | 'bike' | 'ipl' | 'wefit' | 'churn';
  githubUrl?: string;
  liveDemoUrl?: string;
}

export interface Skill {
  name: string;
  category: 'core' | 'ml' | 'bi' | 'tools';
  categoryLabel?: string;
  icon: string;
  level: number; // percentage
  description: string;
  snippet?: string;
  snippetTitle?: string;
}

export interface Certification {
  id: string;
  title: string;
  issuer: string;
  date: string;
  icon: string;
  skillsLearned: string[];
  credentialId?: string;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  timestamp: string;
}
