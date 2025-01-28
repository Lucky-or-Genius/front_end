import React, { useEffect, useState, useCallback } from "react";
import { FaArrowLeftLong } from "react-icons/fa6";
import { useNavigate, useParams } from "react-router-dom";
import { CgShutterstock } from "react-icons/cg";
import { FaChartLine } from "react-icons/fa";
import { MdPendingActions } from "react-icons/md";

import {
  getSummaryPeople,
  getFullTranscript,
  getSummaryPrediction,
  getSummarySummaries,
} from "../services/summaries.services";
import Tabs from "../components/common/tabs";
import Summaries from "../components/newSummaries/summaries";
import Predictions from "../components/newSummaries/predictions";
import People from "../components/newSummaries/people";
import Transcript from "../components/newSummaries/transcript";

const SummariesDetails = () => {
  const navigate = useNavigate();
  const id = useParams().id;
  const [people, setPeople] = useState([]);
  const [transcript, setTranscript] = useState([]);
  const [prediction, setPrediction] = useState([]);
  const [summaries, setSummaries] = useState([]);
  const [sourceSummary, setSourceSummary] = useState();

  const convertMinsToHrsMins = (minutes) => {
    let h = Math.floor(minutes / 60);
    let m = minutes % 60;
    h = h < 10 ? "0" + h : h;
    m = m < 10 ? "0" + m : m;
    return `${h}:${m}:00`; // Assumes no seconds part, so it's always '00'
  };

  const fetchAllData = useCallback(() => {
    Promise.all([
      getSummarySummaries(id),
      getSummaryPrediction(id),
      getSummaryPeople(id),
      getFullTranscript(id)
    ])
      .then(([summariesRes, predictionsRes, peopleRes, transcriptRes]) => {
        setSummaries(summariesRes.data);
        setPrediction(predictionsRes.data.predictions);
        setSourceSummary(predictionsRes.data.sourceSummary);
        setPeople(peopleRes.data);
        setTranscript(transcriptRes.data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, [id]);

  useEffect(() => {
    fetchAllData();
  }, [fetchAllData]);

  const items = [
    {
      title: "Predictions",
      content: <Predictions predictionData={prediction} />,
    },
    { title: "Summaries", content: <Summaries summariesData={summaries} /> },
    { title: "People", content: <People peopleData={people} /> },
    {
      title: "Transcript",
      content: <Transcript transcriptData={transcript} />,
    },
  ];

  return (
    <div className="bg-primary min-h-screen w-full px-4 2md:px-20 2md:pb-10 overflow-y-auto h-full relative flex flex-col">
      <div
        className="absolute left-4 top-8 md:left-20 md:top-10 text-[#ffffff60] hover:text-white transition-all ease-in-out font-raleway flex gap-2 items-center cursor-pointer"
        onClick={() => navigate(-1)}
      >
        <FaArrowLeftLong /> Back
      </div>
      {sourceSummary ? (
        <div className="w-full flex flex-col items-center">
          <div className="flex flex-col items-center md:flex-row gap-4 md:gap-6 w-full justify-center py-6 ">
            <img
              src={
                sourceSummary?.channel_logo
                  ? sourceSummary?.channel_logo
                  : sourceSummary?.channel_image_url
              }
              alt=""
              width={100}
              height={100}
              className="w-14 h-14 rounded-full object-cover"
            />
            <div className="text-white font-raleway text-3xl">
              {sourceSummary?.channel_name}
            </div>
          </div>
          <div className="w-full text-center flex items-center justify-center">
            <span className="font-raleway text-primary400 w-[400px]">
              {sourceSummary?.source_title}
            </span>
          </div>
          <div className="w-full md:w-4/5 grid grid-cols-2 md:grid-cols-4 font-raleway gap-4 py-10">
            <div className="flex border border-[#ffffff30] rounded-lg p-4 flex-col gap-2 hover:shadow-md hover:shadow-[#ffffff30] transition-all ease-in-out duration-200">
              <MdPendingActions className="w-8 h-8 p-1 rounded-full bg-[#ffffff90] text-primary " />
              <span className="text-[#ffffff60] text-[16px]">Views</span>
              <span className="text-[24px] text-white">
                {Math.round(sourceSummary?.views / 1000000)}M
              </span>
            </div>
            <div className="flex border border-[#ffffff30] rounded-lg p-4 flex-col gap-2 hover:shadow-md hover:shadow-[#ffffff30] transition-all ease-in-out duration-200">
              <CgShutterstock className="w-8 h-8 p-1 rounded-full bg-[#ffffff90] text-primary " />
              <span className="text-[#ffffff60] text-[16px]">
                Total Predictions
              </span>
              <span className="text-[24px] text-white">
                {sourceSummary?.number_of_predictions}
              </span>
            </div>
            <div className="flex border border-[#ffffff30] rounded-lg p-4 flex-col gap-2 hover:shadow-md hover:shadow-[#ffffff30] transition-all ease-in-out duration-200">
              <FaChartLine className="w-8 h-8 p-1 rounded-full bg-[#ffffff90] text-primary " />
              <span className="text-[#ffffff60] text-[16px]">Length</span>
              <span className="text-[24px] text-white">
                {convertMinsToHrsMins(sourceSummary?.duration)}
              </span>
            </div>
            <div className="flex border border-[#ffffff30] rounded-lg p-4 flex-col gap-2 hover:shadow-md hover:shadow-[#ffffff30] transition-all ease-in-out duration-200">
              <FaChartLine className="w-8 h-8 p-1 rounded-full bg-[#ffffff90] text-primary " />
              <span className="text-[#ffffff60] text-[16px]">Date</span>
              <span className="text-[24px] text-white">
                {sourceSummary?.publication_date.toString().slice(0, 10)}
              </span>
            </div>
          </div>
        </div>
      ) : (
        ""
      )}

      <div className="w-full flex justify-center">
        <Tabs items={items} className={"!w-full"} />
      </div>
    </div>
  );
};

export default SummariesDetails;
