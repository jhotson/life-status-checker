import React from 'react';
import { motion } from 'framer-motion';
import { RatingSlider } from './RatingSlider';
import { Button } from './ui/button';
import { ChevronLeft } from 'lucide-react';

interface CategoryCardProps {
  category: {
    name: string;
    description: string;
    icon: string;
  };
  value: number;
  onChange: (value: number) => void;
  onComplete: () => void;
  onBack?: () => void;
}

export const CategoryCard = ({ category, value, onChange, onComplete, onBack }: CategoryCardProps) => {
  const handleChange = (newValue: number) => {
    onChange(newValue);
    setTimeout(onComplete, 300); // Reduced delay for faster transitions
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="glass-card p-6 rounded-2xl w-full max-w-md mx-auto"
    >
      <h2 className="text-2xl font-bold text-primary mb-8">Rate Where Are You At Today?</h2>
      <div className="text-center mb-6">
        <span className="text-4xl mb-3 block">{category.icon}</span>
        <h2 className="text-2xl font-semibold mb-2">{category.name}</h2>
        <p className="text-muted-foreground text-sm">{category.description}</p>
      </div>
      <RatingSlider value={value} onChange={handleChange} />
      <div className="text-center mt-6">
        {value === -1 ? (
          <Button 
            variant="ghost" 
            onClick={onBack}
            className="text-muted-foreground hover:text-primary flex items-center gap-2"
            disabled={!onBack}
          >
            <ChevronLeft className="w-4 h-4" />
            Back
          </Button>
        ) : (
          <p className="text-4xl font-bold text-primary">{value}</p>
        )}
      </div>
    </motion.div>
  );
};