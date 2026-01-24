"use client";

import { useState } from "react";
import { Calendar, ArrowLeft, RefreshCw } from "lucide-react";
import { DaySchedule, Schedule, Page } from "../types/schedule";
import { sortByDate } from "../utils/dateUtils";
import { DayCard } from "./DayCard";
import { useTheme } from "../context/ThemeContext";

interface ViewPageProps {
  weekData: DaySchedule[];
  loading: boolean;
  refreshing: boolean;
  onNavigate: (page: Page) => void;
  onRefresh: () => void;
  onAddSchedule: (dayId: string, schedule: Schedule) => Promise<void>;
  onDeleteSchedule: (dayId: string, scheduleId: string) => Promise<void>;
  onDeleteDay: (dayId: string) => Promise<void>;
  onToggleComplete: (dayId: string, scheduleId: string) => Promise<void>;
}

export const ViewPage = ({
  weekData,
  loading,
  refreshing,
  onNavigate,
  onRefresh,
  onAddSchedule,
  onDeleteSchedule,
  onDeleteDay,
  onToggleComplete,
}: ViewPageProps) => {
  const [savingDay, setSavingDay] = useState<string | null>(null);
  const [deletingDay, setDeletingDay] = useState<string | null>(null);
  const [deletingSchedule, setDeletingSchedule] = useState<string | null>(null);
  const {isDark} = useTheme()

  const handleAddSchedule = async (dayId: string, schedule: Schedule) => {
    setSavingDay(dayId);
    await onAddSchedule(dayId, schedule);
    setSavingDay(null);
  };

  const handleDeleteDay = async (dayId: string) => {
    setDeletingDay(dayId);
    await onDeleteDay(dayId);
    setDeletingDay(null);
  };

  const handleDeleteSchedule = async (dayId: string, scheduleId: string) => {
    setDeletingSchedule(scheduleId);
    await onDeleteSchedule(dayId, scheduleId);
    setDeletingSchedule(null);
  };

  return (
    <div className={`min-h-screen ${isDark ? 'bg-black' : 'bg-gradient-to-br from-blue-50 to-indigo-50'} p-4 md:p-8 transition-colors`}>
      <div className="max-w-7xl mx-auto">
        <div className="mb-8 flex items-center justify-between">
          <button
            onClick={() => onNavigate("menu")}
            className={`flex items-center gap-2 px-4 py-2 ${
              isDark ? 'bg-gray-900 border-gray-800 text-white' : 'bg-white border-gray-200 text-gray-800'
            } border rounded-xl shadow hover:shadow-md transition-all`}
          >
            <ArrowLeft className="w-5 h-5" />
            Kembali
          </button>
          <h1 className="text-3xl font-bold text-gray-800">Jadwal</h1>
          <button
            onClick={onRefresh}
            disabled={refreshing}
            className="flex items-center gap-2 px-4 py-2 bg-white rounded-lg shadow hover:shadow-md transition-all text-gray-800 disabled:opacity-50"
          >
            <RefreshCw className={`w-5 h-5 ${refreshing ? "animate-spin" : ""}`} />
            Refresh
          </button>
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center h-[60vh]">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-indigo-600 mb-6"></div>
            <p className="text-gray-600 font-medium">Memuat jadwal...</p>
          </div>
        ) : weekData.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-[60vh]">
            <Calendar className="w-32 h-32 text-gray-300 mb-6" />
            <h2 className="text-2xl font-semibold text-gray-400 mb-2">Belum Ada Jadwal</h2>
            <p className="text-gray-400 mb-6">Buat jadwal pertamamu untuk memulai</p>
            <button
              onClick={() => onNavigate("create")}
              className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-medium transition-all shadow-lg"
            >
              Buat Jadwal Sekarang
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 auto-rows-fr">
            {[...weekData].sort(sortByDate).map((day) => (
              <DayCard
                key={day.id}
                day={day}
                savingDay={savingDay}
                deletingDay={deletingDay}
                deletingSchedule={deletingSchedule}
                onAddSchedule={handleAddSchedule}
                onDeleteSchedule={handleDeleteSchedule}
                onDeleteDay={handleDeleteDay}
                onToggleComplete={onToggleComplete}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};