import Axios from "../utils/axios";

export const allSummarySources = async (accountId, page = 1, pageSize = 20) => {
  return await Axios.get(`all-sources`, {
    params: {
      ...(accountId && { accountId }),
      page,
      pageSize
    }
  });
};

export const allPredictorSummarySources = async (accountId, userId, page = 1, pageSize = 20) => {
  return await Axios.get(`all-sources`, {
    params: {
      userId,
      ...(accountId && { accountId }),
      page,
      pageSize
    }
  });
};

export const summarySourceById = async (id) => {
  return await Axios.get(`all-sources?sourceId=${id}`);
};

export const sortPublicationDate = async (order, page = 1, pageSize = 20) => {
  return await Axios.get(`all-sources`, {
    params: {
      sortPublicationDate: order,
      page,
      pageSize
    }
  });
};

export const sortNumberOfPredictions = async (order, page = 1, pageSize = 20) => {
  return await Axios.get(`all-sources`, {
    params: {
      sortNumberOfPredictions: order,
      page,
      pageSize
    }
  });
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

export const searchTerm = async (item, page = 1, pageSize = 20) => {
  return await Axios.get(`all-sources`, {
    params: {
      searchTerm: item,
      page,
      pageSize
    }
  });
};

export const addRemoveFavourite = async (params) => {
  const res = await Axios.post("toggle-favorite-source", params);
  return res.data;
};

export const addSource = async (params) => {
  const res = await Axios.post("add_url_source", params);
  return res;
};
