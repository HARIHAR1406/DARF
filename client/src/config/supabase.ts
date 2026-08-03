import { createClient } from '@supabase/supabase-js';
import { Database } from '../types/database';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

if (!supabaseUrl || !supabaseKey) {
  console.warn('[Supabase] Missing environment variables. Client might not function properly.');
}

// Reusable Supabase client
export const supabase = createClient<Database>(supabaseUrl, supabaseKey);

// Connection management, Error handling, Request retry handling, Centralized logging
export const executeQuery = async <T>(
  operationName: string, 
  queryFn: () => PromiseLike<{ data: T | null; error: unknown }>, 
  retries = 3
): Promise<T | null> => {
  let attempt = 0;
  while (attempt < retries) {
    try {
      console.log(`[Supabase] Executing: ${operationName}, Attempt: ${attempt + 1}`);
      const { data, error } = await queryFn();
      
      if (error) {
        throw error;
      }
      
      console.log(`[Supabase] Success: ${operationName}`);
      return data as T;
    } catch (error: unknown) {
      console.error(`[Supabase] Error in ${operationName}:`, error instanceof Error ? error.message : String(error));
      attempt++;
      if (attempt >= retries) {
        throw new Error(`Failed operation ${operationName} after ${retries} attempts. Details: ${error instanceof Error ? error.message : 'Unknown error'}`);
      }
      // Exponential backoff
      await new Promise(res => setTimeout(res, 500 * Math.pow(2, attempt)));
    }
  }
  return null;
};
