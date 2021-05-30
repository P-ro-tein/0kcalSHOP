import React, { useState } from "react";
import styled from "styled-components";
import Modal from './Modal';
import './AllCss.css';

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
    margin-top:100px;
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

const Destination=styled.select`
    width:195px;
    height:30px;
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

function ItemDetail(){
    const [number,setNumber]=useState(0);
    const [modalOpen,setModalOpen]=useState(false);

    const openModal=()=>{
        setModalOpen(true);
    }

    const closeModal=()=>{
        setModalOpen(false);
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
                    카테고리
                </DetailText>
                <img src="https://danoshop.net/mall/upload/2021/04/23/9doh53j1igx7pxyr83n6.png" width="600"></img>
            </LeftContainer>
            <RightContainer>
                <ItemName>
                    다노 프로틴 다노바 2종(베리/초코)
                </ItemName>
                <Description>
                장내 유익균 증식 도움을 주는 프락토올리고당이 함유된 다노바
                </Description>
                <hr></hr>
                <Container>
                <DetailText>
                    가격
                </DetailText>
                <Price style={{marginLeft:'200px'}}>
                    2400<span>원</span>
                </Price>
                </Container>
                <hr></hr>
                <Container>
                <DetailText>
                    수량
                </DetailText>
                <Number>{number}</Number>
                <button onClick={onIncrease} class="num">+</button>
                <button onClick={onDecrease} class="num">-</button>
                </Container>
                <Container>
                <DetailText>
                    배송지
                </DetailText>
                <Destination>
                    <option value="">집</option>
                    <option value="">배송지1</option>
                    <option value="">기숙사</option>
                </Destination>
                <button onClick={openModal} class="add">추가</button>
                </Container>
                <Modal open={modalOpen} close={closeModal} header="배송지">
                </Modal>
                <hr></hr>
                <button class="cart" style={{}}>장바구니</button>
                <button class="cart">바로구매</button>
            </RightContainer>
            </TopBox>
            <DescriptionBox>상품 설명</DescriptionBox>
            <hr></hr>
            <DescriptionContainer>
                <img src="https://danoshop.net/mall/upload/2021/04/27/01_pro_danobar_2set_edit_x4WyBcv.png" width="500"></img>
                <img src="https://danoshop.net/mall/upload/2021/04/23/02_pro_danobar_2set_gu8cS4C.png" width="500"></img>
                <img src="https://danoshop.net/mall/upload/2021/04/23/03_pro_danobar_2set.png" width="500"></img>
            </DescriptionContainer> 
        </Box>
        </>
    );
}

export default ItemDetail;
