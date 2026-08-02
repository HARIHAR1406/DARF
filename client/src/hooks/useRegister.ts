import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { registerWithEmail } from '../services/registerService';
import { RegisterCredentials } from '../types/auth';

export const useRegister = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const register = async (credentials: RegisterCredentials) => {
    setIsLoading(true);
    try {
      await registerWithEmail(credentials);
      toast.success('Registration successful!');
      navigate('/chat');
    } catch (error: any) {
      toast.error(error.message || 'Failed to register');
    } finally {
      setIsLoading(false);
    }
  };

  return { register, isLoading };
};
