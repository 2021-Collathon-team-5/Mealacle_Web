import {
  DELETE_FOOD,
  INIT_FOOD_LIST,
  REQUEST_FOOD_LIST,
  SET_FOOD_ACTIVE,
  ADD_FOOD_IMAGE,
  REMOVE_FOOD_IMAGE,
  UPDATE_FOOD,
  UPDATE_DESCRIPTION,
  ADD_FOOD,
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
  let list = [];
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
      list = [...state.foodList.list];
      list.forEach((ele) => (ele.active = false));
      const found = list.find((ele) => ele.id === action.foodID);
      found.active = true;
      return {
        ...state,
        foodList: {
          ...state.foodList,
          list,
        },
      };
    case ADD_FOOD:
      list = [...state.foodList.list];
      const addData = action.food;
      list.push(addData);
      return {
        ...state,
        foodList: {
          ...state.foodList,
          list,
        },
      };
    case DELETE_FOOD:
      list = [...state.foodList.list].filter((ele) => ele.id !== action.foodID);
      return {
        ...state,
        foodList: {
          ...state.foodList,
          list,
        },
      };
    case ADD_FOOD_IMAGE:
      list = [...state.foodList.list];
      const target = list.find((ele) => ele.id === action.foodID);
      target.image = [...target.image, action.image];
      return {
        ...state,
        foodList: {
          ...state.foodList,
          list,
        },
      };
    case REMOVE_FOOD_IMAGE:
      list = [...state.foodList.list];
      const removeTarget = list.find((ele) => ele.id === action.foodID);
      removeTarget.image = [...action.image];
      return {
        ...state,
        foodList: {
          ...state.foodList,
          list,
        },
      };
    case UPDATE_FOOD:
      list = [...state.foodList.list];
      const updateTarget = list.find((ele) => ele.id === action.foodID);
      const idx = list.indexOf(updateTarget);
      list[idx] = { ...action.food };
      return {
        ...state,
        foodList: {
          ...state.foodList,
          list,
        },
      };
    case UPDATE_DESCRIPTION:
      list = [...state.foodList.list];
      const updateDescriptionTarget = list.find(
        (ele) => ele.id === action.foodID
      );
      const image = action.image;
      updateDescriptionTarget.description = image;
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
