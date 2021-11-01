import React from "react";
import NavigationBar from "../Navigationbar/navigation_bar";
import UpdateScreen from "./MenuUpdateScreen/update_screen";

function AdminScreen() {
  return (
    <>
      <NavigationBar />
      <div className="admin-screen">
        <div>한식 코너</div>
        <div>상품목록</div>
        <div>상세정보</div>
        <div>
          <table className="admin-table">
            <thead>
              <tr>
                <td>상품 번호</td>
                <td>상품명</td>
                <td>남은 재고</td>
                <td>가격</td>
              </tr>
            </thead>
          </table>
          <table className="admin-table">
            <tbody>
              <tr>
                <td>123456789</td>
                <td>한우대창불고기</td>
                <td>8</td>
                <td>12,900</td>
              </tr>
            </tbody>
            <tbody>
              <tr>
                <td>123456789</td>
                <td>한우대창불고기</td>
                <td>11</td>
                <td>12,900</td>
              </tr>
            </tbody>
            <tbody>
              <tr>
                <td>123456789</td>
                <td>한우대창불고기</td>
                <td>22</td>
                <td>12,900</td>
              </tr>
            </tbody>
            <tbody>
              <tr>
                <td>123456789</td>
                <td>한우대창불고기</td>
                <td>12</td>
                <td>12,900</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div>
          <UpdateScreen />
        </div>
      </div>
    </>
  );
}

export default AdminScreen;
