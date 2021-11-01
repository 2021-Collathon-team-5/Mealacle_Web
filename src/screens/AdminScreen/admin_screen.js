import React, { useEffect } from "react";
import { connect } from "react-redux";
import { firestoreService } from "../../Firebase";
import { addDoc, collection } from "firebase/firestore/lite";
import { fetchDatas, setFoodActive } from "../../redux/action";
import NavigationBar from "../Navigationbar/navigation_bar";
import UpdateScreen from "./MenuUpdateScreen/update_screen";

function AdminScreen({ foodList, loading, fetchDatas, setFoodActive }) {
  useEffect(() => {
    fetchDatas();
  }, [fetchDatas]);

  const handleTableClick = (e) => {
    setFoodActive(e.id);
  };

  const onClickEvent = (element) => {
    handleTableClick(element);
    console.log(element.id);
  };

  const addFood = async () => {
    const db = firestoreService;

    await addDoc(collection(db, "food"), {
      name: "마인하우스닭갈비",
      price: 12000,
      options: [],
      image: "",
    }).then(() => window.location.reload());
  };
  return (
    <>
      <NavigationBar />
      <div className="admin-screen">
        <div>한식 코너</div>
        <div>상품목록</div>
        <div>상세정보</div>
        <div>
          <table className="admin-table">
            <thead>
              <tr>
                <td>상품 번호</td>
                <td>상품명</td>
                <td>남은 재고</td>
                <td>가격</td>
              </tr>
            </thead>
          </table>
          <table className="admin-table">
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
                    <tr key={e.id} id={e.id} onClick={() => onClickEvent(e)}>
                      <td>{index + 1}</td>
                      <td>{e.name}</td>
                      <td>2</td>
                      <td>{e.price}</td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
          <div id="add-button" onClick={addFood}>
            상품추가+
          </div>
        </div>
        <div>
          <UpdateScreen />
        </div>
      </div>
    </>
  );
}

const mapStateToProps = (state) => {
  const { foodList } = state;
  return {
    foodList: foodList.list,
    loading: foodList.loading,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchDatas: () => dispatch(fetchDatas()),
    setFoodActive: (foodID) => dispatch(setFoodActive(foodID)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AdminScreen);