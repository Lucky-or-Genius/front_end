import React from "react";
import Modal from "../common/modal";
import infoIcon from "../../assets/hover_info.png";
import CircularProgress from "@mui/material/CircularProgress";

const ProofModal = ({ setShowModal, showModal, val, loading }) => {
  async function handleCancel(event) {
    event.stopPropagation();
    setShowModal(false);
  }
  return (
    <div>
      <Modal
        title={"Proof"}
        isOpen={showModal}
        centered={true}
        cancelModalHandler={handleCancel}
        className="add-channel-modal"
      >
        {loading ? (
          <div className="loader">
            <CircularProgress />
          </div>
        ) : (
          <div className="predictionActive-row-1">
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
                        val[0]?.prediction_type !== "BINARY" ? "20px" : "20px",
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
      </Modal>
    </div>
  );
};

export default ProofModal;
