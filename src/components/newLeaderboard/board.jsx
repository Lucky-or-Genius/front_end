import React from "react";

import { IoMdHeartEmpty, IoMdHeart } from "react-icons/io";
import { Popover } from "antd";
import { Link } from "react-router-dom";

const Board = ({ data, toggleFavourite }) => {
  return (
    <div className="flex w-full justify-center gap-4 h-full font-poppins md:px-8 px-0">
      <div className="bg-[#ffffff20] flex justify-start w-full rounded-xl p-2 overflow-y-auto h-fit md:h-4/6 lg:w-5/6 flex-col gap-2 items-center">
        {data?.map((item, index) => (
          <div
            className="flex items-center gap-4 md:justify-between w-full hover:bg-[#ffffff10] hover:rounded-lg p-2 flex-col md:flex-row"
            key={index}
          >
            {" "}
            <div className="flex gap-4 items-center w-full md:w-fit">
              <div className="">
                {item?.rank === 1 ? (
                  <img alt="rank-1" src="/goldmedal-1.svg" className="w-10" />
                ) : item?.rank === 2 ? (
                  <img alt="rank-2" src="/goldmedal-2.svg" className="w-10" />
                ) : item?.rank === 3 ? (
                  <img alt="rank-3" src="/goldmedal-3.svg" className="w-10" />
                ) : (
                  <div className="bg-[#ffffff40] rounded-full h-8 w-8 flex items-center justify-center text-white">
                    {" "}
                    {item?.rank}
                  </div>
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
                      className="cursor-pointer text-white text-base lg:text-[20px] hover:underline hover:text-primary400"
                    >
                      {item.first_name + " " + item.last_name}
                    </Link>
                  </Popover>
                </div>
              </div>
              <div className="md:hidden flex items-center gap-4 text-base">
                {item.is_favourite ? (
                  <IoMdHeart
                    onClick={() => toggleFavourite(index, item?.user_id)}
                    className="cursor-pointer text-error  text-xl"
                  />
                ) : (
                  <IoMdHeartEmpty
                    onClick={() => toggleFavourite(index, item?.user_id)}
                    className="cursor-pointer text-[#ffffff60] text-xl"
                  />
                )}
              </div>
            </div>
            <div className="flex gap-4 w-full md:w-fit">
              <div className="grid lg:grid-cols-4 grid-cols-2 gap-2 w-full text-[#ffffff60] items-center">
                <div className="text-[#ffffff60] text-xs gap-2 px-4 border border-[#ffffff60] flex-col flex items-center  py-2 rounded-lg ">
                  Accuracy
                  <span className="text-white">
                    {Math.round(item.prediction_accuracy)} %
                  </span>
                </div>
                <div className="text-[#ffffff60] text-xs gap-2 px-4 border border-[#ffffff60] flex-col flex items-center  py-2 rounded-lg ">
                  Points
                  <span className="text-white">
                    {Math.round(item.total_user_score)}
                  </span>
                </div>
                <div className="text-[#ffffff60] text-xs gap-2 px-4 border border-[#ffffff60] flex-col flex items-center  py-2 rounded-lg ">
                  Bankroll
                  <span className="text-white">
                    {item.bankroll < 0
                      ? `-$${Math.abs(item.bankroll)}`
                      : `$${item.bankroll}`}
                  </span>
                </div>
                <Link
                  className="text-white text-xs py-2  gap-2 px-4 rounded-lg bg-[#ffffff20] hover:bg-[#ffffff40] border border-[#ffffff60] flex-col flex items-center"
                  to={`/dashboard/LeaderBoards/${item.user_id}?defaultOpen=predictions`}
                >
                  {" "}
                  Predictions
                  <span className="">{item.total_predictions}</span>
                </Link>
              </div>
              <div className="hidden md:flex items-center gap-4 text-base">
                {item.is_favourite ? (
                  <IoMdHeart
                    onClick={() => toggleFavourite(index, item?.user_id)}
                    className="cursor-pointer text-error  text-xl active:scale-95 transition-all hover:scale-105"
                  />
                ) : (
                  <IoMdHeartEmpty
                    onClick={() => toggleFavourite(index, item?.user_id)}
                    className="cursor-pointer text-[#ffffff60] text-xl active:scale-95 transition-all hover:scale-105"
                  />
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Board;
