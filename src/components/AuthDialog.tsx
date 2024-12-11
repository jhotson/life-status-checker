import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from './ui/button';
import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import { supabase } from "@/integrations/supabase/client";
import { useToast } from './ui/use-toast';
import { cn } from "@/lib/utils";

interface AuthDialogProps {
  onClose: () => void;
}

export const AuthDialog = ({ onClose }: AuthDialogProps) => {
  const { toast } = useToast();

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event) => {
      if (event === 'SIGNED_IN') {
        toast({
          title: "Successfully signed in!",
          description: "Welcome to the app.",
        });
        onClose();
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [onClose, toast]);

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
        localization={{
          variables: {
            sign_in: {
              email_label: 'Email',
              password_label: 'Password',
              email_input_placeholder: 'Your email address',
              password_input_placeholder: 'Your password',
              button_label: 'Sign in',
              loading_button_label: 'Signing in ...',
            },
            sign_up: {
              email_label: 'Email',
              password_label: 'Password',
              email_input_placeholder: 'Your email address',
              password_input_placeholder: 'Your password',
              button_label: 'Sign up',
              loading_button_label: 'Signing up ...',
            }
          }
        }}
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