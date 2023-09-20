import { db } from "@/lib/FirebaseConfig";
import { UseUserAuth } from "@/service/Firebase/AuthContext";
import { addDoc, collection } from "firebase/firestore";
import React, { FormEvent, useState } from "react";

const AddTask = ({ selectedFolder }: { selectedFolder: string }) => {
  const [newTask, setNewTask] = useState({
    title: "",
    detail: "",
    isDone: false,
  });

  const user = UseUserAuth();

  const handleAddTask = async (e: FormEvent) => {
    e.preventDefault();
    if (newTask.title !== "" && newTask.detail !== "") {
      // change other tasks
      await addDoc(collection(db, `users/${user.uid}/tasks`), {
        folder: selectedFolder,
        title: newTask.title,
        detail: newTask.detail,
        isDone: newTask.isDone,
      });
      setNewTask({
        title: "",
        detail: "",
        isDone: false,
      });
    }
  };
  return (
    <div>
      <form className="px-8 py-2 text-f2">
        <div className="flex justify-between items-center py-2">
          <div className="w-1/6">Title</div>
          <div className="w-4">:</div>
          <input
            value={newTask.title}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setNewTask({ ...newTask, title: e.target.value });
            }}
            className="w-3/4 border focus:border-opacity-1 border-11 rounded-full text-11 px-4 py-1"
          />
        </div>
        <div className="flex justify-between items-center py-2">
          <div className="w-1/6">Detail</div>
          <div className="w-4">:</div>
          <input
            value={newTask.detail}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setNewTask({ ...newTask, detail: e.target.value });
            }}
            className="w-3/4 border focus:border-opacity-1 border-11 rounded-full text-11 px-4 py-1"
          />
        </div>
        <div className="w-full flex justify-end mt-2 py-2">
          <button
            onClick={handleAddTask}
            className="w-40 rounded-full py-0.5 bg-22 hover:bg-f2 hover:bg-opacity-20"
          >
            +
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddTask;
