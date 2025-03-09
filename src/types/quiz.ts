export type QuestionType = "mcq" | "trueFalse" | "shortAnswer" | "fillBlanks";

export type ContentType = "text" | "pdf" | "image" | "document";

export interface QuizConfig {
  questionTypes: QuestionType[];
  questionCount: number;
  timeLimit: number; // in minutes
  difficulty: "easy" | "medium" | "hard";
}

export interface Question {
  id: string;
  quizId: string;
  questionText: string;
  questionType: QuestionType;
  options?: string[];
  correctAnswer: string;
  explanation?: string;
}

export interface Quiz {
  id: string;
  userId: string;
  title: string;
  description?: string;
  contentType: ContentType;
  content?: string;
  filePath?: string;
  questionCount: number;
  timeLimit?: number;
  createdAt: string;
  updatedAt: string;
  questions?: Question[];
}

export interface QuizAttempt {
  id: string;
  quizId: string;
  userId: string;
  score?: number;
  totalQuestions: number;
  timeTaken?: number;
  completed: boolean;
  startedAt: string;
  completedAt?: string;
  answers?: AttemptAnswer[];
}

export interface AttemptAnswer {
  id: string;
  attemptId: string;
  questionId: string;
  userAnswer?: string;
  isCorrect?: boolean;
}
