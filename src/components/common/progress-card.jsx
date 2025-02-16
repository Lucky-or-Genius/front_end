import React from "react";

const ProgressCard = ({ className, totalPredictions, status, value, icon }) => {
  // Calculate percentage
  const percentage = Math.round((value / totalPredictions) * 100);

  return (
    <div
      className={`${className} w-full md:w-[350px] bg-[#ffffff10] rounded-xl relative overflow-hidden px-4 py-2 hover:scale-[1.02] hover:shadow-lg transition-all ease-in-out`}
    >
      {/* Content */}
      <div className="relative z-10">
        <div className="text-gray-400  font-raleway font-semibold md:text-lg">
          {status} Predictions
        </div>

        <div className="flex pb-2 w-full justify-between items-end  font-poppins ">
          <span
            className={`${
              status === "True"
                ? "text-green-500"
                : status === "False"
                ? "text-red-500"
                : status === "Partially True"
                ? "text-green-700"
                : "text-yellow-500"
            } text-3xl font-semibold`}
          >
            {value}/{totalPredictions}
          </span>
          <span className="font-semibold text-xs md:text-sm text-gray-400">
            {percentage}%
          </span>
        </div>
      </div>

      {/* Bottom progress bar */}
      <div className="absolute bottom-0 left-0 w-full h-8 overflow-hidden">
        <div className="w-full h-1.5 bg-[#ffffff20] absolute bottom-0 left-0">
          <div
            className={`${
              status === "True"
                ? "bg-green-500"
                : status === "False"
                ? "bg-red-500"
                : status === "Partially True"
                ? "bg-green-700"
                : "bg-yellow-500"
            }  bottom-0 left-0 aboslute h-1.5`}
            style={{ width: `${percentage}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default ProgressCard;
