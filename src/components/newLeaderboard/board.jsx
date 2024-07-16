import React from "react";

import { IoMdHeartEmpty, IoMdHeart } from "react-icons/io";
import { Popover } from "antd";
import Image from "../../assets/hover_info2.png";
import { Link } from "react-router-dom";

const Board = ({ data }) => {
  return (
    <div className="flex w-full justify-center gap-4 h-full font-poppins">
      <div className="bg-[#ffffff20] flex justify-start w-2/5 rounded-xl p-2 overflow-y-auto h-4/6 flex-col gap-2 divide-y divide-[#ffffff60] items-center">
        {data.map((item, index) => (
          <div
            className="flex items-center justify-between w-full hover:bg-[#ffffff10] hover:rounded-lg p-2"
            key={index}
          >
            <div className="flex items-center gap-3">
              <img
                src={item.image_url}
                alt="image"
                className=""
                width={40}
                height={40}
                className="rounded-full w-10 h-10 object-cover"
              />
              <div className="flex flex-col">
                <Popover
                  content={
                    <>
                      <div className="flex flex-col font-raleway items-center">
                        Points
                        <span className="">
                          {Math.round(item.total_user_score)}
                        </span>
                      </div>
                    </>
                  }
                  title=""
                  trigger="hover"
                >
                  <Link
                    to={`/dashboard/LeaderBoards/${item.user_id}`}
                    className="cursor-pointer text-white text-base hover:underline hover:text-primary400"
                  >
                    {item.first_name + " " + item.last_name}
                  </Link>
                </Popover>
                <div className="text-[#ffffff60] text-sm">
                  Prediction Accuracy :{" "}
                  <span className="text-white">
                    {Math.round(item.prediction_accuracy)} %
                  </span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-4 text-base">
              <span
                className=""
                style={{
                  color: item.bankroll < 0 ? "#ff4242" : "#ffffff",
                }}
              >
                {item.bankroll < 0
                  ? `-$${Math.abs(item.bankroll)}`
                  : `$${item.bankroll}`}
              </span>

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
          </div>
        ))}
      </div>
    </div>
  );
};

export default Board;
