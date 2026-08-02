import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../config/firebase';

export const resetPassword = async (email: string) => {
  await sendPasswordResetEmail(auth, email);
};
