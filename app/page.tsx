"use client";

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';

// Define Prop types for our components
interface StatCardProps {
  number: number | string;
  label: string;
  delay?: number;
  shouldAnimate: boolean;
}

interface FeatureCardProps {
  icon: string;
  title: string;
  description: string;
  link: string;
  delay?: number;
}

// THIS IS THE UPDATED HEADER COMPONENT
const Header = ({ variant = 'default' }: { variant?: 'default' | 'report' | 'login' }) => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <header className={`fixed top-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-green-700/95 backdrop-blur-md shadow-lg' : 'bg-gradient-to-r from-green-800 to-green-600'}`}>
      <div className="max-w-6xl mx-auto flex justify-between items-center px-6 py-4">
        <Link href="/" className="flex items-center text-white text-2xl font-bold">
          <span className="mr-3 text-2xl">♻️</span>
          Rizzcycler
        </Link>
        <nav className="hidden md:flex items-center space-x-6">
          {/* Conditional rendering based on the variant prop */}
          {variant === 'default' && (
            <>
              <button onClick={() => scrollToSection('home')} className="text-white font-medium hover:text-green-200">Home</button>
              <button onClick={() => scrollToSection('features')} className="text-white font-medium hover:text-green-200">Features</button>
              <Link href="/report" className="text-white font-medium hover:text-green-200">Report</Link>
              <Link href="/map" className="text-white font-medium hover:text-green-200">Map</Link>
              <Link href="/login" className="bg-white text-green-700 font-bold px-4 py-2 rounded-full text-sm">Login / Sign Up</Link>
            </>
          )}
          {variant === 'report' && (
            <>
              <Link href="/" className="text-white font-medium hover:text-green-200">Home</Link>
              <Link href="/map" className="text-white font-medium hover:text-green-200">Map</Link>
            </>
          )}
          {variant === 'login' && (
            <>
               <Link href="/" className="text-white font-medium hover:text-green-200">Home</Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
};

// ... (All your other components like HeroBanner, StatsSection, etc. remain exactly the same)
// Hero Banner Component
const HeroBanner = () => {
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center text-center text-white overflow-hidden bg-gradient-to-br from-green-800/90 via-green-600/80 to-green-700/90">
      <div className="relative z-10 max-w-4xl mx-auto px-6">
        <h1 className="text-4xl md:text-6xl font-bold mb-6">Transform Waste Management Across India</h1>
        <p className="text-lg md:text-xl mb-10 opacity-90">Join millions of citizens, NGOs, and organizations in building a cleaner, sustainable future...</p>
        <div className="flex flex-col md:flex-row gap-6 justify-center">
          <Link href="/map" className="bg-orange-600 hover:bg-orange-700 text-white font-bold py-4 px-8 rounded-full text-lg transition-all duration-300 transform hover:-translate-y-1 hover:shadow-xl shadow-lg flex items-center justify-center gap-3">
            🗺️ Explore Waste Map
          </Link>
          <Link href="/report" className="bg-white/20 hover:bg-white hover:text-green-800 text-white font-bold py-4 px-8 rounded-full text-lg transition-all duration-300 transform hover:-translate-y-1 border-2 border-white backdrop-blur-md flex items-center justify-center gap-3">
            📸 Report Waste Now
          </Link>
        </div>
      </div>
    </section>
  );
};

// Counter Animation Hook
const useCountAnimation = (endValue: number, duration = 2000, shouldStart = false) => {
    const [count, setCount] = useState(0);
    useEffect(() => {
        if (!shouldStart) return;
        let start = 0;
        const range = endValue - start;
        let startTime: number | null = null;
        
        const step = (timestamp: number) => {
            if (!startTime) startTime = timestamp;
            const progress = Math.min((timestamp - startTime) / duration, 1);
            const newCount = Math.floor(progress * range + start);
            setCount(newCount);
            if (progress < 1) {
                requestAnimationFrame(step);
            }
        };
        requestAnimationFrame(step);
    }, [endValue, duration, shouldStart]);
    return count;
};

// Stat Card Component
const StatCard: React.FC<StatCardProps> = ({ number, label, delay = 0, shouldAnimate }) => {
  const animatedNumber = useCountAnimation(parseInt(number.toString().replace(/[^\d]/g, '')), 2000, shouldAnimate);
  const formatNumber = (num: number) => {
    if (label.includes('%')) return `${num}%`;
    return num.toLocaleString();
  };
  return (
    <div className={`bg-gradient-to-br from-green-500 to-green-600 text-white p-8 rounded-2xl shadow-xl transform transition-all duration-700 ${shouldAnimate ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'}`} style={{ transitionDelay: `${delay}ms` }}>
      <div className="text-4xl md:text-5xl font-bold mb-3">{shouldAnimate ? formatNumber(animatedNumber) : '0'}</div>
      <div className="text-lg opacity-90">{label}</div>
    </div>
  );
};

