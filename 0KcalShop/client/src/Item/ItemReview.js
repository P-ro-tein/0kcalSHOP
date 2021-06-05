import React, { useState } from "react";
import Star from "../Stars/Star";

const createArray = (length) => Array.from({ length });
function ItemReview({ totalStars = 5 }) {
  const [selectedStars, setSelectedStars] = useState(3);

  return (
    <>
      <div style={{ display: "flex" }}>
        {createArray(totalStars).map((n, i) => (
          <Star key={i} selected={selectedStars > i} onSelect={3} />
        ))}
        <div style={{ width: "200px" }}>"작성자"</div>
        <div style={{ width: "200px" }}>"작성날짜"</div>
        <div style={{ width: "500px" }}>"작성내용"</div>
      </div>
    </>
  );
}

export default ItemReview;
