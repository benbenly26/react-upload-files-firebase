import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: 'AIzaSyBVSzn7c_bDi_pvBUcZl-4uV8LlrBlb4kY',
  authDomain: 'principal-sonar-426807-r7.firebaseapp.com',
  projectId: 'principal-sonar-426807-r7',
  storageBucket: 'principal-sonar-426807-r7.appspot.com',
  messagingSenderId: '542761245175',
  appId: '1:542761245175:web:67c50319f0e9cc258df6f2',
};

const app = initializeApp(firebaseConfig);

export const storage = getStorage(app);
