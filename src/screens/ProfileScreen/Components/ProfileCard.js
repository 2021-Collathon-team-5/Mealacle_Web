import React from "react";
import anonymous from "../../../images/profile.PNG";
import addProfile from "../../../images/addProfile.PNG";
const ProfileCard = ({ showModal, index ,isProfile}) => {
  return (
    <div className="profile_card" onClick={() => showModal(Number(`${index}`))}>
      <span className="profile_name">프로필 {`${index}`}</span>
      <div className="profile-card__content">
      {isProfile ? <>
        <img alt="no-img" src={anonymous} />
        <span className="profile_card__division">{isProfile.profileName}</span>
        <span className="profile-card__latest">
          마지막 접속일 <br></br> {isProfile.lastAccessDate}
        </span> </>: 
        <img alt="no-profile" src={addProfile}/>
        }
      </div> 
      
    </div>
  );
};
export default ProfileCard;
