import {} from "@firebase/storage";
import React, { useState } from "react";
import { connect } from "react-redux";

function UpdateScreen({ foodList }) {
  const [File, setFile] = useState(""); //File은 새로운 이미지의 주소
  let nothingSelected = true;
  const food = foodList.find((food) => food.active); // active된 food data
  if (food) {
    nothingSelected = false;
  } else {
    nothingSelected = true;
  }

  const ImageChange = async () => {
    console.log(File);
  };
  const onFileChange = (event) => {
    //files에는 파일이 여러개 담길수있지만 하나만 담을것이기때문에 files[0] 으로 진행
    const theFile = event.target.files[0];
    const reader = new FileReader();
    reader.onloadend = (finishedEvent) => {
      setFile(finishedEvent.target.result);
    };
    reader.readAsDataURL(theFile);
  };

  return (
    <>
      {nothingSelected ? (
        <span>Nothing was selected.</span>
      ) : (
        <div>
          <div>
            <label>옵션*</label>
            <div className="menu-option">옵션A</div>
            <div className="menu-option">옵션B</div>
            <button>추가</button>
          </div>
          <div>
            <label>상품 설명(이미지)*</label>
            <div>
              <input type="file" onChange={onFileChange} />
              <button onClick={ImageChange}>사진 변경하기</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

const mapStateToProps = (state) => {
  const { foodList } = state;
  return {
    foodList: foodList.list,
  };
};

export default connect(mapStateToProps, null)(UpdateScreen);
