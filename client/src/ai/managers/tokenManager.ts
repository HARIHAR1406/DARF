export const TokenManager = {
  estimateTokens(text: string): number {
    return Math.ceil(text.length / 4);
  }
};
