import React from "react";
import Hambar from "../../images/outline_reorder_black_48dp_02.png";
import Backarrow from "../../images/outline_arrow_back_black_48dp_02.png";
import { Link } from "react-router-dom";

function NavigationBar() {
  const showMenu = (e) => {
    const mainNav = e.target.parentNode.parentNode;
    const header = document.querySelector(".navigation-bar__header:last-child");
    const bodys = document.querySelectorAll(".navigation-bar__body");
    bodys.forEach((body) => body.classList.toggle("body-hide"));
    header.classList.toggle("header-hide");
    mainNav.classList.toggle("nav-open");
  };

  return (
    <nav className="navigation-bar">
      <div className="navigation-bar__header">
        <img src={Hambar} alt="menu" onClick={showMenu} />
      </div>
      <div className="navigation-bar__body body-hide">
        <span>매장</span>
        <ul>
          <li>
            <Link className="navigation-bar__link" to="/store">
              매장 관리
            </Link>
          </li>
          <li>
            <Link className="navigation-bar__link" to="/admin">
              메뉴 관리
            </Link>
          </li>
          <li>라이더 관리</li>
        </ul>
      </div>
      <div className="navigation-bar__body body-hide">
        <span>프로필</span>
        <ul>
          <li>프로필 관리</li>
          <li>이용 내역</li>
          <li><Link className="navigation-bar__link" to="/main">
              매출 관리
            </Link></li>
        </ul>
      </div>
      <div className="navigation-bar__body body-hide">
        <span>서비스</span>
        <ul>
          <li>문의하기</li>
          <li>설정</li>
          <li>정보</li>
        </ul>
      </div>
      <div className="navigation-bar__header header-hide">
        <img src={Backarrow} alt="back" />
        <span>뒤로가기</span>
      </div>
    </nav>
  );
}

export default NavigationBar;
