import React, {useState} from "react";
import styled from "styled-components";

const Bar=styled.div`
margin-top:10px;
margin-bottom:30px;
width:100%;
height:50px;
background-color:#E6E6E6;
`;

const Container=styled.div`
    display:flex;
    width:950px;
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
        },
        {
            id:2,
            category:'이벤트',
            active:false,
        },
        {
            id:3,
            category:'식단세트',
            active:false,
        },
        { 
            id:4,
            category:'식사대용',
            active:false, 
        }, 
        {
            id:5,
            category:'건강간식',
            active:false,
        }, 
        {
            id:6,
            category:'차/음료/두유',
            active:false,
        }, 
        {   
            id:7,
            category:'오일/소스/향신료',
            active:false,
        }
    ]);
    return(
        <Bar>
            <Container>
            {items.map((data)=><CategoryName>{data.category}</CategoryName>)}
            </Container>
        </Bar>
    );
}

export default Navbar;