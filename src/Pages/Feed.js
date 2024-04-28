import React, { useState, useEffect } from "react";
import TrendingPredictionCard from "../components/trending-prediction-card";
import FeedRightSection from "../components/feed-right-section";
import ShareModal from "../components/shareModal";
import CircularProgress from "@mui/material/CircularProgress";
import { getFeedDetails } from "../services/Feed.service";
import { leaderBoardData } from "../services/Leaderboards.service";
import Header from "../components/Header";
import "../styles/feed.css";
import FeedCard from "../components/feed-card";

const Feed = () => {
  const [openShare, setOpenShare] = useState(false);
  const [feedData, setFeedData] = useState([]);
  const [topPredictors, setTopPredictors] = useState([{}]);
  const [loading, setLoading] = useState(false);

  const getFeed = async () => {
    setLoading(true);
    try {
      const response1 = await getFeedDetails();
      console.log(response1.data);
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

  if (loading)
    return (
      <div className="loader">
        <CircularProgress />
      </div>
    );
  else
    return (
      <div className="feed-section">
        <Header />
        <div className="feed-container">
          <div className="feed-part1">
            <div className="recent-predictions">
              <div className="rp-heading">
                <label>Recent Predictions</label>
              </div>
              {feedData.map((feed, index) => (
                <div className="" key={index}>
                  <TrendingPredictionCard
                    news={feed.headline}
                    source={feed.source}
                    category={feed.category}
                    date={feed.date}
                    imgUrl={feed.img_url}
                  />
                  <div className="rp-cards">
                    {feed.matches.map((card, index) => (
                      <FeedCard
                        category={card.category}
                        userId={card.user_id}
                        user={card.user}
                        madeOn={card.publish_date}
                        resolvedOn={card.fixed_date}
                        imgUrl={card.image_url}
                        predictionId={card.prediction_id}
                        key={index}
                        prediction={card.prediction}
                        setOpenShare={setOpenShare}
                        status={card.status}
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="feed-part2">
            <FeedRightSection topPredictorsData={topPredictors} />
          </div>
        </div>
        <ShareModal showModal={openShare} setShowModal={setOpenShare} />
      </div>
    );
};

export default Feed;
