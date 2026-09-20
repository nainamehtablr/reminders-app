import type { Reminder } from "@prisma/client";
import { ReminderCard } from "./ReminderCard";

type ReminderSectionProps = {
  title: string;
  description: string;
  reminders: Reminder[];
  tone?: "default" | "overdue";
};

export function ReminderSection({ title, description, reminders, tone = "default" }: ReminderSectionProps) {
  return (
    <section className={`reminder-section ${tone === "overdue" ? "reminder-section--overdue" : ""}`}>
      <div className="section-heading">
        <div>
          <h2>{title}</h2>
          <p>{description}</p>
        </div>
        <span className="section-count">{reminders.length}</span>
      </div>
      {reminders.length > 0 ? (
        <div className="reminder-list">
          {reminders.map((reminder) => <ReminderCard key={reminder.id} reminder={reminder} />)}
        </div>
      ) : (
        <div className="empty-section">No reminders here yet.</div>
      )}
    </section>
  );
}
