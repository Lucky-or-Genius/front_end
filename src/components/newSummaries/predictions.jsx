import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Image } from "react-bootstrap";
import { FaCrown } from "react-icons/fa";
import { FaRegCalendarPlus, FaYoutube } from "react-icons/fa6";
import { CgArrowLongRightC } from "react-icons/cg";
import { FaFlagCheckered } from "react-icons/fa";

const Predictions = ({ predictionData }) => {
  const navigate = useNavigate();
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 overflow-y-auto h-full pb-24 px-4">
      {predictionData.map((prediction, index) => (
        <Link
          className="feed-card cursor-pointer backdrop-blur-md sm:bg-[#ffffff20] h-full rounded-xl hover:border hover:border-primary400 transition-all ease-in-out shadow-black"
          to={`/dashboard/Predictions/${prediction?.prediction_id}`}
          key={index}
        >
          <div className="card-header h-[20%] gap-2 ">
            <div className="flex">
              <div className="card-header-img">
                <Image
                  src={prediction?.image_url}
                  alt="N/A"
                  className="cursor-pointer"
                  onClick={() =>
                    navigate(`/dashboard/Leaderboards/${prediction?.user_id}`)
                  }
                />
              </div>
              <div className="profile-name">
                <span className="flex items-center text-[#ffffff80] gap-4">
                  <h5
                    className={"cursor-pointer hover:underline z-[9]"}
                    onClick={(e) => {
                      e.preventDefault();
                      navigate(
                        `/dashboard/Leaderboards/${prediction?.user_id}`
                      );
                    }}
                  >
                    {prediction?.full_name}
                  </h5>
                  <FaCrown />
                </span>
              </div>
            </div>
            <span className="px-2 bg-[#ffffff10] rounded-full text-[12px] text-center">
              #{prediction?.category}
            </span>
          </div>
          <div className="flex flex-col justify-between h-[80%] pt-2">
            <div className="card-description font-raleway truncate-3 line-clamp-3">
              <p>{prediction?.prediction}</p>
            </div>
            <div className="flex w-full 2md:items-center text-[#ffffff80] text-[13px] gap-4 pt-4 flex-col 2md:flex-row">
              <div className="flex gap-4">
                <p className="flex gap-2 items-center ">
                  <FaRegCalendarPlus /> <span>{prediction?.publish_date}</span>
                </p>
                <CgArrowLongRightC />
                <p className="flex gap-2 items-center ">
                  <FaFlagCheckered />{" "}
                  <span>
                    {prediction?.fixed_date !== null
                      ? prediction?.fixed_date
                      : "Null"}
                  </span>
                </p>
              </div>
              <div className="flex gap-4">
                <span className="bg-[#ffffff10] px-2 w-fit rounded-full flex gap-2 items-center">
                  Source : <FaYoutube />
                </span>

                <span
                  className="font-bold"
                  style={{
                    color:
                      prediction?.prediction_validation === "PENDING"
                        ? "#c2964b"
                        : prediction?.prediction_validation === "TRUE"
                        ? "#23B678"
                          ? "#388E3C"
                          : prediction?.prediction_validation === "PENDING"
                        : "#E72E2E",
                  }}
                >
                  # {prediction?.prediction_validation}
                </span>
              </div>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default Predictions;
