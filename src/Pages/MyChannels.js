import { Button } from "@mui/material";
import React, { useState, useEffect } from "react";
import { channelsData, addRemoveFavourite } from "../services/channels.service";
import { useNavigate } from "react-router-dom";
import { HiHeart, HiOutlineHeart } from "react-icons/hi2";
import { FaPlus, FaMinus } from "react-icons/fa6";
import "../styles/mychannels.css";
import AddChannelModal from "../components/addChannelModal";
import { LuCalendarDays } from "react-icons/lu";
import ChannelSubHeader from "../components/channels/subheader";

function MyChannels() {
  const [channelData, setChannelData] = useState([]);
  const [openAddChannel, setOpenAddChannel] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const navigate = useNavigate();
  const accountId = localStorage.getItem("accountId");

  const toggleFavourite = (index, id) => {
    const params = {
      accountId: String(accountId),
      channelId: id,
    };
    const newData = [...channelData];
    newData[index].is_favourite = !newData[index].is_favourite;
    addRemoveFavourite(params);
    setChannelData(newData);
  };

  const handleSubSection = (index) => {
    if (index === activeIndex) {
      setActiveIndex(-1);
      return;
    }
    setActiveIndex(index);
  };
  useEffect(() => {
    channelsData()
      .then((res) => {
        setChannelData([...res.data]);
      })
      .catch((err) => {
        console.log("err:::::", err);
      });
  }, []);
  return (
    <div className="myChannel">
      {/* Add Channel div Starts */}
      <div className="addChannel-section">
        <div className="block-1">Add New Channel</div>
        <div className="mob-block-2">
          <div onClick={() => setOpenAddChannel(true)}>
            <FaPlus />
          </div>
        </div>
      </div>
      {/* Add Channel div Ends */}
      <ChannelSubHeader />
      {/* Add Channel div Ends */}
      {/* Row Data Starts */}
      {channelData.map((val, index) => {
        return (
          <>
            <div className="channelData-row">
              <div className="block">
                <img
                  style={{
                    position: "relative",
                    borderRadius: "50%",
                    width: "48px",
                    height: "48px",
                    objectFit: "cover",
                  }}
                  alt=""
                  src={val?.ChannelImageUrl}
                />
                <div className="">{val?.ChannelName.slice(0, 20)}</div>
              </div>
              <div className="block">{val?.Summaries}</div>
              <div className="block">{val?.Predictions}</div>
              <div className="block">{val?.PredictionAccuracyPercent}%</div>
              <div className="block">
                {val.is_favourite ? (
                  <HiHeart
                    onClick={() => toggleFavourite(index, val?.channel_id)}
                    style={{ cursor: "pointer" }}
                  />
                ) : (
                  <HiOutlineHeart
                    onClick={() => toggleFavourite(index, val?.channel_id)}
                    style={{ cursor: "pointer" }}
                  />
                )}
              </div>
              <div className="block" onClick={() => handleSubSection(index)}>
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
            <div className="mob-channelData-row">
              <div className="header">
                <div className="part-1">
                  <img
                    src={val?.ChannelImageUrl}
                    alt=""
                    style={{
                      width: "40px",
                      height: "40px",
                      borderRadius: "50%",
                    }}
                  />
                  <div className="column-1">
                    <span style={{ color: "#aeaeae" }}>Channel Name</span>
                    <div className="">{val?.ChannelName.slice(0, 20)}</div>
                  </div>
                </div>
                <div
                  className=""
                  style={{ display: "flex", alignItems: "center", gap: "16px" }}
                >
                  {val.is_favourite ? (
                    <HiHeart
                      onClick={() => toggleFavourite(index, val?.user_id)}
                      style={{ cursor: "pointer" }}
                    />
                  ) : (
                    <HiOutlineHeart
                      onClick={() => toggleFavourite(index, val?.user_id)}
                      style={{ cursor: "pointer" }}
                    />
                  )}

                  <div
                    className="part-2"
                    onClick={() => handleSubSection(index)}
                    style={{ color: "#4d90fe" }}
                  >
                    {activeIndex === index ? <FaMinus /> : <FaPlus />}
                  </div>
                </div>
              </div>
              <div className="body">
                <div className="column">
                  <div className="body-icon">
                    <LuCalendarDays style={{ width: "30px", height: "30px" }} />
                  </div>
                  <div className="text">
                    <span style={{ color: "#AEAEAE" }}>Summaries</span>
                    <div className="value">{Math.floor(val?.Summaries)}</div>
                  </div>
                </div>
                <div className="column">
                  <div className="body-icon">
                    <LuCalendarDays style={{ width: "30px", height: "30px" }} />
                  </div>
                  <div className="text">
                    <span style={{ color: "#AEAEAE" }}>Predictions</span>
                    <div className="value">{val?.Predictions}</div>
                  </div>
                </div>
                <div className="column">
                  <div className="body-icon">
                    <LuCalendarDays style={{ width: "30px", height: "30px" }} />
                  </div>
                  <div className="text">
                    <span style={{ color: "#AEAEAE" }}>
                      Prediction Accuracy
                    </span>
                    <div className="value">
                      {val?.PredictionAccuracyPercent}%
                    </div>
                  </div>
                </div>
                {/* <div className="column">
                  <div className="body-icon">
                    <LuCalendarDays style={{ width: "30px", height: "30px" }} />
                  </div>
                  <div className="text">
                    <span style={{ color: "#AEAEAE" }}>Points</span>
                    <div className="value">
                      {Math.floor(val?.total_user_score)}
                    </div>
                  </div>
                </div> */}
              </div>
            </div>
            {/* Hidden Data Starts */}
            {index === activeIndex ? (
              <div className="channelData-active">
                <div className="section-1">
                  <div className="column-1">People</div>
                  <div className="column-2">
                    {val?.Users.map((val, index) => {
                      return (
                        <>
                          <div
                            style={{
                              borderRadius: "10px",
                              border: "1px solid white",
                              boxSizing: "border-box",
                              display: "flex",
                              flexDirection: "row",
                              alignItems: "center",
                              justifyContent: "flex-start",
                              padding: "6px 12px",
                              gap: "12px",
                              flexWrap: "wrap",
                            }}
                            onClick={() =>
                              navigate("/Profiles", {
                                state: { id: val?.user_id },
                              })
                            }
                          >
                            <img
                              style={{
                                position: "relative",
                                borderRadius: "50%",
                                width: "42px",
                                height: "42px",
                                objectFit: "cover",
                              }}
                              alt=""
                              src={val?.image_url}
                            />
                            <div
                              style={{
                                position: "relative",
                                display: "flex",
                                alignItems: "center",
                                flexShrink: "0",
                              }}
                            >
                              {val?.name}
                            </div>
                          </div>
                        </>
                      );
                    })}
                  </div>
                </div>
                <div className="section-1">
                  <div className="column-1">Topics</div>
                  <div className="column-2">
                    {val?.Categories.map((val, index) => (
                      <div className="" key={index}>
                        {" "}
                        {val.category}
                      </div>
                    ))}
                  </div>
                </div>
                <div className="section-1">
                  <div className="column-1">Pending Predictions</div>
                  <div className="column-2">{val?.TotalPendingPredictions}</div>
                </div>
                <div className="section-1">
                  <div className="column-1">Platforms</div>
                  <div className="column-2">
                    <img
                      style={{
                        position: "relative",
                        width: "36px",
                        height: "36px",
                      }}
                      alt=""
                      src="/youtube.svg"
                    />
                    <Button
                      style={{
                        borderRadius: "10px",
                        backgroundColor: "#2d2d2d",
                        border: "1px solid #e72e2e",
                        boxSizing: "border-box",
                        width: "172px",
                        height: "50px",
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "center",
                        padding: "1px",
                        fontSize: "16px",
                        color: "#e72e2e",
                      }}
                      onClick={() => alert("In Process....")}
                    >
                      Remove Channel
                    </Button>
                  </div>
                </div>
              </div>
            ) : null}
            {/* Hidden Data Ends */}
          </>
        );
      })}
      {/* Row Data Ends */}
      <AddChannelModal
        setShowModal={setOpenAddChannel}
        showModal={openAddChannel}
      />
    </div>
  );
}

export default MyChannels;
