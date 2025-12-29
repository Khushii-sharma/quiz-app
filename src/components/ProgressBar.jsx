"use client";
import { motion } from "framer-motion";

export default function ProgressBar({ progress }) {
  return (
    <div className="w-full max-w-xl mb-10 px-2 flex items-center gap-2">
      {/* Progress Track */}
      <div className="relative flex-1 h-3 bg-slate-100 rounded-full border border-slate-200/60 shadow-[inset_0_2px_4px_rgba(0,0,0,0.05)]">
        {/* Progress Fill */}
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.8, ease: "circOut" }}
          className="absolute top-0 left-0 h-full rounded-full bg-linear-to-r from-blue-500 via-blue-600 to-indigo-600 shadow-[0_4px_12px_rgba(37,99,235,0.4)]"
        >
          {/* Glossy Overlay */}
          <div className="absolute inset-0 bg-linear-to-b from-white/30 to-transparent rounded-full" />
          
          {/* Tip Pulse while moving */}
          {progress > 0 && progress < 100 && (
            <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 bg-white rounded-full blur-[2px] animate-pulse" />
          )}
        </motion.div>
      </div>

      {/* Percentage Indicator */}
      <div className="min-w-12.5 text-right">
        <span className="text-sm text-blue-600 font-black">
          {Math.round(progress)}%
        </span>
      </div>
    </div>
  );
}