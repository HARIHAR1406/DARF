import { AnalyticsRepository } from '../repositories/analyticsRepository';
import { Database } from '../types/database';

type AnalyticsInsert = Database['public']['Tables']['analytics']['Insert'];

export const AnalyticsService = {
  async trackMetric(analytics: AnalyticsInsert) {
    return AnalyticsRepository.create(analytics);
  }
};
