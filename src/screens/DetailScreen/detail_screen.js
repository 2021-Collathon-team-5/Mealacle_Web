import React, { useState, useEffect } from "react";
function DetailScreen() {
  const [foodId, setFoodId] = useState("");

  useEffect(() => {
    setFoodId(window.location.pathname.split("/")[2]);
  }, [foodId]);

  return (
    <div>
      DetailDetail
      <button
        onClick={() => {
          console.log(foodId);
        }}
      >
        hahaha{foodId}
      </button>
    </div>
  );
}

export default DetailScreen;
