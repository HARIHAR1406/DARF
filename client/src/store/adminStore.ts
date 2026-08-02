import { create } from 'zustand';

interface AdminState {
  // TODO: Define admin state
  logs: any[];
}

export const useAdminStore = create<AdminState>((set) => ({
  logs: [],
  // TODO: Add admin actions
}));
