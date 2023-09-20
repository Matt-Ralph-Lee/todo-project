import { db } from "@/lib/FirebaseConfig";
import { UseUserAuth } from "@/service/Firebase/AuthContext";
import { DocumentData, deleteDoc, doc, updateDoc } from "firebase/firestore";
import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { More } from "../../public/more";

const Task = ({ task }: { task: DocumentData }) => {
  const user = UseUserAuth();
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
    <div className="border border-f2 mb-2 border-opacity-50 rounded-2xl px-4 py-2 text-f2">
      <div className="flex justify-between  px-4 my-2">
        <div className="flex items-center">
          <button className="w-8">
            <div className="w-8 h-8 border rounded-full flex justify-center items-center">
              {currentTaskState ? (
                <div
                  onClick={handleTaskStateChange}
                  className="w-6 h-6 bg-[#592ABC] rounded-full"
                ></div>
              ) : (
                <div
                  onClick={handleTaskStateChange}
                  className="w-6 h-6 bg-white rounded-full"
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
            <div className="mx-4">{currentTaskTitle}</div>
          )}
        </div>
        <div className="flex items-center">
          {isEditing ? (
            <button
              onClick={handleIsEditing}
              className="w-16 m-2 px-4 py-1 border border-f2 border-opacity-30 rounded-full text-xs text-[#2CCA58] hover:bg-f2 hover:bg-opacity-10"
            >
              Save
            </button>
          ) : (
            <button
              onClick={handleIsEditing}
              className="m-2 px-4 py-1 border border-f2 border-opacity-30 rounded-full text-xs text-[#552CCA] hover:bg-f2 hover:bg-opacity-10"
            >
              Edit
            </button>
          )}

          <button
            onClick={handleDelete}
            className="m-2 px-4 py-1 border border-f2 border-opacity-30 rounded-full text-xs text-[#E03741] hover:bg-f2 hover:bg-opacity-10"
          >
            Delete
          </button>
          {taskOpen ? (
            <button
              onClick={handleTaskOpen}
              className="w-8 rotate-180 -translate-y-1 rounded-full"
            >
              <More />
            </button>
          ) : (
            <button onClick={handleTaskOpen} className="w-8 rounded-full">
              <More />
            </button>
          )}
        </div>
      </div>
      {taskOpen ? (
        <div className="flex m-16 my-2">
          {isEditing ? (
            <input
              value={currentTaskDetail}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setCurrentTaskDetail(e.target.value);
              }}
            />
          ) : (
            <div className="text-sm">{currentTaskDetail}</div>
          )}
        </div>
      ) : null}
    </div>
  );
};

export default Task;
