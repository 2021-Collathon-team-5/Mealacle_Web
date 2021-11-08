import React from "react";

function AddOptionScreen(props) {
  return (
    <div className="add-option-container">
      <div>
        <span>옵션 추가하기</span>
        <button onClick={props.containerExit}>X</button>
      </div>
      <div>
        <label>옵션</label>
        <input type="text" placeholder="옵션" onChange={props.optionChange} />
      </div>
      <div>
        <label>추가요금</label>
        <input
          type="number"
          placeholder="추가요금"
          onChange={props.priceChange}
        />
      </div>
      <button className="add-option-button" onClick={props.addOption}>
        상품추가하기
      </button>
    </div>
  );
}

export default AddOptionScreen;
