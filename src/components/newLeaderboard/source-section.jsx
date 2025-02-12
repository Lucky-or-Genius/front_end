import React, { useState, useCallback, useRef } from "react";
import { toast } from "react-hot-toast";

import SummaryCard from "../newSummaries/summaryCard";
import { addRemoveFavourite } from "../../services/summaries.services";
import { useAppContext } from "../../utils/appContext";
import { allPredictorSummarySources } from "../../services/summaries.services";

const Sources = ({ summaries: initialSummaries, setSummaries, userId }) => {
  const { user, login } = useAppContext();
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const observer = useRef();

  const lastSourceElementRef = useCallback(node => {
    if (isLoading) return;
    if (observer.current) observer.current.disconnect();
    
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasMore) {
        setPage(prevPage => prevPage + 1);
      }
    });

    if (node) observer.current.observe(node);
  }, [isLoading, hasMore]);

  // Load more sources when page changes
  React.useEffect(() => {
    const loadMoreSources = async () => {
      if (page === 1 || !userId) return;
      
      try {
        setIsLoading(true);
        const response = await allPredictorSummarySources(user?.accountId, userId, page);
        
        setSummaries(prev => ({
          ...prev,
          sources: [...prev.sources, ...response.data.sources],
          pagination: response.data.pagination
        }));

        setHasMore(page < response.data.pagination.totalPages);
      } catch (error) {
        console.error("Error loading more sources:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadMoreSources();
  }, [page, userId, user?.accountId, setSummaries]);

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
    if (!accountId) return;

    const params = {
      accountId: String(accountId),
      sourceId: id,
    };

    const summaryArray = Array.isArray(initialSummaries?.sources) ? initialSummaries.sources : [];
    const newData = [...summaryArray];
    newData[index].is_favourite = !newData[index].is_favourite;
    toast.success("updated!");
    addRemoveFavourite(params);
    setSummaries({ ...initialSummaries, sources: newData });
  };

  if (!initialSummaries?.sources) {
    return <div className="text-white text-center">No sources available</div>;
  }

  return (
    <div className="w-full grid grid-cols-1 md:grid-cols-2 md:px-6 gap-4">
      {initialSummaries.sources.map((summary, index) => (
        <div
          key={summary.id}
          ref={index === initialSummaries.sources.length - 1 ? lastSourceElementRef : null}
        >
          <SummaryCard
            summary={summary}
            toggleFavourite={toggleFavourite}
            index={index}
          />
        </div>
      ))}
      {isLoading && (
        <div className="text-white text-center col-span-2">
          Loading...
        </div>
      )}
    </div>
  );
};

export default Sources;
