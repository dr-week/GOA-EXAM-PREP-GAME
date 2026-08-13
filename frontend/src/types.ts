export interface Question {
  id: string;
  question: string;
  options: string[];
  answer: string;
  explanation: string;
  subject?: string;
  category?: string;
}
