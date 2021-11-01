<<<<<<< HEAD
import { createStore, applyMiddleware } from "redux";
=======
import { createStore,applyMiddleware } from "redux";
>>>>>>> f2b02544ed3015af59f2536e366b5134511a2a70
import foodListReducer from "./reducer";
import logger from "redux-logger";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";

//thunk는 redux에서 비동기 작업시 필요, logger은 state 변경되는거 console에 출력해줌.
<<<<<<< HEAD
const middleware = [thunk, logger];

const store = createStore(
  foodListReducer,
  composeWithDevTools(applyMiddleware(...middleware))
);
export default store;
=======
const middleware = [thunk,logger];

const store = createStore(foodListReducer,composeWithDevTools(applyMiddleware(...middleware)));
export default store;
>>>>>>> f2b02544ed3015af59f2536e366b5134511a2a70
