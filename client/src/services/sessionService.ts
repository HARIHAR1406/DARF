import { signOut } from 'firebase/auth';
import { auth } from '../config/firebase';

export const logoutUser = async () => {
  await signOut(auth);
};
