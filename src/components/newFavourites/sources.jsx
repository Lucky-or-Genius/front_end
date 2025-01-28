import React from "react";
import SourceCard from "./source-card";
import toast from "react-hot-toast";

import { addRemoveFavourite } from "../../services/summaries.services";
import Skeleton from "../newSummaries/skeleton";
import { useAppContext } from "../../utils/appContext";

const Sources = ({ sources, setSources }) => {
  const { user, login } = useAppContext();

  const toggleFavourite = async (id) => {
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
      sourceId: id,
    };
    const newData = sources.filter((obj) => obj.source_id !== id);
    setSources(newData);
    addRemoveFavourite(params);
  };

  return (
    <div className="w-full grid grid-cols-1 md:grid-cols-2 md:px-6 gap-4">
      {sources.length > 0 ? (
        sources?.map((source, index) => (
          <SourceCard
            key={index}
            source={source}
            toggleFavourite={toggleFavourite}
            index={index}
          />
        ))
      ) : (
        <Skeleton />
      )}
    </div>
  );
};

export default Sources;
