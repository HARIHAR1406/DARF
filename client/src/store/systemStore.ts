import { create } from 'zustand';

interface SystemState {
  // TODO: Define system state (e.g., destructor active mode)
  isDestructorActive: boolean;
}

export const useSystemStore = create<SystemState>((set) => ({
  isDestructorActive: false,
  // TODO: Add system actions
}));
