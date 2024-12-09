import React from 'react';
import { motion } from 'framer-motion';

interface RatingSliderProps {
  value: number;
  onChange: (value: number) => void;
}

export const RatingSlider = ({ value, onChange }: RatingSliderProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full max-w-md mx-auto"
    >
      <input
        type="range"
        min="0"
        max="10"
        value={value}
        onChange={(e) => onChange(parseInt(e.target.value))}
        className="rating-slider"
      />
      <div className="flex justify-between mt-2 text-sm text-muted-foreground">
        <span>0</span>
        <span>5</span>
        <span>10</span>
      </div>
    </motion.div>
  );
};