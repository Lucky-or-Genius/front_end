import React, { useState, useCallback, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FaArrowLeftLong } from "react-icons/fa6";

import { getMarketGraph } from "../services/Markets.service";
import Graph from "../components/newMarkets/chart";

const MarketGraph = () => {
  const [currentGraph, setCurrentGraph] = useState({});
  const params = useParams().params;
  const navigate = useNavigate();
  const marketData = JSON.parse(localStorage.getItem("marketData"));

  const fetchMarketsData = useCallback(async () => {
    try {
      const res = await getMarketGraph(params);
      setCurrentGraph(res.data);
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    fetchMarketsData();
  }, [fetchMarketsData]);

  return (
    <div className="min-h-screen h-full bg-primary w-full overflow-y-auto md:overflow-hidden px-4">
      <div className="w-full flex justify-center relative">
        <div className="flex flex-col items-center md:flex-row gap-4 md:gap-6 w-full justify-center py-6 ">
          <img
            src={marketData?.image_url}
            alt=""
            width={100}
            height={100}
            className="w-14 h-14 rounded-full object-cover"
          />
          <div className="text-white font-raleway text-3xl">
            {marketData?.metadata?.event_title}
          </div>
        </div>
        <div
          className="absolute left-4 md:left-10 top-4 md:top-10 text-[#ffffff60] hover:text-white transition-all ease-in-out font-raleway flex gap-2 items-center cursor-pointer"
          onClick={() => navigate(-1)}
        >
          <FaArrowLeftLong /> Back
        </div>
      </div>
      <div className="py-12">
        <Graph data={currentGraph} />
      </div>
    </div>
  );
};

export default MarketGraph;
