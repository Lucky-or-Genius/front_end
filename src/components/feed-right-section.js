import React from "react";

import FeedRightSectionColumns from "./feed-right-section-columns";

const feedrightSection = ({ topPredictorsData }) => {
  return (
    <div
      className="right-section"
      style={{
        overflowY: "auto",
        height: "100%",
        width: "100%",
        borderRadius: "10px",
        padding: "0 16px",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div className="right-heading font-raleway text-2xl text-primary400 font-[500] pt-4 pb-8 top-0">
        <h4>Top Predictors</h4>
      </div>
      <div className="backdrop-blur-md bg-[#ffffff20] flex flex-col rounded-xl font-poppins">
        {topPredictorsData.map((predictor, index) => (
          <FeedRightSectionColumns
            key={index}
            rank={index + 1}
            name={`${predictor.first_name}  ${" "}  ${predictor.last_name}`}
            accuracy={predictor.prediction_accuracy}
            imgUrl={predictor.image_url}
            userId={predictor.user_id}
            className={
              index < topPredictorsData.length - 1
                ? "border-b-2 border-primary"
                : ""
            }
          />
        ))}
      </div>
    </div>
  );
};

export default feedrightSection;
