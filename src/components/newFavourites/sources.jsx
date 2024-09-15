import React from "react";
import SourceCard from "./source-card";

import { addRemoveFavourite } from "../../services/summaries.services";

const sources = ({ sources, setSources }) => {
  const accountId = localStorage.getItem("accountId");

  const toggleFavourite = (id) => {
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
      {sources?.map((source, index) => (
        <SourceCard
          key={index}
          source={source}
          toggleFavourite={toggleFavourite}
          index={index}
        />
      ))}
    </div>
  );
};

export default sources;
