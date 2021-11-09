import { combineReducers } from "redux";
import foodListReducer from "./foods/reducer";
import storeReducer from "./store/reducer";
import orderReducer from "./order/reducer";

const rootReducer = combineReducers({
    foods:foodListReducer,
    store:storeReducer,
    order : orderReducer
});

export default rootReducer;