import React, { useCallback, useEffect, useState, useRef } from "react";

import Tabs from "../components/common/tabs";
import Channels from "../components/newFavourites/channels";
import Predictors from "../components/newFavourites/predictors";
import Sources from "../components/newFavourites/sources";
import Predictions from "../components/newFavourites/predictions";
import { fetchLeaderboardData } from "../services/Leaderboards.service";
import { channelsData } from "../services/channels.service";
import { allSummarySources } from "../services/summaries.services";
import { getPredictionsUser } from "../services/Predictions.service";

const Favourites = () => {
  const accountId = localStorage.getItem("accountId");
  const [predictors, setPredictors] = useState([]);
  const [channels, setChannels] = useState([]);
  const [sources, setSources] = useState([]);
  const [predictions, setPredictions] = useState([]);
  const [predictorsPage, setPredictorsPage] = useState(1);
  const [hasMorePredictors, setHasMorePredictors] = useState(true);
  const [isLoadingPredictors, setIsLoadingPredictors] = useState(false);
  const pageSize = 20; // constant page size for pagination
  const observer = useRef();
  
  const lastElementRef = useCallback(node => {
    if (isLoadingPredictors) return;
    if (observer.current) observer.current.disconnect();
    
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasMorePredictors) {
        setPredictorsPage(prevPage => prevPage + 1);
      }
    });

    if (node) observer.current.observe(node);
  }, [isLoadingPredictors, hasMorePredictors]);

  const getPredictors = useCallback(async (page = 1) => {
    // Prevent duplicate calls if already loading
    if (isLoadingPredictors) return;
    setIsLoadingPredictors(true);
    try {
      // Call the consolidated fetch with pagination and filterFavorites set to true
      const res = await fetchLeaderboardData({ page, pageSize, filterFavorites: true });
      // Assuming API returns an array of users under res.data.users
      const users = res?.data?.users || [];
      
      if (page === 1) {
        setPredictors(users);
      } else {
        // Append new predictors to the existing list
        setPredictors(prev => [...prev, ...users]);
      }
      
      // If fewer users than pageSize are returned, assume there are no more pages.
      if (users.length < pageSize) {
        setHasMorePredictors(false);
      }
      setPredictorsPage(page);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoadingPredictors(false);
    }
  }, [isLoadingPredictors, pageSize]);

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

  const getSources = useCallback(async () => {
    try {
      const res = await allSummarySources(accountId);

      const filteredData = [...res.data.sources].filter(
        (obj) => obj.is_favourite === true
      );


      setSources(filteredData);
    } catch (error) {
      console.log(error);
    }
  }, [accountId]);

  const GetPredictions = useCallback(async () => {
    try {
      const res = await getPredictionsUser(accountId);

      const filteredData = [...res.data?.predictions].filter(
        (obj) => obj.is_favourite === true
      );

      setPredictions(filteredData);
    } catch (error) {
      console.log(error);
    }
  }, [accountId]);

  useEffect(() => {
    // Initial load
    getChannels();
    getSources();
    GetPredictions();
    getPredictors(1); // Load first page of predictors
  }, []); // Remove getPredictors from dependencies

  // Separate useEffect for infinite scrolling
  useEffect(() => {
    let throttleTimeout = null;

    const handleScroll = () => {
      if (throttleTimeout) return;
      
      throttleTimeout = setTimeout(() => {
        const scrolledToBottom = 
          window.innerHeight + window.scrollY >= 
          document.documentElement.scrollHeight - 100;

        if (scrolledToBottom && hasMorePredictors && !isLoadingPredictors) {
          getPredictors(predictorsPage + 1);
        }
        throttleTimeout = null;
      }, 200);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (throttleTimeout) clearTimeout(throttleTimeout);
    };
  }, [predictorsPage, hasMorePredictors, isLoadingPredictors]); // Remove getPredictors

  const Items = [
    {
      title: "Predictors",
      content: (
        <Predictors 
          predictors={predictors} 
          setPredictors={setPredictors}
          lastElementRef={lastElementRef}
          isLoading={isLoadingPredictors}
        />
      ),
    },
    {
      title: "Channels",
      content: <Channels channels={channels} setChannels={setChannels} />,
    },
    {
      title: "Sources",
      content: <Sources sources={sources} setSources={setSources} />,
    },
    {
      title: "Predictions",
      content: (
        <Predictions
          predictions={predictions}
          setPredictions={setPredictions}
        />
      ),
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
