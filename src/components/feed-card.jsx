import React, { useState } from "react";
import { Image } from "react-bootstrap";
import { ImArrowUp, ImArrowDown } from "react-icons/im";
import { FaPlus } from "react-icons/fa";
import { IoChatbubbleEllipses } from "react-icons/io5";
import { RiSendPlaneFill } from "react-icons/ri";
import { getSinglePrediction } from "../services/Predictions.service";
import "../styles/feedCard.css";
import { useNavigate } from "react-router-dom";
import { FaCrown } from "react-icons/fa";
import { FaRegCalendarPlus } from "react-icons/fa6";
import { CgArrowLongRightC } from "react-icons/cg";
import { FaFlagCheckered } from "react-icons/fa";
import infoIcon from "../assets/hover_info.png";
import CircularProgress from "@mui/material/CircularProgress";

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
  setOpenShare,
  onCardClick,
  isOpen,
}) => {
  const navigate = useNavigate();

  const [openProof, setOpenProof] = useState(false);
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
        <button
          className="card-header-btn h-8 w-8 !text-xs !p-0 text-white justify-center hover:shadow-md hover:shadow-primary400 transition-all ease-in-out hover:scale-105 active:scale-95"
          onClick={() => {
            handleProof();
          }}
        >
          <FaPlus />
        </button>
      </div>
      <div className="card-description font-raleway">
        <p>{prediction}</p>
      </div>
      <div className="flex w-full items-center gap-6 text-[#ffffff80] text-sm pt-4">
        <span className="">#{category}</span>
        <p className="flex gap-2 items-center ">
          <FaRegCalendarPlus /> <span>{madeOn}</span>
        </p>
        <CgArrowLongRightC />
        <p className="flex gap-2 items-center ">
          <FaFlagCheckered />{" "}
          <span>{resolvedOn !== null ? resolvedOn : "Null"}</span>
        </p>
        <span
          className="font-bold"
          style={{
            color:
              status === "PENDING"
                ? "#c2964b"
                : status === "TRUE"
                ? "#23B678"
                : "#E72E2E",
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
            onClick={() => setOpenShare(true)}
          />
        </div>
      </div>
      {isOpen && (
        <>
          {loading ? (
            ""
          ) : (
            <div className="predictionActive-row-1 pt-6">
              <div className="row-section-1">
                <div className="analytics-row-1 ">
                  <div className="block">
                    <span>Made on</span>
                    <div className="value">{val[0]?.publish_date}</div>
                  </div>
                  <div className="block justify-end">
                    <span>Resolves on</span>
                    <div className="value">{val[0]?.fixed_date}</div>
                  </div>
                  <div className="block">
                    <span>Prediction Accuracy </span>
                    <div className="value">{val[0]?.prediction_accuracy}%</div>
                  </div>
                  <div className="block">
                    <span>Status</span>
                    <div
                      style={{
                        position: "relative",
                        fontSize: "16px",
                        fontWeight: "800",
                        color:
                          val[0]?.prediction_validation === "TRUE"
                            ? "#10d200"
                            : val[0]?.prediction_validation === "PARTIALLY TRUE"
                            ? "#388E3C"
                            : val[0]?.prediction_validation === "PENDING"
                            ? "#374C98"
                            : "#f70000",
                        display: "flex",
                        alignItems: "center",
                        width: "182px",
                        height: "20px",
                        flexShrink: "0",
                      }}
                      // "#10d200" : "#b32a2a"
                    >
                      {val[0]?.prediction_validation}
                    </div>
                  </div>
                </div>
                {/* Below Part starts */}
                <div className="details-row-2">
                  <div className="block">
                    <span className="topic">
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
                    <div
                      className="value"
                      style={{
                        backgroundColor:
                          val[0]?.score < 0 ? "#B32A2A" : "#50D200",
                      }}
                    >
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
                  <div className="block">
                    <span className="topic">
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
                    <div
                      className="value"
                      style={{
                        backgroundColor:
                          val[0]?.days_since > 60 ? "#50D200" : "#B32A2A",
                      }}
                    >
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
                  <div className="block">
                    <span className="topic">
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
                    <div
                      className="value"
                      style={{
                        backgroundColor: "#fff",
                        color: "#333",
                      }}
                    >
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
                  <div className="block">
                    <span className="topic">
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
                    <div
                      className="value"
                      style={{
                        backgroundColor: "#9d43bd",
                        fontSize:
                          val[0]?.prediction_type !== "BINARY"
                            ? "20px"
                            : "20px",
                      }}
                    >
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
                {/* Below Part Ends */}
              </div>
              {/* Youtube Video Starts */}
              <div className="row-section-2">
                <iframe
                  className="w-full h-[20vh] md:h-[30vh] object-cover"
                  alt=""
                  src={`https://www.youtube.com/embed/${val[0]?.youtube_id}?start=${val[0]?.youtube_start_time}`}
                />
              </div>
              {/* YouTube Video Ends */}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default FeedCard;
