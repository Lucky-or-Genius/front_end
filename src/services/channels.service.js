import Axios from "../utils/axios";
import ChannelAxios from "../utils/channel-axios";

//
export const channelsData = async (id) => {
  if (id) return await Axios.get(`channel_data?accountId=${id}`);
  else
    return await Axios.get(
      `channel_data?accountId=003d45e5-b3a2-40c0-8e76-59ef89f6a519`
    );
};
export const channelsSourceData = async (id) => {
  return await Axios.get(`all-sources?channelId=${id}`);
};
export const addRemoveFavourite = async (params) => {
  const res = await Axios.post("toggle-favorite-channel", params);
  console.log(res.data);
  return res.data;
};
export const addChannel = async (params) => {
  const res = await ChannelAxios.post("process_video", params);
  return res.data;
};
