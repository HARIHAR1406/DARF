import { LogRepository } from '../repositories/logRepository';
import { QueryOptions } from '../repositories/baseRepository';

export const LogService = {
  async getLogs(options?: QueryOptions) {
    return LogRepository.getAll(options);
  }
};
