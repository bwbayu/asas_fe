import { useState } from 'react';
import ScenarioSelector from "./components/ScenarioSelector";
import QuestionSelector from './components/QuestionSelector';
import AnswerInput from './components/AnswerInput';
import AnswerSelector from './components/AnswerSelector';
import { getScore } from './api/api';

function App() {
  const [scenario, setScenario] = useState<string>('');
  const [datasetId, setDatasetId] = useState<string>('');
  const [question, setQuestion] = useState<string>('');
  const [reference, setReference] = useState<string>('');
  const [answer, setAnswer] = useState<string>('');
  const [direct, setDirect] = useState<number>(0);
  const [similarity, setSimilarity] = useState<number>(0);
  const [score, setScore] = useState<number>(0);
  const [inputMode, setInputMode] = useState<'manual' | 'select'>('manual');

  const handleSubmit = async () => {
    if (!answer.trim()) {
      alert("Answer cannot be empty.");
      return;
    }

    try {
      const res = await getScore(answer, reference, scenario);
        setDirect(res.direct_score);
        setSimilarity(res.similarity_score);
    } catch (err) {
      console.error("Error fetching score:", err);
      alert("Failed to get score. Please try again.");
    }
  };

  const handleInputModeChange = (mode: 'manual' | 'select') => {
    setInputMode(mode);
    setAnswer('');
    setScore(0);
  };

  return (
    <div className="flex items-center justify-center h-screen w-screen bg-base-200">
    <div className="card w-full max-w-4xl bg-base-100 shadow-xl p-10 space-y-6 mx-auto">
          <h1 className="text-4xl font-bold text-center text-primary">ASAS Demo</h1>

          <div className="form-control">
            <label className="label font-semibold">Scenario</label>
            <ScenarioSelector scenario={scenario} setScenario={setScenario} />
          </div>

          <div className="form-control">
            <label className="label font-semibold">Question</label>
            <QuestionSelector
              scenario={scenario}
              setQuestion={setQuestion}
              setReference={setReference}
              setDatasetId={setDatasetId}
            />
          </div>

          {question && (
            <div className="bg-base-100 border border-base-300 rounded p-4">
              <p className="mb-2"><span className="font-semibold">Question:</span> {question}</p>
              <p><span className="font-semibold">Reference:</span> {reference}</p>
            </div>
          )}

          <div className="form-control">
            <label className="label font-semibold">Input Mode</label>
            <div className="flex gap-4">
              <label className="label cursor-pointer">
                <input
                  type="radio"
                  name="inputMode"
                  className="radio checked:bg-primary"
                  checked={inputMode === 'manual'}
                  onChange={() => handleInputModeChange('manual')}
                />
                <span className="ml-2">Manual Input</span>
              </label>
              <label className="label cursor-pointer">
                <input
                  type="radio"
                  name="inputMode"
                  className="radio checked:bg-primary"
                  checked={inputMode === 'select'}
                  onChange={() => handleInputModeChange('select')}
                />
                <span className="ml-2">Choose Answer</span>
              </label>
            </div>
          </div>

          {inputMode === 'manual' && (
            <div className="form-control">
              <label className="label font-semibold">Your Answer</label>
              <AnswerInput answer={answer} setAnswer={setAnswer} />
            </div>
          )}

          {inputMode === 'select' && (
            <div className="form-control">
              <label className="label font-semibold">Choose from list</label>
              <AnswerSelector
                setAnswer={setAnswer}
                datasetId={datasetId}
                scenario={scenario}
                setScore={setScore}
              />
            </div>
          )}

          <button
            onClick={handleSubmit}
            className="btn btn-primary w-full mt-4 text-white"
          >
            Submit
          </button>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6 text-center">
            {inputMode === 'select' && (
              <div className="stat bg-base-100 shadow">
                <div className="stat-title">Actual Score</div>
                <div className="stat-value">{score}</div>
              </div>
            )}
            <div className="stat bg-base-100 shadow">
              <div className="stat-title">Direct Score</div>
              <div className="stat-value">{direct}</div>
            </div>
            <div className="stat bg-base-100 shadow">
              <div className="stat-title">Similarity Score</div>
              <div className="stat-value">{similarity}</div>
            </div>
          </div>
        </div>
      </div>
  );


}

export default App;
