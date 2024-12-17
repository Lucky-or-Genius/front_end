import React, { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { toast } from "react-hot-toast";

import PredictionCard from "../components/newPrediction/prediction-card";
import {
  getPredictions,
  getSortedPrediction,
  getSortedCategory,
  addRemoveFavourite,
} from "../services/Predictions.service";
import Filters from "../components/newPrediction/filters";
import Pagination from "../components/newPrediction/pagination";
import Skeleton from "../components/newPrediction/skeleton";

const NewPrediction = () => {
  const [predictions, setPredictions] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const accountId = localStorage.getItem("accountId");

  const fetchSortedPrediction = async (prediction) => {
    await getSortedPrediction(prediction)
      .then((res) => {
        setPredictions(res.data);
      })
      .catch((err) => {
        console.log("err::::::", err);
      });
  };

  const fetchSortedCategory = async (category) => {
    await getSortedCategory(category)
      .then((res) => {
        setPredictions(res.data);
      })
      .catch((err) => {
        console.log("err::::::", err);
      });
  };

  const fetchPredictionData = useCallback(async () => {
    const res = await getPredictions(currentPage, accountId);
    setPredictions(res.data.predictions);
    setTotalPages(res.data.pagination.totalPages);
  }, [currentPage]);

  const toggleFavourite = (index, id) => {
    if (accountId === null) {
      toast.error("Login to add favourite");
      return;
    }
    const params = {
      accountId: String(accountId),
      predictionId: id,
    };
    const newData = [...predictions];
    newData[index].is_favourite = !newData[index].is_favourite;
    toast.success("updated!");
    addRemoveFavourite(params);
    setPredictions(newData);
  };

  useEffect(() => {
    fetchPredictionData();
  }, [fetchPredictionData]);

  const onPageChange = (page) => {
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div className="bg-primary min-h-screen h-full w-full overflow-y-auto pb-10">
      <div className="w-full flex py-6 justify-center">
        <span className="font-raleway text-3xl text-white font-[600]">
          Predictions
        </span>
      </div>
      <div className="pb-6 w-full justify-center flex items-center">
        <Filters
          fetchSortedPrediction={fetchSortedPrediction}
          fetchSortedCategory={fetchSortedCategory}
          fetchPredictionData={fetchPredictionData}
        />
      </div>

      {predictions?.length > 0 ? (
        <div className="grid grid-cols-1 2md:grid-cols-2 px-2 md:px-6 gap-4 w-full pb-4">
          {predictions?.map((prediction, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="w-full h-full flex "
            >
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
                favourite={prediction.is_favourite}
                toggleFavourite={toggleFavourite}
                index={index}
              />
            </motion.div>
          ))}
        </div>
      ) : (
        <Skeleton />
      )}

      <div className="">
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={onPageChange}
        />
      </div>
    </div>
  );
};

export default NewPrediction;
