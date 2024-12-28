import React, { useState } from "react";

import { Image } from "react-bootstrap";
import { ImArrowUp, ImArrowDown } from "react-icons/im";
import { IoChatbubbleEllipses } from "react-icons/io5";
import { RiSendPlaneFill } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import { FaCrown } from "react-icons/fa";
import { IoMdHeartEmpty, IoMdHeart } from "react-icons/io";
import { FaRegCalendarPlus, FaYoutube } from "react-icons/fa6";
import { CgArrowLongRightC } from "react-icons/cg";
import { FaFlagCheckered } from "react-icons/fa";
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
  favourite,
  index1,
  index2,
  toggleFavourite,
}) => {
  const navigate = useNavigate();

  return (
    <div
      className="feed-card cursor-pointer backdrop-blur-md sm:bg-[#ffffff20] rounded-xl hover:border hover:border-primary400 transition-all ease-in-out shadow-black"
      onClick={(e) => {
        e.preventDefault();
        navigate(`/dashboard/Predictions/${predictionId}`);
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
                  e.stopPropagation();
                  e.preventDefault();
                  toggleFavourite(index1, index2, predictionId);
                }}
                className="cursor-pointer text-error text-xl active:scale-95 transition-all hover:scale-105"
              />
            ) : (
              <IoMdHeartEmpty
                onClick={(e) => {
                  e.stopPropagation();
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
    </div>
  );
};

export default FeedCard;
