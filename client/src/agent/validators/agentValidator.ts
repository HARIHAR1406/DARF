import { AgentState } from '../models/AgentState';
export const validateAgent = (state: AgentState): boolean => !!state.id;
