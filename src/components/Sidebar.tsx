import { db } from "@/lib/FirebaseConfig";
import { UseUserAuth } from "@/service/Firebase/AuthContext";
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
  const user = UseUserAuth();
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
    <div className="absolute h-screen pt-40 w-72">
      {folders.map((value, i) => {
        return value === selectedFolder ? (
          <div key={i} className="w-full flex flex-col items-center mb-4">
            <button
              className="w-3/5 py-2 text-f2 tracking-widest"
              onClick={() => setSelectedFolder(value)}
            >
              {value}
            </button>
            <div
              style={{
                background:
                  "radial-gradient(circle at center, #F2F2F2 0%, rgba(242, 242, 242, 0) 100%)",
              }}
              className="w-3/5 h-px"
            ></div>
          </div>
        ) : (
          <div
            key={i}
            className="w-full flex flex-col items-center mb-2 opacity-30"
          >
            <button
              className="w-3/5 py-2 text-f2 tracking-widest"
              onClick={() => setSelectedFolder(value)}
            >
              {value}
            </button>
            <div
              style={{
                background:
                  "radial-gradient(circle at center, #F2F2F2 0%, rgba(242, 242, 242, 0) 100%)",
              }}
              className="w-3/5 h-px"
            ></div>
          </div>
        );
      })}
      <div className="w-full flex justify-center mt-32">
        <div className="w-4/5 bg-[#1d1d1d] rounded-xl px-4 py-2 text-11">
          <input
            type="text"
            value={newFolder}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setNewFolder(e.target.value);
            }}
            className="w-full rounded-full my-2 py-2 focus:border-opacity-1 border-11 border text-center"
          />
          <div className="w-full flex justify-center">
            <button
              onClick={handleAddFolder}
              className="w-full border border-f2 border-opacity-30 rounded-full my-2 py-2 text-f2 hover:bg-f2 hover:bg-opacity-10"
            >
              Add Folder
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
