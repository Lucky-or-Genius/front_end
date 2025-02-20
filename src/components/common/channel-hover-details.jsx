import React from "react";

import { Popover } from "antd";
import HeroCard from "../newChannel/hero-card";

const ChannelHoverDetails = ({ channel }) => {
  return (
    <div>
      <Popover
        content={<HeroCard channel={channel} />}
        title=""
        trigger="hover"
        overlayInnerStyle={{
          backgroundColor: "#ffffff20",
          borderRadius: "10px",
          backdropFilter: "blur(12px)",
          maxWidth: "540px",
        }}
      >
        {channel?.ChannelName}
      </Popover>
    </div>
  );
};

export default ChannelHoverDetails;
