"use client";

import React, { useEffect, useState } from "react";
import { darkTheme, lightTheme, Theme } from "../types/Theme";
import Sidebar from "../components/sidebar";
import Header from "../components/header";
import DashboardContent from "../components/layout/dashboard-content";
import { User } from "../types/User";
import { useRouter } from "next/navigation";
import { decodetoken } from "@/libs/jwt";
import { getCookie } from "cookies-next";

const Page = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [theme, setTheme] = useState<Theme>(lightTheme);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const router = useRouter();

  // Fetching user
  const [user, setUser] = useState<User | null>(null);
  useEffect(() => {
    const tokenValue = getCookie("token");
    const token = typeof tokenValue === "string" ? tokenValue : "";
    if (!token) {
      router.push("/login");
      return;
    }

    const decoded = decodetoken(token);
    if (!decoded || !decoded.userId) {
      router.push("/login");
      return;
    }

    const fetchUser = async () => {
      try {
        const res = await fetch(`/api/v1/user/${decoded.userId}`);
        const { data } = await res.json();
        setUser(data);
        setLoading(true);
        // console.log(data);
      } catch (error: any) {
        setError(error.message);
        setLoading(true);
        router.push("/login");
      }
    };

    fetchUser();
  }, [router]);

  const toogleTheme = () => {
    setTheme((prevTheme) =>
      prevTheme === lightTheme ? darkTheme : lightTheme
    );
  };

  if (!loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
      </div>
    );
  }
  return (
    <div
      style={{ backgroundColor: theme.background, color: theme.textPrimary }}
      className="flex min-h-screen"
    >
      <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} theme={theme} />
      <div className="flex-1 flex flex-col lg:ml-64">
        {" "}
        {/* Tambahkan lg:ml-64 untuk memberi ruang bagi sidebar */}
        <Header
          setIsOpen={setIsOpen}
          theme={theme}
          toogleTheme={toogleTheme}
          name={user?.name ?? " "}
          email={user?.email ?? " "}
        />
        <DashboardContent theme={theme} />
      </div>
    </div>
  );
};

export default Page;
