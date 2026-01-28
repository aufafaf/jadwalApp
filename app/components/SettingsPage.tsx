"use client";

import { useState } from "react";
import { 
  Calendar, 
  Moon, 
  Sun, 
  Bell, 
  User, 
  Settings as SettingsIcon,
  ChevronRight,
  Save,
  Palette,
  Download,
  Upload,
  Trash2
} from "lucide-react";
import { useTheme } from "../context/ThemeContext";
import { Page } from "../types/schedule";

interface SettingsPageProps {
  onNavigate: (page: Page) => void;
}

type SettingsSection = 'general' | 'appearance' | 'notifications' | 'data' | 'account';

export const SettingsPage = ({ onNavigate }: SettingsPageProps) => {
  const { isDark, toggleTheme } = useTheme();
  const [activeSection, setActiveSection] = useState<SettingsSection>('general');
  const [userName, setUserName] = useState("Guest User");
  const [userEmail, setUserEmail] = useState("");
  const [defaultStartTime, setDefaultStartTime] = useState("07:00");
  const [defaultEndTime, setDefaultEndTime] = useState("09:00");
  const [enableNotifications, setEnableNotifications] = useState(true);
  const [enableSound, setEnableSound] = useState(false);

  const menuItems = [
    { id: 'general' as SettingsSection, label: 'General', icon: SettingsIcon },
    { id: 'appearance' as SettingsSection, label: 'Appearance', icon: Palette },
    { id: 'notifications' as SettingsSection, label: 'Notifications', icon: Bell },
    { id: 'data' as SettingsSection, label: 'Data & Storage', icon: Download },
    { id: 'account' as SettingsSection, label: 'Account', icon: User },
  ];

  const handleSave = () => {
    alert('Settings saved successfully!');
  };

  const handleExportData = () => {
    alert('Export data feature coming soon!');
  };

  const handleImportData = () => {
    alert('Import data feature coming soon!');
  };

  const handleDeleteAllData = () => {
    if (confirm('Are you sure you want to delete all data? This action cannot be undone.')) {
      alert('Delete all data feature coming soon!');
    }
  };

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
                <button className={`px-3 py-1.5 rounded-md text-sm font-medium transition-all ${isDark ? 'text-white bg-[#1a1a1a]' : 'text-gray-900 bg-gray-100'}`}>
                  Settings
                </button>
              </div>
            </div>

            <div className="absolute left-1/2 transform -translate-x-1/2">
              <h1 className={`text-base font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                Settings
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
        <div className="grid grid-cols-12 gap-4">
          {/* Sidebar */}
          <div className="col-span-12 lg:col-span-3">
            <div className={`${isDark ? 'bg-[#0f0f0f] border-gray-800' : 'bg-white border-gray-200'} border rounded-md p-2`}>
              <div className="space-y-1">
                {menuItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setActiveSection(item.id)}
                    className={`w-full flex items-center justify-between px-3 py-2 rounded-md text-sm font-medium transition-all ${
                      activeSection === item.id
                        ? isDark
                          ? 'bg-[#1a1a1a] text-white'
                          : 'bg-gray-100 text-gray-900'
                        : isDark
                        ? 'text-gray-400 hover:text-white hover:bg-[#1a1a1a]'
                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <item.icon className="w-4 h-4" />
                      {item.label}
                    </div>
                    {activeSection === item.id && (
                      <ChevronRight className="w-4 h-4" />
                    )}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Content Area */}
          <div className="col-span-12 lg:col-span-9">
            <div className="space-y-4">
              {/* General Settings */}
              {activeSection === 'general' && (
                <div className={`${isDark ? 'bg-[#0f0f0f] border-gray-800' : 'bg-white border-gray-200'} border rounded-md p-5`}>
                  <h2 className={`text-base font-semibold mb-1 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    General Settings
                  </h2>
                  <p className={`text-sm mb-5 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                    Manage your basic account and application settings
                  </p>

                  <div className="space-y-4">
                    <div>
                      <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                        Your Name
                      </label>
                      <input
                        type="text"
                        value={userName}
                        onChange={(e) => setUserName(e.target.value)}
                        className={`w-full px-3 py-2 border rounded-md text-sm transition-all ${
                          isDark
                            ? 'bg-[#0f0f0f] border-gray-800 text-white focus:border-cyan-500'
                            : 'bg-white border-gray-300 text-gray-900 focus:border-cyan-500'
                        } focus:outline-none focus:ring-2 focus:ring-cyan-500/20`}
                      />
                      <p className={`text-xs mt-1 ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>
                        This is your display name
                      </p>
                    </div>

                    <div>
                      <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                        Email Address
                      </label>
                      <input
                        type="email"
                        value={userEmail}
                        onChange={(e) => setUserEmail(e.target.value)}
                        placeholder="email@example.com"
                        className={`w-full px-3 py-2 border rounded-md text-sm transition-all ${
                          isDark
                            ? 'bg-[#0f0f0f] border-gray-800 text-white placeholder-gray-500 focus:border-cyan-500'
                            : 'bg-white border-gray-300 text-gray-900 placeholder-gray-400 focus:border-cyan-500'
                        } focus:outline-none focus:ring-2 focus:ring-cyan-500/20`}
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                          Default Start Time
                        </label>
                        <input
                          type="time"
                          value={defaultStartTime}
                          onChange={(e) => setDefaultStartTime(e.target.value)}
                          className={`w-full px-3 py-2 border rounded-md text-sm transition-all ${
                            isDark
                              ? 'bg-[#0f0f0f] border-gray-800 text-white focus:border-cyan-500'
                              : 'bg-white border-gray-300 text-gray-900 focus:border-cyan-500'
                          } focus:outline-none focus:ring-2 focus:ring-cyan-500/20`}
                        />
                      </div>
                      <div>
                        <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                          Default End Time
                        </label>
                        <input
                          type="time"
                          value={defaultEndTime}
                          onChange={(e) => setDefaultEndTime(e.target.value)}
                          className={`w-full px-3 py-2 border rounded-md text-sm transition-all ${
                            isDark
                              ? 'bg-[#0f0f0f] border-gray-800 text-white focus:border-cyan-500'
                              : 'bg-white border-gray-300 text-gray-900 focus:border-cyan-500'
                          } focus:outline-none focus:ring-2 focus:ring-cyan-500/20`}
                        />
                      </div>
                    </div>

                    <div className={`pt-4 border-t ${isDark ? 'border-gray-800' : 'border-gray-200'}`}>
                      <button
                        onClick={handleSave}
                        className={`px-4 py-2 rounded-md text-sm font-medium transition-all flex items-center gap-2 ${
                          isDark
                            ? 'bg-cyan-400 hover:bg-cyan-300 text-gray-900'
                            : 'bg-cyan-500 hover:bg-cyan-600 text-white'
                        }`}
                      >
                        <Save className="w-4 h-4" />
                        Save Changes
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Appearance Settings */}
              {activeSection === 'appearance' && (
                <div className={`${isDark ? 'bg-[#0f0f0f] border-gray-800' : 'bg-white border-gray-200'} border rounded-md p-5`}>
                  <h2 className={`text-base font-semibold mb-1 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    Appearance
                  </h2>
                  <p className={`text-sm mb-5 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                    Customize how ScheduleX looks on your device
                  </p>

                  <div className="space-y-4">
                    <div>
                      <label className={`block text-sm font-medium mb-3 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                        Theme
                      </label>
                      <div className="grid grid-cols-2 gap-3">
                        <button
                          onClick={() => !isDark && toggleTheme()}
                          className={`p-4 border rounded-md text-left transition-all ${
                            isDark
                              ? 'bg-[#1a1a1a] border-cyan-500 ring-2 ring-cyan-500/20'
                              : 'bg-gray-50 border-gray-300 hover:border-gray-400'
                          }`}
                        >
                          <Moon className={`w-5 h-5 mb-2 ${isDark ? 'text-cyan-400' : 'text-gray-600'}`} />
                          <div className={`text-sm font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>Dark</div>
                          <div className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Low light UI</div>
                        </button>
                        <button
                          onClick={() => isDark && toggleTheme()}
                          className={`p-4 border rounded-md text-left transition-all ${
                            !isDark
                              ? 'bg-white border-cyan-500 ring-2 ring-cyan-500/20'
                              : 'bg-[#1a1a1a] border-gray-800 hover:border-gray-700'
                          }`}
                        >
                          <Sun className={`w-5 h-5 mb-2 ${!isDark ? 'text-cyan-600' : 'text-gray-400'}`} />
                          <div className={`text-sm font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>Light</div>
                          <div className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>Bright UI</div>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Notifications Settings */}
              {activeSection === 'notifications' && (
                <div className={`${isDark ? 'bg-[#0f0f0f] border-gray-800' : 'bg-white border-gray-200'} border rounded-md p-5`}>
                  <h2 className={`text-base font-semibold mb-1 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    Notifications
                  </h2>
                  <p className={`text-sm mb-5 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                    Manage how you receive notifications
                  </p>

                  <div className="space-y-3">
                    <div className={`flex items-center justify-between p-4 border rounded-md ${isDark ? 'border-gray-800' : 'border-gray-200'}`}>
                      <div>
                        <div className={`text-sm font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                          Enable Notifications
                        </div>
                        <div className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                          Receive notifications for upcoming activities
                        </div>
                      </div>
                      <button
                        onClick={() => setEnableNotifications(!enableNotifications)}
                        className={`relative w-11 h-6 rounded-full transition-colors ${
                          enableNotifications
                            ? 'bg-cyan-500'
                            : isDark ? 'bg-gray-800' : 'bg-gray-300'
                        }`}
                      >
                        <div
                          className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform ${
                            enableNotifications ? 'translate-x-5' : 'translate-x-0'
                          }`}
                        />
                      </button>
                    </div>

                    <div className={`flex items-center justify-between p-4 border rounded-md ${isDark ? 'border-gray-800' : 'border-gray-200'}`}>
                      <div>
                        <div className={`text-sm font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                          Sound
                        </div>
                        <div className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                          Play sound for notifications
                        </div>
                      </div>
                      <button
                        onClick={() => setEnableSound(!enableSound)}
                        className={`relative w-11 h-6 rounded-full transition-colors ${
                          enableSound
                            ? 'bg-cyan-500'
                            : isDark ? 'bg-gray-800' : 'bg-gray-300'
                        }`}
                      >
                        <div
                          className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform ${
                            enableSound ? 'translate-x-5' : 'translate-x-0'
                          }`}
                        />
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Data & Storage Settings */}
              {activeSection === 'data' && (
                <div className={`${isDark ? 'bg-[#0f0f0f] border-gray-800' : 'bg-white border-gray-200'} border rounded-md p-5`}>
                  <h2 className={`text-base font-semibold mb-1 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    Data & Storage
                  </h2>
                  <p className={`text-sm mb-5 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                    Manage your data and storage options
                  </p>

                  <div className="space-y-3">
                    <button
                      onClick={handleExportData}
                      className={`w-full flex items-center justify-between p-4 border rounded-md transition-all ${
                        isDark
                          ? 'border-gray-800 hover:border-gray-700 hover:bg-[#1a1a1a]'
                          : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <Download className={`w-5 h-5 ${isDark ? 'text-cyan-400' : 'text-cyan-600'}`} />
                        <div className="text-left">
                          <div className={`text-sm font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                            Export Data
                          </div>
                          <div className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                            Download all your schedules as JSON
                          </div>
                        </div>
                      </div>
                      <ChevronRight className={`w-5 h-5 ${isDark ? 'text-gray-400' : 'text-gray-500'}`} />
                    </button>

                    <button
                      onClick={handleImportData}
                      className={`w-full flex items-center justify-between p-4 border rounded-md transition-all ${
                        isDark
                          ? 'border-gray-800 hover:border-gray-700 hover:bg-[#1a1a1a]'
                          : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <Upload className={`w-5 h-5 ${isDark ? 'text-cyan-400' : 'text-cyan-600'}`} />
                        <div className="text-left">
                          <div className={`text-sm font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                            Import Data
                          </div>
                          <div className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                            Upload schedules from JSON file
                          </div>
                        </div>
                      </div>
                      <ChevronRight className={`w-5 h-5 ${isDark ? 'text-gray-400' : 'text-gray-500'}`} />
                    </button>

                    <div className={`border-t pt-3 mt-5 ${isDark ? 'border-gray-800' : 'border-gray-200'}`}>
                      <button
                        onClick={handleDeleteAllData}
                        className={`w-full flex items-center justify-between p-4 border rounded-md transition-all ${
                          isDark
                            ? 'border-red-900/50 bg-red-900/10 hover:bg-red-900/20'
                            : 'border-red-200 bg-red-50 hover:bg-red-100'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <Trash2 className="w-5 h-5 text-red-500" />
                          <div className="text-left">
                            <div className="text-sm font-medium text-red-500">
                              Delete All Data
                            </div>
                            <div className={`text-xs ${isDark ? 'text-red-400/70' : 'text-red-600/70'}`}>
                              Permanently remove all schedules
                            </div>
                          </div>
                        </div>
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Account Settings */}
              {activeSection === 'account' && (
                <div className={`${isDark ? 'bg-[#0f0f0f] border-gray-800' : 'bg-white border-gray-200'} border rounded-md p-5`}>
                  <h2 className={`text-base font-semibold mb-1 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    Account
                  </h2>
                  <p className={`text-sm mb-5 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                    Manage your account settings and preferences
                  </p>

                  <div className="space-y-3">
                    <div className={`p-4 border rounded-md ${isDark ? 'border-gray-800 bg-[#1a1a1a]/50' : 'border-gray-200 bg-gray-50'}`}>
                      <div className={`text-sm font-medium mb-1 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                        Account Type
                      </div>
                      <div className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                        Free Plan
                      </div>
                    </div>

                    <div className={`p-4 border rounded-md ${isDark ? 'border-gray-800' : 'border-gray-200'}`}>
                      <div className={`text-sm font-medium mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                        About ScheduleX
                      </div>
                      <div className={`text-xs space-y-1 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                        <div>Version: 1.0.0</div>
                        <div>Built with Next.js & Prisma</div>
                        <div>© 2026 ScheduleX</div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};