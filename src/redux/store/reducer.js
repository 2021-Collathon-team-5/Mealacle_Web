import {
  GET_PROFILE,
  SET_NOW_PROFILE,
  SET_PROFILE,
  UPDATE_PROFILE,
} from "./types";

const initialState = {
  storeID: "",
  nowProfile: {},
  nowProfileIndex: 0,
  profile: {},
};

const storeReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_PROFILE:
      return {
        ...state,
        storeID: action.id,
        profile: { ...action.profile },
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
    case UPDATE_PROFILE:
      const updateProfile = { ...action.profile };
      return {
        ...state,
        nowProfile: updateProfile,
      };
    default:
      return state;
  }
};

export default storeReducer;
