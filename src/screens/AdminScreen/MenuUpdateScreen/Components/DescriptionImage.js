import React from "react";
import { useState, useEffect } from "react";
import { firestorageService } from "../../../../Firebase";
import { uploadBytes, ref, getDownloadURL } from "@firebase/storage";
import { updateDescription, db } from "../../../../redux/foods/action";
import { updateDoc, doc } from "@firebase/firestore/lite";
import { connect } from "react-redux";
const DescriptionImage = ({ food, updateDescription }) => {
    const [DescriptionImage, setDescriptionImage] = useState();
    const [DescriptionImageURL, setDescriptionImageURL] = useState();
    useEffect(() => {
        if (food && DescriptionImage) {
            const DescriptionImageChange = async () => {
                const storagedb = firestorageService;
                await uploadBytes(
                    ref(storagedb, `images/${food.name}/description`),
                    DescriptionImage
                );
                setDescriptionImageURL(
                    await getDownloadURL(
                        ref(storagedb, `images/${food.name}/description`)
                    )
                );
            };
            DescriptionImageChange().then(() => setDescriptionImage());
        }
    }, [DescriptionImage, food]);
    useEffect(() => {
        if (food && DescriptionImageURL) {
            const updateImages = async () => {
                await updateDoc(doc(db, "food", food.id), {
                    description: DescriptionImageURL,
                }).then(() => {
                    updateDescription(food.id, DescriptionImageURL);
                });
            };
            updateImages();
            setDescriptionImageURL();
        }
    }, [DescriptionImageURL, food, updateDescription]);
    return (
        <div>
            <span className="update__contents-title">상품 설명(이미지)*</span>
            <div className="update__description-image">
                {food.description ? <img alt="description_image" src={food.description} id="product-description-img" /> :
                    <span className="description__noimage">No Image</span>}
                <input
                    type="file"
                    alt="descriptionImage"
                    onChange={(e) => { setDescriptionImage(e.target.files[0]); e.target.value = "" }}
                />
            </div>
        </div>
    );
}
// store에서 부터 받아온 값을 prop으로 전달
const mapStateToProps = (state) => {
    const { foodList } = state.foods;
    return {
        foodList: foodList.list,
    };
};
const mapDispatchToProps = (dispatch) => {
    return {
        updateDescription: (foodID, image) =>
            dispatch(updateDescription(foodID, image)),
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(DescriptionImage);