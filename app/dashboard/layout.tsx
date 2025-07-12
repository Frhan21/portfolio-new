import type { Metadata } from "next";
import DashboardProvider from "./provider/DashboardProvider";

export const metadata: Metadata = {
  title: "Dashboard | Portfolio",
  description: "Website ini adalah portfolio pribadi saya",
};

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
      <section>
        {/* DashboardProvider akan mengelola semua state dinamis (tema, sidebar)
          dan merender layout dasar dashboard.
        */}
        <DashboardProvider>{children}</DashboardProvider>
      </section>
  );
}
