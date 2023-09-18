"use client";
import AddTask from "@/components/AddTask";
import Sidebar from "@/components/Sidebar";
import TaskStatus from "@/components/TaskStatus";
import Tasks from "@/components/Tasks";
import React from "react";

const TaskPage = () => {
  return (
    <div>
      <Sidebar />
      <div className="px-20 flex justify-between pt-20">
        <div className="w-40 h-20"></div>
        <div className="w-1/2">
          <AddTask />
          <Tasks />
        </div>
        <div className="w-40 h-20">
          <TaskStatus />
        </div>
      </div>
    </div>

    // the code for coming on this page without logged in.
  );
};

export default TaskPage;
