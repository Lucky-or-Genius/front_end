import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
import { LuCalendarDays } from "react-icons/lu";
import { HiHeart, HiOutlineHeart } from "react-icons/hi2";
import { FaPlus, FaMinus, FaAngleRight } from "react-icons/fa6";
import { Image } from "react-bootstrap";

import "./predictors.css";

import UserSubjectData from "../../components/leaderboard/user-subject-data";
import { getProfilesBySubjects } from "../../services/Profiles.service";
import SubHeader from "../../components/leaderboard/subheader";
import {
  leaderBoardData,
  sortByAccuracy,
  sortByScore,
  sortByBankroll,
  addRemoveFavourite,
} from "../../services/Leaderboards.service";
import { getSortedProfilesBySubjects } from "../../services/Profiles.service";
import { useLocation } from "react-router-dom";
import Skeleton from "../common/skeleton";

const LeaderBoards = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [data, setData] = useState([]);
  const [profilesData, setProfilesData] = useState([]);
  const [subjectData, setSubjectData] = useState([]);
  const [loader, setLoader] = useState(false);
  const accountId = localStorage.getItem("accountId");

  const toggleFavourite = async (id) => {
    const params = {
      accountId: String(accountId),
      predictorId: id,
    };
    const newData = data.filter((obj) => obj.user_id !== id);
    setData(newData);
    addRemoveFavourite(params);
  };

  const getLeaderBoardData = async () => {
    await leaderBoardData(accountId)
      .then((res) => {
        setLoader(true);
        const filteredData = [...res.data]
          .filter((obj) => obj.is_favourite === true)
          .map((obj) => ({ ...obj, Active: false }));
        setData(filteredData);

        if (location?.state?.id !== undefined) {
          setData(
            filteredData.filter((obj) => obj.user_id === location?.state?.id)
          );
        }
      })
      .catch((err) => {
        console.log("err::::::", err);
      });
  };

  useEffect(() => {
    getLeaderBoardData();
  }, []);

  const sortLeaderboardByAccuracy = async (order) => {
    try {
      const res = await sortByAccuracy(order);
      setLoader(true);
      const filteredData = [...res.data]
        .filter((obj) => obj.is_favourite === true)
        .map((obj) => ({ ...obj, Active: false }));
      setData(filteredData);
    } catch (error) {
      console.log(error);
    }
  };
  const sortLeaderboardByScore = async (order) => {
    try {
      const res = await sortByScore(order);
      setLoader(true);
      const filteredData = [...res.data]
        .filter((obj) => obj.is_favourite === true)
        .map((obj) => ({ ...obj, Active: false }));
      setData(filteredData);
    } catch (error) {
      console.log(error);
    }
  };
  const sortLeaderboardByBankroll = async (order) => {
    try {
      const res = await sortByBankroll(order);
      setLoader(true);
      const filteredData = [...res.data]
        .filter((obj) => obj.is_favourite === true)
        .map((obj) => ({ ...obj, Active: false }));
      setData(filteredData);
    } catch (error) {
      console.log(error);
    }
  };

  const getUserSubject = async (id) => {
    getProfilesBySubjects(id)
      .then((res) => {
        setSubjectData([...res.data]);
      })
      .catch((err) => {
        console.log("err::::", err);
      });
  };
  const getSortedUserSubject = async (id, value) => {
    getSortedProfilesBySubjects(id, value)
      .then((res) => {
        console.log(res);
        setSubjectData([...res.data]);
      })
      .catch((err) => {
        console.log("err::::", err);
      });
  };

  const onClickDetails = (index, id) => {
    const arr = [...data];
    arr[index].Active = !arr[index].Active;
    setData([...arr]);
    setProfilesData([...arr]);
    if (data[index].Active === false) {
      return;
    }
    setProfilesData(
      [...data].map((obj, ind) => {
        if (ind === index) {
          return {
            ...obj,
            Active: true,
          };
        } else {
          return {
            ...obj,
            Active: false,
          };
        }
      })
    );
    Promise.all([getUserSubject(id)]).then((res) => {
      console.log("res get data:::::", res);
    });
  };

  return (
    <div className="flex flex-col h-[80vh] overflow-auto gap-[2px] text-lg">
      <SubHeader
        sortLeaderboardByAccuracy={sortLeaderboardByAccuracy}
        sortLeaderboardByScore={sortLeaderboardByScore}
        sortLeaderboardByBankroll={sortLeaderboardByBankroll}
        className={"!top-0"}
      />
      {data.length === 0 && <Skeleton />}
      {data?.map((val, index) => {
        return (
          <div style={{ width: "100%" }} key={index}>
            <div className="desktop-row-section">
              <div className="block1">
                {val?.rank === 1 ? (
                  <img alt="rank-1" src="/goldmedal-1.svg" />
                ) : val?.rank === 2 ? (
                  <img alt="rank-2" src="/goldmedal-2.svg" />
                ) : val?.rank === 3 ? (
                  <img alt="rank-3" src="/goldmedal-3.svg" />
                ) : (
                  val?.rank
                )}
              </div>
              <div className="block1">
                <img
                  style={{
                    position: "relative",
                    borderRadius: "100%",
                    width: "56px",
                    height: "56px",
                    padding: "4px",
                    overflow: "hidden",
                    flexShrink: "0",
                    objectFit: "cover",
                    border:
                      index == 0
                        ? "2px solid #FDBC4B"
                        : index == 1
                        ? "2px solid #A7A7A7"
                        : index == 2
                        ? "2px solid #846836"
                        : "1px solid #4B6CC2",
                  }}
                  alt=""
                  src={val?.image_url}
                  onClick={() =>
                    navigate("/Profiles", {
                      state: { id: val?.user_id },
                    })
                  }
                />
                <div className="user-name-section">
                  <div className="user-name-section1">
                    {val?.first_name} {val?.last_name}
                  </div>
                  <div
                    onClick={() =>
                      navigate("/Predictions", {
                        state: { id: val?.user_id },
                      })
                    }
                    className="prediction-section"
                  >
                    {val.total_predictions} Predictions <FaAngleRight />
                  </div>
                </div>
              </div>
              <div className="block1">
                {Math.floor(val.prediction_accuracy)}%
              </div>
              <div
                className="block1"
                style={{
                  color: val.total_user_score < 0 ? "#e87d7d" : "#fff",
                }}
              >
                {new Intl.NumberFormat("en-IN", {
                  maximumFractionDigits: 0,
                  minimumFractionDigits: 0,
                }).format(val.total_user_score)}
              </div>
              <div
                className="block1"
                style={{
                  color: val.bankroll < 0 ? "#e87d7d" : "#fff",
                }}
              >
                ${val.bankroll}
              </div>
              <div className="block1">
                {val.is_favourite ? (
                  <HiHeart
                    onClick={() => toggleFavourite(val?.user_id)}
                    style={{ cursor: "pointer" }}
                  />
                ) : (
                  <HiOutlineHeart
                    onClick={() => toggleFavourite(val?.user_id)}
                    style={{ cursor: "pointer" }}
                  />
                )}
              </div>
              <div
                onClick={() => {
                  onClickDetails(index, val?.user_id);
                }}
                style={{
                  backgroundColor: "#282828",
                  textAlign: "center",
                }}
              >
                {val.Active ? (
                  <button className="more-info-button">
                    Less info
                    <FaMinus />
                  </button>
                ) : (
                  <button className="more-info-button">
                    More info
                    <FaPlus />
                  </button>
                )}
              </div>
            </div>
            <div className="mobile-row-section">
              <div className="mob-row-section-1">
                <div className="row-img">
                  <Image
                    alt=""
                    src={val?.image_url}
                    onClick={() =>
                      navigate("/Profiles", {
                        state: { id: val?.user_id },
                      })
                    }
                  />
                </div>
                <div className="row-header">
                  <div className="row-heading">
                    <span className="ranking" style={{ color: "#AEAEAE" }}>
                      #{index + 1}
                    </span>
                    <div className="user_name">
                      {val?.first_name} {val?.last_name}
                    </div>
                  </div>
                  <div className="row-sub-heading">
                    <label
                      style={{
                        color: "#aeaeae",
                        fontSize: "12px",
                      }}
                    >
                      Accuracy{" "}
                      <span
                        style={{
                          color:
                            val.prediction_accuracy > 70
                              ? "#23B678"
                              : val.prediction_accuracy > 50
                              ? "#FDBC4B"
                              : "#FF0000",
                        }}
                      >
                        {Math.floor(val.prediction_accuracy)}%
                      </span>
                    </label>
                  </div>
                </div>
              </div>
              <div className="mob-row-section-2">
                {val.is_favourite ? (
                  <HiHeart
                    onClick={() => toggleFavourite(val?.user_id)}
                    style={{ cursor: "pointer" }}
                  />
                ) : (
                  <HiOutlineHeart
                    onClick={() => toggleFavourite(val?.user_id)}
                    style={{ cursor: "pointer" }}
                  />
                )}
                <div
                  onClick={() => {
                    onClickDetails(index, val?.user_id);
                  }}
                >
                  {val.Active ? <FaMinus /> : <FaPlus />}
                </div>
              </div>
            </div>
            {/* clickable section start */}
            {val.Active ? (
              <>
                <UserSubjectData
                  subjectData={subjectData}
                  getUserSubject={getUserSubject}
                  id={val?.user_id}
                  getSortedUserSubject={getSortedUserSubject}
                />

                <div className="desktop-clickable-section">
                  <div className="collapsable-section">
                    <div className="clickable-section-inner1">
                      <div className="clickable-section-inner2">
                        Area of Accuracy
                      </div>
                      <div className="category-value">
                        {val.top_two_categories}
                      </div>
                    </div>
                  </div>
                  <div className="pending-Predictions-section">
                    <div className="pending-Predictions-title">
                      Pending Predictions
                    </div>
                    <div className="pending-Predictions-value">
                      {val.all_pending_predictions}
                    </div>
                  </div>
                  <div className="settle-section">
                    <div className="settle-section-title">
                      Due to Settle in 2023
                    </div>
                    <div className="settle-section-value">
                      {val.predictions_due_to_settle}
                    </div>
                  </div>
                  <div className="markets-section">
                    <div className="markets-section-title ">
                      Have Open Markets
                    </div>
                    <div className="markets-section-value">
                      {val.open_markets}
                    </div>
                  </div>
                  <div className="streak-section">
                    <div className="streak-section-title">Current Streak</div>
                    <div className="streak-section-value">
                      {val.current_streak}
                    </div>
                  </div>
                </div>
                <div className="mobile-clickable-section">
                  <div className="mob-clickable-headings">
                    <div className="heading">Area of Accuracy</div>
                    <div className="mob-category-value">
                      {val.top_two_categories}
                    </div>
                  </div>
                  <div className="mob-clickable-content">
                    <div className="block">
                      <div className="icon">
                        <img
                          src="/pending.png"
                          alt={"pending"}
                          width={20}
                          height={20}
                        />
                      </div>
                      <div className="text">
                        <span style={{ color: "#AEAEAE" }}>
                          Pending Predictions
                        </span>
                        <div className="value">
                          {val.all_pending_predictions}
                        </div>
                      </div>
                    </div>
                    <div className="block">
                      <div className="icon">
                        <LuCalendarDays />
                      </div>
                      <div className="text">
                        <span style={{ color: "#AEAEAE" }}>Due to Settle</span>
                        <div className="value">
                          {val.predictions_due_to_settle}
                        </div>
                      </div>
                    </div>
                    <div className="block">
                      <div className="icon">
                        <img
                          src="/status-up.png"
                          alt={"pending"}
                          width={22}
                          height={22}
                        />
                      </div>
                      <div className="text">
                        <span style={{ color: "#AEAEAE" }}>
                          Have Open Markets
                        </span>
                        <div className="value">{val.open_markets}</div>
                      </div>
                    </div>
                    <div className="block">
                      <div className="icon">
                        <img
                          src="/streak.png"
                          alt={"pending"}
                          width={22}
                          height={22}
                        />
                      </div>
                      <div className="text">
                        <span style={{ color: "#AEAEAE" }}>Current Streak</span>
                        <div className="value">{val.current_streak}</div>
                      </div>
                    </div>
                  </div>
                  <div className="view-prediction-btn">
                    <button
                      onClick={() =>
                        navigate("/Predictions", {
                          state: { id: val?.user_id },
                        })
                      }
                    >
                      View {val.total_predictions} Predictions
                    </button>
                  </div>
                </div>
              </>
            ) : null}

            {/* clickable section ends */}
          </div>
        );
      })}
    </div>
  );
};

export default LeaderBoards;
