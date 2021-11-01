import React, { useState } from "react";
import TestImages from "../../images/background_img.jpeg";
import closeImage from "../../images/outline_clear_black_48dp.png";
function ProfileScreen() {
  const [profileWindow, setProfileWindow] = useState({
    visible: false,
    profileName: "",
  });
  function yes_profile() {
    return;
  }
  function no_profile() {
    return;
  }
  const showModal = (index) => {
    setProfileWindow({
      visible: true,
      profileName: `프로필 ${index}`,
    });
  };
  const closeModal = () => {
    setProfileWindow(false);
  };
  const Modal = ({ profileName }) => {
    return (
      <div className="modal-backdrop">
        <div className="modal-window">
          <div className="modal-window__top">
            <button>저장</button>
            <span>{profileName}</span>
            <img src={closeImage} alt="closebtn" onClick={closeModal} />
          </div>
          <div className="modal-window__contents">
            <input type="text" placeholder="프로필 이름"></input>
            <input type="text" placeholder="프로필 관리자"></input>
            <textarea placeholder="설명 ..."></textarea>
          </div>
        </div>
      </div>
    );
  };
  return (
    <>
      {profileWindow.visible && (
        <Modal profileName={profileWindow.profileName} />
      )}
      <div className="profile_main">
        <div className="profile_title">
          <span className="profile_maintitle">프로필 선택</span>
          <span className="profile_subtitle">
            프로필은 최대 3개까지 생성할 수 있으며 수정이 가능합니다.
          </span>
        </div>
        <div className="profile_card_area">
          <div className="profile_card" onClick={() => showModal(1)}>
            <span className="profile_name">프로필 1</span>
            <div className="profile-card__content">
              <img alt="no-img" src={TestImages} />
              <span className="profile_card__division">test</span>
              <span className="profile-card__latest">
                마지막 접속일 <br></br> 2021-10-07
              </span>
            </div>
          </div>
          <div className="profile_card" onClick={() => showModal(2)}>
            <span className="profile_name">프로필 2</span>
            <div className="profile-card__content">
              <img alt="no-img" />
              <span className="profile_card__division"></span>
              <span className="profile-card__latest"></span>
            </div>
          </div>
          <div className="profile_card" onClick={() => showModal(3)}>
            <span className="profile_name">프로필 3</span>
            <div className="profile-card__content">
              <div id="cross"></div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ProfileScreen;
