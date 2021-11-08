import { GET_PROFILE, SET_NOW_PROFILE, SET_PROFILE,UPDATE_PROFILE } from "./types";

export const getProfile = (id,profile) => {
    return {
        type:GET_PROFILE,
        profile,
        id
    }
}
export const setProfile = (profile,idx) => {
    return {
        type:SET_PROFILE,
        profile,
        idx
    }
}
export const setNowProfile = (idx) => {
  return {
    type: SET_NOW_PROFILE,
    idx,
  };
};
export const updateProfile = (profile) => {
  return {
    type:UPDATE_PROFILE,
    profile
  };
}
