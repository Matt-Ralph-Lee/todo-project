import React from "react";

const Task = () => {
  return (
    <div className="flex justify-between bg-gray-100 px-4 my-2">
      <div className="flex items-center">
        <button className="w-8 border bg-gray-300">O</button>
        <div>Task Name</div>
      </div>
      <div>
        <button className="w-16 m-2 border bg-gray-300">edit</button>
        <button className="w-16 m-2 border bg-gray-300">delete</button>
        <button className="w-8 border bg-gray-400">\/</button>
      </div>
    </div>
  );
};

export default Task;
