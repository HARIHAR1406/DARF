import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import { forgotPasswordSchema, ForgotPasswordCredentials } from '../../types/auth';
import { resetPassword } from '../../services/passwordResetService';

export const ForgotPasswordForm: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isSent, setIsSent] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm<ForgotPasswordCredentials>({
    resolver: zodResolver(forgotPasswordSchema)
  });

  const onSubmit = async (data: ForgotPasswordCredentials) => {
    setIsLoading(true);
    try {
      await resetPassword(data.email);
      setIsSent(true);
      toast.success('Password reset email sent!');
    } catch (error: unknown) {
      toast.error(error instanceof Error ? error.message : 'Failed to send reset email');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="w-full space-y-6"
    >
      <div className="text-center">
        <h2 className="text-2xl font-heading font-bold mb-2">Reset Password</h2>
        <p className="text-text-secondary font-mono text-sm">
          {isSent ? 'Check your email for the reset link.' : 'Enter your email to receive a reset link.'}
        </p>
      </div>

      {!isSent ? (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="flex flex-col space-y-1">
            <label className="text-sm text-text-secondary font-mono">Email</label>
            <input
              type="email"
              {...register('email')}
              className={`w-full bg-background border ${errors.email ? 'border-danger focus:border-danger' : 'border-border focus:border-primary'} rounded p-2 text-text-DEFAULT outline-none transition-colors duration-200`}
            />
            {errors.email && <span className="text-xs text-danger font-mono mt-1">{errors.email.message}</span>}
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            transition={{ duration: 0.12 }}
            disabled={isLoading}
            type="submit"
            className="w-full bg-primary text-background font-bold py-2 rounded hover:bg-primary/90 transition-colors duration-200 shadow-[0_0_15px_rgba(16,163,127,0.3)] disabled:opacity-50"
          >
            {isLoading ? 'Sending...' : 'Send Reset Link'}
          </motion.button>
        </form>
      ) : (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.2 }} className="flex justify-center py-4">
           <svg className="w-16 h-16 text-success" fill="none" viewBox="0 0 24 24" stroke="currentColor">
             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
           </svg>
        </motion.div>
      )}

      <p className="text-center text-xs text-text-secondary font-mono mt-4">
        Remembered your password? <Link to="/login" className="text-primary hover:underline transition-colors duration-200">Back to Login</Link>
      </p>
    </motion.div>
  );
};
