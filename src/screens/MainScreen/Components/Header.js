import React from "react";
import { connect } from "react-redux";
const Header = ({nowProfile}) => {
    return (
    <div className="header__title">
        <span>{nowProfile.profileName}</span>
    </div>);
}
const mapStateToProps = (state) => {
    const {nowProfile} = state.store;
    return {
      nowProfile
    }
  }

  export default connect(mapStateToProps,null)(Header);