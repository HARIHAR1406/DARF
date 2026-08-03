import { LogRepository } from '../repositories/logRepository';
import { LogSchema } from '../models/validations';

export const AuditLogger = {
  async log(event_type: string, description: string, severity: 'info' | 'warning' | 'error' | 'critical', user_id?: string) {
    try {
      const logData = { event_type, description, severity, user_id: user_id || null };
      const validated = LogSchema.parse(logData);
      await LogRepository.create(validated);
    } catch (e) {
      console.error('[AuditLogger] Failed to write audit log', e);
    }
  },
  
  info(event_type: string, description: string, user_id?: string) {
    return this.log(event_type, description, 'info', user_id);
  },
  
  warn(event_type: string, description: string, user_id?: string) {
    return this.log(event_type, description, 'warning', user_id);
  },
  
  error(event_type: string, description: string, user_id?: string) {
    return this.log(event_type, description, 'error', user_id);
  },
  
  critical(event_type: string, description: string, user_id?: string) {
    return this.log(event_type, description, 'critical', user_id);
  }
};
