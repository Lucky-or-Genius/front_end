import Axios from "../utils/axios";

export const getPredictions = async (
  page,
  category = "",
  prediction = "",
  nameSearch = "",
  predictionSearch = ""
) => {
  const baseUrl = "all-predictions";
  const pageSize = 14;

  // Build query parameters object
  const queryParams = new URLSearchParams({
    page: page.toString(),
    pageSize: pageSize.toString(),
  });

  // Add optional filters if they exist
  const addFilter = (key, value) => {
    if (value !== "" && value !== "") {
      queryParams.append(key, value);
    }
  };

  // Category and prediction validation filters
  addFilter("category", category);
  addFilter("predictionValidation", prediction);

  // Search filters - ensure we don't add both nameSearch and predictionSearch
  if (nameSearch) {
    addFilter("nameSearch", nameSearch);
  } else if (predictionSearch) {
    addFilter("searchTerm", predictionSearch);
  }

  // Make the API call
  return await Axios.get(`${baseUrl}?${queryParams.toString()}`);
};

export const getPredictionsUser = async (accountId) => {
  return await Axios.get(`all-predictions`);
};

export const getPredictionSingle = async (
  id,
  page,
  category = "",
  prediction = "",
  nameSearch = "",
  predictionSearch = ""
) => {
  const baseUrl = "all-predictions";
  const defaultPageSize = 8;

  // Build query parameters object
  const queryParams = new URLSearchParams({
    page: page.toString(),
    pageSize: defaultPageSize,
    userId: id.toString(),
  });

  // Add optional filters if they exist
  const addFilter = (key, value) => {
    if (value) {
      queryParams.append(key, value);
    }
  };

  // Category filter
  addFilter("category", category);

  // Prediction validation filter
  addFilter("predictionValidation", prediction);

  // Search filters - ensure we don't add both nameSearch and predictionSearch
  if (nameSearch) {
    addFilter("nameSearch", nameSearch);
  } else if (predictionSearch) {
    addFilter("searchTerm", predictionSearch);
  }

  // Make the API call
  return await Axios.get(`${baseUrl}?${queryParams.toString()}`);
};

export const getSourcePredictions = async (
  id,
  page,
  category = "",
  prediction = "",
  nameSearch = "",
  predictionSearch = ""
) => {
  const baseUrl = "all-predictions";
  const defaultPageSize = 8;

  // Build query parameters object
  const queryParams = new URLSearchParams({
    page: page.toString(),
    pageSize: defaultPageSize,
    sourceId: id.toString(),
  });

  // Add optional filters if they exist
  const addFilter = (key, value) => {
    if (value) {
      queryParams.append(key, value);
    }
  };

  // Category and prediction validation filters
  addFilter("category", category);
  addFilter("predictionValidation", prediction);

  // Search filters - ensure we don't add both nameSearch and predictionSearch
  if (nameSearch) {
    addFilter("nameSearch", nameSearch);
  } else if (predictionSearch) {
    addFilter("searchTerm", predictionSearch);
  }

  // Make the API call
  return await Axios.get(`${baseUrl}?${queryParams.toString()}`);
};

export const getSinglePrediction = async (id) => {
  return await Axios.get(`predictions?predictionId=${id}`);
};

export const addRemoveFavourite = async (params) => {
  const res = await Axios.post("toggle-favorite-prediction", params);
  return res.data;
};
