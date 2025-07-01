import { DollarSign, ShoppingCart, TrendingUpDown, Users } from "lucide-react";
import React, { FC } from "react";
import { Theme } from "../../types/Theme";
import StatCard from "../card/stat-card";
import BarChart from "../charts/bar-charts";

interface DashboarContentProps {
  theme: Theme;
}

const DashboardContent: FC<DashboarContentProps> = ({ theme }) => {
  return (
    <main className="flex-1 overflow-y-auto p-6">
      <h2
        className="text-2xl font-semibold mb-6"
        style={{ color: theme.textPrimary }}
      >
        Overview
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <div className="border-2 border-black-90 p-12 rounded-lg">
          <span className="text-left text-xl">Jumlah Postingan</span>
        </div>
        <div className="border-2 border-black-90 p-12 rounded-lg">
          <span className="text-left text-xl">Jumlah Kategori</span>
        </div>
        <div className="border-2 border-black-90 p-12 rounded-lg">
          <span className="text-left text-xl">Jumlah Sertifikat</span>
        </div>
        <div className="border-2 border-black-90 p-12 rounded-lg">
          <span className="text-left text-xl">Jumlah Sertifikat</span>
        </div>
      </div>
    </main>
  );
};

export default DashboardContent;
