"use client";

import { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { Page } from "../types/schedule";
import { formatDate, getDayName } from "../utils/dateUtils";

interface CreatePageProps {
  onNavigate: (page: Page) => void;
  onCreateDay: (day: string, date: string) => Promise<void>;
}

export const CreatePage = ({ onNavigate, onCreateDay }: CreatePageProps) => {
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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4 flex items-center justify-center">
      <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full">
        <button
          onClick={() => onNavigate("menu")}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-800 mb-6"
        >
          <ArrowLeft className="w-5 h-5" />
          Kembali
        </button>

        <h2 className="text-2xl font-bold text-gray-800 mb-6">Buat Jadwal Baru</h2>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Pilih Tanggal</label>
            <input
              type="date"
              value={createDate}
              onChange={(e) => setCreateDate(e.target.value)}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-indigo-500 focus:outline-none text-black"
            />
            {createDate && (
              <p className="text-xs text-gray-600 mt-2">
                Hari: <span className="font-semibold">{getDayName(createDate)}</span>
              </p>
            )}
          </div>

          <button
            onClick={handleCreate}
            disabled={creating}
            className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-semibold transition-all shadow-lg hover:shadow-xl mt-6 disabled:opacity-50 flex items-center justify-center gap-2"
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