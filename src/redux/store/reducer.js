import { GET_PROFILE } from "./types";

const initialState = {
    profile:[]
  };

const storeReducer = (state=initialState,action) => {
    switch(action.type) {
      case GET_PROFILE:
        return {
          ...state,
          profile:[...action.profile]
        }
      default:
        return state;
    }
}

export default storeReducer;