import React, { useState } from "react";
import { Image } from "react-bootstrap";
import { getSinglePrediction } from "../../services/Predictions.service";
import { Link, useNavigate } from "react-router-dom";
import { FaCrown } from "react-icons/fa";
import { FaRegCalendarPlus, FaYoutube } from "react-icons/fa6";
import { CgArrowLongRightC } from "react-icons/cg";
import { FaFlagCheckered } from "react-icons/fa";
import infoIcon from "../../assets/hover_info.png";

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
  setOpenShare,
  isOpen,
}) => {
  const navigate = useNavigate();

  const [val, setVal] = useState({});
  const [loading, setLoading] = useState(false);

  return (
    <Link
      className="feed-card cursor-pointer backdrop-blur-md sm:bg-[#ffffff20] h-full rounded-xl hover:border hover:border-primary400 transition-all ease-in-out shadow-black"
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
          <div className="profile-name">
            <span className="flex items-center text-[#ffffff80] gap-4">
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
        </div>
        <span className="px-2 bg-[#ffffff10] rounded-full text-[12px] text-center">
          #{category}
        </span>
      </div>
      <div className="flex flex-col justify-between h-[80%] pt-2">
        <div className="card-description font-raleway truncate-3 line-clamp-3">
          <p>{prediction}</p>
        </div>
        <div className="flex w-full 2md:items-center text-[#ffffff80] text-[13px] gap-4 pt-4 flex-col 2md:flex-row">
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
              className="font-bold"
              style={{
                color:
                  status === "PENDING"
                    ? "#c2964b"
                    : status === "TRUE"
                    ? "#23B678"
                      ? "#388E3C"
                      : status === "PENDING"
                    : "#E72E2E",
              }}
            >
              # {status}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default PredictionCard;
