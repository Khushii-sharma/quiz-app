"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";

export default function QuestionCard({ question, onCorrect, onIncorrect }) {
  const options = question.optionOrdering.map((opt) => opt.text);

  const correctAnswer = options[0];

  const [selected, setSelected] = useState(null);
  const [status, setStatus] = useState("idle"); 
  const [showSolution, setShowSolution] = useState(false);

  const handleSubmit = () => {
    if (!selected) return;

    if (selected === correctAnswer) {
      setStatus("correct");
    } else {
      setStatus("incorrect");
      onIncorrect();
    }
  };

  const handleNext = () => {
    setSelected(null);
    setStatus("idle");
    setShowSolution(false);
    onCorrect();
  };

  return (
    <div className="w-full max-w-xl p-6 sm:p-8 bg-white rounded-2xl shadow-xl border border-gray-200 flex flex-col gap-4">
      
      {/* Question */}
      <p className="text-gray-500 text-sm">
        Select the correct answer from the given choices
      </p>

      <h2 className="text-xl sm:text-2xl font-bold text-gray-800">
        {question.text}
      </h2>

      {/* Options */}
      <div className="flex flex-col gap-4 mt-4">
        {options.map((opt, idx) => {
          const isSelected = selected === opt;
          const isCorrect =
            status === "correct" && opt === correctAnswer;
          const isWrong =
            status === "incorrect" && isSelected;

          return (
            <button
              key={idx}
              onClick={() => {
                if (status === "correct") return;
                setSelected(opt);
                setStatus("idle");
              }}
              className={`
                flex items-center justify-between
                w-full p-5 sm:p-6 rounded-xl border transition-all text-left
                ${
                  isCorrect
                    ? "bg-green-100 border-green-400"
                    : isWrong
                    ? "bg-red-100 border-red-400"
                    : isSelected
                    ? "bg-blue-100 border-blue-400"
                    : "bg-white border-gray-300 hover:bg-gray-100"
                }
              `}
            >
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-200 text-gray-800 font-bold">
                  {idx + 1}
                </div>
                <span className="text-gray-800 text-base sm:text-lg">
                  {opt}
                </span>
              </div>

              {isCorrect && (
                <span className="text-green-600 text-2xl font-bold">✔</span>
              )}
              {isWrong && (
                <span className="text-red-600 text-2xl font-bold">✖</span>
              )}
            </button>
          );
        })}
      </div>

      {status === "incorrect" && (
        <p className="text-red-600 font-medium">
          Incorrect answer. Please try again.
        </p>
      )}

      {/* Solution box */}
      {showSolution && question.questionInfo?.solution && (
        <div className="mt-4 p-4 rounded-xl bg-blue-50 border border-blue-200">
          <h3 className="font-semibold text-blue-700 mb-1">Solution</h3>
          <p className="text-gray-700 text-sm leading-relaxed">
            {question.questionInfo.solution}
          </p>
        </div>
      )}

      {/* Actions */}
      <div className="flex justify-center gap-4 mt-6 flex-wrap">
        <Button
          variant="outline"
          onClick={() => setShowSolution((prev) => !prev)}
          className="px-4 py-2 text-sm bg-gray-100 hover:bg-gray-200 text-black"
        >
          {showSolution ? "Hide Solution" : "Solution"}
        </Button>

        {status !== "correct" ? (
          <Button
            onClick={handleSubmit}
            disabled={!selected}
            className={`px-5 py-2 text-sm font-semibold ${
              selected
                ? "bg-blue-600 hover:bg-blue-700 text-white"
                : "bg-blue-300 cursor-not-allowed text-white"
            }`}
          >
            Submit
          </Button>
        ) : (
          <Button
            onClick={handleNext}
            className="px-5 py-2 text-sm font-semibold bg-blue-600 hover:bg-blue-700 text-white"
          >
            Next
          </Button>
        )}
      </div>
    </div>
  );
}
