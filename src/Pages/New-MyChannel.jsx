import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

import { channelsData, addRemoveFavourite } from "../services/channels.service";
// import HeroCard from "../components/newChannel/hero-card";
import Board from "../components/newChannel/board";
// import Skeleton from "../components/newChannel/skeleton";
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
    <div className="bg-primary h-screen h-full overflow-y-hidden py-8 flex flex-col items-center w-full">
      <span className="font-raleway text-3xl text-white font-[600]">
        My Channels
      </span>
      <div className="w-full flex py-6 justify-center relative flex-col justify-center items-center gap-4 overflow-y-hidden md:h-[calc(100vh-36px)] h-full">
        <Board data={channels} toggleFavourite={toggleFavourite} />
      </div>
    </div>
  );
};

export default MyChannel;
