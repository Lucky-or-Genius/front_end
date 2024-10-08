import React, { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { FaArrowLeftLong } from "react-icons/fa6";
import { CgShutterstock } from "react-icons/cg";
import { FaChartLine } from "react-icons/fa";
import { MdPendingActions } from "react-icons/md";

import { getSinglePrediction } from "../services/Predictions.service";
import PredictorCard from "../components/newPrediction/predictor-card";
import { transformApiResponse } from "../utils/convertToResponse";
import Evidences from "../components/newPrediction/evidences";

const Predictor = () => {
  const navigate = useNavigate();
  const id = useParams().id;
  const [predictionData, setPredictionData] = useState([]);
  const [openRow, setOpenRow] = useState(true);

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
              className="text-white font-raleway text-3xl font-semibold"
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

      <div className=" pb-6 pt-8 w-full flex justify-center items-center">
        {predictionData?.length > 0 && (
          <PredictorCard
            predictionData={predictionData}
            onCardClick={handleClick}
            isOpen={openRow}
          />
        )}
      </div>

      <div className="bg-[#ffffff20] p-4 md:p-6 rounded-lg 2md:w-4/5 w-full flex flex-col gap-3">
        <span className="text-white font-semibold font-raleway text-xl md:text-2xl">
          Prediction Synopsis
        </span>

        <div className="text-[#ffffff80] text-lg font-raleway font-semibold">
          The Prediction Status is{" "}
          {
            <span
              className="font-bold rounded-full px-2"
              style={{
                color:
                  predictionData[0]?.prediction_validation === "PENDING"
                    ? "#c2964b"
                    : predictionData[0]?.prediction_validation === "TRUE"
                    ? "#23B678"
                    : predictionData[0]?.prediction_validation ===
                      "PARTIALLY TRUE"
                    ? "#388E3C"
                    : "#E72E2E",
                backgroundColor:
                  predictionData[0]?.prediction_validation === "PENDING"
                    ? "#c2964b30"
                    : predictionData[0]?.prediction_validation === "TRUE"
                    ? "#23B67830"
                    : predictionData[0]?.prediction_validation ===
                      "PARTIALLY TRUE"
                    ? "#388E3C30"
                    : "#E72E2E30",
              }}
            >
              # {predictionData[0]?.prediction_validation}
            </span>
          }
        </div>
        <p className=" font-poppins text-lg text-[#ffffff80]">
          {predictionData[0]?.justification}
        </p>
      </div>
      {predictionData[0]?.structured_results !== null ? (
        <div className="bg-[#ffffff20] p-4 md:p-6 rounded-lg 2md:w-4/5 w-full flex flex-col gap-3 mt-6">
          <span className="text-white font-semibold font-raleway text-xl md:text-2xl">
            Sources & Justification
          </span>

          <div className="flex w-full gap-6 py-4 items-center flex-col">
            <Evidences
              data={
                predictionData?.length > 0 &&
                transformApiResponse(predictionData[0]?.structured_results)
              }
            />
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default Predictor;
