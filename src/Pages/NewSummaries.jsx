import React, { useCallback, useEffect, useState } from "react";
import { FiSearch } from "react-icons/fi";

import Filters from "../components/newSummaries/filters";
import SummaryCard from "../components/newSummaries/summaryCard";
import { allSummarySources } from "../services/summaries.services";

const NewSummaries = () => {
  const [summaries, setSummaries] = useState([]);

  const fetchSummaries = useCallback(async () => {
    try {
      const response = await allSummarySources();
      setSummaries(response.data);
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    fetchSummaries();
  }, []);

  return (
    <div className="bg-primary min-h-screen h-full w-full overflow-y-auto pb-10 overflow-x-hidden px-4 md:px-0">
      <div className="w-full flex py-6 justify-center">
        <span className="font-raleway text-3xl text-white font-[600]">
          Summaries
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

      <div className="w-full grid grid-cols-1 md:grid-cols-2 2md:grid-cols-2 md:px-6 gap-4">
        {summaries.map((summary, index) => (
          <SummaryCard key={index} summary={summary} />
        ))}
      </div>
    </div>
  );
};

export default NewSummaries;
