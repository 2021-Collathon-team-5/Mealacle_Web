import React from "react";
import { connect } from "react-redux";
import TestImages from "../../images/1.png";

const DetailScreen = ({ foodList }) => {
  let nothingSelected = true;
  const food = foodList.find((food) => food.active); // active된 food data
  const idx = foodList.indexOf(food) + 1; // 주문 번호
  if (food) {
    nothingSelected = false;
  } else {
    nothingSelected = true;
  }

  return (
    <>
      {nothingSelected ? (
        <span>Nothing was selected.</span>
      ) : (
        <div className="detail">
          <div className="detail__header">
            <table className="detail-table__header">
              <thead>
                <tr>
                  <th>{idx}</th>
                  <th>{food.name}</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>주문 코드</td>
                  <td>{food.id}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="detail__main">
            <img src={TestImages} alt="detail__image" />
            <table className="detail-table__main">
              <tbody>
                <tr>
                  <td>상품명</td>
                  <td>{food.name}</td>
                </tr>
                <tr>
                  <td>상품번호</td>
                  <td></td>
                </tr>
                <tr>
                  <td>수량</td>
                  <td>2개</td>
                </tr>
                <tr>
                  <td>가격</td>
                  <td>{food.price}</td>
                </tr>
                <tr>
                  <td>총금액</td>
                  <td>{food.price * 2}</td>
                </tr>
                <tr>
                  <td>남은재고</td>
                  <td>37</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div>
            <table>
              <tbody>
                <tr style={{ width: "100%" }}>
                  <td style={{ width: "30%" }}>주문자</td>
                  <td style={{ width: "60%" }}>{food.name}</td>
                </tr>
                <tr>
                  <td style={{ width: "30%" }}>주문자</td>
                  <td style={{ width: "60%" }}> {food.name}</td>
                </tr>
                <tr>
                  <td style={{ width: "30%" }}>주문자</td>
                  <td style={{ width: "60%" }}>{food.name}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}
    </>
  );
};

// store에서 부터 받아온 값을 prop으로 전달
const mapStateToProps = (state) => {
  const { foodList } = state;
  return {
    foodList: foodList.list,
  };
};

export default connect(mapStateToProps, null)(DetailScreen);
