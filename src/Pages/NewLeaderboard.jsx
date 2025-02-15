import React, { useState, useEffect, useCallback, useRef } from "react";
import { toast } from "react-hot-toast";
import { FiSearch } from "react-icons/fi";

import Board from "../components/newLeaderboard/board";
import MobileLeaderBoard from "../components/newLeaderboard/mobileLeaderboard";
import Filters from "../components/newLeaderboard/filters";
import {
  fetchLeaderboardData,
  addRemoveFavourite,
} from "../services/Leaderboards.service";
import { useAppContext } from "../utils/appContext";
import useIsMobile from "../hooks/useIsMobile";

const NewLeaderboard = () => {
  const { user, login } = useAppContext();
  const [data, setData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [currentSort, setCurrentSort] = useState(null);
  const observer = useRef();
  const isMobile = useIsMobile();

  const lastLeaderElementRef = useCallback(
    (node) => {
      if (isLoading) return;
      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPage((prevPage) => prevPage + 1);
        }
      });

      if (node) observer.current.observe(node);
    },
    [isLoading, hasMore]
  );

  const getLeaderboardData = useCallback(async () => {
    try {
      setIsLoading(true);
      let params = {
        page,
        orderBy: currentSort,
        searchTerm: searchQuery,
      };

      const response = await fetchLeaderboardData(params);

      const newUsers = response.data.users || [];

      setData((prevData) => {
        if (page === 1) return newUsers;
        return [...prevData, ...newUsers];
      });

      setHasMore(
        response.data.pagination && page < response.data.pagination.totalPages
      );
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }, [searchQuery, currentSort, page]);

  useEffect(() => {
    const handler = setTimeout(
      () => {
        setPage(1);
        getLeaderboardData();
      },
      searchQuery ? 1000 : 0
    );

    return () => {
      clearTimeout(handler);
    };
  }, [searchQuery, getLeaderboardData]);

  const handleSearchChange = (event) => {
    setPage(1);
    setSearchQuery(event.target.value);
  };

  const sortLeaderboardByAccuracy = (order) => {
    setPage(1);
    setCurrentSort(order);
  };

  const sortLeaderboardByScore = (order) => {
    setPage(1);
    setCurrentSort(order);
  };

  const sortLeaderboardByBankroll = (order) => {
    setPage(1);
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

      <div className="hidden md:block h-full">
        <Board
          data={data}
          toggleFavourite={toggleFavourite}
          lastLeaderElementRef={lastLeaderElementRef}
          isLoading={isLoading}
        />
      </div>
      <div className="md:hidden">
        <MobileLeaderBoard
          data={data}
          toggleFavourite={toggleFavourite}
          lastLeaderElementRef={lastLeaderElementRef}
          isLoading={isLoading}
        />
      </div>
    </div>
  );
};

export default NewLeaderboard;
