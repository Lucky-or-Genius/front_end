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
  const [offset, setOffset] = useState(1);
  const [topPredictors, setTopPredictors] = useState([]);
  const [leaderboardLoading, setLeaderboardLoading] = useState(false);

  // For loading states
  const [feedLoading, setFeedLoading] = useState(true); // Only for the very first load
  const [isFetching, setIsFetching] = useState(false);

  const observerRef = useRef(null);

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
        const newData = [...feedData];
        newData[index1].matches[index2].is_favourite =
          !newData[index1].matches[index2].is_favourite;

        setFeedData(newData);

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
   * Fetch feed data whenever offset changes AND isFetching is true.
   * - On the very first load, we rely on feedLoading to show the skeleton.
   * - For subsequent loads, we rely on isFetching being set to true via the observer.
   */
  useEffect(() => {
    // If we're not currently in a fetching state, do nothing
    if (!isFetching && offset !== 1) return;

    const fetchFeedData = async () => {
      try {
        const feedResponse = await getFeedDetails(user?.accountId, offset);
        setFeedData((prevData) => [...prevData, ...feedResponse.data]);
      } catch (error) {
        console.error("Error fetching feed data:", error);
        toast.error("Failed to load feed data");
      } finally {
        setFeedLoading(false); // Only matters on first load
        setIsFetching(false);
      }
    };

    fetchFeedData();
  }, [offset, user?.accountId, isFetching]);

  /**
   * Trigger the first load (offset=1) as soon as component mounts.
   * We set `isFetching` to true so that the effect above can run.
   */
  useEffect(() => {
    // Only run on mount if feedData is empty
    if (!feedData.length) {
      setIsFetching(true);
    }
  }, [feedData.length]);

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
   * Intersection Observer callback:
   * - Increments offset by 1 if the target is 30% visible, and we are not already fetching.
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
   * Set up the Intersection Observer on the ref.
   */
  useEffect(() => {
    const observer = new IntersectionObserver(handleObserver, {
      root: null,
      rootMargin: "0px",
      threshold: 0.3, // Trigger at 30% of the viewport
    });

    if (observerRef.current) observer.observe(observerRef.current);

    return () => {
      if (observerRef.current) observer.unobserve(observerRef.current);
    };
  }, [handleObserver]);

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
      <div className="w-full h-full overflow-y-hidden flex flex-row">
        <div className="feed-part1">
          {feedLoading ? (
            <FeedSkeleton />
          ) : (
            <div className="px-4 md:px-0">
              <h2 className="font-raleway text-2xl font-[500] text-primary400 py-4">
                Recent Predictions
              </h2>
              {renderFeedItems}
              {/* Observer element goes after feed items */}
              <div ref={observerRef} className="observer-element" />
            </div>
          )}
        </div>

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
