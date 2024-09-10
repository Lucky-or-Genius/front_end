import React, { useState } from "react";

import { IoOptionsOutline } from "react-icons/io5";
import { PiSortDescendingBold, PiSortAscendingBold } from "react-icons/pi";

const Filters = ({ sortByPublicationDate, sortByNumberOfPredictions }) => {
  const [orderDate, setOrderDate] = useState("desc");
  const [orderPrediction, setOrderPrediction] = useState("desc");

  const handlePublicationDate = () => {
    const newOrder = orderDate === "asc" ? "desc" : "asc";
    setOrderDate(newOrder);
    sortByPublicationDate(newOrder);
  };

  const handlePredictionSort = () => {
    const newOrder = orderPrediction === "asc" ? "desc" : "asc";
    setOrderPrediction(newOrder);
    sortByNumberOfPredictions(newOrder);
  };

  return (
    <div className="flex gap-4 py-4 flex-wrap justify-center">
      <span className="flex items-center gap-2 text-primary400 font-raleway font-[500]">
        Filters{" "}
        <IoOptionsOutline className="border border-primary400 rounded-full p-1 w-6 h-6" />
      </span>
      <div className="gap-2 flex font-raleway">
        <button
          className="hover:bg-[#ffffff20] rounded-full gap-2 text-white px-4 py-1 flex items-center focus:bg-[#ffffff20] border border-[#ffffff20]"
          onClick={() => handlePredictionSort()}
        >
          Predictions{" "}
          {orderPrediction === "desc" ? (
            <PiSortDescendingBold />
          ) : (
            <PiSortAscendingBold />
          )}
        </button>
        <button
          onClick={() => handlePublicationDate()}
          className="hover:bg-[#ffffff20] rounded-full gap-2 text-white px-4 py-1 flex items-center focus:bg-[#ffffff20] border border-[#ffffff20]"
        >
          Publish Date{" "}
          {orderDate === "desc" ? (
            <PiSortDescendingBold />
          ) : (
            <PiSortAscendingBold />
          )}
        </button>
      </div>
    </div>
  );
};

export default Filters;
