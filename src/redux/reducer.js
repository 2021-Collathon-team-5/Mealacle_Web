import {
  DELETE_FOOD,
  INIT_FOOD_LIST,
  REQUEST_FOOD_LIST,
  SET_FOOD_ACTIVE,
} from "./types";

// 초기상태
const initialState = {
  foodList: {
    list: [],
    loading: true,
  },
};
// foodList reducer
// reducer 사용시 항상 반환값 새로운 객체로. {...} seperator operator 사용
const foodListReducer = (state = initialState, action) => {
  switch (action.type) {
    // 리퀘스트 성공 -> get foodlist
    case INIT_FOOD_LIST:
      return {
        ...state,
        foodList: {
          list: action.foodList,
          loading: false,
        },
      };
    // 리퀘스트 요청 -> firebase
    case REQUEST_FOOD_LIST:
      return {
        ...state,
        foodList: {
          ...state.foodList,
          loading: true,
        },
      };
    // 리스트 클릭시 -> active
    case SET_FOOD_ACTIVE:
      const foodList = [...state.foodList.list];
      foodList.forEach((ele) => (ele.active = false));
      const found = foodList.find((ele) => ele.id === action.foodID);
      found.active = true;
      return {
        ...state,
        foodList: {
          ...state.foodList,
          list: foodList,
        },
      };

    case DELETE_FOOD:
      const list = [...state.foodList.list].filter(
        (ele) => ele.id !== action.foodID
      );
      return {
        ...state,
        foodList: {
          ...state.foodList,
          list,
        },
      };
    default:
      return state;
  }
};

export default foodListReducer;
