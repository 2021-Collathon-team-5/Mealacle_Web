import {
  collection,
  getDocs,
  getDoc,
  doc,
  query,
  where,
} from "firebase/firestore/lite";
import { db } from "../foods/action";
import { INIT_ORDERLIST, REQUEST_ORDERLIST } from "./types";

export const fetchDatas = (storeID, profileIdx) => {
  return async (dispatch) => {
    dispatch(requireOrderList());
    const q = query(
      query(collection(db, "order"), where("sellerID", "==", storeID)),
      where("profile_idx", "==", profileIdx)
    );
    const querySnapshot = await getDocs(q);
    const orderList = [];
    for (const e of querySnapshot.docs) {
      const food = await getDoc(doc(db, "food", e.data().foodID));
      const user = await getDoc(doc(db, "user", e.data().userID));
      const data = {
        ...e.data(),
        foodID: food.data(),
        userID: user.data(),
        id: e.id,
      };
      orderList.push(data);
    }
    dispatch(initializeOrderList(orderList));
  };
};

const requireOrderList = () => {
  return {
    type: REQUEST_ORDERLIST,
  };
};
const initializeOrderList = (orderList) => {
  return {
    type: INIT_ORDERLIST,
    orderList,
  };
};
