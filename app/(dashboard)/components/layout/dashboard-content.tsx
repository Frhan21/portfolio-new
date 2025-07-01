import { DollarSign, ShoppingCart, TrendingUpDown, Users } from "lucide-react";
import React, { FC } from "react";
import { Theme } from "../../types/Theme";
import StatCard from "../card/stat-card";
import BarChart from "../charts/bar-charts";

interface DashboarContentProps {
    theme: Theme;
}

const DashboardContent: FC<DashboarContentProps> = ({ theme }) => {
    const stats = [
        {
            icon: <DollarSign size={20} />,
            title: "Revenue",
            value: "$25,000",
            change: "+5.4%",
            changeType: "increase",
        },
        {
            icon: <ShoppingCart size={20} />,
            title: "Sales",
            value: "1,200",
            change: "+2.1%",
            changeType: "increase",
        },
        {
            icon: <Users size={20} />,
            title: "Customers",
            value: "850",
            change: "-1.2%",
            changeType: "decrease",
        },
        {
            icon: <TrendingUpDown size={20} />,
            title: "Growth",
            value: "18%",
            change: "+3.9%",
            changeType: "increase",
        },
    ];
    return (
        <main className="flex-1 overflow-y-auto p-6">
            <h2
                className="text-2xl font-semibold mb-6"
                style={{ color: theme.textPrimary }}
            >
                Overview
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {stats.map((stat, id) => (
                    <StatCard
                        key={id}
                        icon={stat.icon}
                        title={stat.title}
                        value={stat.value}
                        change={stat.change}
                        changeType={stat.changeType as "increase" | "decrease"}
                        theme={theme}
                    />
                ))}
            </div>

            <div className="rounded-2xl p-6 shadow-sm" style={{ backgroundColor: theme.cardBg }}>
                <h3 className="text-lg font-semibold mb-4" style={{ color: theme.textPrimary }}>Sales Chart</h3>
                <BarChart theme={theme}/>
            </div>
        </main>
    );
};

export default DashboardContent;
