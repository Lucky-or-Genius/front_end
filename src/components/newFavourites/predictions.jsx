import React from "react";

import { addRemoveFavourite } from "../../services/Predictions.service";
import PredictionCard from "./prediction-card";

const Channels = ({ predictions, setPredictions }) => {
  const accountId = localStorage.getItem("accountId");

  const toggleFavourite = (id) => {
    const params = {
      accountId: String(accountId),
      channelId: id,
    };
    const newData = predictions.filter((obj) => obj.channel_id !== id);
    setPredictions(newData);
    addRemoveFavourite(params);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 px-4 md:px-6 w-full">
      {predictions?.map((prediction, index) => (
        <PredictionCard
          user={`${prediction.first_name} ${" "} ${prediction.last_name}`}
          imgUrl={prediction.image_url}
          prediction={prediction.prediction}
          madeOn={prediction.publish_date}
          resolvedOn={prediction.fixed_date}
          category={prediction.category}
          status={prediction.prediction_validation}
          predictionId={prediction.prediction_id}
          userId={prediction.user_id}
          toggleFavourite={toggleFavourite}
        />
      ))}
    </div>
  );
};

export default Channels;
