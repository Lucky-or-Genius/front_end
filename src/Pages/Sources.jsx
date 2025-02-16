import React, { useCallback, useState, useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FaArrowLeftLong } from "react-icons/fa6";
import { CircularProgress, ProgressCard } from "../components/common";

import { channelsSourceData } from "../services/channels.service";
import SummaryCard from "../components/newSummaries/summaryCard";

const Sources = () => {
  const id = useParams().id;
  const [sources, setSources] = useState([]);
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const observer = useRef();
  const sourcesRef = useRef(null);

  const total_predictions =
    Number(sources[0]?.channel_total_true_partially) +
    Number(sources[0]?.channel_total_false) +
    Number(sources[0]?.channel_total_pending);
  const channelInfo = JSON.parse(localStorage.getItem("channelInfo"));

  const scrollToSources = () => {
    sourcesRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const lastSourceElementRef = useCallback(
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

  const fetchSources = useCallback(
    async (pageNumber) => {
      try {
        setIsLoading(true);
        const response = await channelsSourceData(id, pageNumber);

        setSources((prevSources) => {
          if (pageNumber === 1) return response.data.sources;
          return [...prevSources, ...response.data.sources];
        });

        setHasMore(pageNumber < response.data.pagination.totalPages);
      } catch (error) {
        console.error("Error fetching sources:", error);
      } finally {
        setIsLoading(false);
      }
    },
    [id]
  );

  useEffect(() => {
    fetchSources(page);
  }, [fetchSources, page]);

  return (
    <div className="bg-primary min-h-screen smooth-scroll h-full w-full overflow-y-auto pb-10 overflow-x-hidden px-4 md:px-0 flex flex-col items-center">
      <div className="w-full flex justify-center relative">
        <div className="flex flex-col items-center md:flex-row gap-4 md:gap-6 w-full justify-center py-6 ">
          <img
            src={channelInfo?.imageUrl}
            alt=""
            width={100}
            height={100}
            className="w-16 h-16 rounded-full object-cover"
          />
          <div className="flex flex-col items-center md:items-start font-raleway text-white gap-2">
            <div className="text-3xl">{channelInfo?.channelName}</div>
            <button
              className="bg-[#ffffff10] rounded-full px-4 py-1 font-semibold w-fit hover:bg-[#ffffff20] transition-all duration-300"
              onClick={scrollToSources}
            >
              <span className="text-[#ffffff80] text-sm font-normal">
                Total Sources :
              </span>{" "}
              {channelInfo?.summaries}
            </button>
          </div>
        </div>
        <div
          className="absolute left-4 md:left-10 top-4 md:top-10 text-[#ffffff60] hover:text-white transition-all ease-in-out font-raleway flex gap-2 items-center cursor-pointer"
          onClick={() => navigate(-1)}
        >
          <FaArrowLeftLong /> Back
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 w-4/5 py-12 gap-6 md:gap-4 ">
        <div className="flex justify-center w-full h-full items-center">
          <CircularProgress
            percentage={Math.round(channelInfo?.accuracy)}
            size={250}
            key={id}
          />
        </div>
        <div className="flex flex-col gap-3">
          <ProgressCard
            totalPredictions={total_predictions}
            value={sources[0]?.channel_total_true_partially}
            status={"Partially True"}
          />
          <ProgressCard
            totalPredictions={total_predictions}
            value={sources[0]?.channel_total_pending}
            status={"Pending"}
          />
          <ProgressCard
            totalPredictions={total_predictions}
            value={sources[0]?.channel_total_false}
            status={"False"}
          />
        </div>
      </div>

      <div
        ref={sourcesRef}
        className="w-full grid grid-cols-1 md:grid-cols-2 2md:grid-cols-2 md:px-6 gap-4"
      >
        {sources?.map((source, index) => (
          <div
            key={source.id}
            ref={index === sources.length - 1 ? lastSourceElementRef : null}
          >
            <SummaryCard summary={source} />
          </div>
        ))}
      </div>
      {isLoading && (
        <div className="text-white py-4 font-poppins">Loading sources...</div>
      )}
    </div>
  );
};

export default Sources;
