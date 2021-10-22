import React, { useState, useEffect } from "react";
import Hambar from "../../images/outline_reorder_black_48dp_02.png";
import Backarrow from "../../images/outline_arrow_back_black_48dp_02.png";
import { addDoc, getDocs, collection, doc, getDoc } from "firebase/firestore/lite";
import { firestoreService } from "../../Firebase";
import OrderList from "./Components/OrderList";
function MainScreen() {                          
  const [foodList, setFoodList] = useState([]);
  const [loading, setLoading] = useState(true);

  
  const showMenu = (e) => {
    const mainNav = e.target.parentNode.parentNode;
    const header = document.querySelector(".main-nav__header:last-child");
    const bodys = document.querySelectorAll(".main-nav__body");
    bodys.forEach((body) => body.classList.toggle("body-hide"));
    header.classList.toggle("header-hide");
    mainNav.classList.toggle("nav-open");
  };
  const db = firestoreService;
  const addData = async () => {
    await addDoc(collection(db, "food"), {
      name: "Alan",
      price: 19120,
    });
  };

  const getDatasss = async () => {
    const querySnapshot = await getDocs(collection(db, "food"));

    querySnapshot.docs.forEach((e) => {
      setLoading(false);
      console.log(e.data().price);
      const data = {
        ...e.data(),
        id: e.id,
        name: e.data().name,
        price: e.data().price,
        active: false,
      };
      setFoodList((prev) => [...prev, data], setLoading(true));
    });
  };

  const checkDatas = async () => {
    const docSnap = await getDoc(doc(db, "food", "3M6aqikmZGMiTWsU9hL8"));

  };


  return (
    <>
      <nav className="main-nav">
        <div className="main-nav__header">
          <img src={Hambar} alt="menu" onClick={showMenu} />
        </div>
        <div className="main-nav__body body-hide">
          <span>매장</span>
          <ul>
            <li>매장 관리</li>
            <li>메뉴 관리</li>
            <li>라이더 관리</li>
          </ul>
        </div>
        <div className="main-nav__body body-hide">
          <span>프로필</span>
          <ul>
            <li>프로필 관리</li>
            <li>이용 내역</li>
            <li>매출 정리</li>
          </ul>
        </div>
        <div className="main-nav__body body-hide">
          <span>서비스</span>
          <ul>
            <li>문의하기</li>
            <li>설정</li>
            <li>정보</li>
          </ul>
        </div>
        <div className="main-nav__header header-hide">
          <img src={Backarrow} alt="back" />
          <span>뒤로가기</span>
        </div>
      </nav>
      <div className="main-screen">
        <div>1</div>
        <div>2</div>
        <div>3</div>
        <div>
          <OrderList/>
        </div>
        <div>
          <iframe id="detail-iframe" title="test" width="300" height="300" />
        </div>
        <div>
          <button onClick={addData}>addData</button>
          <button onClick={getDatasss}>getData</button>
          <button onClick={checkDatas}>checkDatas</button>
        </div>
        <div>7</div>
        <div>8</div>
        <div>9</div>
      </div>
    </>
  );
}


export default MainScreen;
