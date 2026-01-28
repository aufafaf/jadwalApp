"use client";

import { 
  Calendar, Moon, Sun, Bell, User, TrendingUp, Clock, 
  CheckCircle, Target, BarChart3, Activity, ArrowUp, ArrowDown
} from "lucide-react";
import { useTheme } from "../context/ThemeContext";
import { Page } from "../types/schedule";

interface AnalyticsPageProps {
  onNavigate: (page: Page) => void;
  weekData?: Array<{
    id: string;
    day: string;
    date: string;
    schedules: Array<{
      id: string;
      completed: boolean;
      startTime: string;
      endTime: string;
      activity: string;
    }>;
  }>;
}

export const AnalyticsPage = ({ onNavigate, weekData = [] }: AnalyticsPageProps) => {
  const { isDark, toggleTheme } = useTheme();

  // Calculate analytics
  const totalSchedules = weekData.length;
  const totalActivities = weekData.reduce((sum, day) => sum + day.schedules.length, 0);
  const completedActivities = weekData.reduce(
    (sum, day) => sum + day.schedules.filter(s => s.completed).length, 
    0
  );
  const productivity = totalActivities > 0 
    ? Math.round((completedActivities / totalActivities) * 100) 
    : 0;

  const avgActivitiesPerDay = totalSchedules > 0 
    ? (totalActivities / totalSchedules).toFixed(1) 
    : "0.0";

  // Day with most activities
  const mostActiveDay = weekData.reduce((max, day) => 
    day.schedules.length > (max?.schedules.length || 0) ? day : max
  , weekData[0]);

  // This week stats (mock data for demo)
  const thisWeekStats = {
    productivity: productivity,
    change: "+12%",
    trend: "up"
  };

  const stats = [
    {
      label: "Total Aktivitas",
      value: totalActivities.toString(),
      change: "+8%",
      trend: "up" as const,
      icon: Activity,
      color: "text-cyan-400",
      bgColor: "bg-cyan-500/10"
    },
    {
      label: "Tingkat Penyelesaian",
      value: `${productivity}%`,
      change: "+15%",
      trend: "up" as const,
      icon: CheckCircle,
      color: "text-green-400",
      bgColor: "bg-green-500/10"
    },
    {
      label: "Rata-rata Per Hari",
      value: avgActivitiesPerDay,
      change: "+5%",
      trend: "up" as const,
      icon: BarChart3,
      color: "text-purple-400",
      bgColor: "bg-purple-500/10"
    },
    {
      label: "Hari Tersibuk",
      value: mostActiveDay?.day || "-",
      change: `${mostActiveDay?.schedules.length || 0} aktivitas`,
      trend: "neutral" as const,
      icon: Target,
      color: "text-orange-400",
      bgColor: "bg-orange-500/10"
    }
  ];

  const dailyBreakdown = weekData.map(day => ({
    day: day.day,
    total: day.schedules.length,
    completed: day.schedules.filter(s => s.completed).length,
    completion: day.schedules.length > 0 
      ? Math.round((day.schedules.filter(s => s.completed).length / day.schedules.length) * 100)
      : 0
  }));

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
                <button className={`px-3 py-1.5 rounded-md text-sm font-medium transition-all ${isDark ? 'text-white bg-[#1a1a1a]' : 'text-gray-900 bg-gray-100'}`}>
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
                Analytics
              </h1>
            </div>

            <div className="flex items-center gap-2">
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
        {/* Header */}
        <div className="mb-6">
          <h2 className={`text-2xl font-bold mb-1 ${isDark ? 'text-white' : 'text-gray-900'}`}>
            Analytics Overview
          </h2>
          <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
            Track your productivity and schedule insights
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
          {stats.map((stat, index) => (
            <div
              key={index}
              className={`p-4 rounded-md border transition-all ${
                isDark 
                  ? 'bg-[#0f0f0f] border-gray-800 hover:border-gray-700' 
                  : 'bg-white border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="flex items-center justify-between mb-3">
                <div className={`${stat.bgColor} p-2 rounded-md`}>
                  <stat.icon className={`w-4 h-4 ${stat.color}`} />
                </div>
                {stat.trend !== "neutral" && (
                  <div className={`flex items-center gap-1 text-xs font-medium ${
                    stat.trend === "up" 
                      ? 'text-green-400' 
                      : 'text-red-400'
                  }`}>
                    {stat.trend === "up" ? (
                      <ArrowUp className="w-3 h-3" />
                    ) : (
                      <ArrowDown className="w-3 h-3" />
                    )}
                    {stat.change}
                  </div>
                )}
              </div>
              <div className={`text-2xl font-bold mb-0.5 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                {stat.value}
              </div>
              <div className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                {stat.label}
              </div>
              {stat.trend === "neutral" && (
                <div className={`text-xs mt-1 ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>
                  {stat.change}
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* Productivity Chart */}
          <div className="lg:col-span-2">
            <div className={`p-5 rounded-md border ${
              isDark 
                ? 'bg-[#0f0f0f] border-gray-800' 
                : 'bg-white border-gray-200'
            }`}>
              <h3 className={`text-base font-semibold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                Daily Breakdown
              </h3>
              
              {dailyBreakdown.length === 0 ? (
                <div className="text-center py-12">
                  <BarChart3 className={`w-12 h-12 mx-auto mb-3 ${isDark ? 'text-gray-700' : 'text-gray-300'}`} />
                  <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                    No data available yet
                  </p>
                </div>
              ) : (
                <div className="space-y-3">
                  {dailyBreakdown.map((day, idx) => (
                    <div key={idx}>
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-3">
                          <div className={`text-sm font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                            {day.day}
                          </div>
                          <div className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                            {day.completed}/{day.total} completed
                          </div>
                        </div>
                        <div className={`text-sm font-semibold ${isDark ? 'text-cyan-400' : 'text-cyan-600'}`}>
                          {day.completion}%
                        </div>
                      </div>
                      <div className={`w-full h-2 rounded-full overflow-hidden ${isDark ? 'bg-[#1a1a1a]' : 'bg-gray-200'}`}>
                        <div 
                          className="h-full bg-gradient-to-r from-cyan-400 to-blue-500 transition-all duration-500"
                          style={{ width: `${day.completion}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Summary */}
          <div className="space-y-4">
            {/* This Week */}
            <div className={`p-5 rounded-md border ${
              isDark 
                ? 'bg-[#0f0f0f] border-gray-800' 
                : 'bg-white border-gray-200'
            }`}>
              <h3 className={`text-base font-semibold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                This Week
              </h3>
              <div className="space-y-3">
                <div>
                  <div className={`text-xs mb-1 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                    Productivity Rate
                  </div>
                  <div className={`text-3xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    {thisWeekStats.productivity}%
                  </div>
                  <div className="flex items-center gap-1 mt-1">
                    <ArrowUp className="w-3 h-3 text-green-400" />
                    <span className="text-xs font-medium text-green-400">
                      {thisWeekStats.change} from last week
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Stats */}
            <div className={`p-5 rounded-md border ${
              isDark 
                ? 'bg-[#0f0f0f] border-gray-800' 
                : 'bg-white border-gray-200'
            }`}>
              <h3 className={`text-base font-semibold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                Quick Stats
              </h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                    Total Schedules
                  </span>
                  <span className={`text-sm font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    {totalSchedules}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                    Total Activities
                  </span>
                  <span className={`text-sm font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    {totalActivities}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                    Completed
                  </span>
                  <span className={`text-sm font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    {completedActivities}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};