import React,{useEffect,useState} from "react";
import styled from 'styled-components';

import '../AllCss.css';

const ItemImg=styled.img`
width:300px;
height:200px;
padding:20px 30px 20px 30px;
border:#D8D8D8 0.5px solid;
border-top:none;
`;

const ItemContainer=styled.div`
display:inline-flex;

`;

const ItemName=styled.div`
    width:290px;
    border:#D8D8D8 0.5px solid;
    padding:100px 20px 0px 30px;
    border-top:none;
    border-left:none;
`;

const ItemNumber=styled.input`
    width:50px; 
    height:23px; 
`;

const Number=styled.div`
display:flex;
width:150px;
border:#D8D8D8 0.5px solid;
border-top:none;
border-left:none;
padding:100px 0px 0px 20px;
`;

const ItemPrice=styled.div`
    width:100px;
    padding:100px 30px 0px 85px;
    border-bottom:#D8D8D8 0.5px solid;
`;
const DeleteButton=styled.button`
width:35px;
height:35px;
margin:100px 30px 0px 30px;
border-bottom:#D8D8D8 0.5px solid;
color: gray;
background-color: white;
font-size: 30px;
border: none;
cursor: point;
`;
function CartItem({Item}){

    const [quantity,setQuantity]=useState(Item.quantity);
    

    const onIncrease=()=>{
        setQuantity(number=>number+1);
    };

    const onDecrease=()=>{
        setQuantity(number=>number-1);
    };
    
    const deleteHandler = () => {
        axios.post('/api/users/removeFromCart',{
            productId: Item.id,
        })
        .then(res => {
            if(res.data.success){
                alert('삭제');
            } else {
                alert('삭제 실패');
            }
        })
    }
    return(
        <ItemContainer>
            <div style={{padding:'100px 30px 0px 50px',borderBottom:'#D8D8D8 0.5px solid'}}>
            <input type="checkbox"></input>
            </div>
            <ItemImg src={Item.imgUrl}></ItemImg>
            <ItemName>{Item.name}</ItemName>
            <Number>
            <ItemNumber placeholder={quantity}></ItemNumber>
                <button onClick={onIncrease} className="num" style={{height:'30px'}}>+</button>
                <button onClick={onDecrease} className="num" style={{height:'30px'}}>-</button> 
            </Number>
            <ItemPrice>{item.price}</ItemPrice>
            <DeleteButton onClick={deleteHandler}>X</DeleteButton>
        </ItemContainer>
    );
}

export default CartItem;