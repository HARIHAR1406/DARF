import { useState, useCallback } from 'react';
import toast from 'react-hot-toast';

export const useSupabase = <T,>(operation: (...args: unknown[]) => Promise<T>) => {
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const execute = useCallback(async (...args: unknown[]) => {
    setIsLoading(true);
    setError(null);
    try {
      const result = await operation(...args);
      setData(result);
      return result;
    } catch (err: unknown) {
      const errorMsg = err instanceof Error ? err.message : 'An unexpected database error occurred';
      setError(errorMsg);
      toast.error(errorMsg);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, [operation]);

  return { execute, data, isLoading, error };
};
