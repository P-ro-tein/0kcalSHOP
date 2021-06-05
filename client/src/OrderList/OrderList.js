import axios from "axios";
import styled from "styled-components";
import React, { useState, useEffect } from "react";
import OrderItem from "./OrderItem";

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
const OrderList = () => {
    const [Orders, setOrders] = useState([]);
    const [Period, setPeriod] = useState("today");
    const [Total, setTotal]=useState(0);
    const getOrder=()=>{
        console.log(Period);
        axios.post('/api/orderList/list',{
            periodCriterion: Period
        })
        .then(res=>{
            console.log(res.data);
            if(res.data.success){
                setOrders(res.data.orderListInfo);
                let totalPrice = 0;
                for(let i=0;i<Orders.length;i+=1){
                  totalPrice+=Orders[i].orderProductPrice*Orders[i].orderProductCount;
              }
              setTotal(totalPrice);
            } else{
                alert('주문내역조회실패');
            }
        })
    }
    useEffect(()=>{
        getOrder();
    },[Period, Orders])
    const periodHandler = (e) => {
        setPeriod(e.target.value);
    }
    return (
            <Box>
      <Top>
        <BigText>주문내역</BigText>
        <select name="period" value={Period} onChange={periodHandler}>
          <option value="today">오늘</option>
          <option value="week">일주일</option>
          <option value="month">1개월</option>
          <option value="year">1년</option>
        </select>
      </Top>
      <Bar>
        <BarText width="220px">상품 이미지</BarText>
        <BarText width="180px">상품 이름</BarText>
        <BarText width="165px">수량</BarText>
        <BarText width="70px">주문 금액</BarText>
        <BarText width="140px">배송지</BarText>
        <BarText width="110px">주문상태</BarText>
        <BarText width="160px">주문날짜</BarText>
      </Bar>
      {Orders.map((item) => {
        return <OrderItem key={item.id} Item={item} />;
      })}
      <div style={{ height: "80px" }}></div>
      <Bar>
                <BarText width="400px">총 상품 금액</BarText>
            </Bar>
            <PriceBox>
                <PriceText>{Total}원</PriceText>
            </PriceBox>
      <div style={{ paddingTop: "100px", width: "250px", margin: "0 auto" }}>
      </div>
    </Box>
  );
};

export default OrderList;
