"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { supabase } from "@/lib/supabaseClient";
import Header from "@/app/components/Header";

export default function MapPage() {
  const [reports, setReports] = useState<unknown[]>([]);

  // Use dynamic import for the Map component to avoid SSR issues
  const Map = dynamic(() => import("@/app/components/Map"), {
    ssr: false,
    loading: () => <p>Loading map...</p>
  });

  useEffect(() => {
    async function loadReports() {
      const { data } = await supabase.from("reports").select("*");
      setReports(data || []);
    }
    loadReports();
  }, []);

  return (
    <div className="flex flex-col h-screen">
      <Header variant="report" />
      {/* This div wrapper is the key fix */}
      <div className="flex-grow w-full">
        <Map reports={reports} />
      </div>
    </div>
  );
}