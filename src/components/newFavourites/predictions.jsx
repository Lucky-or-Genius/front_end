import React from "react";

import { addRemoveFavourite } from "../../services/Predictions.service";
import toast from "react-hot-toast";
import PredictionCard from "../common/prediction-card";
import { useAppContext } from "../../utils/appContext";

const Predictions = ({ predictions, setPredictions }) => {
  const { user } = useAppContext();

  const toggleFavourite = async (index, id) => {
    const accountId = user?.accountId;

    if (!accountId) {
      return;
    }
    const params = {
      accountId: String(accountId),
      predictionId: id,
    };
    const newData = predictions.filter((obj) => obj.prediction_id !== id);
    setPredictions(newData);
    addRemoveFavourite(params);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 px-4 md:px-6 w-full">
      {predictions?.map((prediction, index) => (
        <PredictionCard
          key={index}
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
          favourite={prediction.is_favourite}
        />
      ))}
    </div>
  );
};

export default Predictions;
