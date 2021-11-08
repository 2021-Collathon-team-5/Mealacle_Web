import CameraImage from "../../../../images/iconmonstr-photo-camera-4-240.png";
import React, { useState, useEffect } from "react";
import { updateDoc, doc } from "@firebase/firestore/lite";
import { uploadBytes, getDownloadURL, ref } from "@firebase/storage";
import { firestorageService } from "../../../../Firebase";
import { db } from "../../../../redux/foods/action";
import { addFoodImage, removeFoodImage } from "../../../../redux/foods/action";
import { connect } from "react-redux";
import Modal from "./Modal";

const ImageList = React.forwardRef(
  ({ food, addFoodImage, removeFoodImage }, inputRef) => {
    const [File, setFile] = useState(); //File은 새로운 이미지의 주소
    const [FileURL, setFileURL] = useState();
    const [visible, setVisible] = useState({
      visible: false,
      idx: 0,
    });
    const onFileChange = (event) => {
      //files에는 파일이 여러개 담길수있지만 하나만 담을것이기때문에 files[0] 으로 진행
      const theFile = event.target.files[0];
      if (food.image.length < 5) {
        setFile(theFile);
      } else {
        alert("이미지는 최대 5장까지만 저장할수있습니다");
      }

      event.target.value = "";
    };
    useEffect(() => {
      if (food && File) {
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
        ImageChange().then(() => setFile());
      }
    }, [File, food]);
    useEffect(() => {
      if (food && FileURL) {
        const updateImages = async () => {
          await updateDoc(doc(db, "food", food.id), {
            image: [...food.image, FileURL],
          }).then(() => {
            addFoodImage(food.id, FileURL);
          });
        };
        updateImages();
        setFileURL();
      }
    }, [FileURL, food, addFoodImage]);
    const confirmDeleteImage = (idx) => {
      setVisible({
        visible: true,
        idx: idx,
      });
    };

    return (
      <div className="update_contents-row">
        <span className="update__contents-title">상품 사진*</span>
        <div className="product-imgs">
          {visible.visible && (
            <Modal
              food={food}
              setVisible={setVisible}
              visible={visible}
              removeFoodImage={removeFoodImage}
            />
          )}
          {food.image.map((e, idx) => {
            return (
              <img
                key={idx}
                src={e}
                alt="product_img"
                className="product-img img-hide"
                onClick={() => confirmDeleteImage(idx)}
                onLoad={(e) => e.target.classList.remove("img-hide")}
              />
            );
          })}
          <label htmlFor="image-file-input">
            <div className="product-img__button">
              <img src={CameraImage} alt="camera_button" />
              <span>{food.image.length}/5</span>
            </div>
          </label>

          <input
            type="file"
            onChange={onFileChange}
            width="100%"
            height="200"
            id="image-file-input"
            ref={inputRef}
          />
        </div>
      </div>
    );
  }
);
const mapStateToProps = (state) => {
  const { foodList } = state.foods;
  return {
    foodList: foodList.list,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    addFoodImage: (foodID, image) => dispatch(addFoodImage(foodID, image)),
    removeFoodImage: (foodID, image) =>
      dispatch(removeFoodImage(foodID, image)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps, null, {
  forwardRef: true,
})(ImageList);
