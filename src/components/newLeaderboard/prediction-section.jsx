import React from "react";
import toast from "react-hot-toast";
import PredictionCard from "./prediction-card";
import Filters from "./prediction-filters";
import { addRemoveFavourite } from "../../services/Predictions.service";

const Section = ({
  setUserPredictions,
  userPredictions,
  setCategory,
  setPredictionType,
}) => {
  const accountId = localStorage.getItem("accountId");

  const toggleFavourite = (index, id) => {
    if (accountId === null) {
      toast.error("Login to add favourite");
      return;
    }
    const params = {
      accountId: String(accountId),
      predictionId: id,
    };
    const newData = [...userPredictions];
    newData[index].is_favourite = !newData[index].is_favourite;
    toast.success("updated!");
    addRemoveFavourite(params);
    setUserPredictions(newData);
  };

  if (userPredictions?.length > 0) {
    return (
      <>
        <div className=" w-full flex items-start pb-6">
          <Filters
            setCategory={setCategory}
            setPredictionType={setPredictionType}
          />
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
              favourite={item.is_favourite}
              toggleFavourite={toggleFavourite}
              index={index}
            />
          ))}
        </div>
      </>
    );
  } else {
    <div className="">No predictions</div>;
  }
};

export default Section;
