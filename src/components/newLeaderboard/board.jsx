import React from "react";

import { IoMdHeartEmpty, IoMdHeart } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";

import Skeleton from "./skeleton";

const Board = ({ data, toggleFavourite }) => {
  const navigate = useNavigate();
  const Headings = [
    "Rank",
    "Name",
    "Accuracy",
    "Points",
    "Bankroll",
    "Predictions",
    "Favourite",
  ];

  return (
    <div className="flex w-full justify-start lg:justify-center gap-4 h-full md:px-6 overflow-y-hidden">
      <div className="min-w-[850px] overflow-x-auto w-full md:h-4/6 lg:w-5/6 rounded-2xl bg-[#ffffff10] overflow-y-hidden h-full p-4 relative">
        {/* Table Headings */}
        <div className="grid grid-cols-8 border-b pb-4 gap-4 border-gray-500 w-full px-3 sticky top-0 z-30">
          {Headings.map((item, i) => (
            <span
              className={`${
                item === "Name" ? "col-span-2" : "col-span-1"
              } w-full text-gray-400 font-raleway font-semibold`}
              key={i}
            >
              {item}
            </span>
          ))}
        </div>

        {/* Table Content */}
        {data.length > 0 ? (
          <div className="h-full overflow-y-auto pb-4">
            {data.map((item, index) => (
              <Link
                to={`/dashboard/LeaderBoards/${item.user_id}`}
                key={index}
                className={`${
                  index % 2 === 1 ? "bg-[#ffffff05]" : ""
                } grid grid-cols-8 w-full py-4 px-2 gap-4 rounded-xl hover:bg-[#ffffff10] transition-all ease-in-out font-poppins cursor-pointer hover:scale-[1.005]`}
              >
                <div className="">
                  {item?.rank === 1 ? (
                    <img alt="rank-1" src="/goldmedal-1.svg" className="w-6" />
                  ) : item?.rank === 2 ? (
                    <img alt="rank-2" src="/goldmedal-2.svg" className="w-6" />
                  ) : item?.rank === 3 ? (
                    <img alt="rank-3" src="/goldmedal-3.svg" className="w-6" />
                  ) : (
                    <div className="px-2 text-white">{item?.rank}</div>
                  )}
                </div>
                <div className="col-span-2 flex items-center gap-2">
                  <img
                    src={item.image_url}
                    alt="profile"
                    width={40}
                    height={40}
                    className="rounded-full w-6 h-6 object-cover"
                  />
                  <div className="w-fit truncate ">
                    <Link
                      to={`/dashboard/LeaderBoards/${item.user_id}`}
                      className="text-white hover:underline hover:text-primary400 "
                    >
                      {item.first_name + " " + item.last_name}
                    </Link>
                  </div>
                </div>
                <div className="text-white">
                  {Math.round(item.prediction_accuracy)} %
                </div>
                <div className="text-white">
                  {Math.round(item.total_user_score)}
                </div>
                <div className="text-white">
                  {item.bankroll < 0
                    ? `-$${Math.abs(item.bankroll)}`
                    : `$${item.bankroll}`}
                </div>
                <div
                  className="text-white hover:text-primary400"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    navigate(
                      `/dashboard/LeaderBoards/${item.user_id}?defaultOpen=predictions`
                    );
                  }}
                >
                  {item.total_predictions}
                </div>
                <div className="">
                  {item.is_favourite ? (
                    <IoMdHeart
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        toggleFavourite(index, item?.user_id);
                      }}
                      className="cursor-pointer text-error  text-xl active:scale-95 transition-all hover:scale-105"
                    />
                  ) : (
                    <IoMdHeartEmpty
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        toggleFavourite(index, item?.user_id);
                      }}
                      className="cursor-pointer text-[#ffffff60] text-xl active:scale-95 transition-all hover:scale-105"
                    />
                  )}
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <Skeleton />
        )}
      </div>
    </div>
  );
};

export default Board;
