import React from "react";
import { Link } from "react-router-dom";

import AnimatedTooltip from "../common/animated-tooltip";

const summaryCard = ({ summary }) => {
  const convertMinsToHrsMins = (minutes) => {
    let h = Math.floor(minutes / 60);
    let m = minutes % 60;
    h = h < 10 ? "0" + h : h;
    m = m < 10 ? "0" + m : m;
    return `${h}:${m}:00`; // Assumes no seconds part, so it's always '00'
  };

  const people =
    summary && summary.full_names && summary.user_image_urls && summary.user_ids
      ? summary.full_names.split(",").map((name, index) => ({
          id: summary.user_ids.split(",")[index],
          name,
          image: summary.user_image_urls.split(",").reverse()[index],
        }))
      : [];

  return (
    <Link
      className="p-4 border-primary cursor-pointer flex md:flex-row flex-col backdrop-blur-md bg-[#ffffff20] h-full rounded-xl border hover:border-primary400 transition-all ease-in-out shadow-black"
      to={`/dashboard/Summaries/${summary?.source_id}`}
    >
      <div className="w-full md:w-2/3 md:pr-2 border-b-2 md:border-b-0 md:border-r-2 border-[#ffffff20] pb-4 md:pb-0 ">
        <div className="flex gap-2 items-center">
          <img
            alt=""
            src={summary?.channel_image_url || "/youtube.svg"}
            className="w-16 h-16 rounded-lg"
          />
          <div className="flex flex-col gap-2">
            <span className="text-[#ffffff60] font-raleway text-sm">
              {summary?.channel_name}
            </span>
            <span className="text-primary400 font-poppins line-clamp-2">
              {summary?.source_title}
            </span>
          </div>
        </div>

        <div className="w-full flex pt-4 gap-2 flex-wrap">
          <div className="bg-[#ffffff20] rounded-full px-2 text-white font-poppins">
            <span className="text-[#ffffff80] font-raleway"> Views: </span>
            {Math.round(summary?.views / 1000000)}M
          </div>
          <div className="bg-[#ffffff20] rounded-full px-2 text-white font-poppins">
            <span className="text-[#ffffff80] font-raleway"> Length: </span>
            {convertMinsToHrsMins(summary.duration)}
          </div>
          <div className="flex w-fit rounded-full items-center px-2 bg-[#ffffff20] gap-2">
            <span className="font-raleway text-[#ffffff80] text-sm">
              Date :
            </span>
            <span className="font-poppins text-white ">
              {summary?.publication_date.toString().slice(0, 10)}
            </span>
          </div>
        </div>
      </div>
      <div className="w-full md:w-1/3 md:pl-2  flex gap-2 md:flex-col justify-between md:justify-around pt-4 md:pt-0">
        <div className="flex flex-col bg-[#ffffff20] w-fit md:w-full rounded-lg items-center px-2 md:p-[2px]">
          <span className="font-raleway text-[#ffffff80] text-sm">
            Predictions
          </span>
          <span className="font-poppins text-white ">
            {summary?.number_of_predictions}
          </span>
        </div>
        <div className="flex pr-4 md:pr-0">
          <AnimatedTooltip items={people} />
        </div>
      </div>
    </Link>
  );
};

export default summaryCard;
