import React, {useState} from "react";
import styled from "styled-components";
import Item from "../Item/Item";
import {Link} from 'react-router-dom';


const Bar=styled.div`
margin-top:10px;
width:100%;
height:50px;
background-color:#E6E6E6;
`;

const Container=styled.div`
    display:flex;
    width:750px;
    margin:0 auto;
    padding-top:13px;
`

const CategoryName=styled.button`
    margin-right:40px;
    font-size:17px; 
    cursor:pointer;
    border:none;
    background-color:#E6E6E6;
`

function Navbar(){
    const [items, setItems] = useState([
        {
            id:1,
            category:'공지사항',
            active:false,
            page:Item,
        },
        {
            id:2,
            category:'이벤트',
            active:false,
            page:Item,
        },
        {
            id:3,
            category:'식단세트',
            active:false,
            page:Item,
        },
        { 
            id:4,
            category:'식사대용',
            active:false, 
            page:Item
        }, 
        {
            id:5,
            category:'건강간식',
            active:false,
            page:Item
        }, 
        {
            id:6,
            category:'전체상품',
            active:false,
            page:Item
        }, 
    ]);
    return(
        <Bar>
            <Container>
            <Link to='/Notice'>
            <CategoryName>공지사항/이벤트</CategoryName>
            </Link>
            <Link to='/식단세트'>
            <CategoryName>식단세트</CategoryName>
            </Link>
            <Link to ='/식사대용'>
            <CategoryName>식사대용</CategoryName>
            </Link>
            <Link to='/건강간식'>
            <CategoryName>건강간식</CategoryName>
            </Link>
            <Link to='Item'>
            <CategoryName>전체상품</CategoryName>
            </Link>
            </Container>
        </Bar>
    );
}

export default Navbar;