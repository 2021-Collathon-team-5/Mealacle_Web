import { INIT_FOOD_LIST, SET_FOOD_ACTIVE } from "./types";

// 초기상태
const initialState = {
    foodList:[], 
}
// foodList reducer
const foodListReducer=(state=initialState,action) => {
    switch(action.type) {
        case INIT_FOOD_LIST:
            return {...state,foodList:action.foodList}
        case SET_FOOD_ACTIVE:
           const foodList =[...state.foodList];
           foodList.forEach((ele)=>ele.active=false);
           const found = foodList.find((ele) => ele.id === action.foodID);
           found.active= true;
           return {...state,foodList};
           
        default: return state;
    }
}

export default foodListReducer;