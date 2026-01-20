"use client";

import React, { useState, useEffect } from "react";
import {
  Calendar,
  Plus,
  Trash2,
  Check,
  Eye,
  Clock,
  ArrowLeft,
} from "lucide-react";

interface Schedule {
  id: string;
  startTime: string;
  endTime: string;
  activity: string;
  completed: boolean;
}

interface DaySchedule {
  id: string;
  day: string;
  date: string;
  schedules: Schedule[];
  createdAt?: number;
}

type Page = "menu" | "view" | "create";

const WeeklyScheduler = () => {
  const [currentPage, setCurrentPage] = useState<Page>("menu");
  const [weekData, setWeekData] = useState<DaySchedule[]>([]);
  const [selectedDay, setSelectedDay] = useState<string | null>(null);
  const [newStartTime, setNewStartTime] = useState("07:00");
  const [newEndTime, setNewEndTime] = useState("09:00");
  const [newActivity, setNewActivity] = useState("");
  const [createDate, setCreateDate] = useState("");
  const [loading, setLoading] = useState(true);

  // Load data dari Firestore
  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const response = await fetch("/api/schedules");
        const data = await response.json();
        setWeekData(data);
      } catch (error) {
        console.error("Error loading schedules:", error);
      } finally {
        setLoading(false);
      }
    };

    loadData();

    // Poll every 2 seconds for updates
    const interval = setInterval(loadData, 2000);
    return () => clearInterval(interval);
  }, []);

  const saveToFirebase = async (newData: DaySchedule): Promise<void> => {
    try {
      console.log("Sending POST request with data:", newData);
      const response = await fetch("/api/schedules", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newData),
      });

      console.log("Response status:", response.status);
      const data = await response.json();
      console.log("Response data:", data);

      if (response.ok) {
        // Langsung update state dengan data baru dari server
        setWeekData((prev) => [...prev, data]);
        // Pastikan loading di-reset
        setLoading(false);
      } else {
        console.error("Server error:", data);
        alert("Error: " + (data.error || "Failed to create schedule"));
      }
    } catch (error) {
      console.error("Error saving to database:", error);
      alert("Error saving to database: " + String(error));
    }
  };

  const updateFirebase = async (
    dayId: string,
    updatedData: Partial<DaySchedule>,
  ) => {
    try {
      const response = await fetch(`/api/schedules/${dayId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedData),
      });

      if (response.ok) {
        const data = await response.json();
        setWeekData((prev) =>
          prev.map((item) => (item.id === dayId ? data : item)),
        );
      }
    } catch (error) {
      console.error("Error updating database:", error);
    }
  };

  const deleteFromFirebase = async (dayId: string) => {
    try {
      const response = await fetch(`/api/schedules/${dayId}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setWeekData((prev) => prev.filter((item) => item.id !== dayId));
      }
    } catch (error) {
      console.error("Error deleting from database:", error);
    }
  };

  const createNewDay = async (day: string, date: string) => {
    const newDay: DaySchedule = {
      id: Date.now().toString(),
      day,
      date,
      schedules: [],
    };
    return await saveToFirebase(newDay);
  };

  const addSchedule = (dayId: string) => {
    if (!newActivity.trim()) return;

    const newSchedule: Schedule = {
      id: Date.now().toString(),
      startTime: newStartTime,
      endTime: newEndTime,
      activity: newActivity,
      completed: false,
    };

    const updatedDay = weekData.find((d) => d.id === dayId);
    if (updatedDay) {
      const updatedSchedules = [...updatedDay.schedules, newSchedule].sort(
        (a, b) => a.startTime.localeCompare(b.startTime),
      );
      updateFirebase(dayId, {
        day: updatedDay.day,
        date: updatedDay.date,
        schedules: updatedSchedules,
      });
    }

    setNewActivity("");
    setSelectedDay(null);
  };

  const deleteSchedule = (dayId: string, scheduleId: string) => {
    const updatedDay = weekData.find((d) => d.id === dayId);
    if (updatedDay) {
      const updatedSchedules = updatedDay.schedules.filter(
        (s) => s.id !== scheduleId,
      );
      updateFirebase(dayId, {
        day: updatedDay.day,
        date: updatedDay.date,
        schedules: updatedSchedules,
      });
    }
  };

  const deleteDay = (dayId: string) => {
    deleteFromFirebase(dayId);
  };

  const toggleComplete = (dayId: string, scheduleId: string) => {
    const updatedDay = weekData.find((d) => d.id === dayId);
    if (updatedDay) {
      const updatedSchedules = updatedDay.schedules.map((schedule) =>
        schedule.id === scheduleId
          ? { ...schedule, completed: !schedule.completed }
          : schedule,
      );
      updateFirebase(dayId, {
        day: updatedDay.day,
        date: updatedDay.date,
        schedules: updatedSchedules,
      });
    }
  };

  // Menu Page
  if (currentPage === "menu") {
    return (
      <div className="min-h-screen bg-linear-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
        <div className="text-center">
          <Calendar className="w-24 h-24 text-indigo-600 mx-auto mb-6" />
          <h1 className="text-5xl font-bold text-gray-800 mb-4">
            Jadwal Mingguanku
          </h1>
          <p className="text-gray-600 mb-12 text-lg">
            Kelola jadwal harianmu dengan mudah
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => setCurrentPage("view")}
              className="px-8 py-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-semibold text-lg transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-3"
            >
              <Eye className="w-6 h-6" />
              Lihat Jadwal
            </button>
            <button
              onClick={() => setCurrentPage("create")}
              className="px-8 py-4 bg-green-600 hover:bg-green-700 text-white rounded-xl font-semibold text-lg transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-3"
            >
              <Plus className="w-6 h-6" />
              Buat Jadwal Baru
            </button>
          </div>
        </div>
      </div>
    );
  }

  // View Schedule Page
  if (currentPage === "view") {
    return (
      <div className="min-h-screen bg-linear-to-br from-blue-50 to-indigo-100 p-4 md:p-8">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8 flex items-center justify-between">
            <button
              onClick={() => setCurrentPage("menu")}
              className="flex items-center gap-2 px-4 py-2 bg-white rounded-lg shadow hover:shadow-md transition-all text-gray-800"
            >
              <ArrowLeft className="w-5 h-5" />
              Kembali
            </button>
            <h1 className="text-3xl font-bold text-gray-800">Jadwal</h1>
            <div className="w-24"></div>
          </div>

          {loading ? (
            <div className="flex flex-col items-center justify-center h-[60vh]">
              <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-indigo-600 mb-6"></div>
              <p className="text-gray-600 font-medium">Memuat jadwal...</p>
            </div>
          ) : weekData.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-[60vh]">
              <Calendar className="w-32 h-32 text-gray-300 mb-6" />
              <h2 className="text-2xl font-semibold text-gray-400 mb-2">
                Belum Ada Jadwal
              </h2>
              <p className="text-gray-400 mb-6">
                Buat jadwal pertamamu untuk memulai
              </p>
              <button
                onClick={() => setCurrentPage("create")}
                className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-medium transition-all shadow-lg"
              >
                Buat Jadwal Sekarang
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {weekData.map((day) => (
                <div
                  key={day.id}
                  className="bg-white rounded-2xl shadow-lg overflow-hidden border-2 border-gray-100 hover:shadow-xl transition-shadow"
                >
                  <div className="bg-linear-to-r from-indigo-500 to-purple-600 p-4 text-white relative">
                    <h2 className="text-xl font-bold">{day.day}</h2>
                    <p className="text-sm opacity-90">{day.date}</p>
                    <button
                      onClick={() => deleteDay(day.id)}
                      className="absolute top-3 right-3 p-1 hover:bg-white/20 rounded transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="p-4 space-y-2 min-h-50 max-h-100 overflow-y-auto">
                    {day.schedules.length === 0 ? (
                      <p className="text-gray-400 text-center py-8 text-sm">
                        Belum ada aktivitas
                      </p>
                    ) : (
                      day.schedules.map((schedule) => (
                        <div
                          key={schedule.id}
                          className={`flex items-start gap-3 p-3 rounded-lg border-2 transition-all ${
                            schedule.completed
                              ? "bg-green-50 border-green-200"
                              : "bg-gray-50 border-gray-200"
                          }`}
                        >
                          <button
                            onClick={() => toggleComplete(day.id, schedule.id)}
                            className={`mt-1 w-5 h-5 rounded border-2 flex items-center justify-center shrink-0 transition-colors ${
                              schedule.completed
                                ? "bg-green-500 border-green-500"
                                : "border-gray-300 hover:border-indigo-500"
                            }`}
                          >
                            {schedule.completed && (
                              <Check className="w-3 h-3 text-white" />
                            )}
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
                            onClick={() => deleteSchedule(day.id, schedule.id)}
                            className="text-red-400 hover:text-red-600 transition-colors shrink-0"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      ))
                    )}
                  </div>

                  <div className="p-4 border-t-2 border-gray-100">
                    <button
                      onClick={() =>
                        setSelectedDay(selectedDay === day.id ? null : day.id)
                      }
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
                          <span className="flex items-center text-gray-400">
                            -
                          </span>
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
                          onKeyPress={(e) =>
                            e.key === "Enter" && addSchedule(day.id)
                          }
                          className="w-full px-3 py-2 border-2 border-gray-200 rounded-lg focus:border-indigo-500 focus:outline-none text-black placeholder-gray-400"
                        />
                        <div className="flex gap-2">
                          <button
                            onClick={() => addSchedule(day.id)}
                            className="flex-1 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg font-medium transition-colors"
                          >
                            Simpan
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
              ))}
            </div>
          )}
        </div>
      </div>
    );
  }

  // Create Schedule Page
  const handleCreateDay = async () => {
    if (!createDate.trim()) return;

    // Convert date string to day name and formatted date
    const date = new Date(createDate);
    const dayNames = [
      "Minggu",
      "Senin",
      "Selasa",
      "Rabu",
      "Kamis",
      "Jumat",
      "Sabtu",
    ];
    const dayName = dayNames[date.getDay()];

    const options: Intl.DateTimeFormatOptions = {
      day: "numeric",
      month: "long",
      year: "numeric",
    };
    const formattedDate = date.toLocaleDateString("id-ID", options);

    // Buat jadwal baru dan tunggu async operation selesai
    await createNewDay(dayName, formattedDate);
    setCreateDate("");
    setCurrentPage("view");
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 to-indigo-100 p-4 flex items-center justify-center">
      <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full">
        <button
          onClick={() => setCurrentPage("menu")}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-800 mb-6"
        >
          <ArrowLeft className="w-5 h-5" />
          Kembali
        </button>

        <h2 className="text-2xl font-bold text-gray-800 mb-6">
          Buat Jadwal Baru
        </h2>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Pilih Tanggal
            </label>
            <input
              type="date"
              value={createDate}
              onChange={(e) => setCreateDate(e.target.value)}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-indigo-500 focus:outline-none text-black"
            />
            {createDate && (
              <p className="text-xs text-gray-600 mt-2">
                Hari:{" "}
                <span className="font-semibold">
                  {new Intl.DateTimeFormat("id-ID", { weekday: "long" }).format(
                    new Date(createDate),
                  )}
                </span>
              </p>
            )}
          </div>

          <button
            onClick={handleCreateDay}
            className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-semibold transition-all shadow-lg hover:shadow-xl mt-6"
          >
            Buat Jadwal
          </button>
        </div>
      </div>
    </div>
  );
};

export default WeeklyScheduler;
