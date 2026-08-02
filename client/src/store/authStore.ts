import { create } from 'zustand';

interface AuthState {
  // TODO: Define auth state
  isAuthenticated: boolean;
}

export const useAuthStore = create<AuthState>((set) => ({
  isAuthenticated: false,
  // TODO: Add actions (login, logout, etc.)
}));
