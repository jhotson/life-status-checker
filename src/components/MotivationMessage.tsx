import React from 'react';
import { motion } from 'framer-motion';

const MotivationMessage = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-card p-8 rounded-2xl w-full max-w-2xl mx-auto text-center"
    >
      <h2 className="text-2xl font-bold mb-6">🔥 Your Drive is Your Power 🔥</h2>
      <p className="text-xl leading-relaxed">
        If that's how bad you want to win, then you have to quit worrying about what others think of you, and you have to get up hungry wanting to get after it.
      </p>
    </motion.div>
  );
};

export default MotivationMessage;