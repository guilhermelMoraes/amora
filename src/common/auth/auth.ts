import {
  onAuthStateChanged,
  signOut,
  User as FirebaseUser,
} from 'firebase/auth';
import auth from './firebase/firebase.config';

async function userLoggedIn(): Promise<FirebaseUser | null> {
  return new Promise<FirebaseUser | null>((resolve) => {
    onAuthStateChanged(auth, (fbUser: FirebaseUser | null): void => {
      resolve(fbUser);
    });
  });
}

async function logout(): Promise<null | Error> {
  try {
    await signOut(auth);
    return null;
  } catch (error) {
    return error as Error;
  }
}

export default userLoggedIn;
export { logout };
