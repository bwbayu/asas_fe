import axios from 'axios';
// const BASE = import.meta.env.VITE_API_URL;

const BASE = 'http://127.0.0.1:5000';

export interface Question {
  dataset_id: string;
  question: string;
  reference_answer: string;
}

export interface Answer {
  answer: string;
  score: number;
}

export interface ScoreResponse {
  direct_score: number;
  similarity_score: number;
}

export const getQuestions = () =>
  axios.get<Question[]>(`${BASE}/questions`);

export const getAnswers = (dataset_id: string) =>
  axios.get<Answer[]>(`${BASE}/student_answer`, {
    params: { dataset_id },
});

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
