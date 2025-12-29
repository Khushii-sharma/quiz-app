"use client";

import { useEffect, useState } from "react";

const TOTAL_TIME = 60;

export default function Timer({ resetKey, onTimeUp, status }) {
  const [secondsLeft, setSecondsLeft] = useState(TOTAL_TIME);

  // Reset timer when resetKey changes
  useEffect(() => {
    setSecondsLeft(TOTAL_TIME);
  }, [resetKey]);

  useEffect(() => {
    // Stop timer if time is up OR if user has submitted 
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
    <div className="flex flex-col items-end">
      <div
        className={`text-xl font-mono font-bold transition-all duration-300
          ${isUrgent ? "text-red-600 animate-bounce-subtle scale-110" : "text-blue-600"}
          ${status !== "idle" ? "opacity-70" : "opacity-100"}
        `}
      >
        {minutes}:{seconds}
      </div>
      
      {/* Visual urgency cue */}
      {isUrgent && status === "idle" && (
        <span className="text-[10px] uppercase font-bold text-red-500 animate-pulse">
          Hurry Up!
        </span>
      )}

      {/* Tailwind custom animation */}
      <style jsx>{`
        @keyframes bounce-subtle {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-2px); }
        }
        .animate-bounce-subtle {
          animation: bounce-subtle 0.5s infinite;
        }
      `}</style>
    </div>
  );
}