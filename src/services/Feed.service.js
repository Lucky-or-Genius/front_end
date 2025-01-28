import Axios from "../utils/feed-axios";

export const getFeedDetails = async (number) => {
    return await Axios.get(
      `predictions/?snapshot_offset=${number}`
    );
};
