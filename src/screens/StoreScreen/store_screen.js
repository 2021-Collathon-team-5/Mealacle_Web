import { updateDoc ,doc} from "@firebase/firestore/lite";
import { db } from "../../redux/foods/action";
import React, { useEffect, useRef, useState } from "react";
import { connect } from "react-redux";
import Header from "../MainScreen/Components/Header";
import NavigationBar from "../Navigationbar/navigation_bar";
import { updateStore } from "../../redux/store/action";
const StoreScreen = ({storeID,updateStore,storeName,
storeAddress,storeCode}) => {
  const inputRef = useRef([]);
  const [text,setText] = useState();
  useEffect(()=> {
    setText(storeName);
  },[storeName]);
  const modified = async() => {
    if (inputRef.current[0].disabled === false) {
      const updatedStoreName= text;
      await updateDoc(doc(db,"seller",storeID),{
        name:updatedStoreName
      });
      updateStore(updatedStoreName);
      for (let i = 0; i < inputRef.current.length; i++) {
        inputRef.current[i].disabled = true;
      }
    } else {
      for (let i = 0; i < inputRef.current.length; i++) {
        inputRef.current[i].disabled = false;
      }
    }
  };
  const changeHandler = (e) => {
    setText(e.target.value);
  }
  return (
    <>
      <NavigationBar />
      <div className="store-screen">
          <Header/>
        <div className="store__main">
          <div className="store__main-title">
            <span>매장관리</span>
          </div>
          <div className="store__content">
            <div>
              <span>매장 이름</span>
              <input
                type="text"
                placeholder="특수문자 미포함 최대 2글자 이상 10글자 미만"
                ref={(el) => (inputRef.current[4] = el)}
                value={text}
                onChange={changeHandler}
                disabled
              />
            </div>
            <div>
              <span>매장 코드</span>
              <span>{storeCode}</span>
            </div>
            <div>
              <span>매장 위치</span>
              <span>{storeAddress}</span>
            </div>
            <div>
              <span>운영 시간</span>
              <div>
                <input
                  type="text"
                  className="input-center"
                  ref={(el) => (inputRef.current[0] = el)}
                  disabled
                />
                <span className="store__content-divider">~</span>
                <input
                  type="text"
                  className="input-center"
                  ref={(el) => (inputRef.current[1] = el)}
                  disabled
                />
              </div>
            </div>
            <div>
              <span>브레이크 타임</span>
              <div>
                <input
                  type="text"
                  className="input-center"
                  ref={(el) => (inputRef.current[2] = el)}
                  disabled
                />
                <span className="store__content-divider">~</span>
                <input
                  type="text"
                  className="input-center"
                  ref={(el) => (inputRef.current[3] = el)}
                  disabled
                />
              </div>
            </div>
            <div>
              <span>매장 영업 상태</span>
              <label className="switch">
                <input type="checkbox" />
                <span className="slider round"></span>
              </label>
            </div>
            <div>
              <button onClick={() => modified()} className="edit-button">수정</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
const mapStateToProps = (state) =>{
  const {storeID,storeCode,storeAddress,storeName} = state.store;
  return {
    storeID,
    storeCode,
    storeName,
    storeAddress
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    updateStore:(profile)=>dispatch(updateStore(profile)),
  }
}
export default connect(mapStateToProps,mapDispatchToProps) (StoreScreen);
