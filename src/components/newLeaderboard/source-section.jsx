import React from "react";
import { toast } from "react-hot-toast";

import SummaryCard from "../newSummaries/summaryCard";
import { addRemoveFavourite } from "../../services/summaries.services";

const Sources = ({ summaries, setSummaries }) => {
  const accountId = localStorage.getItem("accountId");

  const toggleFavourite = (index, id) => {
    if (accountId === null) {
      toast.error("Login to add favourite");
      return;
    }
    const params = {
      accountId: String(accountId),
      sourceId: id,
    };
    const newData = [...summaries];
    newData[index].is_favourite = !newData[index].is_favourite;
    toast.success("updated!");
    addRemoveFavourite(params);
    setSummaries(newData);
  };
  return (
    <div className="w-full grid grid-cols-1 md:grid-cols-2 md:px-6 gap-4">
      {summaries?.map((summary, index) => (
        <SummaryCard
          key={index}
          summary={summary}
          toggleFavourite={toggleFavourite}
          index={index}
        />
      ))}
    </div>
  );
};

export default Sources;
