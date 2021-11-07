import { getDownloadURL, ref, uploadBytes } from "@firebase/storage";
import { doc, getDoc, updateDoc } from "firebase/firestore/lite";
import React, { useEffect, useState, useRef } from "react";
import { connect } from "react-redux";
import { firestorageService } from "../../../Firebase";
import { addFoodImage, removeFoodImage, updateFood } from "../../../redux/action";
import { db } from "../../../redux/action";
import CameraImage from '../../../images/iconmonstr-photo-camera-4-240.png';

function UpdateScreen({ foodList, addFoodImage, removeFoodImage , updateFood}) {
  const [File, setFile] = useState(); //File은 새로운 이미지의 주소
  const [FileURL, setFileURL] = useState();
  const [visible, setVisible] = useState({
    visible: false,
    idx: 0
  });
  const [text,setText] = useState({
    name:"",
    price:0,
    stock:0
  });
  const [edit,setEdit] = useState(false);

  const checkboxRef = useRef(null);
  const spanRef = useRef(null);
  const editButtonRef = useRef(null);
  const inputRefs = useRef([]);
  let nothingSelected = true;
  const food = foodList.find((food) => food.active); // active된 food data
  if (food) {
    nothingSelected = false;
  } else {
    nothingSelected = true;
  }

  const onEdit = async() => {

    if(edit) {
      await updateDoc(doc(db, "food", food.id),{
        ...text
      });
      updateFood(food.id,text);
      setEdit(false);
    } else {
      setEdit(true);
    }
  }
  const onFileChange = (event) => {
    //files에는 파일이 여러개 담길수있지만 하나만 담을것이기때문에 files[0] 으로 진행
    const theFile = event.target.files[0];
    setFile(theFile);
    event.target.value="";
  };
  useEffect(()=>{
    if(food) {
      setEdit(false);
      setText({
        name:food.name,
        price:food.price,
        stock:food.stock,
      })
    }
  },[food]);
  useEffect(()=>{
    if(checkboxRef && editButtonRef && inputRefs.current.length>0) {
    if(!edit) {
      editButtonRef.current.innerText = "수정";
      checkboxRef.current.disabled=true;
      for(var i=0;i<inputRefs.current.length;i++) {
        inputRefs.current[i].disabled=true;
      }
    } else {
      editButtonRef.current.innerText = "완료";
      checkboxRef.current.disabled=false;
      for(i=0;i<inputRefs.current.length;i++) {
        inputRefs.current[i].disabled=false;
      }
    }
  }
  },[edit]);
  useEffect(()=> {
    if(food && File) {
      const ImageChange = async () => {
        const storagedb = firestorageService;
        await uploadBytes(ref(storagedb, `images/${food.name}/${food.image.length + 1}`), File);
        setFileURL(
          await getDownloadURL(ref(storagedb, `images/${food.name}/${food.image.length + 1}`)),
        );
      };
      ImageChange().then(() =>setFile());
    }
  },[File,food])
  useEffect(() => {
    if (food && FileURL) {
      const updateImages = async () => {
        console.log(FileURL);
        await updateDoc(doc(db, "food", food.id), {
          image: [...food.image, FileURL],
        }).then(() => {
          console.log("Finished");
          addFoodImage(food.id, FileURL);
        });
      };
      updateImages();
      setFileURL();
    }
  }, [FileURL, food, addFoodImage]);

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
      visible: true,
      idx: idx
    });
  }
  const confirmDeleteImageNo = () => {
    setVisible({
      ...visible,
      visible: false
    });
  }
  const confirmDeleteImageYes = async (idx) => {
    const list = [...food.image];
    list.splice(idx, 1);
    console.log(list);
    await updateDoc(doc(db, "food", food.id), {
      image: list
    });
    removeFoodImage(food.id, list);
    setVisible({ ...visible, visible: false });
  }
  const changeChecked = () => {
    if (checkboxRef.current.checked) {
      spanRef.current.innerText = "판매 중"
      spanRef.current.className = "product-onsale"
    } else {
      spanRef.current.innerText = "판매 정지"
      spanRef.current.className = "product-notonsale"
    }
  }
  const changeHandler = (e) => {
    const {name,value} = e.target;
    setText({
      ...text,
      [name] : value
    })
  }
  const Modal = () => {
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
  return (
    <>
      {visible.visible && <Modal />}
      {nothingSelected ? (
        <span>Nothing was selected.</span>
      ) : (
        <div className="update-main">
          <div className="update_contents-editdiv">
            <span className="update__contents-title">상품명*</span>
            <input type="text" name="name" value={text.name} ref={el=>inputRefs.current[0]=el} onChange={changeHandler} disabled/>
          </div>
          <div className="update_contents-editdiv">
            <span className="update__contents-title">남은 재고*</span>
            <input type="text" name="stock" value={text.stock} ref={el=>inputRefs.current[1]=el} onChange={changeHandler} disabled/>
            <span>재고 수정일</span>
          </div>
          <div className="update_contents-row">
            <span className="update__contents-title">상품 설명(이미지)*</span>
            <div className="product-imgs">
              {food.image.map((e, idx) => {
                return (<img src={e} alt="product_img" className="product-img"
                  onClick={() => confirmDeleteImage(idx)} />);
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
                ref={el=>inputRefs.current[2]=el}
              />
            </div>
            <div>
            </div>
          </div>
          <div className="update_contents-row">
            <span className="update__contents-title">옵션*</span>
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
            <span className="update__contents-title">상품 설명(이미지)*</span>
          </div>
          <div className="update_contents-editdiv">
            <span className="update__contents-title">가격*</span>
            <input type="text" name="price" value={text.price} ref={el=>inputRefs.current[3]=el} onChange={changeHandler} disabled/>
          </div>
          <div>
            <span className="update__contents-title">상품 번호</span>
          </div>
          <div>
            <span className="update__contents-title">상품 등록일</span>
          </div>
          <div className="update_contents-row">
            <span className="update__contents-title">판매 여부</span>
            <div className="update_contents-editdiv">
              <label className="switch">
                <input type="checkbox" ref={checkboxRef} onChange={() => changeChecked()} />
                <span className="slider round"></span>
              </label>
              <span className="product-notonsale" ref={spanRef} >판매 정지</span>
            </div>
          </div>
          <button className="edit-button" onClick={onEdit} ref={editButtonRef}>수정</button>
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
const mapDispatchToProps = (dispatch) => {
  return {
    addFoodImage: (foodID, image) => dispatch(addFoodImage(foodID, image))
    , removeFoodImage: (foodID, image) => dispatch(removeFoodImage(foodID, image))
    ,updateFood:(foodID,list) => dispatch(updateFood(foodID,list))
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(UpdateScreen);
