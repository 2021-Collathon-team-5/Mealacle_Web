import React from "react";
import { updateDoc,doc } from "@firebase/firestore/lite";
import { db } from "../../../../redux/foods/action";
const Modal = ({food,setVisible,visible,removeFoodImage}) => {
  const confirmDeleteImageNo = () => {
    setVisible({
      ...visible,
      visible: false,
    });
  };
  const confirmDeleteImageYes = async (idx) => {
    const list = [...food.image];
    list.splice(idx, 1);
    console.log(list);
    await updateDoc(doc(db, "food", food.id), {
      image: list,
    });
    removeFoodImage(food.id, list);
    setVisible({ ...visible, visible: false });
  };
    return (
        <div className="modal-confirm-backdrop">
          <div className="modal-confirm-window">
            <div className="confirm-main">
              <span>해당 이미지를 삭제합니다.</span>
              <div className="confirm-main__buttons">
                <span onClick={() => confirmDeleteImageYes(visible.idx)}>예</span>
                <span onClick={() => confirmDeleteImageNo()}>아니요</span>
              </div>
            </div>
          </div>
        </div>
      );
}

export default Modal;