import Axios from "../utils/axios";

//
export const getPredictions = async (page, accountId) => {
  if (accountId)
    return await Axios.get(
      `all-predictions?accountId=${accountId}&page=${page}&pageSize=14`
    );
  else
    return await Axios.get(
      `all-predictions?accountId=003d45e5-b3a2-40c0-8e76-59ef89f6a519&page=${page}&pageSize=14`
    );
};
export const getPredictionsUser = async (accountId) => {
  if (accountId)
    return await Axios.get(`all-predictions?accountId=${accountId}`);
  else
    return await Axios.get(
      `all-predictions?accountId=003d45e5-b3a2-40c0-8e76-59ef89f6a519`
    );
};

export const getPredictionsByUserId = async (id) => {
  if (id) return await Axios.get(`predictions?accountId=${id}`);
  else
    return await Axios.get(
      `predictions?accountId=003d45e5-b3a2-40c0-8e76-59ef89f6a519`
    );
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
