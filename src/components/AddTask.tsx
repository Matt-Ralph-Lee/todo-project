import { db } from "@/lib/FirebaseConfig";
import { useUserAuth } from "@/service/Firebase/AuthContext";
import { addDoc, collection } from "firebase/firestore";
import React, { FormEvent, useState } from "react";

const AddTask = ({ selectedFolder }: { selectedFolder: string }) => {
  const [newTask, setNewTask] = useState({
    title: "",
    detail: "",
    isDone: false,
  });

  const user = useUserAuth();

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
      <form className="px-12 py-6 bg-gray-100">
        <div className="flex justify-between px-10 py-2">
          <div>Title</div>
          <input
            value={newTask.title}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setNewTask({ ...newTask, title: e.target.value });
            }}
            className="w-3/4 border"
          />
        </div>
        <div className="flex justify-between px-10 py-2">
          <div>Detail</div>
          <input
            value={newTask.detail}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setNewTask({ ...newTask, detail: e.target.value });
            }}
            className="w-3/4 border"
          />
        </div>
        <div className="flex justify-center">
          <button onClick={handleAddTask} className="w-40 border bg-gray-400">
            +
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddTask;
