import { signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { auth, googleProvider } from '../config/firebase';
import { LoginCredentials } from '../types/auth';

export const loginWithEmail = async (credentials: LoginCredentials) => {
  const userCredential = await signInWithEmailAndPassword(auth, credentials.email, credentials.password);
  return userCredential.user;
};

export const loginWithGoogle = async () => {
  const userCredential = await signInWithPopup(auth, googleProvider);
  return userCredential.user;
};
