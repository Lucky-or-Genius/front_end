import React, { useState } from "react";
import { TbArrowsUpDown } from "react-icons/tb";
import "../../styles/leaderboard/subheader.css";
import infoIcon from "../../assets/hover_info6.png";

const Subheader = ({
  sortLeaderboardByAccuracy,
  sortLeaderboardByScore,
  sortLeaderboardByBankroll,
  className,
}) => {
  const [accuracyOrder, setAccuracyOrder] = useState("desc");
  const [scoreOrder, setScoreOrder] = useState("score_desc");
  const [bankrollOrder, setBankrollOrder] = useState("bankroll_desc");

  const handleAccuracySort = () => {
    const newOrder = accuracyOrder === "desc" ? "accuracy_asc" : "desc";
    setAccuracyOrder(newOrder);
    sortLeaderboardByAccuracy(newOrder);
  };
  const handleScoreSort = () => {
    const newOrder = scoreOrder === "score_desc" ? "score_asc" : "score_desc";
    setScoreOrder(newOrder);
    sortLeaderboardByScore(newOrder);
  };
  const handleBankrollSort = () => {
    const newOrder =
      bankrollOrder === "bankroll_desc" ? "bankroll_asc" : "bankroll_desc";
    setBankrollOrder(newOrder);
    sortLeaderboardByBankroll(newOrder);
  };

  const subheaderBlocks = [
    {
      block: <div>Rank</div>,
    },
    {
      block: <div className="leader-name">Name</div>,
    },
    {
      block: (
        <div className="flex items-center gap-2">
          Accuracy
          <img
            src={infoIcon}
            alt="Info"
            title="What is accuracy?"
            style={{
              marginLeft: "5px",
              width: "16px", // Adjust as needed
              height: "16px", // Adjust as needed
              cursor: "pointer",
            }}
          />
          <TbArrowsUpDown
            onClick={() => handleAccuracySort()}
            style={{ cursor: "pointer" }}
          />
        </div>
      ),
    },
    {
      block: (
        <div className="points flex items-center gap-2">
          Points
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
          <TbArrowsUpDown
            onClick={() => handleScoreSort()}
            style={{ cursor: "pointer" }}
          />
        </div>
      ),
    },
    {
      block: (
        <div className="bankroll flex items-center gap-2">
          Bankroll
          <img
            src={infoIcon}
            alt="Info"
            title="What is bankroll?"
            style={{
              marginLeft: "5px",
              width: "16px", // Adjust as needed
              height: "16px", // Adjust as needed
              cursor: "pointer",
            }}
          />
          <TbArrowsUpDown
            onClick={() => handleBankrollSort()}
            style={{ cursor: "pointer" }}
          />
        </div>
      ),
    },
    {
      block: <div className="fav">Favorite</div>,
    },
  ];
  return (
    <div className={`${className} leaderboard-subheader`}>
      {subheaderBlocks.map((item, index) => (
        <div key={index} className="subheader-block">
          {item.block}
        </div>
      ))}
    </div>
  );
};

export default Subheader;
