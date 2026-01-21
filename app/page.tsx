"use client";

import dynamic from "next/dynamic";

const WeeklyScheduler = dynamic(() => import("./jadwal"), { ssr: false });

export default function Home() {
  return (
    <div>
      <WeeklyScheduler />
    </div>
  );
}
