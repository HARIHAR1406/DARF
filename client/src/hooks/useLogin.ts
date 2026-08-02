import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { loginWithEmail, loginWithGoogle } from '../services/loginService';
import { LoginCredentials } from '../types/auth';

export const useLogin = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const login = async (credentials: LoginCredentials) => {
    setIsLoading(true);
    try {
      await loginWithEmail(credentials);
      toast.success('Login successful!');
      navigate('/chat');
    } catch (error: any) {
      toast.error(error.message || 'Failed to login');
    } finally {
      setIsLoading(false);
    }
  };

  const googleLogin = async () => {
    setIsLoading(true);
    try {
      await loginWithGoogle();
      toast.success('Logged in with Google!');
      navigate('/chat');
    } catch (error: any) {
      toast.error(error.message || 'Google login failed');
    } finally {
      setIsLoading(false);
    }
  };

  return { login, googleLogin, isLoading };
};
