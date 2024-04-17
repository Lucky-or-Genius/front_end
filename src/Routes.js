import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import LeaderBoards from "./Pages/LeaderBoards";
import Feed from "./Pages/Feed";
import Summaries from "./Pages/Summaries";
import Predictions from "./Pages/Predictions";
import Markets from "./Pages/Markets";
import Profiles from "./Pages/Profiles";
import MyChannels from "./Pages/MyChannels";
import { AppContextProvider } from "./utils/appContext";

const RouterData = () => {
  return (
    <AppContextProvider>
      <Routes>
        <Route path="/Login" element={<Navigate to="/feed" />} />
        <Route path="/feed" element={<Feed />} />
        <Route path="/LeaderBoards" element={<LeaderBoards />} />
        <Route path="/Summaries" element={<Summaries />} />
        <Route path="/Predictions" element={<Predictions />} />
        <Route path="/Markets" element={<Markets />} />
        <Route path="/Profiles" element={<Profiles />} />
        <Route path="/MyChannels" element={<MyChannels />} />
      </Routes>
    </AppContextProvider>
  );
};

export default RouterData;
