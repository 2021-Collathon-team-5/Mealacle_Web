import React from "react";
<<<<<<< HEAD
import Hambar from "../../images/outline_reorder_black_48dp_02.png";
import Backarrow from "../../images/outline_arrow_back_black_48dp_02.png";
=======
import Hambar from "../../images/outline_reorder_black_48dp_02.png"
import Backarrow from "../../images/outline_arrow_back_black_48dp_02.png"
>>>>>>> 763263305c4ffd24a0174406f71a4ac90bc74b93
function MainScreen() {
  const showMenu = (e) => {
    const mainNav = e.target.parentNode.parentNode;
    const header = document.querySelector(".main-nav__header:last-child");
    const bodys = document.querySelectorAll(".main-nav__body");
<<<<<<< HEAD
    bodys.forEach((body) => body.classList.toggle("body-hide"));
    header.classList.toggle("header-hide");
    mainNav.classList.toggle("nav-open");
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
        <div>5</div>
        <div>6</div>
        <div>7</div>
        <div>8</div>
        <div>9</div>
      </div>
    </>
  );
=======
    bodys.forEach(body=>body.classList.toggle("body-hide"));
    header.classList.toggle("header-hide");
    mainNav.classList.toggle("nav-open");
  }
  return (
  <>
  <nav className = "main-nav">
    <div className = "main-nav__header">
      <img src={Hambar} alt="menu" onClick={showMenu}/>
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
      <img src={Backarrow} alt="back"/>
      <span>뒤로가기</span>
    </div>
  </nav>
  <div className="main-screen">
    <div>1</div>
    <div>2</div>
    <div>3</div>
    <div>4</div>
    <div>5</div>
    <div>6</div>
    <div>7</div>
    <div>8</div>
    <div>9</div>
  </div>

  </>);
>>>>>>> 763263305c4ffd24a0174406f71a4ac90bc74b93
}

export default MainScreen;
