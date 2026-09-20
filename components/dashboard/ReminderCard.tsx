import type { Reminder } from "@prisma/client";
import { formatDueAt } from "@/lib/reminder-utils";

export function ReminderCard({ reminder }: { reminder: Reminder }) {
  return (
    <article className="reminder-card">
      <div className="reminder-card__topline">
        <span className={`priority-dot priority-dot--${reminder.priority}`} aria-label={`${reminder.priority} priority`} />
        <span className="reminder-card__category">{reminder.category}</span>
        <span className={`priority-label priority-label--${reminder.priority}`}>{reminder.priority}</span>
      </div>
      <h3>{reminder.title}</h3>
      <p className="reminder-card__due">{formatDueAt(reminder.dueAt)}</p>
      {reminder.notes && <p className="reminder-card__notes">{reminder.notes}</p>}
    </article>
  );
}
