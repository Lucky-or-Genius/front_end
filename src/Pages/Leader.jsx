import React, { useEffect, useState, useCallback } from "react";
import { createRoot } from "react-dom/client";
import DocumentMeta from "react-document-meta";
import { FaWikipediaW } from "react-icons/fa";
import {
  FaArrowLeftLong,
  FaXTwitter,
  FaSquareInstagram,
} from "react-icons/fa6";
import { useNavigate, useParams, Link, useLocation } from "react-router-dom";

import MetaImage from "../components/newLeaderboard/meta-image";
import {
  getProfilesBySubjects,
  getSortedProfilesBySubjects,
} from "../services/Profiles.service";
import { getPredictionSingle } from "../services/Predictions.service";
import { allPredictorSummarySources } from "../services/summaries.services";
import Tabs from "../components/common/tabs";
import BarChart from "../components/newLeaderboard/barChart";
import PieChart from "../components/newLeaderboard/pieChart";
import ShareLinkModal from "../components/common/share-button";
import PredictionSection from "../components/newLeaderboard/prediction-section";
import SourceSection from "../components/newLeaderboard/source-section";
import ChartFilters from "../components/newLeaderboard/chart-filters";
import CircularProgress from "../components/common/circular-progress";

const Leader = () => {
  const [userData, setUserData] = useState({});
  const [userPredictions, setUserPredictions] = useState({});
  const [summaries, setSummaries] = useState();
  const [category, setCategory] = useState();
  const [predictionType, setPredictionType] = useState();

  const navigate = useNavigate();
  const { id } = useParams();
  const accountId = localStorage.getItem("accountId");
  const query = new URLSearchParams(useLocation().search);
  const defaultOpen = query.get("defaultOpen");
  const shareableURL = useLocation().pathname;

  /**
   * Fetch user prediction
   */
  const fetchUserPrediction = useCallback(async () => {
    try {
      const res = await getPredictionSingle(id, category, predictionType);
      setUserPredictions(res.data);
    } catch (error) {
      console.log(error);
    }
  }, [category, id, predictionType]);

  /**
   * Fetch user sources
   */
  const fetchUserSources = useCallback(async () => {
    try {
      const res = await allPredictorSummarySources(accountId, id);
      setSummaries(res.data);
    } catch (error) {
      console.log(error);
    }
  }, [accountId, id]);

  /**
   * Sort user subject
   */
  const getSortedUserSubject = async (value) => {
    try {
      const res = await getSortedProfilesBySubjects(id, value);
      setUserData(res.data);
    } catch (err) {
      console.log("err::::", err);
    }
  };

  /**
   * Fetch user data
   */
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const res = await getProfilesBySubjects(id);
        setUserData(res.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchUserData();
  }, [id]);

  /**
   * Fetch user prediction upon changes
   */
  useEffect(() => {
    fetchUserPrediction();
  }, [fetchUserPrediction]);

  /**
   * Fetch user sources upon changes
   */
  useEffect(() => {
    fetchUserSources();
  }, [fetchUserSources]);

  /**
   * Tabs items
   */
  const items = [
    {
      title: "Analytics",
      content: (
        <>
          <div className="pb-2">
            <ChartFilters getSortedUserSubject={getSortedUserSubject} />
          </div>
          <div className="flex flex-col w-full text-white font-poppins gap-6">
            <span className="flex items-center gap-2 text-[#ffffff80] font-raleway font-[500] text-xl ">
              Predictions by Category
            </span>
            <BarChart
              data={userData[0]}
              isVisible={defaultOpen === "Analytics"}
            />
            <span className="flex items-center gap-2 text-[#ffffff80] font-raleway font-[500] text-xl ">
              Predictions by Platform
            </span>
            <PieChart isVisible={defaultOpen === "Analytics"} />
          </div>
        </>
      ),
    },
    {
      title: "Predictions",
      content: (
        <PredictionSection
          setUserPredictions={setUserPredictions}
          userPredictions={userPredictions}
          setPredictionType={setPredictionType}
          setCategory={setCategory}
        />
      ),
    },
    {
      title: "Sources",
      content: (
        <SourceSection setSummaries={setSummaries} summaries={summaries} />
      ),
    },
  ];

  const hasPredictions =
    Array.isArray(userPredictions) && userPredictions.length > 0;

  const userName = hasPredictions
    ? `${userPredictions[0]?.first_name || ""} ${
        userPredictions[0]?.last_name || ""
      }`.trim()
    : "LuckyOrGenius";

  const userPredictionAccuracy = hasPredictions
    ? `${userPredictions[0]?.prediction_accuracy}%`
    : "50%";

  const shareDescription = `Prediction Accuracy: ${userPredictionAccuracy}`;

  // Meta tags
  const meta = {
    title: `${userName} | LuckyOrGenius`,
    description: shareDescription,
    canonical: `https://luckyorgenius.com${shareableURL}`,
    meta: {
      charset: "utf-8",
      name: {
        keywords: "react,meta,document,html,tags",
        url: `https://luckyorgenius.com${shareableURL}`,
        // Twitter
        "twitter:card": "summary_large_image",
        "twitter:title": userName || "LuckyOrGenius",
        "twitter:description": shareDescription,
      },
      property: {
        "og:title": userName || "LuckyOrGenius",
        "og:description": shareDescription,
        "og:url": `https://luckyorgenius.com${shareableURL}`,
      },
    },
  };
  const ProgressCard = ({
    className,
    totalPredictions,
    status,
    value,
    icon,
  }) => {
    // Calculate percentage
    const percentage = Math.round((value / totalPredictions) * 100);

    return (
      <div
        className={`${className} w-full md:w-[350px] bg-[#ffffff10] rounded-xl relative overflow-hidden px-4 py-2 hover:scale-[1.02] hover:shadow-lg transition-all ease-in-out`}
      >
        {/* Content */}
        <div className="relative z-10">
          <div className="text-gray-400  font-raleway font-semibold md:text-lg">
            {status} Predictions
          </div>

          <div className="flex pb-2 w-full justify-between items-end  font-poppins ">
            <span
              className={`${
                status === "True"
                  ? "text-green-500"
                  : status === "False"
                  ? "text-red-500"
                  : "text-yellow-500"
              } text-3xl font-semibold`}
            >
              {value}/{totalPredictions}
            </span>
            <span className="font-semibold text-xs md:text-sm text-gray-400">
              {percentage}%
            </span>
          </div>
        </div>

        {/* Bottom progress bar */}
        <div className="absolute bottom-0 left-0 w-full h-8 overflow-hidden">
          <div className="w-full h-1.5 bg-[#ffffff20] absolute bottom-0 left-0">
            <div
              className={`${
                status === "True"
                  ? "bg-green-500"
                  : status === "False"
                  ? "bg-red-500"
                  : "bg-yellow-500"
              }  bottom-0 left-0 aboslute h-1.5`}
              style={{ width: `${percentage}%` }}
            ></div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <DocumentMeta {...meta}>
      <div className="bg-primary min-h-screen w-full p-4 2md:p-8 overflow-y-auto h-full relative">
        <div>
          <div
            className="absolute left-4 top-4 md:left-10 md:top-10 text-[#ffffff60] hover:text-white transition-all ease-in-out font-raleway flex gap-2 items-center cursor-pointer"
            onClick={() => navigate(-1)}
          >
            <FaArrowLeftLong /> Back
          </div>
        </div>

        {/* Share Button */}
        <div className="absolute right-4 top-4 md:right-10 md:top-10 transition-all ease-in-out">
          <ShareLinkModal url={`https://luckyorgenius.com${shareableURL}`} />
        </div>

        {/* Header Section (User Info) */}
        {hasPredictions ? (
          <div className="flex items-center gap-6 w-full md:justify-center justify-center flex-col md:flex-row">
            <img
              src={userPredictions[0]?.image_url}
              alt=""
              width={100}
              height={100}
              className="w-32 h-32 rounded-xl object-cover"
            />

            <div className="flex flex-col items-center md:items-start justify-around h-full w-fit gap-2">
              <span className="text-white font-raleway text-3xl">
                {userName}
              </span>
              <div className="text-[#ffffff60] font-poppins text-base text-start gap-2 w-full flex flex-col">
                {userPredictions[0]?.alias &&
                  userPredictions[0]?.alias !== userName && (
                    <div>
                      aka:{" "}
                      <span className="text-white">
                        "{userPredictions[0]?.alias}"
                      </span>
                    </div>
                  )}

                {userPredictions[0]?.age && (
                  <div>
                    Age:{" "}
                    <span className="text-white">
                      {userPredictions[0]?.age}
                    </span>
                  </div>
                )}

                <span className="flex gap-4 items-start flex-wrap">
                  Socials:
                  {userPredictions[0]?.wikipedia_url && (
                    <Link
                      to={userPredictions[0]?.wikipedia_url}
                      className="bg-[#ffffff20] p-2 rounded-full text-lg text-white flex gap-2 items-center"
                      target="_blank"
                    >
                      <FaWikipediaW />
                    </Link>
                  )}
                  {userPredictions[0]?.twitter_handle && (
                    <Link
                      to={userPredictions[0]?.twitter_handle}
                      className="bg-[#ffffff20] p-2 rounded-full text-lg text-white flex gap-2 items-center "
                      target="_blank"
                    >
                      <FaXTwitter />
                    </Link>
                  )}
                  {userPredictions[0]?.instagram && (
                    <Link
                      to={userPredictions[0].instagram}
                      className="bg-[#ffffff20] p-2 rounded-full text-lg text-white flex gap-2 items-center "
                      target="_blank"
                    >
                      <FaSquareInstagram />
                    </Link>
                  )}
                </span>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex md:flex-row flex-col items-center gap-4 w-full justify-center">
            <div className="w-24 h-24 rounded-xl bg-[#ffffff30] animate-pulse" />
            <div className="flex flex-col justify-around h-full gap-2 items-center md:items-start">
              <span className="w-56 h-6 rounded-full bg-[#ffffff30] animate-pulse" />
              <span className="w-44 h-4 rounded-full bg-[#ffffff30] animate-pulse" />
              <span className="w-20 h-4 rounded-full bg-[#ffffff30] animate-pulse" />
              <span className="w-20 h-4 rounded-full bg-[#ffffff30] animate-pulse" />
            </div>
          </div>
        )}

        {/* Summary Section */}
        <div className="w-full flex justify-center py-12">
          <div className="bg-[#ffffff20] md:w-4/5 rounded-xl p-4 md:p-6 text-white font-raleway md:text-xl gap-4 flex flex-col">
            {hasPredictions && userPredictions[0]?.category && (
              <div className="text-[#ffffff60]">
                Area of Accuracy:{" "}
                <span className="text-white">
                  {userPredictions[0]?.category}
                </span>
              </div>
            )}
            {userPredictions[0]?.occupation && (
              <div className="text-[#ffffff60]">
                Occupation:{" "}
                <span className="text-white">
                  {userPredictions[0]?.occupation}
                </span>
              </div>
            )}
            {userPredictions[0]?.summary && (
              <div className="text-[#ffffff60]">
                Summary:{" "}
                <span className="text-white">
                  {userPredictions[0]?.summary}
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Stats Section */}
        <div className="w-full flex justify-center pb-12">
          <div className="w-full lg:w-4/5 flex flex-col justify-center items-center">
            <span className="text-white font-raleway font-semibold text-xl md:text-3xl">
              Prediction Performance
            </span>

            <div className="grid grid-cols-1 md:grid-cols-2 w-full pt-8 gap-6 md:gap-4">
              <div className="flex justify-center w-full h-full items-center">
                <CircularProgress
                  percentage={userPredictions[0]?.prediction_accuracy}
                  size={250}
                  isLoading={
                    userPredictions[0]?.prediction_accuracy ? false : true
                  }
                />
              </div>
              {hasPredictions ? (
                <div className="flex flex-col gap-3">
                  <ProgressCard
                    totalPredictions={userPredictions[0]?.all_predictions}
                    value={userPredictions[0]?.total_true}
                    status={"True"}
                  />
                  <ProgressCard
                    totalPredictions={userPredictions[0]?.all_predictions}
                    value={userPredictions[0]?.total_false}
                    status={"False"}
                  />
                  <ProgressCard
                    totalPredictions={userPredictions[0]?.all_predictions}
                    value={userPredictions[0]?.total_pending}
                    status={"Pending"}
                  />
                </div>
              ) : (
                <div className="flex flex-col gap-3">
                  <div className="w-full md:w-[350px] h-20 rounded-xl transition-all ease-in-out animate-pulse bg-[#ffffff20]"></div>
                  <div className="w-full md:w-[350px] h-20 rounded-xl transition-all ease-in-out animate-pulse bg-[#ffffff20]"></div>
                  <div className="w-full md:w-[350px] h-20 rounded-xl transition-all ease-in-out animate-pulse bg-[#ffffff20]"></div>
                </div>
              )}
            </div>
          </div>
        </div>
        {/* Tabs */}
        <div className="w-full flex justify-center py-4">
          <Tabs items={items} defaultOpen={defaultOpen} className="!w-full" />
        </div>
      </div>
    </DocumentMeta>
  );
};

export default Leader;
