"use client";

import { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { Page } from "../types/schedule";
import { formatDate, getDayName } from "../utils/dateUtils";
import { useTheme } from "../context/ThemeContext";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const CreatePage = ({ onNavigate, onCreateDay }: any) => {
  const { isDark } = useTheme();
  const [createDate, setCreateDate] = useState("");
  const [creating, setCreating] = useState(false);

  const handleCreate = async () => {
    if (!createDate.trim()) return;

    setCreating(true);
    const dayName = getDayName(createDate);
    const formattedDate = formatDate(createDate);

    await onCreateDay(dayName, formattedDate);
    await new Promise((resolve) => setTimeout(resolve, 1000));

    setCreating(false);
    setCreateDate("");
    onNavigate("view");
  };

  return (
    <div className={`min-h-screen ${isDark ? 'bg-black' : 'bg-gradient-to-br from-cyan-50 to-blue-50'} p-4 flex items-center justify-center transition-colors`}>
      <div className={`${isDark ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-100'} border rounded-3xl shadow-2xl p-8 max-w-md w-full backdrop-blur-xl`}>
        <button
          onClick={() => onNavigate("menu")}
          className={`flex items-center gap-2 ${isDark ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-800'} mb-6 transition-colors`}
        >
          <ArrowLeft className="w-5 h-5" />
          Kembali
        </button>

        <h2 className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-800'} mb-6`}>
          Buat Jadwal Baru
        </h2>

        <div className="space-y-4">
          <div>
            <label className={`block text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'} mb-2`}>
              Pilih Tanggal
            </label>
            <input
              type="date"
              value={createDate}
              onChange={(e) => setCreateDate(e.target.value)}
              className={`w-full px-4 py-3 border-2 ${
                isDark 
                  ? 'bg-gray-800 border-gray-700 text-white focus:border-indigo-500' 
                  : 'bg-white border-gray-200 text-black focus:border-indigo-500'
              } rounded-xl focus:outline-none transition-all`}
            />
            {createDate && (
              <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-600'} mt-2`}>
                Hari: <span className="font-semibold">{getDayName(createDate)}</span>
              </p>
            )}
          </div>

          <button
            onClick={handleCreate}
            disabled={creating}
            className="w-full py-3 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white rounded-xl font-semibold transition-all shadow-lg hover:shadow-xl mt-6 disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {creating && (
              <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
            )}
            {creating ? "Membuat Jadwal..." : "Buat Jadwal"}
          </button>
        </div>
      </div>
    </div>
  );
};