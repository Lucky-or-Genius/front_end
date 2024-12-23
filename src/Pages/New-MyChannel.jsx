import React, { useCallback, useEffect, useState } from "react";
import toast from "react-hot-toast";

import { channelsData, addRemoveFavourite } from "../services/channels.service";
import HeroCard from "../components/newChannel/hero-card";
import Skeleton from "../components/newChannel/skeleton";
import { useAppContext } from "../utils/appContext";

const MyChannel = () => {
  const { user, login } = useAppContext();
  const [channels, setChannels] = useState();

  const toggleFavourite = async (index, id) => {
    try {
      if (!user) {
        await login();
      }
    } catch (error) {
      console.error("Error during login:", error);
      toast.error("Login process interrupted. Please try again.");
      return;
    }

    const accountId = user?.accountId;

    if (!accountId) {
      return;
    }
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

  useEffect(() => {
    const fetchChannels = async () => {
      try {
        const response = await channelsData(user?.accountId);
        setChannels(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchChannels();
  }, [user]);

  return (
    <div className="bg-primary min-h-screen h-full overflow-y-auto pb-8 flex flex-col items-center w-full">
      <div className="w-full flex py-6 justify-center relative flex-col justify-center items-center gap-4">
        <span className="font-raleway text-3xl text-white font-[600]">
          My Channels
        </span>
        {channels?.length > 0 ? (
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
        ) : (
          <Skeleton />
        )}
      </div>
    </div>
  );
};

export default MyChannel;
