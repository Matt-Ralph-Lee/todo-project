import React, { useEffect } from "react";
import Bar from "./Bar";
import { DocumentData } from "firebase/firestore";

const TaskStatus = ({
  taskStatus,
}: {
  taskStatus: { done: number; yet: number };
}) => {
  const calculateProgress = () => {
    if (taskStatus.yet === 0) {
      return null;
    } else if (taskStatus.done === 0) {
      return 0;
    } else {
      return parseFloat((taskStatus.done / taskStatus.yet).toFixed(1));
    }
  };
  const progress = calculateProgress();
  return (
    <div className="h-72 w-56 flex items-center mt-10 px-8 py-4 border border-f2 border-opacity-50 rounded-3xl text-f2 font-bold">
      <div className="h-full flex items-center">
        <Bar progress={progress} />
      </div>
      <div className="w-4/5 h-4/5 flex flex-col justify-between">
        {progress === null ? (
          <div className="flex items-end">
            <div className="w-1/2 text-4xl text-right">--</div>
            <div className="ml-4 text-base">%</div>
          </div>
        ) : (
          <div className="flex items-end mt-8">
            <div className="w-1/2 text-4xl text-right">{progress * 100}</div>
            <div className="ml-4 text-base">%</div>
          </div>
        )}
        <div>
          <div className="flex items-end mt-4">
            <div className="w-1/2 text-3xl text-right">{taskStatus.done}</div>
            <div className="ml-4 text-base">Done</div>
          </div>
          <div className="flex items-end mt-4">
            <div className="w-1/2 text-3xl text-right">{taskStatus.yet}</div>
            <div className="ml-4 text-base">Task</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskStatus;
function setTasks(taskArr: DocumentData[]) {
  throw new Error("Function not implemented.");
}
