import React, { useEffect, useState, useCallback } from "react";
import { MdPendingActions } from "react-icons/md";
import { CgShutterstock } from "react-icons/cg";
import { FaChartLine, FaWikipediaW } from "react-icons/fa";
import { IoAnalyticsOutline } from "react-icons/io5";
import {
  FaArrowLeftLong,
  FaXTwitter,
  FaSquareInstagram,
} from "react-icons/fa6";
import { useNavigate, useParams, Link, useLocation } from "react-router-dom";

import {
  getProfilesBySubjects,
  getSortedProfilesBySubjects,
} from "../services/Profiles.service";
import { getPredictionSingle } from "../services/Predictions.service";
import { allPredictorSummarySources } from "../services/summaries.services";
import { predictorData } from "../services/Leaderboards.service";
import Tabs from "../components/common/tabs";
import BarChart from "../components/newLeaderboard/barChart";
import PieChart from "../components/newLeaderboard/pieChart";
import PredictionSection from "../components/newLeaderboard/prediction-section";
import SourceSection from "../components/newLeaderboard/source-section";
import ChartFilters from "../components/newLeaderboard/chart-filters";

const Leader = () => {
  const [userData, setUserData] = useState({});
  const [predictor, setPredictor] = useState({});
  const [userPredictions, setUserPredictions] = useState({});
  const [summaries, setSummaries] = useState();
  const [category, setCategory] = useState();
  const [predictionType, setPredictionType] = useState();
  const navigate = useNavigate();
  const id = useParams().id;
  const accountId = localStorage.getItem("accountId");

  const query = new URLSearchParams(useLocation().search);
  const defaultOpen = query.get("defaultOpen");

  const fetchUserPrediction = useCallback(async () => {
    try {
      const res = await getPredictionSingle(id, category, predictionType);
      setUserPredictions(res.data);
    } catch (error) {
      console.log(error);
    }
  }, [category, id, predictionType]);

  const fetchUserSources = useCallback(async () => {
    try {
      const res = await allPredictorSummarySources(accountId, id);
      setSummaries(res.data);
    } catch (error) {
      console.log(error);
    }
  }, [accountId, id]);

  const getSortedUserSubject = async (value) => {
    getSortedProfilesBySubjects(id, value)
      .then((res) => {
        // if (res.data.message === "No data found for the given userId") return;
        setUserData(res.data);
      })
      .catch((err) => {
        console.log("err::::", err);
      });
  };

  useEffect(() => {
    const fetchUserData = async () => {
      const res = await getProfilesBySubjects(id);
      setUserData(res.data);
    };

    fetchUserData();
  }, [id]);

  useEffect(() => {
    const fetchPredictorData = async () => {
      try {
        const res = await predictorData(id);
        setPredictor(res.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchPredictorData();
  }, [id]);

  useEffect(() => {
    fetchUserPrediction();
  }, [fetchUserPrediction]);

  useEffect(() => {
    fetchUserSources();
  }, [fetchUserSources]);

  const items = [
    {
      title: "Analytics",
      content: (
        <>
          <div className="pb-2">
            <ChartFilters getSortedUserSubject={getSortedUserSubject} />
          </div>
          <div className="flex flex-col w-full text-white font-poppins gap-6">
            <span className="flex items-center gap-2 text-[#ffffff80] font-raleway font-[500] text-xl ">
              Predictions by Category
            </span>
            <BarChart
              data={userData[0]}
              isVisible={defaultOpen === "Analytics"}
            />
            <span className="flex items-center gap-2 text-[#ffffff80] font-raleway font-[500] text-xl ">
              Predictions by Platform
            </span>
            <PieChart isVisible={defaultOpen === "Analytics"} />
          </div>
        </>
      ),
    },
    {
      title: "Predictions",
      content: (
        <PredictionSection
          setUserPredictions={setUserPredictions}
          userPredictions={userPredictions}
          setPredictionType={setPredictionType}
          setCategory={setCategory}
        />
      ),
    },
    {
      title: "Sources",
      content: (
        <SourceSection setSummaries={setSummaries} summaries={summaries} />
      ),
    },
  ];

  return (
    <div className="bg-primary min-h-screen w-full p-4 2md:p-8 overflow-y-auto h-full relative">
      <div>
        <div
          className="absolute left-4 top-4 md:left-10 md:top-10 text-[#ffffff60] hover:text-white transition-all ease-in-out font-raleway flex gap-2 items-center cursor-pointer"
          onClick={() => navigate(-1)}
        >
          <FaArrowLeftLong /> Back
        </div>
      </div>
      {userPredictions?.length > 0 ? (
        <div className="flex items-center gap-6 w-full md:justify-center justify-center flex-col md:flex-row">
          <img
            src={userPredictions[0]?.image_url}
            alt=""
            width={100}
            height={100}
            className="w-32 h-32 rounded-xl object-cover"
          />
          <div className="flex flex-col items-center md:items-start justify-around h-full w-fit gap-2">
            <span className="text-white font-raleway text-3xl">
              {userPredictions[0]?.first_name +
                " " +
                userPredictions[0]?.last_name}
            </span>
            <div className="text-[#ffffff60] font-poppins text-base text-start gap-2 w-full flex flex-col">
              {predictor?.primary_alias &&
                predictor?.primary_alias !==
                  userPredictions[0]?.first_name +
                    " " +
                    userPredictions[0]?.last_name && (
                  <div className="">
                    aka:{" "}
                    <span className="text-white">
                      "{predictor?.primary_alias}"{" "}
                    </span>
                  </div>
                )}
              {predictor?.age && (
                <div className="">
                  {" "}
                  Age: <span className="text-white">{predictor?.age}</span>
                </div>
              )}

              <span className="flex gap-4 items-start flex-wrap">
                Socials:
                <Link
                  // className="bg-primary400 p-[2px] text-primary rounded-md flex justify-center items-center w-5 h-5 cursor-pointer hover:text-black"
                  to={userPredictions[0]?.wikipedia_url}
                  className="bg-[#ffffff20] p-2 rounded-full text-lg text-white flex gap-2 items-center"
                  target="_blank"
                >
                  <FaWikipediaW />
                </Link>
                <Link
                  // className="bg-primary400 p-[2px] text-primary rounded-md flex justify-center items-center w-5 h-5 cursor-pointer hover:text-black"
                  to={userPredictions[0]?.twitter_handle}
                  className="bg-[#ffffff20] p-2 rounded-full text-lg text-white flex gap-2 items-center "
                  target="_blank"
                >
                  <FaXTwitter />
                </Link>
                {predictor?.instagram && (
                  <Link
                    // className="bg-primary400 p-[2px] text-primary rounded-md flex justify-center items-center w-5 h-5 cursor-pointer hover:text-black"
                    to={predictor.instagram}
                    className="bg-[#ffffff20] p-2 rounded-full text-lg text-white flex gap-2 items-center "
                    target="_blank"
                  >
                    <FaSquareInstagram />
                  </Link>
                )}
              </span>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex md:flex-row flex-col items-center gap-4 w-full justify-center">
          <div className="w-20 h-20 rounded-full bg-[#ffffff30] animate-pulse" />
          <div className="flex flex-col justify-around h-full gap-2 items-center md:items-start">
            <span className="w-56 h-6 rounded-full bg-[#ffffff30] animate-pulse" />
            <span className="w-44 h-4 rounded-full bg-[#ffffff30] animate-pulse" />
            <span className="w-20 h-4 rounded-full bg-[#ffffff30] animate-pulse" />
            <span className="w-20 h-4 rounded-full bg-[#ffffff30] animate-pulse" />
          </div>
        </div>
      )}
      <div className="w-full flex justify-center py-12">
        <div className="bg-[#ffffff20] md:w-4/5 rounded-xl p-4 md:p-6 text-white font-raleway md:text-xl gap-4 flex flex-col">
          <div className="text-[#ffffff60]">
            {" "}
            Area of Accuracy:{" "}
            <span className="text-white">{userPredictions[0]?.category}</span>
          </div>
          {predictor?.occupation && (
            <div className="text-[#ffffff60]">
              {" "}
              Occupation:{" "}
              <span className="text-white">{predictor?.occupation}</span>
            </div>
          )}
          {predictor?.summary && (
            <div className="text-[#ffffff60]">
              Summary: <span className="text-white">{predictor?.summary}</span>
            </div>
          )}
        </div>
      </div>
      <div className="w-full flex justify-center pb-12">
        <div className="w-full md:w-4/5 grid grid-cols-2 md:grid-cols-4 font-raleway gap-4">
          <div className="flex border border-[#ffffff30] rounded-lg p-4 flex-col gap-2 hover:shadow-md hover:shadow-[#ffffff30] transition-all ease-in-out duration-200">
            <MdPendingActions className="w-8 h-8 p-1 rounded-full bg-[#ffffff90] text-primary " />
            <span className="text-[#ffffff60] text-[16px]">
              Prediction Accuracy
            </span>
            <span className="text-[24px] text-white">
              {userPredictions[0]?.prediction_accuracy}%
            </span>
          </div>
          <div className="flex border border-[#ffffff30] rounded-lg p-4 flex-col gap-2 hover:shadow-md hover:shadow-[#ffffff30] transition-all ease-in-out duration-200">
            <FaChartLine className="w-8 h-8 p-1 rounded-full bg-[#ffffff90] text-primary " />
            <span className="text-[#ffffff60] text-[16px]">
              Total Predictions
            </span>
            <span className="text-[24px] text-white">
              {userPredictions[0]?.all_predictions}
            </span>
          </div>
          <div className="flex border border-[#ffffff30] rounded-lg p-4 flex-col gap-2 hover:shadow-md hover:shadow-[#ffffff30] transition-all ease-in-out duration-200">
            <CgShutterstock className="w-8 h-8 p-1 rounded-full bg-[#ffffff90] text-primary " />
            <span className="text-[#ffffff60] text-[16px]">
              Due to Settle in 2024
            </span>
            <span className="text-[24px] text-white">
              {userPredictions[0]?.predictions_due_to_settle}
            </span>
          </div>

          <div className="flex border border-[#ffffff30] rounded-lg p-4 flex-col gap-2 hover:shadow-md hover:shadow-[#ffffff30] transition-all ease-in-out duration-200">
            <IoAnalyticsOutline className="w-8 h-8 p-1 rounded-full bg-[#ffffff90] text-primary " />
            <span className="text-[#ffffff60] text-[16px]">Current Streak</span>
            <span className="text-[24px] text-white">
              {userPredictions[0]?.current_streak}
            </span>
          </div>
        </div>
      </div>
      <div className="w-full flex justify-center py-4">
        {/* {userData?.length > 0 && ( */}
        <Tabs items={items} defaultOpen={defaultOpen} className={"!w-full"} />
        {/* )} */}
      </div>
    </div>
  );
};

export default Leader;
