import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth } from '../config/firebase';
import { RegisterCredentials } from '../types/auth';

export const registerWithEmail = async (credentials: RegisterCredentials) => {
  const userCredential = await createUserWithEmailAndPassword(auth, credentials.email, credentials.password);
  await updateProfile(userCredential.user, { displayName: credentials.username });
  return userCredential.user;
};
