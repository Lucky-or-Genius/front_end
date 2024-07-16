import React, { useEffect, useState } from "react";
import Image from "../assets/hover_info2.png";
import { MdPendingActions } from "react-icons/md";
import { CgShutterstock } from "react-icons/cg";
import { FaChartLine } from "react-icons/fa";
import { IoAnalyticsOutline } from "react-icons/io5";
import { FaArrowLeftLong } from "react-icons/fa6";
import { Link, useParams } from "react-router-dom";

import {
  getProfilesBySubjects,
  getSortedProfilesBySubjects,
} from "../services/Profiles.service";
import { getPredictionSingle } from "../services/Predictions.service";
import Tabs from "../components/newLeaderboard/tabs";
import BarChart from "../components/newLeaderboard/barChart";
import PieChart from "../components/newLeaderboard/pieChart";

const Leader = () => {
  const [userData, setUserData] = useState({});
  const [userPredictions, setUserPredictions] = useState({});
  const id = useParams().id;

  useEffect(() => {
    const fetchUserData = async () => {
      const res = await getProfilesBySubjects(id);
      setUserData(res.data);
    };

    fetchUserData();
  }, []);
  useEffect(() => {
    const fetchUserPrediction = async () => {
      const res = await getPredictionSingle(id);
      setUserPredictions(res.data);
    };

    fetchUserPrediction();
  }, []);

  const items = [
    {
      title: "Analytics",
      content: (
        <div className="flex flex-col w-full text-white font-poppins gap-6">
          <BarChart data={userData[0]} /> <PieChart />{" "}
        </div>
      ),
    },
    { title: "Predictions", content: "This is the content of the 2nd tab" },
  ];

  return (
    <div className="bg-primary min-h-screen w-full p-8 overflow-y-auto h-full relative">
      <div>
        <Link
          to={"/dashboard/LeaderBoards"}
          className="absolute left-10 top-10 text-[#ffffff60] hover:text-white transition-all ease-in-out font-raleway flex gap-2 items-center"
        >
          <FaArrowLeftLong /> Back
        </Link>
      </div>
      {userPredictions?.length > 0 ? (
        <div className="flex items-center gap-6 w-full justify-center">
          <img
            src={userPredictions[0]?.image_url}
            alt=""
            width={100}
            height={100}
            className="w-20 h-20 rounded-full object-cover"
          />
          <div className="flex flex-col justify-around h-full">
            <span className="text-white font-raleway text-3xl">
              {userPredictions[0]?.first_name +
                " " +
                userPredictions[0]?.last_name}
            </span>
            <div className="text-[#ffffff60] font-poppins text-lg">
              Area of Accuracy :{" "}
              <span className="text-primary400">
                {userPredictions[0]?.category}
              </span>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex items-center gap-4 w-full justify-center">
          <div className="w-20 h-20 rounded-full bg-[#ffffff30] animate-pulse" />
          <div className="flex flex-col justify-around h-full gap-2">
            <span className="w-56 h-8 rounded-full bg-[#ffffff30] animate-pulse" />
            <span className="w-44 h-6 rounded-full bg-[#ffffff30] animate-pulse" />
          </div>
        </div>
      )}
      <div className="w-full flex justify-center py-6">
        <div className="w-4/5 grid grid-cols-4 font-raleway gap-4">
          <div className="flex border border-[#ffffff30] rounded-lg p-4 flex-col gap-2 hover:shadow-md hover:shadow-[#ffffff30] transition-all ease-in-out duration-200">
            <MdPendingActions className="w-8 h-8 p-1 rounded-full bg-[#ffffff90] text-primary " />
            <span className="text-[#ffffff60] text-[16px]">
              Pending Predictions
            </span>
            <span className="text-[24px] text-white">0</span>
          </div>
          <div className="flex border border-[#ffffff30] rounded-lg p-4 flex-col gap-2 hover:shadow-md hover:shadow-[#ffffff30] transition-all ease-in-out duration-200">
            <CgShutterstock className="w-8 h-8 p-1 rounded-full bg-[#ffffff90] text-primary " />
            <span className="text-[#ffffff60] text-[16px]">
              Due to Settle in 2024
            </span>
            <span className="text-[24px] text-white">0</span>
          </div>
          <div className="flex border border-[#ffffff30] rounded-lg p-4 flex-col gap-2 hover:shadow-md hover:shadow-[#ffffff30] transition-all ease-in-out duration-200">
            <FaChartLine className="w-8 h-8 p-1 rounded-full bg-[#ffffff90] text-primary " />
            <span className="text-[#ffffff60] text-[16px]">
              Have Open Markets
            </span>
            <span className="text-[24px] text-white">1</span>
          </div>
          <div className="flex border border-[#ffffff30] rounded-lg p-4 flex-col gap-2 hover:shadow-md hover:shadow-[#ffffff30] transition-all ease-in-out duration-200">
            <IoAnalyticsOutline className="w-8 h-8 p-1 rounded-full bg-[#ffffff90] text-primary " />
            <span className="text-[#ffffff60] text-[16px]">Current Streak</span>
            <span className="text-[24px] text-white">1</span>
          </div>
        </div>
      </div>
      <div className="w-full flex justify-center py-4">
        {userData?.length > 0 && <Tabs items={items} />}
      </div>
    </div>
  );
};

export default Leader;
