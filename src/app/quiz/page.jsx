"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

import { fetchQuiz } from "@/utils/api";
import QuestionCard from "@/components/QuestionCard";
import ProgressBar from "@/components/ProgressBar";

export default function QuizPage() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const subject = searchParams.get("subject");
  const numQuestions = Number(searchParams.get("numQuestions"));

  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [incorrectCount, setIncorrectCount] = useState(0);

  const { data, isLoading, error } = useQuery({
    queryKey: ["quiz", subject, numQuestions],
    queryFn: () => fetchQuiz(subject, numQuestions),
    enabled: !!subject && !!numQuestions,
  });

  if (isLoading)
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading quiz...
      </div>
    );

  if (error)
    return (
      <div className="min-h-screen flex items-center justify-center text-red-500">
        Error fetching quiz
      </div>
    );

  const questions = data?.questions || [];
  const currentQuestion = questions[current];

  const handleCorrect = () => {
    setScore((prev) => prev + 1);
    goToNext();
  };

  const handleIncorrect = () => {
    setIncorrectCount((prev) => prev + 1);
  };

  const handleTimeUp = () => {
    setIncorrectCount((prev) => prev + 1);
    goToNext();
  };

  const goToNext = () => {
    if (current + 1 < questions.length) {
      setCurrent((prev) => prev + 1);
    } else {
      router.push(
        `/summary?score=${score}&total=${questions.length}&incorrect=${incorrectCount}`
      );
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      {/* Progress bar */}
      <ProgressBar
        current={current + 1}
        total={questions.length}
        resetKey={current}
        onTimeUp={handleTimeUp}
      />

      {/* Question card */}
      {currentQuestion && (
        <QuestionCard
          question={currentQuestion}
          onCorrect={handleCorrect}
          onIncorrect={handleIncorrect}
        />
      )}
    </div>
  );
}
