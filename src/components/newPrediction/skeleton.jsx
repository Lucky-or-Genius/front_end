import React from "react";

const Skeleton = ({ count = 5 }) => {
  return (
    <div className="w-full grid grid-cols-1 md:grid-cols-2 md:px-6 gap-4 ">
      {Array.from({ length: count }).map((_, index) => (
        <div
          key={index}
          className="bg-[#ffffff20] rounded-xl p-4 h-36 flex flex-col gap-2"
        >
          <div className="flex gap-2 w-full items-center">
            <div className="h-10 w-10 bg-[#ffffff20] rounded-full animate-pulse"></div>
            <div className="h-4 rounded-full w-2/3 bg-[#ffffff20] animate-pulse"></div>
          </div>
          <div className="flex flex-col gap-2 w-full">
            <div className="h-4 rounded-full w-full bg-[#ffffff20] animate-pulse"></div>
            <div className="h-4 rounded-full w-4/5 bg-[#ffffff20] animate-pulse"></div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Skeleton;
