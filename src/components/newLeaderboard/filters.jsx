import React, { useState } from "react";
import toast from "react-hot-toast";

import { IoOptionsOutline } from "react-icons/io5";
import { PiSortDescendingBold, PiSortAscendingBold } from "react-icons/pi";

const Filters = ({
  sortLeaderboardByAccuracy,
  sortLeaderboardByScore,
  sortLeaderboardByBankroll,
}) => {
  const [accuracyOrder, setAccuracyOrder] = useState("desc");
  const [scoreOrder, setScoreOrder] = useState("score_desc");
  const [bankrollOrder, setBankrollOrder] = useState("bankroll_desc");

  const handleAccuracySort = () => {
    const newOrder = accuracyOrder === "accuracy_desc" ? "accuracy_asc" : "accuracy_desc";
    setAccuracyOrder(newOrder);
    sortLeaderboardByAccuracy(newOrder);
    toast.success(newOrder === "accuracy_desc" ? "High to Low" : "Low to High");
  };
  const handleScoreSort = () => {
    const newOrder = scoreOrder === "score_desc" ? "score_asc" : "score_desc";
    setScoreOrder(newOrder);
    sortLeaderboardByScore(newOrder);
    toast.success(newOrder === "score_desc" ? "High to Low" : "Low to High");
  };
  const handleBankrollSort = () => {
    const newOrder =
      bankrollOrder === "bankroll_desc" ? "bankroll_asc" : "bankroll_desc";
    setBankrollOrder(newOrder);
    sortLeaderboardByBankroll(newOrder);
    toast.success(newOrder === "bankroll_desc" ? "High to Low" : "Low to High");
  };
  return (
    <div className="flex gap-4 py-4 flex-wrap justify-center">
      <span className="flex items-center gap-2 text-primary400 font-raleway font-[500]">
        Filters{" "}
        <IoOptionsOutline className="border border-primary400 rounded-full p-1 w-6 h-6" />
      </span>
      <div className="gap-2 flex font-raleway">
        <button
          onClick={() => handleAccuracySort()}
          className="hover:bg-[#ffffff20] rounded-full gap-2 text-white px-4 py-1 flex items-center focus:bg-[#ffffff20] border border-[#ffffff20]"
        >
          Accuracy{" "}
          {accuracyOrder === "desc" ? (
            <PiSortDescendingBold />
          ) : (
            <PiSortAscendingBold />
          )}
        </button>
        <button
          onClick={() => handleScoreSort()}
          className="hover:bg-[#ffffff20] rounded-full gap-2 text-white px-4 py-1 flex items-center focus:bg-[#ffffff20] border border-[#ffffff20]"
        >
          Points{" "}
          {scoreOrder === "score_desc" ? (
            <PiSortDescendingBold />
          ) : (
            <PiSortAscendingBold />
          )}
        </button>
        <button
          onClick={() => handleBankrollSort()}
          className="hover:bg-[#ffffff20] rounded-full gap-2 text-white px-4 py-1 flex items-center focus:bg-[#ffffff20] border border-[#ffffff20]"
        >
          Bankroll{" "}
          {bankrollOrder === "bankroll_desc" ? (
            <PiSortDescendingBold />
          ) : (
            <PiSortAscendingBold />
          )}
        </button>
      </div>
    </div>
  );
};

export default Filters;
