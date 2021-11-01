import React from "react";
import Hambar from "../../images/outline_reorder_black_48dp_02.png";
import Backarrow from "../../images/outline_arrow_back_black_48dp_02.png";
import { addDoc, collection, doc, getDoc } from "firebase/firestore/lite";
import { firestoreService } from "../../Firebase";
import OrderList from "./Components/OrderList";
import DetailScreen from "../DetailScreen/detail_screen";
function MainScreen() {
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

  const getDatasss = async () => {};

  const checkDatas = async () => {
    const docSnap = await getDoc(doc(db, "food", "3M6aqikmZGMiTWsU9hL8"));
    console.log(docSnap.data());
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
        <div>주문목록</div>
        <div>상세정보</div>
        <div>
          <OrderList />
        </div>
        <div style={{ overflow: "scroll" }}>
          <DetailScreen />
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
