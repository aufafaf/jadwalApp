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
  Filter,
  Grid3x3,
  List as ListIcon
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
  const [searchQuery, setSearchQuery] = useState("");

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

  // Filter schedules based on search
  const filteredData = weekData.filter(day => 
    day.day.toLowerCase().includes(searchQuery.toLowerCase()) ||
    day.date.toLowerCase().includes(searchQuery.toLowerCase()) ||
    day.schedules.some(s => s.activity.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className={`min-h-screen ${isDark ? 'bg-[#0a0a0a]' : 'bg-gray-50'} transition-colors`}>
      {/* Premium Navbar */}
      <nav className={`${isDark ? 'bg-[#0f0f0f]/80 border-gray-800' : 'bg-white/80 border-gray-200'} border-b sticky top-0 z-50 backdrop-blur-xl`}>
        <div className="max-w-[1400px] mx-auto px-4">
          <div className="flex items-center justify-between h-14">
            <div className="flex items-center gap-6">
              <button
                onClick={() => onNavigate("menu")}
                className="flex items-center gap-2"
              >
                <div className="bg-gradient-to-br from-cyan-400 to-blue-500 p-1.5 rounded-md">
                  <Calendar className="w-4 h-4 text-white" />
                </div>
                <span className={`text-base font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  ScheduleX
                </span>
              </button>

              <div className="hidden md:flex items-center gap-1">
                <button 
                  onClick={() => onNavigate("menu")}
                  className={`px-3 py-1.5 rounded-md text-sm font-medium transition-all ${isDark ? 'text-gray-400 hover:text-white hover:bg-[#1a1a1a]' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'}`}
                >
                  Dashboard
                </button>
                <button 
                  onClick={() => onNavigate("analytics")}
                  className={`px-3 py-1.5 rounded-md text-sm font-medium transition-all ${isDark ? 'text-gray-400 hover:text-white hover:bg-[#1a1a1a]' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'}`}
                >
                  Analytics
                </button>
                <button 
                  onClick={() => onNavigate("settings")}
                  className={`px-3 py-1.5 rounded-md text-sm font-medium transition-all ${isDark ? 'text-gray-400 hover:text-white hover:bg-[#1a1a1a]' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'}`}
                >
                  Settings
                </button>
              </div>
            </div>

            <div className="absolute left-1/2 transform -translate-x-1/2">
              <h1 className={`text-base font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                All Schedules
              </h1>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={onRefresh}
                disabled={refreshing}
                className={`p-1.5 rounded-md transition-all ${
                  isDark 
                    ? 'bg-[#1a1a1a] hover:bg-[#252525] border border-gray-800 text-white' 
                    : 'bg-gray-100 hover:bg-gray-200 border border-gray-200 text-gray-900'
                } disabled:opacity-50`}
              >
                <RefreshCw className={`w-4 h-4 ${refreshing ? 'animate-spin' : ''}`} />
              </button>

              <button
                onClick={toggleTheme}
                className={`p-1.5 rounded-md transition-all ${
                  isDark 
                    ? 'bg-[#1a1a1a] hover:bg-[#252525] border border-gray-800' 
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
                  ? 'bg-[#1a1a1a] hover:bg-[#252525] border border-gray-800' 
                  : 'bg-gray-100 hover:bg-gray-200 border border-gray-200'
              }`}>
                <Bell className={`w-4 h-4 ${isDark ? 'text-gray-400' : 'text-gray-600'}`} />
                <span className="absolute top-0.5 right-0.5 w-1.5 h-1.5 bg-cyan-400 rounded-full"></span>
              </button>

              <div className="w-7 h-7 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-full flex items-center justify-center">
                <User className="w-3.5 h-3.5 text-white" />
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-[1400px] mx-auto px-4 py-6">
        {/* Toolbar */}
        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          {/* Search */}
          <div className="flex-1">
            <div className={`flex items-center gap-2 ${isDark ? 'bg-[#0f0f0f] border-gray-800' : 'bg-white border-gray-200'} border rounded-md px-3 py-2`}>
              <Search className={`w-4 h-4 ${isDark ? 'text-gray-500' : 'text-gray-400'}`} />
              <input
                type="text"
                placeholder="Search schedules..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={`flex-1 bg-transparent border-none outline-none text-sm ${
                  isDark ? 'text-white placeholder-gray-500' : 'text-gray-900 placeholder-gray-400'
                }`}
              />
            </div>
          </div>

          {/* View Mode & Add Button */}
          <div className="flex gap-2">
            <div className={`flex items-center gap-1 ${isDark ? 'bg-[#0f0f0f] border-gray-800' : 'bg-white border-gray-200'} border rounded-md p-1`}>
              <button
                onClick={() => setViewMode('grid')}
                className={`p-1.5 rounded transition-all ${
                  viewMode === 'grid'
                    ? isDark ? 'bg-[#1a1a1a] text-white' : 'bg-gray-100 text-gray-900'
                    : isDark ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <Grid3x3 className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-1.5 rounded transition-all ${
                  viewMode === 'list'
                    ? isDark ? 'bg-[#1a1a1a] text-white' : 'bg-gray-100 text-gray-900'
                    : isDark ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <ListIcon className="w-4 h-4" />
              </button>
            </div>

            <button
              onClick={() => onNavigate("create")}
              className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-all ${
                isDark
                  ? 'bg-cyan-400 hover:bg-cyan-300 text-gray-900'
                  : 'bg-cyan-500 hover:bg-cyan-600 text-white'
              }`}
            >
              <Plus className="w-4 h-4" />
              New
            </button>
          </div>
        </div>

        {/* Loading State */}
        {loading ? (
          <div className="flex flex-col items-center justify-center h-[60vh]">
            <div className={`animate-spin rounded-full h-12 w-12 border-4 ${isDark ? 'border-cyan-400 border-t-transparent' : 'border-cyan-600 border-t-transparent'} mb-4`}></div>
            <p className={`text-sm font-medium ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Loading schedules...</p>
          </div>
        ) : filteredData.length === 0 ? (
          // Empty State
          <div className={`${isDark ? 'bg-[#0f0f0f] border-gray-800' : 'bg-white border-gray-200'} border rounded-md p-16 text-center`}>
            <Calendar className={`w-16 h-16 mx-auto mb-4 ${isDark ? 'text-gray-700' : 'text-gray-300'}`} />
            <h2 className={`text-xl font-semibold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
              {searchQuery ? 'No schedules found' : 'No schedules yet'}
            </h2>
            <p className={`text-sm mb-6 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
              {searchQuery ? 'Try a different search term' : 'Create your first schedule to get started'}
            </p>
            {!searchQuery && (
              <button
                onClick={() => onNavigate("create")}
                className={`px-6 py-2.5 rounded-md text-sm font-medium transition-all inline-flex items-center gap-2 ${
                  isDark
                    ? 'bg-cyan-400 hover:bg-cyan-300 text-gray-900'
                    : 'bg-cyan-500 hover:bg-cyan-600 text-white'
                }`}
              >
                <Plus className="w-4 h-4" />
                Create Schedule
              </button>
            )}
          </div>
        ) : (
          <>
            {/* Stats Bar */}
            <div className={`${isDark ? 'bg-[#0f0f0f] border-gray-800' : 'bg-white border-gray-200'} border rounded-md p-4 mb-4`}>
              <div className="flex items-center justify-between">
                <div>
                  <div className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                    Showing {filteredData.length} of {weekData.length} schedules
                  </div>
                </div>
                <div className="flex items-center gap-4 text-sm">
                  <div className={`${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                    <span className="font-semibold text-cyan-400">{filteredData.reduce((sum, day) => sum + day.schedules.length, 0)}</span> activities
                  </div>
                  <div className={`${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                    <span className="font-semibold text-green-400">{filteredData.reduce((sum, day) => sum + day.schedules.filter(s => s.completed).length, 0)}</span> completed
                  </div>
                </div>
              </div>
            </div>

            {/* Cards Grid with 3D Effect */}
            <div 
              className={
                viewMode === 'grid'
                  ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4'
                  : 'space-y-3'
              }
              style={{ perspective: '1000px' }}
            >
              {[...filteredData].sort(sortByDate).map((day, index) => (
                <div
                  key={day.id}
                  className="transform-gpu transition-all duration-500 ease-out"
                  style={{
                    animation: `fadeInUp 0.5s ease-out ${index * 0.05}s both`,
                  }}
                >
                  <DayCard
                    day={day}
                    savingDay={savingDay}
                    deletingDay={deletingDay}
                    deletingSchedule={deletingSchedule}
                    onAddSchedule={handleAddSchedule}
                    onDeleteSchedule={handleDeleteSchedule}
                    onDeleteDay={handleDeleteDay}
                    onToggleComplete={onToggleComplete}
                  />
                </div>
              ))}
            </div>
          </>
        )}
      </div>

      {/* CSS Animations */}
      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px) rotateX(10deg);
          }
          to {
            opacity: 1;
            transform: translateY(0) rotateX(0);
          }
        }
      `}</style>
    </div>
  );
};