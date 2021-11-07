import { GET_PROFILE, SET_NOW_PROFILE, SET_PROFILE } from "./types";

const initialState = {
  storeCode: "",
  nowProfile: {},
  profile: {},
};

const storeReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_PROFILE:
      return {
        ...state,
        storeCode: action.storeCode,
        profile: { ...action.profile },
      };
    case SET_PROFILE:
      const profile = { ...state.profile, [action.idx]: action.profile };
      return {
        ...state,
        profile,
      };
    case SET_NOW_PROFILE:
      const nowProfile = state.profile[action.idx];
      return {
        ...state,
        nowProfile,
      };
    default:
      return state;
  }
};

export default storeReducer;
