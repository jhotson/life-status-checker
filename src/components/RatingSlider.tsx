import React from 'react';
import { motion } from 'framer-motion';
import { Button } from './ui/button';

interface RatingSliderProps {
  value: number;
  onChange: (value: number) => void;
}

export const RatingSlider = ({ value, onChange }: RatingSliderProps) => {
  // Create arrays for each row of numbers
  const firstRow = [1, 2, 3];
  const secondRow = [4, 5, 6];
  const thirdRow = [7, 8, 9];
  const fourthRow = [0, 10];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full max-w-md mx-auto"
    >
      <div className="grid gap-3">
        {/* First row */}
        <div className="grid grid-cols-3 gap-3">
          {firstRow.map((num) => (
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
        
        {/* Second row */}
        <div className="grid grid-cols-3 gap-3">
          {secondRow.map((num) => (
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
        
        {/* Third row */}
        <div className="grid grid-cols-3 gap-3">
          {thirdRow.map((num) => (
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
        
        {/* Fourth row */}
        <div className="grid grid-cols-3 gap-3">
          <div className="col-span-1"></div>
          <Button
            variant={value === 0 ? "default" : "outline"}
            onClick={() => onChange(0)}
            className="h-16 text-xl font-semibold transition-all hover:scale-105"
          >
            0
          </Button>
          <Button
            variant={value === 10 ? "default" : "outline"}
            onClick={() => onChange(10)}
            className="h-16 text-xl font-semibold transition-all hover:scale-105"
          >
            10
          </Button>
        </div>
      </div>
    </motion.div>
  );
};