import React, {useState,useEffect} from "react";
import styled from 'styled-components';

import CartItem from "./CartItem";
import '../AllCss.css';
import {Link} from 'react-router-dom';

const Box=styled.div`
    width:1200px;
    margin:0 auto;
    padding-top:80px;
    padding-bottom:80px;
`;

const Top=styled.div`
    width:100%;
    padding-bottom:30px;
    display:flex;
`;

const BigText=styled.div`
    font-size:25px;
    font-weight:Bold;
    width:900px;
`;

const SmallText=styled.div`
    font-size:13px;
    padding-top:5px;
`;

const Bar=styled.div`
    width:100%;
    height:30px;
    display:inline-flex;
    border-top:#ff7777 2px solid;
    border-bottom:#ff7777 2px double;
    padding-top:10px;
`;

const BarText=styled.div`
    width:${props=>props.width};
    font-weight:bold;
    text-align:center;
`;

const PriceBox=styled.div`
    display:inline-flex;
    padding-top:50px;
    padding-bottom:50px;
    border-bottom:#D8D8D8 0.5px solid;
`;
const PriceText=styled.div`
    width:400px;
    text-align:center;
`;

function CartPage(){
    const Item=[
        {
            imgUrl:'https://danoshop.net/mall/upload/2020/03/11/dumpling_716x478.jpg',
            name:'다노 닭가슴살 곤약만두 3종 (오리지널/청양고추/불닭) 10팩',
            quantity:2,
            price:26900
        },
        {
            imgUrl:'https://danoshop.net/mall/upload/2020/07/27/%E1%84%91%E1%85%B3%E1%84%85%E1%85%A9%E1%84%90%E1%85%B5%E1%86%AB%E1%84%87%E1%85%B3%E1%84%85%E1%85%A1%E1%84%89%E1%85%A9%E1%86%AF%E1%84%92%E1%85%A9%E1%84%87%E1%85%A5.png',
            name:'다노 브라운라이스소울 프로틴베리&프로틴초코',
            quantity:10,
            price:2300
        },
        {
            imgUrl:'https://danoshop.net/mall/upload/2020/07/20/hover_oe.png',
            name:'스키니피그 저칼로리 아이스크림',
            quantity:2,
            price:29900
        },
    ];

    let i=0;
    let Total=0;

    for(i;i<Item.length;i++){
        Total+=Item[0].quantity*Item[0].price
    }

    return(
        <Box>
            <Top>
                <BigText>장바구니</BigText>
                <SmallText><span style={{fontWeight:"bold"}}>01 장바구니 &gt;</span > 02 주문/결제 &gt; 03 주문완료</SmallText>
            </Top>
            <Bar>
                <div style={{paddingLeft:'50px',paddingRight:'10px'}}>
                <input type="checkbox"></input>
                </div>
                <BarText width="400px">상품 이미지</BarText>
                <BarText width="310px">상품 이름</BarText>
                <BarText width="190px">수량</BarText>
                <BarText width="200px">주문 금액</BarText>
            </Bar>
            {Item.map((item)=>{
                return(
                    <CartItem Item={item} />
                )
            })}
            <div style={{height:'80px'}}></div>
            <Bar>
                <BarText width="400px">총 상품 금액</BarText>
                <BarText width="400px">배송비</BarText>
                <BarText width="400px">총 결제 금액</BarText>
            </Bar>
            <PriceBox>
                <PriceText>{Total}원</PriceText>
                <PriceText>0원</PriceText>
                <PriceText>0원</PriceText>
            </PriceBox>
        </Box>
    )
}

export default CartPage;