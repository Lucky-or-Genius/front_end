import React from "react";

const skeleton = () => {
  return (
    <div className="w-full h-full px-2 py-1 flex flex-col gap-1">
      <div className="w-full h-16 bg-[#202020] animate-pulse rounded-lg"></div>
      <div className="w-full h-16 bg-[#202020] animate-pulse rounded-lg"></div>
      <div className="w-full h-16 bg-[#202020] animate-pulse rounded-lg"></div>
      <div className="w-full h-16 bg-[#202020] animate-pulse rounded-lg"></div>
      <div className="w-full h-16 bg-[#202020] animate-pulse rounded-lg"></div>
      <div className="w-full h-16 bg-[#202020] animate-pulse rounded-lg"></div>
    </div>
  );
};

export default skeleton;
