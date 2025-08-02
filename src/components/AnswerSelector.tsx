import { type Answer } from "@/api/api";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";


interface AnswerSelectorProps {
  setAnswer: (answer: string) => void;
  setScore: (score: number) => void;
  answers: Answer[]
}

export default function AnswerSelector({
  setAnswer,
  setScore,
  answers
}: AnswerSelectorProps) {
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