"use client";

import { Suspense, useState, useRef, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { fetchQuiz } from "@/utils/api";
import QuestionCard from "@/components/QuestionCard";
import ProgressBar from "@/components/ProgressBar";

function QuizContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const subject = searchParams.get("subject");
  const totalQuestions = Number(searchParams.get("numQuestions"));

  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [unattempted, setUnattempted] = useState(0);

  // Track quiz start time
  const quizStartTime = useRef(Date.now());

  const { data, isLoading, error } = useQuery({
    queryKey: ["quiz", subject, totalQuestions],
    queryFn: () => fetchQuiz(subject, totalQuestions),
    enabled: !!subject && !!totalQuestions,
  });

  if (isLoading) return null;
  if (error) return <p>Error loading quiz</p>;

  const questions = data?.questions || [];
  const currentQuestion = questions[current];
  const progress = (current / questions.length) * 100;

  const finishQuiz = (finalScore, finalUnattempted) => {
    const quizEndTime = Date.now();
    const timeTaken = Math.floor((quizEndTime - quizStartTime.current) / 1000);
    const totalCount = questions.length;
    
    // Calculate accuracy to pass to Summary Page
    const accuracy = totalCount > 0 ? Math.round((finalScore / totalCount) * 100) : 0;

    router.push(
      `/summary?score=${finalScore}&total=${totalCount}&time=${timeTaken}&accuracy=${accuracy}&unattempted=${finalUnattempted}`
    );
  };

  const handleCorrect = () => {
    const newScore = score + 1;
    setScore(newScore);

    if (current + 1 < questions.length) {
      setCurrent((prev) => prev + 1);
    } else {
      finishQuiz(newScore, unattempted);
    }
  };

  const handleTimeUp = () => {
    const newUnattempted = unattempted + 1;
    setUnattempted(newUnattempted);

    if (current + 1 < questions.length) {
      setCurrent((prev) => prev + 1);
    } else {
      finishQuiz(score, newUnattempted);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center p-4">
      <div className="w-full max-w-xl mt-6">
        <ProgressBar progress={progress} />

        {currentQuestion && (
          <QuestionCard
            key={current}
            question={currentQuestion}
            onCorrect={handleCorrect}
            onTimeUp={handleTimeUp}
          />
        )}
      </div>
    </div>
  );
}

// Wrapping in Suspense 
export default function QuizPage() {
  return (
    <Suspense fallback={null}>
      <QuizContent />
    </Suspense>
  );
}