import React from "react";

const FeedSkeleton = () => {
  return (
    <div className="flex relative h-full w-full pr-4">
      <div className="w-full md:w-2/3 p-4 flex flex-col gap-4">
        <div className="md:w-1/3 w-2/3 md:h-10 h-6 bg-[#202020] animate-pulse rounded-lg"></div>
        <div className="w-full h-32 bg-[#202020] animate-pulse rounded-lg"></div>
        <div className="w-full h-48 bg-[#202020] animate-pulse rounded-lg"></div>
        <div className="w-full h-48 bg-[#202020] animate-pulse rounded-lg"></div>
      </div>
      <div className="w-1/3 md:flex flex-col gap-4 hidden p-4">
        <div className="w-2/3 h-10 bg-[#202020] animate-pulse rounded-lg"></div>
        <div className="flex flex-col gap-1">
          <div className="w-full h-16 bg-[#202020] animate-pulse rounded-lg"></div>
          <div className="w-full h-16 bg-[#202020] animate-pulse rounded-lg"></div>
          <div className="w-full h-16 bg-[#202020] animate-pulse rounded-lg"></div>
          <div className="w-full h-16 bg-[#202020] animate-pulse rounded-lg"></div>
        </div>
      </div>
    </div>
  );
};

export default FeedSkeleton;
