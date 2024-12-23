import React from "react";
import { toast } from "react-hot-toast";

import SummaryCard from "../newSummaries/summaryCard";
import { addRemoveFavourite } from "../../services/summaries.services";
import { useAppContext } from "../../utils/appContext";

const Sources = ({ summaries, setSummaries }) => {
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
