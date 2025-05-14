import type { Metadata } from "next";
import "./globals.css";
import Footer from "./components/footer";
import Navbar from "./components/navbar";

export const metadata: Metadata = {
  title: "M Farhan Ramadhan | Portfolio",
  description: "Website ini adalah portfolio pribadi saya",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`antialiased bg-[#EFEEEA]`}
      >
        <Navbar/>
        <main>
          {children}
        </main>
        <Footer/> 
      </body>
    </html>
  );
}
