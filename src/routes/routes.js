import React from "react";
import Feed from "../Pages/Feed";
import Summaries from "../Pages/NewSummaries";
import SummariesDetails from "../Pages/SummariesDetails";
import Predictions from "../Pages/NewPrediction";
import Markets from "../Pages/NewMarkets";
import MarketsGraph from "../Pages/MarketGraph";
import MyChannels from "../Pages/New-MyChannel";
import Favourites from "../Pages/NewFavourites";
import NewLeaderboard from "../Pages/NewLeaderboard";
import LeaderPage from "../Pages/Leader";
import PredictionDetails from "../Pages/Prediction-details";
import Sources from "../Pages/Sources";

const routes = [
  {
    path: "/dashboard/Feed",
    element: <Feed />,
  },
  {
    path: "/dashboard/LeaderBoards",
    element: <NewLeaderboard />,
  },
  {
    path: "/dashboard/LeaderBoards/:id",
    element: <LeaderPage />,
  },
  {
    path: "/dashboard/Summaries",
    element: <Summaries />,
  },
  {
    path: "/dashboard/Summaries/:id",
    element: <SummariesDetails />,
  },
  {
    path: "/dashboard/Predictions",
    element: <Predictions />,
  },
  {
    path: "/dashboard/Predictions/:id",
    element: <PredictionDetails />,
  },
  {
    path: "/dashboard/Markets/:params",
    element: <MarketsGraph />,
  },
  {
    path: "/dashboard/Markets",
    element: <Markets />,
  },
  {
    path: "/dashboard/MyChannels",
    element: <MyChannels />,
  },
  {
    path: "/dashboard/MyChannels/sources/:id",
    element: <Sources />,
  },
  {
    path: "/dashboard/Favourites",
    element: <Favourites />,
  },
  {
    path: "/dashboard/Market",
    element: <Markets />,
  },
];

export default routes;
