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
} from "lucide-react";
import { useState, useEffect } from "react";

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
    }>;
  }>;
}

export const MenuPage = ({ onNavigate, weekData = [] }: MenuPageProps) => {
  const [isDark, setIsDark] = useState(false);

  // Hitung stats dari data real
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

  // Aktivitas hari ini
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
      color: "bg-blue-500",
    },
    {
      label: "Aktivitas Hari Ini",
      value: todaySchedules.toString(),
      icon: Clock,
      color: "bg-purple-500",
    },
    {
      label: "Selesai",
      value: `${completedActivities}/${totalActivities}`,
      icon: CheckCircle,
      color: "bg-green-500",
    },
    {
      label: "Produktivitas",
      value: `${productivity}%`,
      icon: TrendingUp,
      color: "bg-orange-500",
    },
  ];

  const features = [
    {
      title: "Lihat Jadwal",
      description:
        "Akses semua jadwal mingguan kamu dengan tampilan yang rapi dan terorganisir",
      icon: Eye,
      action: () => onNavigate("view"),
      gradient: "from-indigo-500 to-purple-600",
      hoverGradient: "from-indigo-600 to-purple-700",
    },
    {
      title: "Buat Jadwal Baru",
      description:
        "Tambahkan jadwal baru dengan mudah dan atur aktivitas harianmu",
      icon: Plus,
      action: () => onNavigate("create"),
      gradient: "from-green-500 to-emerald-600",
      hoverGradient: "from-green-600 to-emerald-700",
    },
  ];

  return (
    <div
      className={`min-h-screen ${isDark ? "bg-gray-900" : "bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50"} transition-colors duration-300`}
    >
      {/* Navbar */}
      <nav
        className={`${isDark ? "bg-gray-800/80" : "bg-white/80"} backdrop-blur-lg border-b ${isDark ? "border-gray-700" : "border-gray-200"} sticky top-0 z-50`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <div className="bg-gradient-to-br from-indigo-500 to-purple-600 p-2 rounded-xl">
                <Calendar className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1
                  className={`text-xl font-bold ${isDark ? "text-white" : "text-gray-800"}`}
                >
                  JadwalKu
                </h1>
                <p
                  className={`text-xs ${isDark ? "text-gray-400" : "text-gray-500"}`}
                >
                  Manage your life better
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <button
                onClick={() => setIsDark(!isDark)}
                className={`p-2 rounded-lg ${isDark ? "bg-gray-700 hover:bg-gray-600" : "bg-gray-100 hover:bg-gray-200"} transition-all`}
              >
                {isDark ? (
                  <Sun className="w-5 h-5 text-yellow-400" />
                ) : (
                  <Moon className="w-5 h-5 text-gray-600" />
                )}
              </button>
              <div
                className={`px-4 py-2 rounded-lg ${isDark ? "bg-indigo-500/20 text-indigo-400" : "bg-indigo-100 text-indigo-600"} text-sm font-medium`}
              >
                {new Date().toLocaleDateString("id-ID", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </div>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16 animate-fade-in">
          <div className="inline-block mb-6">
            <div className="bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 p-4 rounded-3xl shadow-2xl animate-float">
              <Calendar className="w-20 h-20 text-white" />
            </div>
          </div>
          <h1
            className={`text-6xl font-bold mb-4 ${isDark ? "text-white" : "text-gray-800"}`}
          >
            Jadwal{" "}
            <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Mingguanku
            </span>
          </h1>
          <p
            className={`text-xl ${isDark ? "text-gray-300" : "text-gray-600"} max-w-2xl mx-auto`}
          >
            Kelola jadwal harianmu dengan mudah dan tingkatkan produktivitas
            dengan fitur-fitur canggih yang kami sediakan
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {stats.map((stat, index) => (
            <div
              key={index}
              className={`${isDark ? "bg-gray-800" : "bg-white"} rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1`}
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`${stat.color} p-3 rounded-xl`}>
                  <stat.icon className="w-6 h-6 text-white" />
                </div>
                <span
                  className={`text-sm font-medium ${isDark ? "text-gray-400" : "text-gray-500"}`}
                >
                  {stat.label}
                </span>
              </div>
              <div
                className={`text-3xl font-bold ${isDark ? "text-white" : "text-gray-800"}`}
              >
                {stat.value}
              </div>
            </div>
          ))}
        </div>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {features.map((feature, index) => (
            <div
              key={index}
              onClick={feature.action}
              className={`group ${isDark ? "bg-gray-800" : "bg-white"} rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all transform hover:-translate-y-2 cursor-pointer overflow-hidden relative`}
            >
              <div
                className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-10 transition-opacity`}
              ></div>

              <div className="relative z-10">
                <div
                  className={`bg-gradient-to-br ${feature.gradient} p-4 rounded-2xl w-fit mb-6 group-hover:scale-110 transition-transform`}
                >
                  <feature.icon className="w-8 h-8 text-white" />
                </div>

                <h3
                  className={`text-2xl font-bold mb-3 ${isDark ? "text-white" : "text-gray-800"}`}
                >
                  {feature.title}
                </h3>

                <p
                  className={`${isDark ? "text-gray-300" : "text-gray-600"} mb-6 leading-relaxed`}
                >
                  {feature.description}
                </p>

                <button
                  className={`bg-gradient-to-r ${feature.gradient} hover:${feature.hoverGradient} text-white px-6 py-3 rounded-xl font-semibold transition-all shadow-lg group-hover:shadow-xl flex items-center gap-2`}
                >
                  Mulai Sekarang
                  <svg
                    className="w-5 h-5 group-hover:translate-x-1 transition-transform"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 7l5 5m0 0l-5 5m5-5H6"
                    />
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Tips Section */}
        <div
          className={`${isDark ? "bg-gradient-to-r from-indigo-900/50 to-purple-900/50" : "bg-gradient-to-r from-indigo-50 to-purple-50"} rounded-3xl p-8 border-2 ${isDark ? "border-indigo-800" : "border-indigo-100"}`}
        >
          <div className="flex items-start gap-4">
            <div className="bg-gradient-to-br from-yellow-400 to-orange-500 p-3 rounded-xl">
              <svg
                className="w-6 h-6 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                />
              </svg>
            </div>
            <div className="flex-1">
              <h4
                className={`text-xl font-bold mb-2 ${isDark ? "text-white" : "text-gray-800"}`}
              >
                💡 Tips Produktivitas
              </h4>
              <p className={`${isDark ? "text-gray-300" : "text-gray-600"}`}>
                Atur jadwal harianmu di pagi hari untuk memaksimalkan
                produktivitas. Jangan lupa untuk mengatur waktu istirahat agar
                tetap fresh sepanjang hari!
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div
          className={`text-center mt-16 pt-8 border-t ${isDark ? "border-gray-700" : "border-gray-200"}`}
        >
          <p
            className={`${isDark ? "text-gray-400" : "text-gray-500"} text-sm`}
          >
            Made with ❤️ for better productivity
          </p>
        </div>
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes float {
          0%,
          100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-20px);
          }
        }

        .animate-fade-in {
          animation: fade-in 0.6s ease-out;
        }

        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};
