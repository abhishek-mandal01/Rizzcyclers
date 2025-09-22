"use client";

import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import { supabase } from '@/lib/supabaseClient';
import Header from '@/app/components/Header';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const router = useRouter();
  const [session, setSession] = useState<any>(null);

  useEffect(() => {
    // Check for an active session when the component mounts
    const getSession = async () => {
        const { data } = await supabase.auth.getSession();
        if (data.session) {
            router.push('/'); // Redirect immediately if session exists
        }
    };
    getSession();

    // Listen for auth state changes (login/logout)
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      setSession(session);
      if (session) {
        router.push('/'); // Redirect after a successful login event
      }
    });

    return () => subscription.unsubscribe();
  }, [router]);

  return (
    <div className="bg-gray-50 min-h-screen">
      <Header variant="login" />
      <div className="container mx-auto px-6 py-12 flex justify-center">
        <div className="w-full max-w-md mt-16">
          <div className="bg-white p-8 rounded-lg shadow-lg">
            <Auth
              supabaseClient={supabase}
              appearance={{ theme: ThemeSupa }}
              providers={['google']}
              theme="light"
            />
          </div>
        </div>
      </div>
    </div>
  );
}