import React from "react";
import PredictionCard from "./prediction-card";
import Filters from "../newPrediction/filters";

const Section = ({ userPredictions }) => {
  if (userPredictions?.length > 0) {
    return (
      <>
        <div className=" w-full flex items-start pb-6">
          <Filters />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 w-full gap-4">
          {userPredictions?.map((item, index) => (
            <PredictionCard
              key={index}
              user={`${item.first_name} ${" "} ${item.last_name}`}
              imgUrl={item.image_url}
              prediction={item.prediction}
              madeOn={item.publish_date}
              resolvedOn={item.fixed_date}
              category={item.category}
              status={item.prediction_validation}
              predictionId={item.prediction_id}
            />
          ))}
        </div>
      </>
    );
  } else {
    <>"no predictions"</>;
  }
};

export default Section;
