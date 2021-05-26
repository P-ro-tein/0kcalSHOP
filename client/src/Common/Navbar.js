import React from "react";
import styled from "styled-components";
import {Link} from 'react-router-dom';


const Bar=styled.div`
margin-top:10px;
width:100%;
height:50px;
background-color:#f9f9f9;
`;

const Container=styled.div`
    display:flex;
    width:800px;
    margin:0 auto;
    padding-top:13px;
`

const CategoryName=styled.button`
    font-size:17px; 
    cursor:pointer;
    border:none;
    background-color:#f9f9f9;
    font-family: 'Noto Sans KR', sans-serif;
`

function Navbar(){
    return(
        <Bar>
            <link rel="preconnect" href="https://fonts.gstatic.com"></link>
            <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@500&display=swap" rel="stylesheet"></link>
            <Container>
            <Link to='/Notice'>
            <CategoryName>공지사항/이벤트</CategoryName>
            </Link>
            <div style={{width:"70px"}} />
            <Link to='/식단세트'>
            <CategoryName>식단세트</CategoryName>
            </Link>
            <div style={{width:"70px"}} />
            <Link to ='/식사대용'>
            <CategoryName>식사대용</CategoryName>
            </Link>
            <div style={{width:"70px"}} />
            <Link to='/건강간식'>
            <CategoryName>건강간식</CategoryName>
            </Link>
            <div style={{width:"70px"}} />
            <Link to='/client/Item'>
            <CategoryName>전체상품</CategoryName>
            </Link>
            <div style={{width:"70px"}} />
            </Container>
        </Bar>
    );
}

export default Navbar;