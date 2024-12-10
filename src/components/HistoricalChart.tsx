import React from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
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
          <XAxis dataKey="date" />
          <YAxis domain={[0, 10]} />
          <Tooltip />
          {ratings.map((rating, index) => (
            <Line
              key={rating.category}
              type="monotone"
              dataKey={rating.category}
              stroke={`hsl(${index * (360 / ratings.length)}, 70%, 50%)`}
              strokeWidth={2}
              dot={{ fill: `hsl(${index * (360 / ratings.length)}, 70%, 50%)` }}
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};