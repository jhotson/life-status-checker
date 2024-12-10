import React from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, Area } from 'recharts';
import { Rating } from './SummaryView';

interface HistoricalChartProps {
  historicalData: any[];
  ratings: Rating[];
}

export const HistoricalChart = ({ historicalData, ratings }: HistoricalChartProps) => {
  return (
    <div className="h-64 mb-8">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={historicalData.length > 0 ? historicalData : ratings.map(r => ({ [r.category]: r.value }))}>
          <defs>
            {ratings.map((rating, index) => (
              <linearGradient key={`gradient-${rating.category}`} id={`gradient-${rating.category}`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={`hsl(${index * (360 / ratings.length)}, 70%, 50%)`} stopOpacity={0.3} />
                <stop offset="95%" stopColor={`hsl(${index * (360 / ratings.length)}, 70%, 50%)`} stopOpacity={0} />
              </linearGradient>
            ))}
          </defs>
          <XAxis dataKey="date" />
          <YAxis domain={[0, 10]} />
          <Tooltip />
          {ratings.map((rating, index) => (
            <React.Fragment key={rating.category}>
              <Area
                type="monotone"
                dataKey={rating.category}
                stroke={`hsl(${index * (360 / ratings.length)}, 70%, 50%)`}
                fillOpacity={1}
                fill={`url(#gradient-${rating.category})`}
                strokeWidth={2}
                dot={{ fill: `hsl(${index * (360 / ratings.length)}, 70%, 50%)` }}
              />
              <Line
                type="monotone"
                dataKey={rating.category}
                stroke={`hsl(${index * (360 / ratings.length)}, 70%, 50%)`}
                strokeWidth={2}
                dot={{ fill: `hsl(${index * (360 / ratings.length)}, 70%, 50%)` }}
              />
            </React.Fragment>
          ))}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};