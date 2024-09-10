import React, { useCallback, useEffect, useState } from "react";
import Tabs from "../components/common/tabs";
import Channels from "../components/newFavourites/channels";
import Predictors from "../components/newFavourites/predictors";
import { leaderBoardData } from "../services/Leaderboards.service";
import { channelsData } from "../services/channels.service";

const Favourites = () => {
  const accountId = localStorage.getItem("accountId");
  const [predictors, setPredictors] = useState([]);
  const [channels, setChannels] = useState([]);

  const getPredictors = useCallback(async () => {
    try {
      const res = await leaderBoardData(accountId);

      const filteredData = [...res?.data]
        .filter((obj) => obj.is_favourite === true)
        .map((obj) => ({ ...obj }));
      setPredictors(filteredData);
    } catch (error) {
      console.log(error);
    }
  }, [accountId]);

  const getChannels = useCallback(async () => {
    try {
      const res = await channelsData(accountId);

      const filteredData = [...res.data].filter(
        (obj) => obj.is_favourite_channel === true
      );

      setChannels(filteredData);
    } catch (error) {
      console.log(error);
    }
  }, [accountId]);

  useEffect(() => {
    getPredictors();
    getChannels();
  }, []);

  const Items = [
    {
      title: "Predictors",
      content: (
        <Predictors predictors={predictors} setPredictors={setPredictors} />
      ),
    },
    {
      title: "Channels",
      content: <Channels channels={channels} setChannels={setChannels} />,
    },
  ];

  return (
    <div className="bg-primary min-h-screen h-full w-full overflow-y-auto pb-10">
      <div className="w-full flex py-6 justify-center">
        <span className="font-raleway text-3xl text-white font-[600]">
          Favourites
        </span>
      </div>
      <div className="w-full flex justify-center">
        <Tabs items={Items} className={"!w-full px-4 md:px-6"} />
      </div>
    </div>
  );
};

export default Favourites;
