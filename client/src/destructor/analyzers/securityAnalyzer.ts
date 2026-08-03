import { RiskLevel } from '../models/RiskLevel';

export const analyzeSecurity = (tokens: string[]): RiskLevel => {
  const text = tokens.join(' ');
  if (text.includes('drop table') || text.includes('rm -rf')) return RiskLevel.CRITICAL;
  if (text.includes('password') || text.includes('secret')) return RiskLevel.HIGH;
  if (text.includes('admin')) return RiskLevel.MEDIUM;
  return RiskLevel.LOW;
};
