import React from 'react'
import styled from 'styled-components';

const ItemDetail=styled.div`
display:block;
width:100%;
height:50px;
padding-top:10px;
font-size:15px;
`;

const BoxItem=styled.div`
float:left;
width:280px;
height:280px;
margin:10px;
margin-bottom:100px;
cursor:pointer;
`;

const ItemBox = ({data}) => {
    const imgUrl='../../../uploads/'+data.images;
    return (
        <BoxItem>
               <img src={imgUrl} alt={data._id} width="100%" height="280"/>
               <ItemDetail>{data.title}</ItemDetail>            
         </BoxItem>
    )
}

export default ItemBox
