import React, { useEffect, useRef, useState } from "react";
import { More } from "../../../public/more";
import { Task as TaskClass } from "@/domain/classes/task";
import { Tasks } from "@/domain/classes/tasks";

const Task = ({
  task,
  taskStatus,
  setTaskStatus,
  setTasks,
  tasksData,
  setTasksData,
}: {
  task: TaskClass;
  taskStatus: { done: number; yet: number };
  setTaskStatus: React.Dispatch<
    React.SetStateAction<{
      done: number;
      yet: number;
    }>
  >;
  setTasks: React.Dispatch<React.SetStateAction<TaskClass[]>>;
  tasksData: Tasks[];
  setTasksData: React.Dispatch<React.SetStateAction<Tasks[]>>;
}) => {
  const ref = useRef<HTMLInputElement>(null);

  const [taskOpen, setTaskOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editedTask, setEditedTask] = useState({
    title: task.title,
    detail: task.title,
  });
  console.log(task);
  console.log(editedTask);
  console.log("==========================");

  useEffect(() => {
    if (isEditing) {
      ref.current?.focus();
    }
  }, [isEditing]);

  useEffect(() => {
    setEditedTask({ title: task.title, detail: task.detail });
  }, [task]);

  const handleTaskOpen = () => {
    setTaskOpen(!taskOpen);
  };

  const handleTaskStateChange = () => {
    if (task.isDone) {
      setTaskStatus({ ...taskStatus, done: taskStatus.done - 1 });
    } else {
      setTaskStatus({ ...taskStatus, done: taskStatus.done + 1 });
    }
    tasksData.forEach((d) => {
      d.tasks.forEach((t) => {
        if (t === task) {
          t.isDone = !t.isDone;
        }
      });
    });
    setTasksData(tasksData);
  };

  const handleIsEditing = () => {
    if (isEditing) {
      // save code
      task.title = editedTask.title;
      task.detail = editedTask.detail;
      tasksData.forEach((d) => {
        d.tasks.forEach((t) => {
          if (t === task) {
            t.title = editedTask.title;
            t.detail = editedTask.detail;
          }
        });
      });
      setTasksData(tasksData);
    } else {
      setTaskOpen(true);
    }
    setIsEditing(!isEditing);
  };

  const handleDelete = async () => {
    tasksData.forEach((d) => {
      d.delete(task);
      setTasks(d.tasks);
    });
    setTasksData(tasksData);
  };
  return (
    <div className="border border-f2 mb-2 border-opacity-50 rounded-2xl px-4 py-2 text-f2">
      <div className="flex justify-between  px-4 my-2">
        <div className="flex items-center">
          <button className="w-8">
            <div className="w-8 h-8 border rounded-full flex justify-center items-center">
              {task.isDone ? (
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
              className="mx-4 px-4 py-1 border rounded-full text-11"
              ref={ref}
              value={editedTask.title}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setEditedTask({ ...editedTask, title: e.target.value });
              }}
            />
          ) : (
            <div className="mx-4">{task.title}</div>
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
              value={editedTask.detail}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setEditedTask({ ...editedTask, detail: e.target.value });
              }}
              className="w-full px-4 py-1 border rounded-full text-11"
            />
          ) : (
            <div className="w-full px-3 py-2 text-sm">{task.detail}</div>
          )}
        </div>
      ) : null}
    </div>
  );
};

export default Task;
