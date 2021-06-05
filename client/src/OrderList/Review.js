import axios from "axios";
import React, { useState } from "react";

import ColorList from "../Stars/ColorList.json";
import Star from "../Stars/Star";

const createArray = (length) => Array.from({ length });

function Review(props) {
  const [category, setCategory] = useState("");
  const [Delivery, setDelivery] = useState("");
  const productId = props.match.params.productId;
  const [selectedTotalStars, setSelectedTotalStars] = useState(0);
  const [description, setDescription] = useState("");

  const totalStars = 5;

  const ChangeCategory = (e) => {
    setCategory(e.target.value);
  };

  const submitReview = () => {
    axios
      .post("/api/orderList/reviewRegister", {
        orderProductID: productId,
        productRecommand: category,
        shipRecommand: Delivery,
        starRating: selectedTotalStars,
        description: description,
      })
      .then((res) => {
        if (res.data.success) {
          alert("리뷰가 작성되었습니다.");
        } else {
          alert("리뷰를 작성할 수 없습니다.");
        }
      });
  };

  const changeDescription = (e) => {
    if (e.target.value.length <= 150) {
      setDescription(e.target.value);
    } else {
      alert("150자 미만으로 적어주세요");
      setDescription("");
    }
  };
  return (
    <div style={{ paddingBottom: "100px" }}>
      <div>
        <span>추천</span>
        <select
          style={{
            width: "100px",
            height: "30px",
            marginTop: "50px",
            marginRight: "10px",
          }}
          value={category}
          onChange={ChangeCategory}
        >
          <option value="적극추천">적극추천</option>
          <option value="추천">추천</option>
          <option value="비추천">비추천</option>
        </select>
      </div>
      <div>
        <span>배송평가</span>
        <select
          style={{
            width: "100px",
            height: "30px",
            marginTop: "50px",
            marginRight: "10px",
          }}
          value={Delivery}
          onChange={(e) => setDelivery(e.target.value)}
        >
          <option value="빠름">빠름</option>
          <option value="보통">보통</option>
          <option value="느림">느림</option>
        </select>
      </div>
      <div style={{ marginTop: "50px" }}>
        <span>총평</span>
        {createArray(totalStars).map((n, i) => (
          <Star
            key={i}
            selected={selectedTotalStars > i}
            onSelect={() => setSelectedTotalStars(i + 1)}
          />
        ))}
      </div>
      {console.log("ColorList :", ColorList)}
      <div style={{ paddingTop: "50px" }}></div>
      <span>상품평</span>
      <input
        type="text"
        onChange={changeDescription}
        value={description}
      ></input>
      <div style={{ paddingTop: "50px" }}></div>
      <button onClick={submitReview}>저장</button>
    </div>
  );
}

export default React.memo(Review);
