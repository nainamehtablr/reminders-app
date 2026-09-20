import Link from "next/link";
import { ReminderForm } from "@/components/reminders/ReminderForm";

export default function NewReminderPage() {
  return (
    <main className="form-shell">
      <Link href="/" className="back-link">← Back to reminders</Link>
      <div className="form-header">
        <p className="eyebrow">NEW REMINDER</p>
        <h1>Add a reminder</h1>
        <p className="dashboard-subtitle">Keep the details here so they are easy to find later.</p>
      </div>
      <ReminderForm />
    </main>
  );
}
