import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

interface ScenarioSelectorProps {
  scenario: string;
  setScenario: (value: string) => void;
}

export default function ScenarioSelector({ scenario, setScenario }: ScenarioSelectorProps) {
  return (
    <Select value={scenario} onValueChange={setScenario}>
      <SelectTrigger className="w-full text-white">
        <SelectValue placeholder="Select Scenario" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="specific-prompt">Specific Prompt</SelectItem>
        <SelectItem value="cross-prompt">Cross Prompt</SelectItem>
      </SelectContent>
    </Select>
  );
}
