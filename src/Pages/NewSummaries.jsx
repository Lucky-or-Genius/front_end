import React, { useCallback, useEffect, useRef, useState } from "react";
import { FiSearch } from "react-icons/fi";
import { toast } from "react-hot-toast";
import { LuPlus } from "react-icons/lu";

import Filters from "../components/newSummaries/filters";
import SummaryCard from "../components/newSummaries/summaryCard";
import AddSourceModal from "../components/newSummaries/addSourceModal";
import Notification from "../components/newSummaries/notification";
import {
  allSummarySources,
  searchTerm,
  sortPublicationDate,
  sortNumberOfPredictions,
  addRemoveFavourite,
} from "../services/summaries.services";
import Skeleton from "../components/newSummaries/skeleton";

const NewSummaries = () => {
  const [summaries, setSummaries] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [url, setUrl] = useState("");
  const [showNotification, setShowNotification] = useState(false);

  const accountId = localStorage.getItem("accountId");

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const sortByPublicationDate = async (order) => {
    try {
      const res = await sortPublicationDate(order);
      setSummaries(res.data);
    } catch (error) {
      console.log(error);
    }
  };
  const sortByNumberOfPredictions = async (order) => {
    try {
      const res = await sortNumberOfPredictions(order);
      setSummaries(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const toggleFavourite = (index, id) => {
    if (accountId === null) {
      toast.error("Login to add favourite");
      return;
    }
    const params = {
      accountId: String(accountId),
      sourceId: id,
    };
    const newData = [...summaries];
    newData[index].is_favourite = !newData[index].is_favourite;
    toast.success("updated!");
    addRemoveFavourite(params);
    setSummaries(newData);
  };

  const fetchSummariesData = useCallback(async () => {
    try {
      if (searchQuery === "") {
        const response = await allSummarySources(accountId);
        setSummaries(response.data);
      } else {
        const response = await searchTerm(searchQuery);
        setSummaries(response.data);
      }
    } catch (error) {
      console.log(error);
    }
  }, [accountId, searchQuery]);

  useEffect(() => {
    if (searchQuery === "") {
      fetchSummariesData();
    } else {
      const handler = setTimeout(() => {
        fetchSummariesData();
      }, 1000);

      return () => {
        clearTimeout(handler);
      };
    }
  }, [fetchSummariesData, searchQuery]);

  return (
    <div className="bg-primary min-h-screen h-full w-full overflow-y-auto pb-10 overflow-x-hidden px-4 md:px-0 relative">
      <div className="w-full flex py-6 justify-center flex-col md:flex-row gap-4 items-center relative">
        <span className="font-raleway text-3xl text-white font-[600]">
          Sources
        </span>
        <div className="md:absolute right-10 top-6">
          <button
            className="text-primary400  font-raleway flex gap-2 items-center font-[600] px-4 py-2 rounded-lg hover:bg-[#ffffff20] active:bg-[#ffffff40] hover:text-white transition-all ease-in-out border border-primary400"
            onClick={() => setShowModal(true)}
          >
            <LuPlus className="text-lg" /> Add Source
          </button>
        </div>
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
          sortByPublicationDate={sortByPublicationDate}
          sortByNumberOfPredictions={sortByNumberOfPredictions}
        />
      </div>

      {summaries.length > 0 ? (
        <div className="w-full grid grid-cols-1 md:grid-cols-2 md:px-6 gap-4">
          {summaries.map((summary, index) => (
            <SummaryCard
              key={index}
              summary={summary}
              toggleFavourite={toggleFavourite}
              index={index}
            />
          ))}
        </div>
      ) : (
        <Skeleton />
      )}

      {showModal && (
        <AddSourceModal
          setShowModal={setShowModal}
          setUrl={setUrl}
          url={url}
          setNotification={setShowNotification}
        />
      )}
      {showNotification && (
        <Notification url={url} setShowNotification={setShowNotification} />
      )}
    </div>
  );
};

export default NewSummaries;
