"use client";

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { useRouter } from 'next/navigation';
import { User, Users, BarChart2, CheckCircle, Clock } from 'lucide-react';

// A reusable card for displaying stats
const StatCard: React.FC<{ title: string; value: string | number; icon: React.ReactNode }> = ({ title, value, icon }) => (
    <div className="bg-white p-6 rounded-lg shadow-md flex items-center gap-4">
        <div className="bg-green-100 p-3 rounded-full">
            {icon}
        </div>
        <div>
            <p className="text-3xl font-bold text-gray-800">{value}</p>
            <p className="text-sm text-gray-500">{title}</p>
        </div>
    </div>
);

export default function AdminDashboardPage() {
    const router = useRouter();
    const [user, setUser] = useState<any>(null);
    const [stats, setStats] = useState({ totalUsers: 0, totalReports: 0, pendingReports: 0, resolvedReports: 0 });

    useEffect(() => {
        const checkUser = async () => {
            const { data: { session } } = await supabase.auth.getSession();
            if (!session) {
                router.push('/admin'); // Redirect to admin login if not authenticated
            } else {
                setUser(session.user);
                // Fetch stats from your database
                // This is a placeholder; you'd implement these as Supabase RPC functions
                // For the hackathon, we can use mock data.
                setStats({ totalUsers: 1254, totalReports: 5872, pendingReports: 123, resolvedReports: 5749 });
            }
        };
        checkUser();
    }, [router]);

    const handleLogout = async () => {
        await supabase.auth.signOut();
        router.push('/admin');
    };

    if (!user) {
        return <div className="min-h-screen flex items-center justify-center">Loading...</div>; // Or a proper loader
    }

    return (
        <div className="min-h-screen bg-gray-100">
            {/* Admin Header */}
            <header className="bg-white shadow-sm">
                <div className="container mx-auto px-4 py-4 flex justify-between items-center">
                    <h1 className="text-xl font-bold text-gray-800">Admin Dashboard</h1>
                    <div>
                        <span className="text-sm text-gray-600 mr-4">Welcome, {user.email}</span>
                        <button onClick={handleLogout} className="text-sm font-semibold text-red-600 hover:underline">
                            Logout
                        </button>
                    </div>
                </div>
            </header>

            <main className="container mx-auto p-4 md:p-6">
                {/* Statistics Section */}
                <section>
                    <h2 className="text-2xl font-semibold text-gray-700 mb-4">Platform Overview</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        <StatCard title="Total Users" value={stats.totalUsers} icon={<Users className="text-green-600" />} />
                        <StatCard title="Total Reports" value={stats.totalReports} icon={<BarChart2 className="text-green-600" />} />
                        <StatCard title="Pending Reports" value={stats.pendingReports} icon={<Clock className="text-yellow-600" />} />
                        <StatCard title="Resolved Reports" value={stats.resolvedReports} icon={<CheckCircle className="text-blue-600" />} />
                    </div>
                </section>

                {/* Recent Activity Section (Placeholder) */}
                <section className="mt-10">
                    <h2 className="text-2xl font-semibold text-gray-700 mb-4">Recent Activity</h2>
                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <p className="text-gray-500">A table or feed of recent reports will be displayed here.</p>
                        {/* You would map over recent reports data here */}
                    </div>
                </section>
            </main>
        </div>
    );
}