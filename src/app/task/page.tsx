"use client";
import { UserAuth } from "@/service/Firebase/AuthContext";
import React from "react";

const TaskPage = () => {
  return (
    <div className="p-4">
      <h1>Task Page</h1>
      <p>You must be logged in</p>
    </div>
    // the code for coming on this page without logged in.
  );
};

export default TaskPage;
