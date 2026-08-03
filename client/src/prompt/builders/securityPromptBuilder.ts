export const buildSecurityPrompt = (policies: string[]): string => {
  return `Security Policies:\n${policies.join('\n')}`;
};
