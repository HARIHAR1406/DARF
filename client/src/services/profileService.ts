import { ProfileRepository } from '../repositories/profileRepository';
import { Database } from '../types/database';

type ProfileInsert = Database['public']['Tables']['profiles']['Insert'];
type ProfileUpdate = Database['public']['Tables']['profiles']['Update'];

export const ProfileService = {
  async fetchProfile(userId: string) {
    return ProfileRepository.getByUserId(userId);
  },
  
  async createProfile(profile: ProfileInsert) {
    return ProfileRepository.create(profile);
  },
  
  async updateProfile(id: string, profile: ProfileUpdate) {
    return ProfileRepository.update(id, profile);
  }
};
