import React from 'react';
import { motion } from 'framer-motion';
import { Button } from './ui/button';

interface RatingSliderProps {
  value: number;
  onChange: (value: number) => void;
}

export const RatingSlider = ({ value, onChange }: RatingSliderProps) => {
  const numbers = Array.from({ length: 11 }, (_, i) => i);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full max-w-md mx-auto"
    >
      <div className="grid grid-cols-3 gap-3">
        {numbers.map((num) => (
          <Button
            key={num}
            variant={value === num ? "default" : "outline"}
            onClick={() => onChange(num)}
            className="h-16 text-xl font-semibold transition-all hover:scale-105"
          >
            {num}
          </Button>
        ))}
      </div>
    </motion.div>
  );
};