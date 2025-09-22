"use client";

import React, { useState, useRef } from 'react';
import Header from '@/app/components/Header';
import { Leaf, UserPlus, Upload, Trophy, Award, BarChart2 } from 'lucide-react';

// Reusable Section Component
const Section: React.FC<{ id: string; title: string; icon: React.ReactNode; children: React.ReactNode; className?: string }> = 
({ id, title, icon, children, className = '' }) => (
    <section id={id} className={`py-12 md:py-20 ${className}`}>
        <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-center text-green-800 mb-12 flex items-center justify-center gap-3">
                {icon} {title}
            </h2>
            {children}
        </div>
    </section>
);

// Main Green Champions Page
export default function GreenChampionPage() {
    const registrationRef = useRef<HTMLDivElement>(null);

    const scrollToRegistration = () => {
        registrationRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    const leaderboardData = [
        { rank: 1, area: "Sector 21, Greenfield", score: 98, badge: "Most Active 🥇" },
        { rank: 2, area: "Ashok Nagar, Ward 5", score: 94, badge: "Segregation Star ⭐" },
        { rank: 3, area: "Sunrise Apartments RWA", score: 87, badge: "Cleanest Block 🌿" },
        { rank: 4, area: "MG Road, Block C", score: 82, badge: "" },
    ];

    return (
        <div className="bg-gray-50">
            <Header variant="report" />
            
            {/* Hero Section */}
            <header className="bg-gradient-to-r from-green-600 to-emerald-600 text-white text-center py-24 md:py-32 pt-40">
                <div className="container mx-auto px-4">
                    <Award size={64} className="mx-auto mb-4" />
                    <h1 className="text-4xl md:text-6xl font-extrabold">Become a Green Champion</h1>
                    <p className="text-lg md:text-xl mt-4 max-w-2xl mx-auto">Lead your community in building a cleaner, greener city.</p>
                    <button 
                        onClick={scrollToRegistration}
                        className="mt-8 bg-orange-500 hover:bg-orange-600 text-white font-bold py-4 px-8 rounded-full text-lg transition shadow-xl"
                    >
                        Join Now
                    </button>
                </div>
            </header>

            <main>
                {/* Registration Section */}
                <div ref={registrationRef}>
                    <Section id="register" title="Register as a Green Champion" icon={<UserPlus />} className="bg-green-50">
                        <div className="max-w-2xl mx-auto bg-white p-8 rounded-xl shadow-lg">
                            <form className="space-y-6">
                                <div className="grid md:grid-cols-2 gap-6">
                                    <div><label className="block text-sm font-medium">Full Name *</label><input type="text" required className="mt-1 w-full p-3 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"/></div>
                                    <div><label className="block text-sm font-medium">Area / Block / Ward *</label><input type="text" required className="mt-1 w-full p-3 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"/></div>
                                </div>
                                <div><label className="block text-sm font-medium">Phone Number *</label><input type="tel" required className="mt-1 w-full p-3 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"/></div>
                                <div><label className="block text-sm font-medium">Upload Profile Image/Logo (Optional)</label><input type="file" className="mt-1 w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:bg-green-100 file:text-green-700 hover:file:bg-green-200"/></div>
                                <button type="submit" className="w-full bg-green-600 text-white font-bold py-3 rounded-lg hover:bg-green-700 transition text-lg">Become a Champion</button>
                            </form>
                        </div>
                    </Section>
                </div>

                {/* Report Upload Section */}
                <Section id="upload" title="Upload Your Monthly Report" icon={<Upload />}>
                     <div className="max-w-2xl mx-auto bg-white p-8 rounded-xl shadow-lg">
                        <form className="space-y-6">
                            <div><label className="block text-sm font-medium">Upload Geo-tagged Image *</label><input type="file" accept="image/*" required className="mt-1 w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:bg-blue-100 file:text-blue-700 hover:file:bg-blue-200"/></div>
                            <div><label className="block text-sm font-medium">Short Description (Max 200 words) *</label><textarea rows={4} maxLength={200} required className="mt-1 w-full p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"></textarea></div>
                            <button type="submit" className="w-full bg-blue-600 text-white font-bold py-3 rounded-lg hover:bg-blue-700 transition text-lg">Submit Report</button>
                        </form>
                    </div>
                </Section>

                {/* Leaderboard Section */}
                <Section id="leaderboard" title="Top Performing Areas" icon={<Trophy />} className="bg-gray-100">
                    <div className="overflow-x-auto bg-white p-4 rounded-lg shadow-lg">
                        <table className="w-full text-sm text-left">
                            <thead className="bg-gray-200 text-gray-700 uppercase"><tr><th className="p-3">Rank</th><th>Area Name</th><th className="text-center">Score</th><th>Badge</th></tr></thead>
                            <tbody>
                                {leaderboardData.map(item => (
                                    <tr key={item.rank} className="border-b hover:bg-gray-50">
                                        <td className="p-3 font-bold text-lg">{item.rank}</td>
                                        <td className="font-medium text-gray-800">{item.area}</td>
                                        <td className="font-bold text-green-600 text-center text-lg">{item.score}</td>
                                        <td><span className={`text-xs font-semibold px-2 py-1 rounded-full ${item.badge.includes("Active") ? "bg-yellow-200 text-yellow-800" : item.badge ? "bg-green-200 text-green-800" : ""}`}>{item.badge}</span></td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </Section>
            </main>

            <footer className="bg-green-800 text-white text-center py-8">
                <p>&copy; 2025 RizzCyclers | All Rights Reserved.</p>
            </footer>
        </div>
    );
}