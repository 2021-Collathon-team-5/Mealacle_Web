import React from 'react';
import anonymous from '../../../images/profile.PNG'
const ProfileCard = ({showModal,index}) => {
    return (
        <div className="profile_card" onClick={() => showModal(Number(`${index}`))}>
            <span className="profile_name">프로필 {`${index}`}</span>
            <div className="profile-card__content">
              <img alt="no-img" src={anonymous} />
              <span className="profile_card__division">test</span>
              <span className="profile-card__latest">
                마지막 접속일 <br></br> 2021-10-07
              </span>
            </div>
          </div>
    );
};
export default ProfileCard;


