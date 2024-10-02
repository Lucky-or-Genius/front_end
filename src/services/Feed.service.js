import Axios from "../utils/feed-axios";

export const getFeedDetails = async (accountId) => {
  return await Axios.get(
    `predictions/?offset=0&limit=100&account_id=${accountId}`
  );
};
