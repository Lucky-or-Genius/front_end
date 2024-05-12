import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import { Line } from "react-chartjs-2";
import { FaPlus, FaMinus } from "react-icons/fa6";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
} from "chart.js";
import { getMarket, getMarketGraph } from "../services/Markets.service";
import Chart from "chart.js/auto";
import annotationPlugin from "chartjs-plugin-annotation";
import ChartDataLabels from "chartjs-plugin-datalabels";
import "../styles/markets.css";
import Skeleton from "../components/common/skeleton";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend
);
Chart.register(annotationPlugin);

function Markets() {
  const [marketData, setMarketData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [activeIndex, setActiveIndex] = useState("");
  const [currentGraph, setCurrentGraph] = useState({});

  useEffect(() => {
    getMarket()
      .then((res) => {
        console.log("res::::", res.data[0]);
        setMarketData([...res.data]);
        setMarketData(
          [...res.data].map((obj) => ({
            ...obj,
            peopleActive: false,
          }))
        );
      })
      .catch((err) => {
        console.log("err::::::::::", err);
      });
  }, []);
  const dateLabels = currentGraph?.labels?.map((timestamp) => {
    const date = new Date(timestamp * 1000); // Convert timestamp to milliseconds
    return `${date.getDate()}-${date.toLocaleString("default", {
      month: "short",
    })}`;
  });

  const data = {
    labels: Array.from(new Set(dateLabels)),
    datasets: [
      {
        label: "Area Chart Example",
        fill: true,
        lineTension: 0.1,
        borderColor: "#4B6CC2",
        borderWidth: 1,
        data: currentGraph?.values,
        pointRadius: 0,
      },
    ],
  };
  const onClickToggle = (index) => {
    const arr = [...marketData];
    arr[index].peopleActive = !arr[index].peopleActive;
    setMarketData([...arr]);
    if (marketData[index].peopleActive === false) {
      return;
    }
    setMarketData(
      [...marketData].map((obj, ind) => {
        if (ind === index) {
          return {
            ...obj,
            peopleActive: true,
          };
        } else {
          return {
            ...obj,
            peopleActive: false,
          };
        }
      })
    );
    setActiveIndex(index);
    setLoading(true);
    getMarketGraph(marketData[index]?.metadata?.event_ticker)
      .then((res) => {
        console.log("res graph:::::", res.data);
        setCurrentGraph(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log("err graph:::::", err);
      });
  };

  return (
    <div className="market-section">
      <Header />

      {marketData.length === 0 && <Skeleton />}
      {/* User Info Row Starts */}
      {marketData?.map((val, index) => {
        return (
          <>
            <div className="desktop-user-info-row">
              <div className="image-section">
                <img
                  className="user-image"
                  alt="user-image"
                  src={val?.image_url}
                />
              </div>
              <div className="title-section">
                <b className="title-section-text">
                  {val?.metadata.event_title}
                </b>
                <div className="title-section-details">
                  <div className="column ">
                    <div>{val?.metadata.category}</div>
                    <div
                      style={{
                        color: "#aeaeae",
                      }}
                    >
                      Topic
                    </div>
                  </div>
                  <div className="column ">
                    <div>
                      <span style={{ lineBreak: "anywhere", width: "100%" }}>
                        <span>{val?.metadata.settled_price}</span>
                      </span>
                    </div>
                    <div
                      style={{
                        color: "#aeaeae",
                      }}
                    >
                      Market Prediction
                    </div>
                  </div>
                  <div className="column ">
                    <div>{val?.metadata.settled_date}</div>
                    <div
                      style={{
                        color: "#aeaeae",
                      }}
                    >
                      Close Date
                    </div>
                  </div>
                </div>
              </div>
              <div className="title-images">
                <img className="image-block" alt="" src="/image-141@2x.png" />
                <img
                  className="image-block"
                  alt=""
                  src="/image-141@2x.png"
                  style={{ marginLeft: "-22px" }}
                />
                <div className="blue-disc">5+</div>
              </div>
              <div
                className="w-full cursor-pointer"
                onClick={() => onClickToggle(index)}
              >
                {val?.peopleActive ? <FaMinus /> : <FaPlus />}
              </div>
            </div>

            <div className="mob-user-info-row">
              <div className="info-section-1">
                <div className="text-section">
                  <div className="topic">
                    <span style={{ color: "#aeaeae" }}>Topic :</span>{" "}
                    {val?.metadata.category}
                  </div>
                  <div className="text">{val?.metadata.event_title}</div>
                </div>
                <div className="image-section">
                  <img alt="user-image" src={val?.image_url} />
                </div>
              </div>
              <div className="info-section-2">
                <div className="images-block">
                  <img className="image-block" alt="" src="/image-141@2x.png" />
                  <img
                    className="image-block"
                    alt=""
                    src="/image-141@2x.png"
                    style={{ marginLeft: "-22px" }}
                  />
                  <div className="yellow-disc">5+</div>
                </div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                  onClick={() => onClickToggle(index)}
                >
                  {val?.peopleActive ? (
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
            </div>

            {/* Graph Section Starts */}
            {activeIndex == index && val?.peopleActive ? (
              <div className="graph-container">
                <Line
                  style={{ width: "100%" }}
                  plugins={[ChartDataLabels]}
                  data={data}
                  options={{
                    maintainAspectRatio: false,
                    legend: { display: false },

                    elements: {
                      line: {
                        tension: 0.4, // Adjust this for your desired line curve smoothness.
                      },
                    },

                    scales: {
                      x: {
                        type: "category",
                        time: {
                          parser: "YYYY-MM-DD",
                          unit: "day",
                          displayFormats: {
                            day: "MMM D",
                          },
                        },
                        // barThickness: 10, // Adjust this value to control the bar width
                        // categoryPercentage: 1,
                        ticks: {
                          autoSkip: true,
                          maxTicksLimit: 5,
                          color: "#fff",
                        },
                        grid: {
                          display: false, // Remove vertical grid lines
                          // color: "#fff",
                        },
                        displayFormats: {
                          day: "MMM D",
                        },
                        // display: false,
                      },
                      y: {
                        // beginAtZero: true,
                        // max: 30,
                        // display: false,
                        position: "right",
                        ticks: {
                          color: "#fff", // Y-axis values label color
                        },
                        displayFormats: {
                          day: "MMM D",
                        },
                        grid: {
                          display: false, // Remove vertical grid lines
                        },
                      },
                    },
                    plugins: {
                      legend: { display: false },
                      elements: {
                        bar: {
                          barThickness: 1,
                          barPercentage: 0.1,
                        },
                      },

                      datalabels: {
                        color: "transparent", // Label color
                        font: {
                          size: 10, // Label font size
                          weight: "bold",
                        },
                        formatter: function (value, context) {
                          return value;
                        },
                      },
                    },
                    annotations: {
                      trendline: {
                        type: "line",
                        yMin:
                          currentGraph?.metadata?.settled_price == "Unsettled"
                            ? ""
                            : currentGraph?.metadata?.settled_price,
                        yMax:
                          currentGraph?.metadata?.settled_price == "Unsettled"
                            ? ""
                            : currentGraph?.metadata?.settled_price,
                        borderColor:
                          currentGraph?.metadata?.settled_price == "Unsettled"
                            ? ""
                            : "red",
                        borderWidth: 2,
                        borderDash: [5, 5], // Dotted line
                        label: {
                          enabled: false,
                        },
                      },
                    },
                  }}
                />
              </div>
            ) : null}
            {activeIndex == index && loading ? (
              <div
                style={{
                  display: "flex",
                  width: "100%",
                  justifyContent: "center",
                }}
              ></div>
            ) : null}
            {/* Graph Section Ends */}
          </>
        );
      })}
      {/* User Info Row Ends */}
    </div>
  );
}

export default Markets;
