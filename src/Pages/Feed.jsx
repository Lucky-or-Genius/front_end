import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import TrendingPredictionCard from "../components/trending-prediction-card";
import FeedRightSection from "../components/feed-right-section";
import FeedSkeleton from "../components/common/feed-skeleton";
import { getFeedDetails } from "../services/Feed.service";
import { leaderBoardData } from "../services/Leaderboards.service";
import { addRemoveFavourite } from "../services/Predictions.service";
import "../styles/feed.css";
import FeedCard from "../components/feed-card";

const Feed = () => {
  const [feedData, setFeedData] = useState([]);
  const [topPredictors, setTopPredictors] = useState([{}]);
  const [loading, setLoading] = useState(false);
  const [openRowIndex, setOpenRowIndex] = useState(null);
  const accountId = localStorage.getItem("accountId");

  const handleRowClick = (index) => {
    setOpenRowIndex(openRowIndex === index ? null : index);
  };
  const toggleFavourite = (index1, index2, id) => {
    const params = {
      accountId: String(accountId),
      predictionId: id,
    };
    const newData = [...feedData];
    newData[index1].matches[index2].is_favourite =
      !newData[index1].matches[index2].is_favourite;
    toast.success("updated!");
    addRemoveFavourite(params);
    setFeedData(newData);
  };

  const getFeed = async () => {
    setLoading(true);
    try {
      const response1 = await getFeedDetails(accountId);
      const response2 = await leaderBoardData();
      setFeedData(response1.data);
      setTopPredictors(response2.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getFeed();
  }, []);

  return (
    <div className="feed-section">
      {/* <Header /> */}

      {loading && <FeedSkeleton />}

      {!loading && (
        <div className="feed-container">
          {/* <h1 className="">Feed </h1> */}
          <div className="feed-part1">
            <div className="recent-predictions px-4 md:px-0">
              <div className="font-raleway text-2xl font-[500] text-primary400 py-4">
                <label>Recent Predictions</label>
              </div>
              {feedData?.map((feed, index1) => (
                <div className="" key={index1}>
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
              ))}
            </div>
          </div>
          <div className=" overflow-y  w-[25%]">
            <FeedRightSection topPredictorsData={topPredictors} />
          </div>
        </div>
      )}
    </div>
  );
};

export default Feed;
