import React from "react";
import "./profile_screen.css";

function ProfileScreen() {
  return (
    <div className="profile_main">
      <div className="profile_maintitle">프로필 선택</div>
      <div className="profile_subtitle">
        프로필은 최대 3개까지 생성할 수 있으며 수정이 가능합니다.
      </div>
      <div className="profile_card_area">
        <div className="profile_card">
          <div className="profile_name"></div>
        </div>
        <div className="profile_card">
          <div className="profile_name"></div>
        </div>
        <div className="profile_card">
          <div className="profile_name"></div>
        </div>
      </div>
    </div>
  );
}

export default ProfileScreen;
