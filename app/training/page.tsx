"use client";

import React, { useState, useEffect } from 'react';
import Header from '@/app/components/Header'; // Ensure your Header component is in app/components/Header.tsx
import Link from 'next/link';
import { Leaf, CheckCircle } from 'lucide-react';

// Reusable Accordion Component
const Module: React.FC<{ title: string; icon: string; children: React.ReactNode; startOpen?: boolean }> = ({ title, icon, children, startOpen = false }) => {
    const [isOpen, setIsOpen] = useState(startOpen);
    return (
        <div className="border border-gray-300 rounded-lg overflow-hidden mb-5 bg-white shadow-md">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full bg-green-600 text-white p-4 text-left font-bold text-lg flex justify-between items-center hover:bg-green-700 transition-colors"
            >
                <span className="flex items-center gap-3">{icon} {title}</span>
                <span className={`transform transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}>▼</span>
            </button>
            {isOpen && <div className="p-6 border-t">{children}</div>}
        </div>
    );
};

// Main Training Page Component
export default function TrainingPage() {
    // Quiz State and Logic
    const [answers, setAnswers] = useState<(number | null)[]>(Array(5).fill(null));
    const [submitted, setSubmitted] = useState(false);
    const quizQuestions = [
        { q: "Which bin for banana peels?", o: ["🔴 Red Bin (Dry)", "🟢 Green Bin (Wet)", "⚠ Yellow Bin (Hazardous)"], a: 1 },
        { q: "Correct composting mix?", o: ["Equal parts", "3 parts brown, 1 part green", "1 part brown, 3 parts green"], a: 1 },
        { q: "Which R comes first?", o: ["Recycle", "Reuse", "Reduce"], a: 2 },
        { q: "Where do old batteries go?", o: ["🔴 Red Bin (Dry)", "🟢 Green Bin (Wet)", "⚠ Yellow Bin (Hazardous)"], a: 2 },
        { q: "How long does home composting take?", o: ["2-3 weeks", "2-3 months", "6-12 months"], a: 1 },
    ];
    
    const handleSelect = (qIndex: number, oIndex: number) => {
        if (submitted) return;
        const newAnswers = [...answers];
        newAnswers[qIndex] = oIndex;
        setAnswers(newAnswers);
    };

    const score = answers.filter((ans, i) => ans === quizQuestions[i].a).length;

    return (
        <div className="bg-gray-100">
            <Header variant="report" />
            <main className="container mx-auto px-4 py-8 pt-24">
                <div className="bg-white p-5 rounded-xl shadow-xl">
                    <header className="text-center bg-gradient-to-r from-green-600 to-green-700 text-white p-10 rounded-xl shadow-lg -m-5 mb-8">
                        <h1 className="text-4xl font-extrabold flex items-center justify-center gap-2"><Leaf size={36} /> Zero Waste India</h1>
                        <p className="text-xl mt-2 opacity-90">Citizen Training Guide for a Cleaner Tomorrow</p>
                    </header>

                    <section className="bg-green-50 border-2 border-green-300 rounded-xl p-6 mb-8">
                        <h2 className="text-2xl font-bold text-green-800 mb-3">🇮🇳 Why Every Citizen Matters</h2>
                        <p className="mb-4 text-gray-700">India produces over 62 million tonnes of waste every year. By learning proper waste management, we can reduce landfill waste by up to 80%!</p>
                        <p className="font-semibold text-gray-800">Your Role is Crucial: This training provides simple, practical steps to become part of the solution.</p>
                         <Link href="/manual" className="mt-4 inline-block bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-6 rounded-lg transition">
                            Read the Full Waste Management Manual
                        </Link>
                    </section>
                    
                    <Module title="Learn the 3-Bin System" icon="🗂" startOpen={true}>
                        <div className="grid md:grid-cols-3 gap-6">
                            <div className="p-4 bg-red-100 border-2 border-red-400 rounded-lg"><h3 className="font-bold text-red-800 text-center mb-2">🔴 DRY WASTE</h3><ul className="text-sm list-none text-left space-y-1 text-gray-700"><li>📄 Paper, newspapers, books</li><li>🥤 Plastic bottles and bags</li><li>🥫 Metal cans and containers</li></ul></div>
                            <div className="p-4 bg-green-100 border-2 border-green-500 rounded-lg"><h3 className="font-bold text-green-800 text-center mb-2">🟢 WET WASTE</h3><ul className="text-sm list-none text-left space-y-1 text-gray-700"><li>🥬 Fruit & vegetable peels</li><li>🍚 Cooked food leftovers</li><li>🥚 Egg shells</li></ul></div>
                            <div className="p-4 bg-yellow-100 border-2 border-yellow-500 rounded-lg"><h3 className="font-bold text-yellow-800 text-center mb-2">⚠ HAZARDOUS</h3><ul className="text-sm list-none text-left space-y-1 text-gray-700"><li>🔋 Batteries, old medicines</li><li>💡 Tube lights and CFL bulbs</li><li>🎨 Paint cans</li></ul></div>
                        </div>
                    </Module>

                    <Module title="Start Home Composting" icon="🌱">
                        <p>Your detailed composting content goes here.</p>
                    </Module>

                    <Module title="Practice the 3 R's Daily" icon="♻️">
                        <p>Your detailed 3 R's content goes here.</p>
                    </Module>

                    <section className="bg-blue-100 border-2 border-blue-400 rounded-xl p-6 my-8">
                        <h2 className="text-2xl font-bold text-blue-800 text-center mb-4">🧠 Test Your Knowledge!</h2>
                        <div className="space-y-4">
                            {quizQuestions.map((q, qIndex) => (
                                <div key={qIndex}>
                                    <p className="font-semibold text-gray-800">{qIndex + 1}. {q.q}</p>
                                    <div className="flex flex-col sm:flex-row gap-2 mt-2">
                                        {q.o.map((opt, oIndex) => (
                                            <button key={oIndex} onClick={() => handleSelect(qIndex, oIndex)} className={`p-3 border-2 rounded-lg text-sm transition w-full text-left font-medium ${submitted ? (oIndex === q.a ? 'bg-green-200 border-green-600' : (answers[qIndex] === oIndex ? 'bg-red-200 border-red-600' : 'bg-gray-100')) : (answers[qIndex] === oIndex ? 'bg-blue-200 border-blue-600' : 'bg-white hover:bg-gray-50')}`}>{opt}</button>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="text-center mt-6">
                            {!submitted ? <button onClick={() => setSubmitted(true)} className="bg-blue-600 text-white font-bold py-2 px-6 rounded-lg hover:bg-blue-700">Check Score</button> : <p className="text-xl font-bold text-green-700">You scored {score} out of {quizQuestions.length}!</p>}
                        </div>
                    </section>
                    
                    <section className="bg-orange-100 border-2 border-orange-400 rounded-xl p-6 my-8 text-center">
                        <h2 className="text-2xl font-bold text-orange-800 mb-4">🌍 See Your Impact on India</h2>
                        <p className="mb-6 text-gray-700">When you follow these steps, you're not just managing waste - you're transforming our country!</p>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            <div className="bg-white p-4 rounded-lg border border-orange-300"><p className="font-bold text-3xl text-orange-600">40%</p><p className="text-sm text-gray-600">Less waste via composting</p></div>
                            <div className="bg-white p-4 rounded-lg border border-orange-300"><p className="font-bold text-3xl text-orange-600">80%</p><p className="text-sm text-gray-600">Less waste to landfills</p></div>
                            <div className="bg-white p-4 rounded-lg border border-orange-300"><p className="font-bold text-3xl text-orange-600">₹50,000</p><p className="text-sm text-gray-600">Saved per family yearly</p></div>
                            <div className="bg-white p-4 rounded-lg border border-orange-300"><p className="font-bold text-3xl text-orange-600">500kg</p><p className="text-sm text-gray-600">Less pollution per household</p></div>
                        </div>
                         <div className="bg-white border border-orange-300 rounded-lg p-4 mt-6">
                            <h3 className="font-semibold text-gray-800">🏘 Imagine If Your Whole Neighborhood Joined:</h3>
                            <p className="text-sm text-gray-600">If just 100 families follow these steps, we could stop 2 tonnes of waste from going to landfills every month!</p>
                        </div>
                    </section>

                    <section className="bg-green-100 border-2 border-green-500 rounded-xl p-8 text-center">
                        <div className="text-5xl mb-4">🏆</div>
                        <h2 className="text-2xl font-bold text-green-800 mb-2">Become a Green Champion!</h2>
                        <p className="mb-4 text-gray-700">You have the knowledge to make a real difference.</p>
                        <div className="bg-white p-4 rounded-lg inline-block border border-green-300 mb-6">
                            <h3 className="font-bold mb-2 text-gray-800">🚀 Your Action Plan:</h3>
                            <ul className="text-left text-sm space-y-1 text-gray-700">
                                <li className="flex items-center gap-2"><CheckCircle size={16} className="text-green-600"/>Set up your 3 bins.</li>
                                <li className="flex items-center gap-2"><CheckCircle size={16} className="text-green-600"/>Start making compost.</li>
                                <li className="flex items-center gap-2"><CheckCircle size={16} className="text-green-600"/>Try one new 3R habit.</li>
                                <li className="flex items-center gap-2"><CheckCircle size={16} className="text-green-600"/>Teach 3 friends what you learned.</li>
                            </ul>
                        </div>
                        <div>
                            <Link href="/login" className="bg-green-600 text-white font-bold py-3 px-8 rounded-lg hover:bg-green-700 transition">🌟 Join Green Champions</Link>
                        </div>
                    </section>
                </div>
            </main>
        </div>
    );
}