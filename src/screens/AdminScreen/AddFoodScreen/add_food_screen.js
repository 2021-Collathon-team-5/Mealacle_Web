import React from "react";

const selectCategory = [
  "한식",
  "중식",
  "카페/브런치",
  "일식",
  "아시안",
  "분식",
  "양식",
  "탕/찌개",
  "야식",
];

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
      <div>
        <label>카테고리</label>
        <select onChange={props.categoryChange}>
          {selectCategory.map((item, index) => (
            <option value={index} key={index}>
              {item}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label>원산지</label>
        <input type="text" placeholder="원산지" onChange={props.originChange} />
      </div>
      <button className="add-food-button" onClick={props.addFood}>
        상품추가하기
      </button>
    </div>
  );
}

export default AddFoodScreen;
