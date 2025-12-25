"use client";

import Timer from "./Timer";

export default function ProgressBar({ current, total, resetKey, onTimeUp }) {
  const progress = Math.round((current / total) * 100);

  return (
    <div className="w-full max-w-xl mb-6">
      <div className="flex items-center gap-3">
        {/* Progress bar */}
        <div className="relative flex-1 h-3 bg-gray-200 rounded-full overflow-hidden">
          <div
            className="
              h-full rounded-full
              bg-linear-to-r from-blue-500 via-blue-600 to-indigo-600
              transition-all duration-500 ease-out
            "
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Countdown timer */}
        <Timer resetKey={resetKey} onTimeUp={onTimeUp} />
      </div>
    </div>
  );
}
