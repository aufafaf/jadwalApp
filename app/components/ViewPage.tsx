"use client";

import { useState } from "react";
import { 
  Calendar, 
  ArrowLeft, 
  RefreshCw, 
  Plus,
  Moon,
  Sun,
  Bell,
  User,
  Search,
  Settings,
  LayoutGrid,
  List,
  X
} from "lucide-react";
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
  const { isDark, toggleTheme } = useTheme();
  const [savingDay, setSavingDay] = useState<string | null>(null);
  const [deletingDay, setDeletingDay] = useState<string | null>(null);
  const [deletingSchedule, setDeletingSchedule] = useState<string | null>(null);
  const [expandedCard, setExpandedCard] = useState<string | null>(null);

  const handleAddSchedule = async (dayId: string, schedule: Schedule) => {
    setSavingDay(dayId);
    await onAddSchedule(dayId, schedule);
    setSavingDay(null);
  };

  const handleDeleteDay = async (dayId: string) => {
    setDeletingDay(dayId);
    await onDeleteDay(dayId);
    setDeletingDay(null);
    setExpandedCard(null);
  };

  const handleDeleteSchedule = async (dayId: string, scheduleId: string) => {
    setDeletingSchedule(scheduleId);
    await onDeleteSchedule(dayId, scheduleId);
    setDeletingSchedule(null);
  };

  const handleCardClick = (dayId: string) => {
    setExpandedCard(expandedCard === dayId ? null : dayId);
  };

  return (
    <div className={`min-h-screen ${isDark ? 'bg-gray-950' : 'bg-gray-50'} transition-colors`}>
      {/* Premium Navbar */}
      <nav className={`${isDark ? 'bg-gray-900/80 border-gray-800' : 'bg-white/80 border-gray-200'} border-b sticky top-0 z-50 backdrop-blur-xl`}>
        <div className="max-w-[1400px] mx-auto px-4">
          <div className="flex items-center justify-between h-14">
            {/* Logo & Back */}
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <div className="relative">
                  <div className={`absolute inset-0 ${isDark ? 'bg-gradient-to-r from-cyan-400 to-blue-500' : 'bg-gradient-to-r from-cyan-500 to-blue-600'} rounded-md blur-sm opacity-75`}></div>
                  <div className={`relative bg-gradient-to-br ${isDark ? 'from-cyan-400 to-blue-500' : 'from-cyan-500 to-blue-600'} p-1.5 rounded-md`}>
                    <Calendar className="w-4 h-4 text-white" />
                  </div>
                </div>
                <span className={`text-base font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  ScheduleX
                </span>
              </div>

              <button
                onClick={() => onNavigate("menu")}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
                  isDark 
                    ? 'text-gray-400 hover:text-white hover:bg-gray-800' 
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                }`}
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                Dashboard
              </button>
            </div>

            {/* Center Title */}
            <div className="absolute left-1/2 transform -translate-x-1/2">
              <h1 className={`text-base font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                Semua Jadwal
              </h1>
            </div>

            {/* Right Section */}
            <div className="flex items-center gap-2">
              <button
                onClick={onRefresh}
                disabled={refreshing}
                className={`p-1.5 rounded-md transition-all ${
                  isDark 
                    ? 'bg-gray-800 hover:bg-gray-700 border border-gray-700 text-white' 
                    : 'bg-gray-100 hover:bg-gray-200 border border-gray-200 text-gray-900'
                } disabled:opacity-50`}
              >
                <RefreshCw className={`w-4 h-4 ${refreshing ? 'animate-spin' : ''}`} />
              </button>

              <button
                onClick={toggleTheme}
                className={`p-1.5 rounded-md transition-all ${
                  isDark 
                    ? 'bg-gray-800 hover:bg-gray-700 border border-gray-700' 
                    : 'bg-gray-100 hover:bg-gray-200 border border-gray-200'
                }`}
              >
                {isDark ? (
                  <Sun className="w-4 h-4 text-yellow-400" />
                ) : (
                  <Moon className="w-4 h-4 text-gray-600" />
                )}
              </button>

              <button className={`relative p-1.5 rounded-md transition-all ${
                isDark 
                  ? 'bg-gray-800 hover:bg-gray-700 border border-gray-700' 
                  : 'bg-gray-100 hover:bg-gray-200 border border-gray-200'
              }`}>
                <Bell className={`w-4 h-4 ${isDark ? 'text-gray-400' : 'text-gray-600'}`} />
                <span className={`absolute top-0.5 right-0.5 w-1.5 h-1.5 ${isDark ? 'bg-cyan-400' : 'bg-red-500'} rounded-full`}></span>
              </button>

              <div className={`w-7 h-7 bg-gradient-to-br ${isDark ? 'from-cyan-400 to-blue-500' : 'from-cyan-500 to-blue-600'} rounded-full flex items-center justify-center`}>
                <User className="w-3.5 h-3.5 text-white" />
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-[1400px] mx-auto px-4 py-6">
        {/* Stats Bar - Compact */}
        <div className={`${isDark ? 'bg-gray-900/50 border-gray-800' : 'bg-white border-gray-200'} border rounded-md p-4 mb-4 flex items-center justify-between`}>
          <div>
            <h2 className={`text-lg font-semibold mb-0.5 ${isDark ? 'text-white' : 'text-gray-900'}`}>
              {weekData.length} Jadwal
            </h2>
            <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
              {weekData.reduce((sum, day) => sum + day.schedules.length, 0)} aktivitas terjadwal
            </p>
          </div>
          <button
            onClick={() => onNavigate("create")}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-md text-sm font-medium transition-all ${
              isDark
                ? 'bg-cyan-400 hover:bg-cyan-300 text-gray-900'
                : 'bg-cyan-500 hover:bg-cyan-600 text-white'
            }`}
          >
            <Plus className="w-4 h-4" />
            Buat Jadwal
          </button>
        </div>

        {/* Loading State */}
        {loading ? (
          <div className="flex flex-col items-center justify-center h-[60vh]">
            <div className={`animate-spin rounded-full h-12 w-12 border-4 ${isDark ? 'border-cyan-400 border-t-transparent' : 'border-cyan-600 border-t-transparent'} mb-4`}></div>
            <p className={`text-sm font-medium ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Memuat jadwal...</p>
          </div>
        ) : weekData.length === 0 ? (
          // Empty State - Compact
          <div className={`${isDark ? 'bg-gray-900/50 border-gray-800' : 'bg-white border-gray-200'} border rounded-md p-12 text-center`}>
            <Calendar className={`w-16 h-16 mx-auto mb-4 ${isDark ? 'text-gray-700' : 'text-gray-300'}`} />
            <h2 className={`text-xl font-semibold mb-1 ${isDark ? 'text-white' : 'text-gray-900'}`}>
              Belum Ada Jadwal
            </h2>
            <p className={`text-sm mb-6 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
              Buat jadwal pertamamu untuk memulai
            </p>
            <button
              onClick={() => onNavigate("create")}
              className={`px-6 py-2.5 rounded-md text-sm font-medium transition-all inline-flex items-center gap-2 ${
                isDark
                  ? 'bg-cyan-400 hover:bg-cyan-300 text-gray-900'
                  : 'bg-cyan-500 hover:bg-cyan-600 text-white'
              }`}
            >
              <Plus className="w-4 h-4" />
              Buat Jadwal Sekarang
            </button>
          </div>
        ) : (
          // Vercel-like Grid with 3D Effect
          <div className="relative">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
              {[...weekData].sort(sortByDate).map((day) => (
                <div
                  key={day.id}
                  className={`transition-all duration-300 ${
                    expandedCard === day.id 
                      ? 'fixed inset-0 z-50 p-4 flex items-center justify-center' 
                      : ''
                  }`}
                  style={{
                    transformStyle: 'preserve-3d',
                  }}
                >
                  {/* Backdrop blur saat expanded */}
                  {expandedCard === day.id && (
                    <div 
                      className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                      onClick={() => setExpandedCard(null)}
                    />
                  )}
                  
                  {/* Card */}
                  <div
                    className={`relative transition-all duration-300 ${
                      expandedCard === day.id
                        ? 'w-full max-w-2xl scale-100 z-50'
                        : 'scale-100 hover:scale-[1.02]'
                    }`}
                  >
                    {/* Close button saat expanded */}
                    {expandedCard === day.id && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setExpandedCard(null);
                        }}
                        className={`absolute -top-2 -right-2 z-50 p-2 rounded-full ${
                          isDark ? 'bg-gray-800 border-gray-700 text-white' : 'bg-white border-gray-300 text-gray-900'
                        } border shadow-lg hover:scale-110 transition-transform`}
                      >
                        <X className="w-4 h-4" />
                      </button>
                    )}

                    <DayCard
                      day={day}
                      savingDay={savingDay}
                      deletingDay={deletingDay}
                      deletingSchedule={deletingSchedule}
                      onAddSchedule={handleAddSchedule}
                      onDeleteSchedule={handleDeleteSchedule}
                      onDeleteDay={handleDeleteDay}
                      onToggleComplete={onToggleComplete}
                      isExpanded={expandedCard === day.id}
                      onExpand={() => handleCardClick(day.id)}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};