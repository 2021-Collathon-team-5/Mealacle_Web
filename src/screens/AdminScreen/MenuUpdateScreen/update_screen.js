import { doc, updateDoc, deleteDoc } from "firebase/firestore/lite";
import React, { useEffect, useState, useRef, useImperativeHandle } from "react";
import { updateFood, deleteFood } from "../../../redux/foods/action";
import { db } from "../../../redux/foods/action";
import { connect } from "react-redux";
import DescriptionImage from "./Components/DescriptionImage";
import ImageList from "./Components/ImageList";
import Option from "./Components/Option";

function UpdateScreen({ foodList, updateFood, deleteFood }, ref) {
  const [text, setText] = useState({
    name: "",
    price: 0,
    stock: 0,
  });
  const [edit, setEdit] = useState(false);
  const checkboxRef = useRef(null);
  const spanRef = useRef(null);
  const editButtonRef = useRef(null);
  const deleteButtonRef = useRef(null);
  const inputRefs = useRef([]);
  let nothingSelected = true;
  const food = foodList.find((food) => food.active); // active된 food data
  useImperativeHandle(ref, () => ({
    setEdit,
  }));
  if (food) {
    nothingSelected = false;
  } else {
    nothingSelected = true;
  }

  const onEdit = async () => {
    if (edit) {
      await updateDoc(doc(db, "food", food.id), {
        ...text,
      });
      updateFood(food.id, { ...food, ...text });
      setEdit(false);
    } else {
      setEdit(true);
    }
  };
  const onDelete = async () => {
    //fetchDatas
    if (edit) {
      nothingSelected = true;
      await deleteDoc(doc(db, "food", food.id)).then(() => deleteFood(food.id));
    }
  };
  useEffect(() => {
    if (food) {
      setText({
        name: food.name,
        price: food.price,
        stock: food.stock,
      });
    }
  }, [foodList, food]);
  useEffect(() => {
    if (food) {
      if (checkboxRef && editButtonRef && inputRefs.current.length > 0) {
        if (!edit) {
          editButtonRef.current.innerText = "수정";
          checkboxRef.current.disabled = true;
          for (var i = 0; i < inputRefs.current.length; i++) {
            inputRefs.current[i].disabled = true;
          }
        } else {
          editButtonRef.current.innerText = "완료";
          checkboxRef.current.disabled = false;
          for (i = 0; i < inputRefs.current.length; i++) {
            inputRefs.current[i].disabled = false;
          }
        }
      }
    }
  }, [edit, food]);
  const changeChecked = () => {
    if (checkboxRef.current.checked) {
      spanRef.current.innerText = "판매 중";
      spanRef.current.className = "product-onsale";
    } else {
      spanRef.current.innerText = "판매 정지";
      spanRef.current.className = "product-notonsale";
    }
  };
  const changeHandler = (e) => {
    const { name, value } = e.target;
    setText({
      ...text,
      [name]: value,
    });
  };
  return (
    <>
      {nothingSelected ? (
        <span>Nothing was selected.</span>
      ) : (
        <>
          <div className="update-main" disabled={!edit}>
            <div className="update_contents-editdiv">
              <span className="update__contents-title">상품명*</span>
              <input
                type="text"
                name="name"
                value={text.name}
                ref={(el) => (inputRefs.current[0] = el)}
                onChange={changeHandler}
                disabled
              />
            </div>
            <div className="update_contents-editdiv">
              <span className="update__contents-title">남은 재고*</span>
              <input
                type="text"
                name="stock"
                value={text.stock}
                ref={(el) => (inputRefs.current[1] = el)}
                onChange={changeHandler}
                disabled
              />
              <span>재고 수정일</span>
            </div>
            <ImageList food={food} ref={(el) => (inputRefs.current[2] = el)} />
            <Option food={food} updateFood={updateFood} />
            <DescriptionImage food={food} />
            <div className="update_contents-editdiv">
              <span className="update__contents-title">가격*</span>
              <input
                type="text"
                name="price"
                value={text.price}
                ref={(el) => (inputRefs.current[3] = el)}
                onChange={changeHandler}
                disabled
              />
            </div>
            <div>
              <span className="update__contents-title">상품 번호</span>
            </div>
            <div>
              <span className="update__contents-title">상품 등록일</span>
              <span>{food.registrationDate && food.registrationDate}</span>
            </div>
            <div className="update_contents-row">
              <span className="update__contents-title">판매 여부</span>
              <div className="update_contents-editdiv">
                <label className="switch">
                  <input
                    type="checkbox"
                    ref={checkboxRef}
                    onChange={() => changeChecked()}
                  />
                  <span className="slider round"></span>
                </label>
                <span className="product-notonsale" ref={spanRef}>
                  판매 정지
                </span>
              </div>
            </div>
            <button
            className="delete-button"
            onClick={onDelete}
            ref={deleteButtonRef}
          >
            삭제
          </button>
            </div>
            <button className="edit-button" onClick={onEdit} ref={editButtonRef}>
            수정
          </button>

        </>
      )}
    </>
  );
}

// store에서 부터 받아온 값을 prop으로 전달
const mapStateToProps = (state) => {
  const { foodList } = state.foods;
  const { nowProfile, storeID } = state.store;
  return {
    foodList: foodList.list,
    nowProfile,
    storeID,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    updateFood: (foodID, list) => dispatch(updateFood(foodID, list)),
    deleteFood: (foodID) => dispatch(deleteFood(foodID)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps, null, {
  forwardRef: true,
})(React.forwardRef(UpdateScreen));
