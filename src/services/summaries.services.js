import Axios from "../utils/axios";

export const allSummarySources = async (id) => {
  if (id) return await Axios.get(`all-sources?accountId=${id}`);
  else
    return await Axios.get(
      `all-sources?accountId=003d45e5-b3a2-40c0-8e76-59ef89f6a519`
    );
};
export const allPredictorSummarySources = async (accountId, userId) => {
  if (accountId)
    return await Axios.get(
      `all-sources?accountId=${accountId}&userId=${userId}`
    );
  else
    return await Axios.get(
      `all-sources?accountId=003d45e5-b3a2-40c0-8e76-59ef89f6a519&userId=${userId}`
    );
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
export const addSource = async (params) => {
  const res = await Axios.post("add_url_source", params);
  return res;
};
