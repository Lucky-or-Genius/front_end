import axios from "axios";
import Axios from "../utils/axios";

//
export const leaderBoardData = async (id) => {
  return await Axios.get(`prediction-leaderboard?accountId=${id}`);
};
export const predictorData = async (id) => {
  return await axios.get(
    `https://user-info-hover-over-api-0d0a8a1fcc65.herokuapp.com/user_info_hover_over?user_id=${id}`
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
