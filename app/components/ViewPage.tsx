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
  List
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
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

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
    <div className={`min-h-screen ${isDark ? 'bg-gray-950' : 'bg-gray-50'} transition-colors`}>
      {/* Premium Navbar - Same as Dashboard */}
      <nav className={`${isDark ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200'} border-b sticky top-0 z-50 backdrop-blur-xl`}>
        <div className="max-w-[1400px] mx-auto px-6">
          <div className="flex items-center justify-between h-16">
            {/* Logo & Back */}
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className={`absolute inset-0 ${isDark ? 'bg-gradient-to-r from-cyan-400 to-blue-500' : 'bg-gradient-to-r from-cyan-500 to-blue-600'} rounded-lg blur-sm opacity-75`}></div>
                  <div className={`relative bg-gradient-to-br ${isDark ? 'from-cyan-400 to-blue-500' : 'from-cyan-500 to-blue-600'} p-2 rounded-lg`}>
                    <Calendar className="w-5 h-5 text-white" />
                  </div>
                </div>
                <span className={`text-xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  ScheduleX
                </span>
              </div>

              {/* Back Button */}
              <button
                onClick={() => onNavigate("menu")}
                className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-all ${
                  isDark 
                    ? 'text-gray-400 hover:text-white hover:bg-gray-800' 
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                }`}
              >
                <ArrowLeft className="w-4 h-4" />
                Dashboard
              </button>
            </div>

            {/* Center Title */}
            <div className="absolute left-1/2 transform -translate-x-1/2">
              <h1 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                Semua Jadwal
              </h1>
            </div>

            {/* Right Section */}
            <div className="flex items-center gap-3">
              {/* View Mode Toggle */}
              <div className={`flex items-center gap-1 ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-gray-100 border-gray-200'} border rounded-md p-1`}>
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded transition-all ${
                    viewMode === 'grid'
                      ? isDark ? 'bg-gray-700 text-white' : 'bg-white text-gray-900 shadow-sm'
                      : isDark ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  <LayoutGrid className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded transition-all ${
                    viewMode === 'list'
                      ? isDark ? 'bg-gray-700 text-white' : 'bg-white text-gray-900 shadow-sm'
                      : isDark ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  <List className="w-4 h-4" />
                </button>
              </div>

              {/* Refresh Button */}
              <button
                onClick={onRefresh}
                disabled={refreshing}
                className={`p-2 rounded-md transition-all ${
                  isDark 
                    ? 'bg-gray-800 hover:bg-gray-700 border border-gray-700 text-white' 
                    : 'bg-gray-100 hover:bg-gray-200 border border-gray-200 text-gray-900'
                } disabled:opacity-50`}
              >
                <RefreshCw className={`w-5 h-5 ${refreshing ? 'animate-spin' : ''}`} />
              </button>

              {/* Theme Toggle */}
              <button
                onClick={toggleTheme}
                className={`p-2 rounded-md transition-all ${
                  isDark 
                    ? 'bg-gray-800 hover:bg-gray-700 border border-gray-700' 
                    : 'bg-gray-100 hover:bg-gray-200 border border-gray-200'
                }`}
              >
                {isDark ? (
                  <Sun className="w-5 h-5 text-yellow-400" />
                ) : (
                  <Moon className="w-5 h-5 text-gray-600" />
                )}
              </button>

              {/* Notifications */}
              <button className={`relative p-2 rounded-md transition-all ${
                isDark 
                  ? 'bg-gray-800 hover:bg-gray-700 border border-gray-700' 
                  : 'bg-gray-100 hover:bg-gray-200 border border-gray-200'
              }`}>
                <Bell className={`w-5 h-5 ${isDark ? 'text-gray-400' : 'text-gray-600'}`} />
                <span className={`absolute top-1 right-1 w-2 h-2 ${isDark ? 'bg-cyan-400' : 'bg-red-500'} rounded-full`}></span>
              </button>

              {/* User Menu */}
              <div className={`flex items-center gap-3 ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-gray-100 border-gray-200'} border rounded-md px-3 py-2`}>
                <div className={`w-8 h-8 bg-gradient-to-br ${isDark ? 'from-cyan-400 to-blue-500' : 'from-cyan-500 to-blue-600'} rounded-full flex items-center justify-center`}>
                  <User className="w-4 h-4 text-white" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-[1400px] mx-auto px-6 py-8">
        {/* Stats Bar */}
        <div className={`${isDark ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200'} border rounded-lg p-6 mb-6 flex items-center justify-between`}>
          <div>
            <h2 className={`text-2xl font-bold mb-1 ${isDark ? 'text-white' : 'text-gray-900'}`}>
              {weekData.length} Jadwal
            </h2>
            <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
              Total {weekData.reduce((sum, day) => sum + day.schedules.length, 0)} aktivitas terjadwal
            </p>
          </div>
          <button
            onClick={() => onNavigate("create")}
            className={`flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all shadow-lg hover:shadow-xl ${
              isDark
                ? 'bg-cyan-400 hover:bg-cyan-300 text-gray-900'
                : 'bg-cyan-500 hover:bg-cyan-600 text-white'
            }`}
          >
            <Plus className="w-5 h-5" />
            Buat Jadwal Baru
          </button>
        </div>

        {/* Loading State */}
        {loading ? (
          <div className="flex flex-col items-center justify-center h-[60vh]">
            <div className={`animate-spin rounded-full h-16 w-16 border-4 ${isDark ? 'border-cyan-400 border-t-transparent' : 'border-cyan-600 border-t-transparent'} mb-6`}></div>
            <p className={`font-medium ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Memuat jadwal...</p>
          </div>
        ) : weekData.length === 0 ? (
          // Empty State
          <div className={`${isDark ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200'} border rounded-lg p-16 text-center`}>
            <Calendar className={`w-24 h-24 mx-auto mb-6 ${isDark ? 'text-gray-700' : 'text-gray-300'}`} />
            <h2 className={`text-2xl font-bold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
              Belum Ada Jadwal
            </h2>
            <p className={`mb-8 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
              Buat jadwal pertamamu untuk memulai mengelola waktu dengan lebih baik
            </p>
            <button
              onClick={() => onNavigate("create")}
              className={`px-8 py-3 rounded-lg font-semibold transition-all shadow-lg hover:shadow-xl inline-flex items-center gap-2 ${
                isDark
                  ? 'bg-cyan-400 hover:bg-cyan-300 text-gray-900'
                  : 'bg-cyan-500 hover:bg-cyan-600 text-white'
              }`}
            >
              <Plus className="w-5 h-5" />
              Buat Jadwal Sekarang
            </button>
          </div>
        ) : (
          // Grid/List View
          <div className={
            viewMode === 'grid'
              ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'
              : 'space-y-4'
          }>
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