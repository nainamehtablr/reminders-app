"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";

const priorities = ["low", "medium", "high"] as const;

export async function createReminder(formData: FormData) {
  const title = String(formData.get("title") ?? "").trim();
  const category = String(formData.get("category") ?? "").trim();
  const dueDate = String(formData.get("dueDate") ?? "");
  const dueTime = String(formData.get("dueTime") ?? "");
  const priority = String(formData.get("priority") ?? "medium");
  const notes = String(formData.get("notes") ?? "").trim();

  if (!title || !category || !dueDate) {
    throw new Error("Title, category, and due date are required.");
  }

  if (!priorities.includes(priority as (typeof priorities)[number])) {
    throw new Error("Invalid priority.");
  }

  // A date-only reminder is placed at the end of that day. The database still
  // stores one DateTime while the time remains optional in the form.
  const dueAt = new Date(`${dueDate}T${dueTime || "23:59"}`);
  if (Number.isNaN(dueAt.getTime())) {
    throw new Error("Please enter a valid due date.");
  }

  await prisma.reminder.create({
    data: {
      title,
      category,
      dueAt,
      priority: priority as (typeof priorities)[number],
      notes: notes || null,
    },
  });

  revalidatePath("/");
  redirect("/");
}
