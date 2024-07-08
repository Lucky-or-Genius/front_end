import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import LeaderBoards from "./Pages/LeaderBoards";
import Feed from "./Pages/Feed";
import Summaries from "./Pages/Summaries";
import Predictions from "./Pages/Predictions";
import Markets from "./Pages/Markets";
import Profiles from "./Pages/Profiles";
import MyChannels from "./Pages/MyChannels";
import Favourites from "./Pages/Favourites";
import { AppContextProvider } from "./utils/appContext";

const RouterData = () => {
  return (
    <AppContextProvider>
      <Routes>
        <Route path="/Login" element={<Navigate to="/Feed" />} />
        <Route path="/Feed" element={<Feed />} />
        <Route path="/LeaderBoards" element={<LeaderBoards />} />
        <Route path="/Summaries" element={<Summaries />} />
        <Route path="/Predictions" element={<Predictions />} />
        <Route path="/Markets" element={<Markets />} />
        <Route path="/Profiles" element={<Profiles />} />
        <Route path="/MyChannels" element={<MyChannels />} />
        <Route path="/Favourites" element={<Favourites />} />
      </Routes>
    </AppContextProvider>
  );
};

export default RouterData;
