import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const {
  REACT_APP_FIREBASE_API_KEY,
  REACT_APP_FIREBASE_AUTH_DOMAIN,
  REACT_APP_FIREBASE_PROJECT_ID,
  REACT_APP_FIREBASE_STORAGE_BUCKET,
  REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  REACT_APP_FIREBASE_APP_ID,
} = process.env;

const firebaseConfig = {
  apiKey: String(REACT_APP_FIREBASE_API_KEY),
  authDomain: String(REACT_APP_FIREBASE_AUTH_DOMAIN),
  projectId: String(REACT_APP_FIREBASE_PROJECT_ID),
  storageBucket: String(REACT_APP_FIREBASE_STORAGE_BUCKET),
  messagingSenderId: String(REACT_APP_FIREBASE_MESSAGING_SENDER_ID),
  appId: String(REACT_APP_FIREBASE_APP_ID),
};

const firebaseApp = initializeApp(firebaseConfig);
firebaseApp.automaticDataCollectionEnabled = false;

const auth = getAuth(firebaseApp);

export default auth;
