import React from "react";
import { IoMdHeartEmpty, IoMdHeart } from "react-icons/io";
import { Popover } from "antd";
import { Link } from "react-router-dom";

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
              alt="image"
              width={40}
              height={40}
              className="rounded-full w-10 h-10 object-cover"
            />
            <div className="flex flex-col w-full">
              <div className="w-fit">
                <Popover
                  content={
                    <>
                      <div className="flex gap-2 pb-2 font-raleway">
                        <img
                          src={item?.image_url}
                          alt="image"
                          className=""
                          width={40}
                          height={40}
                          className="rounded-full w-10 h-10 object-cover"
                        />
                        <div className="">
                          <span className="text-sm">
                            {item?.first_name + " " + item?.last_name}
                          </span>
                          <div className="text-gray-400 text-xs">
                            <span className="">{item?.total_predictions}</span>{" "}
                            Predictions
                          </div>
                        </div>
                      </div>
                      <div className="flex w-full justify-between">
                        <div className="flex flex-col w-fit font-raleway items-center">
                          Points
                          <span className="text-gray-400 text-xs">
                            {Math.round(item?.total_user_score)}
                          </span>
                        </div>
                        <div className="flex flex-col w-fit font-raleway items-center">
                          Bankroll
                          <span className="text-gray-400 text-xs">
                            {item?.bankroll < 0
                              ? `-$${Math.abs(item?.bankroll)}`
                              : `$${item?.bankroll}`}
                          </span>
                        </div>
                      </div>
                    </>
                  }
                  title=""
                  trigger="hover"
                >
                  <Link
                    to={`/dashboard/LeaderBoards/${item?.user_id}`}
                    className="cursor-pointer text-white text-[20px] hover:underline hover:text-primary400"
                  >
                    {item?.first_name + " " + item?.last_name}
                  </Link>
                </Popover>
              </div>
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
