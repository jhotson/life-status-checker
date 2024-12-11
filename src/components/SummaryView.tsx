import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { supabase } from "@/integrations/supabase/client";
import { Button } from './ui/button';
import { useToast } from './ui/use-toast';
import { AuthDialog } from './AuthDialog';
import { HistoricalChart } from './HistoricalChart';
import { TimeRangeSelector } from './TimeRangeSelector';
import { CategoryChart } from './CategoryChart';

export interface Rating {
  category: string;
  value: number;
}

interface SummaryViewProps {
  ratings: Rating[];
  onReset: () => void;
}

export const SummaryView = ({ ratings, onReset }: SummaryViewProps) => {
  const { toast } = useToast();
  const [timeRange, setTimeRange] = useState('month');
  const [showAuth, setShowAuth] = useState(false);
  const [historicalData, setHistoricalData] = useState<any[]>([]);
  const average = ratings.reduce((acc, curr) => acc + curr.value, 0) / ratings.length;

  const handleSave = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    
    if (!session) {
      setShowAuth(true);
      return;
    }

    try {
      const promises = ratings.map(rating => 
        supabase.from('ratings').insert({
          user_id: session.user.id,
          category: rating.category,
          value: rating.value
        })
      );

      await Promise.all(promises);
      
      toast({
        title: "Ratings saved successfully!",
        description: "Your life balance ratings have been saved.",
      });

      loadHistoricalData(timeRange);
    } catch (error) {
      toast({
        title: "Error saving ratings",
        description: "There was an error saving your ratings. Please try again.",
        variant: "destructive",
      });
    }
  };

  const loadHistoricalData = async (range: string) => {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) return;

    let daysAgo;
    switch (range) {
      case 'month': daysAgo = 30; break;
      case '3months': daysAgo = 90; break;
      case '6months': daysAgo = 180; break;
      case 'year': daysAgo = 365; break;
      case '2years': daysAgo = 730; break;
      default: daysAgo = 30;
    }

    const { data, error } = await supabase
      .from('ratings')
      .select('*')
      .gte('created_at', new Date(Date.now() - daysAgo * 24 * 60 * 60 * 1000).toISOString())
      .order('created_at', { ascending: true });

    if (data) {
      const groupedData = data.reduce((acc: any, curr) => {
        const date = new Date(curr.created_at).toLocaleDateString();
        if (!acc[date]) {
          acc[date] = { date, average: 0, count: 0 };
        }
        acc[date][curr.category] = curr.value;
        acc[date].average += curr.value;
        acc[date].count += 1;
        return acc;
      }, {});

      // Calculate the average for each date
      Object.values(groupedData).forEach((day: any) => {
        day.average = day.average / day.count;
        delete day.count;
      });

      setHistoricalData(Object.values(groupedData));
    }
  };

  useEffect(() => {
    loadHistoricalData(timeRange);
  }, [timeRange]);

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === 'SIGNED_IN') {
        await handleSave();
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  if (showAuth) {
    return <AuthDialog onClose={() => setShowAuth(false)} />;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-card p-8 rounded-2xl w-full max-w-2xl mx-auto"
    >
      <h2 className="text-2xl font-semibold mb-2 text-center">Your Life Balance</h2>
      <p className="text-lg text-center mb-6">
        Overall Score: <span className="font-bold">{average.toFixed(1)}</span>
      </p>
      
      <HistoricalChart historicalData={historicalData} ratings={ratings} showOverallTrend={true} />
      <TimeRangeSelector value={timeRange} onChange={setTimeRange} />

      <div className="grid grid-cols-2 gap-4 mb-8">
        {ratings.map((rating) => (
          <div key={rating.category} className="p-4 rounded-lg bg-secondary">
            <h3 className="font-medium mb-1">{rating.category}</h3>
            <p className="text-2xl font-bold">{rating.value}</p>
          </div>
        ))}
      </div>

      <div className="flex gap-4 justify-center mb-8">
        <Button
          onClick={handleSave}
          className="px-6 py-3 bg-primary text-primary-foreground rounded-full hover:opacity-90 transition-opacity"
        >
          Save Ratings
        </Button>
        <Button
          onClick={onReset}
          variant="outline"
          className="px-6 py-3 rounded-full"
        >
          Start New Rating
        </Button>
      </div>

      <div className="mt-8">
        <h3 className="text-xl font-semibold mb-4 text-center">Individual Category Trends</h3>
        {ratings.map((rating, index) => (
          <CategoryChart
            key={rating.category}
            data={historicalData}
            category={rating.category}
            colorIndex={index}
          />
        ))}
      </div>
    </motion.div>
  );
};