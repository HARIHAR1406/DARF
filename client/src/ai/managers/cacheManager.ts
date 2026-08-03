export const CacheManager = {
  cache: new Map<string, string>(),
  set(key: string, value: string) { this.cache.set(key, value); },
  get(key: string) { return this.cache.get(key); },
  invalidate() { this.cache.clear(); }
};
