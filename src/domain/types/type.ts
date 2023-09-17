import { User } from "firebase/auth";

export type AuthContextState = {
  currentUser: User | null;
  signIn: () => void;
  signOut: () => void;
};
