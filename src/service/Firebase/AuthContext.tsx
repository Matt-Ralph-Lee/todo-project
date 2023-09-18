"use client";

import { AuthContextState } from "@/domain/types/type";
import {
  GoogleAuthProvider,
  User as FirebaseUser,
  getAuth,
  onAuthStateChanged,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { getFirebaseApp } from "@/lib/FirebaseConfig";
import { FirestoreService } from "./Firestore";
import { User } from "@/domain/classes/user";

const AuthContext = createContext<AuthContextState>({
  currentUser: null,
  signIn: () => {},
  signOut: () => {},
});

const app = getFirebaseApp();
const auth = getAuth(app);

export const AuthContextProvider = ({ children }: { children: ReactNode }) => {
  const firestoreService = new FirestoreService();

  const [user, setUser] = useState<FirebaseUser | null>(null);

  const googleSignIn = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider);
  };
  const googleSignOut = () => {
    signOut(auth);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      if (currentUser && currentUser.email) {
        let _username = "Username";
        if (currentUser.displayName) {
          _username = currentUser.displayName;
        }
        firestoreService.addNewUser(currentUser.uid, _username, ["All"]);
      }
    });
    return () => unsubscribe();
  }, [user]);

  return (
    <AuthContext.Provider
      value={{
        currentUser: user,
        signIn: googleSignIn,
        signOut: googleSignOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const UserAuth = () => {
  return useContext(AuthContext);
};

export const useUserAuth = () => {
  const { currentUser } = useContext(AuthContext);
  if (currentUser !== null) {
    return currentUser;
  } else {
    throw new Error("user is null");
  }
};
