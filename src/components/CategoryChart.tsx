import React from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, Area } from 'recharts';

interface CategoryChartProps {
  data: any[];
  category: string;
  colorIndex: number;
}

export const CategoryChart = ({ data, category, colorIndex }: CategoryChartProps) => {
  const color = `hsl(${colorIndex * (360 / 7)}, 70%, 50%)`;

  return (
    <div className="glass-card p-6 rounded-xl mb-4">
      <h3 className="text-lg font-semibold mb-4">{category} Trend</h3>
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