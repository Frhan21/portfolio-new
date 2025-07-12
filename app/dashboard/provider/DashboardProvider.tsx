"use client";

import { useState, useMemo, FC, ReactNode } from "react";
import { darkTheme, lightTheme } from "../types/Theme";
import { DashboardContext } from "../context/DashboardContext";
import Sidebar from "../components/sidebar"; // Pastikan path ini benar

interface DashboardProviderProps {
  children: ReactNode;
}

const DashboardProvider: FC<DashboardProviderProps> = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleTheme = () => {
    setIsDarkMode((prev) => !prev);
  };

  const theme = useMemo(
    () => (isDarkMode ? darkTheme : lightTheme),
    [isDarkMode]
  );

  // Nilai yang akan dibagikan melalui context
  const contextValue = {
    theme,
    toggleTheme,
    isSidebarOpen,
    setIsSidebarOpen,
  };

  return (
    <DashboardContext.Provider value={contextValue}>
      <div
        style={{
          backgroundColor: theme.background,
          color: theme.textPrimary,
        }}
        className="flex min-h-screen transition-colors duration-300"
      >
        {/* Sidebar sekarang mendapatkan state dari provider ini */}
        <Sidebar theme={theme} isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
        
        {/* Children adalah layout dari (home) dan halamannya */}
        <main className="flex-1 flex flex-col lg:ml-64">{children}</main>
      </div>
    </DashboardContext.Provider>
  );
};

export default DashboardProvider;
