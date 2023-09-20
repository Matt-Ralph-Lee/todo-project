import React from "react";

const Bar = ({ progress }: { progress: number | null }) => {
  return (
    <div className="w-8 h-4/5 bg-[#515151] rounded-lg rotate-180">
      {progress === null ? null : (
        <div
          style={{ height: `${progress * 100}%` }}
          className="w-full bg-[#592ABC] rounded-lg"
        ></div>
      )}
    </div>
  );
};

export default Bar;
