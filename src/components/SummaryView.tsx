import React from 'react';
import { motion } from 'framer-motion';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

interface Rating {
  category: string;
  value: number;
}

interface SummaryViewProps {
  ratings: Rating[];
  onReset: () => void;
}

export const SummaryView = ({ ratings, onReset }: SummaryViewProps) => {
  const average = ratings.reduce((acc, curr) => acc + curr.value, 0) / ratings.length;

  const chartData = ratings.map((rating) => ({
    name: rating.category,
    value: rating.value,
  }));

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-card p-8 rounded-2xl w-full max-w-2xl mx-auto"
    >
      <h2 className="text-2xl font-semibold mb-6 text-center">Your Life Balance</h2>
      
      <div className="h-64 mb-8">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData}>
            <XAxis dataKey="name" />
            <YAxis domain={[0, 10]} />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="value"
              stroke="hsl(var(--primary))"
              strokeWidth={2}
              dot={{ fill: "hsl(var(--primary))" }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-8">
        {ratings.map((rating) => (
          <div key={rating.category} className="p-4 rounded-lg bg-secondary">
            <h3 className="font-medium mb-1">{rating.category}</h3>
            <p className="text-2xl font-bold">{rating.value}</p>
          </div>
        ))}
      </div>

      <div className="text-center">
        <p className="text-lg mb-4">
          Overall Score: <span className="font-bold">{average.toFixed(1)}</span>
        </p>
        <button
          onClick={onReset}
          className="px-6 py-3 bg-primary text-primary-foreground rounded-full hover:opacity-90 transition-opacity"
        >
          Start New Rating
        </button>
      </div>
    </motion.div>
  );
};