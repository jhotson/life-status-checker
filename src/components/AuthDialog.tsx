import React from 'react';
import { motion } from 'framer-motion';
import { Button } from './ui/button';
import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import { supabase } from "@/integrations/supabase/client";
import { useToast } from './ui/use-toast';

interface AuthDialogProps {
  onClose: () => void;
}

export const AuthDialog = ({ onClose }: AuthDialogProps) => {
  const { toast } = useToast();

  const handleAuthError = (error: Error) => {
    if (error.message.includes('User already registered')) {
      toast({
        title: "Account exists",
        description: "This email is already registered. Please sign in instead.",
        variant: "destructive",
      });
    } else {
      toast({
        title: "Authentication error",
        description: error.message,
        variant: "destructive",
      });
    }
  };

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
        onError={handleAuthError}
      />
      <Button
        variant="ghost"
        className="mt-4 w-full"
        onClick={onClose}
      >
        Back to Summary
      </Button>
    </motion.div>
  );
};