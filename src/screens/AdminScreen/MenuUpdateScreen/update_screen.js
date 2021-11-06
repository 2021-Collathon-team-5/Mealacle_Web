import { getDownloadURL, ref, uploadBytes } from "@firebase/storage";
import { doc, updateDoc } from "firebase/firestore/lite";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { firestorageService, firestoreService } from "../../../Firebase";
import { removeFoodImage, addFoodImage } from "../../../redux/action";

function UpdateScreen({ foodList, addFoodImage, removeFoodImage }) {
  const [File, setFile] = useState(); //File은 새로운 이미지의 주소
  const [FileURL, setFileURL] = useState();
  let nothingSelected = true;

  const food = foodList.find((food) => food.active); // active된 food data
  if (food) {
    nothingSelected = false;
  } else {
    nothingSelected = true;
  }

  const ImageChange = async () => {
    const storagedb = firestorageService;
    await uploadBytes(
      ref(storagedb, `images/${food.name}/${food.image.length + 1}`),
      File
    );
    setFileURL(
      await getDownloadURL(
        ref(storagedb, `images/${food.name}/${food.image.length + 1}`)
      )
    );
  };

  const onFileChange = (event) => {
    //files에는 파일이 여러개 담길수있지만 하나만 담을것이기때문에 files[0] 으로 진행
    const theFile = event.target.files[0];
    setFile(theFile);
  };

  useEffect(() => {
    if (food && FileURL) {
      const updateImages = async () => {
        const storedb = firestoreService;
        await updateDoc(doc(storedb, "food", food.id), {
          image: [...food.image, FileURL],
        });
      };
      updateImages();
      setFileURL();
      addFoodImage(food.id, FileURL);
    }
  }, [FileURL, food, addFoodImage, removeFoodImage]);

  const addOptions = async () => {
    const db = firestoreService;
    await updateDoc(doc(db, "food", food.id), {
      options: [
        ...food.options,
        {
          고기추가: false,
          무추가: false,
          곱빼기: true,
        },
      ],
    }).then(() => window.location.reload());
  };

  return (
    <>
      {nothingSelected ? (
        <span>Nothing was selected.</span>
      ) : (
        <div>
          <div>
            <label>옵션*</label>
            {food.options &&
              food.options.map((e, index) => {
                return (
                  <div key={`${e.id}/${index}`} className="menu-option">
                    옵션A
                  </div>
                );
              })}

            <button onClick={addOptions}>추가</button>
          </div>
          <div>
            <label>상품 설명(이미지)*</label>
            {food.image.map((e, index) => {
              return (
                <img
                  key={index}
                  src={e}
                  width="100"
                  alt="product_img"
                  className="product-img"
                  onClick={async () => {
                    if (window.confirm("삭제하시겠습니까?")) {
                      const newList = food.image.filter((item) => {
                        return item !== e;
                      });
                      const db = firestoreService;
                      await updateDoc(doc(db, "food", food.id), {
                        image: newList,
                      }).then(() => alert("삭제되었습니다"));
                      removeFoodImage(food.id, newList);
                    }
                  }}
                />
              );
            })}
            <div>
              <input
                type="file"
                onChange={onFileChange}
                width="100%"
                height="200"
              />
              <button onClick={ImageChange}>사진 변경하기</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

// store에서 부터 받아온 값을 prop으로 전달
const mapStateToProps = (state) => {
  const { foodList } = state;
  return {
    foodList: foodList.list,
  };
};
// store로 부터 dispatch 받아와서 함수를 prop으로 전달
const mapDispatchToProps = (dispatch) => {
  return {
    addFoodImage: (foodID, image) => dispatch(addFoodImage(foodID, image)),
    removeFoodImage: (foodID, image) =>
      dispatch(removeFoodImage(foodID, image)),
  };
};
//connect는 store과 component를 이어주는 다리 역할
export default connect(mapStateToProps, mapDispatchToProps)(UpdateScreen);
