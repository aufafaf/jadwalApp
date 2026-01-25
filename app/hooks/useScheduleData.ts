import { useState, useEffect } from "react";
import { DaySchedule, Schedule } from "../types/schedule";
import { scheduleService } from "../services/scheduleService";

export const useScheduleData = () => {
  const [weekData, setWeekData] = useState<DaySchedule[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const loadData = async () => {
    try {
      setRefreshing(true);
      const data = await scheduleService.getAll();
      setWeekData(data);
    } catch (error) {
      console.error("Error loading schedules:", error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const createDay = async (day: string, date: string) => {
    try {
      const newDay: DaySchedule = {
        id: Date.now().toString(),
        day,
        date,
        schedules: [],
      };
      const created = await scheduleService.create(newDay);
      setWeekData((prev) => [...prev, created]);
    } catch (error) {
      console.error("Error creating day:", error);
      throw error;
    }
  };

  const updateDay = async (
    dayId: string,
    updatedData: Partial<DaySchedule>,
  ) => {
    try {
      const updated = await scheduleService.update(dayId, updatedData);
      setWeekData((prev) =>
        prev.map((item) => (item.id === dayId ? updated : item)),
      );
    } catch (error) {
      console.error("Error updating day:", error);
      throw error;
    }
  };

  const deleteDay = async (dayId: string) => {
    try {
      await scheduleService.delete(dayId);
      setWeekData((prev) => prev.filter((item) => item.id !== dayId));
    } catch (error) {
      console.error("Error deleting day:", error);
      throw error;
    }
  };

  const addSchedule = async (dayId: string, schedule: Schedule) => {
    const day = weekData.find((d) => d.id === dayId);
    if (!day) return;

    const updatedSchedules = [...day.schedules, schedule].sort((a, b) =>
      a.startTime.localeCompare(b.startTime),
    );

    await updateDay(dayId, {
      day: day.day,
      date: day.date,
      schedules: updatedSchedules,
    });
  };

  const deleteSchedule = async (dayId: string, scheduleId: string) => {
    const day = weekData.find((d) => d.id === dayId);
    if (!day) return;

    const updatedSchedules = day.schedules.filter((s) => s.id !== scheduleId);
    await updateDay(dayId, {
      day: day.day,
      date: day.date,
      schedules: updatedSchedules,
    });
  };

  const toggleComplete = async (dayId: string, scheduleId: string) => {
    const day = weekData.find((d) => d.id === dayId);
    if (!day) return;

    const updatedSchedules = day.schedules.map((schedule) =>
      schedule.id === scheduleId
        ? { ...schedule, completed: !schedule.completed }
        : schedule,
    );

    await updateDay(dayId, {
      day: day.day,
      date: day.date,
      schedules: updatedSchedules,
    });
  };

  return {
    weekData,
    loading,
    refreshing,
    loadData,
    createDay,
    updateDay,
    deleteDay,
    addSchedule,
    deleteSchedule,
    toggleComplete,
  };
};
