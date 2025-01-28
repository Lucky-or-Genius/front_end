import Axios from "../utils/axios";

//
export const getPredictions = async (page) => {
  return await Axios.get(
      `all-predictions?page=${page}&pageSize=14`
    );
};
export const getPredictionsUser = async (accountId) => {
  return await Axios.get(`all-predictions`);
};

export const getPredictionsByUserId = async (id) => {
  if (id !== null) return await Axios.get(`predictions?accountId=${id}`);
};
export const getSortedPrediction = async (category) => {
  return await Axios.get(`predictions?category=${category}`);
};
export const getSortedCategory = async (prediction) => {
  return await Axios.get(`predictions?predictionValidation=${prediction}`);
};

export const getPredictionSingle = async (id, category, prediction) => {
  if (category !== undefined && prediction !== undefined) {
    return await Axios.get(
      `predictions?userId=${id}&category=${category}&predictionValidation=${prediction}`
    );
  } else if (category !== undefined) {
    return await Axios.get(`predictions?userId=${id}&category=${category}`);
  } else if (prediction !== undefined) {
    return await Axios.get(
      `predictions?userId=${id}&predictionValidation=${prediction}`
    );
  } else {
    return await Axios.get(`predictions?userId=${id}`);
  }
};
export const getSinglePrediction = async (id) => {
  return await Axios.get(`predictions?predictionId=${id}`);
};

export const addRemoveFavourite = async (params) => {
  const res = await Axios.post("toggle-favorite-prediction", params);
  return res.data;
};
