export interface Schedule {
  id: string;
  startTime: string;
  endTime: string;
  activity: string;
  completed: boolean;
}

export interface DaySchedule {
  id: string;
  day: string;
  date: string;
  schedules: Schedule[];
  createdAt?: number;
}

export type Page = "menu" | "view" | "create";