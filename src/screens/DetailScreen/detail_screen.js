import React from "react";
import { connect } from "react-redux";
import { db } from "../../redux/foods/action";
import { doc, deleteDoc } from "firebase/firestore/lite";
import { updateOrder } from "../../redux/order/action";
const DetailScreen = ({ orderList,orderDetail, cancelOrder }) => {
  let nothingSelected = true;
  if (Object.keys(orderDetail).length === 0) {
    nothingSelected = true;
  } else {
    nothingSelected = false;
  }
  const {option,price} = !nothingSelected && orderDetail.foodID.options[orderDetail.option];
  const sumOptionPrice = !nothingSelected && Number(orderDetail.foodID.price)+Number(price);
  const mulCount = !nothingSelected && sumOptionPrice*Number(orderDetail.count);
  const delOrder = async () => {
    const updatedList = orderList.filter((e)=>e.id!==orderDetail.id);
    await deleteDoc(doc(db, "order", orderDetail.id)).then(()=>
    cancelOrder(updatedList));

  };
  function addComma(num) {
    var regexp = /\B(?=(\d{3})+(?!\d))/g;
    return num.toString().replace(regexp, ",");
  }
  function numToPhone(number) {
    const strNumber = number.toString();
    const firstNum = strNumber.substring(0, 3);
    const secondNum = strNumber.substring(3, 7);
    const lastNum = strNumber.substring(7, 11);
    return firstNum + "-" + secondNum + "-" + lastNum;
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
                  <th>{orderDetail.orderIdx}</th>
                  <th>{`${orderDetail.foodID.name} (${option})`}</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>주문 코드</td>
                  <td>{orderDetail.id}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="detail__main">
            {orderDetail.foodID.image[0] ? (
              <img src={orderDetail.foodID.image[0]} alt="detail__image" />
            ) : (
              <span id="detail__noimage">No image</span>
            )}
            <table className="detail-table__main">
              <tbody>
                <tr>
                  <td>상품명</td>
                  <td>{orderDetail.foodID.name}</td>
                </tr>
                <tr>
                  <td>상품번호</td>
                  <td>{orderDetail.foodID.id}</td>
                </tr>
                <tr>
                  <td>수량</td>
                  <td>{`${orderDetail.count}개`}</td>
                </tr>
                <tr>
                  <td>가격</td>
                  <td>{addComma(sumOptionPrice)}</td>
                </tr>
                <tr>
                  <td>총금액</td>
                  <td>{addComma(mulCount)}</td>
                </tr>
                <tr>
                  <td>남은재고</td>
                  <td>{`${orderDetail.foodID.stock}개`}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="detail__orderer">
            <table>
              <tbody>
                <tr>
                  <td>주문자</td>
                  <td>{`${orderDetail.userID.name} (${orderDetail.userID.email})`}</td>
                </tr>
                <tr>
                  <td>연락처</td>
                  <td>{numToPhone(orderDetail.userID.phone)}</td>
                </tr>
                <tr>
                  <td>배송지</td>
                  <td>{orderDetail.userID.address}</td>
                </tr>
              </tbody>
            </table>
            <table>
              <tbody>
                <tr>
                  <td>배달원</td>
                  <td>
                    {Object.keys(orderDetail.riderID).length === 0
                      ? "배달원 미정"
                      : `${orderDetail.riderID.name} (${orderDetail.riderID.email})`}
                  </td>
                </tr>
                <tr>
                  <td>연락처</td>
                  <td>
                    {Object.keys(orderDetail.riderID).length === 0
                      ? "배달원 미정"
                      : numToPhone(orderDetail.riderID.phone)}
                  </td>
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
          <button className="edit-button" onClick={()=>delOrder()} >취소하기</button>
        </div>
      )}
    </>
  );
};
const mapStateToProps = (state) => {
  const {orderList} = state.order;
  return {
    orderList
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    cancelOrder: (orderList) => dispatch(updateOrder(orderList)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(DetailScreen);
