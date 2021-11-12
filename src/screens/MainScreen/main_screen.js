import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import OrderList from "./Components/OrderList";
import DetailScreen from "../DetailScreen/detail_screen";
import NavigationBar from "../Navigationbar/navigation_bar";
import Header from "./Components/Header";

function MainScreen({ orderList }) {
  const [orderDetail, setOrderDetail] = useState({});
  const [finalCount, setFinalCount] = useState(0);
  const [finalPrice, setFinalPrice] = useState(0);
  useEffect(() => {
      let tempPrice = 0;
      let tempCount = 0;
      for (let e in orderList) {
        const a = Number(orderList[e].foodID.price);
        const b = orderList[e].count;
        tempPrice = tempPrice + a * b;
        tempCount = tempCount + b;
      setFinalCount(tempCount);
      setFinalPrice(tempPrice);
    }
  }, [orderList]);

  function addComma(num) {
    if (num) {
      var regexp = /\B(?=(\d{3})+(?!\d))/g;
      return num.toString().replace(regexp, ",");
    }
  }
  return (
    <>
      <NavigationBar />
      <div className="main-screen">
        <Header />
        <div>주문목록</div>
        <div>상세정보</div>
        <div>
          <OrderList setOrderDetail={setOrderDetail} />
        </div>
        <div style={{ overflow: "scroll" }}>
          <DetailScreen orderDetail={orderDetail} />
        </div>
        <div>
          <span>종합</span>
        </div>
        <div>
          공급가액
          <span className="order_span">{addComma(Math.round(finalPrice * 0.9))} 원</span>
        </div>
        <div>
          판매수량<span className="order_span">{finalCount} 개</span>
        </div>
        <div>
          총 매출 <span className="order_span">{addComma(finalPrice)} 원</span>
        </div>
      </div>
    </>
  );
}
const mapStateToProps = (state) => {
  const { orderList } = state.order;
  return {
    orderList,
  };
};



export default connect(mapStateToProps, null)(MainScreen);
