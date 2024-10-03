import Axios from "../utils/axios";

export const getAllProfiles = async () => {
  return await Axios.get(`prediction-leaderboard`);
};

export const getProfilesBySubjects = async (id) => {
  return await Axios.get(`profiles-categories?userId=${id}`);
};
export const getSortedProfilesBySubjects = async (id, value) => {
  return await Axios.get(
    `profiles-categories?userId=${id}&predictionValidation=${value}`
  );
};

export const getProfilesPredictions = async (id) => {
  return await Axios.get(`predictions?userId=${id}`);
};
