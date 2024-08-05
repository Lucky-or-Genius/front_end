import React, { useEffect, useState } from "react";
import { FaArrowLeftLong } from "react-icons/fa6";
import { useNavigate, useParams, Link } from "react-router-dom";

import {
  allSummarySources,
  summarySourceById,
  getSummaryPeople,
  getFullTranscript,
  getSummaryPrediction,
  getSummarySummaries,
} from "../services/summaries.services";
import Tabs from "../components/common/tabs";

const SummariesDetails = () => {
  const navigate = useNavigate();
  const id = useParams().id;
  const [people, setPeople] = useState([]);
  const [transcript, setTranscript] = useState([]);
  const [prediction, setPrediction] = useState([]);
  const [summaries, setSummaries] = useState([]);

  // useEffect(() => {
  //   const fetchSummaries = async () => {
  //     try {
  //       const response = await summarySourceById(id);
  //       // setSummaries(response.data);
  //       console.log(response);
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };

  //   fetchSummaries();
  // }, []);
  useEffect(() => {
    const fetchSummaries = async () => {
      try {
        const response = await getSummarySummaries(id);
        // setSummaries(response.data);
        console.log(response);
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
        // setSummaries(response.data);
        console.log(response);
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
        // setSummaries(response.data);
        console.log(response);
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
        // setSummaries(response.data);
        console.log(response);
      } catch (error) {
        console.log(error);
      }
    };

    fetchTranscript();
  }, []);

  const items = [
    { title: "Predictions", content: "hello1" },
    { title: "Summaries", content: "hello2" },
    { title: "Transcript", content: "hello3" },
  ];

  return (
    <div className="bg-primary min-h-screen w-full px-4 2md:px-20 2md:py-10 overflow-y-hidden h-full relative flex gap-6">
      <div
        className="absolute left-2 top-4 text-[#ffffff60] hover:text-white transition-all ease-in-out font-raleway flex gap-2 items-center cursor-pointer"
        onClick={() => navigate(-1)}
      >
        <FaArrowLeftLong /> Back
      </div>

      <div className="w-full">
        <Tabs items={items} className={"!w-full"} />
      </div>
      <div className="w-1/3">people</div>
    </div>
  );
};

export default SummariesDetails;
