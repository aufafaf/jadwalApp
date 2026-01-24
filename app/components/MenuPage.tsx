"use client";

import {
  Calendar,
  Plus,
  Eye,
  Clock,
  CheckCircle,
  TrendingUp,
  Moon,
  Sun,
  Zap,
  Target,
  BarChart3,
  Bell,
  Settings,
  User,
  LogOut,
  Search,
  ChevronRight,
  Sparkles,
  Award,
  Activity,
  Flame,
} from "lucide-react";
import { useState } from "react";
import { useTheme } from "../context/ThemeContext";

interface MenuPageProps {
  onNavigate: (page: "menu" | "view" | "create") => void;
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

export const MenuPage = ({ onNavigate, weekData = [] }: MenuPageProps) => {
  const { isDark, toggleTheme } = useTheme();
  // Stats calculations
  const totalSchedules = weekData.length;
  const totalActivities = weekData.reduce(
    (sum, day) => sum + day.schedules.length,
    0,
  );
  const completedActivities = weekData.reduce(
    (sum, day) => sum + day.schedules.filter((s) => s.completed).length,
    0,
  );
  const productivity =
    totalActivities > 0
      ? Math.round((completedActivities / totalActivities) * 100)
      : 0;

  const today = new Date().toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
  const todaySchedules =
    weekData.find((day) => day.date === today)?.schedules.length || 0;

  const stats = [
    {
      label: "Total Jadwal",
      value: totalSchedules.toString(),
      icon: Calendar,
      color: "from-blue-500 to-cyan-500",
      bgColor: isDark ? "bg-blue-500/10" : "bg-blue-50",
      change: "+12%",
    },
    {
      label: "Aktivitas Hari Ini",
      value: todaySchedules.toString(),
      icon: Clock,
      color: "from-purple-500 to-pink-500",
      bgColor: isDark ? "bg-purple-500/10" : "bg-purple-50",
      change: "+8%",
    },
    {
      label: "Selesai",
      value: `${completedActivities}/${totalActivities}`,
      icon: CheckCircle,
      color: "from-green-500 to-emerald-500",
      bgColor: isDark ? "bg-green-500/10" : "bg-green-50",
      change: "+23%",
    },
    {
      label: "Produktivitas",
      value: `${productivity}%`,
      icon: TrendingUp,
      color: "from-orange-500 to-red-500",
      bgColor: isDark ? "bg-orange-500/10" : "bg-orange-50",
      change: productivity >= 70 ? "+15%" : "-5%",
    },
  ];

  const recentActivities = weekData
    .flatMap((day) =>
      day.schedules.map((s) => ({ ...s, day: day.day, date: day.date })),
    )
    .slice(0, 5);

  const achievements = [
    {
      title: "Early Bird",
      desc: "Selesaikan 5 tugas pagi hari",
      progress: 60,
      icon: Sparkles,
    },
    {
      title: "Streak Master",
      desc: "7 hari berturut-turut",
      progress: 85,
      icon: Flame,
    },
    {
      title: "Productive Week",
      desc: "Capai 90% produktivitas",
      progress: productivity,
      icon: Award,
    },
  ];

  return (
    <div
      className={`min-h-screen ${isDark ? "bg-black" : "bg-white"} transition-colors duration-300`}
    >
      {/* Premium Navbar */}
      <nav
        className={`${isDark ? "bg-gray-900/50 border-gray-800" : "bg-white/80 border-gray-200"} backdrop-blur-xl border-b sticky top-0 z-50`}
      >
        <div className="max-w-[1400px] mx-auto px-6">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center gap-8">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-xl blur-sm opacity-75"></div>
                  <div className="relative bg-gradient-to-br from-indigo-500 to-purple-600 p-2 rounded-xl">
                    <Calendar className="w-5 h-5 text-white" />
                  </div>
                </div>
                <span
                  className={`text-xl font-bold ${isDark ? "text-white" : "text-gray-900"}`}
                >
                  ScheduleX
                </span>
              </div>

              {/* Nav Links */}
              <div className="hidden md:flex items-center gap-1">
                <button
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${isDark ? "text-white bg-gray-800" : "text-gray-900 bg-gray-100"}`}
                >
                  Dashboard
                </button>
                <button
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${isDark ? "text-gray-400 hover:text-white hover:bg-gray-800" : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"}`}
                >
                  Analytics
                </button>
                <button
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${isDark ? "text-gray-400 hover:text-white hover:bg-gray-800" : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"}`}
                >
                  Settings
                </button>
              </div>
            </div>

            {/* Right Section */}
            <div className="flex items-center gap-3">
              {/* Search */}
              <div
                className={`hidden lg:flex items-center gap-2 ${isDark ? "bg-gray-800 border-gray-700" : "bg-gray-100 border-gray-200"} border rounded-lg px-4 py-2`}
              >
                <Search
                  className={`w-4 h-4 ${isDark ? "text-gray-400" : "text-gray-500"}`}
                />
                <input
                  type="text"
                  placeholder="Search schedules..."
                  className={`bg-transparent border-none outline-none w-64 text-sm ${isDark ? "text-white placeholder-gray-500" : "text-gray-900 placeholder-gray-400"}`}
                />
                <kbd
                  className={`px-2 py-1 text-xs rounded ${isDark ? "bg-gray-700 text-gray-400" : "bg-gray-200 text-gray-600"}`}
                >
                  ⌘K
                </kbd>
              </div>

              {/* Theme Toggle */}
              <button
                onClick={toggleTheme}
                className={`p-2 rounded-lg transition-all ${isDark ? "bg-gray-800 hover:bg-gray-700" : "bg-gray-100 hover:bg-gray-200"}`}
              >
                {isDark ? (
                  <Sun className="w-5 h-5 text-yellow-500" />
                ) : (
                  <Moon className="w-5 h-5 text-gray-600" />
                )}
              </button>

              {/* Notifications */}
              <button
                className={`relative p-2 rounded-lg transition-all ${isDark ? "bg-gray-800 hover:bg-gray-700" : "bg-gray-100 hover:bg-gray-200"}`}
              >
                <Bell
                  className={`w-5 h-5 ${isDark ? "text-gray-400" : "text-gray-600"}`}
                />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>

              {/* User Menu */}
              <div
                className={`flex items-center gap-3 ${isDark ? "bg-gray-800" : "bg-gray-100"} rounded-lg px-3 py-2`}
              >
                <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center">
                  <User className="w-4 h-4 text-white" />
                </div>
                <div className="hidden md:block">
                  <p
                    className={`text-sm font-medium ${isDark ? "text-white" : "text-gray-900"}`}
                  >
                    Guest User
                  </p>
                  <p
                    className={`text-xs ${isDark ? "text-gray-400" : "text-gray-500"}`}
                  >
                    Free Plan
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-[1400px] mx-auto px-6 py-8">
        {/* Welcome Banner */}
        <div
          className={`relative overflow-hidden rounded-2xl ${isDark ? "bg-gradient-to-r from-gray-900 to-gray-800 border border-gray-800" : "bg-gradient-to-r from-indigo-500 to-purple-600"} p-8 mb-8`}
        >
          <div className="relative z-10">
            <div className="flex items-start justify-between">
              <div>
                <h1 className="text-3xl font-bold text-white mb-2">
                  Welcome back! 👋
                </h1>
                <p className="text-white/80 text-lg mb-6">
                  {new Date().toLocaleDateString("id-ID", {
                    weekday: "long",
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </p>
                <div className="flex gap-3">
                  <button
                    onClick={() => onNavigate("create")}
                    className="bg-white text-indigo-600 px-6 py-3 rounded-xl font-semibold hover:bg-gray-100 transition-all flex items-center gap-2"
                  >
                    <Plus className="w-5 h-5" />
                    Buat Jadwal Baru
                  </button>
                  <button
                    onClick={() => onNavigate("view")}
                    className="bg-white/10 backdrop-blur text-white px-6 py-3 rounded-xl font-semibold hover:bg-white/20 transition-all flex items-center gap-2"
                  >
                    <Eye className="w-5 h-5" />
                    Lihat Semua
                  </button>
                </div>
              </div>
              <div className="hidden lg:block">
                <div className="w-32 h-32 bg-white/10 rounded-full flex items-center justify-center backdrop-blur">
                  <Calendar className="w-16 h-16 text-white" />
                </div>
              </div>
            </div>
          </div>
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-32 -mt-32"></div>
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full -ml-24 -mb-24"></div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {stats.map((stat, index) => (
            <div
              key={index}
              className={`${isDark ? "bg-gray-900/50 border-gray-800/50" : "bg-white border-gray-100"} border rounded-2xl p-6 hover:shadow-xl hover:scale-[1.02] transition-all duration-300 group backdrop-blur-sm`}
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`${stat.bgColor} p-3 rounded-xl`}>
                  <stat.icon
                    className={`w-6 h-6 bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`}
                    style={{
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      backgroundClip: "text",
                    }}
                  />
                </div>
                <span
                  className={`text-xs font-medium px-2 py-1 rounded-full ${
                    stat.change.startsWith("+")
                      ? isDark
                        ? "bg-green-500/10 text-green-400"
                        : "bg-green-100 text-green-600"
                      : isDark
                        ? "bg-red-500/10 text-red-400"
                        : "bg-red-100 text-red-600"
                  }`}
                >
                  {stat.change}
                </span>
              </div>
              <div
                className={`text-3xl font-bold mb-1 ${isDark ? "text-white" : "text-gray-900"}`}
              >
                {stat.value}
              </div>
              <div
                className={`text-sm ${isDark ? "text-gray-400" : "text-gray-600"}`}
              >
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Recent Activities */}
          <div className="lg:col-span-2">
            <div
              className={`${isDark ? "bg-gray-900 border-gray-800" : "bg-white border-gray-200"} border rounded-xl p-6`}
            >
              <div className="flex items-center justify-between mb-6">
                <h3
                  className={`text-lg font-bold ${isDark ? "text-white" : "text-gray-900"}`}
                >
                  Aktivitas Terbaru
                </h3>
                <button
                  onClick={() => onNavigate("view")}
                  className={`text-sm font-medium ${isDark ? "text-indigo-400 hover:text-indigo-300" : "text-indigo-600 hover:text-indigo-700"} flex items-center gap-1`}
                >
                  Lihat Semua
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>

              {recentActivities.length === 0 ? (
                <div className="text-center py-12">
                  <Activity
                    className={`w-12 h-12 mx-auto mb-3 ${isDark ? "text-gray-700" : "text-gray-300"}`}
                  />
                  <p
                    className={`${isDark ? "text-gray-400" : "text-gray-500"}`}
                  >
                    Belum ada aktivitas
                  </p>
                </div>
              ) : (
                <div className="space-y-3">
                  {recentActivities.map((activity, idx) => (
                    <div
                      key={idx}
                      className={`flex items-center gap-4 p-4 rounded-lg ${isDark ? "bg-gray-800/50 hover:bg-gray-800" : "bg-gray-50 hover:bg-gray-100"} transition-all group`}
                    >
                      <div
                        className={`w-10 h-10 rounded-lg ${activity.completed ? "bg-green-500/10" : "bg-blue-500/10"} flex items-center justify-center`}
                      >
                        {activity.completed ? (
                          <CheckCircle className="w-5 h-5 text-green-500" />
                        ) : (
                          <Clock className="w-5 h-5 text-blue-500" />
                        )}
                      </div>
                      <div className="flex-1">
                        <p
                          className={`font-medium ${isDark ? "text-white" : "text-gray-900"}`}
                        >
                          {activity.activity}
                        </p>
                        <p
                          className={`text-sm ${isDark ? "text-gray-400" : "text-gray-500"}`}
                        >
                          {activity.day} • {activity.startTime} -{" "}
                          {activity.endTime}
                        </p>
                      </div>
                      <div
                        className={`px-3 py-1 rounded-full text-xs font-medium ${
                          activity.completed
                            ? isDark
                              ? "bg-green-500/10 text-green-400"
                              : "bg-green-100 text-green-600"
                            : isDark
                              ? "bg-blue-500/10 text-blue-400"
                              : "bg-blue-100 text-blue-600"
                        }`}
                      >
                        {activity.completed ? "Selesai" : "Aktif"}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Achievements & Quick Actions */}
          <div className="space-y-6">
            {/* Achievements */}
            <div
              className={`${isDark ? "bg-gray-900 border-gray-800" : "bg-white border-gray-200"} border rounded-xl p-6`}
            >
              <h3
                className={`text-lg font-bold mb-4 ${isDark ? "text-white" : "text-gray-900"}`}
              >
                Pencapaian
              </h3>
              <div className="space-y-4">
                {achievements.map((achievement, idx) => (
                  <div key={idx}>
                    <div className="flex items-center gap-3 mb-2">
                      <div
                        className={`p-2 rounded-lg ${isDark ? "bg-yellow-500/10" : "bg-yellow-100"}`}
                      >
                        <achievement.icon
                          className={`w-4 h-4 ${isDark ? "text-yellow-400" : "text-yellow-600"}`}
                        />
                      </div>
                      <div className="flex-1">
                        <p
                          className={`text-sm font-medium ${isDark ? "text-white" : "text-gray-900"}`}
                        >
                          {achievement.title}
                        </p>
                        <p
                          className={`text-xs ${isDark ? "text-gray-400" : "text-gray-500"}`}
                        >
                          {achievement.desc}
                        </p>
                      </div>
                      <span
                        className={`text-sm font-bold ${isDark ? "text-white" : "text-gray-900"}`}
                      >
                        {achievement.progress}%
                      </span>
                    </div>
                    <div
                      className={`w-full h-2 rounded-full overflow-hidden ${isDark ? "bg-gray-800" : "bg-gray-200"}`}
                    >
                      <div
                        className="h-full bg-gradient-to-r from-yellow-400 to-orange-500 transition-all duration-500"
                        style={{ width: `${achievement.progress}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Tips */}
            <div
              className={`${isDark ? "bg-gradient-to-br from-indigo-900/50 to-purple-900/50 border-indigo-800" : "bg-gradient-to-br from-indigo-50 to-purple-50 border-indigo-100"} border rounded-xl p-6`}
            >
              <div className="flex items-start gap-3">
                <Zap
                  className={`w-5 h-5 ${isDark ? "text-yellow-400" : "text-yellow-600"} mt-1`}
                />
                <div>
                  <h4
                    className={`font-bold mb-2 ${isDark ? "text-white" : "text-gray-900"}`}
                  >
                    💡 Tips Hari Ini
                  </h4>
                  <p
                    className={`text-sm ${isDark ? "text-gray-300" : "text-gray-600"}`}
                  >
                    Prioritaskan 3 tugas terpenting di pagi hari untuk hasil
                    maksimal!
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
