import React, { useState, useRef } from "react";
import { updateDoc, doc } from "firebase/firestore/lite";
import { db } from "../../../../redux/foods/action";
import { connect } from "react-redux";
import AddOptionScreen from "../AddOptionScreen/add_option_screen";
import closeImage from "../../../../images/outline_clear_black_48dp.png";
import Modal from "./Modal";
const Option = ({ food, updateFood }) => {
  //Option -> map : option : Option, price : Price 로 저장
  const [Option, setOption] = useState();
  const [AdditionalPrice, setAdditionalPrice] = useState();
  const [IsAddOption, setIsAddOption] = useState(false);
  const [visible, setVisible] = useState({
    visible: false,
    idx: 0,
  });
  const inputRefs = useRef([]);

  const optionChange = (e) => {
    setOption(e.target.value);
  };
  const priceChange = (e) => {
    setAdditionalPrice(e.target.value);
  };
  const addOption = async () => {
    if (inputRefs.current[0].value.length < 1) {
      alert("옵션 명을 입력해야합니다.");
      return;
    } else if (inputRefs.current[1].value.length < 1) {
      alert("추가 금액을 입력해야합니다.");
      return;
    }
    await updateDoc(doc(db, "food", food.id), {
      options: [
        ...food.options,
        {
          option: Option,
          price: AdditionalPrice,
        },
      ],
    });
    updateFood(food.id, {
      ...food,
      options: [
        ...food.options,
        {
          option: Option,
          price: AdditionalPrice,
        },
      ],
    });
    setIsAddOption(false);
    setOption();
    setAdditionalPrice();
  };
  const removeOption = (idx) => {
    setVisible({
      visible: true,
      idx,
    });
  };
  const confirmDeleteImageYes = async () => {
    const { idx } = visible;
    const options = [...food.options];
    options.splice(idx, 1);
    await updateDoc(doc(db, "food", food.id), {
      options,
    });
    updateFood(food.id, {
      ...food,
      options,
    });
    setVisible({
      ...visible,
      visible: false,
    });
  };
  const confirmDeleteImageNo = () => {
    setVisible({
      ...visible,
      visible: false,
    });
  };
  return (
    <div className="update_contents-row">
      {visible.visible && (
        <Modal
          message="해당 옵션을 삭제하시겠습니까?"
          confirmDeleteImageYes={confirmDeleteImageYes}
          confirmDeleteImageNo={confirmDeleteImageNo}
        />
      )}
      <span className="update__contents-title">옵션*</span>
      {food.options &&
        food.options.map((e, index) => {
          return (
            <div key={`${e.id}/${index}`} className="menu-option">
              <div>{food.options[index].option}</div>
              <div>
                <span>+{food.options[index].price}원</span>
                <img
                  src={closeImage}
                  alt="closebtn"
                  onClick={() => removeOption(index)}
                />
              </div>
            </div>
          );
        })}
      <button
        onClick={() => setIsAddOption(!IsAddOption)}
        className="edit-button"
      >
        추가
      </button>
      {IsAddOption && (
        <AddOptionScreen
          optionChange={optionChange}
          priceChange={priceChange}
          containerExit={() => setIsAddOption(false)}
          addOption={addOption}
          ref={inputRefs}
        />
      )}
    </div>
  );
};
const mapStatetoProps = (state) => {
  const { foodList } = state.foods;
  return {
    foodList,
  };
};
export default connect(mapStatetoProps, null)(Option);
