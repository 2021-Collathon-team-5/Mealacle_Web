import React from "react";
import "./home_screen.css";

function HomeScreen() {
  let my_height = window.innerHeight + "px";
  return (
    <div className="home_main">
      <div style={{ height: my_height }} className="home_left">
        <div id="center_div">
          <div style={{ fontSize: "50px", color: "#3F4346" }}>Mealacle</div>
          <div className="home_left_img"></div>
          <div
            style={{ fontSize: "30px", color: "#3F4346", fontWeight: "10px" }}
          >
            코로나 극복을 위해 Mealacle과 함께 기적을 일으킵시다!
          </div>
        </div>
      </div>
      <div style={{ height: my_height }} className="home_right">
        <div id="sign_in_div">
          <div className="sign_in_store_code">
            <div className="store_code_input">
              <label>매장코드</label>
            </div>
            <div className="input_area_div">
              <input type="text" />
            </div>
          </div>
          <div className="sign_in_password">
            <div className="password_input">
              <label>비밀번호</label>
            </div>
            <div className="input_area_div">
              <input type="text" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomeScreen;
