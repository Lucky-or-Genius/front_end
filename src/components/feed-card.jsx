import React, { useState } from "react";

import { Image } from "react-bootstrap";
import { ImArrowUp, ImArrowDown } from "react-icons/im";
import { IoChatbubbleEllipses } from "react-icons/io5";
import { RiSendPlaneFill } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import { FaCrown } from "react-icons/fa";
import { IoMdHeartEmpty, IoMdHeart } from "react-icons/io";
import {
  FaRegCalendarPlus,
  FaYoutube,
  FaArrowRightLong,
} from "react-icons/fa6";
import { CgArrowLongRightC } from "react-icons/cg";
import { FaFlagCheckered } from "react-icons/fa";

import infoIcon from "../assets/hover_info.png";
import { getSinglePrediction } from "../services/Predictions.service";
import "../styles/feedCard.css";

const FeedCard = ({
  category,
  resolvedOn,
  imgUrl,
  prediction,
  madeOn,
  user,
  status,
  userId,
  predictionId,
  onCardClick,
  isOpen,
  favourite,
  index1,
  index2,
  toggleFavourite,
}) => {
  const navigate = useNavigate();

  const [val, setVal] = useState({});
  const [loading, setLoading] = useState(false);

  const handleProof = async () => {
    setLoading(true);
    try {
      const response = await getSinglePrediction(predictionId);
      setVal(response.data);
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  return (
    <div
      className="feed-card cursor-pointer backdrop-blur-md sm:bg-[#ffffff20] rounded-xl hover:border hover:border-primary400 transition-all ease-in-out shadow-black"
      onClick={() => {
        onCardClick();
        handleProof();
      }}
    >
      <div className="card-header">
        <div
          className=""
          style={{
            display: "flex",
            alignItems: "center",
          }}
        >
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
                className={"cursor-pointer hover:underline"}
                onClick={() => navigate(`/dashboard/Leaderboards/${userId}`)}
              >
                {user}
              </h5>
              <FaCrown />
            </span>
          </div>
        </div>
        <div className="flex gap-2 items-center">
          <div className="flex gap-2 ">
            <span className="bg-[#ffffff10] px-2 py-1 rounded-full flex gap-2 items-center text-center text-xs text-[#ffffff80]">
              #{category}
            </span>
          </div>

          <div className="">
            {favourite ? (
              <IoMdHeart
                onClick={(e) => {
                  e.preventDefault();
                  toggleFavourite(index1, index2, predictionId);
                }}
                className="cursor-pointer text-error text-xl active:scale-95 transition-all hover:scale-105"
              />
            ) : (
              <IoMdHeartEmpty
                onClick={(e) => {
                  e.preventDefault();
                  toggleFavourite(index1, index2, predictionId);
                }}
                className="cursor-pointer text-[#ffffff60] text-xl active:scale-95 transition-all hover:scale-105"
              />
            )}
          </div>
        </div>
      </div>

      <div className="card-description font-raleway">
        <p>{prediction}</p>
      </div>

      <div className="flex w-full flex-wrap items-start gap-x-6 gap-y-4 text-[#ffffff80] text-sm pt-4">
        <div className="flex gap-4 order-1">
          <p className="flex gap-2 items-center ">
            <FaRegCalendarPlus /> <span>{madeOn}</span>
          </p>
          <CgArrowLongRightC />
          <p className="flex gap-2 items-center ">
            <FaFlagCheckered />{" "}
            <span>{resolvedOn !== null ? resolvedOn : "Null"}</span>
          </p>
        </div>

        <span className="bg-[#ffffff10] px-2 rounded-full order-2 flex gap-2 items-center">
          Source : <FaYoutube />
        </span>

        <span
          className="font-bold order-3 rounded-full px-2"
          style={{
            color:
              status === "PENDING"
                ? "#c2964b"
                : status === "TRUE"
                ? "#23B678"
                : status === "PARTIALLY TRUE"
                ? "#388E3C"
                : "#E72E2E",
            backgroundColor:
              status === "PENDING"
                ? "#c2964b30"
                : status === "TRUE"
                ? "#23B67830"
                : status === "PARTIALLY TRUE"
                ? "#388E3C30"
                : "#E72E2E30",
          }}
        >
          # {status}
        </span>
      </div>

      <div className="card-footer">
        <div className="likes">
          <ImArrowUp
            style={{
              cursor: "pointer",
              color: "#00000040",
            }}
          />
        </div>
        <div className="dislikes">
          <ImArrowDown
            style={{
              cursor: "pointer",
              color: "#00000040",
            }}
          />
        </div>
        <div className="comment">
          <IoChatbubbleEllipses
            style={{
              cursor: "pointer",
              color: "#00000040",
            }}
          />
        </div>
        <div className="share">
          <RiSendPlaneFill
            style={{
              cursor: "pointer",
              color: "#00000040",
            }}
            // onClick={() => setOpenShare(true)}
          />
        </div>
      </div>
      {isOpen && (
        <>
          {loading ? (
            ""
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-6">
                <div className="grid grid-cols-1 gap-4">
                  <div className="bg-[#ffffff20] shadow-md rounded-xl grid grid-cols-2 w-full p-4 gap-4 font-poppins">
                    <div className=" text-[#ffffff60]">
                      <span className="font-raleway">Made on</span>
                      <div className="text-white md:text-base text-sm">
                        {val[0]?.publish_date}
                      </div>
                    </div>
                    <div className="block justify-end text-[#ffffff60]">
                      <span className="font-raleway">Resolves on</span>
                      <div className="text-white md:text-base text-sm">
                        {val[0]?.fixed_date}
                      </div>
                    </div>
                    <div className="block text-[#ffffff60]">
                      <span className="font-raleway leading-1">
                        Predictor Accuracy{" "}
                      </span>
                      <div className="text-white md:text-base text-sm">
                        {val[0]?.prediction_accuracy}%
                      </div>
                    </div>
                    <div className="block text-[#ffffff60]">
                      <span className="font-raleway">Status</span>
                      <div
                        style={{
                          color:
                            val[0]?.prediction_validation === "TRUE"
                              ? "#23B678"
                              : val[0]?.prediction_validation ===
                                "PARTIALLY TRUE"
                              ? "#388E3C"
                              : val[0]?.prediction_validation === "PENDING"
                              ? "#c2964b"
                              : "#E72E2E",
                        }}
                        className="font-[600] md:text-base text-sm"
                      >
                        {val[0]?.prediction_validation}
                      </div>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                    <div className="flex flex-col  shadow-md">
                      <span className="bg-primary p-4 flex justify-center items-center rounded-t-lg md:rounded-t-xl font-raleway text-sm text-[#ffffff80]">
                        Points{" "}
                        <img
                          src={infoIcon}
                          alt="Info"
                          title="Point based on prediction accuracy & timeline (max gain +100 | max loss of -100) "
                          style={{
                            marginLeft: "5px",
                            width: "16px", // Adjust as needed
                            height: "16px", // Adjust as needed
                            cursor: "pointer",
                          }}
                        />
                      </span>
                      <div className="h-24 rounded-b-lg md:rounded-b-xl bg-[#ffffff20] flex justify-center items-center font-poppins text-sm md:text-lg text-white">
                        <div
                          style={{
                            position: "relative",
                            fontWeight: "600",
                          }}
                        >
                          {val[0]?.score && Number(val[0]?.score).toFixed(1)}
                          <span style={{ fontSize: "16px", fontWeight: "500" }}>
                            {" "}
                            Pts
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col shadow-md">
                      <span className="bg-primary p-4 flex justify-center items-center rounded-t-lg md:rounded-t-xl font-raleway text-sm text-[#ffffff80]">
                        Timeline
                        <img
                          src={infoIcon}
                          alt="Info"
                          title="The ammount of days in the future the prediction is made for"
                          style={{
                            marginLeft: "5px",
                            width: "16px", // Adjust as needed
                            height: "16px", // Adjust as needed
                            cursor: "pointer",
                          }}
                        />
                      </span>
                      <div className="h-24 rounded-b-lg md:rounded-b-xl bg-[#ffffff20] flex justify-center items-center font-poppins text-sm md:text-lg text-white">
                        <div
                          style={{
                            position: "relative",
                            fontWeight: "600",
                          }}
                        >
                          {val[0]?.days_since}{" "}
                          <span style={{ fontSize: "16px", fontWeight: "500" }}>
                            Days
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col shadow-md">
                      <span
                        className="bg-primary p-4 flex justify-center items-center rounded-t-lg md:rounded-t-xl font-raleway text-sm text-[#ffffff80]
text-sm text-[#ffffff80"
                      >
                        Error %
                        <img
                          src={infoIcon}
                          alt="Info"
                          title="The error rate of the prediction compared to ground truth (only for continuous predictions)."
                          style={{
                            marginLeft: "5px",
                            width: "16px", // Adjust as needed
                            height: "16px", // Adjust as needed
                            cursor: "pointer",
                          }}
                        />
                      </span>
                      <div className="h-24 rounded-b-lg md:rounded-b-xl bg-[#ffffff20] flex justify-center items-center font-poppins text-sm md:text-lg text-white">
                        <div
                          style={{
                            position: "relative",
                            fontWeight: "600",
                          }}
                        >
                          N/A
                          {/* {val[0]?.error !== null ? val[0]?.error : "N/A"} */}
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col shadow-md">
                      <span
                        className="bg-primary p-4 flex justify-center items-center rounded-t-lg md:rounded-t-xl font-raleway text-sm text-[#ffffff80]
text-sm text-[#ffffff80"
                      >
                        Type
                        <img
                          src={infoIcon}
                          alt="Info"
                          title="Binary predictions are TRUE or FALSE statements. Continuous predictions are numerical, eg stock prices."
                          style={{
                            marginLeft: "5px",
                            width: "16px", // Adjust as needed
                            height: "16px", // Adjust as needed
                            cursor: "pointer",
                          }}
                        />
                      </span>
                      <div className="h-24 rounded-b-lg md:rounded-b-xl bg-[#ffffff20] flex justify-center items-center font-poppins text-sm md:text-base text-white">
                        <div
                          style={{
                            position: "relative",
                            fontWeight: "600",
                          }}
                        >
                          {val[0]?.prediction_type !== null
                            ? val[0]?.prediction_type
                            : "N/A"}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="row-section-2">
                  <iframe
                    className="w-full h-[20vh] md:h-full rounded-lg md:rounded-xl object-cover"
                    alt="yt-video"
                    title="yt-video"
                    src={`https://www.youtube.com/embed/${val[0]?.youtube_id}?start=${val[0]?.youtube_start_time}`}
                  />

                  {/* Below Part Ends */}
                </div>

                {/* Youtube Video Starts */}

                {/* YouTube Video Ends */}
              </div>
              <div className="pt-4 w-full flex justify-center md:justify-end text-[#ffffff80] text-base">
                <span
                  className="flex gap-2 items-center hover:text-white transition-all ease-in-out"
                  onClick={(e) => {
                    e.preventDefault();
                    navigate(`/dashboard/Predictions/${predictionId}`);
                  }}
                >
                  See Full Evidence <FaArrowRightLong />
                </span>
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default FeedCard;
