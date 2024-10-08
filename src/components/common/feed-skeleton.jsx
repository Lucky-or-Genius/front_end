import React from "react";

const FeedSkeleton = () => {
  return (
    <div className="flex relative h-full w-full pr-4">
      <div className="w-full md:w-2/3 p-4 flex flex-col gap-4">
        <div className="md:w-1/3 w-2/3 md:h-10 h-6 bg-[#ffffff20] animate-pulse rounded-lg mb-4"></div>
        <div className="w-full h-36 bg-[#ffffff20] animate-pulse rounded-lg flex gap-4">
          <div className="w-1/3 bg-[#ffffff20] animate-pulse h-full rounded-l-lg"></div>
          <div className="flex flex-col py-4 gap-4 w-2/3 pr-4">
            <div className="flex gap-2 items-center">
              <div className="w-6  bg-[#ffffff20] animate-pulse h-6"></div>
              <div className="w-48 bg-[#ffffff20] animate-pulse h-4 rounded-full"></div>
            </div>
            <div className="w-full bg-[#ffffff20] animate-pulse h-6 rounded-full"></div>
            <div className="w-2/3 bg-[#ffffff20] animate-pulse h-6 rounded-full"></div>
          </div>
        </div>
        <div className="w-full h-48 bg-[#ffffff20] animate-pulse rounded-lg p-4 flex flex-col gap-4">
          <div className="flex gap-2 items-center">
            <div className="w-8  bg-[#ffffff20] animate-pulse h-8 rounded-full"></div>
            <div className="w-48 bg-[#ffffff20] animate-pulse h-4 rounded-full"></div>
          </div>
          <div className="w-full bg-[#ffffff20] animate-pulse h-6 rounded-full"></div>
          <div className="w-2/3 bg-[#ffffff20] animate-pulse h-6 rounded-full"></div>
        </div>
        <div className="w-full h-48 bg-[#ffffff20] animate-pulse rounded-lg p-4 flex flex-col gap-4">
          <div className="flex gap-2 items-center">
            <div className="w-8  bg-[#ffffff20] animate-pulse h-8 rounded-full"></div>
            <div className="w-48 bg-[#ffffff20] animate-pulse h-4 rounded-full"></div>
          </div>
          <div className="w-full bg-[#ffffff20] animate-pulse h-6 rounded-full"></div>
          <div className="w-2/3 bg-[#ffffff20] animate-pulse h-6 rounded-full"></div>
        </div>
      </div>
      <div className="w-1/3 md:flex flex-col gap-4 hidden p-4">
        <div className="w-2/3 h-10 bg-[#ffffff20] animate-pulse rounded-lg "></div>
        <div className="flex flex-col gap-1 mt-4">
          <div className="w-full h-16 bg-[#ffffff20] animate-pulse rounded-lg p-4">
            <div className="flex gap-2 items-center">
              <div className="w-8  bg-[#ffffff20] animate-pulse h-8 rounded-full"></div>
              <div className="w-48 bg-[#ffffff20] animate-pulse h-4 rounded-full"></div>
            </div>
          </div>
          <div className="w-full h-16 bg-[#ffffff20] animate-pulse rounded-lg p-4">
            <div className="flex gap-2 items-center">
              <div className="w-8  bg-[#ffffff20] animate-pulse h-8 rounded-full"></div>
              <div className="w-48 bg-[#ffffff20] animate-pulse h-4 rounded-full"></div>
            </div>
          </div>
          <div className="w-full h-16 bg-[#ffffff20] animate-pulse rounded-lg p-4">
            <div className="flex gap-2 items-center">
              <div className="w-8  bg-[#ffffff20] animate-pulse h-8 rounded-full"></div>
              <div className="w-48 bg-[#ffffff20] animate-pulse h-4 rounded-full"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeedSkeleton;
