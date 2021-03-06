import React, { useState } from "react";
import { connect } from "react-redux";
import { fetchDatas } from "../../../redux/order/action";
import { useEffect } from "react";
import { collection, onSnapshot, query, where } from "@firebase/firestore";
import { db } from "../../../Firebase";
const OrderList = ({
  orderList,
  loading,
  fetchDatas,
  storeID,
  nowProfileIndex,
  setOrderDetail,
}) => {
  const [trRefs] = useState([]);
  useEffect(() => {
    const q = query(collection(db, "order"),where("sellerID","==",storeID));
    const q2=query(q,where("profile_idx","==",nowProfileIndex));
    const refreshData = onSnapshot(q2, (doc) => {
      let flag = false;
      doc.docChanges().forEach((e) => {
        if (e.type === "added"||e.type==="removed") {
          flag = true;
        }
      });
      if(flag){
        fetchDatas(storeID,nowProfileIndex);
      }
    });
    return () => {
      refreshData();
    };
  }, [fetchDatas, storeID, nowProfileIndex]);

  const handleTableClick = (e) => {
    const {
      parentNode: { id },
    } = e.target;
    for (const tr of trRefs) {
      if(tr!==null) {
      tr.classList.remove("active");
      }
    }
    e.target.parentNode.classList.add("active");
    const orderDetail = orderList.find((e) => id === e.id);
    const orderIdx = orderList.indexOf(orderDetail) + 1;
    setOrderDetail({ ...orderDetail, orderIdx });
  };

  function addComma(num) {
    var regexp = /\B(?=(\d{3})+(?!\d))/g;
    return num.toString().replace(regexp, ",");
  }
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
                <tr
                  key={e.id}
                  id={e.id}
                  onClick={handleTableClick}
                  ref={(el) => (trRefs[index] = el)}
                >
                  <td>{index + 1}</td>
                  <td>{`${e.foodID.name} (${
                    e.foodID.options[e.option].option
                  })`}</td>
                  <td>{e.count}</td>
                  <td>{addComma(e.foodID.price)}</td>
                  <td>{addComma(e.foodID.price * e.count)}</td>
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
