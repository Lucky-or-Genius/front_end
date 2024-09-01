import React, { useCallback, useState, useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { FaArrowLeftLong } from "react-icons/fa6";

import { channelsSourceData } from "../services/channels.service";
import SummaryCard from "../components/newSummaries/summaryCard";

const Sources = () => {
  const id = useParams().id;
  const [sources, setSources] = useState();
  const navigate = useNavigate();

  const getAllSources = useCallback(async () => {
    try {
      const response = await channelsSourceData(id);
      setSources(response.data);
    } catch (error) {
      console.log(error);
    }
  }, [id]);

  useEffect(() => {
    getAllSources();
  }, []);

  return (
    <div className="bg-primary min-h-screen h-full w-full overflow-y-auto pb-10 overflow-x-hidden px-4 md:px-0">
      <div className="w-full flex py-6 justify-center relative">
        <span className="font-raleway text-3xl text-white font-[600]">
          Sources
        </span>
        <div
          className="absolute left-4 md:left-10 top-4 md:top-10 text-[#ffffff60] hover:text-white transition-all ease-in-out font-raleway flex gap-2 items-center cursor-pointer"
          onClick={() => navigate(-1)}
        >
          <FaArrowLeftLong /> Back
        </div>
      </div>
      <div className="w-full grid grid-cols-1 md:grid-cols-2 2md:grid-cols-2 md:px-6 gap-4">
        {sources?.map((source, index) => (
          <SummaryCard key={index} summary={source} />
        ))}
      </div>
    </div>
  );
};

export default Sources;
