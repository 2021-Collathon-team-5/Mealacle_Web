import React from "react";
import { connect } from "react-redux";
import { fetchDatas, setFoodActive } from "../../../redux/action";
import { useEffect } from "react";
const OrderList = ({ foodList, loading, fetchDatas, setFoodActive }) => {
  // 주문목록 메뉴 하나 클릭시 발생 => active = true
  const handleTableClick = (e) => {
    const {
      parentNode: { id },
    } = e.target;
    setFoodActive(id);
  };

  useEffect(() => {
    fetchDatas();
    console.log("h");
  }, [fetchDatas]);

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
            foodList.map((e, index) => {
              return (
                <tr
                  key={e.id}
                  id={e.id}
                  onClick={handleTableClick}
                  className={e.active ? "active" : ""}
                >
                  <td>{index + 1}</td>
                  <td>{e.name}</td>
                  <td>2</td>
                  <td>{e.price}</td>
                  <td>{e.price * 2}</td>
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
  const { foodList } = state;
  return {
    foodList: foodList.list,
    loading: foodList.loading,
  };
};
// store로 부터 dispatch 받아와서 함수를 prop으로 전달
const mapDispatchToProps = (dispatch) => {
  return {
    fetchDatas: () => dispatch(fetchDatas()),
    setFoodActive: (foodID) => dispatch(setFoodActive(foodID)),
  };
};
//connect는 store과 component를 이어주는 다리 역할
export default connect(mapStateToProps, mapDispatchToProps)(OrderList);
