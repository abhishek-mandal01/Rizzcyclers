"use client";

import React, { useState } from 'react';
import Header from '@/app/components/Header';
import Link from 'next/link';
import { Users, Camera, Target, Trophy, Star, CheckCircle, X } from 'lucide-react';

// Reusable Section Component
const Section: React.FC<{ icon: React.ReactNode; title: string; children: React.ReactNode }> = ({ icon, title, children }) => (
    <div className="bg-white border border-gray-200 rounded-xl overflow-hidden mb-8 shadow-lg hover:shadow-xl transition-shadow duration-300">
        <div className="bg-gradient-to-r from-green-600 to-green-700 text-white p-5 flex items-center gap-4">
            <div className="text-3xl">{icon}</div>
            <h3 className="text-2xl font-bold">{title}</h3>
        </div>
        <div className="p-6">{children}</div>
    </div>
);

// Reusable Modal Component
const Modal: React.FC<{ isOpen: boolean; onClose: () => void; title: string; children: React.ReactNode }> = ({ isOpen, onClose, title, children }) => {
    if (!isOpen) return null;
    return (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
                <div className="flex justify-between items-center p-4 border-b">
                    <h2 className="text-xl font-bold text-gray-800">{title}</h2>
                    <button onClick={onClose} className="text-gray-500 hover:text-gray-800"><X size={24} /></button>
                </div>
                <div className="p-6">{children}</div>
            </div>
        </div>
    );
};

// Main Campaigns Page Component
export default function CampaignsPage() {
    const [isRegistrationModalOpen, setRegistrationModalOpen] = useState(false);
    const [isCreateEventModalOpen, setCreateEventModalOpen] = useState(false);

    const handleRegistrationSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        alert('🎉 Registration Successful! See you at the drive!');
        setRegistrationModalOpen(false);
    };

    const handleCreateEventSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        alert('✅ Event Created Successfully! It is now live on our platform.');
        setCreateEventModalOpen(false);
    };

    return (
        <div className="bg-gray-100">
            <Header variant="report" />
            <main className="container mx-auto px-4 py-8 pt-24">
                <div className="bg-white p-4 md:p-6 rounded-2xl shadow-2xl">
                    <header className="text-center bg-gradient-to-r from-green-600 to-emerald-600 text-white p-10 rounded-xl shadow-lg mb-8">
                        <h1 className="text-4xl font-extrabold flex items-center justify-center gap-3"><Users size={40} /> Campaigns & Community</h1>
                        <p className="text-xl mt-3 opacity-90">Together We Build a Cleaner India!</p>
                    </header>
                    
                    <Section icon={<CheckCircle />} title="Weekly 'Cleaning Day' Drives">
                        <p className="text-gray-700 mb-4">Join us every Saturday morning to transform our public spaces into clean, healthy environments for everyone.</p>
                        <button onClick={() => setRegistrationModalOpen(true)} className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-6 rounded-lg transition">Register for Next Drive</button>
                    </Section>

                    <Section icon={<Camera />} title="'If You See Waste, Send a Photo' Movement">
                        <p className="text-gray-700 mb-4">Your single photo can trigger immediate action. Be a watchdog for your community's cleanliness.</p>
                        <Link href="/report" className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-6 rounded-lg transition">Report Waste Now</Link>
                    </Section>

                    <Section icon={<Target />} title="Host Your Own Campaign">
                        <p className="text-gray-700 mb-4">Take the lead! We provide the tools to create, promote, and manage your own waste management events.</p>
                        <button onClick={() => setCreateEventModalOpen(true)} className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-6 rounded-lg transition">Create Your Event</button>
                    </Section>

                    <Section icon={<Trophy />} title="'Green Champions' Leaderboard">
                        <p className="text-gray-700 mb-4">See which communities are leading the way! Recognition motivates excellence and inspires others.</p>
                        <div className="bg-gray-50 p-4 rounded-lg border">
                            {/* Leaderboard preview */}
                            <div className="flex justify-between items-center p-2 bg-yellow-300 rounded font-bold"><span>🥇 Greenfield Society</span><span>98 pts</span></div>
                            <div className="flex justify-between items-center p-2 bg-gray-300 rounded mt-2"><span>🥈 Delhi Public School</span><span>94 pts</span></div>
                            <div className="flex justify-between items-center p-2 bg-yellow-600 text-white rounded mt-2"><span>🥉 Clean Earth NGO</span><span>87 pts</span></div>
                        </div>
                    </Section>
                </div>

                <Modal isOpen={isRegistrationModalOpen} onClose={() => setRegistrationModalOpen(false)} title="🧹 Register for Cleaning Drive">
                    <form onSubmit={handleRegistrationSubmit} className="space-y-4">
                        <div><label className="block text-sm font-medium">Full Name *</label><input type="text" required className="w-full p-2 border rounded"/></div>
                        <div><label className="block text-sm font-medium">Email Address *</label><input type="email" required className="w-full p-2 border rounded"/></div>
                        <div><label className="block text-sm font-medium">Phone Number *</label><input type="tel" required className="w-full p-2 border rounded"/></div>
                        <button type="submit" className="w-full bg-green-600 text-white font-bold py-3 rounded-lg hover:bg-green-700">Register Now</button>
                    </form>
                </Modal>

                <Modal isOpen={isCreateEventModalOpen} onClose={() => setCreateEventModalOpen(false)} title="🎯 Create Your Campaign">
                    <form onSubmit={handleCreateEventSubmit} className="space-y-4">
                        <div><label className="block text-sm font-medium">Event Title *</label><input type="text" required className="w-full p-2 border rounded"/></div>
                        <div><label className="block text-sm font-medium">Event Date *</label><input type="date" required className="w-full p-2 border rounded"/></div>
                        <div><label className="block text-sm font-medium">Location *</label><input type="text" required className="w-full p-2 border rounded"/></div>
                        <button type="submit" className="w-full bg-green-600 text-white font-bold py-3 rounded-lg hover:bg-green-700">Create Event</button>
                    </form>
                </Modal>
            </main>
        </div>
    );
}