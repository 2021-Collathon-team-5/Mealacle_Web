import {
  GET_PROFILE,
  SET_NOW_PROFILE,
  SET_PROFILE,
  UPDATE_STORE,
} from "./types";

const initialState = {
  storeID: "",
  storeAddress: "",
  storeCode: "",
  storeName: "",
  nowProfile: {},
  nowProfileIndex: 0,
  profile: {},
};

const storeReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_PROFILE:
      const { address, storeCode, name } = action.storeData;
      return {
        ...state,
        storeID: action.storeID,
        storeAddress: address,
        storeCode,
        storeName: name,
        profile: { ...action.storeData.profile },
      };
    case SET_PROFILE:
      const profile = { ...state.profile, [action.idx]: action.profile };
      return {
        ...state,
        profile,
      };
    case SET_NOW_PROFILE:
      const nowProfileIndex = action.idx;
      const nowProfile = state.profile[nowProfileIndex];
      return {
        ...state,
        nowProfile,
        nowProfileIndex,
      };
    case UPDATE_STORE:
      const { storeName } = action;
      return {
        ...state,
        storeName,
      };
    default:
      return state;
  }
};

export default storeReducer;
