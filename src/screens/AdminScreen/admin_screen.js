import React, { useEffect, useRef, useState } from "react";
import { connect } from "react-redux";
import { firestoreService } from "../../Firebase";
import { addDoc, collection } from "firebase/firestore/lite";
import { fetchDatas, setFoodActive, addFood } from "../../redux/foods/action";
import NavigationBar from "../Navigationbar/navigation_bar";
import UpdateScreen from "./MenuUpdateScreen/update_screen";
import AddFoodScreen from "./AddFoodScreen/add_food_screen";
import Header from "../MainScreen/Components/Header";

function AdminScreen({
  foodList,
  loading,
  fetchDatas,
  setFoodActive,
  storeID,
  nowProfile,
  nowProfileIndex,
}) {
  const [IsAddFood, setIsAddFood] = useState(false);
  const [FoodName, setFoodName] = useState("");
  const [FoodPrice, setFoodPrice] = useState(0);
  const [FoodOrigin, setFoodOrigin] = useState("");
  const [FoodCategory, setFoodCategory] = useState("0");
  const childRef = useRef();
  const foodLoaded = useRef(false);
  useEffect(() => {
    if (!foodLoaded.current && foodList.length < 1) {
      foodLoaded.current = true;
      fetchDatas(storeID, nowProfile.profileName);
    }
  }, [fetchDatas, storeID, nowProfile, foodLoaded, foodList]);

  const handleTableClick = (e) => {
    childRef.current.setEdit(false);
    setFoodActive(e.id);
    console.log(e.id);
  };
  const categoryChange = (e) => {
    setFoodCategory(e.target.value);
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
  const originChange = (e) => {
    setFoodOrigin(e.target.value);
  };
  const idToNum = (id) => {
    let num = "";
    for (var i = 0; i < 5; i++) {
      const v = id.charCodeAt(i);
      num += v;
    }
    num = num.substr(0, 10);
    return num;
  };
  const addFood = async () => {
    const db = firestoreService;
    const today = new Date();
    const body = {
      category: FoodCategory,
      description: "",
      image: [],
      name: FoodName,
      options: [{ option: "기본맛", price: "0" }],
      origin: FoodOrigin,
      price: FoodPrice,
      registrationDate: today.toDateString(),
      seller: {
        profile_idx: nowProfileIndex,
        profile_name: nowProfile.profileName,
        sellerid: storeID,
      },
      stock: 0,
    };
    await addDoc(collection(db, "food"), body)
      .then(() => fetchDatas(storeID, nowProfile.profileName))
      .then(() => setIsAddFood(false));
  };
  return (
    <div className="admin-screen-container">
      <NavigationBar />
      <div className="admin-screen">
        <Header />
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
                foodList.map((e) => {
                  return (
                    <tr
                      key={e.id}
                      id={e.id}
                      onClick={() => onClickEvent(e)}
                      className={e.active ? "active" : ""}
                    >
                      <td>{idToNum(e.id)}</td>
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
          <UpdateScreen ref={childRef} />
        </div>
      </div>
      {IsAddFood && (
        <AddFoodScreen
          nameChange={nameChange}
          priceChange={priceChange}
          originChange={originChange}
          addFood={addFood}
          containerExit={() => setIsAddFood(false)}
          categoryChange={categoryChange}
        />
      )}
    </div>
  );
}

const mapStateToProps = (state) => {
  const { foodList } = state.foods;
  const { storeID, nowProfile, nowProfileIndex } = state.store;
  return {
    foodList: foodList.list,
    loading: foodList.loading,
    storeID,
    nowProfile,
    nowProfileIndex,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchDatas: (id, name) => dispatch(fetchDatas(id, name)),
    setFoodActive: (foodID) => dispatch(setFoodActive(foodID)),
    addFood: (food) => dispatch(addFood(food)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AdminScreen);
