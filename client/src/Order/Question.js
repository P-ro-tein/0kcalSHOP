import React, { useState } from "react";
import axios from "axios";

function Question() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const onSubmit = () => {
    axios
      //productid + 결제내역고유id + 제목 + 내용
      .post("/api/question", {
        questionProductId: null,
        orderListProductId: null,
        questionTitle: title,
        questionDescription: content,
      });
  };

  return (
    <>
      <div>List</div>
      <div>
        <span>제목</span>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        ></input>
      </div>
      <div>
        <span>내용</span>
        <input
          type="text"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        ></input>
      </div>
      <button onClick={onSubmit}>등록</button>
    </>
  );
}

export default Question;
