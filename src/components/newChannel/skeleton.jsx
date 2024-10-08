import React from "react";

const skeleton = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 px-4 md:px-6 w-full lg:w-4/5">
      {Array.from({ length: 2 }).map((_, index) => (
        <div
          key={index}
          className="bg-[#ffffff20] rounded-2xl h-[520px] flex flex-col gap-2"
        >
          <div className="h-32 bg-[#ffffff20] w-full rounded-t-2xl animate-pulse"></div>
          <div className="flex gap-2 w-full items-center px-4 py-2">
            <div className="h-10 w-10 bg-[#ffffff20] rounded-full animate-pulse"></div>
            <div className="h-4 rounded-full w-2/3 bg-[#ffffff20] animate-pulse"></div>
          </div>
          <div className="grid grid-cols-2 gap-4 w-full px-2">
            <div className="h-16 rounded-lg w-full border-2 border-[#ffffff20] animate-pulse"></div>
            <div className="h-16 rounded-lg w-full border-2 border-[#ffffff20] animate-pulse"></div>
            <div className="h-16 rounded-lg w-full border-2 border-[#ffffff20] animate-pulse"></div>
            <div className="h-16 rounded-lg w-full border-2 border-[#ffffff20] animate-pulse"></div>
          </div>
          <div className="px-2 py-4">
            <div className="h-4 w-24 bg-[#ffffff20] rounded-full animate-pulse"></div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default skeleton;
