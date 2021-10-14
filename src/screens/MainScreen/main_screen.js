import React from "react";
import Hambar from "../../images/outline_reorder_black_48dp_02.png";
import Backarrow from "../../images/outline_arrow_back_black_48dp_02.png";
import { addDoc, getDocs, collection } from "firebase/firestore/lite";
import { firestoreService } from "../../Firebase";

function MainScreen() {
  const db = firestoreService;

  const showMenu = (e) => {
    const mainNav = e.target.parentNode.parentNode;
    const header = document.querySelector(".main-nav__header:last-child");
    const bodys = document.querySelectorAll(".main-nav__body");
    bodys.forEach((body) => body.classList.toggle("body-hide"));
    header.classList.toggle("header-hide");
    mainNav.classList.toggle("nav-open");
  };

  const getDatas = async () => {
    const querySnapshot = await getDocs(collection(db, "food"));
    querySnapshot.forEach((doc) => {
      console.log(`${doc.id} => ${doc.data()}`);
    });
  };

  const addData = async () => {
    const docRef = await addDoc(collection(db, "food"), {
      name: "Alan",
      price: 19120,
    });
    console.log(docRef);
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
        <div>4</div>
        <div>
          <iframe src="./detail/123" title="test" width="300" height="300" />
        </div>
        <div>6</div>
        <div>7</div>
        <div>8</div>
        <div>9</div>
      </div>
      <button onClick={addData}>hahahaha</button>
      <button onClick={getDatas}>hohohoho</button>
    </>
  );
}

export default MainScreen;
