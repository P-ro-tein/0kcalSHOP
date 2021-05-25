import React, { useState, useEffect } from "react";
import styled from "styled-components";

import axios from 'axios';
import DeliveryModal from './DeliveryModal';
import CompleteModal from './CompleteModal';
import '../AllCss.css';

const DetailText=styled.div`
    width:100px;
    font-size:15px;
    font-weight:bold;
    padding:5px 10px 10px 5px;
`;

const ItemName=styled.div`
    font-weight:bold;
    font-size:23px;
    padding-bottom:10px;
`;
const Description=styled.div`
    color:grey;
    font-size:13px;
`;

const Price=styled.div`
    font-size:20px;
    font-weight:bold;
`;

const Number=styled.div`
width: 190px;
height:25px;
  margin-right: 20px;
  border-color: #ff7777;
  border-radius: 8px;
  text-align: center;
  font-size: 18px;
  border:2px solid #ff7777;
`;

const DescriptionBox=styled.div`
background-color:#ff7777;
width:500px;
height:40px;
color:white;
text-align:center;
padding-top:15px;
font-size:18px;
`;

const Container=styled.div`
    padding-top:25px;
    padding-bottom:10px;
    display:inline-flex;
`;
const Box=styled.div`
    width:1100px;
    margin:0 auto;
`;

const TopBox=styled.div`
    width:100%;
    display:inline-flex;
    padding-bottom:200px;
`;
const LeftContainer=styled.div`
    width:650px;
    height:400px;
`;

const RightContainer=styled.div`
    width:400px;
    height:355px;
    padding-top:45px;
`;

const DescriptionContainer=styled.div`
    height:100%;
    width:600px;
    margin:0 auto;
    padding-top:100px;
    padding-bottom:200px;
`;

const Destination=styled.div`
    width:190px;
    height:25px;
    margin-right:20px;
    border:2px solid #ff7777;
    border-radius:8px;
    text-align:right;
    font-size:18px;
    text-align-last: center;
    text-align: center;
    -ms-text-align-last: center;
    -moz-text-align-last: center;
    
`;

function ItemDetail(props){
    const [number,setNumber]=useState(0);
    const [DeliverymodalOpen,setDeliveryModalOpen]=useState(false);
    const [CompletemodalOpen,setCompletemodalOpen]=useState(false);
    const productId = props.match.params.productId

    const [Product, setProduct] = useState({});

    useEffect(() => {
        axios.get(`/api/product/products_by_id?id=${productId}&type=single`)
            .then(response => {
                setProduct(response.data[0])
            })
            .catch(err => alert(err))
    }, [productId]);


    const openDeliveryModal=()=>{
        setDeliveryModalOpen(true);
    }

    const closeDeliveryModal=()=>{
        setDeliveryModalOpen(false);
    }

    const openCompleteModal=()=>{
        setCompletemodalOpen(true);
    }
    
    const closeCompleteModal=()=>{
        setCompletemodalOpen(false);
    }

    const onIncrease=()=>{
        if(number===50){
            setNumber(50);
        }
        else{
            setNumber(prevNumber=>prevNumber+1);
        }
    }

    const onDecrease=()=>{
        if(number===0){
            setNumber(0);
        }
        else{
        setNumber(prevNumber=>prevNumber-1);
        }
    }
    return(
        <>
        <Box>
            <TopBox>
            <LeftContainer>
                <DetailText>
                    {Product.category}
                </DetailText>
                <img alt={Product._id} src={`http://localhost:9000/uploads/${Product.images}`} width="600" height="400"></img>
            </LeftContainer>
            <RightContainer>
                <ItemName>
                    {Product.title}
                </ItemName>
                <Description>
                    {Product.description}
                </Description>
                <hr></hr>
                <Container>
                <DetailText>
                    가격
                </DetailText>
                <Price style={{marginLeft:'200px'}}>
                    {Product.price}<span>원</span>
                </Price>
                </Container>
                <hr></hr>
                <Container>
                <DetailText>
                    수량
                </DetailText>
                <Number>{number}</Number>
                <button onClick={onIncrease} className="num">+</button>
                <button onClick={onDecrease} className="num">-</button>
                </Container>
                <Container>
                <DetailText>
                    배송지
                </DetailText>
                <Destination>집</Destination>
                <button onClick={openDeliveryModal} className="add">추가</button>
                </Container>
                <DeliveryModal open={DeliverymodalOpen} close={closeDeliveryModal} header="배송지">
                </DeliveryModal>
                <hr></hr>
                <button className="cart" onClick={openCompleteModal}>장바구니</button>
                <CompleteModal open={CompletemodalOpen} close={closeCompleteModal} header="완료"></CompleteModal>
                <button className="cart">바로구매</button>
            </RightContainer>
            </TopBox>
            <DescriptionBox>상품 설명</DescriptionBox>
            <hr></hr>
            <DescriptionContainer>
                <img alt="1" src="https://danoshop.net/mall/upload/2021/04/27/01_pro_danobar_2set_edit_x4WyBcv.png" width="500"></img>
                <img alt="2" src="https://danoshop.net/mall/upload/2021/04/23/02_pro_danobar_2set_gu8cS4C.png" width="500"></img>
                <img alt="3" src="https://danoshop.net/mall/upload/2021/04/23/03_pro_danobar_2set.png" width="500"></img>
            </DescriptionContainer> 
        </Box>
        </>
    );
}

export default ItemDetail;
