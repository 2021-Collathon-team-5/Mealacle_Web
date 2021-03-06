import React, { useState, useRef } from "react";
import ProfileCard from "./Components/ProfileCard";
import closeImage from "../../images/outline_clear_black_48dp.png";
import { connect } from "react-redux";
import { useHistory } from "react-router";
import { setNowProfile, setProfile } from "../../redux/store/action";
import { db } from "../../redux/foods/action";
import { doc, updateDoc } from "firebase/firestore/lite";
function ProfileScreen({ profile, setProfile, storeID, setNowProfile }) {
  const [profileWindow, setProfileWindow] = useState({
    visible: false,
    profileIdx: 0,
  });
  const history = useHistory();
  const showModal = (index) => {
    console.log(profile[`${index - 1}`]);
    if (profile[`${index - 1}`]) {
      setNowProfile(index - 1);
      history.push("/main");
    } else {
      setProfileWindow({
        visible: true,
        profileIdx: index - 1,
      });
    }
  };
  const closeModal = () => {
    setProfileWindow({
      ...profileWindow,
      visible: false,
    });
  };
  const Modal = ({ profileIdx }) => {
    const inputRef = useRef([]);
    const saveProfile = async () => {
      const date = new Date();
      const profileName = inputRef.current[0].value;
      const profileRep = inputRef.current[1].value;
      const profileDescription = inputRef.current[2].value;
      const target = {
        profileName,
        profileRep,
        profileDescription,
        storeName: "",
        lastAccessDate: `${date.getFullYear()}-${String(
          date.getMonth() + 1
        ).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`,
      };
      await updateDoc(doc(db, "seller", storeID), {
        [`profile.${profileIdx}`]: { ...target },
      });
      setProfile(target, profileIdx);
      closeModal();
    };
    return (
      <div className="modal-backdrop">
        <div className="modal-window">
          <div className="modal-window__top">
            <button onClick={() => saveProfile()}>저장</button>
            <span>{`프로필 ${profileIdx + 1}`}</span>
            <img src={closeImage} alt="closebtn" onClick={closeModal} />
          </div>
          <div className="modal-window__contents">
            <input
              type="text"
              placeholder="프로필 이름"
              ref={(el) => (inputRef.current[0] = el)}
            />
            <input
              type="text"
              placeholder="프로필 관리자"
              ref={(el) => (inputRef.current[1] = el)}
            />
            <textarea
              placeholder="설명 ..."
              ref={(el) => (inputRef.current[2] = el)}
            />
          </div>
        </div>
      </div>
    );
  };
  return (
    <>
      {profileWindow.visible && <Modal profileIdx={profileWindow.profileIdx} />}
      <div className="profile_main">
        <div className="profile_title">
          <span className="profile_maintitle">프로필 선택</span>
          <span className="profile_subtitle">
            프로필은 최대 3개까지 생성할 수 있으며 수정이 가능합니다.
          </span>
        </div>
        <div className="profile_card_area">
          <ProfileCard
            showModal={() => showModal(1)}
            index={1}
            isProfile={profile["0"]}
          />
          <ProfileCard
            showModal={() => showModal(2)}
            index={2}
            isProfile={profile["1"]}
          />
          <ProfileCard
            showModal={() => showModal(3)}
            index={3}
            isProfile={profile["2"]}
          />
        </div>
      </div>
    </>
  );
}
// store에서 부터 받아온 값을 prop으로 전달
const mapStateToProps = (state) => {
  const { profile, storeID } = state.store;
  return {
    profile,
    storeID,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    setProfile: (profile, idx) => dispatch(setProfile(profile, idx)),
    setNowProfile: (idx) => dispatch(setNowProfile(idx)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProfileScreen);
