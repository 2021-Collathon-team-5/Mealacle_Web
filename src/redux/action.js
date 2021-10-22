
import { collection, getDocs } from "firebase/firestore/lite";
import { firestoreService } from "../Firebase";
import { SET_FOOD_ACTIVE, INIT_FOOD_LIST } from "./types";
const db = firestoreService;
// 주문 목록 불러오는 함수 -> INIT_FOOD_LIST 호출
export const fetchDatas=()=> {
    return async (dispatch)=> {
        const querySnapshot = await getDocs(collection(db,"food"));
        const foodList = [];
        querySnapshot.docs.forEach((e)=> {
            console.log(e.data().price);
            const data = {
              ...e.data(),
              id: e.id,
              name: e.data().name,
              price : e.data().price,
              active: false,
            };
            foodList.push(data);
        });
       dispatch(initializeFoodList(foodList));
    }
}
const initializeFoodList = (foodList) => {
    console.log(foodList);
    return {
        type:INIT_FOOD_LIST,
        foodList
    }
}

export const setFoodActive = (foodID) => {
    return {
        type : SET_FOOD_ACTIVE,
        foodID
    }
}
