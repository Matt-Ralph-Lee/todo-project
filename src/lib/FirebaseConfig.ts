import { getAnalytics } from "firebase/analytics";
import {
  getApps,
  getApp,
  FirebaseOptions,
  FirebaseApp,
  initializeApp,
} from "@firebase/app";
import { getFirestore } from "firebase/firestore";

export const firebaseConfig: FirebaseOptions = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY?.trim(),
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN?.trim(),
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID?.trim(),
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET?.trim(),
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGE_SENDER_ID?.trim(),
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID?.trim(),
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID?.trim(),
  databaseURL: "https://realtime-chat-39dfb-default-rtdb.firebaseio.com/",
};

const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

export const getFirebaseApp = (): FirebaseApp => {
  return !getApps().length ? app : getApp();
};

export const db = getFirestore(app);
