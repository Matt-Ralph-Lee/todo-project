"use client";
import AddTask from "@/demo/components/AddTask";
import Sidebar from "@/demo/components/Sidebar";
import TaskStatus from "@/demo/components/TaskStatus";
import Tasks from "@/demo/components/Tasks";
import React, { useEffect, useState } from "react";
import { _tasksData, userData } from "@/demo/data/data";
import { Folders } from "@/domain/classes/folders";
import { Task } from "@/domain/classes/task";
import { Tasks as TasksClass } from "@/domain/classes/tasks";

const calculateTaskStatus = (tasks: Task[]) => {
  let doneNum = 0;
  tasks.forEach((task) => {
    if (task.isDone) {
      doneNum += 1;
    }
  });
  return { done: doneNum, yet: tasks.length };
};

const getSelectedTasks = (tasksList: TasksClass[], selectedFolder: string) => {
  let result: Task[] = [];
  tasksList.forEach((tasks) => {
    if (selectedFolder !== "All") {
      if (tasks.folder === selectedFolder) {
        result = tasks.tasks;
      }
    } else {
      result.push(...tasks.tasks);
    }
  });
  return result;
};

const Demo = () => {
  // const [userData, setUserData] = useState(_userData);
  const [tasksData, setTasksData] = useState(_tasksData);

  const [folders, setFolders] = useState<Folders>(userData.folders);
  const [selectedFolder, setSelectedFolder] = useState("All");

  let taskData = getSelectedTasks(tasksData, selectedFolder);

  const [taskStatus, setTaskStatus] = useState(calculateTaskStatus(taskData));
  const [tasks, setTasks] = useState<Task[]>(taskData);

  useEffect(() => {
    taskData = getSelectedTasks(tasksData, selectedFolder);
    setTaskStatus(calculateTaskStatus(taskData));
    setTasks(taskData);
  }, [selectedFolder]);

  useEffect(() => {
    setTaskStatus(calculateTaskStatus(taskData));
  }, [tasks]);

  return (
    <div className="container">
      <Sidebar
        folders={folders}
        setFolders={setFolders}
        selectedFolder={selectedFolder}
        setSelectedFolder={setSelectedFolder}
        tasksData={tasksData}
        setTasksData={setTasksData}
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
          <AddTask
            selectedFolder={selectedFolder}
            tasks={tasks}
            setTasks={setTasks}
            tasksData={tasksData}
            setTasksData={setTasksData}
          />
          <div
            style={{
              background:
                "radial-gradient(circle at center, #F2F2F2 0%, rgba(242, 242, 242, 0.3) 100%)",
            }}
            className="w-full h-px my-2"
          ></div>
          <Tasks
            tasks={tasks}
            setTasks={setTasks}
            taskStatus={taskStatus}
            setTaskStatus={setTaskStatus}
            tasksData={tasksData}
            setTasksData={setTasksData}
            selectedFolder={selectedFolder}
          />
        </div>
        <div className="w-64 h-20">
          <TaskStatus taskStatus={taskStatus} />
        </div>
      </div>
    </div>
  );
};

export default Demo;
