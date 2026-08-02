import { useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../config/firebase';
import { useAuthStore } from '../store/authStore';

export const useSession = () => {
  const { setUser, setLoading, isAuthenticated, isLoading, user } = useAuthStore();

  useEffect(() => {
    setLoading(true);
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, [setUser, setLoading]);

  return { isAuthenticated, isLoading, user };
};
