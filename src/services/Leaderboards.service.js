import Axios from "../utils/axios";

// Consolidated function handling all leaderboard parameters
export const fetchLeaderboardData = async (options = {}) => {
  const {
    page = 1,
    pageSize = 20,
    orderBy,    // optional: for sorting
    searchTerm, // optional: for filtering via search term
    filterFavorites, // optional: for filtering via favorites
  } = options;

  const params = { page, pageSize };

  if (orderBy !== undefined) {
    params.orderBy = orderBy;
  }
  if (searchTerm !== undefined) {
    params.searchTerm = searchTerm;
  }

  if (filterFavorites !== undefined) {
    params.filterFavorites = filterFavorites == 'true' || filterFavorites == true;
  }

  return await Axios.get('prediction-leaderboard', { params });
};

// Wrapper function for simple leaderboard data retrieval
export const leaderBoardData = async (page = 1, pageSize = 20) =>
  await fetchLeaderboardData({ page, pageSize });

// Wrapper function for sorted leaderboard data
export const sortLeaderboard = async (orderBy, page = 1, pageSize = 20) =>
  await fetchLeaderboardData({ orderBy, page, pageSize });

// Wrapper function for searching within the leaderboard data
export const searchTerm = async (item, page = 1, pageSize = 20) =>
  await fetchLeaderboardData({ searchTerm: item, page, pageSize });

export const addRemoveFavourite = async (params) => {
  const res = await Axios.post("toggle-favorite-predictor", params);
  return res.data;
};
