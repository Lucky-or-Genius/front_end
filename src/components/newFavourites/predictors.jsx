import React from "react";

import Board from "./board";
import MobileLeaderBoard from "./mobileLeaderboard";
import useIsMobile from "../../hooks/useIsMobile";

const Predictors = ({ predictors, setPredictors }) => {
  const isMobile = useIsMobile();
  return (
    <div className="w-full">
      {isMobile ? (
        <MobileLeaderBoard data={predictors} setPredictors={setPredictors} />
      ) : (
        <Board data={predictors} setPredictors={setPredictors} />
      )}
    </div>
  );
};

export default Predictors;
