import { UserRepository } from '../repositories/userRepository';
import { Database } from '../types/database';

type UserInsert = Database['public']['Tables']['users']['Insert'];

export const UserService = {
  async fetchUserProfile(id: string) {
    return UserRepository.getById(id);
  },
  
  async registerUserProfile(user: UserInsert) {
    return UserRepository.create(user);
  }
};
