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
      return taskStatus.done / taskStatus.yet;
    }
  };
  const progress = calculateProgress();
  return (
    <div className="flex items-center px-8">
      <div>
        <Bar progress={progress} />
      </div>
      <div>
        {progress === null ? (
          <div className="w-4/5"> --%</div>
        ) : (
          <div className="w-4/5">{progress * 100}%</div>
        )}

        <div className="flex">
          <div>{taskStatus.done} Done</div>
          <div>{taskStatus.yet} Task</div>
        </div>
      </div>
    </div>
  );
};

export default TaskStatus;
function setTasks(taskArr: DocumentData[]) {
  throw new Error("Function not implemented.");
}
