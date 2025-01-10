import React, { useRef } from "react";

import CompanyLogo from "../../assets/logo.png";

const PredictionImage = ({ predictor, occupation }) => {
  const imageRef = useRef();

  return (
    <div
      ref={imageRef}
      className="w-[600px] h-[250px] border-none bg-gradient-to-tr from-sky-950 to-cyan-400 text-white rounded-lg px-10 pt-4 flex flex-col items-center"
    >
      <div className="flex justify-center items-center w-full pb-4 border-none w-full">
        <img src={CompanyLogo} alt="Company Logo" className="h-10" />
      </div>
      <div className="flex flex-col items-center border-none gap-4 bg-white rounded-t-xl w-full p-4 shadow-lg">
        <div className="flex items-center gap-4">
          <img
            src={predictor[0]?.image_url}
            alt={
              predictor[0]?.first_name + predictor[0]?.last_name || "Predictor"
            }
            className="w-12 h-12 rounded-lg object-cover border-none"
          />
          <div className="flex flex-col font-semibold font-raleway">
            <span className="text-lg text-black">
              {predictor[0]?.first_name + predictor[0]?.last_name ||
                "Predictor"}
            </span>
            <span className="text-sm text-gray-500 ">
              {occupation || "N/A"}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-6 w-full border-none">
          <div className="flex flex-col font-semibold justify-center border-none items-center bg-gray-200 rounded-lg p-2">
            <span className="text-gray-500 font-raleway">
              Prediction Accuracy
            </span>
            <span className="font-semibold ml-2 font-poppins text-black border-none">
              {predictor[0]?.prediction_accuracy || "N/A"}%
            </span>
          </div>
          <div className="flex flex-col font-semibold justify-center border-none items-center bg-gray-200 rounded-lg p-2">
            <span className="text-gray-500 font-raleway border-none">
              Total Predictions
            </span>
            <span className="font-semibold ml-2 font-poppins text-black border-none">
              {predictor[0]?.all_predictions || "N/A"}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PredictionImage;
