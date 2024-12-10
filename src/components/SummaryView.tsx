import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { supabase } from "@/integrations/supabase/client";
import { Button } from './ui/button';
import { useToast } from './ui/use-toast';
import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

interface Rating {
  category: string;
  value: number;
}

interface SummaryViewProps {
  ratings: Rating[];
  onReset: () => void;
}

export const SummaryView = ({ ratings, onReset }: SummaryViewProps) => {
  const { toast } = useToast();
  const [timeRange, setTimeRange] = useState('week');
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
      case 'week': daysAgo = 7; break;
      case 'month': daysAgo = 30; break;
      case '3months': daysAgo = 90; break;
      case '6months': daysAgo = 180; break;
      case 'year': daysAgo = 365; break;
      case '2years': daysAgo = 730; break;
      default: daysAgo = 7;
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
          acc[date] = { date };
        }
        acc[date][curr.category] = curr.value;
        return acc;
      }, {});

      setHistoricalData(Object.values(groupedData));
    }
  };

  React.useEffect(() => {
    loadHistoricalData(timeRange);
  }, [timeRange]);

  if (showAuth) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-card p-8 rounded-2xl w-full max-w-md mx-auto"
      >
        <h2 className="text-2xl font-semibold mb-6 text-center">Sign in to Save Your Ratings</h2>
        <Auth 
          supabaseClient={supabase}
          appearance={{ theme: ThemeSupa }}
          theme="light"
          providers={[]}
        />
        <Button
          variant="ghost"
          className="mt-4 w-full"
          onClick={() => setShowAuth(false)}
        >
          Back to Summary
        </Button>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-card p-8 rounded-2xl w-full max-w-2xl mx-auto"
    >
      <h2 className="text-2xl font-semibold mb-6 text-center">Your Life Balance</h2>
      
      <div className="h-64 mb-8">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={historicalData.length > 0 ? historicalData : ratings.map(r => ({ [r.category]: r.value }))}>
            <XAxis dataKey="date" />
            <YAxis domain={[0, 10]} />
            <Tooltip />
            {ratings.map((rating, index) => (
              <Line
                key={rating.category}
                type="monotone"
                dataKey={rating.category}
                stroke={`hsl(${index * (360 / ratings.length)}, 70%, 50%)`}
                strokeWidth={2}
                dot={{ fill: `hsl(${index * (360 / ratings.length)}, 70%, 50%)` }}
              />
            ))}
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="flex justify-between items-center mb-6">
        <Select value={timeRange} onValueChange={setTimeRange}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select time range" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="week">1 Week</SelectItem>
            <SelectItem value="month">1 Month</SelectItem>
            <SelectItem value="3months">3 Months</SelectItem>
            <SelectItem value="6months">6 Months</SelectItem>
            <SelectItem value="year">1 Year</SelectItem>
            <SelectItem value="2years">2 Years</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-8">
        {ratings.map((rating) => (
          <div key={rating.category} className="p-4 rounded-lg bg-secondary">
            <h3 className="font-medium mb-1">{rating.category}</h3>
            <p className="text-2xl font-bold">{rating.value}</p>
          </div>
        ))}
      </div>

      <div className="text-center space-y-4">
        <p className="text-lg mb-4">
          Overall Score: <span className="font-bold">{average.toFixed(1)}</span>
        </p>
        <div className="flex gap-4 justify-center">
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
      </div>
    </motion.div>
  );
};