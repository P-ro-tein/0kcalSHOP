import React from "react";
import styled from 'styled-components';

import '../AllCss.css';

const Bar=styled.div`
width:100%;
background:#
`; 

const ItemImg=styled.img`
width:300px;
height:180px;
`;

const ItemContainer=styled.div`
display:flex;

`;

const ItemName=styled.div`
`;

const ItemNumber=styled.div`

`;

const Number=styled.div`
display:flex;
`;

const ItemPrice=styled.div`

`;
function CartItem(){
    const Item=[
        {
            imgUrl:'https://danoshop.net/mall/upload/2020/03/11/dumpling_716x478.jpg',
            name:'다노 닭가슴살 곤약만두 3종 (오리지널/청양고추/불닭) 10팩',
            quantity:'2',
            price:'26900'
        },
        {
            imgUrl:'https://danoshop.net/mall/upload/2020/07/27/%E1%84%91%E1%85%B3%E1%84%85%E1%85%A9%E1%84%90%E1%85%B5%E1%86%AB%E1%84%87%E1%85%B3%E1%84%85%E1%85%A1%E1%84%89%E1%85%A9%E1%86%AF%E1%84%92%E1%85%A9%E1%84%87%E1%85%A5.png',
            name:'다노 브라운라이스소울 프로틴베리&프로틴초코',
            quantity:'10',
            price:'2,300'
        },
        {
            imgUrl:'https://danoshop.net/mall/upload/2020/07/20/hover_oe.png',
            name:'스키니피그 저칼로리 아이스크림',
            quantity:'2',
            price:'29,900'
        },
    ];

    const onIncrease=()=>{
        
    };

    const onDecrease=()=>{

    };
    
    return(
        <ItemContainer>
            <ItemImg src={Item.imgUrl}></ItemImg>
            <ItemName>{Item.name}</ItemName>
            <Number>
            <ItemNumber>{Item.number}</ItemNumber>
                <button onClick={onIncrease} class="num">+</button>
                <button onClick={onDecrease} class="num">-</button> 
            </Number>
            <ItemPrice>{Item.price}</ItemPrice>
        </ItemContainer>
    );
}

export default CartItem;