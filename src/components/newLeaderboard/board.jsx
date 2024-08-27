import React from "react";

import { IoMdHeartEmpty, IoMdHeart } from "react-icons/io";
import { Popover } from "antd";
import { Link } from "react-router-dom";

const Board = ({ data }) => {
  return (
    <div className="flex w-full justify-center gap-4 h-full font-poppins md:px-8 px-0">
      <div className="bg-[#ffffff20] flex justify-start min-w-full md:min-w-[500px] rounded-xl p-2 overflow-y-auto h-fit md:h-4/6 flex-col gap-2 items-center">
        {data.map((item, index) => (
          <div
            className="flex items-center gap-4 justify-between w-full hover:bg-[#ffffff10] hover:rounded-lg p-2"
            key={index}
          >
            <div className="flex items-center gap-4 text-base">
              {item.is_favourite ? (
                <IoMdHeart
                  // onClick={() => toggleFavourite(index, val?.user_id)}
                  className="cursor-pointer text-error  text-xl"
                />
              ) : (
                <IoMdHeartEmpty
                  // onClick={() => toggleFavourite(index, val?.user_id)}
                  className="cursor-pointer text-[#ffffff60] text-xl"
                />
              )}
            </div>
            <div className="flex items-center gap-3 w-full">
              <img
                src={item.image_url}
                alt="profile"
                width={40}
                height={40}
                className="rounded-full w-10 h-10 object-cover"
              />
              <div className="flex flex-col w-full">
                <div className="w-fit">
                  <Popover
                    content={
                      <>
                        <div className="flex gap-2 pb-2 font-raleway ">
                          <img
                            src={item.image_url}
                            alt="profile"
                            width={40}
                            height={40}
                            className="rounded-full w-10 h-10 object-cover"
                          />
                          <div className="font-[600]">
                            <span className="text-sm ">
                              {item.first_name + " " + item.last_name}
                            </span>
                            <div className="text-gray-400 text-xs">
                              <span className="">{item.total_predictions}</span>{" "}
                              Predictions
                            </div>
                          </div>
                        </div>
                        <div className="flex w-full justify-between font-[600]">
                          <div className="flex flex-col w-fit font-raleway items-center">
                            Points
                            <span className="text-gray-400 text-xs">
                              {Math.round(item.total_user_score)}
                            </span>
                          </div>
                          <div className="flex flex-col w-fit font-raleway items-center">
                            Bankroll
                            <span className="text-gray-400 text-xs">
                              {item.bankroll < 0
                                ? `-$${Math.abs(item.bankroll)}`
                                : `$${item.bankroll}`}
                            </span>
                          </div>
                        </div>
                      </>
                    }
                    title=""
                    trigger="hover"
                  >
                    <Link
                      to={`/dashboard/LeaderBoards/${item.user_id}`}
                      className="cursor-pointer text-white text-[20px] hover:underline hover:text-primary400"
                    >
                      {item.first_name + " " + item.last_name}
                    </Link>
                  </Popover>
                </div>
                <div className="flex gap-2 w-full text-[#ffffff60] items-center">
                  <Link
                    className="text-[#ffffff60] text-xs"
                    to={`/dashboard/LeaderBoards/${item.user_id}?defaultOpen=predictions`}
                  >
                    <span className="text-primary400">
                      {item.total_predictions}
                    </span>{" "}
                    Predictions
                  </Link>
                  <span className="text-[#ffffff60] text-lg"> |</span>
                  <div className="text-[#ffffff60] text-xs">
                    <span className="text-primary400">
                      {Math.round(item.prediction_accuracy)} %
                    </span>{" "}
                    Accuracy
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Board;
