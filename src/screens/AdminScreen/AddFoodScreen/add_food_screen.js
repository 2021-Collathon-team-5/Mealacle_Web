import React from "react";

function AddFoodScreen(props) {
  return (
    <div className="add-food-container">
      <div>
        <span>상품 추가하기</span>
        <button onClick={props.containerExit}>X</button>
      </div>

      <div>
        <label>상품명</label>
        <input type="text" placeholder="상품명" onChange={props.nameChange} />
      </div>
      <div>
        <label>상품가격</label>
        <input
          type="number"
          placeholder="상품가격"
          onChange={props.priceChange}
        />
      </div>

      <button className="add-food-button" onClick={props.addFood}>
        상품추가하기
      </button>
    </div>
  );
}

export default AddFoodScreen;
