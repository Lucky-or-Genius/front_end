import React from "react";

import { IoMdHeartEmpty, IoMdHeart } from "react-icons/io";
import { useNavigate } from "react-router-dom";

import { ChannelHoverDetails } from "../common";
import Skeleton from "./skeleton";

const Board = ({ data, toggleFavourite, isLoading }) => {
  const navigate = useNavigate();
  const Headings = [
    "Rank",
    "Name",
    "Accuracy",
    "Predictions",
    "# of sources",
    "Favourite",
  ];

  const handleSummariesClick = (
    e,
    id,
    ChannelLogo,
    ChannelImageUrl,
    ChannelName,
    Predictions,
    PredictionAccuracyPercent,
    TotalPendingPredictions,
    Summaries
  ) => {
    e.preventDefault();
    const channelInfo = JSON.stringify({
      imageUrl:
        ChannelLogo !== null
          ? ChannelLogo
          : ChannelImageUrl !== null
          ? ChannelImageUrl
          : "https://i.ibb.co/Ry3bymp/youtube.png",
      channelName: ChannelName,
      predictions: Predictions,
      accuracy: PredictionAccuracyPercent,
      pending: TotalPendingPredictions,
      summaries: Summaries,
    });

    localStorage.setItem("channelInfo", channelInfo);
    navigate(`/dashboard/MyChannels/sources/${id}`);
  };

  return (
    <div className="flex w-full justify-start lg:justify-center gap-4 h-full md:px-6 overflow-y-hidden">
      <div className="min-w-[850px] overflow-x-auto w-full lg:w-5/6 rounded-2xl bg-[#ffffff10] overflow-y-hidden h-full p-4 relative">
        {/* Table Headings */}
        <div className="grid grid-cols-12 border-b pb-4 gap-4 border-gray-500 w-full px-3 sticky top-0 z-30">
          {Headings.map((item, i) => (
            <span
              className={`${
                item === "Name"
                  ? "col-span-3 text-start"
                  : item === "Rank"
                  ? "col-span-1 text-start"
                  : "col-span-2 text-center"
              } w-full text-gray-400 font-raleway font-semibold`}
              key={i}
            >
              {item}
            </span>
          ))}
        </div>
        {/* Table Content */}
        {data?.length > 0 ? (
          <div className="h-full overflow-y-auto pb-4">
            {data?.map((item, index) => (
              <div
                key={index}
                className={`${
                  index % 2 === 1 ? "bg-[#ffffff05]" : ""
                } grid grid-cols-12 w-full py-4 px-2 gap-4 rounded-xl hover:bg-[#ffffff10] transition-all ease-in-out font-poppins cursor-pointer hover:scale-[1.005]`}
                onClick={(e) =>
                  handleSummariesClick(
                    e,
                    item.channel_id,
                    item.ChannelLogo,
                    item.ChannelImageUrl,
                    item.ChannelName,
                    item.Predictions,
                    item.PredictionAccuracyPercent,
                    item.TotalPendingPredictions,
                    item.Summaries
                  )
                }
              >
                <div className="col-span-1">
                  <div className="px-2 text-white">{index + 1}</div>
                </div>

                <div className="col-span-3 flex items-center gap-2">
                  <img
                    src={item.ChannelLogo}
                    alt="profile"
                    width={40}
                    height={40}
                    className="rounded-full w-7 h-7 object-cover"
                  />
                  <div className="w-fit truncate">
                    <span className="text-white hover:underline hover:text-primary400">
                      <ChannelHoverDetails channel={item} />
                    </span>
                  </div>
                </div>
                <div className="text-white text-center col-span-2">
                  {item.PredictionAccuracyPercent !== null
                    ? Math.round(item.PredictionAccuracyPercent)
                    : "0"}{" "}
                  %
                </div>
                <div className="text-white text-center col-span-2">
                  {item.Predictions}
                </div>
                <div className="text-white text-center col-span-2">
                  {item.NumberOfSources}
                </div>

                <div className="flex w-full items-center justify-center col-span-2">
                  {item.is_favourite_channel ? (
                    <IoMdHeart
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        toggleFavourite(index, item?.channel_id);
                      }}
                      className="cursor-pointer text-error text-center text-xl active:scale-95 transition-all hover:scale-105"
                    />
                  ) : (
                    <IoMdHeartEmpty
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        toggleFavourite(index, item?.channel_id);
                      }}
                      className="cursor-pointer text-[#ffffff60] text-xl text-center active:scale-95 transition-all hover:scale-105"
                    />
                  )}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="text-white text-center py-4">Loading...</div>
            )}
          </div>
        ) : (
          <Skeleton />
        )}
      </div>
    </div>
  );
};

export default Board;
