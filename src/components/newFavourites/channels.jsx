import React from "react";
import toast from "react-hot-toast";

import { addRemoveFavourite } from "../../services/channels.service";
import Board from "../newChannel/board";
import { useAppContext } from "../../utils/appContext";

const Channels = ({ channels, setChannels }) => {
  const { user } = useAppContext();

  const toggleFavourite = async (index, id) => {
    const accountId = user?.accountId;

    if (!accountId) {
      return;
    }
    const params = {
      accountId: String(accountId),
      channelId: id,
    };
    const newData = channels.filter((obj) => obj.channel_id !== id);
    setChannels(newData);
    addRemoveFavourite(params);
  };

  return (
    <div className="w-full flex py-6 justify-center relative flex-col justify-center items-center gap-4 overflow-y-hidden md:h-[calc(100vh-36px)] h-full">
      <Board data={channels} toggleFavourite={toggleFavourite} />
    </div>
  );
};

export default Channels;
