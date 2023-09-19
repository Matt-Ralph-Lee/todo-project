"use client";
import AddTask from "@/components/AddTask";
import Sidebar from "@/components/Sidebar";
import TaskStatus from "@/components/TaskStatus";
import Tasks from "@/components/Tasks";
import React, { useEffect, useState } from "react";
import { useUserAuth } from "@/service/Firebase/AuthContext";
import {
  DocumentData,
  collection,
  doc,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import { db } from "@/lib/FirebaseConfig";
import { redirect } from "next/navigation";

const TaskPage = () => {
  const handleRedirect = () => {
    try {
      return useUserAuth();
    } catch (e) {
      console.log(e);
      redirect("/");
    }
  };
  const user = handleRedirect();
  const [folders, setFolders] = useState<string[]>(["All"]);
  const [selectedFolder, setSelectedFolder] = useState("All");

  const [taskStatus, setTaskStatus] = useState({ done: 0, yet: 0 });

  const [tasks, setTasks] = useState<DocumentData[]>([]);

  useEffect(() => {
    const q = doc(db, "users", user.uid);
    const unsubscribe = onSnapshot(q, (docSnap) => {
      if (docSnap.exists()) {
        const data = docSnap.data();
        setFolders(data.folders);
      }
    });
    return () => unsubscribe();
  }, [folders]);

  useEffect(() => {
    const q = query(
      collection(db, `users/${user.uid}/tasks`),
      where("folder", "==", selectedFolder)
    );
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      let taskArr: DocumentData[] = [];
      querySnapshot.forEach((doc) => {
        taskArr.push({ ...doc.data(), id: doc.id });
      });
      setTasks(taskArr);
      const getTaskStatus = () => {
        const resultArr = taskArr.filter((task) => task.isDone === true);
        setTaskStatus({
          ...taskStatus,
          done: resultArr.length,
          yet: taskArr.length,
        });
      };
      getTaskStatus();
      return () => unsubscribe();
    });
  }, [tasks]);

  return (
    <div>
      <Sidebar
        selectedFolder={selectedFolder}
        folders={folders}
        setSelectedFolder={setSelectedFolder}
      />
      <div className="px-8 flex justify-between pt-20">
        <div className="w-64 h-20"></div>
        <div className="w-1/2">
          <div className="text-2xl text-f2 tracking-widest mb-2">
            {selectedFolder}
          </div>
          <div
            style={{
              background:
                "radial-gradient(circle at center, #F2F2F2 0%, rgba(242, 242, 242, 0.3) 100%)",
            }}
            className="w-full h-px my-2"
          ></div>
          <AddTask selectedFolder={selectedFolder} />
          <div
            style={{
              background:
                "radial-gradient(circle at center, #F2F2F2 0%, rgba(242, 242, 242, 0.3) 100%)",
            }}
            className="w-full h-px my-2"
          ></div>
          <Tasks tasks={tasks} selectedFolder={selectedFolder} />
        </div>
        <div className="w-64 h-20">
          <TaskStatus taskStatus={taskStatus} />
        </div>
      </div>
    </div>

    // the code for coming on this page without logged in.
  );
};

export default TaskPage;
