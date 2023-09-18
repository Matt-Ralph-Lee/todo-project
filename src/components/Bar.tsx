import React from "react";

const Bar = ({ progress }: { progress: number | null }) => {
  return (
    <div className="w-4 h-16 bg-gray-100 rotate-180">
      {progress === null ? null : (
        <div
          style={{ height: `${progress * 100}%` }}
          className={"bg-gray-500"}
        ></div>
      )}
    </div>
  );
};

export default Bar;
