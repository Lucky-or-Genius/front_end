import Axios from "../utils/feed-axios";

export const getFeedDetails = async (accountId) => {
  if (accountId !== null)
    return await Axios.get(
      `predictions/?offset=0&limit=100&account_id=${accountId}`
    );
  else
    return await Axios.get(
      `predictions/?offset=0&limit=100&account_id=003d45e5-b3a2-40c0-8e76-59ef89f6a519`
    );
};
