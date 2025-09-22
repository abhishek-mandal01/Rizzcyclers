"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabaseClient";
import Header from "@/app/components/Header";

// Types for better type safety
type WasteCategory = 'plastic' | 'organic' | 'electronic' | 'hazardous' | 'mixed' | 'other';
type SeverityLevel = 'low' | 'medium' | 'high' | 'critical';

interface LocationData {
  lat: number | null;
  lng: number | null;
  address?: string;
}

export default function ReportPage() {
  // Form state
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState<WasteCategory>("mixed");
  const [severity, setSeverity] = useState<SeverityLevel>("medium");
  const [file, setFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [location, setLocation] = useState<LocationData>({ lat: null, lng: null });
  
  // UI state
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState<"success" | "error" | "info">("info");

  const wasteCategories = [
    { value: 'plastic', label: '♻️ Plastic' },
    { value: 'organic', label: '🍂 Organic' },
    { value: 'electronic', label: '💻 E-Waste' },
    { value: 'hazardous', label: '☣️ Hazardous' },
    { value: 'mixed', label: '🗑️ Mixed' },
    { value: 'other', label: '📦 Other' },
  ];

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files ? e.target.files[0] : null;
    if (selectedFile) {
      setFile(selectedFile);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  const handleGetLocation = () => {
    // ... your location logic
  };

  const handleSubmit = async (e: React.FormEvent) => {
    // ... your submit logic
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <Header variant="report" />
      <main className="container mx-auto px-4 py-8 pt-24">
        <div className="max-w-2xl mx-auto bg-white p-8 rounded-xl shadow-lg">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-800">Report Unmanaged Waste</h1>
            <p className="text-gray-600 mt-2">Your report helps create a cleaner community.</p>
          </div>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Title */}
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">Title <span className="text-red-500">*</span></label>
              <input type="text" id="title" value={title} onChange={(e) => setTitle(e.target.value)} required className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500" />
            </div>

            {/* Category */}
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Category <span className="text-red-500">*</span></label>
                <div className="grid grid-cols-3 gap-2">
                    {wasteCategories.map((cat) => (
                        <button key={cat.value} type="button" onClick={() => setCategory(cat.value as WasteCategory)} className={`p-3 rounded-lg border-2 text-sm transition ${category === cat.value ? 'border-green-500 bg-green-50' : 'border-gray-200 hover:border-gray-300'}`}>
                            {cat.label}
                        </button>
                    ))}
                </div>
            </div>

            {/* Description */}
            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">Description</label>
              <textarea id="description" value={description} onChange={(e) => setDescription(e.target.value)} rows={4} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500"></textarea>
            </div>

            {/* Photo Upload */}
            <div>
              <label htmlFor="image" className="block text-sm font-medium text-gray-700 mb-1">Upload Photo <span className="text-red-500">*</span></label>
              <input type="file" id="image" accept="image/*" onChange={handleFileChange} required className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-green-50 file:text-green-700 hover:file:bg-green-100" />
              {imagePreview && <img src={imagePreview} alt="Preview" className="mt-4 rounded-lg w-full max-h-60 object-cover" />}
            </div>

            {/* Location */}
            <div className="text-center">
                <button type="button" onClick={handleGetLocation} className="bg-blue-500 text-white px-6 py-2 rounded-full font-semibold hover:bg-blue-600 transition duration-300 flex items-center justify-center gap-2 mx-auto">
                    📍 {location.lat ? 'Location Captured!' : 'Capture My Location'}
                </button>
            </div>

            {/* Submit Button */}
            <div>
              <button type="submit" disabled={loading} className="w-full bg-green-600 text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-green-700 disabled:bg-gray-400">
                {loading ? 'Submitting...' : 'Submit Report'}
              </button>
            </div>
            {message && (
              <p className={`text-center font-medium ${messageType === 'success' ? 'text-green-600' : 'text-red-500'}`}>{message}</p>
            )}
          </form>
        </div>
      </main>
    </div>
  );
}