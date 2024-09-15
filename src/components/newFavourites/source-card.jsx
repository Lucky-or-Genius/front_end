import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { IoMdHeart } from "react-icons/io";

import AnimatedTooltip from "../common/animated-tooltip";

const SourceCard = ({ source, toggleFavourite }) => {
  const navigate = useNavigate();

  const convertMinsToHrsMins = (minutes) => {
    let h = Math.floor(minutes / 60);
    let m = minutes % 60;
    h = h < 10 ? "0" + h : h;
    m = m < 10 ? "0" + m : m;
    return `${h}:${m}:00`;
  };

  const people =
    source && source.full_names && source.user_image_urls && source.user_ids
      ? source.full_names.split(",").map((name, index) => ({
          id: source.user_ids.split(",")[index],
          name,
          image: source.user_image_urls.split(",").reverse()[index],
        }))
      : [];
  const handleNameClick = (
    e,
    channelId,
    imageUrl,
    channelName,
    predictions,
    accuracy,
    pending,
    summaries
  ) => {
    e.preventDefault();
    const channelInfo = JSON.stringify({
      imageUrl: imageUrl,
      channelName: channelName,
      predictions: predictions,
      accuracy: accuracy,
      pending: pending,
      summaries: summaries,
    });

    localStorage.setItem("channelInfo", channelInfo);

    navigate(`/dashboard/MyChannels/sources/${channelId}`);
  };

  return (
    <Link
      className="p-4 border-primary cursor-pointer flex md:flex-row flex-col backdrop-blur-md bg-[#ffffff20] h-full rounded-xl border hover:border-primary400 transition-all ease-in-out shadow-black"
      to={`/dashboard/Summaries/${source?.source_id}`}
    >
      <div className="w-full md:w-2/3 md:pr-2 border-b-2 md:border-b-0 md:border-r-2 border-[#ffffff20] pb-4 md:pb-0 ">
        <div className="flex gap-2 items-center">
          <img
            alt="thumbnail"
            src={
              source?.source_thumbnail ||
              source?.channel_image_url ||
              "/youtube.svg"
            }
            className="w-16 h-16 rounded-lg"
          />
          <div className="flex flex-col gap-2">
            <div className="flex w-full justify-between">
              <div
                className="flex gap-2 items-center"
                onClick={(e) =>
                  handleNameClick(
                    e,
                    source?.channel_id,
                    source?.channel_logo || "/youtube.svg",
                    source?.channel_name,
                    source?.Predictions,
                    source?.PredictionAccuracyPercent,
                    source?.TotalPendingPredictions,
                    source?.Summaries
                  )
                }
              >
                <img
                  alt="logo"
                  src={source?.channel_logo || "/youtube.svg"}
                  className="w-6 h-6 rounded-full object-cover"
                />
                <span className="text-[#ffffff60] font-raleway text-sm hover:underline transition-all">
                  {source?.channel_name}
                </span>
              </div>
              <IoMdHeart
                onClick={(e) => {
                  e.preventDefault();
                  toggleFavourite(source?.source_id);
                }}
                className="cursor-pointer text-error  text-xl active:scale-95 transition-all hover:scale-105"
              />
            </div>

            <span className="text-primary400 font-poppins line-clamp-2">
              {source?.source_title}
            </span>
          </div>
        </div>

        <div className="w-full flex pt-4 gap-2 flex-wrap">
          <div className="bg-[#ffffff20] rounded-full px-2 text-white font-poppins">
            <span className="text-[#ffffff80] font-raleway"> Views: </span>
            {Math.round(source?.views / 1000000)}M
          </div>
          <div className="bg-[#ffffff20] rounded-full px-2 text-white font-poppins">
            <span className="text-[#ffffff80] font-raleway"> Length: </span>
            {convertMinsToHrsMins(source.duration)}
          </div>
          <div className="flex w-fit rounded-full items-center px-2 bg-[#ffffff20] gap-2">
            <span className="font-raleway text-[#ffffff80] text-sm">
              Date :
            </span>
            <span className="font-poppins text-white ">
              {source?.publication_date.toString().slice(0, 10)}
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
            {source?.number_of_predictions}
          </span>
        </div>
        <div className="flex pr-4 md:pr-0">
          <AnimatedTooltip items={people} />
        </div>
      </div>
    </Link>
  );
};

export default SourceCard;
