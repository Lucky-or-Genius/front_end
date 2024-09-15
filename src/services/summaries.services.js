import Axios from "../utils/axios";

export const allSummarySources = async (id) => {
  return await Axios.get(`all-sources?accountId=${id}`);
};
export const summarySourceById = async (id) => {
  return await Axios.get(`all-sources?sourceId=${id}`);
};
export const sortPublicationDate = async (order) => {
  return await Axios.get(`all-sources?sortPublicationDate=${order}`);
};

export const sortNumberOfPredictions = async (order) => {
  return await Axios.get(`all-sources?sortNumberOfPredictions=${order}`);
};

export const getSummaryPeople = async (id) => {
  return await Axios.get(`summaries_people?sourceId=${id}`);
};

export const getSummaryPrediction = async (id) => {
  return await Axios.get(`summaries_predictions?sourceId=${id}`);
};

export const getSummarySummaries = async (id) => {
  return await Axios.get(`summaries_summaries?sourceId=${id}`);
};

export const getFullTranscript = async (id) => {
  return await Axios.get(`summaries_transcript?sourceId=${id}`);
};

export const searchTerm = async (item) => {
  return await Axios.get(`all-sources?searchTerm=${item}`);
};
export const addRemoveFavourite = async (params) => {
  const res = await Axios.post("toggle-favorite-source", params);
  return res.data;
};
