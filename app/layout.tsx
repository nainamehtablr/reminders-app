import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Reminders",
  description: "A simple personal reminder dashboard",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
