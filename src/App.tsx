import { useEffect, useState } from 'react';
import QuestionSelector from './components/QuestionSelector';
import AnswerInput from './components/AnswerInput';
import AnswerSelector from './components/AnswerSelector';
import { getAnswers, getQuestions, getScore } from './api/api';
import { AxiosError } from 'axios';
import type { Answer, AnswersMap, Question } from "@/api/api";

function App() {
  const [datasetId, setDatasetId] = useState<string>('1');
  const [question, setQuestion] = useState<string>('');
  const [reference, setReference] = useState<string>('');
  const [answer, setAnswer] = useState<string>('');
  // SCORE STATE
  const [direct, setDirect] = useState<number>(0);
  const [similarity, setSimilarity] = useState<number>(0);
  const [score, setScore] = useState<number>(0);
  // RADIO BUTTON STATE
  const [inputMode, setInputMode] = useState<'manual' | 'select'>('manual');
  const [refMode, setRefMode] = useState<'manual' | 'select'>('manual');
  // SELECT DATA STATE
  const [questions, setQuestions] = useState<Question[]>([]);
  const [answersMap, setAnswersMap] = useState<AnswersMap>({});
  const [answers, setAnswers] = useState<Answer[]>([]);

  const handleSubmit = async () => {
    if (!answer.trim()) {
      alert("Answer cannot be empty.");
      return;
    }

    if (!reference.trim()) {
      alert("Reference Answer cannot be empty.");
      return;
    }

    try {
      const res = await getScore(answer, reference);
        setDirect(res.direct_score);
        setSimilarity(res.similarity_score);
    } catch (err) {
      const axiosErr = err as AxiosError;
      const status = axiosErr.response?.status;

      if (status === 429) {
        alert('You’re requesting too fast. Please wait a minute and try again.');
      } else {
        alert('Failed to get score. Please try again.');
      }
    }
  };

  const handleInputModeChange = (mode: 'manual' | 'select') => {
    setInputMode(mode);
    setAnswer('');
    setScore(0);
  };

  const handleRefModeChange = (mode: 'manual' | 'select') => {
    setRefMode(mode);
    setReference('');
    setQuestion('');
  }

  // GET QUESTION DATA ONCE PER RELOAD
  useEffect(() => {
    getQuestions().then((res) => {
      setQuestions(res.data)
    }).catch(err => {
        console.error('Failed to load Question:', err);
        setQuestions([]);
      });
  }, []);

  // GET ANSWER DATA ONCE PER RELOAD
  useEffect(() => {
    getAnswers()
      .then(res => {
        setAnswersMap(res.data)}
      )
      .catch(err => {
        console.error('Failed to load answersMap:', err);
        setAnswersMap({});
      });
  }, []);

  useEffect(() => {
    const key = String(datasetId);
    const bucket = answersMap[key] ?? [];
    setAnswers(bucket);
  }, [datasetId, answersMap]);

  return (
    <div className="flex items-center justify-center h-screen w-screen bg-base-200">
    <div className="card w-full max-w-4xl bg-base-100 shadow-xl p-10 space-y-6 mx-auto">
          <h1 className="text-4xl font-bold text-center text-primary">ASAS Demo</h1>
          {
            questions.length == 0 && answers.length == 0 && 
            (
              <p className="text-sm text-gray-700 text-center bg-yellow-100 px-2 py-1 rounded">
                Jika data opsi belum tersedia, mohon tunggu—backend sedang memuat data.
              </p>
            )
          }
          <div className="form-control">
            <label className="label font-semibold">Input Reference Answer Mode</label>
            <div className="flex gap-4">
              <label className="label cursor-pointer">
                <input
                  type="radio"
                  name="refMode"
                  className="radio checked:bg-primary"
                  checked={refMode === 'manual'}
                  onChange={() => handleRefModeChange('manual')}
                />
                <span className="ml-2">Manual Input</span>
              </label>
              <label className="label cursor-pointer">
                <input
                  type="radio"
                  name="refMode"
                  className="radio checked:bg-primary"
                  checked={refMode === 'select'}
                  onChange={() => handleRefModeChange('select')}
                />
                <span className="ml-2">Choose Reference Answer</span>
              </label>
            </div>
          </div>

          {refMode === 'manual' && (
            <div className="form-control">
              <label className="label font-semibold">Your Reference Answer</label>
              <AnswerInput answer={reference} setAnswer={setReference} />
            </div>
          )}

          {refMode === 'select' && (
            <div className="form-control">
              <label className="label font-semibold">Question</label>
              <QuestionSelector
                setQuestion={setQuestion}
                setReference={setReference}
                setDatasetId={setDatasetId}
                questions={questions}
              />
            </div>
          )}

          {question && refMode === 'select' && (
            <div className="bg-base-100 border border-base-300 rounded p-4">
              <p className="mb-2"><span className="font-semibold">Question:</span> {question}</p>
              <p><span className="font-semibold">Reference:</span> {reference}</p>
            </div>
          )}

          <div className="form-control">
            <label className="label font-semibold">Input Student Answer Mode</label>
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
              {
                refMode === 'select' && (
                  <label className="label cursor-pointer">
                    <input
                      type="radio"
                      name="inputMode"
                      className="radio checked:bg-primary"
                      checked={inputMode === 'select'}
                      onChange={() => handleInputModeChange('select')}
                    />
                    <span className="ml-2">Choose Student Answer</span>
                  </label>
                )
              }
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
                setScore={setScore}
                answers={answers}
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
