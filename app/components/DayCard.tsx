"use client";

import { useState } from "react";
import { Plus, Trash2, Check, Clock } from "lucide-react";
import { DaySchedule, Schedule } from "../types/schedule";

interface DayCardProps {
  day: DaySchedule;
  savingDay: string | null;
  deletingDay: string | null;
  deletingSchedule: string | null;
  onAddSchedule: (dayId: string, schedule: Schedule) => Promise<void>;
  onDeleteSchedule: (dayId: string, scheduleId: string) => Promise<void>;
  onDeleteDay: (dayId: string) => Promise<void>;
  onToggleComplete: (dayId: string, scheduleId: string) => Promise<void>;
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
}: DayCardProps) => {
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

  return (
    <div
      className={`bg-white rounded-2xl shadow-lg overflow-hidden border-2 border-gray-100 hover:shadow-xl transition-all flex flex-col relative ${
        savingDay === day.id ? "opacity-50" : ""
      }`}
    >
      {/* Loading Overlays */}
      {savingDay === day.id && (
        <div className="absolute inset-0 bg-white/80 backdrop-blur-sm z-50 flex flex-col items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-indigo-500 border-t-transparent mb-3"></div>
          <p className="text-indigo-600 font-semibold text-lg">Menambahkan aktivitas...</p>
        </div>
      )}
      {deletingDay === day.id && (
        <div className="absolute inset-0 bg-red-50/90 backdrop-blur-sm z-50 flex flex-col items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-red-500 border-t-transparent mb-3"></div>
          <p className="text-red-600 font-semibold text-lg">Menghapus jadwal...</p>
        </div>
      )}

      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-500 to-purple-600 p-4 text-white relative">
        <h2 className="text-xl font-bold">{day.day}</h2>
        <p className="text-sm opacity-90">{day.date}</p>
        <button
          onClick={handleDelete}
          disabled={deletingDay === day.id}
          className="absolute top-3 right-3 p-1 hover:bg-white/20 rounded transition-colors disabled:opacity-50"
        >
          <Trash2 className={`w-4 h-4 ${deletingDay === day.id ? "animate-spin" : ""}`} />
        </button>
      </div>

      {/* Schedules List */}
      <div className="p-4 space-y-2 flex-1 overflow-y-auto">
        {day.schedules.length === 0 ? (
          <p className="text-gray-400 text-center py-8 text-sm">Belum ada aktivitas</p>
        ) : (
          day.schedules.map((schedule) => (
            <div
              key={schedule.id}
              className={`flex items-start gap-3 p-3 rounded-lg border-2 transition-all ${
                schedule.completed ? "bg-green-50 border-green-200" : "bg-gray-50 border-gray-200"
              }`}
            >
              <button
                onClick={() => onToggleComplete(day.id, schedule.id)}
                className={`mt-1 w-5 h-5 rounded border-2 flex items-center justify-center shrink-0 transition-colors ${
                  schedule.completed
                    ? "bg-green-500 border-green-500"
                    : "border-gray-300 hover:border-indigo-500"
                }`}
              >
                {schedule.completed && <Check className="w-3 h-3 text-white" />}
              </button>

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1 text-xs font-semibold text-indigo-600 mb-1">
                  <Clock className="w-3 h-3" />
                  {schedule.startTime} - {schedule.endTime}
                </div>
                <div
                  className={`text-sm ${schedule.completed ? "line-through text-gray-500" : "text-gray-700"}`}
                >
                  {schedule.activity}
                </div>
              </div>

              <button
                onClick={() => handleDeleteSchedule(schedule.id)}
                disabled={deletingSchedule === schedule.id}
                className="text-red-400 hover:text-red-600 transition-colors shrink-0 disabled:opacity-30"
              >
                <Trash2
                  className={`w-4 h-4 ${deletingSchedule === schedule.id ? "animate-spin" : ""}`}
                />
              </button>
            </div>
          ))
        )}
      </div>

      {/* Add Schedule Form */}
      <div className="p-4 border-t-2 border-gray-100">
        <button
          onClick={() => setSelectedDay(selectedDay === day.id ? null : day.id)}
          className="w-full py-2 px-4 bg-indigo-500 hover:bg-indigo-600 text-white rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
        >
          <Plus className="w-5 h-5" />
          Tambah Aktivitas
        </button>

        {selectedDay === day.id && (
          <div className="mt-3 space-y-2 p-3 bg-gray-50 rounded-lg">
            <div className="flex gap-2">
              <input
                type="time"
                value={newStartTime}
                onChange={(e) => setNewStartTime(e.target.value)}
                className="flex-1 px-3 py-2 border-2 border-gray-200 rounded-lg focus:border-indigo-500 focus:outline-none text-sm text-black"
              />
              <span className="flex items-center text-gray-400">-</span>
              <input
                type="time"
                value={newEndTime}
                onChange={(e) => setNewEndTime(e.target.value)}
                className="flex-1 px-3 py-2 border-2 border-gray-200 rounded-lg focus:border-indigo-500 focus:outline-none text-sm text-black"
              />
            </div>
            <input
              type="text"
              placeholder="Aktivitas..."
              value={newActivity}
              onChange={(e) => setNewActivity(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleAdd()}
              className="w-full px-3 py-2 border-2 border-gray-200 rounded-lg focus:border-indigo-500 focus:outline-none text-black placeholder-gray-400"
            />
            <div className="flex gap-2">
              <button
                onClick={handleAdd}
                disabled={savingDay === day.id}
                className="flex-1 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg font-medium transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {savingDay === day.id && (
                  <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                )}
                {savingDay === day.id ? "Menambahkan..." : "Simpan"}
              </button>
              <button
                onClick={() => {
                  setSelectedDay(null);
                  setNewActivity("");
                }}
                className="flex-1 py-2 bg-gray-300 hover:bg-gray-400 text-gray-700 rounded-lg font-medium transition-colors"
              >
                Batal
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};