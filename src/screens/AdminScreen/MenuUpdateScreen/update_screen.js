import { getDownloadURL, ref, uploadBytes } from "@firebase/storage";
import { doc, getDoc, updateDoc } from "firebase/firestore/lite";
import React, { useState } from "react";
import { connect } from "react-redux";
import { firestorageService, firestoreService } from "../../../Firebase";

const storage = firestorageService;
function UpdateScreen({ foodList }) {
  const [File, setFile] = useState([]); //File은 새로운 이미지의 주소
  const [FileURL, setFileURL] = useState([]);
  let nothingSelected = true;

  const food = foodList.find((food) => food.active); // active된 food data
  if (food) {
    nothingSelected = false;
  } else {
    nothingSelected = true;
  }

  const ImageChange = async () => {
    const storagedb = firestorageService;
    for (let i = 0; i < File.length; i++) {
      await uploadBytes(ref(storagedb, `images/${food.name}/${i}`), File[i]);
      setFileURL([
        ...FileURL,
        await getDownloadURL(ref(storagedb, `images/${food.name}/${i}`)),
      ]);
    }
  };
  const updateImages = async () => {
    const storedb = firestoreService;
    await ImageChange().then(async () => {
      await updateDoc((await getDoc(doc(storedb, "food", food.id))).ref, {
        image: [...food.image, ...FileURL],
      }).then(() => console.log("Finished"));
    });
  };
  const onFileChange = (event) => {
    //files에는 파일이 여러개 담길수있지만 하나만 담을것이기때문에 files[0] 으로 진행
    const theFile = event.target.files[0];
    setFile([...File, theFile]);
  };
  const addOptions = async () => {
    const db = firestoreService;
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
            <div>
              <input
                type="file"
                onChange={onFileChange}
                width="100%"
                height="200"
              />

              <button onClick={updateImages}>사진 변경하기</button>
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

export default connect(mapStateToProps, null)(UpdateScreen);
