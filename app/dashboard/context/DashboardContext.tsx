"use client";

import { createContext, Dispatch, SetStateAction, useContext } from "react";
import { Theme } from "../types/Theme";

// Definisikan tipe untuk data yang akan dibagikan oleh context
interface DashboardContextProps {
  theme: Theme;
  toggleTheme: () => void;
  isSidebarOpen: boolean;
  setIsSidebarOpen: Dispatch<SetStateAction<boolean>>;
}

// Buat context dengan nilai default (nilai ini tidak akan pernah digunakan secara langsung)
export const DashboardContext = createContext<DashboardContextProps | undefined>(
  undefined
);

// Buat custom hook untuk mempermudah penggunaan context
export const useDashboard = (): DashboardContextProps => {
  const context = useContext(DashboardContext);
  if (!context) {
    throw new Error("useDashboard must be used within a DashboardProvider");
  }
  return context;
};
