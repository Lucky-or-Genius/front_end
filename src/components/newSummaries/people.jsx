import React from "react";
import { Link } from "react-router-dom";

import HoverDetails from "../common/hover-details";

const People = ({ peopleData }) => {
  return (
    <div className="font-poppins grid grid-cols-1 md:grid-cols-3 gap-4">
      {peopleData.map((item, index) => (
        <div
          className="flex items-center gap-4 justify-between w-full hover:bg-[#ffffff10] rounded-lg p-2 border border-[#ffffff20]"
          key={index}
        >
          <div className="flex items-center gap-3 w-full">
            <img
              src={item?.image_url}
              alt="profile"
              width={40}
              height={40}
              className="rounded-full w-10 h-10 object-cover"
            />
            <div className="flex flex-col w-full">
              <Link
                to={`/dashboard/LeaderBoards/${item.user_id}`}
                className="text-white text-lg md:text-xl hover:underline hover:text-primary400 "
              >
                <HoverDetails id={item.user_id} />
              </Link>
              <div className="flex gap-2 w-full text-[#ffffff60] items-center">
                <Link
                  className="text-[#ffffff60] text-xs"
                  to={`/dashboard/LeaderBoards/${item?.user_id}?defaultOpen=predictions`}
                >
                  <span className="text-primary400">
                    {item?.total_predictions}
                  </span>{" "}
                  Predictions
                </Link>
                <span className="text-[#ffffff60] text-lg"> |</span>
                <div className="text-[#ffffff60] text-xs">
                  <span className="text-primary400">
                    {Math.round(item?.accuracy_score)}%
                  </span>{" "}
                  Accuracy
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default People;
