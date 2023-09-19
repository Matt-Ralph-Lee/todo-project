import React, { useEffect, useState } from "react";
import Task from "./Task";
import { DocumentData } from "firebase/firestore";

const Tasks = ({
  tasks,
  selectedFolder,
}: {
  tasks: DocumentData[];
  selectedFolder: string;
}) => {
  return (
    <div className="px-4 py-2">
      {tasks.map((task) => (
        <Task key={task.id} task={task} />
      ))}
    </div>
  );
};

export default Tasks;
