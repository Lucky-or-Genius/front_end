import React, { useEffect, useState } from "react";
import "../styles/summaries.css";
import {
  allSummarySources,
  sortPublicationDate,
  sortNumberOfPredictions,
  getSummaryPeople,
  getSummaryPrediction,
  getSummarySummaries,
  getFullTranscript,
  searchTerm,
} from "../services/summaries.services";
import { FaPlus, FaMinus } from "react-icons/fa6";
import { LuCalendarDays } from "react-icons/lu";
import CircularProgress from "@mui/material/CircularProgress";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Tabs from "../components/common/tabs";
import SummariesSubheader from "../components/summaries/subheader";
import Header from "../components/summaries/Header";
import Skeleton from "../components/common/skeleton";

const myComponentStyle = {
  fontFamily: "Roboto, sans-serif", // Use the font name specified in Google Fonts
};
function Summaries() {
  const navigate = useNavigate();

  const [data, setData] = useState([]);
  const [peopleData, setPeopleData] = useState([]);
  const [predictionData, setPredictionData] = useState([]);
  const [summariesData, setSummariesData] = useState([]);
  const [fullTranscriptData, setFullTranscriptData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [activeIndex, setActiveIndex] = useState("");
  const [subSectionIndex, setSubSectionIndex] = useState(0);

  useEffect(() => {
    allSummarySources()
      .then((res) => {
        // console.log("res::::", res.data);
        setData([...res.data]);
        setData(
          [...res.data].map((obj) => ({
            ...obj,
            predictionActive: false,
            peopleActive: false,
            summariesActive: false,
            fullTranscriptActive: false,
          }))
        );
      })
      .catch((err) => {
        console.log("err:::::::", err);
      });
  }, []);

  const sortByPublicationDate = async (order) => {
    try {
      const res = await sortPublicationDate(order);
      setData([...res.data]);
      setData(
        [...res.data].map((obj) => ({
          ...obj,
          predictionActive: false,
          peopleActive: false,
          summariesActive: false,
          fullTranscriptActive: false,
        }))
      );
    } catch (error) {
      console.log(error);
    }
  };
  const sortByNumberOfPredictions = async (order) => {
    try {
      const res = await sortNumberOfPredictions(order);
      setData([...res.data]);
      setData(
        [...res.data].map((obj) => ({
          ...obj,
          predictionActive: false,
          peopleActive: false,
          summariesActive: false,
          fullTranscriptActive: false,
        }))
      );
    } catch (error) {
      console.log(error);
    }
  };
  const searchLeaderboard = async (term) => {
    try {
      const res = await searchTerm(term);
      setData([...res.data]);
      setData(
        [...res.data].map((obj) => ({
          ...obj,
          predictionActive: false,
          peopleActive: false,
          summariesActive: false,
          fullTranscriptActive: false,
        }))
      );
    } catch (error) {}
  };
  const convertMinsToHrsMins = (minutes) => {
    let h = Math.floor(minutes / 60);
    let m = minutes % 60;
    h = h < 10 ? "0" + h : h;
    m = m < 10 ? "0" + m : m;
    return `${h}:${m}:00`; // Assumes no seconds part, so it's always '00'
  };

  const onClickPrediction = (index) => {
    const arr = [...data];
    arr[index].predictionActive = !arr[index].predictionActive;
    setData([...arr]);
    if (data[index].predictionActive === false) {
      return;
    }
    setData(
      [...data].map((obj, ind) => {
        if (ind === index) {
          return {
            ...obj,
            predictionActive: true,
            peopleActive: false,
            summariesActive: false,
            fullTranscriptActive: false,
          };
        } else {
          return {
            ...obj,
            predictionActive: false,
            peopleActive: false,
            summariesActive: false,
            fullTranscriptActive: false,
          };
        }
      })
    );
    setActiveIndex(index);
    setLoading(true);
    getSummaryPrediction(data[index].source_id)
      .then((res) => {
        console.log("res setPredictionData:::::::", res.data);
        setPredictionData([...res.data]);
        setActiveIndex("");
        setLoading(false);
      })
      .catch((err) => {
        console.log("err:::::", err);
      });
  };
  const onClickPeople = (index) => {
    const arr = [...data];
    arr[index].peopleActive = !arr[index].peopleActive;
    setData([...arr]);
    if (data[index].peopleActive === false) {
      return;
    }
    setData(
      [...data].map((obj, ind) => {
        if (ind === index) {
          return {
            ...obj,
            predictionActive: false,
            peopleActive: true,
            summariesActive: false,
            fullTranscriptActive: false,
          };
        } else {
          return {
            ...obj,
            predictionActive: false,
            peopleActive: false,
            summariesActive: false,
            fullTranscriptActive: false,
          };
        }
      })
    );
    setActiveIndex(index);
    setLoading(true);
    getSummaryPeople(data[index].source_id)
      .then((res) => {
        console.log("res people:::::::", res.data);
        setPeopleData([...res.data]);
        setActiveIndex("");
        setLoading(false);
      })
      .catch((err) => {
        console.log("err:::::", err);
      });
  };

  const onClickSummaries = (index) => {
    const arr = [...data];
    arr[index].summariesActive = !arr[index].summariesActive;
    setData([...arr]);
    if (data[index].summariesActive === false) {
      return;
    }
    setData(
      [...data].map((obj, ind) => {
        if (ind == index) {
          return {
            ...obj,
            predictionActive: false,
            peopleActive: false,
            summariesActive: true,
            fullTranscriptActive: false,
          };
        } else {
          return {
            ...obj,
            predictionActive: false,
            peopleActive: false,
            summariesActive: false,
            fullTranscriptActive: false,
          };
        }
      })
    );
    setActiveIndex(index);
    setLoading(true);
    getSummarySummaries(data[index].source_id)
      .then((res) => {
        console.log("res setPredictionData:::::::", res.data);
        setSummariesData([...res.data]);
        setActiveIndex("");
        setLoading(false);
      })
      .catch((err) => {
        console.log("err:::::", err);
      });
  };
  const onClickFullTranscript = (index) => {
    const arr = [...data];
    arr[index].fullTranscriptActive = !arr[index].fullTranscriptActive;
    setData([...arr]);
    if (data[index].fullTranscriptActive === false) {
      return;
    }
    setData(
      [...data].map((obj, ind) => {
        if (ind === index) {
          return {
            ...obj,
            predictionActive: false,
            peopleActive: false,
            summariesActive: false,
            fullTranscriptActive: true,
          };
        } else {
          return {
            ...obj,
            predictionActive: false,
            peopleActive: false,
            summariesActive: false,
            fullTranscriptActive: false,
          };
        }
      })
    );
    setActiveIndex(index);
    setLoading(true);
    getFullTranscript(data[index].source_id)
      .then((res) => {
        console.log("res setPredictionData:::::::", res.data);
        setFullTranscriptData([...res.data]);
        // setFullTranscriptData([]);
        setActiveIndex("");
        setLoading(false);
      })
      .catch((err) => {
        console.log("err:::::", err);
      });
  };
  const onClickSummariesCol = (index) => {
    const arr = [...data];
    arr[index].Active = !arr[index].Active;
    setData([...arr]);
    onClickPrediction(index);
    onClickPeople(index);
    onClickSummaries(index);
    onClickFullTranscript(index);
  };

  return (
    <div className="summaries">
      <Header searchLeaderboard={searchLeaderboard} />
      <SummariesSubheader
        sortByPublicationDate={sortByPublicationDate}
        sortByNumberOfPredictions={sortByNumberOfPredictions}
      />

      {data.length === 0 && <Skeleton />}

      {/* Column Starts */}
      {data.map((val, index) => {
        return (
          <>
            {/* Column Starts */}
            <div className="summaries-col">
              <div className="summaries-col-1">
                <img
                  alt=""
                  src={val.image_url || "/youtube.svg"}
                  style={{ width: "7.5%", height: "auto" }}
                />
                <div className="sub-col-1">
                  <div className="sub-col-text-1 flex flex-warp w-full">
                    <span className="channel-name">
                      [{val.channel_name.slice(0, 20)}]
                    </span>
                    &nbsp;{val.source_title.slice(0, 60)}...
                  </div>
                  <div className="sub-col-text-2">
                    Views: {Math.round(val?.views / 1000000)}M | Length:{" "}
                    {convertMinsToHrsMins(val.duration)}
                  </div>
                </div>
              </div>
              <div className="summaries-col-2">
                <div className="sub-col-2">
                  <div className="sub-col-text-2 text-white">
                    {val.number_of_predictions}
                  </div>
                </div>
              </div>
              <div className="summaries-col-3">
                <div className="sub-col-text-2 text-white">
                  {val.publication_date.toString().slice(0, 10)}
                </div>
              </div>
              <div
                className="summaries-col-4"
                onClick={() => {
                  onClickSummariesCol(index);
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

            {/* Mobile View Starts */}
            <div
              className="mob-summaries-col"
              onClick={() => {
                onClickSummariesCol(index);
              }}
            >
              <div className="summaries-header flex !justify-between w-full">
                <div className="flex gap-4 items-center">
                  <div class="image-container">
                    <img
                      alt="Custom Image"
                      src={val.image_url || "/youtube.svg"}
                    />
                  </div>

                  <div className="summaries-header-content flex flex-col">
                    <h6 className="">
                      [{val.channel_name}] {val.source_title.slice(0, 43)}..
                    </h6>
                    <span style={{ color: "#aeaeae" }}>
                      Views: {Math.round(val?.views / 1000000)}M | Length:{" "}
                      {convertMinsToHrsMins(val.duration)}
                    </span>
                  </div>
                </div>
                <div className="text-lg">
                  {val?.Active ? <FaMinus /> : <FaPlus />}
                </div>
              </div>
              <div className="summaries-body">
                <div className="col">
                  <span>No. of Predictions</span>
                  <h6>{val.number_of_predictions}</h6>
                </div>
                <div className="col">
                  <span>Publish Date</span>
                  <h6>{val.publication_date.toString().slice(0, 10)}</h6>
                </div>
              </div>
            </div>
            {!loading && val?.Active ? (
              <>
                <div className="mob-active-col">
                  <Tabs
                    items={[
                      {
                        title: "Summaries",
                        content: (
                          <div className="mob-summaries-active">
                            <div className="mob-summaries">
                              {summariesData.map((val, index) => {
                                return (
                                  <>
                                    <div className="as-col-1-row" key={index}>
                                      <div className="text-white">
                                        {val?.summary_title.slice(0, 50)}...
                                      </div>
                                      <div
                                        onClick={() => {
                                          // setSubSectionIndex((prev) => !prev);
                                          setSubSectionIndex(index);
                                        }}
                                      >
                                        {subSectionIndex === index ? (
                                          <img
                                            style={{
                                              position: "relative",
                                              width: "21.5px",
                                              height: "21.5px",
                                            }}
                                            alt=""
                                            src="/vector-1433.svg"
                                          />
                                        ) : (
                                          <img
                                            style={{
                                              position: "relative",
                                              width: "21.5px",
                                              height: "21.5px",
                                            }}
                                            alt=""
                                            src="/vector-278.svg"
                                          />
                                        )}
                                      </div>
                                    </div>
                                    {subSectionIndex === index ? (
                                      <div
                                        style={{
                                          paddingRight: "20px",
                                          marginTop: "10px",
                                          color: "#AEAEAE",
                                          fontFamily: "inter",
                                          fontSize: "16px",
                                        }}
                                      >
                                        {val?.summary_text}
                                      </div>
                                    ) : null}
                                  </>
                                );
                              })}
                            </div>
                          </div>
                        ),
                      },
                      {
                        title: "Predictions",
                        content: (
                          <div className="mob-predictions-active">
                            {predictionData.map((val, index) => {
                              return (
                                <div className="body">
                                  <div className="ap-col-1-row">
                                    <div
                                      style={{
                                        position: "relative",
                                        fontWeight: "500",
                                        display: "flex",
                                        alignItems: "center",
                                      }}
                                    >
                                      {val?.prediction.slice(0, 40)}...
                                    </div>
                                    <div
                                      onClick={() => {
                                        // setSubSection((prev) => !prev);
                                        console.log(index);
                                        setSubSectionIndex(index);
                                      }}
                                    >
                                      {subSectionIndex === index ? (
                                        <img alt="" src="/vector-1433.svg" />
                                      ) : (
                                        <img alt="" src="/vector-278.svg" />
                                      )}
                                    </div>
                                  </div>
                                  {subSectionIndex === index ? (
                                    <div
                                      style={{
                                        paddingRight: "20px",
                                        marginTop: "10px",
                                        color: "#AEAEAE",
                                        fontFamily: "inter",
                                        fontSize: "14px",
                                      }}
                                    >
                                      {val?.prediction}
                                      <p style={{ color: "#4B6CC2" }}>
                                        Status:
                                        <span
                                          style={{
                                            color:
                                              val?.prediction_validation ==
                                              "TRUE"
                                                ? "green"
                                                : val?.prediction_validation ==
                                                  "FALSE"
                                                ? "#E72E2E"
                                                : val?.prediction_validation ==
                                                  "PARTIALLY TRUE"
                                                ? "#2DD22A"
                                                : val?.prediction_validation ==
                                                  "PENDING"
                                                ? "#374C98"
                                                : "#D29D15",
                                            fontFamily: "inter",
                                            fontSize: "14px",
                                          }}
                                        >
                                          {" "}
                                          {val?.prediction_validation}
                                        </span>
                                      </p>
                                      <p style={{ color: "#4B6CC2" }}>
                                        Settled Date:{" "}
                                        <span
                                          style={{
                                            fontSize: "14px",
                                            color: "#AEAEAE",
                                          }}
                                        >
                                          {val?.fixed_date}
                                        </span>
                                      </p>
                                    </div>
                                  ) : null}
                                </div>
                              );
                            })}
                          </div>
                        ),
                      },
                      {
                        title: "People",
                        content: (
                          <div className="mob-people-active">
                            {peopleData.map((val, index) => {
                              return (
                                <div className="mob-people-section">
                                  <div className="ps-header">
                                    <div className="col-1">
                                      <div className="col-img">
                                        <img
                                          alt=""
                                          src={val?.image_url}
                                          style={{
                                            width: "40px",
                                            height: "40px",
                                            objectFit: "cover",
                                            borderRadius: "50%",
                                          }}
                                        />
                                      </div>
                                      <div className="col-content gap-2 flex flex-col">
                                        <h6>
                                          {val?.first_name.startsWith("Unknown")
                                            ? "Unknown"
                                            : val?.first_name +
                                              " " +
                                              val?.last_name}
                                        </h6>
                                        <span style={{ color: "#aeaeae" }}>
                                          Predictor
                                        </span>
                                      </div>
                                    </div>
                                    <div
                                      className="col-2"
                                      onClick={() =>
                                        navigate("/Profiles", {
                                          state: { id: val?.user_id },
                                        })
                                      }
                                    >
                                      Full Profile
                                    </div>
                                  </div>
                                  <div className="ps-body">
                                    <div className="col">
                                      <img
                                        src="/score.png"
                                        alt="score"
                                        width={30}
                                        height={30}
                                      />
                                      <div className="detail gap-2 flex flex-col">
                                        <h6>Score</h6>
                                        <span>
                                          {Math.floor(val?.accuracy_score)}%
                                        </span>
                                      </div>
                                    </div>
                                    <div className="col">
                                      <img
                                        src="/predictions.png"
                                        alt="prediction"
                                        width={30}
                                        height={30}
                                      />
                                      <div className="detail gap-2 flex flex-col">
                                        <h6>Predictions</h6>
                                        <span>{val?.total_predictions}</span>
                                      </div>
                                    </div>
                                    <div className="col">
                                      <img
                                        src="/pending.png"
                                        alt="pending"
                                        width={30}
                                        height={30}
                                      />
                                      <div className="detail gap-2 flex flex-col">
                                        <h6>Pending</h6>
                                        <span>{val?.pending_predictions}</span>
                                      </div>
                                    </div>
                                    <div className="col">
                                      <img
                                        src="/ep.png"
                                        alt="ep"
                                        width={30}
                                        height={30}
                                      />
                                      <div className="detail gap-2 flex flex-col">
                                        <h6>EP-Predictions</h6>
                                        <span>{val?.episode_predictions}</span>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        ),
                      },
                      {
                        title: "Transcript",
                        content: (
                          <>
                            <div className="mob-full-transcript">
                              <div className="head">Full Transcript</div>
                              {fullTranscriptData.map((val, index) => (
                                <div className="body" key={index}>
                                  <div className="">
                                    Duration:{" "}
                                    <span style={{ color: "#aeaeae" }}>
                                      {val?.time_range}
                                    </span>
                                  </div>
                                  <div className="">
                                    {" "}
                                    {val.user_name.startsWith("Unknown")
                                      ? ""
                                      : val.user_name}
                                  </div>
                                  <div className="">
                                    {val?.labelled_segments}
                                  </div>
                                </div>
                              ))}
                            </div>
                          </>
                        ),
                      },
                    ]}
                  />
                </div>
                <div className="desktop-active-col w-full">
                  <Tabs
                    className={"px-6 pb-6 pt-2"}
                    items={[
                      {
                        title: "Summaries",
                        content: (
                          <div className="active-summaries-section">
                            <div className="as-col-1 h-full">
                              {summariesData.map((val, index) => {
                                return (
                                  <>
                                    <div
                                      className="as-col-1-row"
                                      onClick={() => {
                                        setSubSectionIndex(index);
                                      }}
                                    >
                                      <div
                                        className={`as-col-1-row-inner py-3 px-2 rounded-lg text-sm cursor-pointer ${
                                          subSectionIndex === index
                                            ? "bg-[#4b6cc2]"
                                            : "bg-[#262626]"
                                        }`}
                                      >
                                        <span className="">
                                          {"["}
                                          {val?.time}
                                          {"]"}&nbsp;&nbsp;&nbsp;
                                        </span>
                                        {val?.summary_title.slice(0, 60)}...
                                      </div>
                                    </div>
                                  </>
                                );
                              })}
                            </div>

                            <div className="h-full w-1/2 flex flex-col gap-4 ">
                              <div className="h-3/5">
                                <iframe
                                  allowFullScreen
                                  style={{
                                    width: "100%",
                                    height: "100%",
                                    objectFit: "cover",
                                    borderRadius: "8px",
                                    height: "100%",
                                  }}
                                  alt=""
                                  src={`https://youtube.com/embed/${summariesData[subSectionIndex]?.youtube_id}?start=${summariesData[subSectionIndex]?.youtube_start_time}`}
                                />
                              </div>

                              <div className="text-sm bg-[#000000] p-4 rounded-lg h-2/5 overflow-y-auto">
                                {summariesData[subSectionIndex]?.summary_text}
                              </div>
                            </div>
                          </div>
                        ),
                      },
                      {
                        title: "Predictions",
                        content: (
                          <div className="active-predictions-section w-full">
                            <div className="ap-col-1 pr-4">
                              {predictionData.map((val, index) => {
                                return (
                                  <>
                                    <div
                                      className={`as-col-1-row-inner py-3 px-2 rounded-lg text-sm cursor-pointer ${
                                        subSectionIndex === index
                                          ? "bg-[#4b6cc2]"
                                          : "bg-[#262626]"
                                      }`}
                                      onClick={() => {
                                        console.log(index);
                                        setSubSectionIndex(index);
                                      }}
                                    >
                                      <div
                                        className="truncate w-full"
                                        style={{
                                          position: "relative",
                                          fontWeight: "500",
                                          display: "flex",
                                          alignItems: "center",
                                          flexShrink: "0",
                                        }}
                                      >
                                        <span
                                          style={{
                                            color:
                                              val?.prediction_validation ===
                                              "TRUE"
                                                ? "green"
                                                : val?.prediction_validation ===
                                                  "FALSE"
                                                ? "#E72E2E"
                                                : val?.prediction_validation ===
                                                  "PARTIALLY TRUE"
                                                ? "#2DD22A"
                                                : val?.prediction_validation ===
                                                  "PENDING"
                                                ? "#374C98"
                                                : "#D29D15",
                                            fontFamily: "inter",
                                            fontSize: "14px",
                                            fontWeight: "650",
                                          }}
                                        >
                                          [{val?.prediction_validation}]
                                        </span>{" "}
                                        &nbsp;{val?.prediction}
                                      </div>
                                    </div>
                                  </>
                                );
                              })}
                            </div>

                            <div className="ap-col-2 h-3/5">
                              <iframe
                                allowFullScreen
                                style={{
                                  width: "100%",
                                  height: "100%",
                                  objectFit: "cover",
                                  borderRadius: "14px",
                                }}
                                alt=""
                                src={`https://youtube.com/embed/${predictionData[subSectionIndex]?.youtube_id}?start=${predictionData[subSectionIndex]?.youtube_start_time}`}
                              />
                              <div className="h-2/5 bg-[#000000] p-4 rounded-lg w-full flex flex-col gap-4 overflow-y-auto">
                                <div className="flex gap-4">
                                  <p style={{ color: "#4B6CC2" }}>
                                    Status:
                                    <span
                                      style={{
                                        color:
                                          predictionData[subSectionIndex]
                                            ?.prediction_validation === "TRUE"
                                            ? "green"
                                            : predictionData[subSectionIndex]
                                                ?.prediction_validation ===
                                              "FALSE"
                                            ? "#E72E2E"
                                            : predictionData[subSectionIndex]
                                                ?.prediction_validation ===
                                              "PARTIALLY TRUE"
                                            ? "#2DD22A"
                                            : predictionData[subSectionIndex]
                                                ?.prediction_validation ===
                                              "PENDING"
                                            ? "#374C98"
                                            : "#D29D15",
                                        fontFamily: "inter",
                                        fontSize: "14px",
                                      }}
                                    >
                                      {" "}
                                      {
                                        predictionData[subSectionIndex]
                                          ?.prediction_validation
                                      }
                                    </span>
                                  </p>{" "}
                                  |
                                  <p style={{ color: "#4B6CC2" }}>
                                    Settlement :{" "}
                                    <span
                                      style={{
                                        fontSize: "14px",
                                        color: "#AEAEAE",
                                      }}
                                    >
                                      {
                                        predictionData[subSectionIndex]
                                          ?.fixed_date
                                      }
                                    </span>
                                  </p>
                                </div>
                                {predictionData[subSectionIndex]?.prediction}
                              </div>
                            </div>
                          </div>
                        ),
                      },
                      {
                        title: "People",
                        content: (
                          <>
                            {peopleData.map((val, index) => {
                              return (
                                <div className="people-section">
                                  <div className="ps-col-1">
                                    <img
                                      alt=""
                                      src={val?.image_url}
                                      className="rounded-lg"
                                    />
                                    <div>
                                      <div
                                        style={{
                                          fontWeight: "800",
                                          display: "flex",
                                          alignItems: "center",
                                          flexShrink: "0",
                                          fontSize: "19px",
                                        }}
                                      >
                                        {val?.first_name.startsWith("Unknown")
                                          ? "Unknown"
                                          : val?.first_name +
                                            " " +
                                            val?.last_name}
                                      </div>
                                      <div
                                        style={{
                                          position: "relative",
                                          fontSize: "16px",
                                          color: "#aeaeae",
                                          display: "flex",
                                          alignItems: "center",
                                          width: "116px",
                                          height: "20px",
                                          flexShrink: "0",
                                        }}
                                      >
                                        Predictor
                                      </div>
                                    </div>
                                  </div>
                                  <div className="ps-col-2">
                                    <div className="sub-col-2">
                                      <div className="sub-col-text-1">
                                        {Math.floor(val?.accuracy_score)}%
                                      </div>
                                      <div className="sub-col-text-2">
                                        Score
                                      </div>
                                    </div>
                                    <div className="sub-col-2">
                                      <div className="sub-col-text-1">
                                        {val?.total_predictions}
                                      </div>
                                      <div className="sub-col-text-2">
                                        Predictions
                                      </div>
                                    </div>
                                    <div className="sub-col-2">
                                      <div className="sub-col-text-1">
                                        {val?.pending_predictions}
                                      </div>
                                      <div className="sub-col-text-2">
                                        Pending
                                      </div>
                                    </div>
                                    <div className="sub-col-2">
                                      <div className="sub-col-text-1">
                                        {val?.episode_predictions}
                                      </div>
                                      <div className="sub-col-text-2">{`Episode Predictions `}</div>
                                    </div>
                                  </div>

                                  <div
                                    style={{
                                      borderRadius: "8px",
                                      backgroundColor: "#282828",
                                      height: "41px",
                                      overflow: "hidden",
                                      flexShrink: "0",
                                      display: "flex",
                                      flexDirection: "row",
                                      alignItems: "center",
                                      justifyContent: "center",
                                      padding: "17px 34px",
                                      boxSizing: "border-box",
                                      textAlign: "center",
                                      fontSize: "14px",
                                    }}
                                  >
                                    <Button
                                      style={{
                                        position: "relative",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        flexShrink: "0",
                                        color: "#4B6CC2",
                                        backgroundColor: "#282828",
                                      }}
                                      onClick={() =>
                                        navigate("/Leaderboards", {
                                          state: { id: val?.user_id },
                                        })
                                      }
                                    >
                                      Full Profile
                                    </Button>
                                  </div>
                                </div>
                              );
                            })}
                          </>
                        ),
                      },
                      {
                        title: "Full Transcript",
                        content: (
                          <div className="mob-people-active h-[60vh] max-h-[40rem] overflow-y-auto">
                            {fullTranscriptData.map((val, index) => {
                              return (
                                <div
                                  style={{
                                    backgroundColor:
                                      index % 2 === 0 ? "#282828" : "#202020",
                                  }}
                                  className="active-transcript-section"
                                >
                                  <div
                                    style={{
                                      width: "60px",
                                      height: "40px",
                                      display: "flex",
                                      flexDirection: "row",
                                      alignItems: "center",
                                      justifyContent: "flex-start",
                                    }}
                                  >
                                    <div
                                      style={{
                                        width: "259px",
                                        height: "40px",
                                        display: "flex",
                                        flexDirection: "column",
                                        alignItems: "flex-start",
                                        justifyContent: "center",
                                      }}
                                    >
                                      <div
                                        style={{
                                          position: "relative",
                                          display: "flex",
                                          alignItems: "center",
                                          width: "259px",
                                          height: "20px",
                                          flexShrink: "0",
                                        }}
                                      >
                                        {val?.time_range}
                                      </div>
                                    </div>
                                  </div>
                                  <div
                                    style={{
                                      position: "relative",
                                      width: "131px",
                                      height: "40px",
                                      color: "#aeaeae",
                                    }}
                                  >
                                    <div
                                      style={{
                                        width: "90%",
                                        display: "flex",
                                        flexDirection: "column",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        fontSize: "16px",
                                        color: "#fff",
                                      }}
                                    >
                                      {val?.image_url ? (
                                        <img
                                          src={val.image_url}
                                          alt={val.user_name}
                                          title={
                                            val.user_name.startsWith("Unknown")
                                              ? ""
                                              : val.user_name
                                          } // Tooltip on hover
                                          style={{
                                            width: "50px", // Smaller size
                                            height: "50px", // Ensure width and height are the same for a circle
                                            borderRadius: "50%", // Makes the image circular
                                            border: "2px solid #fff", // Thin white border, adjust color and width as needed
                                            objectFit: "cover", // Ensures the image covers the area without stretching
                                            marginBottom: "10px", // Space below the image
                                            cursor: "pointer", // Changes cursor to indicate hover effect
                                          }}
                                        />
                                      ) : null}
                                    </div>
                                  </div>
                                  <div
                                    style={{
                                      width: "90%",
                                      display: "flex",
                                      flexDirection: "column",
                                      alignItems: "left",
                                      justifyContent: "center",
                                      fontSize: "16px",
                                      color: "#fff",
                                    }}
                                  >
                                    <div
                                      style={{
                                        position: "relative",
                                        display: "flex",
                                        alignItems: "center",
                                        width: "90%",
                                        flexShrink: "0",
                                        flexWrap: "wrap",
                                      }}
                                    >
                                      {val?.labelled_segments}
                                    </div>
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        ),
                      },
                    ]}
                  />
                </div>
              </>
            ) : null}

            {activeIndex === index && loading ? (
              <div
                style={{
                  display: "flex",
                  width: "100%",
                  justifyContent: "center",
                }}
              >
                <CircularProgress />
              </div>
            ) : null}
          </>
        );
      })}
      {/* Column Description ENds */}
    </div>
  );
}

export default Summaries;
