import { collection, getDocs } from "firebase/firestore/lite";
import { firestoreService } from "../../Firebase";
import {
  SET_FOOD_ACTIVE,
  INIT_FOOD_LIST,
  REQUEST_FOOD_LIST,
  DELETE_FOOD,
  ADD_FOOD_IMAGE,
  REMOVE_FOOD_IMAGE,
  UPDATE_FOOD,
  UPDATE_DESCRIPTION,
} from "./types";
export const db = firestoreService;

// 주문 목록 불러오는 함수 -> INIT_FOOD_LIST 호출
export const fetchDatas = () => {
  return async (dispatch) => {
    dispatch(requireFoodList());
    const querySnapshot = await getDocs(collection(db, "food"));
    const foodList = [];
    querySnapshot.docs.forEach((e) => {
      const data = {
        ...e.data(),
        id: e.id,
        name: e.data().name,
        price: e.data().price,
        active: false,
      };
      foodList.push(data);
    });
    dispatch(initializeFoodList(foodList));
  };
};

// fetchdatas에서의 불러온 data를 state에 저장
const initializeFoodList = (foodList) => {
  console.log(foodList);
  return {
    type: INIT_FOOD_LIST,
    foodList,
  };
};
// firebase에 데이터 요청
const requireFoodList = () => {
  return {
    type: REQUEST_FOOD_LIST,
  };
};

export const setFoodActive = (foodID) => {
  return {
    type: SET_FOOD_ACTIVE,
    foodID,
  };
};
export const deleteFood = (foodID) => {
  return {
    type: DELETE_FOOD,
    foodID,
  };
};
export const addFoodImage = (foodID, image) => {
  return {
    type: ADD_FOOD_IMAGE,
    foodID,
    image,
  };
};
export const removeFoodImage = (foodID, image) => {
  return {
    type: REMOVE_FOOD_IMAGE,
    foodID,
    image,
  };
};
export const updateFood = (foodID, food) => {
  return {
    type: UPDATE_FOOD,
    foodID,
    food,
  };
};
export const updateDescription = (foodID, image) => {
  return {
    type: UPDATE_DESCRIPTION,
    foodID,
    image,
  };
};
