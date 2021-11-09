import React, { useRef } from "react";
import { connect } from "react-redux";
import { fetchDatas } from "../../../redux/order/action";
import { useEffect } from "react";
const OrderList = ({
  orderList,
  loading,
  fetchDatas,
  storeID,
  nowProfileIndex,
}) => {
  // 주문목록 메뉴 하나 클릭시 발생 => active = true
  const handleTableClick = (e) => {
    const {
      parentNode: { id },
    } = e.target;
    //setFoodActive(id);
  };
 const orderLoaded = useRef(false);
  useEffect(()=>{
    if(orderList.length<1&&!orderLoaded.current){
      orderLoaded.current=true
    fetchDatas(storeID,nowProfileIndex)
    }
  }
  ,[fetchDatas,storeID,nowProfileIndex,orderLoaded,orderList]);
  return (
    <>
      <table className="order-table">
        <thead>
          <tr>
            <td>순번</td>
            <td>상품명</td>
            <td>수량</td>
            <td>가격</td>
            <td>총 금액</td>
          </tr>
        </thead>
      </table>
      <table className="order-table">
        <tbody>
          {loading ? (
            <>
              <tr>
                <td>loading...</td>
              </tr>
            </>
          ) : (
            orderList.map((e, index) => {
              return (
                <tr key={e.id} id={e.id} onClick={handleTableClick}>
                  <td>{index + 1}</td>
                  <td>{e.foodID.name}</td>
                  <td>2</td>
                  <td>{e.foodID.price}</td>
                  <td>{e.foodID.price * 2}</td>
                </tr>
              );
            })
          )}
        </tbody>
      </table>
    </>
  );
};

// store에서 부터 받아온 값을 prop으로 전달
const mapStateToProps = (state) => {
  const { orderList, loading } = state.order;
  const { storeID, nowProfileIndex } = state.store;
  return {
    orderList,
    loading,
    storeID,
    nowProfileIndex,
  };
};
// store로 부터 dispatch 받아와서 함수를 prop으로 전달
const mapDispatchToProps = (dispatch) => {
  return {
    fetchDatas: (storeID, profileIdx) =>
      dispatch(fetchDatas(storeID, profileIdx)),
  };
};
//connect는 store과 component를 이어주는 다리 역할
export default connect(mapStateToProps, mapDispatchToProps)(OrderList);
