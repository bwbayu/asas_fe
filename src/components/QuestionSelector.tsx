import { useEffect, useState } from "react";
import { getQuestions } from "@/api/api";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Question {
  dataset_id: string;
  question: string;
  reference_answer: string;
}

interface QuestionSelectorProps {
  scenario: string;
  setQuestion: (question: string) => void;
  setReference: (reference: string) => void;
  setDatasetId: (datasetId: string) => void;
}

export default function QuestionSelector({
  scenario,
  setQuestion,
  setReference,
  setDatasetId,
}: QuestionSelectorProps) {
  const [questions, setQuestions] = useState<Question[]>([]);

  useEffect(() => {
    if (!scenario) return;
    getQuestions(scenario).then((res) => {
      setQuestions(res.data)
    });
  }, [scenario]);

  const questionHandler = (datasetId: string) => {
    setDatasetId(datasetId);
    const data = questions.find((q) => q.dataset_id === datasetId);
    setQuestion(data?.question || "");
    setReference(data?.reference_answer || "");
  };

  return (
    <Select onValueChange={questionHandler}>
      <SelectTrigger className="w-full mt-2 text-white">
        <SelectValue placeholder="Select Question" />
      </SelectTrigger>
      <SelectContent>
        {questions.length > 0 ? (
          questions.map((q) => (
            <SelectItem key={q.dataset_id} value={q.dataset_id}>
              {q.question}
            </SelectItem>
          ))
        ) : (
          <SelectItem value="no-data" disabled>
            Data Not Found
          </SelectItem>
        )}
      </SelectContent>
    </Select>
  );
}
