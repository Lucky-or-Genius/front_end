import React, { useCallback, useEffect, useState } from "react";

import { Popover } from "antd";
import CircularProgress from "./circular-progress";
import { getUserDetails } from "../../services/Profiles.service";

const HoverDetails = ({ id }) => {
  const [data, setData] = useState("");
  const getDetails = useCallback(async (id) => {
    try {
      const res = await getUserDetails(id);
      setData(res.data);
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    getDetails(id);
  }, [getDetails, id]);

  const ProgressCard = ({ className, totalPredictions, status, value }) => {
    // Calculate percentage
    const percentage = Math.round((value / totalPredictions) * 100);

    return (
      <div
        className={`${className} w-full bg-[#00000030] rounded-xl relative overflow-hidden px-2 py-1 hover:scale-[1.005] hover:shadow-lg transition-all ease-in-out`}
      >
        {/* Content */}
        <div className="relative z-10">
          <div className="text-gray-300 font-raleway font-semibold text-[10px]">
            {status} Predictions
          </div>

          <div className="flex w-full justify-between items-end font-poppins ">
            <span
              className={`${
                status === "True"
                  ? "text-green-500"
                  : status === "False"
                  ? "text-red-500"
                  : "text-yellow-500"
              } text-lg font-semibold`}
            >
              {value}/{totalPredictions}
            </span>
          </div>
        </div>

        {/* Bottom progress bar */}
        <div className="absolute bottom-0 left-0 w-full h-8 overflow-hidden">
          <div className="w-full h-1 bg-[#ffffff20] absolute bottom-0 left-0">
            <div
              className={`${
                status === "True"
                  ? "bg-green-500"
                  : status === "False"
                  ? "bg-red-500"
                  : "bg-yellow-500"
              }  bottom-0 left-0 aboslute h-1`}
              style={{ width: `${percentage}%` }}
            ></div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div>
      <Popover
        content={
          <>
            <div className="flex gap-2 pb-2 items-center font-raleway justify-start w-full">
              <img
                src={data?.image_url}
                alt="profile"
                width={40}
                height={40}
                className="rounded-full w-14 h-14 object-cover"
              />
              <div className=" flex font-[600] flex-col gap-1">
                <span className="text-xl text-white">
                  {data?.first_name + " " + data?.last_name}
                </span>
                <span className="text-gray-300 text-xs font-raleway">
                  {data?.occupation}
                </span>
              </div>
            </div>
            <div className="h-fit w-full flex justify-center gap-4 pt-2 items-center">
              <CircularProgress
                percentage={Math.round(data?.prediction_accuracy * 100)}
                size={120}
                strokeWidth={12}
                className={"text-xs"}
              />
              <div className="flex flex-col gap-3">
                <ProgressCard
                  totalPredictions={data?.total_predictions_count}
                  value={data?.true_predictions_count}
                  status={"True"}
                />
                <ProgressCard
                  totalPredictions={data?.total_predictions_count}
                  value={data?.false_predictions_count}
                  status={"False"}
                />
              </div>
            </div>
          </>
        }
        title=""
        trigger="hover"
        overlayInnerStyle={{
          backgroundColor: "#ffffff20",
          borderRadius: "10px",
          backdropFilter: "blur(12px)",
          maxWidth: "300px",
        }}
      >
        {data ? data?.first_name + " " + data?.last_name : ""}
      </Popover>
    </div>
  );
};

export default HoverDetails;
