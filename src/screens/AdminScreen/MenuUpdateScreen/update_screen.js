import { getDownloadURL, ref, uploadBytes } from "@firebase/storage";
import { doc, getDoc, updateDoc } from "firebase/firestore/lite";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { firestorageService, firestoreService } from "../../../Firebase";
import { addFoodImage, removeFoodImage } from "../../../redux/action";
import { db } from "../../../redux/action";
function UpdateScreen({ foodList, addFoodImage,removeFoodImage }) {
  const [File, setFile] = useState(); //File은 새로운 이미지의 주소
  const [FileURL, setFileURL] = useState();
  const [visible,setVisible] = useState({
    visible : false,
    idx : 0
  });
  let nothingSelected = true;
  const food = foodList.find((food) => food.active); // active된 food data
  if (food) {
    nothingSelected = false;
  } else {
    nothingSelected = true;
  }

  const ImageChange = async () => {
    const storagedb = firestorageService;
      await uploadBytes(ref(storagedb, `images/${food.name}/${food.image.length+1}`), File);
      setFileURL(
        await getDownloadURL(ref(storagedb, `images/${food.name}/${food.image.length+1}`)),
      );
  };

  const onFileChange = (event) => {
    //files에는 파일이 여러개 담길수있지만 하나만 담을것이기때문에 files[0] 으로 진행
    const theFile = event.target.files[0];
    setFile(theFile);
  };
  useEffect(()=>{
    if(food && FileURL) {
    const updateImages = async () => {
      const storedb = firestoreService;
      console.log(FileURL);
        await updateDoc((await getDoc(doc(storedb, "food", food.id))).ref, {
          image: [...food.image, FileURL],
        }).then(() => {
          console.log("Finished");
          addFoodImage(food.id,FileURL);
      });
    };
      updateImages();}
  },[FileURL,food,addFoodImage]);

  const addOptions = async () => {
    await updateDoc((await getDoc(doc(db, "food", food.id))).ref, {
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
  const confirmDeleteImage = (idx) => {
    setVisible({
      visible:true,
      idx:idx
    });
  }
  const confirmDeleteImageNo = () => {
    setVisible({
      ...visible,
      visible:false
    });
  }
  const confirmDeleteImageYes = async(idx) => {
    const list = [...food.image];
    list.splice(idx,1);
   console.log(list);
   await updateDoc(doc(db, "food", food.id), {
    image:list
  });
  removeFoodImage(food.id,list);
  setVisible({...visible,visible:false});
  }
  const Modal = ()=> {
    return (
      <div className="modal-confirm-backdrop">
        <div className="modal-confirm-window">
          <div className="confirm-main">
            <span>해당 이미지를 삭제합니다.</span>
            <div className="confirm-main__buttons">
              <span onClick={()=>confirmDeleteImageYes(visible.idx)}>예</span>
              <span onClick={()=>confirmDeleteImageNo()}>아니요</span>
            </div>
          </div>
        </div>
      </div>
    );
  }
  return (
    <>
     {visible.visible && <Modal/>}
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
            <div className="product-imgs">
              {food.image.map((e,idx) => {
                return (<img src={e} alt="product_img" className="product-img"
                onClick={()=>confirmDeleteImage(idx)}/>);
              })}
              </div>
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

const mapStateToProps = (state) => {
  const { foodList } = state;
  return {
    foodList: foodList.list,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    addFoodImage:(foodID,image)=>dispatch(addFoodImage(foodID,image))
    ,removeFoodImage:(foodID,image)=>dispatch(removeFoodImage(foodID,image))
  };
};
export default connect(mapStateToProps,mapDispatchToProps)(UpdateScreen);
