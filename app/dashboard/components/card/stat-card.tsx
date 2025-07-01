import React from 'react';
import { Theme } from '../../types/Theme';


interface StatCardProps {
    icon: React.ReactNode;
    title: string;
    value: string;
    change: string;
    changeType: 'increase' | 'decrease';
    theme: Theme
}
const StatCard: React.FC<StatCardProps> = ({ icon, title, value, change, changeType, theme }) => (
    <div style={{ backgroundColor: theme.cardBg }} className="p-6 rounded-2xl shadow-sm flex items-center space-x-4">
        <div className={`p-3 rounded-full bg-[${theme.primary}]/10 text-[${theme.primary}]`}>
            {icon}
        </div>
        <div>
            <p style={{ color: theme.textSecondary }} className="text-sm">{title}</p>
            <p style={{ color: theme.textPrimary }} className="text-2xl font-bold">{value}</p>
        </div>
        <div className={`ml-auto text-sm font-medium ${changeType === 'increase' ? 'text-green-500' : 'text-red-500'}`}>
            {change}
        </div>
    </div>
);

export default StatCard;