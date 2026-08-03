import { create } from 'zustand';

interface AdminState {
  // TODO: Define admin state
  logs: Record<string, unknown>[];
}

export const useAdminStore = create<AdminState>(() => ({
  logs: [],
  // TODO: Add admin actions
}));
