import Axios from "../utils/axios";

export const getPredictions = async (
  page,
  category,
  prediction,
  nameSearch,
  predictionSearch
) => {
  if (category !== undefined && prediction !== undefined) {
    return await Axios.get(
      `all-predictions?page=${page}&pageSize=14&category=${category}&predictionValidation=${prediction}`
    );
  } else if (category !== undefined) {
    return await Axios.get(
      `all-predictions?page=${page}&pageSize=14&category=${category}`
    );
  } else if (prediction !== undefined) {
    return await Axios.get(
      `all-predictions?page=${page}&pageSize=14&predictionValidation=${prediction}`
    );
  } else if (nameSearch !== "") {
    return await Axios.get(
      `all-predictions?page=${page}&pageSize=14&nameSearch=${nameSearch}`
    );
  } else if (predictionSearch !== "") {
    return await Axios.get(
      `all-predictions?page=${page}&pageSize=14&searchTerm=${predictionSearch}`
    );
  } else {
    return await Axios.get(`all-predictions?page=${page}&pageSize=14`);
  }
};

export const getPredictionsUser = async (accountId) => {
  return await Axios.get(`all-predictions`);
};

export const getPredictionSingle = async (
  id,
  page,
  category,
  prediction,
  nameSearch,
  predictionSearch
) => {
  if (category !== undefined && prediction !== undefined) {
    return await Axios.get(
      `all-predictions?page=${page}&pageSize=8&userId=${id}&category=${category}&predictionValidation=${prediction}`
    );
  } else if (category !== undefined) {
    return await Axios.get(
      `all-predictions?page=${page}&pageSize=8&userId=${id}&category=${category}`
    );
  } else if (prediction !== undefined) {
    return await Axios.get(
      `all-predictions?page=${page}&pageSize=8&userId=${id}&predictionValidation=${prediction}`
    );
  } else if (nameSearch !== "") {
    return await Axios.get(
      `all-predictions?page=${page}&pageSize=14&userId=${id}&nameSearch=${nameSearch}`
    );
  } else if (predictionSearch !== "") {
    return await Axios.get(
      `all-predictions?page=${page}&pageSize=14&userId=${id}&searchTerm=${predictionSearch}`
    );
  } else {
    return await Axios.get(
      `all-predictions?page=${page}&pageSize=8&userId=${id}`
    );
  }
};
export const getSourcePredictions = async (
  id,
  page,
  category,
  prediction,
  nameSearch,
  predictionSearch
) => {
  if (category !== undefined && prediction !== undefined) {
    return await Axios.get(
      `all-predictions?page=${page}&pageSize=8&sourceId=${id}&category=${category}&predictionValidation=${prediction}`
    );
  } else if (category !== undefined) {
    return await Axios.get(
      `all-predictions?page=${page}&pageSize=8&sourceId=${id}&category=${category}`
    );
  } else if (prediction !== undefined) {
    return await Axios.get(
      `all-predictions?page=${page}&pageSize=8&sourceId=${id}&predictionValidation=${prediction}`
    );
  } else if (nameSearch !== "") {
    return await Axios.get(
      `all-predictions?page=${page}&pageSize=14&sourceId=${id}&nameSearch=${nameSearch}`
    );
  } else if (predictionSearch !== "") {
    return await Axios.get(
      `all-predictions?page=${page}&pageSize=14&sourceId=${id}&searchTerm=${predictionSearch}`
    );
  } else {
    return await Axios.get(
      `all-predictions?page=${page}&pageSize=8&sourceId=${id}`
    );
  }
};

export const getSinglePrediction = async (id) => {
  return await Axios.get(`predictions?predictionId=${id}`);
};

export const addRemoveFavourite = async (params) => {
  const res = await Axios.post("toggle-favorite-prediction", params);
  return res.data;
};
