import { GET_PROFILE, SET_NOW_PROFILE, SET_PROFILE } from "./types";

export const getProfile = (storeCode, profile) => {
  return {
    type: GET_PROFILE,
    storeCode,
    profile,
  };
};
export const setProfile = (profile, idx) => {
  return {
    type: SET_PROFILE,
    profile,
    idx,
  };
};
export const setNowProfile = (idx) => {
  return {
    type: SET_NOW_PROFILE,
    idx,
  };
};
