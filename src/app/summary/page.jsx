"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Button } from "../../components/ui/button";
import {
  CheckCircle2,
  Clock,
  RotateCcw,
  ChevronRight,
} from "lucide-react";
import confetti from "canvas-confetti";
import { useEffect, useMemo } from "react";
import Image from "next/image";

export default function SummaryPage() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const { score, total, timeTaken } = useMemo(() => {
    return {
      score: Number(searchParams.get("score") || 0),
      total: Number(searchParams.get("total") || 0),
      timeTaken: Number(searchParams.get("time") || 0),
    };
  }, [searchParams]);

  const accuracy = total > 0 ? Math.round((score / total) * 100) : 0;
  const minutes = String(Math.floor(timeTaken / 60)).padStart(2, "0");
  const seconds = String(timeTaken % 60).padStart(2, "0");

  const isPerfect = accuracy === 100 && total > 0;

  useEffect(() => {
    if (isPerfect) {
      confetti({
        particleCount: 150,
        spread: 70,
        origin: { y: 0.6 },
        colors: ["#2563eb", "#10b981", "#fbbf24"],
      });
    }
  }, [isPerfect]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-slate-50 p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-md"
      >
        <div className="bg-white rounded-[2.5rem] shadow-2xl border border-slate-100 p-8 sm:p-10 text-center relative">
          {/* Top Shine Effect */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-linear-to-r from-transparent via-blue-500 to-transparent opacity-50" />

          {/* Logo */}
          <div className="flex justify-center mb-6">
            <Image
              src="/logo.svg"
              alt="Edzy Logo"
              width={60}
              height={60}
              className="object-contain rounded-full"
            />
          </div>

          <h1 className="text-3xl font-black text-slate-800 mb-2">
            Lesson Completed
          </h1>
          <p className="text-slate-500 font-medium mb-8">
            You've completed the challenge!
          </p>

          {/* ANALYSIS & TIME TAKEN */}
          <div className="grid grid-cols-2 gap-4 mb-8">
            
            {/* Analysis */}
            <div className="bg-emerald-50 border border-emerald-100 p-5 rounded-3xl">
              <div className="flex justify-center mb-2">
                <CheckCircle2 className="w-6 h-6 text-emerald-500" />
              </div>
              <p className="text-[10px] font-bold text-emerald-600 uppercase tracking-widest">
                Analysis
              </p>
              <p className="text-xl font-black text-emerald-700">
                {accuracy}%
              </p>
            </div>

            {/* Time Taken */}
            <div className="bg-slate-50 border border-slate-100 p-5 rounded-3xl">
              <div className="flex justify-center mb-2">
                <Clock className="w-6 h-6 text-slate-500" />
              </div>
              <p className="text-[10px] font-bold uppercase tracking-widest text-slate-500">
                Time Taken
              </p>
              <p className="text-xl font-black text-slate-700">
                {minutes}:{seconds}
              </p>
            </div>

          </div>


          {/* Buttons */}
          <div className="space-y-3">
            <Button
              onClick={() => router.push("/")}
              className="w-full h-14 bg-linear-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold rounded-2xl shadow-lg shadow-blue-100 transition-all flex items-center justify-center gap-2 border-none active:scale-[0.98]"
            >
              <RotateCcw className="w-5 h-5" />
              Retake Quiz
            </Button>

            <Button
              variant="ghost"
              onClick={() => router.push("/")}
              className="w-full h-12 text-slate-500 font-bold rounded-2xl hover:bg-slate-50"
            >
              Back to Home <ChevronRight className="ml-1 w-4 h-4" />
            </Button>
          </div>

          <p className="mt-8 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
            EDZY PRACTICE • DAILY GOALS
          </p>
        </div>
      </motion.div>
    </div>
  );
}
