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

const AuthContext = createContext<AuthContextState>({
  currentUser: null,
  signIn: () => {},
  signOut: () => {},
});

const app = getFirebaseApp();
const auth = getAuth(app);

export const AuthContextProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<FirebaseUser | null>(null);

  const googleSignIn = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider);
  };
  const googleSignOut = () => {
    signOut(auth);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
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
