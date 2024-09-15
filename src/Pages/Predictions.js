import React, { useState, useEffect, useRef } from "react";
import { Button } from "@mui/material";
import { useLocation } from "react-router-dom";
import { FaPlus, FaMinus } from "react-icons/fa6";

import "../styles/predictions.css";

import Header from "../components/Header";
import Tabs from "../components/common/tabs";
import {
  getPredictions,
  getPredictionSingle,
  getSortedPrediction,
  getSortedCategory,
} from "../services/Predictions.service";
import infoIcon from "../assets/hover_info6.png";
import SubHeader from "../components/predictions/subheader";
import PredictionVideo from "../components/predictions/video";
import Skeleton from "../components/common/skeleton";

const Predictions = () => {
  const location = useLocation();

  const [data, setData] = useState([]);
  const [userid, setUserId] = useState(location?.state?.id);
  const [summariesRead, setSummariesRead] = useState("6");
  const [sourceRead, setSourceRead] = useState("6");
  const [justificationRead, setJustificationRead] = useState("4");

  useEffect(() => {
    if (userid === undefined) {
      getPredictions()
        .then((res) => {
          console.log("res:::00000::::::", res.data);
          setData([...res.data]);
          setData(
            [...res.data].map((obj) => ({
              ...obj,
              predictionActive: false,
            }))
          );
        })
        .catch((err) => {
          console.log("err::::::", err);
        });
    } else {
      getPredictionSingle(location?.state?.id)
        .then((res) => {
          // console.log("res:::123456::::::", res.data);
          setData([...res.data]);
          setData(
            [...res.data].map((obj) => ({
              ...obj,
              predictionActive: false,
            }))
          );
        })
        .catch((err) => {
          console.log("err::::::", err);
        });
    }
  }, []);

  const fetchSortedPrediction = async (prediction) => {
    await getSortedPrediction(prediction)
      .then((res) => {
        setData([...res.data]);
        setData(
          [...res.data].map((obj) => ({
            ...obj,
            predictionActive: false,
          }))
        );
      })
      .catch((err) => {
        console.log("err::::::", err);
      });
  };
  const fetchSortedCategory = async (category) => {
    await getSortedCategory(category)
      .then((res) => {
        setData([...res.data]);
        setData(
          [...res.data].map((obj) => ({
            ...obj,
            predictionActive: false,
          }))
        );
      })
      .catch((err) => {
        console.log("err::::::", err);
      });
  };
  const onClickDescription = (index) => {
    const arr = [...data];
    arr[index].predictionActive = !arr[index].predictionActive;
    setData([...arr]);
  };
  const handleSummaries = () => {
    if (summariesRead === "6") {
      setSummariesRead("1000");
    } else {
      setSummariesRead("6");
    }
  };
  const handleSource = () => {
    if (sourceRead === "6") {
      setSourceRead("1000");
    } else {
      setSourceRead("6");
    }
  };

  const handleJustifications = () => {
    if (justificationRead === "4") {
      setJustificationRead("1000");
    } else {
      setJustificationRead("4");
    }
  };

  const interpolateColor = (score, startColor, endColor) => {
    const proportion = Math.abs(score) / 100;
    const startRGB = parseInt(startColor.substring(1), 16);
    const endRGB = parseInt(endColor.substring(1), 16);

    const r = Math.round(
      (startRGB >> 16) + proportion * ((endRGB >> 16) - (startRGB >> 16))
    );
    const g = Math.round(
      ((startRGB >> 8) & 0x00ff) +
        proportion * (((endRGB >> 8) & 0x00ff) - ((startRGB >> 8) & 0x00ff))
    );
    const b = Math.round(
      (startRGB & 0x0000ff) +
        proportion * ((endRGB & 0x0000ff) - (startRGB & 0x0000ff))
    );

    return `rgb(${r}, ${g}, ${b})`;
  };
  const clearData = (rawData) => {
    const cleanData = rawData.replace(/\\n/g, "\n").replace(/^\["|"\]$/g, "");
    return cleanData.split("\n").filter((line) => line.trim() !== "");
  };

  const calculateBackgroundColor = (score) => {
    const neutralColor = "#808080"; // Grey color for neutral score
    if (score >= 0) {
      return interpolateColor(score, neutralColor, "#50D200"); // Interpolate between grey and green
    } else {
      return interpolateColor(score, neutralColor, "#B32A2A"); // Interpolate between grey and red
    }
  };

  return (
    <div className="predictions">
      <Header />
      {/* Header Starts */}
      <SubHeader
        fetchSortedPrediction={fetchSortedPrediction}
        fetchSortedCategory={fetchSortedCategory}
      />
      {/* Header ENds */}
      {data.length === 0 && <Skeleton />}
      {/* Array Data Starts */}
      {data.map((val, index) => {
        return (
          <>
            <div
              className="prediction-row"
              onClick={() => {
                onClickDescription(index);
              }}
            >
              <div
                className="column-1"
                style={{
                  backgroundColor:
                    val?.prediction_validation === "PENDING"
                      ? "#374C98"
                      : val?.prediction_validation === "TRUE"
                      ? "#23B678"
                      : val?.prediction_validation === "UNDETERMINED"
                      ? "#D29D15"
                      : val?.prediction_validation === "PARTIALLY TRUE"
                      ? "#388E3C"
                      : "#E72E2E",
                  color:
                    val?.prediction_validation === "PARTIALLY TRUE"
                      ? "#FFFFFF"
                      : "#fff",
                }}
              >
                <p
                  style={{
                    fontSize: "16px",
                    fontWeight: "500",
                  }}
                >
                  {val?.prediction_validation === "PARTIALLY TRUE"
                    ? "PART TRUE"
                    : ""}{" "}
                  {val?.prediction_validation === "UNDETERMINED"
                    ? "UNDETERMINED"
                    : ""}{" "}
                  {val?.prediction_validation === "PENDING" ? "PENDING" : ""}{" "}
                  {val?.prediction_validation === "TRUE" ? "TRUE" : ""}{" "}
                  {val?.prediction_validation === "FALSE" ? "FALSE" : ""}
                </p>
              </div>
              <div className="column-2">
                <img alt="" src={val?.image_url} />
                {/* </div> */}
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-start",
                    justifyContent: "center",
                    fontFamily: "Inter",
                  }}
                >
                  <div
                    style={{
                      position: "relative",
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    {val?.first_name.startsWith("Unknown")
                      ? "Unknown"
                      : val?.first_name + " " + val?.last_name}
                  </div>
                </div>
              </div>
              <div className="column-2">{val?.category}</div>
              <div className="column-2">{val?.prediction}</div>
              <div className="column-3">
                <img
                  alt=""
                  src="/marketgraph.svg"
                  style={{
                    filter:
                      Math.round(val?.error) === 0
                        ? "grayscale(0%)"
                        : "grayscale(100%)",
                  }}
                />
              </div>
              <div className="column-3">
                <div>
                  {val?.predictionActive ? (
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
            </div>

            {/* mobile view starts */}
            <div
              className="mobile-predictions"
              onClick={() => onClickDescription(index)}
            >
              <div className="mp-row">
                <div className="block-1">
                  <img alt="" src={val?.image_url} />
                  <div className="name">
                    <div>Forcaster</div>
                    <span className="">
                      {val?.first_name.startsWith("Unknown")
                        ? "Unknown"
                        : val?.first_name + " " + val?.last_name}
                    </span>
                  </div>
                </div>
                <div className="block-2">
                  {val?.predictionActive ? (
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
              <div className="mp-row">
                <div className="block-1">
                  <div
                    style={{
                      backgroundColor:
                        val?.prediction_validation === "PENDING"
                          ? "#374C98"
                          : val?.prediction_validation === "TRUE"
                          ? "#23B678"
                          : val?.prediction_validation === "UNDETERMINED"
                          ? "#D29D15"
                          : val?.prediction_validation === "PARTIALLY TRUE"
                          ? "#388E3C"
                          : "#E72E2E",
                      width: "1rem",
                      height: "1rem",
                      borderRadius: "50%",
                    }}
                  />
                  <div className="">
                    Status :{" "}
                    <span
                      style={{
                        color:
                          val?.prediction_validation === "PENDING"
                            ? "#374C98"
                            : val?.prediction_validation === "TRUE"
                            ? "#23B678"
                            : val?.prediction_validation === "UNDETERMINED"
                            ? "#D29D15"
                            : val?.prediction_validation === "PARTIALLY TRUE"
                            ? "#388E3C"
                            : "#E72E2E",
                      }}
                    >
                      {val?.prediction_validation}
                    </span>
                  </div>
                </div>
                <div className="block-2">
                  <img
                    alt=""
                    src="/marketgraph.svg"
                    style={{ width: "1.7rem" }}
                  />
                </div>
              </div>

              <div className="mp-row">
                <div className="name">
                  Prediction - <span>{val?.category}</span>
                  <div className="" style={{ paddingTop: "12px" }}>
                    {val?.prediction}
                  </div>
                </div>
              </div>
            </div>
            {/* mobile view ends */}
            {val?.predictionActive ? (
              <>
                <div className="predictionActive">
                  <div className="predictionActive-row-1">
                    <div className="row-section-1">
                      <div className="analytics-row-1">
                        <div className="block">
                          <span>Made on</span>
                          <div className="value">{val?.publish_date}</div>
                        </div>
                        <div className="block">
                          <span>Resolves on</span>
                          <div className="value">{val?.fixed_date}</div>
                        </div>
                        <div className="block">
                          <span>Prediction Accuracy </span>
                          <div className="value">
                            {val?.prediction_accuracy}%
                          </div>
                        </div>
                        <div className="block">
                          <span>Status</span>
                          <div
                            style={{
                              position: "relative",
                              fontSize: "21px",
                              fontWeight: "800",
                              color:
                                val?.prediction_validation == "TRUE"
                                  ? "#10d200"
                                  : val?.prediction_validation ===
                                    "PARTIALLY TRUE"
                                  ? "#388E3C"
                                  : val?.prediction_validation === "PENDING"
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
                            {val?.prediction_validation}
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
                                val?.score < 0 ? "#B32A2A" : "#50D200",
                            }}
                          >
                            <div
                              style={{
                                position: "relative",
                                fontWeight: "600",
                              }}
                            >
                              {val?.score && Number(val?.score).toFixed(1)}
                              <span
                                style={{ fontSize: "16px", fontWeight: "500" }}
                              >
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
                                val?.days_since > 60 ? "#50D200" : "#B32A2A",
                            }}
                          >
                            <div
                              style={{
                                position: "relative",
                                fontWeight: "600",
                              }}
                            >
                              {val?.days_since}{" "}
                              <span
                                style={{ fontSize: "16px", fontWeight: "500" }}
                              >
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
                              {val?.prediction_type === "BINARY"
                                ? "N/A"
                                : val?.error}
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
                                val?.prediction_type !== "BINARY"
                                  ? "13px"
                                  : "18px",
                            }}
                          >
                            <div
                              style={{
                                position: "relative",
                                fontWeight: "600",
                              }}
                            >
                              {val?.prediction_type}
                            </div>
                          </div>
                        </div>
                      </div>
                      {/* Below Part Ends */}
                    </div>
                    {/* Youtube Video Starts */}
                    <div className="row-section-2">
                      <PredictionVideo val={val} />
                    </div>
                    {/* YouTube Video Ends */}
                  </div>
                  <div className="predictionActive-row-2">
                    <div className="heading">
                      Justification
                      <img
                        src={infoIcon}
                        alt="Info"
                        title="The reasoning behind what kind of prediction is made, as well as justification for the prediction result."
                        style={{
                          marginLeft: "5px",
                          width: "16px", // Adjust as needed
                          height: "16px", // Adjust as needed
                          cursor: "pointer",
                        }}
                      />
                    </div>
                    <div
                      className="content"
                      style={{
                        webkitLineClamp: justificationRead,
                        webkitBoxOrient: "vertical",
                      }}
                    >
                      <ul style={{ margin: "0", paddingLeft: "21px" }}>
                        <li style={{ marginBottom: "0px" }}>
                          {val?.justification}
                        </li>
                      </ul>
                    </div>
                    <div
                      style={{
                        position: "relative",
                        fontSize: "16px",
                        textAlign: "right",
                        display: "flex",
                        alignItems: "center",
                        flexShrink: "0",
                        cursor: "pointer",
                        justifyContent: "flex-end",
                        cursor: "pointer",
                      }}
                      onClick={handleJustifications}
                    >
                      {justificationRead === "4" ? "Read more" : "Read Less"}
                    </div>
                  </div>
                  <div
                    className="predictionActive-row-3"
                    style={{
                      borderRadius: "8px",
                      border: "1.2px solid #282828",
                      boxSizing: "border-box",
                      height: "auto",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "flex-start",
                      justifyContent: "flex-start",
                      padding: "22px",
                      gap: "16px",
                      fontSize: "20px",
                    }}
                  >
                    <div
                      style={{
                        position: "relative",
                        fontWeight: "600",
                        display: "flex",
                        alignItems: "center",
                        flexShrink: "0",
                      }}
                    >
                      Summaries
                      <img
                        src={infoIcon}
                        alt="Info"
                        title="Evidential summary of the most relevant articles from the best ranked sources, determined by our AI."
                        style={{
                          marginLeft: "5px",
                          width: "16px", // Adjust as needed
                          height: "16px", // Adjust as needed
                          cursor: "pointer",
                        }}
                      />
                    </div>
                    <div
                      style={{
                        position: "relative",
                        fontSize: "inherit",
                        fontFamily: "inherit",
                        color: "#fff",
                        display: "-webkit-inline-box",
                        alignItems: "center",
                        overflow: "hidden",
                        textOverflow: "inherit",
                        webkitLineClamp: summariesRead,
                        webkitBoxOrient: "vertical",
                      }}
                    >
                      <article key={index}>
                        <ul
                          style={{
                            margin: "0",
                            paddingLeft: "21px",
                            listStyleType: "none",
                            fontSize: "14px",
                          }}
                        >
                          {clearData(val.summaries).map((point, idx) => (
                            <li key={idx} style={{ marginBottom: "10px" }}>
                              {point}
                            </li>
                          ))}
                        </ul>
                      </article>
                    </div>
                    <div
                      style={{
                        position: "relative",
                        fontSize: "16px",
                        textAlign: "right",
                        display: "flex",
                        alignItems: "center",
                        flexShrink: "0",
                        width: "100%",
                        justifyContent: "flex-end",
                        cursor: "pointer",
                      }}
                      onClick={handleSummaries}
                    >
                      {summariesRead === "6" ? "Read more" : "Read Less"}
                    </div>
                  </div>
                  <div
                    className="predictionActive-row-4"
                    style={{
                      height: "auto",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "flex-start",
                      justifyContent: "flex-start",
                      gap: "8px",
                      fontSize: "14px",
                      color: "#1664da",
                    }}
                  >
                    <div
                      style={{
                        position: "relative",
                        fontSize: "20px",
                        fontWeight: "600",
                        color: "#4B6CC2",
                        display: "flex",
                        alignItems: "center",
                        flexShrink: "0",
                      }}
                    >
                      Sources
                    </div>

                    {val?.sources.map((val, index) => {
                      return (
                        <div>
                          {clearData(val).map((point, idx) => (
                            <li
                              key={idx}
                              className="line-clamp-6"
                              style={{
                                marginBottom: "12px",
                                webkitLineClamp: sourceRead,
                                webkitBoxOrient: "vertical",
                              }}
                            >
                              {point}
                            </li>
                          ))}
                        </div>
                      );
                    })}
                    <div
                      style={{
                        position: "relative",
                        fontSize: "16px",
                        textAlign: "right",
                        display: "flex",
                        alignItems: "center",
                        flexShrink: "0",
                        width: "100%",
                        justifyContent: "flex-end",
                        cursor: "pointer",
                      }}
                      onClick={handleSource}
                    >
                      {sourceRead === "6" ? "Read more" : "Read Less"}
                    </div>
                  </div>
                  <div
                    className="predictionActive-row-5"
                    style={{
                      borderRadius: "8px",
                      backgroundColor: "#282828",
                      overflow: "hidden",
                      flexShrink: "0",
                      width: "100%",
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "space-between",
                      padding: "10px 10px 10px 22px",
                      boxSizing: "border-box",
                      gap: "20px",
                      textAlign: "center",
                      color: "#fff",
                    }}
                  >
                    <div style={{ position: "relative" }}>
                      Did we get it wrong? Add context and evidence if you think
                      you see an error.
                    </div>
                    <Button
                      style={{
                        borderRadius: "8px",
                        backgroundColor: "#4B6CC2",
                        overflow: "hidden",
                        flexShrink: "0",
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "center",
                        padding: "17px 34px",
                        boxSizing: "border-box",
                        fontSize: "14px",
                        color: "#282828",
                        // move to the right:
                        marginLeft: "65px",
                      }}
                    >
                      Feedback
                    </Button>
                  </div>
                </div>

                <div className="mobPredictionActive">
                  <Tabs
                    items={[
                      {
                        title: "Status",
                        content: (
                          <>
                            <div className="status-section" key={index}>
                              <div className="analytics-body">
                                <div className="column">
                                  <div className="body-icon">
                                    <img
                                      src="/cal.png"
                                      alt=""
                                      className="w-10 h-10"
                                    />
                                  </div>
                                  <div className="text">
                                    <span style={{ color: "#AEAEAE" }}>
                                      Made On
                                    </span>
                                    <div className="value">
                                      {val?.publish_date}
                                    </div>
                                  </div>
                                </div>
                                <div className="column">
                                  <div className="body-icon">
                                    <img
                                      src="/r-cal.png"
                                      alt=""
                                      className="w-10 h-10"
                                    />
                                  </div>
                                  <div className="text">
                                    <span style={{ color: "#AEAEAE" }}>
                                      Released On
                                    </span>
                                    <div className="value">
                                      {val?.fixed_date}
                                    </div>
                                  </div>
                                </div>
                                <div className="column">
                                  <div className="body-icon">
                                    <img
                                      src="/points.png"
                                      alt=""
                                      className="w-10 h-10"
                                    />
                                  </div>
                                  <div className="text">
                                    <span style={{ color: "#AEAEAE" }}>
                                      Prediction Accuracy
                                    </span>
                                    <div className="value">
                                      {val?.prediction_accuracy}%
                                    </div>
                                  </div>
                                </div>
                                <div className="column">
                                  <div className="body-icon">
                                    <div
                                      className={`w-6 h-6 rounded-md m-2 ${
                                        val?.prediction_validation === "TRUE"
                                          ? "bg-[#10d200]"
                                          : val?.prediction_validation ===
                                            "PARTIALLY TRUE"
                                          ? "bg-[#388E3C]"
                                          : val?.prediction_validation ===
                                            "PENDING"
                                          ? "bg-[#374C98]"
                                          : "bg-[#f70000]"
                                      }`}
                                    />
                                  </div>
                                  <div className="text">
                                    <span style={{ color: "#AEAEAE" }}>
                                      Status
                                    </span>
                                    <div className="value">
                                      {val?.prediction_validation}
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div className="detail-body">
                                <div className="block">
                                  <span className="topic">Points </span>
                                  <div
                                    className="value"
                                    style={{
                                      backgroundColor:
                                        val?.score < 0 ? "#B32A2A" : "#50D200",
                                    }}
                                  >
                                    <div
                                      style={{
                                        position: "relative",
                                        fontWeight: "600",
                                      }}
                                    >
                                      {val?.score &&
                                        Number(val?.score).toFixed(1)}
                                      <span
                                        style={{
                                          fontSize: "12px",
                                          fontWeight: "500",
                                        }}
                                      >
                                        {" "}
                                        Pts
                                      </span>
                                    </div>
                                  </div>
                                </div>
                                <div className="block">
                                  <span className="topic">Timeline</span>
                                  <div
                                    className="value"
                                    style={{
                                      backgroundColor:
                                        val?.days_since > 60
                                          ? "#23B678"
                                          : "#B32A2A",
                                    }}
                                  >
                                    <div
                                      style={{
                                        position: "relative",
                                        fontWeight: "600",
                                      }}
                                    >
                                      {val?.days_since}{" "}
                                      <span
                                        style={{
                                          fontSize: "12px",
                                          fontWeight: "500",
                                        }}
                                      >
                                        Days
                                      </span>
                                    </div>
                                  </div>
                                </div>
                                <div className="block">
                                  <span className="topic">Error %</span>
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
                                      {val?.prediction_type === "BINARY"
                                        ? "N/A"
                                        : val?.error}
                                    </div>
                                  </div>
                                </div>
                                <div className="block">
                                  <span className="topic">Type</span>
                                  <div
                                    className="value"
                                    style={{
                                      backgroundColor: "#9d43bd",
                                      color: "#fff",
                                    }}
                                  >
                                    <div
                                      style={{
                                        position: "relative",
                                        fontWeight: "600",
                                      }}
                                    >
                                      {val?.prediction_type}
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div className="row-section-2">
                                <iframe
                                  style={{
                                    width: "100%",
                                    height: "100%",
                                    objectFit: "cover",
                                    borderRadius: "12px",
                                  }}
                                  alt=""
                                  src={`https://www.youtube.com/embed/${val?.youtube_id}?start=${val?.youtube_start_time}`}
                                />
                              </div>
                            </div>
                          </>
                        ),
                      },
                      {
                        title: "Full Information",
                        content: (
                          <>
                            <div className="info-section">
                              <div className="justification">
                                <span>Justification</span>
                                <div
                                  className=""
                                  style={{ paddingTop: "12px" }}
                                >
                                  {val?.justification}
                                </div>
                              </div>
                              <div className="mob-summaries">
                                <span>Summaries</span>
                                <div className="">{val?.summaries}</div>
                              </div>
                              <div className="sources">
                                <span>Source</span>
                                {val?.sources.map((val, index) => {
                                  return (
                                    <div
                                      key={index}
                                      style={{ paddingTop: "12px" }}
                                    >
                                      <a
                                        href={val}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                      >
                                        {val}
                                      </a>
                                    </div>
                                  );
                                })}
                              </div>
                              <div className="mob-feedback">
                                <div className="">
                                  Did we get it wrong? Add context and evidence
                                  if you think you see an error.
                                </div>
                                <button>Feedback</button>
                              </div>
                            </div>
                          </>
                        ),
                      },
                    ]}
                  />
                </div>
              </>
            ) : null}
          </>
        );
      })}
      {/* Array Data Ends */}
    </div>
  );
};

export default Predictions;
