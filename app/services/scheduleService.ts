import { DaySchedule } from "../types/schedule";

export const scheduleService = {
  async getAll(): Promise<DaySchedule[]> {
    const response = await fetch("/api/schedules");
    return response.json();
  },

  async create(newData: DaySchedule): Promise<DaySchedule> {
    const response = await fetch("/api/schedules", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newData),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || "Failed to create schedule");
    }

    return response.json();
  },

  async update(dayId: string, updatedData: Partial<DaySchedule>): Promise<DaySchedule> {
    const response = await fetch(`/api/schedules/${dayId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedData),
    });

    if (!response.ok) {
      throw new Error("Failed to update schedule");
    }

    return response.json();
  },

  async delete(dayId: string): Promise<void> {
    const response = await fetch(`/api/schedules/${dayId}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error("Failed to delete schedule");
    }
  },
};
