import React, { useCallback, useEffect, useState } from "react";
import { LuPlus } from "react-icons/lu";
import toast from "react-hot-toast";

import { channelsData, addRemoveFavourite } from "../services/channels.service";
import HeroCard from "../components/newChannel/hero-card";

const MyChannel = () => {
  const accountId = localStorage.getItem("accountId");
  const [channels, setChannels] = useState();

  const toggleFavourite = (index, id) => {
    const params = {
      accountId: String(accountId),
      channelId: id,
    };
    const newData = [...channels];
    newData[index].is_favourite_channel = !newData[index].is_favourite_channel;
    toast.success("updated!");
    addRemoveFavourite(params);
    setChannels(newData);
  };

  const fetchChannels = useCallback(async () => {
    try {
      const response = await channelsData(accountId);
      setChannels(response.data);
    } catch (error) {
      console.log(error);
    }
  }, [accountId]);

  useEffect(() => {
    fetchChannels();
  }, [fetchChannels]);

  return (
    <div className="bg-primary min-h-screen h-full overflow-y-auto pb-8 flex flex-col items-center w-full">
      <div className="w-full flex py-6 justify-center relative flex-col md:flex-row justify-center items-center gap-4">
        <span className="font-raleway text-3xl text-white font-[600]">
          My Channels
        </span>
        <div className="md:absolute right-10 top-6">
          <button className="text-[#ffffff60] font-raleway flex gap-2 items-center font-[600] px-4 py-2 rounded-lg hover:bg-[#ffffff20] active:bg-[#ffffff40] hover:text-white transition-all ease-in-out border border-[#ffffff20]">
            <LuPlus className="text-lg" /> Add Channel
          </button>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 px-4 md:px-6 w-full lg:w-4/5">
        {channels?.map((channel, index) => (
          <HeroCard
            channel={channel}
            key={index}
            toggleFavourite={toggleFavourite}
            index={index}
          />
        ))}
      </div>
    </div>
  );
};

export default MyChannel;
