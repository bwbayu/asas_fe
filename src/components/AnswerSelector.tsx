import { useEffect, useState } from "react";
import { getAnswers } from "@/api/api";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Answer {
  answer: string;
  score: number;
}

interface AnswerSelectorProps {
  setAnswer: (answer: string) => void;
  datasetId: string | null;
  scenario: string;
  setScore: (score: number) => void;
}

export default function AnswerSelector({
  setAnswer,
  datasetId,
  scenario,
  setScore,
}: AnswerSelectorProps) {
  const [answers, setAnswers] = useState<Answer[]>([]);

  useEffect(() => {
    if (!datasetId) return;
    getAnswers(scenario, datasetId).then((res) => setAnswers(res.data));
  }, [datasetId, scenario]);

  const answerHandler = (index: string) => {
    const idx = parseInt(index);
    const selected = answers[idx];
    if (selected) {
      setAnswer(selected.answer);
      setScore(selected.score);
    }
  };

  return (
    <Select onValueChange={answerHandler}>
      <SelectTrigger className="w-full mt-2 text-white">
        <SelectValue placeholder="Choose Answer" />
      </SelectTrigger>
      <SelectContent>
        {answers.length > 0 ? (
          answers.map((data, idx) => (
            <SelectItem key={idx} value={idx.toString()}>
              {data.answer}
            </SelectItem>
          ))
        ) : (
          <SelectItem value="no-data" disabled>
            No Answers Found
          </SelectItem>
        )}
      </SelectContent>
    </Select>
  );
}