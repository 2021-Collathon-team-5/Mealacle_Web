import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { firestoreService } from "../../Firebase";
import { addDoc, collection } from "firebase/firestore/lite";
import { fetchDatas, setFoodActive } from "../../redux/foods/action";
import NavigationBar from "../Navigationbar/navigation_bar";
import UpdateScreen from "./MenuUpdateScreen/update_screen";
import AddFoodScreen from "./AddFoodScreen/add_food_screen";

function AdminScreen({ foodList, loading, fetchDatas, setFoodActive }) {
  const [IsAddFood, setIsAddFood] = useState(false);
  const [FoodName, setFoodName] = useState("");
  const [FoodPrice, setFoodPrice] = useState(0);
  useEffect(() => {
    fetchDatas();
  }, [fetchDatas]);

  const handleTableClick = (e) => {
    setFoodActive(e.id);
  };

  const onClickEvent = (element) => {
    handleTableClick(element);
  };
  const nameChange = (e) => {
    setFoodName(e.target.value);
  };
  const priceChange = (e) => {
    setFoodPrice(e.target.value);
  };

  const addFood = async () => {
    const db = firestoreService;

    await addDoc(collection(db, "food"), {
      name: FoodName,
      price: FoodPrice,
      options: [
        {
          기본맛: true,
          매운맛: false,
        },
      ],
      image: [],
      stock: 0,
    }).then(() => window.location.reload());
  };
  return (
    <div className="admin-screen-container">
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
                      <td>{e.stock}</td>
                      <td>{e.price}</td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
          <div id="add-button" onClick={() => setIsAddFood(!IsAddFood)}>
            상품추가+
          </div>
        </div>
        <div>
          <UpdateScreen />
        </div>
      </div>
      {IsAddFood && (
        <AddFoodScreen
          nameChange={nameChange}
          priceChange={priceChange}
          addFood={addFood}
          containerExit={() => setIsAddFood(false)}
        />
      )}
    </div>
  );
}

const mapStateToProps = (state) => {
  const { foodList } = state.foods;
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
