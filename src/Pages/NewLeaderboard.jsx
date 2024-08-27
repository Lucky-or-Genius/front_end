import React, { useEffect, useState } from "react";
import { FiSearch } from "react-icons/fi";

import Filters from "../components/newLeaderboard/filters";
import Board from "../components/newLeaderboard/board";
import {
  leaderBoardData,
  sortByAccuracy,
  sortByScore,
  addRemoveFavourite,
  searchTerm,
  sortByBankroll,
} from "../services/Leaderboards.service";

const NewLeaderboard = () => {
  const [data, setData] = useState([]);
  const [scoreData, setScoreData] = useState([]);
  const accountId = localStorage.getItem("accountId");

  useEffect(() => {
    const fetchLeaderboardData = async () => {
      const res = await leaderBoardData(accountId);
      setData(res.data);
    };
    const fetchLeaderboardScoreData = async () => {
      const res = await sortByScore("score_desc");
      setScoreData(res.data);
    };
    fetchLeaderboardData();
    fetchLeaderboardScoreData();
  }, [accountId]);

  return (
    <div className="bg-primary h-full md:h-screen min-h-screen w-full overflow-y-auto md:overflow-hidden px-4">
      <div className="w-full flex py-6 justify-center">
        <span className="font-raleway text-3xl text-white font-[600]">
          Leaderboard
        </span>
      </div>
      <div className="flex flex-col gap-2 w-full items-center pb-6">
        <div className="border border-primary400 rounded-full flex px-4 py-2 items-center text-white text-poppins gap-4 w-full md:w-1/3">
          <FiSearch />
          <input
            type="search"
            className="bg-transparent outline-none font-poppins text-white text-xs w-full"
            placeholder="Search"
          />
        </div>
        <Filters />
      </div>
      <div className="grid grid-cols-2 w-full">
        {data.length >= 0 ? <Board data={data} /> : ""}
        {data.length >= 0 ? <Board data={scoreData} /> : ""}
      </div>
    </div>
  );
};

export default NewLeaderboard;