// Stats Section Component
const StatsSection = () => {
    const [isVisible, setIsVisible] = useState(false);
    const sectionRef = useRef<HTMLDivElement | null>(null);
    useEffect(() => {
        const observer = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) {
                setIsVisible(true);
                if (sectionRef.current) observer.unobserve(sectionRef.current);
            }
        }, { threshold: 0.3 });
        if (sectionRef.current) observer.observe(sectionRef.current);
        return () => {
            if (sectionRef.current) observer.unobserve(sectionRef.current);
        };
    }, []);
    const statsData = [
        { number: 12340, label: 'Kg Waste Collected' },
        { number: '78%', label: 'Recycled Waste' },
        { number: 1256, label: 'Complaints Resolved' },
        { number: 65, label: 'Active Campaigns' }
    ];
    return (
        <section ref={sectionRef} className="bg-white py-20 -mt-12 relative z-10 rounded-t-[3rem] shadow-2xl">
            <div className="max-w-6xl mx-auto px-6 text-center">
                <h2 className="text-3xl md:text-4xl font-bold text-green-800 mb-6">Our Growing Impact</h2>
                <p className="text-lg text-gray-600 mb-16 max-w-2xl mx-auto">Real-time data showing how communities are making a difference</p>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {statsData.map((stat, index) => (
                        <StatCard key={index} {...stat} delay={index * 200} shouldAnimate={isVisible} />
                    ))}
                </div>
            </div>
        </section>
    );
};

// Feature Card Component
const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, description, link, delay = 0 }) => {
    return (
        <div className="bg-white p-8 rounded-2xl text-center shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border-t-4 border-green-500">
            <div className="text-4xl mb-6 text-green-600">{icon}</div>
            <h3 className="text-xl font-bold text-green-800 mb-4">{title}</h3>
            <p className="text-gray-600 mb-6 leading-relaxed">{description}</p>
            <Link href={link} className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-bold py-3 px-6 rounded-full transition-all duration-300 transform hover:translate-x-1 flex items-center gap-2 mx-auto">
                View More →
            </Link>
        </div>
    );
};

// Features Section Component
const FeaturesSection = () => {
    const featuresData: FeatureCardProps[] = [
        { icon: '📢', title: 'Citizens Training', description: 'Learn proper waste segregation...', link: '/training' },
        { icon: '👷', title: 'Worker Training & Jobs', description: 'Skill development and employment...', link: '/join' },
        { icon: '📊', title: 'Campaigns', description: 'Join community drives...', link: '/campaings' },
        { icon: '👥', title: 'Green Champion', description: 'Become a community leader...', link: '/champion' },
        { icon: '♻️', title: 'Marketplace', description: 'Buy and sell recyclable materials...', link: '/marketplace' },
        { icon: '📈', title: 'Digital Dashboard', description: 'Track community progress...', link: '/admin' }
    ];
    return (
        <section id="features" className="bg-gray-50 py-20">
            <div className="max-w-6xl mx-auto px-6">
                <h2 className="text-3xl md:text-4xl font-bold text-green-800 text-center mb-16">How Rizzcycler Works</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {featuresData.map((feature, index) => (
                        <FeatureCard key={index} {...feature} delay={index * 100} />
                    ))}
                </div>
            </div>
        </section>
    );
};

// Footer Component
const Footer = () => {
    return (
        <footer className="bg-green-900 text-white text-center py-12">
            <div className="max-w-6xl mx-auto px-6">
                <p className="text-lg">&copy; 2025 Rizzcycler | Designed with 🌱 Green Vision</p>
                <p className="mt-3 opacity-80">Building a cleaner India, one community at a time</p>
            </div>
        </footer>
    );
};

// Floating Action Button Component
const FloatingActionButton = () => {
    return (
        <Link href="/report" className="fixed bottom-8 right-8 w-16 h-16 bg-orange-600 hover:bg-orange-700 text-white rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-110 z-50 flex items-center justify-center text-2xl" title="Quick Report">
            📸
        </Link>
    );
};

// This is the main component that Next.js will render for the homepage.
export default function RizzcyclerHomepage() {
    return (
        <div className="font-sans bg-gradient-to-br from-gray-50 to-blue-50 min-h-screen">
            <Header />
            <main>
                <HeroBanner />
                <StatsSection />
                <FeaturesSection />
            </main>
            <Footer />
            <FloatingActionButton />
        </div>
    );
}