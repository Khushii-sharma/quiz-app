"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { CheckCircle2, XCircle, Lightbulb, RotateCcw, Loader2 } from "lucide-react";

// TIMER COMPONENT 
function Timer({ resetKey, onTimeUp, status }) {
  const TOTAL_TIME = 60;
  const [secondsLeft, setSecondsLeft] = useState(TOTAL_TIME);

  useEffect(() => {
    setSecondsLeft(TOTAL_TIME);
  }, [resetKey]);

  useEffect(() => {
    if (secondsLeft <= 0) {
      onTimeUp(); 
      return;
    }
    if (status !== "idle") return;

    const interval = setInterval(() => {
      setSecondsLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [secondsLeft, onTimeUp, status]);

  const minutes = String(Math.floor(secondsLeft / 60)).padStart(2, "0");
  const seconds = String(secondsLeft % 60).padStart(2, "0");
  const isUrgent = secondsLeft <= 10;

  return (
    <div className={`flex flex-col items-end font-mono font-bold transition-all duration-300
      ${isUrgent && status === "idle" ? "text-red-600 animate-pulse scale-110" : "text-blue-600"}`}>
      <span className="text-xl">{minutes}:{seconds}</span>
      {isUrgent && status === "idle" && <span className="text-[10px] uppercase text-red-500">Hurry!</span>}
    </div>
  );
}

// --- MAIN QUESTION CARD ---
export default function QuestionCard({ question, onCorrect, onIncorrect }) {
  const options = question.optionOrdering.map((opt) => opt.text);
  const correctAnswer = options[0];

  const [selected, setSelected] = useState(null);
  const [status, setStatus] = useState("idle"); 
  const [showSolution, setShowSolution] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [transitionMessage, setTransitionMessage] = useState(""); 
  const [timerKey, setTimerKey] = useState(0);

  const handleSubmit = () => {
    if (!selected) return;
    if (selected === correctAnswer) {
      setStatus("correct");
    } else {
      setStatus("incorrect");
      onIncorrect?.();
    }
  };

  const handleTryAgain = () => {
    setSelected(null);
    setStatus("idle");
    setTimerKey(prev => prev + 1); 
  };

  const handleNext = (isTimeout = false) => {
    setTransitionMessage(isTimeout ? "Time's up! Moving to next question..." : "");
    setIsTransitioning(true);
    
    setTimeout(() => {
      setSelected(null);
      setStatus("idle");
      setShowSolution(false);
      setTimerKey(prev => prev + 1);
      setIsTransitioning(false);
      onCorrect?.(); 
    }, 1200);
  };

  return (
    <div className="relative w-full max-w-xl mx-auto">
      {/* Transition Overlay */}
      <AnimatePresence>
        {isTransitioning && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-white/95 backdrop-blur-sm rounded-3xl"
          >
            <Loader2 className="w-10 h-10 text-blue-600 animate-spin mb-2" />
            <p className="text-blue-800 font-bold px-6 text-center">{transitionMessage}</p>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="overflow-hidden bg-white rounded-3xl shadow-2xl border border-slate-100 transition-all duration-300">
        <div className="p-6 sm:p-10">
          <div className="flex justify-between items-center mb-6">
            <span className="px-3 py-1 text-xs font-semibold text-blue-600 bg-blue-50 rounded-full uppercase tracking-wider">
              Multiple Choice
            </span>
            <Timer 
              resetKey={timerKey} 
              status={status} 
              onTimeUp={() => handleNext(true)} 
            />
          </div>

          <h2 className="text-xl sm:text-2xl font-extrabold text-slate-800 leading-tight mb-8">
            {question.text}
          </h2>

          {/* Options */}
          <div className="grid gap-4">
            {options.map((opt, idx) => {
              const isSelected = selected === opt;
              const isCorrect = status === "correct" && opt === correctAnswer;
              const isWrong = status === "incorrect" && isSelected;

              return (
                <button
                  key={idx}
                  onClick={() => { if (status === "idle") setSelected(opt); }}
                  className={`relative flex items-center justify-between w-full p-4 sm:p-5 rounded-2xl border-2 transition-all text-left
                    ${isCorrect ? "bg-emerald-50 border-emerald-500 shadow-sm" : 
                      isWrong ? "bg-rose-50 border-rose-500 shadow-sm" : 
                      isSelected ? "bg-linear-to-r from-blue-50 to-indigo-50 border-blue-500 shadow-md ring-1 ring-blue-400" : 
                      "bg-white border-slate-200 hover:border-slate-300 hover:bg-slate-50"}
                  `}
                >
                  <div className="flex items-center gap-4">
                    <div className={`w-10 h-10 flex items-center justify-center rounded-xl font-bold text-sm
                      ${isSelected ? "bg-blue-600 text-white" : "bg-slate-100 text-slate-500"}
                      ${isCorrect ? "bg-emerald-600 text-white" : ""}
                      ${isWrong ? "bg-rose-600 text-white" : ""}
                    `}>
                      {String.fromCharCode(65 + idx)}
                    </div>
                    <span className={`text-base font-medium ${isSelected ? "text-slate-900" : "text-slate-700"}`}>
                      {opt}
                    </span>
                  </div>
                  <div className="flex items-center">
                    {isCorrect && <CheckCircle2 className="w-6 h-6 text-emerald-600" />}
                    {isWrong && <XCircle className="w-6 h-6 text-rose-600" />}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Solution */}
          <AnimatePresence>
            {showSolution && question.questionInfo?.solution && (
              <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="overflow-hidden">
                <div className="mt-6 p-5 rounded-2xl bg-blue-50/50 border border-blue-100">
                  <div className="flex items-center gap-2 mb-2 text-blue-800">
                    <Lightbulb className="w-5 h-5" />
                    <h3 className="font-bold uppercase tracking-tight text-xs">Explanation</h3>
                  </div>
                  <p className="text-slate-700 text-sm leading-relaxed">{question.questionInfo.solution}</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Actions */}
          <div className="flex items-center justify-between gap-4 mt-10">
            <Button variant="ghost" onClick={() => setShowSolution((prev) => !prev)} className="text-slate-500 hover:text-blue-600 hover:bg-blue-50 transition-colors">
              {showSolution ? "Hide Hint" : "Show Hint"}
            </Button>

            <div className="flex items-center">
              {status === "idle" && (
                <Button onClick={handleSubmit} disabled={!selected} className="px-8 h-12 rounded-xl bg-linear-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white shadow-lg shadow-blue-200 transition-all active:scale-95 disabled:opacity-50">
                  Submit Answer
                </Button>
              )}
              {status === "incorrect" && (
                <Button onClick={handleTryAgain} className="px-8 h-12 rounded-xl bg-linear-to-r from-rose-600 to-rose-500 hover:from-rose-700 hover:to-rose-600 text-white shadow-lg shadow-rose-200 flex gap-2 items-center">
                  <RotateCcw className="w-4 h-4" /> Try Again
                </Button>
              )}
              {status === "correct" && (
                <Button onClick={() => handleNext(false)} className="px-8 h-12 rounded-xl bg-linear-to-r from-emerald-600 to-emerald-500 hover:from-emerald-700 hover:to-emerald-600 text-white shadow-lg shadow-emerald-200 flex items-center">
                  Next Question 
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}