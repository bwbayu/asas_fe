import axios from 'axios';
const BASE = import.meta.env.VITE_API_URL;

export interface Question {
  dataset_id: string;
  question: string;
  reference_answer: string;
}

export interface Answer {
  answer: string;
  score: number;
}

export type AnswersMap = Record<string, Answer[]>;

export interface ScoreResponse {
  direct_score: number;
  similarity_score: number;
}

export const getQuestions = () =>
  axios.get<Question[]>(`${BASE}/questions`);

export const getAnswers = () =>
  axios.get<AnswersMap>(`${BASE}/student_answer`);

export const getScore = async (
  answer: string,
  reference: string
): Promise<ScoreResponse> => {
  const res = await axios.post<{ direct_score: number; similarity_score: number }>(
    `${BASE}/score`,
    { answer, reference }
  );
  return res.data;
};
