import React,{useState} from "react";
import OrderList from "./Components/OrderList";
import DetailScreen from "../DetailScreen/detail_screen";
import NavigationBar from "../Navigationbar/navigation_bar";
import Header from "./Components/Header";

function MainScreen() {
  
  const [orderDetail,setOrderDetail] = useState({});
  return (
    <>
      <NavigationBar />
      <div className="main-screen">
        <Header />
        <div>주문목록</div>
        <div>상세정보</div>
        <div>
          <OrderList setOrderDetail={setOrderDetail}/>
        </div>
        <div style={{ overflow: "scroll" }}>
          <DetailScreen orderDetail={orderDetail}/>
        </div>
        <div>
          <span>종합</span>
        </div>
        <div>공급가액</div>
        <div>판매수량</div>
        <div>총 매출</div>
      </div>
    </>
  );
}

export default MainScreen;
