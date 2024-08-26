import React from "react";
import Board from "./board";

const Predictors = ({ predictors, setPredictors }) => {
  return (
    <div>
      <Board data={predictors} setPredictors={setPredictors} />
    </div>
  );
};

export default Predictors;
