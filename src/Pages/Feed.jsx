import React, {
  useState,
  useEffect,
  useCallback,
  useMemo,
  useRef,
} from "react";
import toast from "react-hot-toast";

import { useAppContext } from "../utils/appContext";
import TrendingPredictionCard from "../components/trending-prediction-card";
import FeedRightSection from "../components/feed-right-section";
import {
  FeedSkeleton,
  LeaderboardSkeleton,
} from "../components/common/feed-skeleton";
import { getFeedDetails } from "../services/Feed.service";
import { leaderBoardData } from "../services/Leaderboards.service";
import { addRemoveFavourite } from "../services/Predictions.service";
import "../styles/feed.css";
import FeedCard from "../components/feed-card";

const Feed = () => {
  const { user, login } = useAppContext();

  const [feedData, setFeedData] = useState([]);
  const [offset, setOffset] = useState(0);
  const [topPredictors, setTopPredictors] = useState([]);
  const [leaderboardLoading, setLeaderboardLoading] = useState(false);

  // Controls the skeleton for the very first load
  const [feedLoading, setFeedLoading] = useState(true);

  // Controls whether we should fetch the next set of items
  const [isFetching, setIsFetching] = useState(false);

  // This ref points to our sentinel element
  const observerRef = useRef(null);

  /**
   * Toggle Favourite
   */
  const toggleFavourite = useCallback(
    async (index1, index2, id) => {
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
        predictionId: id,
      };

      try {
        // Update local feedData
        const newData = [...feedData];
        newData[index1].matches[index2].is_favourite =
          !newData[index1].matches[index2].is_favourite;
        setFeedData(newData);

        // Call API
        await addRemoveFavourite(params);
        toast.success("Updated favorite status!");
      } catch (error) {
        toast.error("Failed to update favorite status. Please try again.");
        console.error("Error in toggleFavourite:", error);

        // Revert UI if error
        const revertedData = [...feedData];
        revertedData[index1].matches[index2].is_favourite =
          !revertedData[index1].matches[index2].is_favourite;
        setFeedData(revertedData);
      }
    },
    [user, login, feedData]
  );

  /**
   * Fetch feed data when isFetching = true.
   */
  useEffect(() => {
    if (!isFetching) return;

    const fetchFeedData = async () => {
      try {
        const feedResponse = await getFeedDetails(offset);
        // Concatenate new data
        setFeedData((prevData) => [...prevData, ...feedResponse.data]);
      } catch (error) {
        console.error("Error fetching feed data:", error);
        toast.error("Failed to load feed data");
      } finally {
        setFeedLoading(false);
        setIsFetching(false);
      }
    };

    fetchFeedData();
  }, [offset, user?.accountId, isFetching]);

  /**
   * On first mount, trigger initial fetch if no data present
   */
  useEffect(() => {
    if (feedData.length === 0) {
      setIsFetching(true);
    }
  }, [feedData.length]);

  /**
   * Intersection Observer callback:
   * - Increments offset by 1 if sentinel is 70% visible,
   *   and we're not already fetching.
   */
  const handleObserver = useCallback(
    (entries) => {
      const [entry] = entries;
      if (entry.isIntersecting && !isFetching) {
        setIsFetching(true);
        setOffset((prevOffset) => prevOffset + 1);
      }
    },
    [isFetching]
  );

  /**
   * Observe the sentinel element (observerRef).
   */
  useEffect(() => {
    const observer = new IntersectionObserver(handleObserver, {
      root: null,
      rootMargin: "0px",
      threshold: 0.7,
    });

    if (observerRef.current) {
      observer.observe(observerRef.current);
    }

    return () => {
      if (observerRef.current) {
        observer.unobserve(observerRef.current);
      }
    };
  }, [handleObserver]);

  /**
   * Fetch leaderboard data once on mount (or if user changes).
   */
  useEffect(() => {
    const fetchLeaderBoardData = async () => {
      setLeaderboardLoading(true);
      try {
        const leaderboardResponse = await leaderBoardData(user?.accountId);
        setTopPredictors(leaderboardResponse.data);
      } catch (error) {
        console.error("Error fetching leaderboard data:", error);
        toast.error("Failed to load leaderboard data");
      } finally {
        setLeaderboardLoading(false);
      }
    };

    fetchLeaderBoardData();
  }, [user?.accountId]);

  /**
   * Render feed items
   */
  const renderFeedItems = useMemo(
    () =>
      feedData.map((feed, index1) => (
        <div key={feed.id || index1}>
          <TrendingPredictionCard
            news={feed.headline}
            source={feed.source}
            category={feed.category}
            date={feed.date}
            imgUrl={feed.img_url}
            sourceIconUrl={feed.source_icon}
            titleUrl={feed.article_url}
            description={feed.description}
          />
          <div className="rp-cards">
            {feed.matches.map((card, index2) => (
              <FeedCard
                category={card.category}
                userId={card.user_id}
                user={card.user}
                madeOn={card.publish_date}
                resolvedOn={card.fixed_date}
                imgUrl={card.image_url}
                predictionId={card.prediction_id}
                key={index2}
                prediction={card.prediction}
                status={card.status}
                index1={index1}
                index2={index2}
                toggleFavourite={toggleFavourite}
                favourite={card.is_favourite}
              />
            ))}
          </div>
        </div>
      )),
    [feedData, toggleFavourite]
  );

  return (
    <div className="feed-section">
      <div className="w-full h-full overflow-y-hidden flex flex-row min-h-screen">
        {/* Left section / main feed */}
        <div className="feed-part1">
          {feedLoading ? (
            <FeedSkeleton />
          ) : (
            <div className="px-4 md:px-0">
              <h2 className="font-raleway text-2xl font-[500] text-primary400 py-4">
                Recent Predictions
              </h2>
              {renderFeedItems}

              {/* Shimmer loader for "Loading more data" when scrolling */}
              {!feedLoading && isFetching && feedData.length > 0 && (
                <div className="flex flex-col items-center justify-center my-4">
                  <p className="text-gray-500 mt-2 font-semibold md:text-lg font-raleway transition-all ease-in-out animate-pulse">
                    Loading more data...
                  </p>
                </div>
              )}

              {/* Intersection Observer Sentinel */}
              <div
                ref={observerRef}
                className="observer-element h-1 w-full"
                style={{ background: "transparent" }}
              />
            </div>
          )}
        </div>

        {/* Right section / leaderboard */}
        <div className="overflow-y w-[25%] md:flex hidden pb-6">
          {leaderboardLoading ? (
            <LeaderboardSkeleton />
          ) : (
            <FeedRightSection topPredictorsData={topPredictors} />
          )}
        </div>
      </div>
    </div>
  );
};

export default React.memo(Feed);
