import type { Reminder } from "@prisma/client";

export type ReminderBuckets = {
  overdue: Reminder[];
  today: Reminder[];
  thisWeek: Reminder[];
  upcoming: Reminder[];
};

function startOfDay(date: Date) {
  const result = new Date(date);
  result.setHours(0, 0, 0, 0);
  return result;
}

function addDays(date: Date, days: number) {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}

export function groupReminders(reminders: Reminder[], now = new Date()): ReminderBuckets {
  const today = startOfDay(now);
  const tomorrow = addDays(today, 1);
  const weekEnd = addDays(today, 8);

  return reminders.reduce<ReminderBuckets>(
    (groups, reminder) => {
      if (reminder.status === "completed") return groups;

      if (reminder.dueAt < today) groups.overdue.push(reminder);
      else if (reminder.dueAt < tomorrow) groups.today.push(reminder);
      else if (reminder.dueAt < weekEnd) groups.thisWeek.push(reminder);
      else groups.upcoming.push(reminder);

      return groups;
    },
    { overdue: [], today: [], thisWeek: [], upcoming: [] },
  );
}

export function formatDueAt(dueAt: Date) {
  return new Intl.DateTimeFormat("en", {
    weekday: "short",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  }).format(dueAt);
}
