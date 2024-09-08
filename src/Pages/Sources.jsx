import React, { useCallback, useState, useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { FaArrowLeftLong } from "react-icons/fa6";
import { CgShutterstock } from "react-icons/cg";
import { FaChartLine } from "react-icons/fa";
import { MdPendingActions } from "react-icons/md";

import { channelsSourceData } from "../services/channels.service";
import SummaryCard from "../components/newSummaries/summaryCard";

const Sources = () => {
  const id = useParams().id;
  const [sources, setSources] = useState();
  const navigate = useNavigate();

  const channelInfo = JSON.parse(localStorage.getItem("channelInfo"));

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
    <div className="bg-primary min-h-screen h-full w-full overflow-y-auto pb-10 overflow-x-hidden px-4 md:px-0 flex flex-col items-center">
      <div className="w-full flex justify-center relative">
        <div className="flex flex-col items-center md:flex-row gap-4 md:gap-6 w-full justify-center py-6 ">
          <img
            src={channelInfo?.imageUrl}
            alt=""
            width={100}
            height={100}
            className="w-14 h-14 rounded-full object-cover"
          />
          <div className="text-white font-raleway text-3xl">
            {channelInfo?.channelName}
          </div>
        </div>
        <div
          className="absolute left-4 md:left-10 top-4 md:top-10 text-[#ffffff60] hover:text-white transition-all ease-in-out font-raleway flex gap-2 items-center cursor-pointer"
          onClick={() => navigate(-1)}
        >
          <FaArrowLeftLong /> Back
        </div>
      </div>
      <div className="w-full md:w-4/5 grid grid-cols-2 md:grid-cols-4 font-raleway gap-4 py-8">
        <div className="flex border border-[#ffffff30] rounded-lg p-4 flex-col gap-2 hover:shadow-md hover:shadow-[#ffffff30] transition-all ease-in-out duration-200">
          <MdPendingActions className="w-8 h-8 p-1 rounded-full bg-[#ffffff90] text-primary " />
          <span className="text-[#ffffff60] text-[16px]">
            Total Predictions
          </span>
          <span className="text-[24px] text-white">
            {channelInfo?.predictions}
          </span>
        </div>
        <div className="flex border border-[#ffffff30] rounded-lg p-4 flex-col gap-2 hover:shadow-md hover:shadow-[#ffffff30] transition-all ease-in-out duration-200">
          <CgShutterstock className="w-8 h-8 p-1 rounded-full bg-[#ffffff90] text-primary " />
          <span className="text-[#ffffff60] text-[16px]">
            Prediction Accuracy
          </span>
          <span className="text-[24px] text-white">
            {channelInfo?.accuracy}%
          </span>
        </div>
        <div className="flex border border-[#ffffff30] rounded-lg p-4 flex-col gap-2 hover:shadow-md hover:shadow-[#ffffff30] transition-all ease-in-out duration-200">
          <FaChartLine className="w-8 h-8 p-1 rounded-full bg-[#ffffff90] text-primary " />
          <span className="text-[#ffffff60] text-[16px]">
            Pending Predictions
          </span>
          <span className="text-[24px] text-white">{channelInfo?.pending}</span>
        </div>
        <div className="flex border border-[#ffffff30] rounded-lg p-4 flex-col gap-2 hover:shadow-md hover:shadow-[#ffffff30] transition-all ease-in-out duration-200">
          <FaChartLine className="w-8 h-8 p-1 rounded-full bg-[#ffffff90] text-primary " />
          <span className="text-[#ffffff60] text-[16px]">Summaries</span>
          <span className="text-[24px] text-white">
            {channelInfo?.summaries}
          </span>
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
