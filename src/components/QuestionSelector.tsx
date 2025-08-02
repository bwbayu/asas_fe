import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { Question } from "@/api/api";

interface QuestionSelectorProps {
  setQuestion: (question: string) => void;
  setReference: (reference: string) => void;
  setDatasetId: (datasetId: string) => void;
  questions: Question[];
}

export default function QuestionSelector({
  setQuestion,
  setReference,
  setDatasetId,
  questions,
}: QuestionSelectorProps) {
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
