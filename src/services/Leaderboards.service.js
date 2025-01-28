import Axios from "../utils/axios";

//
export const leaderBoardData = async () => {
  return await Axios.get('prediction-leaderboard');
};

export const sortLeaderboard = async (orderBy) => {
  return await Axios.get('prediction-leaderboard', { params: { orderBy } });
};

export const searchTerm = async (item) => {
  return await Axios.get('prediction-leaderboard', { params: { searchTerm: item } });
};

export const addRemoveFavourite = async (params) => {
  const res = await Axios.post("toggle-favorite-predictor", params);
  return res.data;
};
