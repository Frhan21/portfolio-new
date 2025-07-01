import type { Metadata } from "next";
import "../globals.css";
import Navbar from "../components/navbar";
import Footer from "../components/footer";

export const metadata: Metadata = {
  title: "M Farhan Ramadhan | Portfolio",
  description: "Website ini adalah portfolio pribadi saya",
};

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
      <main className={`antialiased bg-[#EFEEEA]`}>
        <Navbar />
        <main>{children}</main>
        <Footer />
      </main>
  );
}
