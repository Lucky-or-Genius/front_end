import React from "react";
import { Image } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { FaCrown } from "react-icons/fa";
import { FaRegCalendarPlus, FaYoutube } from "react-icons/fa6";
import { CgArrowLongRightC } from "react-icons/cg";
import { FaFlagCheckered } from "react-icons/fa";
import { IoMdHeart } from "react-icons/io";

const PredictionCard = ({
  category,
  resolvedOn,
  imgUrl,
  prediction,
  madeOn,
  user,
  status,
  userId,
  predictionId,
  toggleFavourite,
}) => {
  const navigate = useNavigate();

  return (
    <Link
      className="p-4 w-full font-poppins border border-[#ffffff20] cursor-pointer backdrop-blur-md bg-[#ffffff20] h-full rounded-xl hover:border hover:border-primary400 transition-all ease-in-out shadow-black"
      to={`/dashboard/Predictions/${predictionId}`}
    >
      <div className="card-header h-[20%] gap-2 ">
        <div className="flex">
          <div className="card-header-img">
            <Image
              src={imgUrl}
              alt="N/A"
              className="cursor-pointer"
              onClick={() =>
                navigate("/Leaderboards", {
                  state: { id: userId },
                })
              }
            />
          </div>
          <span className="flex items-center text-[#ffffff80] gap-4 pl-2">
            <h5
              className={"cursor-pointer hover:underline z-[9]"}
              onClick={(e) => {
                e.preventDefault();
                navigate(`/dashboard/Leaderboards/${userId}`);
              }}
            >
              {user}
            </h5>
            <FaCrown />
          </span>
        </div>
        <span className="px-2 bg-[#ffffff10] rounded-full text-[#ffffff80] text-[12px] text-center">
          #{category}
        </span>
      </div>
      <div className="flex flex-col justify-between h-[80%] pt-2">
        <div className="card-description font-raleway truncate-3 line-clamp-3">
          <p>{prediction}</p>
        </div>
        <div className="flex w-full 2md:items-center text-[#ffffff80] text-[13px] gap-4 pt-4 justify-between">
          <div className="flex gap-4 flex-col 2md:flex-row">
            <div className="flex gap-4">
              <p className="flex gap-2 items-center ">
                <FaRegCalendarPlus /> <span>{madeOn}</span>
              </p>
              <CgArrowLongRightC />
              <p className="flex gap-2 items-center ">
                <FaFlagCheckered />{" "}
                <span>{resolvedOn !== null ? resolvedOn : "Null"}</span>
              </p>
            </div>

            <div className="flex gap-4">
              <span className="bg-[#ffffff10] px-2 w-fit rounded-full flex gap-2 items-center">
                Source : <FaYoutube />
              </span>

              <span
                className="font-bold px-2 rounded-full"
                style={{
                  color:
                    status === "PENDING"
                      ? "#c2964b"
                      : status === "TRUE"
                      ? "#23B678"
                        ? "#388E3C"
                        : status === "PENDING"
                      : "#E72E2E",
                  backgroundColor:
                    status === "PENDING"
                      ? "#c2964b30"
                      : status === "TRUE"
                      ? "#23B67830"
                        ? "#388E3C30"
                        : status === "PENDING"
                      : "#E72E2E30",
                }}
              >
                # {status}
              </span>
            </div>
          </div>

          <div className="">
            <IoMdHeart
              onClick={(e) => {
                e.preventDefault();
                toggleFavourite(predictionId);
              }}
              className="cursor-pointer text-error  text-2xl"
            />
          </div>
        </div>
      </div>
    </Link>
  );
};

export default PredictionCard;
