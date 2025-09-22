"use client";

import React, { useState, useEffect, useRef } from 'react';
import Header from '@/app/components/Header';
import { Shield, Briefcase, CheckCircle, HardHat } from 'lucide-react';

// Main Jobs Page Component
export default function WorkerJobsPage() {
    const [hasExperience, setHasExperience] = useState<boolean | null>(null);
    const formRef = useRef<HTMLFormElement>(null);

    const scrollToForm = () => {
        formRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // In a real app, you would handle form data submission here
        alert('🎉 Application Submitted Successfully!');
        formRef.current?.reset();
        setHasExperience(null);
    };

    return (
        <div className="bg-gray-100">
            <Header variant="report" />
            <main className="container mx-auto px-4 py-8 pt-24">
                <div className="bg-white p-5 rounded-2xl shadow-xl">
                    <header className="text-center bg-gradient-to-r from-green-600 to-green-800 text-white p-10 rounded-xl shadow-lg mb-8">
                        <h1 className="text-4xl font-extrabold flex items-center justify-center gap-3"><HardHat size={40} /> RIZZCYCLER</h1>
                        <p className="text-xl mt-3 opacity-90">Empowering India's Waste Warriors with Skills, Safety & Dignity</p>
                    </header>

                    <section className="mb-10">
                        <h2 className="text-3xl font-bold text-green-800 mb-4 border-b-4 border-green-500 pb-2">Training & Jobs for Waste Warriors</h2>
                        <div className="bg-green-50 border-l-4 border-green-500 p-6 rounded-r-lg mt-6 text-gray-700 text-lg">
                            <p>Waste workers are the backbone of a clean India. Our mission is to empower these essential workers with proper training, safety equipment, and dignified employment opportunities.</p>
                        </div>

                        <div className="mt-8 space-y-8">
                            <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                                <h3 className="text-xl font-semibold text-green-700 mb-3 flex items-center gap-2"><Shield /> Mandatory Training for Safety</h3>
                                <ul className="list-disc list-inside space-y-2 text-gray-600">
                                    <li><strong>Waste Types:</strong> Safely handle hazardous, medical, and electronic waste.</li>
                                    <li><strong>Safety Gear (PPE):</strong> Proper use of gloves, masks, boots, and high-visibility vests.</li>
                                    <li><strong>Emergency Protocols:</strong> First aid and accident reporting procedures.</li>
                                </ul>
                            </div>
                            <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                                <h3 className="text-xl font-semibold text-green-700 mb-3 flex items-center gap-2"><Briefcase /> Dignified Job Opportunities</h3>
                                <ul className="list-disc list-inside space-y-2 text-gray-600">
                                    <li><strong>Waste Collection Drivers:</strong> Operate GPS-tracked vehicles on efficient routes.</li>
                                    <li><strong>Sorting Specialists:</strong> Expert material recovery and quality control at facilities.</li>
                                    <li><strong>Plant Operators:</strong> Technical operation of compost and waste-to-energy plants.</li>
                                </ul>
                            </div>
                        </div>
                    </section>

                    <section className="text-center bg-gradient-to-r from-green-500 to-green-600 text-white p-8 rounded-xl shadow-lg my-10">
                        <h3 className="text-3xl font-bold mb-4">Join India's Green Revolution!</h3>
                        <p className="text-lg mb-6">Be part of the solution. Build a career that makes a difference.</p>
                        <button onClick={scrollToForm} className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-4 px-10 rounded-full text-xl transition transform hover:scale-105 shadow-xl">
                            Apply Now
                        </button>
                    </section>

                    <section ref={formRef} className="bg-gray-50 border-2 border-gray-200 rounded-2xl p-8">
                        <h2 className="text-3xl font-bold text-gray-700 text-center mb-6">🗂 Job Application Form</h2>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            {/* Personal Information */}
                            <div className="grid md:grid-cols-2 gap-6">
                                <div>
                                    <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">Full Name <span className="text-red-500">*</span></label>
                                    <input type="text" id="fullName" required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"/>
                                </div>
                                <div>
                                    <label htmlFor="contactNumber" className="block text-sm font-medium text-gray-700">Contact Number <span className="text-red-500">*</span></label>
                                    <input type="text" id="contactNumber" pattern="[0-9]{10}" required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"/>
                                </div>
                            </div>
                            {/* Job Preferences */}
                             <div>
                                <label htmlFor="preferredRole" className="block text-sm font-medium text-gray-700">Preferred Role <span className="text-red-500">*</span></label>
                                <select id="preferredRole" required className="mt-1 block w-full px-3 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500">
                                    <option value="">Select a role</option>
                                    <option value="driver">Waste Collection Driver</option>
                                    <option value="specialist">Sorting Specialist</option>
                                    <option value="operator">Plant Operator</option>
                                </select>
                            </div>
                            {/* Past Experience */}
                            <fieldset className="space-y-2">
                                <legend className="text-sm font-medium text-gray-700">Do you have previous experience? <span className="text-red-500">*</span></legend>
                                <div className="flex gap-4">
                                    <label className="flex items-center gap-2"><input type="radio" name="experience" value="yes" onChange={() => setHasExperience(true)} required className="focus:ring-green-500 h-4 w-4 text-green-600 border-gray-300"/>Yes</label>
                                    <label className="flex items-center gap-2"><input type="radio" name="experience" value="no" onChange={() => setHasExperience(false)} required className="focus:ring-green-500 h-4 w-4 text-green-600 border-gray-300"/>No</label>
                                </div>
                            </fieldset>
                            {hasExperience && (
                                <div>
                                    <label htmlFor="experienceDescription" className="block text-sm font-medium text-gray-700">Describe Your Experience</label>
                                    <textarea id="experienceDescription" rows={4} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"></textarea>
                                </div>
                            )}
                            {/* Declaration */}
                            <div className="flex items-start">
                                <div className="flex items-center h-5">
                                    <input id="declaration" type="checkbox" required className="focus:ring-green-500 h-4 w-4 text-green-600 border-gray-300 rounded" />
                                </div>
                                <div className="ml-3 text-sm">
                                    <label htmlFor="declaration" className="font-medium text-gray-700">I declare that all information provided is true and accurate. <span className="text-red-500">*</span></label>
                                </div>
                            </div>
                            {/* Submit Button */}
                            <div className="text-center pt-4">
                                <button type="submit" className="w-full md:w-auto bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-12 rounded-lg text-lg transition shadow-lg">Submit Application</button>
                            </div>
                        </form>
                    </section>
                </div>
            </main>
        </div>
    );
}