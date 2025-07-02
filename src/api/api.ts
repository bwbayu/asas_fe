import axios from 'axios';

const BASE = 'http://localhost:5000';

// --- Define types for expected response data ---
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

// --- API calls with typed responses ---
export const getQuestions = (scenario: string) =>
  axios.get<Question[]>(`${BASE}/questions`, { params: { scenario } });

export const getAnswers = (scenario: string, dataset_id: string) =>
  axios.get<Answer[]>(`${BASE}/student_answer`, {
    params: { scenario, dataset_id },
});

export const getScore = async (
  answer: string,
  reference: string,
  scenario: string
): Promise<ScoreResponse> => {
  const res = await axios.post<{ direct_score: number; similarity_score: number }>(
    `${BASE}/score`,
    { answer, reference, scenario }
  );
  return res.data;
};
