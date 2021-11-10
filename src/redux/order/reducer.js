import { INIT_ORDERLIST, REQUEST_ORDERLIST, UPDATE_ORDERLIST } from "./types";
const initialState = {
  orderList: [],
  loading: true,
};

const orderReducer = (state = initialState, action) => {
  switch (action.type) {
    case REQUEST_ORDERLIST:
      return {
        ...state,
        loading: true,
      };
    case INIT_ORDERLIST:
      const { orderList } = action;
      return {
        orderList,
        loading: false,
      };
    case UPDATE_ORDERLIST:
      return {
        ...state,
        orderList:action.orderList
      }
    default:
      return state;
  }
};

export default orderReducer;
