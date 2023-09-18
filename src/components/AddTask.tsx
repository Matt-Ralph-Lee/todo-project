import React from "react";

const AddTask = () => {
  return (
    <div>
      <div className="">Folder Name</div>
      <div className="px-12 py-6 bg-gray-100">
        <div className="flex justify-between px-10 py-2">
          <div>Title</div>
          <input className="w-3/4 border" />
        </div>
        <div className="flex justify-between px-10 py-2">
          <div>Detail</div>
          <input className="w-3/4 border" />
        </div>
        <div className="flex justify-center">
          <button className="w-40 border bg-gray-400">+</button>
        </div>
      </div>
    </div>
  );
};

export default AddTask;
