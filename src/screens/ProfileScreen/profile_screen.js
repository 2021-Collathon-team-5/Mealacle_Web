import React, { useState } from "react";
import ProfileCard from "./Components/ProfileCard";
import closeImage from "../../images/outline_clear_black_48dp.png";
import { connect } from "react-redux";
function ProfileScreen({ profile }) {
  const [profileWindow, setProfileWindow] = useState({
    visible: false,
    profileName: "",
  });
  const showModal = (index) => {
    console.log(profile);
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
            <input type="text" placeholder="프로필 이름" />
            <textarea placeholder="설명 ..." />
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
          <ProfileCard showModal={showModal} index={1} isProfile={profile[0]} />
          <ProfileCard showModal={showModal} index={2} isProfile={profile[1]} />
          <ProfileCard showModal={showModal} index={3} isProfile={profile[2]} />
        </div>
      </div>
    </>
  );
}
// store에서 부터 받아온 값을 prop으로 전달
const mapStateToProps = (state) => {
  const { profile } = state.store;
  return {
    profile,
  };
};

export default connect(mapStateToProps, null)(ProfileScreen);
