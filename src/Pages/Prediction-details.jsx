import React, { useEffect, useState } from "react";
import { FaArrowLeftLong } from "react-icons/fa6";
import { useNavigate, useParams } from "react-router-dom";
import { getSinglePrediction } from "../services/Predictions.service";
import PredictorCard from "../components/newPrediction/predictor-card";
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
        <div className="font-poppins text-white text-[14px] md:text-[18px]">
          {predictionData?.length > 0 && predictionData[0]?.justification}
        </div>
      ),
      title: "Justification",
    },
    {
      content: (
        <div className="font-poppins text-white text-[14px] md:text-[18px]">
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
                  className="font-poppins text-white text-[14px] md:text-[18px]"
                  key={index}
                >
                  {clearData(val).map((point, idx) => (
                    <li key={idx}>{point}</li>
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
          className="absolute left-10 top-10 text-[#ffffff60] hover:text-white transition-all ease-in-out font-raleway flex gap-2 items-center cursor-pointer"
          onClick={() => navigate(-1)}
        >
          <FaArrowLeftLong /> Back
        </div>
      </div>
      {predictionData?.length > 0 ? (
        <div className="flex items-center gap-6 w-full justify-center">
          <img
            src={predictionData[0]?.image_url}
            alt=""
            width={100}
            height={100}
            className="w-20 h-20 rounded-full object-cover"
          />
          <div className="flex flex-col justify-around h-full">
            <span className="text-white font-raleway text-3xl">
              {predictionData[0]?.first_name +
                " " +
                predictionData[0]?.last_name}
            </span>
            <div className="text-[#ffffff60] font-poppins text-lg">
              Area of Accuracy :{" "}
              <span className="text-primary400">
                {predictionData[0]?.category}
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
