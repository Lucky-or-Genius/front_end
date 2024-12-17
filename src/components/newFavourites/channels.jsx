import React from "react";

import { addRemoveFavourite } from "../../services/channels.service";
import ChannelCard from "./channel-card";
import toast from "react-hot-toast";

const Channels = ({ channels, setChannels }) => {
  const accountId = localStorage.getItem("accountId");

  const toggleFavourite = (id) => {
    if (accountId === null) {
      toast.error("Login to add favourite");
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
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 px-4 md:px-6 w-full">
      {channels?.map((channel, index) => (
        <ChannelCard
          key={index}
          channel={channel}
          toggleFavourite={toggleFavourite}
          index={index}
        />
      ))}
    </div>
  );
};

export default Channels;
