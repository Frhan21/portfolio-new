import type { Metadata } from "next";
import "../globals.css";

export const metadata: Metadata = {
  title: "Dashboard | Portfolio",
  description: "Website ini adalah portfolio pribadi saya",
};

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className={`antialiased bg-[#EFEEEA]`}>
      {children}
    </div>
  );
}
