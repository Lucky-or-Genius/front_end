import Axios from "../utils/feed-axios";

export const getFeedDetails = async ({ accountId }) => {
  return await Axios.get(`predictions?account_id=${accountId}`);
};
