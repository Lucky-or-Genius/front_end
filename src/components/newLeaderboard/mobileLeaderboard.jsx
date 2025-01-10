import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { IoMdHeartEmpty, IoMdHeart } from "react-icons/io";

const MobileLeaderBoard = ({ data, toggleFavourite }) => {
  const navigate = useNavigate();
  return (
    <div>
      {data.length > 0 ? (
        <div className="h-full pb-4 flex flex-col w-full gap-4">
          {data.map((item, index) => (
            <Link
              to={`/dashboard/LeaderBoards/${item.user_id}`}
              key={index}
              className="w-full bg-[#ffffff10] rounded-xl  p-2"
            >
              <div className="flex w-full justify-between pb-4">
                <div className="col-span-4 flex items-center gap-2">
                  <img
                    src={item.image_url}
                    alt="profile"
                    width={40}
                    height={40}
                    className="rounded-full w-8 h-8 object-cover"
                  />
                  <div className="w-fit flex flex-col truncate  font-poppins">
                    <Link
                      to={`/dashboard/LeaderBoards/${item.user_id}`}
                      className="text-white hover:underline hover:text-primary400 "
                    >
                      {item.first_name + " " + item.last_name}
                    </Link>
                    <span className="text-sm font-semibold text-gray-400">
                      Rank: {item?.rank}
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-center">
                  {item.is_favourite ? (
                    <IoMdHeart
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        toggleFavourite(index, item?.user_id);
                      }}
                      className="cursor-pointer text-error text-center text-xl active:scale-95 transition-all hover:scale-105"
                    />
                  ) : (
                    <IoMdHeartEmpty
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        toggleFavourite(index, item?.user_id);
                      }}
                      className="cursor-pointer text-[#ffffff60] text-xl text-center active:scale-95 transition-all hover:scale-105"
                    />
                  )}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div className="text-white text-center bg-[#ffffff10] p-2 gap-2 rounded-lg flex justify-center flex-col font-raleway">
                  <span className="text-raleway font-semibold text-gray-300">
                    Prediction Accuracy
                  </span>
                  {Math.round(item.prediction_accuracy)} %
                </div>
                <div className="text-white text-center bg-[#ffffff10] p-2 gap-2 rounded-lg flex justify-center flex-col font-raleway">
                  <span className="text-raleway font-semibold text-gray-300">
                    Points
                  </span>
                  {Math.round(item.total_user_score)}
                </div>
                <div className="text-white text-center bg-[#ffffff10] p-2 gap-2 rounded-lg flex justify-center flex-col font-raleway">
                  <span className="text-raleway font-semibold text-gray-300">
                    Bankroll
                  </span>
                  {item.bankroll < 0
                    ? `-$${Math.abs(item.bankroll)}`
                    : `$${item.bankroll}`}
                </div>
                <div
                  className="text-primary400 hover:text-primary400 text-center gap-2 bg-[#ffffff10] p-2 rounded-lg flex justify-center flex-col font-raleway"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    navigate(
                      `/dashboard/LeaderBoards/${item.user_id}?defaultOpen=predictions`
                    );
                  }}
                >
                  <span className="text-raleway font-semibold text-gray-300">
                    Total Predictions
                  </span>
                  {item.total_predictions}
                </div>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        "hello"
      )}
    </div>
  );
};

export default MobileLeaderBoard;
