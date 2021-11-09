import React, { useState } from "react";
import Image from "../../images/logo.png";
import IconImage from "../../images/outline_expand_more_black_48dp.png";
import emailImage from "../../images/outline_email_black_48dp.png";
import phoneImage from "../../images/outline_call_black_48dp.png";
import socialImage from "../../images/outline_public_black_48dp.png";
import { getProfile } from "../../redux/store/action";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import { firestoreService } from "../../Firebase";
import { getDocs, collection, query, where } from "firebase/firestore/lite";

function HomeScreen({ getProfile }) {
  const [StoreCode, setStoreCode] = useState();
  const [Password, setPassword] = useState();
  const history = useHistory();
  const ScrollDown = () => {
    const scroll_X = window.scrollX;
    const my_height = window.innerHeight;
    window.scrollTo(scroll_X, my_height);
  };
  const Login = async (StoreCode, Password) => {
    if (StoreCode && Password) {
      const db = firestoreService;
      const q = query(
        collection(db, "seller"),
        where("storeCode", "==", StoreCode)
      );
      const storedocs = await getDocs(q);
      if (storedocs.docs.length < 1) {
        alert("해당 매장코드를 가진 회원이 존재하지않습니다");
      } else {
        const store = storedocs.docs[0];
        if (store.data().password === Password) {
          const profile = store.data().profile;
          getProfile(store.id, profile);
          history.push("/profile");
        } else {
          alert("비밀번호오류");
        }
      }
    } else {
      alert("매장코드와 비밀번호를 모두 입력하세요");
    }
  };
  const StoreCodeChange = (e) => {
    setStoreCode(e.target.value);
  };
  const PasswordChange = (e) => {
    setPassword(e.target.value);
  };

  return (
    <div className="home_main">
      {/* 1번 페이지  */}
      <div className="home_main__top">
        {/* 왼쪽 로고 및 타이틀  */}
        <div className="home_left">
          <div id="home_left__center">
            <div>Mealacle</div>
            <img src={Image} id="logo_img" alt="Logo" />
            <div>코로나 극복을 위해 Mealacle과 함께 기적을 일으킵시다!</div>
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
                <input
                  type="text"
                  placeholder="매장 코드를 입력하세요."
                  onChange={StoreCodeChange}
                />
              </div>
            </div>
            <div className="sign_in_password">
              <div className="password_input">
                <label>비밀번호</label>
              </div>
              <div className="input_area_div">
                <input
                  type="text"
                  placeholder="비밀번호를 입력하세요."
                  onChange={PasswordChange}
                />
              </div>
            </div>
            <div className="sign_in_button">
              <button onClick={() => Login(StoreCode, Password)}>
                로그인하기
              </button>
            </div>
          </div>
        </div>
        {/* Slide down Icon */}
        <div id="down-icon" onClick={ScrollDown}>
          <img src={IconImage} alt="SlideDownIcon" />
        </div>
      </div>
      {/* 2번 페이지  */}
      <div className="home_main__bottom">
        <div className="home_bottom_left__backimg"></div>
        <div className="home_bottom_left">
          <div className="home_bottom_text_container">
            <h1>Mealacle은?</h1>
          </div>
          <div className="home_bottom_text_container">
            <p>
              Mealacle은 소상공인 자영업자들과 소비자들의 코로나 팬데믹 극복을
              위해 새롭게 등장한 통신 판매 유통 모바일 서비스입니다.
            </p>
          </div>
          <div className="home_bottom_text_container">
            <p>
              Mealacle은 기존의 밀키트 유통 방법과는 다르게 소비자에 의해
              소비되고, 소비자에 의해 유통되는 기존의 유통 시스템과는 다른 제
              3유통 서비스를 제공합니다.
            </p>
          </div>
          <div className="home_bottom_text_container">
            <p>
              Mealacle은 코로나 팬데믹이 끝나는 날까지 사회와 모든 사람들을 위해
              힘쓰는 서비스가 되도록 노력하겠습니다.
            </p>
          </div>
        </div>
        <div className="home_bottom_right">
          <div className="connect_container">
            <div className="circle_image_container">
              <img src={emailImage} id="email_img" alt="email" width="80%" />
            </div>
            <div className="connect_text_container">이메일 연락</div>
          </div>
          <div className="connect_container">
            <div className="circle_image_container">
              <img src={phoneImage} id="phone_img" alt="phone" width="80%" />
            </div>
            <div className="connect_text_container">전화 연락</div>
          </div>
          <div className="connect_container">
            <div className="circle_image_container">
              <img src={socialImage} id="social_img" alt="social" width="80%" />
            </div>
            <div className="connect_text_container">소셜 방문</div>
          </div>
        </div>
      </div>
    </div>
  );
}

const mapDispatchToProps = (dispatch) => {
  return {
    getProfile: (id, profile) => dispatch(getProfile(id, profile)),
  };
};

export default connect(null, mapDispatchToProps)(HomeScreen);
