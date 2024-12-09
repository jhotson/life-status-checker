import React, { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { CategoryCard } from '../components/CategoryCard';
import { SummaryView } from '../components/SummaryView';

const categories = [
  {
    name: 'Career',
    description: 'Professional growth and satisfaction',
    icon: '💼',
  },
  {
    name: 'Family',
    description: 'Quality of family relationships',
    icon: '👨‍👩‍👧‍👦',
  },
  {
    name: 'Spiritual',
    description: 'Inner peace and purpose',
    icon: '🧘',
  },
  {
    name: 'Financial',
    description: 'Financial security and growth',
    icon: '💰',
  },
  {
    name: 'Emotional',
    description: 'Mental well-being and happiness',
    icon: '❤️',
  },
  {
    name: 'Physical',
    description: 'Health and fitness',
    icon: '💪',
  },
  {
    name: 'Relationships',
    description: 'Social connections and friendships',
    icon: '🤝',
  },
];

const Index = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [ratings, setRatings] = useState(categories.map(() => 5));
  const [isComplete, setIsComplete] = useState(false);

  const handleRating = (index: number, value: number) => {
    const newRatings = [...ratings];
    newRatings[index] = value;
    setRatings(newRatings);
  };

  const handleNext = () => {
    if (currentIndex < categories.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setIsComplete(true);
    }
  };

  const handleReset = () => {
    setCurrentIndex(0);
    setRatings(categories.map(() => 5));
    setIsComplete(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className="w-full max-w-4xl">
        <AnimatePresence mode="wait">
          {!isComplete ? (
            <CategoryCard
              key={currentIndex}
              category={categories[currentIndex]}
              value={ratings[currentIndex]}
              onChange={(value) => handleRating(currentIndex, value)}
              onComplete={handleNext}
            />
          ) : (
            <SummaryView
              ratings={categories.map((cat, i) => ({
                category: cat.name,
                value: ratings[i],
              }))}
              onReset={handleReset}
            />
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Index;