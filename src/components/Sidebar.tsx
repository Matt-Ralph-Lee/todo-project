import { db } from "@/lib/FirebaseConfig";
import { useUserAuth } from "@/service/Firebase/AuthContext";
import { doc, updateDoc } from "firebase/firestore";
import React, { useState } from "react";

const Sidebar = ({
  selectedFolder,
  folders,
  setSelectedFolder,
}: {
  selectedFolder: string;
  folders: string[];
  setSelectedFolder: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const user = useUserAuth();
  const [newFolder, setNewFolder] = useState("");
  const handleAddFolder = async () => {
    if (newFolder !== "") {
      await updateDoc(doc(db, "users", user.uid), {
        folders: [...folders, newFolder],
      });
      setNewFolder("");
    }
  };
  return (
    <div className="absolute h-screen pt-20 w-72">
      {folders.map((value) => {
        return value === selectedFolder ? (
          <button
            onClick={() => setSelectedFolder(value)}
            className="w-full text-blue-700"
          >
            {value}
          </button>
        ) : (
          <button onClick={() => setSelectedFolder(value)} className="w-full">
            {value}
          </button>
        );
      })}
      <div className="bg-gray-200 px-4">
        <div className="w-full">Add Folder</div>
        <input
          value={newFolder}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setNewFolder(e.target.value);
          }}
          className="border w-full"
        />
        <div className="w-full flex justify-center">
          <button onClick={handleAddFolder} className="bg-gray-400">
            Add +
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
