import { GET_PROFILE, SET_NOW_PROFILE, SET_PROFILE, UPDATE_STORE } from "./types";

export const getProfile = (storeID,storeData) => {
    return {
        type:GET_PROFILE,
        storeData,
        storeID,
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
export const updateStore = (storeName) => {
  return {
    type:UPDATE_STORE,
    storeName
  };
}
