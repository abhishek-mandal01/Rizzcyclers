"use client";

import React, { useState, useEffect, useRef } from 'react';
import Header from '@/app/components/Header'; // Assuming your standard Header component
import Link from 'next/link';
import { Recycle, User, Star, Upload, X } from 'lucide-react';

// --- Reusable Modal Component ---
const SellModal: React.FC<{ isOpen: boolean; onClose: () => void; material: string }> = ({ isOpen, onClose, material }) => {
    if (!isOpen) return null;

    const [fileName, setFileName] = useState('');

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setFileName(e.target.files[0].name);
        }
    };
    
    const handleSubmit = () => {
        alert(`Your listing for "${material}" has been submitted!`);
        onClose();
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60 p-4">
            <div className="bg-white rounded-2xl p-8 max-w-md w-full mx-4 relative shadow-2xl">
                <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600">
                    <X size={28} />
                </button>
                <h3 className="text-3xl font-bold text-gray-900 mb-2 text-center">Sell Your Scrap</h3>
                <p className="text-gray-600 mb-6 text-center">List your <strong className="text-emerald-600">{material}</strong> for sale.</p>
                
                <div className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-2xl p-6 mb-6">
                    <Upload size={48} className="text-gray-400 mb-2" />
                    <label htmlFor="photo-upload" className="cursor-pointer text-emerald-600 font-semibold hover:text-emerald-500 transition-colors">
                        Upload a photo
                    </label>
                    <input type="file" id="photo-upload" className="hidden" accept="image/*" onChange={handleFileChange} />
                    {fileName && <p className="text-sm text-gray-500 mt-2">File: {fileName}</p>}
                </div>

                <button onClick={handleSubmit} className="w-full bg-gradient-to-r from-emerald-500 to-green-500 hover:from-emerald-600 hover:to-green-600 text-white px-8 py-4 rounded-full text-lg font-bold transition-all duration-300 transform hover:scale-105 hover:shadow-xl">
                    Sell It
                </button>
            </div>
        </div>
    );
};


// --- Main Marketplace Page ---
export default function MarketplacePage() {
    const [isModalOpen, setModalOpen] = useState(false);
    const [selectedMaterial, setSelectedMaterial] = useState('');

    const openModal = (material: string) => {
        setSelectedMaterial(material);
        setModalOpen(true);
    };

    const materials = [
        { name: "Paper & Cardboard", price: "₹8-15/kg", icon: "📄", color: "from-orange-400 to-orange-500" },
        { name: "Plastics", price: "₹12-25/kg", icon: "🥤", color: "from-blue-400 to-blue-500" },
        { name: "Metals", price: "₹45-180/kg", icon: "🔩", color: "from-gray-400 to-gray-600" },
        { name: "E-Waste", price: "₹30-500/piece", icon: "📱", color: "from-purple-400 to-purple-500" },
        { name: "Glass & Textiles", price: "₹5-20/kg", icon: "👕", color: "from-green-400 to-emerald-500" },
    ];

    return (
        <div className="bg-gray-50">
            <Header variant="report" />
            <SellModal isOpen={isModalOpen} onClose={() => setModalOpen(false)} material={selectedMaterial} />

            <main>
                <section className="bg-gradient-to-br from-green-600 to-emerald-700 min-h-screen flex items-center justify-center relative overflow-hidden pt-16">
                    <div className="max-w-4xl mx-auto text-center px-4 relative z-10">
                        <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
                            Turn Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-yellow-500">Trash</span><br/>into <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-yellow-500">Treasure</span>
                        </h1>
                        <p className="text-xl md:text-2xl text-white/90 mb-10 max-w-3xl mx-auto">
                            The first verified marketplace to buy and sell recyclable waste from your home or business.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <button onClick={() => openModal('General Scrap')} className="bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-gray-900 px-8 py-4 rounded-full text-lg font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-2xl">
                                🚛 Sell My Scrap
                            </button>
                            <Link href="#materials" className="bg-white/30 backdrop-blur-sm border-2 border-white/40 text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-white/40 transition-all duration-300 transform hover:scale-105">
                                🔍 Browse Materials
                            </Link>
                        </div>
                    </div>
                </section>

                <section id="materials" className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
                    <div className="max-w-7xl mx-auto px-4">
                        <h2 className="text-4xl md:text-5xl font-bold text-center text-gray-900 mb-4">
                            Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-green-500">Waste</span> is Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 to-orange-500">Resource</span>
                        </h2>
                        <p className="text-xl text-gray-600 text-center mb-16 max-w-2xl mx-auto">
                            Turn everyday items into income with our recycling marketplace. Click any material to start selling.
                        </p>
                        
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
                            {materials.map(material => (
                                <button key={material.name} onClick={() => openModal(material.name)} className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 text-center transition-all duration-300 transform hover:-translate-y-2 hover:shadow-2xl">
                                    <div className={`w-16 h-16 bg-gradient-to-br ${material.color} rounded-xl flex items-center justify-center mx-auto mb-4 text-white text-3xl`}>
                                        {material.icon}
                                    </div>
                                    <h3 className="font-semibold text-gray-900 mb-2">{material.name}</h3>
                                    <p className="text-sm text-gray-600">{material.price}</p>
                                </button>
                            ))}
                        </div>
                    </div>
                </section>
                
                <section className="py-20 bg-white">
                    <div className="max-w-5xl mx-auto px-4">
                        <h2 className="text-4xl md:text-5xl font-bold text-center text-gray-900 mb-16">
                            Hear from Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-green-500">Community</span>
                        </h2>
                        <div className="grid md:grid-cols-2 gap-8">
                            <div className="bg-gray-50 p-8 rounded-2xl shadow-xl border border-gray-100">
                                <p className="text-gray-700 text-lg leading-relaxed mb-6">"I never knew my household waste could be so valuable! In just one month, I earned ₹2,800 from recyclables I would have thrown away. The pickup service is reliable and the app is so easy to use."</p>
                                <div className="flex items-center">
                                    <div className="w-12 h-12 bg-pink-500 rounded-full flex items-center justify-center text-white font-bold mr-4"><User /></div>
                                    <div><h4 className="font-semibold text-gray-900">Sunita Patel</h4><p className="text-gray-600 text-sm">Homemaker, Mumbai</p></div>
                                </div>
                            </div>
                            <div className="bg-gray-50 p-8 rounded-2xl shadow-xl border border-gray-100">
                                <p className="text-gray-700 text-lg leading-relaxed mb-6">"This platform connected me directly with quality suppliers. My business has grown 40% since joining."</p>
                                <div className="flex items-center">
                                    <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold mr-4"><Recycle /></div>
                                    <div><h4 className="font-semibold text-gray-900">Raj Kumar</h4><p className="text-gray-600 text-sm">Recycling Business Owner</p></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                 <footer className="bg-gray-900 text-white py-12">
                    <div className="max-w-7xl mx-auto px-4 text-center">
                         <p>&copy; 2025 Waste to Wealth by RizzCyclers. All rights reserved.</p>
                    </div>
                </footer>
            </main>
        </div>
    );
}

