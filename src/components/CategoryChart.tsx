import React from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, Area } from 'recharts';

interface CategoryChartProps {
  data: any[];
  category: string;
  colorIndex: number;
}

export const CategoryChart = ({ data, category, colorIndex }: CategoryChartProps) => {
  const color = `hsl(${colorIndex * (360 / 7)}, 70%, 50%)`;

  // Calculate percentage change
  const calculatePercentageChange = () => {
    if (data.length < 2) return null;
    const firstValue = data[0][category];
    const lastValue = data[data.length - 1][category];
    if (typeof firstValue !== 'number' || typeof lastValue !== 'number') return null;
    const change = ((lastValue - firstValue) / firstValue) * 100;
    return change;
  };

  const percentageChange = calculatePercentageChange();

  return (
    <div className="glass-card p-6 rounded-xl mb-4">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">{category} Trend</h3>
        {percentageChange !== null && (
          <div className={cn(
            "text-sm font-medium px-2 py-1 rounded",
            percentageChange > 0 ? "text-green-600" : "text-red-600"
          )}>
            {percentageChange > 0 ? "+" : ""}{percentageChange.toFixed(1)}%
          </div>
        )}
      </div>
      <div className="h-48">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <defs>
              <linearGradient id={`gradient-${category}`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={color} stopOpacity={0.3} />
                <stop offset="95%" stopColor={color} stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis dataKey="date" />
            <YAxis domain={[0, 10]} />
            <Tooltip />
            <Area
              type="monotone"
              dataKey={category}
              stroke={color}
              fillOpacity={1}
              fill={`url(#gradient-${category})`}
              strokeWidth={2}
              dot={{ fill: color }}
            />
            <Line
              type="monotone"
              dataKey={category}
              stroke={color}
              strokeWidth={2}
              dot={{ fill: color }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};