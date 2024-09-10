import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { IoMdHeartEmpty, IoMdHeart } from "react-icons/io";

import { addRemoveFavourite } from "../../services/channels.service";

const Channels = ({ channels, setChannels }) => {
  const accountId = localStorage.getItem("accountId");
  const navigate = useNavigate();

  const handleSummariesClick = () => {
    // const channelInfo = JSON.stringify({
    //   imageUrl:
    //     channel?.ChannelImageUrl !== null
    //       ? channel?.ChannelImageUrl
    //       : "https://i.ibb.co/Ry3bymp/youtube.png",
    //   channelName: channel?.ChannelName,
    //   predictions: channel?.Predictions,
    //   accuracy: channel?.PredictionAccuracyPercent,
    //   pending: channel?.TotalPendingPredictions,
    //   summaries: channel?.Summaries,
    // });
    // localStorage.setItem("channelInfo", channelInfo);
    // navigate(`/dashboard/MyChannels/sources/${channel.channel_id}`);
  };

  const toggleFavourite = (id) => {
    const params = {
      accountId: String(accountId),
      channelId: id,
    };
    const newData = channels.filter((obj) => obj.channel_id !== id);
    setChannels(newData);
    addRemoveFavourite(params);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 px-4 md:px-6 w-full">
      {channels?.map((channel, index) => (
        <div
          className="bg-[#ffffff10] rounded-xl flex flex-col justify-between"
          key={index}
        >
          <div className="">
            <div className="">
              <img
                src={
                  channel?.ChannelImageUrl !== null
                    ? channel?.ChannelImageUrl
                    : "https://i.ibb.co/Ry3bymp/youtube.png"
                }
                sizes="50"
                quality="100"
                alt="img"
                className="w-full h-32 object-cover rounded-t-xl"
              />
            </div>
            <div className="flex gap-4 items-center justify-between p-3">
              <div className="flex gap-4 items-center">
                <img
                  src={
                    channel?.ChannelImageUrl !== null
                      ? channel?.ChannelImageUrl
                      : "https://i.ibb.co/Ry3bymp/youtube.png"
                  }
                  sizes="50"
                  quality="100"
                  alt="img"
                  className="w-10 h-10 object-cover rounded-full"
                />
                <span className=" font-raleway text-white uppercase text-lg">
                  {channel.ChannelName}
                </span>
              </div>
              <div className="">
                <IoMdHeart
                  onClick={() => toggleFavourite(channel?.channel_id)}
                  className="cursor-pointer text-error  text-2xl"
                />
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
                onClick={handleSummariesClick}
              >
                <span className="text-white font-[600] text-sm font-raleway">
                  Summaries
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
                    >
                      {item.name}
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="border-t border-[#ffffff40] flex gap-2 px-3 py-4  flex-col">
            <span className="text-[#ffffff70] font-raleway font-bold ">
              Topics
            </span>
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
      ))}
    </div>
  );
};

export default Channels;
