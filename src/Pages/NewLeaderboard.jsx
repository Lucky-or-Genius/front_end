import React, { useEffect, useState, useCallback } from "react";
import { FiSearch } from "react-icons/fi";
import { toast } from "react-hot-toast";

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
  const accountId = localStorage.getItem("accountId");
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const toggleFavourite = (index, id) => {
    if (accountId === null) {
      toast.error("Login to add favourite");
      return;
    }
    const params = {
      accountId: String(accountId),
      predictorId: id,
    };
    const newData = [...data];
    newData[index].is_favourite = !newData[index].is_favourite;
    toast.success("updated!");
    addRemoveFavourite(params);
    setData(newData);
  };

  const sortLeaderboardByAccuracy = async (order) => {
    try {
      const res = await sortByAccuracy(order);
      setData(res.data);
    } catch (error) {
      console.log(error);
    }
  };
  const sortLeaderboardByScore = async (order) => {
    try {
      const res = await sortByScore(order);
      setData(res.data);
    } catch (error) {
      console.log(error);
    }
  };
  const sortLeaderboardByBankroll = async (order) => {
    try {
      const res = await sortByBankroll(order);
      setData(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchLeaderboardData = useCallback(async () => {
    try {
      if (searchQuery === "") {
        const res = await leaderBoardData(accountId);
        setData(res.data);
      } else {
        const res = await searchTerm(searchQuery);
        setData(res.data);
      }
    } catch (error) {
      console.log(error);
    }
  }, [accountId, searchQuery]);

  useEffect(() => {
    if (searchQuery === "") {
      fetchLeaderboardData();
    } else {
      const handler = setTimeout(() => {
        fetchLeaderboardData();
      }, 1000);

      return () => {
        clearTimeout(handler);
      };
    }
  }, [fetchLeaderboardData, searchQuery]);

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
            value={searchQuery}
            onChange={handleSearchChange}
          />
        </div>
        <Filters
          sortLeaderboardByAccuracy={sortLeaderboardByAccuracy}
          sortLeaderboardByScore={sortLeaderboardByScore}
          sortLeaderboardByBankroll={sortLeaderboardByBankroll}
        />
      </div>
      {data?.length >= 0 ? (
        <Board data={data} toggleFavourite={toggleFavourite} />
      ) : (
        ""
      )}
    </div>
  );
};

export default NewLeaderboard;
