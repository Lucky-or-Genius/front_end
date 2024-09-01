import React from "react";
import { Image } from "react-bootstrap";
import { BiSolidCategoryAlt } from "react-icons/bi";
import { FaCalendarDays } from "react-icons/fa6";
import { Link } from "react-router-dom";

import "../styles/trending-prediction-card.css";

const trendingPredictionCard = ({
  news,
  imgUrl,
  category,
  source,
  date,
  sourceIconUrl,
  titleUrl,
  description,
}) => {
  return (
    <div className="flex md:flex-row flex-col backdrop-blur-md bg-[#ffffff10] rounded-xl gap-4 font-poppins md:pr-4 my-4 w-full">
      <div className="rounded-t-xl md:rounded-l-xl flex md:w-1/3 w-full">
        <Image
          src={imgUrl}
          className="h-1/2 md:h-full rounded-tr-xl rounded-tl-xl md:rounded-bl-xl md:rounded-tr-none object-cover w-full"
        />
      </div>
      <div className="flex flex-col md:w-2/3">
        <div className="flex w-full justify-between py-4 md:pt-4 md:px-0 px-4 flex-wrap gap-2">
          <Link
            className="flex gap-2 items-center"
            to={`https://${source}`}
            target="_blank"
          >
            <Image
              src={sourceIconUrl}
              quality={100}
              sizes="100"
              className="w-5 h-5"
            />
            <p className="text-[#ffffff60] text-base">{source}</p>
          </Link>

          <div className="flex gap-6 text-[#ffffff60] text-sm">
            <span className="flex items-center gap-2">
              <BiSolidCategoryAlt className="text-lg" /> {category}
            </span>
            <span className="flex items-center gap-2">
              <FaCalendarDays className="text-base" /> {date}
            </span>
          </div>
        </div>
        <Link
          to={titleUrl}
          className="text-white font-raleway md:px-0 pb-4 px-4"
          target="_blank"
        >
          {news}
        </Link>
        <p className="text-[#ffffff60] text-base pb-4 px-4 md:px-0 line-clamp-2">
          {description}
        </p>
      </div>
    </div>
  );
};

export default trendingPredictionCard;
