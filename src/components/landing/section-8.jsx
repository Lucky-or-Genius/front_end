import React from "react";

const Section8 = () => {
  return (
    <div className="w-full bg-[#0B0B0F] px-4 py-28 md:px-20 flex md:flex-row flex-col justify-between items-center gap-8">
      <div className="flex flex-col w-full md:w-1/2 text-white text-center md:text-start">
        <h1 className="font-bold text-l md:text-[64px] pb-6">
          Skip the intro, get the info.
        </h1>
        <span className="text-[#9CA3AF] font-semibold text-base md:text-xl pb-6 max-w-[820px]">
        Track content creators around the clock across all major media platforms. Get all the important insights without wasting time on intros, ads and irrelevant subjects.
        A custom feed for topics you care about, with relevant predictions and insights from the best forecasters.
        </span>
      </div>
      <div className="relative flex justify-end w-full md:w-1/2">
        <img src="/feed.png" alt="" className="max-w-full h-auto" />
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-transparent to-black opacity-50"></div>
      </div>
    </div>
  );
};


export default Section8;
