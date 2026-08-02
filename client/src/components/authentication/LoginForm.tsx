import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { loginSchema, LoginCredentials } from '../../types/auth';
import { useLogin } from '../../hooks/useLogin';
import { PasswordField } from './PasswordField';
import { GoogleButton } from './GoogleButton';

export const LoginForm: React.FC = () => {
  const { login, googleLogin, isLoading } = useLogin();
  const { register, handleSubmit, formState: { errors } } = useForm<LoginCredentials>({
    resolver: zodResolver(loginSchema)
  });

  const onSubmit = (data: LoginCredentials) => login(data);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="w-full space-y-6"
    >
      <div className="text-center">
        <h2 className="text-2xl font-heading font-bold mb-2">Welcome Back</h2>
        <p className="text-text-secondary font-mono text-sm">Initialize sequence to continue.</p>
      </div>

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

        <PasswordField 
          label="Password"
          registration={register('password')}
          error={errors.password?.message}
        />

        <div className="flex justify-end">
          <Link to="/forgot-password" className="text-xs text-primary hover:underline font-mono transition-colors duration-200">
            Forgot password?
          </Link>
        </div>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          transition={{ duration: 0.12 }}
          disabled={isLoading}
          type="submit"
          className="w-full bg-primary text-background font-bold py-2 rounded hover:bg-primary/90 transition-colors duration-200 shadow-[0_0_15px_rgba(16,163,127,0.3)] disabled:opacity-50"
        >
          {isLoading ? 'Authenticating...' : 'Login'}
        </motion.button>
      </form>

      <div className="relative flex items-center py-2">
        <div className="flex-grow border-t border-border"></div>
        <span className="flex-shrink-0 mx-4 text-text-secondary text-xs font-mono uppercase">Or</span>
        <div className="flex-grow border-t border-border"></div>
      </div>

      <GoogleButton onClick={googleLogin} isLoading={isLoading} />

      <p className="text-center text-xs text-text-secondary font-mono mt-4">
        Don't have an account? <Link to="/register" className="text-primary hover:underline transition-colors duration-200">Register</Link>
      </p>
    </motion.div>
  );
};
