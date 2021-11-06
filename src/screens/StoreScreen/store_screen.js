import React, { useRef } from 'react';
import NavigationBar from '../Navigationbar/navigation_bar';
const StoreScreen = () => {
    const inputRef = useRef([]);
    const modified = () => {
        if (inputRef.current[0].disabled === false) {
            for (let i = 0; i < inputRef.current.length; i++) {
                inputRef.current[i].disabled = true;
            }
        } else {
            for (let i = 0; i < inputRef.current.length; i++) {
                inputRef.current[i].disabled = false;
            }
        }
    }
    return (
        <>
            <NavigationBar />
            <div className="store-screen">
                <div className="store__header">

                </div>
                <div className="store__main">
                    <div className="store__main-title">
                        <span>매장관리</span>
                    </div>
                    <div className="store__content">
                        <div>
                            <span>매장 이름</span>
                            <input type="text" placeholder="특수문자 미포함 최대 2글자 이상 10글자 미만" ref={el => inputRef.current[4] = el} />
                        </div>
                        <div>
                            <span>매장 코드</span>
                            <span>Put the store Code</span>
                        </div>
                        <div>
                            <span>매장 위치</span>
                            <span>대전시 유성구 장대동 352-9</span>
                        </div>
                        <div>
                            <span>운영 시간</span>
                            <div>
                                <input type="text" className="input-center" ref={el => inputRef.current[0] = el} />
                                <span className="store__content-divider">
                                    ~
                                </span>
                                <input type="text" className="input-center" ref={el => inputRef.current[1] = el} />
                            </div>
                        </div>
                        <div>
                            <span>브레이크 타임</span>
                            <div>
                                <input type="text" className="input-center" ref={el => inputRef.current[2] = el} />
                                <span className="store__content-divider">
                                    ~
                                </span>
                                <input type="text" className="input-center" ref={el => inputRef.current[3] = el} />
                            </div>
                        </div>
                        <div>
                            <span>매장 영업 상태</span>
                            <label className="switch">
                                <input type="checkbox" />
                                <span className="slider round"></span>
                            </label>
                        </div>
                        <div>
                            <button onClick={() => modified()}>수정</button>
                        </div>

                    </div>
                </div>
            </div>
        </>
    )
}

export default StoreScreen;