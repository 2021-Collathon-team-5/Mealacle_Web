import { combineReducers } from "redux";
import foodListReducer from "./foods/reducer";
import storeReducer from "./store/reducer";

const rootReducer = combineReducers({
    foods:foodListReducer,
    store:storeReducer
});

export default rootReducer;