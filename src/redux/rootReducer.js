import { combineReducers } from "redux";
import foodListReducer from "./foods/reducer";
import orderReducer from "./order/reducer";
import storeReducer from "./store/reducer";

const rootReducer = combineReducers({
    foods:foodListReducer,
    store:storeReducer,
    order:orderReducer
});

export default rootReducer;