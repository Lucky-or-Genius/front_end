import React, { useEffect, useState } from "react";
import { FaArrowLeftLong } from "react-icons/fa6";
import { useNavigate, useParams } from "react-router-dom";

import {
  allSummarySources,
  summarySourceById,
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

  useEffect(() => {
    const fetchSummaries = async () => {
      try {
        const response = await getSummarySummaries(id);
        setSummaries(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchSummaries();
  }, []);
  useEffect(() => {
    const fetchPredictions = async () => {
      try {
        const response = await getSummaryPrediction(id);
        setPrediction(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchPredictions();
  }, []);
  useEffect(() => {
    const fetchPeople = async () => {
      try {
        const response = await getSummaryPeople(id);
        setPeople(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchPeople();
  }, []);
  useEffect(() => {
    const fetchTranscript = async () => {
      try {
        const response = await getFullTranscript(id);
        setTranscript(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchTranscript();
  }, []);

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
    <div className="bg-primary min-h-screen w-full px-4 2md:px-20 2md:pb-10 overflow-y-auto md:overflow-y-hidden h-full relative flex flex-col">
      <div
        className="absolute left-4 top-8 md:left-20 md:top-10 text-[#ffffff60] hover:text-white transition-all ease-in-out font-raleway flex gap-2 items-center cursor-pointer"
        onClick={() => navigate(-1)}
      >
        <FaArrowLeftLong /> Back
      </div>

      <div className="w-full flex py-6 justify-center">
        <span className="font-raleway text-3xl text-white font-[600]">
          Summary
        </span>
      </div>

      <div className="w-full flex justify-center">
        <Tabs items={items} className={"!w-full"} />
      </div>
    </div>
  );
};

export default SummariesDetails;
