"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ToastContainer, toast } from 'react-toastify';

export default function Home() {
  const router = useRouter();
  const [subject, setSubject] = useState("");
  const [numQuestions, setNumQuestions] = useState(5);

  const subjects = [
    "Class 10 - English",
    "Class 10 - Mathematics",
    "Class 10 - Science",
    "Class 10 - Social Science",
  ];

  const startQuiz = () => {
    if (!subject) {
      toast.error("Please select a subject");
      return;
    }
    router.push(`/quiz?subject=${subject}&numQuestions=${numQuestions}`);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100  p-4">
      {/* Card */}
      <div className="w-full max-w-md bg-white  rounded-2xl shadow-xl p-6 sm:p-8 border border-gray-200 ">
        
        <h1 className="text-2xl sm:text-3xl font-bold text-center text-gray-800  mb-2">
          Edzy.ai Quiz
        </h1>
        <p className="text-center text-gray-500  mb-6">
          Choose your subject and start learning 
        </p>

        {/* Subject */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700  mb-1">
            Subject
          </label>
          <select
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            className="w-full p-3 rounded-xl border border-gray-300  bg-white  text-gray-800  focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select Subject</option>
            {subjects.map((subj) => (
              <option key={subj} value={subj}>
                {subj}
              </option>
            ))}
          </select>
        </div>

        {/* Number of Questions */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700  mb-1">
            Number of Questions
          </label>
          <select
            value={numQuestions}
            onChange={(e) => setNumQuestions(parseInt(e.target.value))}
            className="w-full p-3 rounded-xl border border-gray-300  bg-white  text-gray-800  focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value={5}>5 Questions</option>
            <option value={10}>10 Questions</option>
            <option value={15}>15 Questions</option>
          </select>
        </div>

        {/* Start Button */}
        <Button
          onClick={startQuiz}
          className="w-full py-3 text-white font-semibold rounded-xl 
                     bg-linear-to-r from-blue-500 to-blue-700 
                     hover:from-blue-600 hover:to-blue-800 
                     transition-all duration-200"
        >
          Start Quiz
        </Button>
      </div>
      <ToastContainer />
    </div>
  );
}
