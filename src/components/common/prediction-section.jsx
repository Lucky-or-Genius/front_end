import React from "react";

import toast from "react-hot-toast";
import { TbReload } from "react-icons/tb";

import PredictionCard from "./prediction-card";
import PredictionFilters from "./prediction-filters";
import { addRemoveFavourite } from "../../services/Predictions.service";
import { useAppContext } from "../../utils/appContext";

const Section = ({
  setPredictions,
  userPredictions,
  setCategory,
  setPredictionType,
  setCurrentPage,
  setNameTerm,
  setPredictionTerm,
  nameTerm,
  predictionTerm,
}) => {
  const { user, login } = useAppContext();

  const toggleFavourite = async (index, id) => {
    try {
      if (!user) {
        await login();
      }
    } catch (error) {
      console.error("Error during login:", error);
      toast.error("Login process interrupted. Please try again.");
      return;
    }

    const accountId = user?.accountId;

    if (!accountId) {
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
    setPredictions(newData);
  };

  if (userPredictions?.length > 0) {
    return (
      <>
        <div className=" w-full flex items-start pb-6">
          <PredictionFilters
            setCategory={setCategory}
            setPredictionType={setPredictionType}
            setCurrentPage={setCurrentPage}
            setNameTerm={setNameTerm}
            setPredictionTerm={setPredictionTerm}
            nameTerm={nameTerm}
            predictionTerm={predictionTerm}
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 w-full gap-4">
          {userPredictions?.map((item, index) => (
            <PredictionCard
              key={index}
              imgUrl={item.image_url}
              userId={item.user_id}
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
    return (
      <div className="w-full flex-col flex justify-center items-center gap-4 py-6">
        <img
          src="/images/noResultFound.svg"
          alt="noResultFound"
          className="w-30 h-30"
        />

        <div className="">
          <button
            onClick={() => {
              setCategory("");
              setPredictionType("");
              setPredictionTerm("");
              setNameTerm("");
              setCurrentPage(1);
            }}
            className="px-6 font-poppins py-1 h-12 md:text-lg rounded-lg border-white border text-white flex gap-2 items-center transtion-all active:scale-95 transition-all ease-in-out"
          >
            <TbReload /> Reset
          </button>
        </div>
      </div>
    );
  }
};

export default Section;
