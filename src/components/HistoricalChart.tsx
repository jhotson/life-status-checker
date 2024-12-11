import React from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, Area } from 'recharts';
import { Rating } from './SummaryView';

interface HistoricalChartProps {
  historicalData: any[];
  ratings: Rating[];
  showOverallTrend?: boolean;
}

export const HistoricalChart = ({ historicalData, ratings, showOverallTrend = false }: HistoricalChartProps) => {
  // Calculate percentage change for overall trend
  const calculatePercentageChange = () => {
    if (historicalData.length < 2) return null;
    const firstValue = historicalData[0].average;
    const lastValue = historicalData[historicalData.length - 1].average;
    if (typeof firstValue !== 'number' || typeof lastValue !== 'number') return null;
    const change = ((lastValue - firstValue) / firstValue) * 100;
    return change;
  };

  const percentageChange = calculatePercentageChange();

  return (
    <div className="relative h-64 mb-8">
      {showOverallTrend && percentageChange !== null && (
        <div className={`absolute top-2 left-2 text-sm font-medium px-2 py-1 rounded ${
          percentageChange > 0 ? "text-green-600" : "text-red-600"
        }`}>
          {percentageChange > 0 ? "+" : ""}{percentageChange.toFixed(1)}%
        </div>
      )}
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={historicalData}>
          <defs>
            {showOverallTrend ? (
              <linearGradient id="gradient-average" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(220, 70%, 50%)" stopOpacity={0.3} />
                <stop offset="95%" stopColor="hsl(220, 70%, 50%)" stopOpacity={0} />
              </linearGradient>
            ) : (
              ratings.map((rating, index) => (
                <linearGradient key={`gradient-${rating.category}`} id={`gradient-${rating.category}`} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={`hsl(${index * (360 / ratings.length)}, 70%, 50%)`} stopOpacity={0.3} />
                  <stop offset="95%" stopColor={`hsl(${index * (360 / ratings.length)}, 70%, 50%)`} stopOpacity={0} />
                </linearGradient>
              ))
            )}
          </defs>
          <XAxis dataKey="date" />
          <YAxis domain={[0, 10]} />
          <Tooltip />
          {showOverallTrend ? (
            <>
              <Area
                type="monotone"
                dataKey="average"
                stroke="hsl(220, 70%, 50%)"
                fillOpacity={1}
                fill="url(#gradient-average)"
                strokeWidth={2}
                dot={{ fill: "hsl(220, 70%, 50%)" }}
              />
              <Line
                type="monotone"
                dataKey="average"
                stroke="hsl(220, 70%, 50%)"
                strokeWidth={2}
                dot={{ fill: "hsl(220, 70%, 50%)" }}
              />
            </>
          ) : (
            ratings.map((rating, index) => (
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
            ))
          )}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};