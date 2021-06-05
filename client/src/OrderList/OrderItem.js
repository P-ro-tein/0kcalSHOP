import axios from "axios";
import React, { useEffect, useState } from "react";
import styled from "styled-components";

import "../AllCss.css";

const ItemImg=styled.img`
width:150px;
height:100 px;
padding:20px 30px 20px 30px;
border:#D8D8D8 0.5px solid;
border-top:none;
border-left: none;
`;

const ItemContainer = styled.div`
  display: inline-flex;
`;

const ItemName=styled.div`
    width:160px;
    border:#D8D8D8 0.5px solid;
    padding:60px 20px 0px 30px;
    border-top:none;
    border-left:none;
`;

const ItemNumber=styled.input`
    width:30px; 
    height:23px; 
`;

const Number=styled.div`
display:flex;
width:80px;
border:#D8D8D8 0.5px solid;
border-top:none;
border-left:none;
padding:60px 0px 0px 40px;
`;

const ItemPrice=styled.div`
    width: 50px;
    padding:60px 30px 0px 30px;
    border-bottom:#D8D8D8 0.5px solid;
    border-right:#D8D8D8 0.5px solid;
`;
const ItemShip=styled.div`
    width:35px;
    padding:60px 30px 0px 40px;
    border-right:#D8D8D8 0.5px solid;
    border-bottom:#D8D8D8 0.5px solid;
`;
const OrderState = styled.div`
    width: 70px;
    padding: 60px 30px 0px 40px;
    border:#D8D8D8 0.5px solid;
    border-left:none;
`;
const OrderDate=styled.div`
width:70px;

    padding: 60px 30px 0px 40px;
    border:#D8D8D8 0.5px solid;
    border-left:none;
`;

const OrderButton=styled.div`
width:80px;

    padding: 60px 30px 0px 40px;
    border:#D8D8D8 0.5px solid;
    border-left:none;
    border-right:none;
`;

function OrderItem({Item}){
    const date = `${new Date(Item.orderDate).getMonth()+1}월${new Date(Item.orderDate).getDate()}일`;
    const [item,setItem] = useState({});
    const [quantity,setQuantity]=useState(Item.orderProductCount);
    
    useEffect(() => {
        axios.get(`/api/product/products_by_id?id=${Item.orderProductID}&type=single`)
        .then(res=>{
                setItem(res.data[0]);
        })
        .catch(err => alert(err))
    },[Item])
    
    const changeState = () => {
        axios.post(`/api/orderList/changeOrderState`,{
            _id: Item._id,
            orderProductID: Item.orderProductID
        })
    }
    return(
        <ItemContainer>
            {
                item.images&&item.images.length>0 &&
                <ItemImg src={`http://ec2-52-79-226-115.ap-northeast-2.compute.amazonaws.com:9000/uploads/${item.images[0]}`}></ItemImg>
            }
            <ItemName>{item.title}</ItemName>
            <Number>
            {<ItemNumber placeholder={quantity} readOnly></ItemNumber>}
            </Number>
            <ItemPrice>{Item.orderProductPrice}</ItemPrice>
            <ItemShip>{Item.orderProductShipAddrName}</ItemShip>
            <OrderState>
                {Item.orderState===1?
                "결제완료":null}
                {Item.orderState===2?
                "배송중":null}
                {Item.orderState===3?
                "배송완료":null}
                {Item.orderState===4?
                "구매확정":null}
            </OrderState>
            <OrderDate>{date}</OrderDate>
            <OrderButton>
            {
                Item.orderState===1?
                <button>문의하기</button>:null
            }
            {
                Item.orderState===2?
                <button>문의하기</button>:null
            }
            {
                Item.orderState===3?
                <button>구매확정</button>:null
            }
            {
                Item.orderState===4?
                <button>상품평</button>:null
            }
            </OrderButton>
        </ItemContainer>
    );
}

export default OrderItem;
