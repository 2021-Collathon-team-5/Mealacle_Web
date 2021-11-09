import { collection, getDocs ,query,where} from "firebase/firestore/lite";
import { db } from "../foods/action";
import { INIT_ORDERLIST, REQUEST_ORDERLIST } from "./types";

export const fetchDatas = (storeID) => {
    return async (dispatch) => {
        dispatch(requireOrderList());
        const q = query( 
            collection(db,"order"),
            where("sellerID","==",storeID)
        );
        const querySnapshot = await getDocs(q);
        const orderList = [];
        querySnapshot.docs.forEach((e) => {
            const data = {
                ...e.data(),
            };
            orderList.push(data);
        });
        dispatch(initializeOrderList(orderList));
    };
};

const requireOrderList = () => {
    return {
        type:REQUEST_ORDERLIST
    }
}
const initializeOrderList = (orderList) => {
    return {
        type:INIT_ORDERLIST,
        orderList
    }
}
