import { UserRepository } from '../repositories/userRepository';
import { Database } from '../types/database';

type UserInsert = Database['public']['Tables']['users']['Insert'];
type UserUpdate = Database['public']['Tables']['users']['Update'];

export const UserService = {
  async fetchUserById(id: string) {
    return UserRepository.getById(id);
  },
  
  async fetchUserByFirebaseUid(uid: string) {
    return UserRepository.getByFirebaseUid(uid);
  },
  
  async registerUser(user: UserInsert) {
    return UserRepository.create(user);
  },

  async updateUser(id: string, user: UserUpdate) {
    return UserRepository.update(id, user);
  }
};
