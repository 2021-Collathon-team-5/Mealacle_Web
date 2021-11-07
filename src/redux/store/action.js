import { firestoreService } from "../../Firebase";
import { GET_PROFILE, SET_NOW_PROFILE, SET_PROFILE } from "./types";
import { query,collection,where,getDocs } from "firebase/firestore/lite";
export const StoreWithCodeAndPassword = (StoreCode, Password) => {
    return async (dispatch) => {
        if (StoreCode && Password) {
            const db = firestoreService;
            const q = query(
                collection(db, "seller"),
                where("storeCode", "==", StoreCode)
            );
            const storedocs = await getDocs(q);
            if (storedocs.docs.length < 1) {
                alert("해당 매장코드를 가진 회원이 존재하지않습니다");
            } else {
                const store = storedocs.docs[0];
                if (store.data().password === Password) {
                    const profile = store.data().profile;
                    dispatch(getProfile(store.id,profile));
                } else {
                    alert("비밀번호오류");
                }
            }
        } else {
            alert("매장코드와 비밀번호를 모두 입력하세요");
        }
    }
};

const getProfile = (id,profile) => {
    return {
        type:GET_PROFILE,
        profile,
        id
    }
}
export const setProfile = (profile,idx) => {
    return {
        type:SET_PROFILE,
        profile,
        idx
    }
}
export const setNowProfile = (idx) => {
    return {
        type:SET_NOW_PROFILE,
        idx
    }
}