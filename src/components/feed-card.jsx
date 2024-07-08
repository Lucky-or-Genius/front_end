import React, { useState } from "react";
import { Image } from "react-bootstrap";
import { ImArrowUp, ImArrowDown } from "react-icons/im";
import { FaPlus } from "react-icons/fa";
import { IoChatbubbleEllipses } from "react-icons/io5";
import { RiSendPlaneFill } from "react-icons/ri";
import ProofModal from "./feed/proof-modal";
import { getSinglePrediction } from "../services/Predictions.service";
import "../styles/feedCard.css";
import { useNavigate } from "react-router-dom";
import { FaCrown } from "react-icons/fa";
import { FaRegCalendarPlus, FaRegCalendarCheck } from "react-icons/fa6";
import { CgArrowLongRightC } from "react-icons/cg";
import { FaFlagCheckered } from "react-icons/fa";

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
    <div className="feed-card backdrop-blur-md sm:bg-[#ffffff20] rounded-xl hover:border hover:border-primary400 transition-all ease-in-out shadow-black">
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
                onClick={() =>
                  navigate("/Leaderboards", {
                    state: { id: userId },
                  })
                }
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
            setOpenProof(true);
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
      <ProofModal
        setShowModal={setOpenProof}
        showModal={openProof}
        val={val}
        loading={loading}
      />
    </div>
  );
};

export default FeedCard;
