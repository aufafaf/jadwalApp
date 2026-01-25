"use client";

import { useState } from "react";
import { Plus, Trash2, Check, Clock, X } from "lucide-react";
import { DaySchedule, Schedule } from "../types/schedule";
import { useTheme } from "../context/ThemeContext";

interface DayCardProps {
  day: DaySchedule;
  savingDay: string | null;
  deletingDay: string | null;
  deletingSchedule: string | null;
  onAddSchedule: (dayId: string, schedule: Schedule) => Promise<void>;
  onDeleteSchedule: (dayId: string, scheduleId: string) => Promise<void>;
  onDeleteDay: (dayId: string) => Promise<void>;
  onToggleComplete: (dayId: string, scheduleId: string) => Promise<void>;
  isExpanded?: boolean;
  onExpand?: () => void;
}

export const DayCard = ({
  day,
  savingDay,
  deletingDay,
  deletingSchedule,
  onAddSchedule,
  onDeleteSchedule,
  onDeleteDay,
  onToggleComplete,
  isExpanded = false,
  onExpand,
}: DayCardProps) => {
  const { isDark } = useTheme();
  const [selectedDay, setSelectedDay] = useState<string | null>(null);
  const [newStartTime, setNewStartTime] = useState("07:00");
  const [newEndTime, setNewEndTime] = useState("09:00");
  const [newActivity, setNewActivity] = useState("");

  const handleAdd = async () => {
    if (!newActivity.trim()) return;

    const newSchedule: Schedule = {
      id: Date.now().toString(),
      startTime: newStartTime,
      endTime: newEndTime,
      activity: newActivity,
      completed: false,
    };

    setSelectedDay(null);
    await onAddSchedule(day.id, newSchedule);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setNewActivity("");
  };

  const handleDelete = async () => {
    await onDeleteDay(day.id);
    await new Promise((resolve) => setTimeout(resolve, 1000));
  };

  const handleDeleteSchedule = async (scheduleId: string) => {
    await onDeleteSchedule(day.id, scheduleId);
    await new Promise((resolve) => setTimeout(resolve, 800));
  };

  const handleCancel = () => {
    setSelectedDay(null);
    setNewActivity("");
    setNewStartTime("07:00");
    setNewEndTime("09:00");
  };

  return (
    <div
      onClick={!isExpanded ? onExpand : undefined}
      className={`${isDark ? "bg-gray-900 border-gray-800" : "bg-white border-gray-200"} border rounded-md shadow-sm overflow-hidden hover:shadow-md transition-all flex flex-col relative ${
        savingDay === day.id ? "opacity-50" : ""
      } ${!isExpanded ? "cursor-pointer" : ""}`}
    >
      {/* Loading Overlays */}
      {savingDay === day.id && (
        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm z-50 flex flex-col items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-cyan-400 border-t-transparent mb-3"></div>
          <p className="text-cyan-400 font-semibold text-lg">
            Menambahkan aktivitas...
          </p>
        </div>
      )}
      {deletingDay === day.id && (
        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm z-50 flex flex-col items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-red-500 border-t-transparent mb-3"></div>
          <p className="text-red-400 font-semibold text-lg">
            Menghapus jadwal...
          </p>
        </div>
      )}

      {/* Header */}
      <div
        className={`${isDark ? "bg-gradient-to-r from-cyan-400 to-blue-500" : "bg-gradient-to-r from-cyan-500 to-blue-600"} p-4 text-white relative`}
      >
        <h2 className="text-xl font-bold">{day.day}</h2>
        <p className="text-sm opacity-90">{day.date}</p>
        <button
          onClick={handleDelete}
          disabled={deletingDay === day.id}
          className="absolute top-3 right-3 p-2 hover:bg-white/20 rounded-lg transition-colors disabled:opacity-50"
        >
          <Trash2
            className={`w-4 h-4 ${deletingDay === day.id ? "animate-spin" : ""}`}
          />
        </button>
      </div>

      {/* Schedules List */}
      <div className="p-4 space-y-2 flex-1 overflow-y-auto max-h-[400px]">
        {day.schedules.length === 0 ? (
          <div className="text-center py-12">
            <Clock
              className={`w-12 h-12 mx-auto mb-3 ${isDark ? "text-gray-700" : "text-gray-300"}`}
            />
            <p
              className={`text-sm ${isDark ? "text-gray-400" : "text-gray-500"}`}
            >
              Belum ada aktivitas
            </p>
          </div>
        ) : (
          day.schedules.map((schedule) => (
            <div
              key={schedule.id}
              className={`flex items-start gap-3 p-3 rounded-lg border transition-all ${
                schedule.completed
                  ? isDark
                    ? "bg-green-500/20 border-green-500/30"
                    : "bg-green-50 border-green-200"
                  : isDark
                    ? "bg-gray-800 border-gray-700 hover:border-gray-600"
                    : "bg-gray-50 border-gray-200 hover:border-gray-300"
              }`}
            >
              <button
                onClick={() => onToggleComplete(day.id, schedule.id)}
                className={`mt-1 w-5 h-5 rounded border-2 flex items-center justify-center shrink-0 transition-colors ${
                  schedule.completed
                    ? "bg-green-500 border-green-500"
                    : isDark
                      ? "border-gray-600 hover:border-cyan-400"
                      : "border-gray-300 hover:border-cyan-500"
                }`}
              >
                {schedule.completed && <Check className="w-3 h-3 text-white" />}
              </button>

              <div className="flex-1 min-w-0">
                <div
                  className={`flex items-center gap-1 text-xs font-semibold mb-1 ${isDark ? "text-cyan-400" : "text-cyan-600"}`}
                >
                  <Clock className="w-3 h-3" />
                  {schedule.startTime} - {schedule.endTime}
                </div>
                <div
                  className={`text-sm ${schedule.completed ? (isDark ? "line-through text-gray-500" : "line-through text-gray-400") : isDark ? "text-gray-200" : "text-gray-700"}`}
                >
                  {schedule.activity}
                </div>
              </div>

              <button
                onClick={() => handleDeleteSchedule(schedule.id)}
                disabled={deletingSchedule === schedule.id}
                className={`p-1 rounded transition-colors shrink-0 disabled:opacity-30 ${isDark ? "text-red-400 hover:text-red-300 hover:bg-red-500/10" : "text-red-500 hover:text-red-600 hover:bg-red-50"}`}
              >
                <Trash2
                  className={`w-4 h-4 ${deletingSchedule === schedule.id ? "animate-spin" : ""}`}
                />
              </button>
            </div>
          ))
        )}
      </div>

      {/* Add Schedule Section */}
      <div
        className={`p-4 ${isDark ? "border-t border-gray-800" : "border-t border-gray-200"}`}
      >
        {selectedDay === day.id ? (
          // EXPANDED FORM - IMPROVED UI
          <div
            className={`space-y-3 ${isDark ? "bg-gray-800/50" : "bg-gray-50"} p-4 rounded-lg border ${isDark ? "border-gray-700" : "border-gray-200"}`}
          >
            {/* Close button */}
            <div className="flex items-center justify-between mb-2">
              <h4
                className={`text-sm font-semibold ${isDark ? "text-white" : "text-gray-900"}`}
              >
                ✨ Tambah Aktivitas Baru
              </h4>
              <button
                onClick={handleCancel}
                className={`p-1 rounded-lg transition-colors ${isDark ? "hover:bg-gray-700 text-gray-400" : "hover:bg-gray-200 text-gray-500"}`}
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Time inputs with labels */}
            <div>
              <label
                className={`block text-xs font-medium mb-2 ${isDark ? "text-gray-400" : "text-gray-600"}`}
              >
                ⏰ Waktu
              </label>
              <div className="flex gap-2 items-center">
                <input
                  type="time"
                  value={newStartTime}
                  onChange={(e) => setNewStartTime(e.target.value)}
                  className={`flex-1 px-3 py-2.5 border rounded-lg focus:outline-none focus:ring-2 text-sm transition-all ${
                    isDark
                      ? "bg-gray-900 border-gray-700 text-white focus:ring-cyan-500 focus:border-cyan-500"
                      : "bg-white border-gray-300 text-gray-900 focus:ring-cyan-500 focus:border-cyan-500"
                  }`}
                />
                <span
                  className={`text-sm font-medium ${isDark ? "text-gray-500" : "text-gray-400"}`}
                >
                  —
                </span>
                <input
                  type="time"
                  value={newEndTime}
                  onChange={(e) => setNewEndTime(e.target.value)}
                  className={`flex-1 px-3 py-2.5 border rounded-lg focus:outline-none focus:ring-2 text-sm transition-all ${
                    isDark
                      ? "bg-gray-900 border-gray-700 text-white focus:ring-cyan-500 focus:border-cyan-500"
                      : "bg-white border-gray-300 text-gray-900 focus:ring-cyan-500 focus:border-cyan-500"
                  }`}
                />
              </div>
            </div>

            {/* Activity input with label */}
            <div>
              <label
                className={`block text-xs font-medium mb-2 ${isDark ? "text-gray-400" : "text-gray-600"}`}
              >
                📝 Nama Aktivitas
              </label>
              <input
                type="text"
                placeholder="Contoh: Meeting dengan tim..."
                value={newActivity}
                onChange={(e) => setNewActivity(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleAdd()}
                className={`w-full px-3 py-2.5 border rounded-lg focus:outline-none focus:ring-2 text-sm transition-all ${
                  isDark
                    ? "bg-gray-900 border-gray-700 text-white placeholder-gray-500 focus:ring-cyan-500 focus:border-cyan-500"
                    : "bg-white border-gray-300 text-gray-900 placeholder-gray-400 focus:ring-cyan-500 focus:border-cyan-500"
                }`}
              />
            </div>

            {/* Action buttons */}
            <div className="flex gap-2 pt-2">
              <button
                onClick={handleAdd}
                disabled={savingDay === day.id || !newActivity.trim()}
                className={`flex-1 py-2.5 rounded-lg font-medium transition-all flex items-center justify-center gap-2 ${
                  isDark
                    ? "bg-cyan-400 hover:bg-cyan-300 text-gray-900 disabled:bg-gray-700 disabled:text-gray-500"
                    : "bg-cyan-500 hover:bg-cyan-600 text-white disabled:bg-gray-300 disabled:text-gray-500"
                } disabled:cursor-not-allowed`}
              >
                {savingDay === day.id ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-2 border-gray-900 border-t-transparent"></div>
                    Menyimpan...
                  </>
                ) : (
                  <>
                    <Check className="w-4 h-4" />
                    Simpan
                  </>
                )}
              </button>
              <button
                onClick={handleCancel}
                disabled={savingDay === day.id}
                className={`px-4 py-2.5 rounded-lg font-medium transition-all ${
                  isDark
                    ? "bg-gray-700 hover:bg-gray-600 text-white disabled:opacity-50"
                    : "bg-gray-200 hover:bg-gray-300 text-gray-700 disabled:opacity-50"
                } disabled:cursor-not-allowed`}
              >
                Batal
              </button>
            </div>
          </div>
        ) : (
          // COLLAPSED BUTTON
          <button
            onClick={() => setSelectedDay(day.id)}
            className={`w-full py-3 rounded-lg font-medium transition-all flex items-center justify-center gap-2 ${
              isDark
                ? "bg-cyan-400 hover:bg-cyan-300 text-gray-900"
                : "bg-cyan-500 hover:bg-cyan-600 text-white"
            } shadow-lg hover:shadow-xl`}
          >
            <Plus className="w-5 h-5" />
            Tambah Aktivitas
          </button>
        )}
      </div>
    </div>
  );
};
