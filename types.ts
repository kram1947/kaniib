export enum Difficulty {
  Easy = 'Easy',
  Medium = 'Medium',
  Hard = 'Hard',
  Challenger = 'AoPS/Competition'
}

export enum QuestionType {
  Standard = 'Standard',
  RealWorld = 'RealWorld'
}

export interface Question {
  id: string;
  text: string;
  options: string[];
  correctAnswerIndex: number;
  explanation: string;
  difficulty: Difficulty;
  type: QuestionType;
  topicId: string;
}

export interface Topic {
  id: string;
  title: string;
  description: string;
  iconName: string; // Mapping to Lucide icons
  questionCount: number;
}

export interface QuizState {
  currentTopicId: string | null;
  questions: Question[];
  currentQuestionIndex: number;
  answers: Record<string, number>; // questionId -> selectedOptionIndex (or -1 for skipped)
  timeRemaining: number; // in seconds
  isActive: boolean;
  isFinished: boolean;
  score: number;
  history: Array<{
    questionId: string;
    isCorrect: boolean;
    timeTaken: number;
    skipped: boolean;
  }>;
}

export interface SWOTAnalysis {
  strengths: string[];
  weaknesses: string[];
  opportunities: string[];
  threats: string[];
  summary: string;
}
