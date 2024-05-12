import React from "react";

const Section8 = () => {
  return (
    <div className="w-full bg-[#0B0B0F] justify-between px-4 py-28 md:px-20 items-center flex gap-8 md:flex-row flex-col">
      <div className="text-white w-full md:w-1/2 text-xl md:text-2xl text-center md:text-start ">
        <h1 className="text-white font-bold text-xl pb-6 md:text-[64px] leading-5">
          Skip the intro, get the info.
        </h1>
        <span className="text-[#5D636E] max-w-[820px] font-semibold pb-6 text-base md:text-xl text-center">
        Lucky or Genius tracks influencers across multiple media platforms, 24/7 and presents all insights found within, in one user-friendly console.
        We also follow trending news and embed the most relevant predictions to the trending topic, so you can see current predictions about current discourse by your favourite influencers whos historic performance can be checked.
        </span>
      </div>
      <div className="w-full md:w-1/2 flex justify-end">
        <img src="/feed.png" alt="" className="" />
      </div>
    </div>
  );
};

export default Section8;
