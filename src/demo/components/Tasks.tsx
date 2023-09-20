import React, { useEffect, useState } from "react";
import Task from "./Task";
import { Task as TaskClass } from "@/domain/classes/task";
import { Tasks as TasksClass } from "@/domain/classes/tasks";

const Tasks = ({
  tasks,
  setTasks,
  taskStatus,
  setTaskStatus,
  tasksData,
  setTasksData,
}: {
  tasks: TaskClass[];
  setTasks: React.Dispatch<React.SetStateAction<TaskClass[]>>;
  taskStatus: { done: number; yet: number };
  setTaskStatus: React.Dispatch<
    React.SetStateAction<{
      done: number;
      yet: number;
    }>
  >;
  tasksData: TasksClass[];
  setTasksData: React.Dispatch<React.SetStateAction<TasksClass[]>>;
}) => {
  return (
    <div className="px-4 py-2">
      {tasks.map((task, i) => (
        <Task
          key={i}
          task={task}
          taskStatus={taskStatus}
          setTaskStatus={setTaskStatus}
          setTasks={setTasks}
          tasksData={tasksData}
          setTasksData={setTasksData}
        />
      ))}
    </div>
  );
};

export default Tasks;
