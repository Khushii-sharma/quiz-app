"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion"; // Added for smooth entry
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ToastContainer, toast } from "react-toastify";
import Image from "next/image";

export default function Home() {
  const router = useRouter();
  const [subject, setSubject] = useState("");
  const [numQuestions, setNumQuestions] = useState("5");

  const subjects = [
    "Class 10 - English",
    "Class 10 - Mathematics",
    "Class 10 - Science",
    "Class 10 - Social Science",
  ];

  const startQuiz = () => {
    if (!subject) {
      toast.error("Please select a subject", {
        position: "top-center",
        autoClose: 3000,
        theme: "colored",
      });
      return;
    }
    router.push(`/quiz?subject=${subject}&numQuestions=${numQuestions}`);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-radial-gradient(circle_at_top_left,_var(--tw-gradient-stops)) from-blue-100 via-white to-purple-100 px-4">
      
      {/* Background Decorative Elements */}
      <div className="absolute top-20 left-20 w-64 h-64 bg-blue-400/10 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-20 right-20 w-64 h-64 bg-purple-400/10 rounded-full blur-3xl animate-pulse" />

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-lg z-10"
      >
        <div className="relative overflow-hidden rounded-[2.5rem] bg-white/70 backdrop-blur-xl shadow-[0_32px_64px_-12px_rgba(0,0,0,0.1)] border border-white p-8 sm:p-12">
          
          {/* Top Shine Effect */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-linear-to-r from-transparent via-blue-500 to-transparent opacity-50" />

          {/* Logo */}
          <div className="flex justify-center mb-6">
                <Image src="/logo.svg" alt="Edzy Logo" width={60} height={60} className="object-contain rounded-full"/>
          </div>

          {/* Heading */}
          <div className="text-center mb-10">
            <h1 className="text-4xl sm:text-5xl font-black text-slate-900 tracking-tight mb-3">
              Quiz<span className="text-blue-600">App</span>
            </h1>
            <p className="text-slate-500 font-medium">
              Master your subjects with interactive practice
            </p>
          </div>

          {/* Inputs Section */}
          <div className="space-y-6">
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">
                Select Subject
              </label>
              <Select onValueChange={setSubject}>
                <SelectTrigger className="h-14 w-full rounded-lg border-slate-200 bg-white shadow-sm hover:border-blue-400 transition-all text-base focus:ring-blue-500">
                  <SelectValue placeholder="Which subject today?" />
                </SelectTrigger>
                <SelectContent className="rounded-lg shadow-xl border-slate-100">
                  {subjects.map((subj) => (
                    <SelectItem key={subj} value={subj} className="py-3 rounded-xl focus:bg-blue-50 focus:text-blue-700 cursor-pointer">
                      {subj}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">
                Questions count
              </label>
              <Select value={numQuestions} onValueChange={setNumQuestions}>
                <SelectTrigger className="h-14 w-full rounded-lg border-slate-200 bg-white shadow-sm hover:border-blue-400 transition-all text-base focus:ring-blue-500">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="rounded-lg shadow-xl border-slate-100">
                  <SelectItem value="5" className="py-3 rounded-xl focus:bg-blue-50">5 Questions</SelectItem>
                  <SelectItem value="10" className="py-3 rounded-xl focus:bg-blue-50">10 Questions</SelectItem>
                  <SelectItem value="15" className="py-3 rounded-xl focus:bg-blue-50">15 Questions</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Action Button */}
          <motion.div 
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="mt-10"
          >
            <Button
              onClick={startQuiz}
              className="w-full h-16 text-lg font-bold rounded-2xl bg-linear-to-r from-blue-600 via-indigo-600 to-blue-700 hover:shadow-[0_20px_40px_-10px_rgba(37,99,235,0.4)] transition-all duration-300 shadow-lg text-white group"
            >
              Start Practice Session
            </Button>
          </motion.div>

          {/* Footer */}
          <div className="mt-8 pt-6 border-t border-slate-100 flex justify-center gap-6 opacity-40 grayscale hover:grayscale-0 transition-all">
             <div className="flex items-center gap-1 text-[10px] font-bold text-slate-600 uppercase tracking-tighter">
                <div className="w-1 h-1 bg-blue-500 rounded-full" /> Learn
             </div>
             <div className="flex items-center gap-1 text-[10px] font-bold text-slate-600 uppercase tracking-tighter">
                <div className="w-1 h-1 bg-indigo-500 rounded-full" /> Practice
             </div>
             <div className="flex items-center gap-1 text-[10px] font-bold text-slate-600 uppercase tracking-tighter">
                <div className="w-1 h-1 bg-purple-500 rounded-full" /> Improve
             </div>
          </div>
        </div>
      </motion.div>

      <ToastContainer hideProgressBar />
    </div>
  );
}