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
import { db, getFirebaseApp } from "@/lib/FirebaseConfig";
import { User } from "@/domain/classes/user";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { Username } from "@/domain/classes/username";
import { Folders } from "@/domain/classes/folders";

const AuthContext = createContext<AuthContextState>({
  currentUser: null,
  signIn: () => {},
  signOut: () => {},
});

const app = getFirebaseApp();
const auth = getAuth(app);

export const AuthContextProvider = ({ children }: { children: ReactNode }) => {
  // const firestoreService = new FirestoreService();

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
        const docSnap = await getDoc(doc(db, "users", currentUser.uid));
        if (docSnap.exists()) return;

        const verifiedUsername = new Username(_username);
        const verifiedFolders = new Folders(["All"]);
        const user = new User(
          currentUser.uid,
          verifiedUsername,
          verifiedFolders
        );
        try {
          const docRef = await setDoc(doc(db, "users", user.userId), {
            userId: user.userId,
            username: user.username.toString(),
            folders: user.folders.toList(),
          });
        } catch (e) {
          console.log(e);
        }
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

export const UseUserAuth = () => {
  const { currentUser } = useContext(AuthContext);
  if (currentUser !== null) {
    return currentUser;
  } else {
    throw new Error("user is null");
  }
};
