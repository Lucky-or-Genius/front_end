import React, { useEffect, useState } from "react";
import { MdPendingActions } from "react-icons/md";
import { CgShutterstock } from "react-icons/cg";
import { FaChartLine, FaWikipediaW } from "react-icons/fa";
import { IoAnalyticsOutline } from "react-icons/io5";
import { FaArrowLeftLong, FaXTwitter } from "react-icons/fa6";
import { useNavigate, useParams, Link, useLocation } from "react-router-dom";

import { getProfilesBySubjects } from "../services/Profiles.service";
import { getPredictionSingle } from "../services/Predictions.service";
import { predictorData } from "../services/Leaderboards.service";
import Tabs from "../components/common/tabs";
import BarChart from "../components/newLeaderboard/barChart";
import PieChart from "../components/newLeaderboard/pieChart";
import PredictionSection from "../components/newLeaderboard/prediction-section";
import ChartFilters from "../components/newLeaderboard/chart-filters";

const Leader = () => {
  const [userData, setUserData] = useState({});
  const [predictor, setPredictor] = useState({});
  const [userPredictions, setUserPredictions] = useState({});
  const navigate = useNavigate();
  const id = useParams().id;

  const query = new URLSearchParams(useLocation().search);
  const defaultOpen = query.get("defaultOpen");

  useEffect(() => {
    const fetchUserData = async () => {
      const res = await getProfilesBySubjects(id);
      setUserData(res.data);
    };

    fetchUserData();
  }, [id]);

  // useEffect(() => {
  //   const fetchPredictorData = async () => {
  //     const res = await predictorData();
  //     setPredictor(res.data);
  //   };

  //   fetchPredictorData();
  // }, [id]);

  // console.log(predictor);

  useEffect(() => {
    const fetchUserPrediction = async () => {
      const res = await getPredictionSingle(id);
      setUserPredictions(res.data);
    };

    fetchUserPrediction();
  }, [id]);

  const items = [
    {
      title: "Analytics",
      content: (
        <>
          <div className="pb-2">
            <ChartFilters />
          </div>
          <div className="flex flex-col w-full text-white font-poppins gap-6">
            <span className="flex items-center gap-2 text-[#ffffff80] font-raleway font-[500] text-xl ">
              Predictions by Category
            </span>
            <BarChart data={userData[0]} />
            <span className="flex items-center gap-2 text-[#ffffff80] font-raleway font-[500] text-xl ">
              Predictions by Plaform
            </span>
            <PieChart />{" "}
          </div>
        </>
      ),
    },
    {
      title: "Predictions",
      content: <PredictionSection userPredictions={userPredictions} />,
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
            className="w-20 h-20 rounded-full object-cover"
          />
          <div className="flex flex-col items-center md:items-start justify-around h-full w-full md:w-fit">
            <span className="text-white font-raleway text-3xl">
              {userPredictions[0]?.first_name +
                " " +
                userPredictions[0]?.last_name}
            </span>
            <div className="text-[#ffffff60] font-poppins text-lg text-center md:text-start">
              Area of Accuracy :{" "}
              <span className="text-white">{userPredictions[0]?.category}</span>
              <span className="flex gap-4 items-center">
                Socials :
                <Link
                  // className="bg-primary400 p-[2px] text-primary rounded-md flex justify-center items-center w-5 h-5 cursor-pointer hover:text-black"
                  to={userPredictions[0]?.wikipedia_url}
                  className="bg-[#ffffff20] px-2 rounded-full text-sm text-primary400 flex gap-2 items-center"
                  target="_blank"
                >
                  <FaWikipediaW /> Wikipedia
                </Link>
                <Link
                  // className="bg-primary400 p-[2px] text-primary rounded-md flex justify-center items-center w-5 h-5 cursor-pointer hover:text-black"
                  to={userPredictions[0]?.twitter_handle}
                  className="bg-[#ffffff20] px-2 rounded-full text-sm text-primary400 flex gap-2 items-center "
                  target="_blank"
                >
                  <FaXTwitter /> Twitter
                </Link>
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
          </div>
        </div>
      )}
      <div className="w-full flex justify-center py-12">
        <div className="w-full md:w-4/5 grid grid-cols-2 md:grid-cols-4 font-raleway gap-4">
          <div className="flex border border-[#ffffff30] rounded-lg p-4 flex-col gap-2 hover:shadow-md hover:shadow-[#ffffff30] transition-all ease-in-out duration-200">
            <MdPendingActions className="w-8 h-8 p-1 rounded-full bg-[#ffffff90] text-primary " />
            <span className="text-[#ffffff60] text-[16px]">
              Pending Predictions
            </span>
            <span className="text-[24px] text-white">
              {userPredictions[0]?.all_pending_predictions}
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
        {userData?.length > 0 && (
          <Tabs items={items} defaultOpen={defaultOpen} />
        )}
      </div>
    </div>
  );
};

export default Leader;
