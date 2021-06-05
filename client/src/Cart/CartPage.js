import React, { useState, useEffect } from "react";
import styled from "styled-components";

import CartItem from "./CartItem";
import "../AllCss.css";
import { Link } from "react-router-dom";
import axios from "axios";
const Box = styled.div`
  width: 1200px;
  margin: 0 auto;
  padding-top: 80px;
  padding-bottom: 80px;
`;

const Top = styled.div`
  width: 100%;
  padding-bottom: 30px;
  display: flex;
`;

const BigText = styled.div`
  font-size: 25px;
  font-weight: Bold;
  width: 900px;
`;

const SmallText = styled.div`
  font-size: 13px;
  padding-top: 5px;
`;

const Bar = styled.div`
  width: 100%;
  height: 30px;
  display: inline-flex;
  border-top: #ff7777 2px solid;
  border-bottom: #ff7777 2px double;
  padding-top: 10px;
`;

const BarText = styled.div`
  width: ${(props) => props.width};
  font-weight: bold;
  text-align: center;
`;

const PriceBox = styled.div`
  display: inline-flex;
  padding-top: 50px;
  padding-bottom: 50px;
  border-bottom: #d8d8d8 0.5px solid;
`;
const PriceText = styled.div`
  width: 400px;
  text-align: center;
`;

function CartPage() {
  const [Items, setItems] = useState([]);
  const [Total, setTotal] = useState(0);
  const [ShipCharge, setShipCharge] = useState(0);
  useEffect(() => {
    axios
      .get("/api/users/auth")
      .then((response) => {
        setItems(response.data.cart);
        let totalPrice = 0;
        let ship = 0;
        for (let i = 0; i < Items.length; i += 1) {
          totalPrice += Items[i].price * Items[i].quantity;
          ship = ship > Items[i].ship ? ship : Items[i].ship;
        }
        setTotal(totalPrice);
        setShipCharge(ship);
      })
      .catch((err) => alert(err));
  }, [Items]);

  return (
    <Box>
      <Top>
        <BigText>장바구니</BigText>
        <SmallText>
          <span style={{ fontWeight: "bold" }}>01 장바구니 &gt;</span> 02
          주문/결제 &gt; 03 주문완료
        </SmallText>
      </Top>
      <Bar>
        <div style={{ paddingLeft: "50px", paddingRight: "10px" }}>
          <input type="checkbox"></input>
        </div>
        <BarText width="400px">상품 이미지</BarText>
        <BarText width="310px">상품 이름</BarText>
        <BarText width="190px">수량</BarText>
        <BarText width="200px">주문 금액</BarText>
      </Bar>
      {Items.map((item) => {
        return <CartItem key={item.id} Item={item} />;
      })}
      <div style={{ height: "80px" }}></div>
      <Bar>
        <BarText width="400px">총 상품 금액</BarText>
        <BarText width="400px">배송비</BarText>
        <BarText width="400px">총 결제 금액</BarText>
      </Bar>
      <PriceBox>
        <PriceText>{Total}원</PriceText>
        <PriceText>{ShipCharge}원</PriceText>
        <PriceText>{Total + ShipCharge}원</PriceText>
      </PriceBox>
      <div style={{ paddingTop: "100px", width: "250px", margin: "0 auto" }}>
        <button
          style={{
            background: "none",
            width: "200px",
            height: "50px",
            border: "#ff7777 0.5px solid",
            color: "#ff7777",
          }}
        >
          결제하기
        </button>
      </div>
    </Box>
  );
}

export default CartPage;
