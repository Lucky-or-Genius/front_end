import React, { useEffect, useState } from "react";
import { FaArrowLeftLong } from "react-icons/fa6";
import { useNavigate, useParams, Link } from "react-router-dom";
import { getSinglePrediction } from "../services/Predictions.service";
import PredictorCard from "../components/newPrediction/predictor-card";
import { CgShutterstock } from "react-icons/cg";
import { FaChartLine } from "react-icons/fa";
import { MdPendingActions } from "react-icons/md";
import Tabs from "../components/common/tabs";

const Predictor = () => {
  const navigate = useNavigate();
  const id = useParams().id;
  const [predictionData, setPredictionData] = useState();
  const [openRow, setOpenRow] = useState(true);

  const clearData = (rawData) => {
    if (typeof rawData === "string") {
      const cleanData = rawData.replace(/\\n/g, "\n").replace(/^\["|"\]$/g, "");
      return cleanData.split("\n").filter((line) => line.trim() !== "");
    }
    return [];
  };

  const handleClick = () => {
    setOpenRow(!openRow);
  };

  useEffect(() => {
    const fetchUserData = async () => {
      const res = await getSinglePrediction(id);
      setPredictionData(res.data);
    };

    fetchUserData();
  }, [id]);

  const items = [
    {
      content: (
        <div className="font-poppins text-white text-sm md:text-base">
          {predictionData?.length > 0 && predictionData[0]?.justification}
        </div>
      ),
      title: "Justification",
    },
    {
      content: (
        <div className="font-poppins text-white text-sm md:text-base">
          {predictionData?.length > 0 &&
            clearData(predictionData[0]?.summaries).map((point, idx) => (
              <li key={idx} style={{ marginBottom: "10px" }}>
                {point}
              </li>
            ))}
        </div>
      ),
      title: "Summaries",
    },
    {
      content: (
        <div>
          {predictionData?.length > 0 &&
            predictionData[0]?.sources.map((val, index) => {
              return (
                <div
                  className="font-poppins text-white text-sm md:text-base w-full"
                  key={index}
                >
                  {clearData(val).map((point, idx) => (
                    <li key={idx} className="flex flex-wrap">
                      {point}
                    </li>
                  ))}
                </div>
              );
            })}
        </div>
      ),
      title: "Sources",
    },
  ];

  return (
    <div className="bg-primary min-h-screen w-full p-4 2md:p-8 overflow-y-auto h-full relative flex flex-col items-center">
      <div>
        <div
          className="absolute left-4 md:left-10 top-4 md:top-10 text-[#ffffff60] hover:text-white transition-all ease-in-out font-raleway flex gap-2 items-center cursor-pointer"
          onClick={() => navigate(-1)}
        >
          <FaArrowLeftLong /> Back
        </div>
      </div>

      {predictionData?.length > 0 ? (
        <>
          <div className="flex flex-col items-center md:flex-row gap-4 md:gap-6 w-full justify-center">
            <img
              src={predictionData[0]?.image_url}
              alt=""
              width={100}
              height={100}
              className="w-14 h-14 rounded-full object-cover"
            />
            <Link
              className="text-white font-raleway text-3xl"
              to={`/dashboard/LeaderBoards/${predictionData[0]?.user_id}`}
            >
              {predictionData[0]?.first_name +
                " " +
                predictionData[0]?.last_name}
            </Link>
          </div>

          <div className="w-full md:w-4/5 grid grid-cols-2 md:grid-cols-4 font-raleway gap-4 py-10">
            <div className="flex border border-[#ffffff30] rounded-lg p-4 flex-col gap-2 hover:shadow-md hover:shadow-[#ffffff30] transition-all ease-in-out duration-200">
              <MdPendingActions className="w-8 h-8 p-1 rounded-full bg-[#ffffff90] text-primary " />
              <span className="text-[#ffffff60] text-[16px]">
                Pending Predictions
              </span>
              <span className="text-[24px] text-white">
                {predictionData[0]?.all_pending_predictions}
              </span>
            </div>
            <div className="flex border border-[#ffffff30] rounded-lg p-4 flex-col gap-2 hover:shadow-md hover:shadow-[#ffffff30] transition-all ease-in-out duration-200">
              <CgShutterstock className="w-8 h-8 p-1 rounded-full bg-[#ffffff90] text-primary " />
              <span className="text-[#ffffff60] text-[16px]">
                Total Predictions
              </span>
              <span className="text-[24px] text-white">
                {predictionData[0]?.all_predictions}
              </span>
            </div>
            <div className="flex border border-[#ffffff30] rounded-lg p-4 flex-col gap-2 hover:shadow-md hover:shadow-[#ffffff30] transition-all ease-in-out duration-200">
              <FaChartLine className="w-8 h-8 p-1 rounded-full bg-[#ffffff90] text-primary " />
              <span className="text-[#ffffff60] text-[16px]">
                Predictor Accuracy
              </span>
              <span className="text-[24px] text-white">
                {predictionData[0]?.prediction_accuracy} %
              </span>
            </div>
            <div className="flex border border-[#ffffff30] rounded-lg p-4 flex-col gap-2 hover:shadow-md hover:shadow-[#ffffff30] transition-all ease-in-out duration-200">
              <FaChartLine className="w-8 h-8 p-1 rounded-full bg-[#ffffff90] text-primary " />
              <span className="text-[#ffffff60] text-[16px]">
                Current Streak
              </span>
              <span className="text-[24px] text-white">
                {predictionData[0]?.current_streak}
              </span>
            </div>
          </div>
        </>
      ) : (
        <div className="flex items-center gap-4 w-full justify-center flex-col md:flex-row">
          <div className="w-20 h-20 rounded-full bg-[#ffffff30] animate-pulse" />
          <span className="w-56 h-8 rounded-full bg-[#ffffff30] animate-pulse" />
        </div>
      )}

      <div className="py-8 w-full flex justify-center items-center">
        {predictionData?.length > 0 && (
          <PredictorCard
            predictionData={predictionData}
            onCardClick={handleClick}
            isOpen={openRow}
          />
        )}
      </div>
      <div className="w-full flex justify-center pb-4">
        {predictionData?.length > 0 && <Tabs items={items} />}
      </div>
    </div>
  );
};

export default Predictor;
