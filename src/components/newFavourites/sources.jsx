import React from "react";
import SourceCard from "./source-card";
import toast from "react-hot-toast";

import { addRemoveFavourite } from "../../services/summaries.services";
import Skeleton from "../newSummaries/skeleton";

const sources = ({ sources, setSources }) => {
  const accountId = localStorage.getItem("accountId");

  const toggleFavourite = (id) => {
    if (accountId === null) {
      toast.error("Login to add favourite");
      return;
    }
    const params = {
      accountId: String(accountId),
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

export default sources;
