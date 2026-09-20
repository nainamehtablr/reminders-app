import { ReminderSection } from "@/components/dashboard/ReminderSection";
import { prisma } from "@/lib/prisma";
import { groupReminders } from "@/lib/reminder-utils";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function Home() {
  const reminders = await prisma.reminder.findMany({ orderBy: { dueAt: "asc" } });
  const groups = groupReminders(reminders);

  return (
    <main className="dashboard-shell">
      <header className="dashboard-header">
        <div>
          <p className="eyebrow">PERSONAL PLANNER</p>
          <h1>Reminders</h1>
          <p className="dashboard-subtitle">A calm place for everything you need to remember.</p>
        </div>
        <Link className="primary-button" href="/reminders/new">+ Add reminder</Link>
      </header>

      <div className="dashboard-summary">
        <span><strong>{reminders.filter((reminder) => reminder.status === "pending").length}</strong> pending</span>
        <span className="summary-separator">•</span>
        <span>next 7 days</span>
      </div>

      <div className="dashboard-sections">
        <ReminderSection title="Overdue" description="Needs your attention" reminders={groups.overdue} tone="overdue" />
        <ReminderSection title="Today" description="Due today" reminders={groups.today} />
        <ReminderSection title="This Week" description="Due in the next 7 days" reminders={groups.thisWeek} />
        <ReminderSection title="Upcoming" description="Later than the next 7 days" reminders={groups.upcoming} />
      </div>
    </main>
  );
}
