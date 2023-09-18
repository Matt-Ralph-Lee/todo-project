import React from "react";
import Bar from "./Bar";

const TaskStatus = () => {
  return (
    <div className="h-20 flex items-center px-8">
      <div className="h-full">
        <Bar />
      </div>
      <div>
        <div className="w-4/5">80%</div>
        <div className="flex">
          <div>10 Task</div>
          <div>40 Done</div>
        </div>
      </div>
    </div>
  );
};

export default TaskStatus;
