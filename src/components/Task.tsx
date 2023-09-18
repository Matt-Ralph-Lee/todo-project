import { db } from "@/lib/FirebaseConfig";
import { useUserAuth } from "@/service/Firebase/AuthContext";
import { DocumentData, deleteDoc, doc, updateDoc } from "firebase/firestore";
import React, { useEffect, useRef, useState } from "react";

const Task = ({ task }: { task: DocumentData }) => {
  const user = useUserAuth();
  const ref = useRef<HTMLInputElement>(null);

  const [taskOpen, setTaskOpen] = useState(false);
  const [currentTaskState, setCurrentTaskState] = useState(task.isDone);

  const [isEditing, setIsEditing] = useState(false);
  const [currentTaskTitle, setCurrentTaskTitle] = useState(task.title);
  const [currentTaskDetail, setCurrentTaskDetail] = useState(task.detail);

  useEffect(() => {
    if (isEditing) {
      ref.current?.focus();
    }
  }, [isEditing]);

  const handleTaskOpen = () => {
    setTaskOpen(!taskOpen);
  };

  const handleTaskStateChange = () => {
    updateDoc(doc(db, `users/${user.uid}/tasks`, task.id), {
      isDone: !currentTaskState,
    });
    setCurrentTaskState(!currentTaskState);
  };

  const handleIsEditing = () => {
    if (isEditing) {
      updateDoc(doc(db, `users/${user.uid}/tasks`, task.id), {
        title: currentTaskTitle,
        detail: currentTaskDetail,
      });
    } else {
      setTaskOpen(true);
    }
    setIsEditing(!isEditing);
  };

  const handleDelete = async () => {
    await deleteDoc(doc(db, `users/${user.uid}/tasks`, `${task.id}`));
  };
  return (
    <div className="bg-gray-100">
      <div className="flex justify-between  px-4 my-2">
        <div className="flex items-center">
          <button className="w-8">
            <div className="w-6 h-6 border rounded-full flex justify-center items-center">
              {currentTaskState ? (
                <div
                  onClick={handleTaskStateChange}
                  className="w-4 h-4 bg-blue-700 rounded-full"
                ></div>
              ) : (
                <div
                  onClick={handleTaskStateChange}
                  className="w-4 h-4 bg-white rounded-full"
                ></div>
              )}
            </div>
          </button>
          {isEditing ? (
            <input
              ref={ref}
              value={currentTaskTitle}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setCurrentTaskTitle(e.target.value);
              }}
              className="border"
            />
          ) : (
            <div>{currentTaskTitle}</div>
          )}
        </div>
        <div>
          <button
            onClick={handleIsEditing}
            className="w-16 m-2 border bg-gray-300"
          >
            {isEditing ? "save" : "edit"}
          </button>
          <button
            onClick={handleDelete}
            className="w-16 m-2 border bg-gray-300"
          >
            delete
          </button>
          {taskOpen ? (
            <button
              onClick={handleTaskOpen}
              className="w-8 bg-gray-400 rounded-full"
            >
              /\
            </button>
          ) : (
            <button
              onClick={handleTaskOpen}
              className="w-8 bg-gray-400 rounded-full"
            >
              \/
            </button>
          )}
        </div>
      </div>
      {taskOpen ? (
        <div className="flex ml-12">
          <div>Detail :</div>
          {isEditing ? (
            <input
              value={currentTaskDetail}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setCurrentTaskDetail(e.target.value);
              }}
            />
          ) : (
            <div className="ml-8">{currentTaskDetail}</div>
          )}
        </div>
      ) : null}
    </div>
  );
};

export default Task;
