"use client";

import { useEffect, useState } from "react";

const TOTAL_TIME = 60;

export default function Timer({ resetKey, onTimeUp }) {
  const [secondsLeft, setSecondsLeft] = useState(TOTAL_TIME);

  useEffect(() => {
    setSecondsLeft(TOTAL_TIME);
  }, [resetKey]);

  // Countdown logic
  useEffect(() => {
    if (secondsLeft <= 0) {
      onTimeUp(); 
      return;
    }

    const interval = setInterval(() => {
      setSecondsLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [secondsLeft, onTimeUp]);


  const minutes = String(Math.floor(secondsLeft / 60)).padStart(2, "0");
  const seconds = String(secondsLeft % 60).padStart(2, "0");

  return (
    <div
      className={`text-sm font-semibold min-w-12.5 text-right
        ${secondsLeft <= 10 ? "text-red-600" : "text-blue-600"}`}
    >
      {minutes}:{seconds}
    </div>
  );
}
