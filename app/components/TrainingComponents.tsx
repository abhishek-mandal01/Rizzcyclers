"use client";

import React, { useState } from 'react';
import { ChevronDown, ChevronUp, BookOpen } from 'lucide-react';

// --- TYPE DEFINITIONS ---
interface ModuleProps {
  title: string;
  icon: string;
  children: React.ReactNode;
}

interface QuizQuestion {
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

// --- REUSABLE COMPONENTS ---
export const Module: React.FC<ModuleProps> = ({ title, icon, children }) => {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <div className="border border-gray-200 rounded-lg overflow-hidden mb-4 shadow-sm">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full bg-green-600 text-white p-4 text-left font-bold text-lg flex justify-between items-center hover:bg-green-700 transition"
            >
                <span>{icon} {title}</span>
                <span className={`transform transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}>▼</span>
            </button>
            {isOpen && (
                <div className="p-6 bg-white">
                    {children}
                </div>
            )}
        </div>
    );
};

export const Quiz = () => {
    const [answers, setAnswers] = useState<(number | null)[]>(Array(5).fill(null));
    const [submitted, setSubmitted] = useState(false);

    const questions: QuizQuestion[] = [
        { question: "Which bin should you use for banana peels?", options: ["🔴 Red Bin (Dry)", "🟢 Green Bin (Wet)", "⚠ Yellow Bin (Hazardous)"], correctAnswer: 1, explanation: "Correct! Banana peels are organic waste." },
        { question: "For composting, what's the right mix?", options: ["Equal parts", "3 parts brown, 1 part green", "1 part brown, 3 parts green"], correctAnswer: 1, explanation: "Correct! 3:1 brown to green is ideal." },
        { question: "Which of the 3 R's should you try FIRST?", options: ["Recycle", "Reuse", "Reduce"], correctAnswer: 2, explanation: "Correct! Reducing waste is the most effective step." },
        { question: "Where should old batteries go?", options: ["🔴 Red Bin (Dry)", "🟢 Green Bin (Wet)", "⚠ Yellow Bin (Hazardous)"], correctAnswer: 2, explanation: "Correct! Batteries are hazardous waste." },
        { question: "How long does home composting usually take?", options: ["2-3 weeks", "2-3 months", "6-12 months"], correctAnswer: 1, explanation: "Correct! It takes about 2-3 months." },
    ];

    const handleSelect = (qIndex: number, oIndex: number) => {
        if (submitted) return;
        const newAnswers = [...answers];
        newAnswers[qIndex] = oIndex;
        setAnswers(newAnswers);
    };

    const calculateScore = () => answers.filter((ans, i) => ans === questions[i].correctAnswer).length;

    return (
        <section className="bg-blue-50 border-2 border-blue-400 rounded-lg p-6 my-8">
            <h2 className="text-2xl font-bold text-blue-800 text-center mb-4 flex items-center justify-center gap-2"><BookOpen /> Test Your Knowledge!</h2>
            <div className="space-y-4">
                {questions.map((q, qIndex) => (
                    <div key={qIndex}>
                        <p className="font-semibold">{qIndex + 1}. {q.question}</p>
                        <div className="flex flex-col sm:flex-row gap-2 mt-2">
                            {q.options.map((opt, oIndex) => (
                                <button 
                                    key={oIndex} 
                                    onClick={() => handleSelect(qIndex, oIndex)}
                                    className={`p-2 border-2 rounded-lg text-sm transition w-full text-left ${
                                        submitted
                                            ? oIndex === q.correctAnswer ? 'bg-green-200 border-green-500' : (answers[qIndex] === oIndex ? 'bg-red-200 border-red-500' : 'bg-gray-100')
                                            : answers[qIndex] === oIndex ? 'bg-blue-200 border-blue-500' : 'bg-white hover:bg-gray-100'
                                    }`}
                                >
                                    {opt}
                                </button>
                            ))}
                        </div>
                        {submitted && <p className="text-xs mt-1 p-2 bg-gray-100 rounded">{q.explanation}</p>}
                    </div>
                ))}
            </div>
            <div className="text-center mt-6">
                {!submitted ? (
                    <button onClick={() => setSubmitted(true)} className="bg-blue-600 text-white font-bold py-2 px-6 rounded-lg hover:bg-blue-700">Check My Score</button>
                ) : (
                    <div className="text-center">
                        <p className="text-xl font-bold text-green-700">You scored {calculateScore()} out of {questions.length}!</p>
                        <button onClick={() => { setSubmitted(false); setAnswers(Array(5).fill(null)); }} className="mt-4 bg-gray-600 text-white font-bold py-2 px-6 rounded-lg hover:bg-gray-700">Try Again</button>
                    </div>
                )}
            </div>
        </section>
    );
};