import React, { useState, useEffect, useCallback } from "react";
import { toast } from "react-hot-toast";
import { FiSearch } from "react-icons/fi";

import Board from "../components/newLeaderboard/board";
import MobileLeaderBoard from "../components/newLeaderboard/mobileLeaderboard";
import Filters from "../components/newLeaderboard/filters";
import { Pagination } from "../components/common";
import {
  fetchLeaderboardData,
  addRemoveFavourite,
} from "../services/Leaderboards.service";
import { useAppContext } from "../utils/appContext";

const NewLeaderboard = () => {
  const { user, login } = useAppContext();
  const [data, setData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [currentSort, setCurrentSort] = useState(null);

  const getLeaderboardData = useCallback(async () => {
    try {
      setIsLoading(true);
      let params = {
        page: currentPage,
        orderBy: currentSort,
        searchTerm: searchQuery,
      };

      const response = await fetchLeaderboardData(params);

      setData(response.data.users);

      setTotalPages(response.data.pagination.totalPages);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }, [searchQuery, currentSort, currentPage]);

  useEffect(() => {
    const handler = setTimeout(
      () => {
        getLeaderboardData();
      },
      searchQuery ? 1000 : 0
    );

    return () => {
      clearTimeout(handler);
    };
  }, [searchQuery, getLeaderboardData]);

  const onPageChange = (page) => {
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const handleSearchChange = (event) => {
    setCurrentPage(1);
    setSearchQuery(event.target.value);
  };

  const sortLeaderboardByAccuracy = (order) => {
    setCurrentPage(1);
    setCurrentSort(order);
  };

  const sortLeaderboardByScore = (order) => {
    setCurrentPage(1);
    setCurrentSort(order);
  };

  const sortLeaderboardByBankroll = (order) => {
    setCurrentPage(1);
    setCurrentSort(order);
  };

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
    if (!accountId) return;

    const params = {
      accountId: String(accountId),
      predictorId: id,
    };

    const newData = [...data];
    newData[index].is_favourite = !newData[index].is_favourite;
    setData(newData);
    toast.success("updated!");
    addRemoveFavourite(params);
  };

  return (
    <div className="bg-primary h-full md:h-screen min-h-screen w-full overflow-y-auto px-4 pb-10">
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

      <div className="hidden md:block h-fit overflow-x-hidden">
        <Board
          data={data}
          toggleFavourite={toggleFavourite}
          isLoading={isLoading}
        />
      </div>
      <div className="md:hidden">
        <MobileLeaderBoard data={data} toggleFavourite={toggleFavourite} />
      </div>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={onPageChange}
      />
    </div>
  );
};

export default NewLeaderboard;
