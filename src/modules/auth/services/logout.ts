import { signOut } from 'firebase/auth';
import firebaseAuth from '../firebase/firebase.config';

async function logout(): Promise<null | Error> {
  try {
    await signOut(firebaseAuth);
    return null;
  } catch (error) {
    return error as Error;
  }
}

export default logout;
