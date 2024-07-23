import React from "react";
import PredictionCard from "./prediction-card";

const Section = ({ userPredictions }) => {
  console.log(userPredictions);
  if (userPredictions?.length > 0) {
    return (
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
          />
        ))}
      </div>
    );
  } else {
    <>"no predictions"</>;
  }
};

export default Section;
