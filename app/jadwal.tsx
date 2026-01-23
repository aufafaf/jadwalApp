"use client";

import { useState } from "react";
import { Page } from "./types/schedule";
import { useScheduleData } from "./hooks/useScheduleData";
import { MenuPage } from "./components/MenuPage";
import { ViewPage } from "./components/ViewPage";
import { CreatePage } from "./components/CreatePage";

const WeeklyScheduler = () => {
  const [currentPage, setCurrentPage] = useState<Page>("menu");
  const {
    weekData,
    loading,
    refreshing,
    loadData,
    createDay,
    addSchedule,
    deleteSchedule,
    deleteDay,
    toggleComplete,
  } = useScheduleData();

  if (currentPage === "menu") {
    return <MenuPage onNavigate={setCurrentPage} weekData={weekData} />; {/* ← TAMBAH weekData */}
  }

  if (currentPage === "view") {
    return (
      <ViewPage
        weekData={weekData}
        loading={loading}
        refreshing={refreshing}
        onNavigate={setCurrentPage}
        onRefresh={loadData}
        onAddSchedule={addSchedule}
        onDeleteSchedule={deleteSchedule}
        onDeleteDay={deleteDay}
        onToggleComplete={toggleComplete}
      />
    );
  }

  return <CreatePage onNavigate={setCurrentPage} onCreateDay={createDay} />;
};

export default WeeklyScheduler;