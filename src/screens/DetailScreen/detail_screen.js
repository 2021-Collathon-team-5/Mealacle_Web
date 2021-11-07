import React from "react";
import { connect } from "react-redux";
import { db } from "../../redux/foods/action";
import { doc, deleteDoc } from "firebase/firestore/lite";
import { deleteFood } from "../../redux/foods/action";
const DetailScreen = ({ foodList, deleteFood }) => {
  let nothingSelected = true;
  const food = foodList.find((food) => food.active); // active된 food data
  const idx = foodList.indexOf(food) + 1; // 주문 번호
  if (food) {
    nothingSelected = false;
  } else {
    nothingSelected = true;
  }

  const delDoc = async (id) => {
    await deleteDoc(doc(db, "food", id));
    deleteFood(id);
  };
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
            {food.image[0] ? (
              <img src={food.image[0]} alt="detail__image" />
            ) : (
              <span id="detail__noimage">No image</span>
            )}
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
          <div className="detail__orderer">
            <table>
              <tbody>
                <tr>
                  <td>주문자</td>
                  <td>홍길동</td>
                </tr>
                <tr>
                  <td>연락처</td>
                  <td>010-1234-5678</td>
                </tr>
                <tr>
                  <td>배송지</td>
                  <td>대전광역시 유성구 대학로 99 (기숙사 8동)</td>
                </tr>
              </tbody>
            </table>
            <table>
              <tbody>
                <tr>
                  <td>배달원</td>
                  <td>김철수 (tightrope01@gmail.com)</td>
                </tr>
                <tr>
                  <td>연락처</td>
                  <td>010-5678-1234</td>
                </tr>
                <tr>
                  <td>배달일시</td>
                  <td>2021-10-01 (오후타임)</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div>
            <table className="detail__cancel-table">
              <tbody>
                <tr>
                  <td colSpan="2">주문 취소</td>
                </tr>
                <tr>
                  <td>취소사유</td>
                  <td>
                    <select>
                      <option>재고 품절</option>
                      <option>가게 휴무</option>
                    </select>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <button onClick={() => delDoc(food.id)}>취소하기</button>
        </div>
      )}
    </>
  );
};

// store에서 부터 받아온 값을 prop으로 전달
const mapStateToProps = (state) => {
  const { foodList } = state.foods;
  return {
    foodList: foodList.list,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    deleteFood: (foodID) => dispatch(deleteFood(foodID)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(DetailScreen);
