import { Folders } from "@/domain/classes/folder";
import { User } from "@/domain/classes/user";
import { Username } from "@/domain/classes/username";
import { getFirebaseApp } from "@/lib/FirebaseConfig";
import {
  addDoc,
  collection,
  doc,
  getDoc,
  getFirestore,
  setDoc,
} from "firebase/firestore";

const app = getFirebaseApp();
const db = getFirestore(app);

export class FirestoreService {
  // add user
  async addNewUser(userId: string, username: string, folders: string[]) {
    const docSnap = await getDoc(doc(db, "users", userId));
    console.log(docSnap.exists());
    if (docSnap.exists()) return;

    const verifiedUsername = new Username(username);
    const verifiedFolders = new Folders(folders);
    const user = new User(userId, verifiedUsername, verifiedFolders);
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
}
