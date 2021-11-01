import React from "react";
import { addDoc, collection, doc, getDoc } from "firebase/firestore/lite";
import { firestoreService } from "../../Firebase";
import OrderList from "./Components/OrderList";
import DetailScreen from "../DetailScreen/detail_screen";
import NavigationBar from "../Navigationbar/navigation_bar";
function MainScreen() {
  const db = firestoreService;
  const addData = async () => {
    await addDoc(collection(db, "food"), {
      name: "Alan",
      price: 19120,
    });
  };

<<<<<<< HEAD
  const getDatasss = async () => {};

  const checkDatas = async () => {
    const docSnap = await getDoc(doc(db, "food", "3M6aqikmZGMiTWsU9hL8"));
    console.log(docSnap.data());
  };

<<<<<<< HEAD
  const checkDatas = () => {
    console.log("hahahaha");
  };
=======
>>>>>>> junghun2
=======
  const getDatasss = async () => {
    
  };

  const checkDatas = async () => {
    const docSnap = await getDoc(doc(db, "food", "3M6aqikmZGMiTWsU9hL8"));
    console.log(docSnap.data());
  };


>>>>>>> f2b02544ed3015af59f2536e366b5134511a2a70
  return (
    <>
      <NavigationBar />
      <div className="main-screen">
        <div>1</div>
        <div>주문목록</div>
        <div>상세정보</div>
        <div>
<<<<<<< HEAD
          <OrderList />
        </div>
        <div style={{ overflow: "scroll" }}>
          <DetailScreen />
=======
          <OrderList/>
        </div>
        <div>
          <DetailScreen/>
>>>>>>> f2b02544ed3015af59f2536e366b5134511a2a70
        </div>
        <div>
          <button onClick={addData}>addData</button>
          <button onClick={getDatasss}>getData</button>
          <button onClick={checkDatas}>checkDatas</button>
        </div>
        <div>공급가액</div>
        <div>판매수량</div>
        <div>총 매출</div>
      </div>
    </>
  );
}


export default MainScreen;
