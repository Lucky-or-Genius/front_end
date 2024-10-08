import React from "react";
import { IoMdHeartEmpty, IoMdHeart } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";

const HeroCard = ({ channel, toggleFavourite, index }) => {
  const navigate = useNavigate();

  const handleSummariesClick = (e) => {
    e.preventDefault();
    const channelInfo = JSON.stringify({
      imageUrl:
        channel?.ChannelLogo !== null
          ? channel?.ChannelLogo
          : channel?.ChannelImageUrl !== null
          ? channel?.ChannelImageUrl
          : "https://i.ibb.co/Ry3bymp/youtube.png",
      channelName: channel?.ChannelName,
      predictions: channel?.Predictions,
      accuracy: channel?.PredictionAccuracyPercent,
      pending: channel?.TotalPendingPredictions,
      summaries: channel?.Summaries,
    });

    localStorage.setItem("channelInfo", channelInfo);
    navigate(`/dashboard/MyChannels/sources/${channel.channel_id}`);
  };

  return (
    <div
      className="bg-[#ffffff10] rounded-xl flex flex-col justify-between cursor-pointer border border-transparent hover:border-primary400"
      onClick={(e) => handleSummariesClick(e)}
    >
      <div className="">
        <div className="">
          <img
            src={
              channel?.ChannelBanner !== null
                ? channel?.ChannelBanner
                : channel?.ChannelImageUrl !== null
                ? channel?.ChannelImageUrl
                : "https://i.ibb.co/Ry3bymp/youtube.png"
            }
            sizes="50"
            quality="100"
            alt="img"
            className="w-full h-32 object-cover rounded-t-xl"
          />
        </div>
        <div className="flex gap-4 items-center justify-between p-3 bg-[#ffffff20] rounded-md mt-2 mx-2">
          <div className="flex gap-4 items-center font-semibold ">
            <img
              src={
                channel?.ChannelLogo !== null
                  ? channel?.ChannelLogo
                  : channel?.ChannelImageUrl !== null
                  ? channel?.ChannelImageUrl
                  : "https://i.ibb.co/Ry3bymp/youtube.png"
              }
              sizes="50"
              quality="100"
              alt="img"
              className="w-10 h-10 object-cover rounded-full"
            />
            <span className=" font-raleway text-white uppercase text-lg">
              {channel?.ChannelName}
            </span>
          </div>
          <div className="z-[9999]" onClick={(e) => e.stopPropagation()}>
            {channel?.is_favourite_channel ? (
              <IoMdHeart
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  toggleFavourite(index, channel?.channel_id);
                }}
                className="cursor-pointer text-error  text-2xl z-[9]"
              />
            ) : (
              <IoMdHeartEmpty
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  toggleFavourite(index, channel?.channel_id);
                }}
                className="cursor-pointer text-[#ffffff60] text-2xl active:scale-95 transition-all hover:scale-105 z-[9]"
              />
            )}
          </div>
        </div>
        <div className="grid grid-cols-2 px-3 pb-4 pt-2 gap-4">
          <div className="border border-[#ffffff40] rounded-lg flex flex-col items-center p-2">
            <span className="text-[#ffffff70] text-sm font-raleway">
              Predictions
            </span>
            <span className="text-white font-poppins text-lg font-[600]">
              {channel?.Predictions}
            </span>
          </div>
          <div className="border border-[#ffffff40] rounded-lg flex flex-col items-center p-2">
            <span className="text-[#ffffff70] text-sm font-raleway flex-wrap text-center flex">
              Prediction Accuracy
            </span>
            <span className="text-white font-poppins text-lg font-[600]">
              {channel?.PredictionAccuracyPercent}%
            </span>
          </div>
          <div className="border border-[#ffffff40] rounded-lg flex flex-col items-center p-2">
            <span className="text-[#ffffff70] text-sm font-raleway flex-wrap text-center flex">
              Total Pending Predictions
            </span>
            <span className="text-white font-poppins text-lg font-[600]">
              {channel?.TotalPendingPredictions}
            </span>
          </div>
          <div
            className="border border-[#ffffff60] bg-[#ffffff40] cursor-pointer hover:scale-105 active:scale-95 transition-all ease-in-out rounded-lg flex flex-col items-center p-2"
            onClick={(e) => handleSummariesClick(e)}
          >
            <span className="text-white font-[600] text-sm font-raleway">
              Sources
            </span>
            <span className="text-white font-poppins text-lg font-[600]">
              {channel?.Summaries}
            </span>
          </div>
        </div>
        <div className="flex flex-col gap-2 px-3 pb-4">
          <span className="text-[#ffffff70] font-raleway font-[600]">
            People
          </span>
          <div className="flex gap-2 flex-wrap">
            {channel?.Users.map((item, index) => (
              <div
                className="flex gap-2 items-center rounded-lg bg-[#ffffff20] w-fit py-2 px-4 "
                key={index}
              >
                <img
                  src={item.image_url}
                  alt=""
                  className="w-6 h-6 rounded-full object-cover"
                />
                <Link
                  className="font-poppins text-white "
                  to={`/dashboard/LeaderBoards/${item.user_id}`}
                  onClick={(e) => {
                    e.stopPropagation();
                  }}
                >
                  {item.name}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="border-t border-[#ffffff40] flex gap-2 px-3 py-4  flex-col">
        <span className="text-[#ffffff70] font-raleway font-bold ">Topics</span>
        <div className="flex  gap-2 flex-wrap">
          {channel?.Topics.map((topic, index) => (
            <span
              className="bg-[#ffffff20] rounded-full px-2 font-poppins text-xs text-white py-[2px]"
              key={index}
            >
              {topic}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HeroCard;
