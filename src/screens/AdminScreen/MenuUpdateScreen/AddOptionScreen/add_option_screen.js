import React from "react";
import closeImage from "../../../../images/outline_clear_black_48dp.png";
function AddOptionScreen(props,ref) {
  return (
    <div className="add-option-backdrop">
    <div className="add-option-container">
      <div>
        <span>옵션 추가하기</span>
        <img src={closeImage} alt="closeButton" onClick={props.containerExit}/>
      </div>
      <div>
        <label>옵션</label>
        <input type="text" placeholder="옵션" onChange={props.optionChange} ref={el=>ref.current[0]=el} />
      </div>
      <div>
        <label>추가요금</label>
        <input
          type="number"
          placeholder="추가요금"
          onChange={props.priceChange}
          ref={el=>ref.current[1]=el}
        />
      </div>
      <button className="add-option-button" onClick={props.addOption}>
        상품추가하기
      </button>
    </div>
    </div>
  );
}

export default React.forwardRef(AddOptionScreen);
