import React, { useState } from "react";
import ProfileCard from "./Components/ProfileCard";
import closeImage from "../../images/outline_clear_black_48dp.png";

function ProfileScreen() {
  const [profileWindow, setProfileWindow] = useState({
    visible: false,
    profileName: "",
  });
  const showModal = (index) => {
    setProfileWindow({
      visible: true,
      profileName: `프로필 ${index}`,
    });
  };
  const closeModal = () => {
    setProfileWindow({
      ...profileWindow,
      visible: false,
    });
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
          <ProfileCard showModal={showModal} index={1} />
          <ProfileCard showModal={showModal} index={2} />
          <ProfileCard showModal={showModal} index={3} />
          <button
            onClick={() => {
              const routes = window.location.href;
              const checkindex = routes.indexOf("=");
              console.log(window.location.href.slice(checkindex + 1));
            }}
          >
            check
          </button>
        </div>
      </div>
    </>
  );
}

export default ProfileScreen;
