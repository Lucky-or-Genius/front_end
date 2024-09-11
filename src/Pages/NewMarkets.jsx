import React, { useState, useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { getMarket, getMarketGraph } from "../services/Markets.service";

const NewMarkets = () => {
  const [markets, setMarkets] = useState([]);
  const navigate = useNavigate();

  const fetchMarkets = useCallback(async () => {
    try {
      const res = await getMarket();
      setMarkets(res.data);
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    fetchMarkets();
  }, [fetchMarkets]);

  const handleBlockClick = (market) => {
    const params = market?.metadata?.event_ticker;
    const marketData = JSON.stringify(market);
    localStorage.setItem("marketData", marketData);

    navigate(`/dashboard/Markets/${params}`);
  };

  return (
    <div className="bg-primary h-full md:h-screen min-h-screen w-full overflow-y-auto md:overflow-hidden px-4">
      <div className="w-full flex py-6 justify-center">
        <span className="font-raleway text-3xl text-white font-[600]">
          Markets
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
        {markets?.map((market, index) => (
          <div
            className="bg-[#ffffff20] p-4 flex flex-col rounded-xl border border-[#ffffff20] hover:border-primary400 transition-all cursor-pointer"
            key={index}
            onClick={() => handleBlockClick(market)}
          >
            <div className=" flex items-center gap-4">
              <img
                src={market?.image_url}
                alt="logo"
                className="w-10 h-10 rounded-full"
              />
              <span className="font-raleway text-white font-[600] text-xl">
                {market?.metadata?.event_title}
              </span>
            </div>
            <div className="grid grid-cols-2 gap-4 pt-4">
              <div className="border border-[#ffffff40] rounded-lg flex flex-col items-center p-2">
                <span className="text-[#ffffff70] text-sm font-raleway">
                  Category
                </span>
                <span className="text-white font-poppins md:text-lg font-[600]">
                  {market?.metadata?.category}
                </span>
              </div>
              <div className="border border-[#ffffff40] rounded-lg flex flex-col items-center p-2">
                <span className="text-[#ffffff70] text-sm font-raleway">
                  Market Prediction
                </span>
                <span className="text-white font-poppins md:text-lg font-[600]">
                  {market?.metadata?.settled_price}
                </span>
              </div>
              <div className="border border-[#ffffff40] rounded-lg flex flex-col items-center p-2">
                <span className="text-[#ffffff70] text-sm font-raleway">
                  Start Date
                </span>
                <span className="text-success font-poppins md:text-lg font-[600]">
                  {market?.metadata?.start_date}
                </span>
              </div>
              <div className="border border-[#ffffff40] rounded-lg flex flex-col items-center p-2">
                <span className="text-[#ffffff70] text-sm font-raleway">
                  Close Date
                </span>
                <span className="text-error font-poppins md:text-lg font-[600]">
                  {market?.metadata?.settled_date}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NewMarkets;
