"use client";

import React from 'react';
import Header from '@/app/components/Header';
import { BookOpen, Target, CheckCircle, Recycle, Leaf, Users, Award, Tv, Home, Phone, Link } from 'lucide-react';

// Reusable Section Component for the Manual
const ManualSection: React.FC<{ id: string; title: string; icon: React.ReactNode; children: React.ReactNode }> = ({ id, title, icon, children }) => (
    <section id={id} className="mb-12 scroll-mt-24">
        <h2 className="text-3xl font-bold text-green-800 mb-6 flex items-center gap-3 border-b-4 border-green-200 pb-3">
            {icon} {title}
        </h2>
        <div className="space-y-6 text-gray-700 leading-relaxed">
            {children}
        </div>
    </section>
);

// Main Manual Page Component
export default function WasteManualPage() {
    const tableOfContents = [
        { title: "Introduction", id: "intro" },
        { title: "Citizen Training Module", id: "training" },
        { title: "Master Waste Segregation", id: "segregation" },
        { title: "Home Composting Guide", id: "composting" },
        { title: "Community Marketplace", id: "marketplace" },
        { title: "Green Champions", id: "champions" },
    ];

    return (
        <div className="bg-gray-50">
            <Header variant="report" />
            <main className="container mx-auto px-4 py-8 pt-24">
                <div className="bg-white p-6 md:p-8 rounded-2xl shadow-2xl">
                    <header className="text-center bg-gradient-to-r from-green-600 to-emerald-600 text-white p-10 rounded-xl shadow-lg mb-8">
                        <h1 className="text-4xl font-extrabold flex items-center justify-center gap-3"><BookOpen size={40} /> RizzCyclers Waste Management Manual</h1>
                        <p className="text-xl mt-3 opacity-95">Your Comprehensive Step-by-Step Guide</p>
                    </header>
                    
                    {/* Table of Contents */}
                    <div className="bg-gray-100 p-6 rounded-lg mb-12">
                        <h3 className="text-xl font-bold text-gray-800 mb-4">Table of Contents</h3>
                        <ul className="grid grid-cols-2 md:grid-cols-3 gap-4">
                            {tableOfContents.map(item => (
                                <li key={item.id}>
                                    <a href={`#${item.id}`} className="block p-3 bg-white rounded-md shadow-sm hover:bg-green-50 hover:shadow-md transition text-green-700 font-semibold">{item.title}</a>
                                </li>
                            ))}
                        </ul>
                    </div>
                    
                    <ManualSection id="intro" title="Introduction to Smart Waste Management" icon={<Target size={28} />}>
                        <p>Welcome! This guide will transform you into a waste management champion, helping create cleaner neighborhoods and a sustainable future for India. You will learn proper segregation, home composting, and how to use our digital tools to make an impact.</p>
                    </ManualSection>

                    <ManualSection id="training" title="Citizen Training & Awareness Module" icon={<Users size={28} />}>
                        <h4 className="font-bold text-xl mb-3">Understanding Waste Types</h4>
                        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                            <div className="p-4 bg-green-50 border-l-4 border-green-500 rounded-r-lg"><strong>Organic/Wet (Green Bin):</strong> Kitchen scraps, food waste, garden waste.</div>
                            <div className="p-4 bg-blue-50 border-l-4 border-blue-500 rounded-r-lg"><strong>Recyclable/Dry (Blue Bin):</strong> Paper, plastic, glass, metal.</div>
                            <div className="p-4 bg-red-50 border-l-4 border-red-500 rounded-r-lg"><strong>Hazardous (Red Bin):</strong> E-waste, batteries, paints, medicines.</div>
                            <div className="p-4 bg-gray-200 border-l-4 border-gray-500 rounded-r-lg"><strong>Non-Recyclable (Black Bin):</strong> Sanitary products, soiled items.</div>
                        </div>
                    </ManualSection>

                    <ManualSection id="segregation" title="Master Waste Segregation - Step by Step" icon={<Recycle size={28} />}>
                        <h4 className="font-bold text-xl mb-3">Setting Up Your System at Home</h4>
                        <p>Use 4 labeled bins (Green, Blue, Red, Black). Keep a small caddy in the kitchen for daily sorting, and larger bins outside for collection. Teach your family the color system for easy adoption.</p>
                    </ManualSection>
                    
                    <ManualSection id="composting" title="Home Composting Complete Guide" icon={<Leaf size={28} />}>
                        <h4 className="font-bold text-xl mb-3">Traditional Bin Composting</h4>
                         <ol className="list-decimal list-inside space-y-2">
                            <li><strong>Base Layer:</strong> Start with small twigs for drainage.</li>
                            <li><strong>Brown Layer:</strong> Add dry leaves or shredded paper (Carbon-rich).</li>
                            <li><strong>Green Layer:</strong> Add kitchen scraps (Nitrogen-rich).</li>
                            <li><strong>Repeat & Balance:</strong> Maintain a 3:1 ratio of brown to green materials.</li>
                            <li><strong>Maintain:</strong> Keep the pile moist and turn it weekly.</li>
                            <li><strong>Harvest:</strong> In 2-3 months, you'll have nutrient-rich compost for your plants!</li>
                        </ol>
                    </ManualSection>

                    <ManualSection id="marketplace" title="Community Marketplace Integration" icon={<Home size={28} />}>
                        <p>Our app includes a marketplace where you can sell valuable recyclable materials like clean plastic, paper bundles, and glass to verified local dealers. You can also buy eco-friendly products like organic compost and upcycled goods from other community members.</p>
                    </ManualSection>

                     <ManualSection id="champions" title="Green Champion Community Engagement" icon={<Award size={28} />}>
                        <p>Become a leader in your neighborhood! Green Champions organize cleanup drives, conduct workshops, and mentor other households. Your efforts are tracked on our community leaderboards, where you can earn badges and recognition for your impact.</p>
                        <Link href="/green-champion" className="inline-block mt-4 bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-6 rounded-lg transition">
                            Learn More About Green Champions
                        </Link>
                    </ManualSection>
                </div>
            </main>
        </div>
    );
}