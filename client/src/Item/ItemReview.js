import React, { useState } from "react";
import Star from "../Stars/Star";

const createArray = (length) => Array.from({ length });
function ItemReview({ product }) {
  const totalStars = 5;
  const [selectedStars, setSelectedStars] = useState(product.starRating);

  const getFormatDate = (date) => {
    const year = date.getFullYear();
    let month = 1 + date.getMonth();
    month = month >= 10 ? month : "0" + month;
    let day = date.getDate();
    day = day >= 10 ? day : "0" + day;
    return year + "-" + month + "-" + day;
  };

  return (
    <>
      <div style={{ display: "flex" }}>
        {createArray(totalStars).map((n, i) => (
          <Star key={i} selected={selectedStars > i} onSelect={selectedStars} />
        ))}
        <div style={{ width: "200px" }}>
          {product.userID.replace(/(?<=.{1})./gi, "*")}
        </div>
        <div style={{ width: "200px" }}>
          {getFormatDate(new Date(product.createdDate))}
        </div>
        <div style={{ width: "500px" }}>{product.description}</div>
      </div>
    </>
  );
}

export default ItemReview;
