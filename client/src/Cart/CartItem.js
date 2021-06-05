import axios from "axios";
import React, { useEffect, useState } from "react";
import styled from "styled-components";

import "../AllCss.css";

const ItemImg = styled.img`
  width: 300px;
  height: 200px;
  padding: 20px 30px 20px 30px;
  border: #d8d8d8 0.5px solid;
  border-top: none;
`;

const ItemContainer = styled.div`
  display: inline-flex;
`;

const ItemName = styled.div`
  width: 290px;
  border: #d8d8d8 0.5px solid;
  padding: 100px 20px 0px 30px;
  border-top: none;
  border-left: none;
`;

const ItemNumber = styled.input`
  width: 50px;
  height: 23px;
`;

const Number = styled.div`
  display: flex;
  width: 150px;
  border: #d8d8d8 0.5px solid;
  border-top: none;
  border-left: none;
  padding: 100px 0px 0px 20px;
`;

const ItemPrice = styled.div`
  width: 100px;
  padding: 100px 30px 0px 85px;
  border-bottom: #d8d8d8 0.5px solid;
`;
const DeleteButton = styled.button`
  width: 35px;
  height: 35px;
  margin: 100px 30px 0px 30px;
  border-bottom: #d8d8d8 0.5px solid;
  color: gray;
  background-color: white;
  font-size: 30px;
  border: none;
  cursor: point;
`;
function CartItem({ Item }) {
  const [item, setItem] = useState({});
  const [quantity, setQuantity] = useState(Item.quantity);

  useEffect(() => {
    axios
      .get(`/api/product/products_by_id?id=${Item.id}&type=single`)
      .then((res) => {
        setItem(res.data[0]);
      })
      .catch((err) => alert(err));
  }, [Item]);
  useEffect(() => {
    axios
      .get(`/api/product/products_by_id?id=${Item.id}&type=single`)
      .then((res) => {
        setItem(res.data[0]);
      })
      .catch((err) => alert(err));
  }, [Item]);
  const onIncrease = () => {
    axios
      .post("/api/users/addToCart", {
        productId: Item.id,
        quantity: 1,
      })
      .then((res) => {
        if (res.data.success) {
          setQuantity((number) => number + 1);
        }
      });
  };

  const onDecrease = () => {
    if (quantity > 1) {
      axios
        .post("/api/users/addToCart", {
          productId: Item.id,
          quantity: -1,
        })
        .then((res) => {
          if (res.data.success) {
            setQuantity((number) => number - 1);
          }
        });
    }
  };

  const deleteHandler = () => {
    axios
      .post("/api/users/removeFromCart", {
        productId: Item.id,
      })
      .then((res) => {
        if (res.data.success) {
          alert("삭제");
        } else {
          alert("삭제 실패");
        }
      });
  };
  return (
    <ItemContainer>
      <div
        style={{
          padding: "100px 30px 0px 50px",
          borderBottom: "#D8D8D8 0.5px solid",
        }}
      >
        <input type="checkbox"></input>
      </div>
      {item.images && item.images.length > 0 && (
        <ItemImg
          src={`http://ec2-52-79-226-115.ap-northeast-2.compute.amazonaws.com:9000/uploads/${item.images[0]}`}
        ></ItemImg>
      )}
      <ItemName>{item.title}</ItemName>
      <Number>
        <ItemNumber placeholder={quantity}></ItemNumber>
        <button onClick={onIncrease} className="num" style={{ height: "30px" }}>
          +
        </button>
        <button onClick={onDecrease} className="num" style={{ height: "30px" }}>
          -
        </button>
      </Number>
      <ItemPrice>{item.price}</ItemPrice>
      <DeleteButton onClick={deleteHandler}>X</DeleteButton>
    </ItemContainer>
  );
}

export default CartItem;
