"use client";

import { 
  Calendar, Plus, Eye, Clock, CheckCircle, TrendingUp, Moon, Sun,
  Zap, Target, BarChart3, Bell, Settings, User, LogOut, Search,
  ChevronRight, Sparkles, Award, Activity, Flame
} from "lucide-react";
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
  const totalActivities = weekData.reduce((sum, day) => sum + day.schedules.length, 0);
  const completedActivities = weekData.reduce(
    (sum, day) => sum + day.schedules.filter(s => s.completed).length, 
    0
  );
  const productivity = totalActivities > 0 
    ? Math.round((completedActivities / totalActivities) * 100) 
    : 0;

  const today = new Date().toLocaleDateString('id-ID', { 
    day: 'numeric', 
    month: 'long', 
    year: 'numeric' 
  });
  const todaySchedules = weekData.find(day => day.date === today)?.schedules.length || 0;

  const stats = [
    { 
      label: "Total Jadwal", 
      value: totalSchedules.toString(), 
      icon: Calendar, 
      color: isDark ? "from-cyan-400 to-blue-500" : "from-blue-500 to-cyan-500",
      iconColor: isDark ? "text-cyan-400" : "text-blue-600",
      bgColor: isDark ? "bg-cyan-500/10" : "bg-blue-50",
      change: "+12%"
    },
    { 
      label: "Aktivitas Hari Ini", 
      value: todaySchedules.toString(), 
      icon: Clock, 
      color: isDark ? "from-blue-400 to-pink-500" : "from-blue-500 to-pink-500",
      iconColor: isDark ? "text-blue-400" : "text-blue-600",
      bgColor: isDark ? "bg-blue-500/10" : "bg-blue-50",
      change: "+8%"
    },
    { 
      label: "Selesai", 
      value: `${completedActivities}/${totalActivities}`, 
      icon: CheckCircle, 
      color: isDark ? "from-green-400 to-emerald-500" : "from-green-500 to-emerald-500",
      iconColor: isDark ? "text-green-400" : "text-green-600",
      bgColor: isDark ? "bg-green-500/10" : "bg-green-50",
      change: "+23%"
    },
    { 
      label: "Produktivitas", 
      value: `${productivity}%`, 
      icon: TrendingUp, 
      color: isDark ? "from-orange-400 to-red-500" : "from-orange-500 to-red-500",
      iconColor: isDark ? "text-orange-400" : "text-orange-600",
      bgColor: isDark ? "bg-orange-500/10" : "bg-orange-50",
      change: productivity >= 70 ? "+15%" : "-5%"
    },
  ];

  const recentActivities = weekData
    .flatMap(day => day.schedules.map(s => ({ ...s, day: day.day, date: day.date })))
    .slice(0, 5);

  const achievements = [
    { title: "Early Bird", desc: "Selesaikan 5 tugas pagi hari", progress: 60, icon: Sparkles },
    { title: "Streak Master", desc: "7 hari berturut-turut", progress: 85, icon: Flame },
    { title: "Productive Week", desc: "Capai 90% produktivitas", progress: productivity, icon: Award },
  ];

  return (
    <div className={`min-h-screen ${isDark ? 'bg-gray-950' : 'bg-gray-50'} transition-colors duration-300`}>
      {/* Premium Navbar */}
      <nav className={`${isDark ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200'} border-b sticky top-0 z-50`}>
        <div className="max-w-[1400px] mx-auto px-6">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center gap-8">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className={`absolute inset-0 ${isDark ? 'bg-gradient-to-r from-cyan-400 to-blue-500' : 'bg-gradient-to-r from-cyan-500 to-blue-500'} rounded-lg blur-sm opacity-75`}></div>
                  <div className={`relative bg-gradient-to-br ${isDark ? 'from-cyan-400 to-blue-500' : 'from-cyan-500 to-blue-600'} p-2 rounded-lg`}>
                    <Calendar className="w-5 h-5 text-white" />
                  </div>
                </div>
                <span className={`text-xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  ScheduleX
                </span>
              </div>

              {/* Nav Links */}
              <div className="hidden md:flex items-center gap-1">
                <button className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${isDark ? 'text-white bg-gray-800' : 'text-gray-900 bg-gray-100'}`}>
                  Dashboard
                </button>
                <button className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${isDark ? 'text-gray-400 hover:text-white hover:bg-gray-800' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'}`}>
                  Analytics
                </button>
                <button className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${isDark ? 'text-gray-400 hover:text-white hover:bg-gray-800' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'}`}>
                  Settings
                </button>
              </div>
            </div>

            {/* Right Section */}
            <div className="flex items-center gap-3">
              {/* Search */}
              <div className={`hidden lg:flex items-center gap-2 ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-gray-100 border-gray-200'} border rounded-md px-4 py-2`}>
                <Search className={`w-4 h-4 ${isDark ? 'text-gray-400' : 'text-gray-500'}`} />
                <input 
                  type="text" 
                  placeholder="Search schedules..." 
                  className={`bg-transparent border-none outline-none w-64 text-sm ${isDark ? 'text-white placeholder-gray-500' : 'text-gray-900 placeholder-gray-400'}`}
                />
                <kbd className={`px-2 py-1 text-xs rounded ${isDark ? 'bg-gray-700 text-gray-400 border border-gray-600' : 'bg-gray-200 text-gray-600 border border-gray-300'}`}>
                  ⌘K
                </kbd>
              </div>

              {/* Theme Toggle */}
              <button
                onClick={toggleTheme}
                className={`p-2 rounded-md transition-all ${isDark ? 'bg-gray-800 hover:bg-gray-700 border border-gray-700' : 'bg-gray-100 hover:bg-gray-200 border border-gray-200'}`}
              >
                {isDark ? (
                  <Sun className="w-5 h-5 text-yellow-400" />
                ) : (
                  <Moon className="w-5 h-5 text-gray-600" />
                )}
              </button>

              {/* Notifications */}
              <button className={`relative p-2 rounded-md transition-all ${isDark ? 'bg-gray-800 hover:bg-gray-700 border border-gray-700' : 'bg-gray-100 hover:bg-gray-200 border border-gray-200'}`}>
                <Bell className={`w-5 h-5 ${isDark ? 'text-gray-400' : 'text-gray-600'}`} />
                <span className={`absolute top-1 right-1 w-2 h-2 ${isDark ? 'bg-cyan-400' : 'bg-red-500'} rounded-full`}></span>
              </button>

              {/* User Menu */}
              <div className={`flex items-center gap-3 ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-gray-100 border-gray-200'} border rounded-md px-3 py-2`}>
                <div className={`w-8 h-8 bg-gradient-to-br ${isDark ? 'from-cyan-400 to-blue-500' : 'from-cyan-500 to-blue-600'} rounded-full flex items-center justify-center`}>
                  <User className="w-4 h-4 text-white" />
                </div>
                <div className="hidden md:block">
                  <p className={`text-sm font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>Guest User</p>
                  <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Free Plan</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-[1400px] mx-auto px-6 py-8">
        {/* Welcome Banner - Cyberpunk Style */}
        <div className={`relative overflow-hidden ${isDark ? 'bg-gray-900 border-gray-800' : 'bg-gradient-to-r from-cyan-500 to-blue-600'} border rounded-lg p-8 mb-8`}>
          <div className="relative z-10">
            <div className="flex items-start justify-between">
              <div>
                <h1 className="text-3xl font-bold text-white mb-2">
                  Welcome back! 👋
                </h1>
                <p className={`${isDark ? 'text-gray-400' : 'text-white/90'} text-lg mb-6`}>
                  {new Date().toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
                </p>
                <div className="flex gap-3">
                  <button
                    onClick={() => onNavigate("create")}
                    className={`${isDark ? 'bg-cyan-400 hover:bg-cyan-300 text-gray-900' : 'bg-white hover:bg-gray-100 text-cyan-600'} px-6 py-3 rounded-md font-semibold transition-all flex items-center gap-2 shadow-lg`}
                  >
                    <Plus className="w-5 h-5" />
                    Buat Jadwal Baru
                  </button>
                  <button
                    onClick={() => onNavigate("view")}
                    className={`${isDark ? 'bg-gray-800 border-gray-700 text-white hover:bg-gray-700' : 'bg-white/20 border-white/30 text-white hover:bg-white/30'} border px-6 py-3 rounded-md font-semibold transition-all flex items-center gap-2`}
                  >
                    <Eye className="w-5 h-5" />
                    Lihat Semua
                  </button>
                </div>
              </div>
              {isDark && (
                <div className="hidden lg:block">
                  <div className="w-32 h-32 bg-cyan-400/10 border border-cyan-400/20 rounded-lg flex items-center justify-center">
                    <Calendar className="w-16 h-16 text-cyan-400" />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Stats Grid - Sharp Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {stats.map((stat, index) => (
            <div
              key={index}
              className={`${isDark ? 'bg-gray-900 border-gray-800 hover:border-gray-700' : 'bg-white border-gray-200 hover:border-gray-300'} border rounded-lg p-6 transition-all hover:shadow-lg group`}
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`${stat.bgColor} p-3 rounded-lg`}>
                  <stat.icon className={`w-6 h-6 ${stat.iconColor}`} />
                </div>
                <span className={`text-xs font-medium px-2 py-1 rounded-md ${
                  stat.change.startsWith('+') 
                    ? isDark ? 'bg-green-500/20 text-green-400 border border-green-500/30' : 'bg-green-100 text-green-600 border border-green-200'
                    : isDark ? 'bg-red-500/20 text-red-400 border border-red-500/30' : 'bg-red-100 text-red-600 border border-red-200'
                }`}>
                  {stat.change}
                </span>
              </div>
              <div className={`text-3xl font-bold mb-1 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                {stat.value}
              </div>
              <div className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Recent Activities */}
          <div className="lg:col-span-2">
            <div className={`${isDark ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200'} border rounded-lg p-6`}>
              <div className="flex items-center justify-between mb-6">
                <h3 className={`text-lg font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  Aktivitas Terbaru
                </h3>
                <button 
                  onClick={() => onNavigate("view")}
                  className={`text-sm font-medium ${isDark ? 'text-cyan-400 hover:text-cyan-300' : 'text-cyan-600 hover:text-cyan-700'} flex items-center gap-1`}
                >
                  Lihat Semua
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
              
              {recentActivities.length === 0 ? (
                <div className="text-center py-12">
                  <Activity className={`w-12 h-12 mx-auto mb-3 ${isDark ? 'text-gray-700' : 'text-gray-300'}`} />
                  <p className={`${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Belum ada aktivitas</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {recentActivities.map((activity, idx) => (
                    <div key={idx} className={`flex items-center gap-4 p-4 rounded-lg ${isDark ? 'bg-gray-800 border border-gray-700 hover:border-gray-600' : 'bg-gray-50 border border-gray-200 hover:border-gray-300'} transition-all group`}>
                      <div className={`w-10 h-10 rounded-lg ${activity.completed ? (isDark ? 'bg-green-500/20 border border-green-500/30' : 'bg-green-100 border border-green-200') : (isDark ? 'bg-cyan-500/20 border border-cyan-500/30' : 'bg-blue-100 border border-blue-200')} flex items-center justify-center`}>
                        {activity.completed ? (
                          <CheckCircle className={`w-5 h-5 ${isDark ? 'text-green-400' : 'text-green-600'}`} />
                        ) : (
                          <Clock className={`w-5 h-5 ${isDark ? 'text-cyan-400' : 'text-blue-600'}`} />
                        )}
                      </div>
                      <div className="flex-1">
                        <p className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                          {activity.activity}
                        </p>
                        <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                          {activity.day} • {activity.startTime} - {activity.endTime}
                        </p>
                      </div>
                      <div className={`px-3 py-1 rounded-md text-xs font-medium border ${
                        activity.completed 
                          ? isDark ? 'bg-green-500/20 text-green-400 border-green-500/30' : 'bg-green-100 text-green-600 border-green-200'
                          : isDark ? 'bg-cyan-500/20 text-cyan-400 border-cyan-500/30' : 'bg-blue-100 text-blue-600 border-blue-200'
                      }`}>
                        {activity.completed ? 'Selesai' : 'Aktif'}
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
            <div className={`${isDark ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200'} border rounded-lg p-6`}>
              <h3 className={`text-lg font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                Pencapaian
              </h3>
              <div className="space-y-4">
                {achievements.map((achievement, idx) => (
                  <div key={idx}>
                    <div className="flex items-center gap-3 mb-2">
                      <div className={`p-2 rounded-lg ${isDark ? 'bg-yellow-500/20 border border-yellow-500/30' : 'bg-yellow-100 border border-yellow-200'}`}>
                        <achievement.icon className={`w-4 h-4 ${isDark ? 'text-yellow-400' : 'text-yellow-600'}`} />
                      </div>
                      <div className="flex-1">
                        <p className={`text-sm font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                          {achievement.title}
                        </p>
                        <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                          {achievement.desc}
                        </p>
                      </div>
                      <span className={`text-sm font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                        {achievement.progress}%
                      </span>
                    </div>
                    <div className={`w-full h-2 rounded-full overflow-hidden ${isDark ? 'bg-gray-800' : 'bg-gray-200'}`}>
                      <div 
                        className={`h-full ${isDark ? 'bg-gradient-to-r from-yellow-400 to-orange-500' : 'bg-gradient-to-r from-yellow-400 to-orange-500'} transition-all duration-500`}
                        style={{ width: `${achievement.progress}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Tips - Cyberpunk */}
            <div className={`${isDark ? 'bg-gradient-to-br from-cyan-900/30 to-blue-900/30 border-cyan-800/50' : 'bg-gradient-to-br from-cyan-50 to-blue-50 border-cyan-100'} border rounded-lg p-6`}>
              <div className="flex items-start gap-3">
                <Zap className={`w-5 h-5 ${isDark ? 'text-cyan-400' : 'text-yellow-600'} mt-1`} />
                <div>
                  <h4 className={`font-bold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    💡 Tips Hari Ini
                  </h4>
                  <p className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                    Prioritaskan 3 tugas terpenting di pagi hari untuk hasil maksimal!
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