import React, { FC } from 'react'
import { Theme } from '../../types/Theme'

interface BarChartProps {
    theme: Theme;
}

const BarChart: FC<BarChartProps> = ({ theme }) => {
    const data = [
        { label: 'Jan', value: 65 },
        { label: 'Feb', value: 59 },
        { label: 'Mar', value: 80 },
        { label: 'Apr', value: 81 },
        { label: 'May', value: 56 },
        { label: 'Jun', value: 55 }
    ]

    const maxValue = Math.max(...data.map(d => d.value))
    return (
        <div className='flex justify-around items-end h-64 pt-4'>
            {data.map(item => (
                <div key={item.label} className='flex flex-col items-center w-1/12'>
                    <div className={`w-full rounded-t-lg bg-[${theme.primary}] hover:opacity-80 transition-opacity`} style={{ height: `${(item.value / maxValue) * 100}%` }} title={`${item.label} : ${item.value}`}>
                    </div>
                    <p className='mt-2 text-xs' style={{ color: theme.textSecondary }}>{item.label}</p>
                </div>
            ))}
        </div>
    )
}

export default BarChart