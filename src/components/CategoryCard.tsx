import React from 'react';
import { motion } from 'framer-motion';
import { RatingSlider } from './RatingSlider';

interface CategoryCardProps {
  category: {
    name: string;
    description: string;
    icon: string;
  };
  value: number;
  onChange: (value: number) => void;
  onComplete: () => void;
}

export const CategoryCard = ({ category, value, onChange, onComplete }: CategoryCardProps) => {
  const handleChange = (newValue: number) => {
    onChange(newValue);
    setTimeout(onComplete, 500); // Auto-advance after rating
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="glass-card p-8 rounded-2xl w-full max-w-md mx-auto"
    >
      <div className="text-center mb-8">
        <span className="text-4xl mb-4 block">{category.icon}</span>
        <h2 className="text-2xl font-semibold mb-2">{category.name}</h2>
        <p className="text-muted-foreground">{category.description}</p>
      </div>
      <RatingSlider value={value} onChange={handleChange} />
      <div className="text-center mt-8">
        <p className="text-4xl font-bold text-primary">{value}</p>
      </div>
    </motion.div>
  );
};