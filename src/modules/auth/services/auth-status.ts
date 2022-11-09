import { onAuthStateChanged, User as FirebaseUser } from 'firebase/auth';
import firebaseAuth from '../infrastructure/firebase/firebase.config';

async function userLoggedIn(): Promise<FirebaseUser | null> {
  return new Promise<FirebaseUser | null>((resolve) => {
    onAuthStateChanged(firebaseAuth, (fbUser: FirebaseUser | null): void => {
      resolve(fbUser);
    });
  });
}

export default userLoggedIn;
