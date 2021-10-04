import React from "react";
import "./home_screen.css";
import Image from "../../images/logo.png"
import IconImage from "../../images/outline_expand_more_black_48dp.png"
function HomeScreen() {
  let my_height = window.innerHeight + "px";
  return (
    <div className="home_main">
      {/* 1번 페이지  */}
      <div className="home_main__top">
        {/* 왼쪽 로고 및 타이틀  */}
        <div className="home_left">
          <div id="home_left__center">
            <div>Mealacle</div>
            <img src={Image} id="logo_img"/>
            <div>
              코로나 극복을 위해 Mealacle과 함께 기적을 일으킵시다!
            </div>
          </div>
        </div>
        {/* 로그인 창  */}
        <div className="home_right">
          <div id="sign_in_div">
            <div className="sign_in_store_code">
              <div className="store_code_input">
                <label>매장코드</label>
              </div>
              <div className="input_area_div">
                <input type="text" placeholder="매장 코드를 입력하세요."/>
              </div>
            </div>
            <div className="sign_in_password">
              <div className="password_input">
                <label>비밀번호</label>
              </div>
              <div className="input_area_div">
                <input type="text" placeholder="비밀번호를 입력하세요." />
              </div>
            </div>
          </div>
        </div>
        {/* Slide down Icon */}
        <div id="down-icon">
            <img src={IconImage}/>
          </div>
      </div>
      {/* 2번 페이지  */}
      <div className="home_main__bottom">

      
      </div>

    </div>
  );
}

export default HomeScreen;
