import Axios from "../utils/axios";

//
export const leaderBoardData = async (id) => {
  if (id) {
    return await Axios.get(`prediction-leaderboard?accountId=${id}`);
  } else
    return await Axios.get(
      `prediction-leaderboard?accountId=003d45e5-b3a2-40c0-8e76-59ef89f6a519`
    );
};
export const sortByAccuracy = async (order) => {
  return await Axios.get(`prediction-leaderboard?sortByAccuracy=${order}`);
};
export const sortByScore = async (order) => {
  return await Axios.get(`prediction-leaderboard?sortByScore=${order}`);
};
export const sortByBankroll = async (order) => {
  return await Axios.get(`prediction-leaderboard?sortByBankroll=${order}`);
};
export const searchTerm = async (item) => {
  return await Axios.get(`prediction-leaderboard?searchTerm=${item}`);
};
export const addRemoveFavourite = async (params) => {
  const res = await Axios.post("toggle-favorite-predictor", params);
  return res.data;
};
