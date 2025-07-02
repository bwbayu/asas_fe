import { Textarea } from "@/components/ui/textarea";

type AnswerInputProps = {
  answer: string;
  setAnswer: (value: string) => void;
};

export default function AnswerInput({ answer, setAnswer }: AnswerInputProps) {
  return (
    <Textarea
      value={answer}
      onChange={(e) => setAnswer(e.target.value)}
      placeholder="Type your answer here"
    />
  );
}
