import { INIT_ORDERLIST,REQUEST_ORDERLIST } from "./types";
const initialState = {
    orderList:[],
    loading:true,
  };

const orderReducer = (state=initialState,action) => {
    switch(action.type) {
        case REQUEST_ORDERLIST:
            return {
                ...state,
                loading:true
            }
        case INIT_ORDERLIST :
            const {orderList} = action;
            return {
                orderList,
                loading:false
            }
        default:
            return state;
    }
}

export default orderReducer;