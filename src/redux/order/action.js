import {
  collection,
  getDocs,
  getDoc,
  updateDoc,
  doc,
  query,
  where,
} from "firebase/firestore/lite";
import { db } from "../foods/action";
import { INIT_ORDERLIST, REQUEST_ORDERLIST } from "./types";
const idToNum = (id) => {
  let num  ="";
  for(var i =0;i<5;i++) {
    const v =id.charCodeAt(i);
    num += v;
  }
  num = num.substr(0,10);
  return num;
}
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
     const rider =  e.data().riderID !== "" ?  await getDoc(doc(db,"rider",e.data().riderID)) : "";
     const userRider =(rider!=="")  ? await getDoc(doc(db,"user",rider.data().userid)) : "";

      const id = idToNum(e.data().foodID);
      const data = {
        ...e.data(),
        foodID: {...food.data(),id},
        userID: user.data(),
        riderID: (userRider==="") ? {} : userRider.data(),
        id: e.id,
      };
      orderList.push(data);
      await updateDoc(doc(db,"order",e.id),{
        ready:true
      });
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
