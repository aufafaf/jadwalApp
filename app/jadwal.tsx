"use client";

import { useState } from "react";
import { Page } from "./types/schedule";
import { useScheduleData } from "./hooks/useScheduleData";
import { ThemeProvider } from "./context/ThemeContext";
import { MenuPage } from "./components/MenuPage";
import { ViewPage } from "./components/ViewPage";
import { CreatePage } from "./components/CreatePage";
import { SettingsPage } from "./components/SettingsPage";
import { AnalyticsPage } from "./components/AnalyticsPage";


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

  return (
    <ThemeProvider>
      {currentPage === "menu" && (
        <MenuPage onNavigate={setCurrentPage} weekData={weekData} />
      )}
      {currentPage === "view" && (
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
      )}
      {currentPage === "create" && (
        <CreatePage onNavigate={setCurrentPage} onCreateDay={createDay} />
      )}
      {currentPage === "settings" && (
        <SettingsPage onNavigate={setCurrentPage} />
      )}
      {currentPage === "analytics" && (
  <AnalyticsPage onNavigate={setCurrentPage} weekData={weekData} />
)}
    </ThemeProvider>
  );
};

export default WeeklyScheduler;