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
  Bell,
  User,
  ChevronRight,
  Sparkles,
  Award,
  Activity,
  Flame,
} from "lucide-react";
import { useTheme } from "../context/ThemeContext";
import { useState } from "react";
import { AuthModal } from "./AuthModal";
import { UserDropdown } from "./UserDropdown";

interface MenuPageProps {
  onNavigate: (
    page: "menu" | "view" | "create" | "settings" | "analytics",
  ) => void;
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
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);

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
      color: "text-cyan-400",
      bgColor: "bg-cyan-500/10",
    },
    {
      label: "Aktivitas Hari Ini",
      value: todaySchedules.toString(),
      icon: Clock,
      color: "text-purple-400",
      bgColor: "bg-purple-500/10",
    },
    {
      label: "Selesai",
      value: `${completedActivities}/${totalActivities}`,
      icon: CheckCircle,
      color: "text-green-400",
      bgColor: "bg-green-500/10",
    },
    {
      label: "Produktivitas",
      value: `${productivity}%`,
      icon: TrendingUp,
      color: "text-orange-400",
      bgColor: "bg-orange-500/10",
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
      className={`min-h-screen ${isDark ? "bg-[#0a0a0a]" : "bg-gray-50"} transition-colors duration-300`}
    >
      {/* Premium Navbar */}
      <nav
        className={`${isDark ? "bg-[#0f0f0f]/80 border-gray-800" : "bg-white/80 border-gray-200"} border-b sticky top-0 z-50 backdrop-blur-xl`}
      >
        <div className="max-w-[1400px] mx-auto px-4">
          <div className="flex items-center justify-between h-14">
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2">
                <div className="bg-gradient-to-br from-cyan-400 to-blue-500 p-1.5 rounded-md">
                  <Calendar className="w-4 h-4 text-white" />
                </div>
                <span
                  className={`text-base font-bold ${isDark ? "text-white" : "text-gray-900"}`}
                >
                  ScheduleX
                </span>
              </div>

              <div className="hidden md:flex items-center gap-1">
                <button
                  className={`px-3 py-1.5 rounded-md text-sm font-medium transition-all ${isDark ? "text-white bg-[#1a1a1a]" : "text-gray-900 bg-gray-100"}`}
                >
                  Dashboard
                </button>
                <button
                  onClick={() => onNavigate("analytics")}
                  className={`px-3 py-1.5 rounded-md text-sm font-medium transition-all ${isDark ? "text-gray-400 hover:text-white hover:bg-[#1a1a1a]" : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"}`}
                >
                  Analytics
                </button>
                <button
                  onClick={() => onNavigate("settings")}
                  className={`px-3 py-1.5 rounded-md text-sm font-medium transition-all ${isDark ? "text-gray-400 hover:text-white hover:bg-[#1a1a1a]" : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"}`}
                >
                  Settings
                </button>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {/* Search Bar */}
              <div
                className={`hidden lg:flex items-center gap-2 ${isDark ? "bg-[#1a1a1a] border-gray-800" : "bg-gray-100 border-gray-200"} border rounded-md px-3 py-1.5`}
              >
                <svg
                  className={`w-3.5 h-3.5 ${isDark ? "text-gray-500" : "text-gray-400"}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
                <input
                  type="text"
                  placeholder="Search..."
                  className={`bg-transparent border-none outline-none w-48 text-xs ${isDark ? "text-white placeholder-gray-500" : "text-gray-900 placeholder-gray-400"}`}
                />
                <kbd
                  className={`px-1.5 py-0.5 text-[10px] rounded ${isDark ? "bg-[#0f0f0f] text-gray-500 border border-gray-800" : "bg-gray-200 text-gray-600 border border-gray-300"}`}
                >
                  ⌘K
                </kbd>
              </div>
              <button
                onClick={toggleTheme}
                className={`p-1.5 rounded-md transition-all ${
                  isDark
                    ? "bg-[#1a1a1a] hover:bg-[#252525] border border-gray-800"
                    : "bg-gray-100 hover:bg-gray-200 border border-gray-200"
                }`}
              >
                {isDark ? (
                  <Sun className="w-4 h-4 text-yellow-400" />
                ) : (
                  <Moon className="w-4 h-4 text-gray-600" />
                )}
              </button>

              <button
                className={`relative p-1.5 rounded-md transition-all ${
                  isDark
                    ? "bg-[#1a1a1a] hover:bg-[#252525] border border-gray-800"
                    : "bg-gray-100 hover:bg-gray-200 border border-gray-200"
                }`}
              >
                <Bell
                  className={`w-4 h-4 ${isDark ? "text-gray-400" : "text-gray-600"}`}
                />
                <span className="absolute top-0.5 right-0.5 w-1.5 h-1.5 bg-cyan-400 rounded-full"></span>
              </button>

              <UserDropdown
                isLoggedIn={isLoggedIn}
                onLoginClick={() => setShowAuthModal(true)}
                onProfileClick={() => alert("Profile - Coming soon!")}
                onSettingsClick={() => onNavigate("settings")}
                onLogoutClick={() => {
                  setIsLoggedIn(false);
                  alert("Logged out successfully!");
                }}
              />
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-[1400px] mx-auto px-4 py-6">
        {/* Welcome Section */}
        <div className="mb-6">
          <h1
            className={`text-2xl font-bold mb-1 ${isDark ? "text-white" : "text-gray-900"}`}
          >
            Welcome back! 👋
          </h1>
          <p
            className={`text-sm ${isDark ? "text-gray-400" : "text-gray-600"}`}
          >
            {new Date().toLocaleDateString("id-ID", {
              weekday: "long",
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
          </p>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
          <button
            onClick={() => onNavigate("create")}
            className={`group p-4 rounded-md border transition-all ${
              isDark
                ? "bg-[#0f0f0f] border-gray-800 hover:border-cyan-500"
                : "bg-white border-gray-200 hover:border-cyan-500"
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="bg-cyan-500/10 p-2 rounded-md">
                  <Plus className="w-5 h-5 text-cyan-400" />
                </div>
                <div className="text-left">
                  <div
                    className={`text-sm font-semibold ${isDark ? "text-white" : "text-gray-900"}`}
                  >
                    Buat Jadwal Baru
                  </div>
                  <div
                    className={`text-xs ${isDark ? "text-gray-400" : "text-gray-600"}`}
                  >
                    Tambahkan jadwal untuk hari ini
                  </div>
                </div>
              </div>
              <ChevronRight
                className={`w-4 h-4 ${isDark ? "text-gray-600 group-hover:text-cyan-400" : "text-gray-400 group-hover:text-cyan-600"} transition-colors`}
              />
            </div>
          </button>

          <button
            onClick={() => onNavigate("view")}
            className={`group p-4 rounded-md border transition-all ${
              isDark
                ? "bg-[#0f0f0f] border-gray-800 hover:border-cyan-500"
                : "bg-white border-gray-200 hover:border-cyan-500"
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="bg-purple-500/10 p-2 rounded-md">
                  <Eye className="w-5 h-5 text-purple-400" />
                </div>
                <div className="text-left">
                  <div
                    className={`text-sm font-semibold ${isDark ? "text-white" : "text-gray-900"}`}
                  >
                    Lihat Semua Jadwal
                  </div>
                  <div
                    className={`text-xs ${isDark ? "text-gray-400" : "text-gray-600"}`}
                  >
                    {totalSchedules} jadwal tersedia
                  </div>
                </div>
              </div>
              <ChevronRight
                className={`w-4 h-4 ${isDark ? "text-gray-600 group-hover:text-cyan-400" : "text-gray-400 group-hover:text-cyan-600"} transition-colors`}
              />
            </div>
          </button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
          {stats.map((stat, index) => (
            <div
              key={index}
              className={`p-4 rounded-md border transition-all ${
                isDark
                  ? "bg-[#0f0f0f] border-gray-800 hover:border-gray-700"
                  : "bg-white border-gray-200 hover:border-gray-300"
              }`}
            >
              <div className={`${stat.bgColor} p-2 rounded-md w-fit mb-3`}>
                <stat.icon className={`w-4 h-4 ${stat.color}`} />
              </div>
              <div
                className={`text-2xl font-bold mb-0.5 ${isDark ? "text-white" : "text-gray-900"}`}
              >
                {stat.value}
              </div>
              <div
                className={`text-xs ${isDark ? "text-gray-400" : "text-gray-600"}`}
              >
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* Recent Activities */}
          <div className="lg:col-span-2">
            <div
              className={`p-5 rounded-md border ${
                isDark
                  ? "bg-[#0f0f0f] border-gray-800"
                  : "bg-white border-gray-200"
              }`}
            >
              <div className="flex items-center justify-between mb-4">
                <h3
                  className={`text-base font-semibold ${isDark ? "text-white" : "text-gray-900"}`}
                >
                  Aktivitas Terbaru
                </h3>
                <button
                  onClick={() => onNavigate("view")}
                  className={`text-xs font-medium flex items-center gap-1 ${isDark ? "text-cyan-400 hover:text-cyan-300" : "text-cyan-600 hover:text-cyan-700"}`}
                >
                  Lihat Semua
                  <ChevronRight className="w-3 h-3" />
                </button>
              </div>

              {recentActivities.length === 0 ? (
                <div className="text-center py-8">
                  <Activity
                    className={`w-10 h-10 mx-auto mb-2 ${isDark ? "text-gray-700" : "text-gray-300"}`}
                  />
                  <p
                    className={`text-sm ${isDark ? "text-gray-400" : "text-gray-500"}`}
                  >
                    Belum ada aktivitas
                  </p>
                </div>
              ) : (
                <div className="space-y-2">
                  {recentActivities.map((activity, idx) => (
                    <div
                      key={idx}
                      className={`flex items-center gap-3 p-3 rounded-md border transition-all ${
                        isDark
                          ? "bg-[#1a1a1a] border-gray-800 hover:border-gray-700"
                          : "bg-gray-50 border-gray-200 hover:border-gray-300"
                      }`}
                    >
                      <div
                        className={`w-8 h-8 rounded-md flex items-center justify-center ${
                          activity.completed
                            ? "bg-green-500/10"
                            : "bg-cyan-500/10"
                        }`}
                      >
                        {activity.completed ? (
                          <CheckCircle className="w-4 h-4 text-green-400" />
                        ) : (
                          <Clock className="w-4 h-4 text-cyan-400" />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p
                          className={`text-sm font-medium truncate ${isDark ? "text-white" : "text-gray-900"}`}
                        >
                          {activity.activity}
                        </p>
                        <p
                          className={`text-xs ${isDark ? "text-gray-400" : "text-gray-600"}`}
                        >
                          {activity.day} • {activity.startTime}
                        </p>
                      </div>
                      <div
                        className={`px-2 py-1 rounded text-xs font-medium ${
                          activity.completed
                            ? isDark
                              ? "bg-green-500/10 text-green-400"
                              : "bg-green-100 text-green-600"
                            : isDark
                              ? "bg-cyan-500/10 text-cyan-400"
                              : "bg-cyan-100 text-cyan-600"
                        }`}
                      >
                        {activity.completed ? "Done" : "Active"}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Achievements & Tips */}
          <div className="space-y-4">
            {/* Achievements */}
            <div
              className={`p-5 rounded-md border ${
                isDark
                  ? "bg-[#0f0f0f] border-gray-800"
                  : "bg-white border-gray-200"
              }`}
            >
              <h3
                className={`text-base font-semibold mb-4 ${isDark ? "text-white" : "text-gray-900"}`}
              >
                Pencapaian
              </h3>
              <div className="space-y-3">
                {achievements.map((achievement, idx) => (
                  <div key={idx}>
                    <div className="flex items-center gap-2 mb-1.5">
                      <div className="bg-yellow-500/10 p-1.5 rounded-md">
                        <achievement.icon className="w-3.5 h-3.5 text-yellow-400" />
                      </div>
                      <div className="flex-1">
                        <p
                          className={`text-xs font-medium ${isDark ? "text-white" : "text-gray-900"}`}
                        >
                          {achievement.title}
                        </p>
                      </div>
                      <span
                        className={`text-xs font-semibold ${isDark ? "text-gray-400" : "text-gray-600"}`}
                      >
                        {achievement.progress}%
                      </span>
                    </div>
                    <div
                      className={`w-full h-1.5 rounded-full overflow-hidden ${isDark ? "bg-[#1a1a1a]" : "bg-gray-200"}`}
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

            {/* Quick Tip */}
            <div
              className={`p-5 rounded-md border ${
                isDark
                  ? "bg-cyan-500/5 border-cyan-500/20"
                  : "bg-cyan-50 border-cyan-200"
              }`}
            >
              <div className="flex items-start gap-2">
                <Zap className="w-4 h-4 text-cyan-400 mt-0.5" />
                <div>
                  <h4
                    className={`text-sm font-semibold mb-1 ${isDark ? "text-white" : "text-gray-900"}`}
                  >
                    💡 Tips Hari Ini
                  </h4>
                  <p
                    className={`text-xs ${isDark ? "text-gray-300" : "text-gray-600"}`}
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
      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
      />
    </div>
  );
};
