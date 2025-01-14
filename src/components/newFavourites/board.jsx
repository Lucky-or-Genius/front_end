import React from "react";

import { IoMdHeart } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import { addRemoveFavourite } from "../../services/Leaderboards.service";
import Skeleton from "../newLeaderboard/skeleton";
import { useAppContext } from "../../utils/appContext";

const Board = ({ data, setPredictors }) => {
  const { user, login } = useAppContext();
  const navigate = useNavigate();
  const Headings = [
    "Rank",
    "Name",
    "Accuracy",
    "Predictions",
    "Points",
    "Bankroll",
    "Favourite",
  ];

  const toggleFavourite = async (id) => {
    try {
      if (!user) {
        await login();
      }
    } catch (error) {
      console.error("Error during login:", error);
      toast.error("Login process interrupted. Please try again.");
      return;
    }

    const accountId = user?.accountId;

    if (!accountId) {
      return;
    }
    const params = {
      accountId: String(accountId),
      predictorId: id,
    };
    const newData = data.filter((obj) => obj.user_id !== id);
    setPredictors(newData);
    addRemoveFavourite(params);
  };

  return (
    <div className="flex w-full justify-start lg:justify-center gap-4 h-full md:px-6 overflow-y-hidden">
      <div className="min-w-[850px] overflow-x-auto w-full rounded-2xl bg-[#ffffff10] overflow-y-hidden h-full p-4 relative">
        {/* Table Headings */}
        <div className="grid grid-cols-15 border-b pb-4 gap-4 border-gray-500 w-full px-3 sticky top-0 z-30">
          {Headings.map((item, i) => (
            <span
              className={`${
                item === "Name"
                  ? "col-span-4 text-start"
                  : item === "Rank"
                  ? "col-span-1 text-start"
                  : "col-span-2 text-center"
              } w-full text-gray-400 font-raleway font-semibold`}
              key={i}
            >
              {item}
            </span>
          ))}
        </div>

        {/* Table Content */}
        {data.length > 0 ? (
          <div className="h-full overflow-y-auto pb-4 overflow-x-hidden">
            {data.map((item, index) => (
              <Link
                to={`/dashboard/LeaderBoards/${item.user_id}`}
                key={index}
                className={`${
                  index % 2 === 1 ? "bg-[#ffffff05]" : ""
                } grid grid-cols-15 w-full py-4 px-2 gap-4 rounded-xl hover:bg-[#ffffff10] transition-all ease-in-out font-poppins cursor-pointer hover:scale-[1.005]`}
              >
                <div className=" col-span-1">
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
                <div className="col-span-4 flex items-center gap-2">
                  <img
                    src={item.image_url}
                    alt="profile"
                    width={40}
                    height={40}
                    className="rounded-full w-7 h-7 object-cover"
                  />
                  <div className="w-fit truncate">
                    <Link
                      to={`/dashboard/LeaderBoards/${item.user_id}`}
                      className="text-white hover:underline hover:text-primary400 "
                    >
                      {item.first_name + " " + item.last_name}
                    </Link>
                  </div>
                </div>
                <div className="text-white text-center col-span-2">
                  {Math.round(item.prediction_accuracy)} %
                </div>
                <div
                  className="text-white hover:text-primary400 text-center col-span-2"
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
                <div className="text-white text-center col-span-2">
                  {Math.round(item.total_user_score)}
                </div>
                <div className="text-white text-center col-span-2">
                  {item.bankroll < 0
                    ? `-$${Math.abs(item.bankroll)}`
                    : `$${item.bankroll}`}
                </div>

                <div className="flex w-full items-center justify-center col-span-2">
                  <IoMdHeart
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      toggleFavourite(index, item?.user_id);
                    }}
                    className="cursor-pointer text-error text-center text-xl active:scale-95 transition-all hover:scale-105"
                  />
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
