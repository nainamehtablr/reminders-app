import Link from "next/link";
import { createReminder } from "@/app/actions/reminders";

export function ReminderForm() {
  return (
    <form action={createReminder} className="reminder-form">
      <div className="form-field form-field--wide">
        <label htmlFor="title">Title</label>
        <input id="title" name="title" type="text" placeholder="e.g. Submit research paper" required autoFocus />
      </div>

      <div className="form-row">
        <div className="form-field">
          <label htmlFor="category">Category</label>
          <input id="category" name="category" type="text" placeholder="e.g. University" required />
        </div>
        <div className="form-field">
          <label htmlFor="priority">Priority</label>
          <select id="priority" name="priority" defaultValue="medium">
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>
      </div>

      <div className="form-row">
        <div className="form-field">
          <label htmlFor="dueDate">Due date</label>
          <input id="dueDate" name="dueDate" type="date" required />
        </div>
        <div className="form-field">
          <label htmlFor="dueTime">Due time <span>(optional)</span></label>
          <input id="dueTime" name="dueTime" type="time" />
        </div>
      </div>

      <div className="form-field form-field--wide">
        <label htmlFor="notes">Notes <span>(optional)</span></label>
        <textarea id="notes" name="notes" rows={5} placeholder="Add any useful details..." />
      </div>

      <div className="form-actions">
        <Link href="/" className="secondary-button">Cancel</Link>
        <button type="submit" className="primary-button">Save reminder</button>
      </div>
    </form>
  );
}
