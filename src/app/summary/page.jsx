"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { Button } from "../../components/ui/button";

export default function SummaryPage() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const score = searchParams.get("score");
  const incorrect = searchParams.get("incorrect");

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      {/* Card */}
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-6 sm:p-8 border border-gray-200 text-center">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          Quiz Summary
        </h1>
        <p className="text-gray-500 mb-6">
          Here’s how you performed in the quiz
        </p>

        {/* Score & Incorrect Side by Side */}
        <div className="flex justify-between mb-6 gap-4">
          <div className="flex-1 bg-blue-50 p-4 rounded-xl">
            <p className="text-gray-800 font-medium">Score</p>
            <p className="text-2xl font-bold text-blue-600">{score}</p>
          </div>
          <div className="flex-1 bg-red-50 p-4 rounded-xl">
            <p className="text-gray-800 font-medium">Unattempted</p>
            <p className="text-2xl font-bold text-red-500">{incorrect}</p>
          </div>
        </div>

        <Button
          onClick={() => router.push("/")}
          className="w-full py-3 text-white font-semibold rounded-xl 
                     bg-linear-to-r from-blue-500 to-blue-700 
                     hover:from-blue-600 hover:to-blue-800 
                     transition-all duration-200"
        >
          Retake Quiz
        </Button>
      </div>
    </div>
  );
}
