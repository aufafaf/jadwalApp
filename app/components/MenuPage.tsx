"use client";

import { Calendar, Plus, Eye } from "lucide-react";
import { Page } from "../types/schedule";

interface MenuPageProps {
  onNavigate: (page: Page) => void;
}

export const MenuPage = ({ onNavigate }: MenuPageProps) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="text-center">
        <Calendar className="w-24 h-24 text-indigo-600 mx-auto mb-6" />
        <h1 className="text-5xl font-bold text-gray-800 mb-4">Jadwal Mingguanku</h1>
        <p className="text-gray-600 mb-12 text-lg">Kelola jadwal harianmu dengan mudah</p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => onNavigate("view")}
            className="px-8 py-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-semibold text-lg transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-3"
          >
            <Eye className="w-6 h-6" />
            Lihat Jadwal
          </button>
          <button
            onClick={() => onNavigate("create")}
            className="px-8 py-4 bg-green-600 hover:bg-green-700 text-white rounded-xl font-semibold text-lg transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-3"
          >
            <Plus className="w-6 h-6" />
            Buat Jadwal Baru
          </button>
        </div>
      </div>
    </div>
  );
};
