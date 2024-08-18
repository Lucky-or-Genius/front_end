import React from "react";
import { Image } from "react-bootstrap";
import { BiSolidCategoryAlt } from "react-icons/bi";
import { FaCalendarDays } from "react-icons/fa6";

import "../styles/trending-prediction-card.css";

const trendingPredictionCard = ({ news, imgUrl, category, source, date }) => {
  return (
    <div className="flex md:flex-row flex-col backdrop-blur-md bg-[#ffffff10] rounded-xl gap-4 font-poppins md:pr-6 my-4 w-full">
      <div className="rounded-t-xl md:rounded-l-xl flex md:w-1/3 w-full">
        <Image
          src={imgUrl}
          className="h-1/2 md:h-full rounded-tr-xl rounded-tl-xl md:rounded-bl-xl md:rounded-tr-none object-cover w-full"
        />
      </div>
      <div className="flex flex-col">
        <div className="flex w-full justify-between py-4 md:pt-6 md:px-0 px-4">
          <p className="text-[#ffffff60] text-base">{source}</p>
          <div className="flex gap-6 text-[#ffffff60] text-sm">
            <span className="flex items-center gap-2">
              <BiSolidCategoryAlt className="text-lg" /> {category}
            </span>
            <span className="flex items-center gap-2">
              <FaCalendarDays className="text-base" /> {date}
            </span>
          </div>
        </div>
        <h5 className="pb-6 text-white font-raleway md:px-0 px-4">{news}</h5>
      </div>
    </div>
  );
};

export default trendingPredictionCard;
