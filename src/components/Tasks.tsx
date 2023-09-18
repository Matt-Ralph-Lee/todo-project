import React from "react";
import Task from "./Task";

const Tasks = () => {
  return (
    <div className="my-4 px-4 py-2 border">
      <div>Tasks</div>
      <Task />
      <Task />
      <Task />
    </div>
  );
};

export default Tasks;
