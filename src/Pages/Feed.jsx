import React, { useState, useEffect, useCallback, useMemo } from "react";
import toast from "react-hot-toast";

import { useAppContext } from "../utils/appContext";
import TrendingPredictionCard from "../components/trending-prediction-card";
import FeedRightSection from "../components/feed-right-section";
import FeedSkeleton from "../components/common/feed-skeleton";
import { getFeedDetails } from "../services/Feed.service";
import { leaderBoardData } from "../services/Leaderboards.service";
import { addRemoveFavourite } from "../services/Predictions.service";
import "../styles/feed.css";
import FeedCard from "../components/feed-card";

const Feed = () => {
  const { user, login } = useAppContext();
  const [feedData, setFeedData] = useState([]);
  const [topPredictors, setTopPredictors] = useState([]);
  const [loading, setLoading] = useState(false);
  const [openRowIndex, setOpenRowIndex] = useState(null);

  const handleRowClick = useCallback((index) => {
    setOpenRowIndex((prevIndex) => (prevIndex === index ? null : index));
  }, []);

  const toggleFavourite = useCallback(
    async (index1, index2, id) => {
      try {
        if (!user) {
          await login();
          if (!user) {
            toast.error("Login failed. Please try again.");
            return;
          }
        }
      } catch (error) {
        console.error("Error during login:", error);
        toast.error("Login process interrupted. Please try again.");
        return;
      }

      const accountId = user?.accountId;

      if (!accountId) {
        toast.error(
          "Unable to retrieve account information. Please try again."
        );
        return;
      }

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

        const revertedData = [...feedData];
        revertedData[index1].matches[index2].is_favourite =
          !revertedData[index1].matches[index2].is_favourite;
        setFeedData(revertedData);
      }
    },
    [user, login, feedData]
  );

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // Make only one API call to fetch both feed details and leaderboard data
        const [feedResponse, leaderboardResponse] = await Promise.all([
          getFeedDetails(user?.accountId),
          leaderBoardData(user?.accountId),
        ]);

        setFeedData(feedResponse.data);
        setTopPredictors(leaderboardResponse.data);
      } catch (error) {
        console.error("Error fetching feed data:", error);
        toast.error("Failed to load feed data");
      } finally {
        setLoading(false);
      }
    };

    fetchData(); // Trigger data fetch only when the user is available
  }, [user?.accountId]);

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
                onCardClick={() => handleRowClick(index2)}
                isOpen={openRowIndex === index2}
                index1={index1}
                index2={index2}
                toggleFavourite={toggleFavourite}
                favourite={card.is_favourite}
              />
            ))}
          </div>
        </div>
      )),
    [feedData, handleRowClick, openRowIndex, toggleFavourite]
  );

  if (loading)
    return (
      <div className="bg-primary min-h-screen">
        <FeedSkeleton />
      </div>
    );

  return (
    <div className="feed-section">
      <div className="w-full h-full overflow-y-hidden flex flex-row">
        <div className="feed-part1">
          <div className="px-4 md:px-0">
            <h2 className="font-raleway text-2xl font-[500] text-primary400 py-4">
              Recent Predictions
            </h2>
            {renderFeedItems}
          </div>
        </div>
        <div className="overflow-y w-[25%] md:flex hidden pb-6">
          <FeedRightSection topPredictorsData={topPredictors} />
        </div>
      </div>
    </div>
  );
};

export default React.memo(Feed);
