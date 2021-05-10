import React,{useEffect} from 'react';
import styled from 'styled-components';
import {Link} from 'react-router-dom';

import {getItem,useSEDispatch,useSEState} from "../Context/Context";

  const Box=styled.div`
display:block;
width:1200px;
height:1200px;
margin:0 auto;
`;

const BoxItem=styled.div`
float:left;
width:280px;
height:280px;
margin:10px;
margin-bottom:100px;
cursor:pointer;
`;

const ItemDetail=styled.div`
display:block;
width:100%;
height:50px;
padding-top:10px;
font-size:15px;
`;

function Item(){
  const state = useSEState();
  const dispatch = useSEDispatch();
  const { data: item, loading, error } = state.item;

  useEffect(() => {
    getItem(dispatch);
  }, [dispatch]);

  if (loading) return <div></div>;
  if (error) return <div>에러가 발생했습니다.</div>;
  if (!item) return null;

    return(
      <Box>
        {item.map((data)=>{
          return(
            <>
            <Link to="./ItemDetail">
            <BoxItem>
               <img src={data.images} alt={data._id} width="100%" height="280"/>
               <ItemDetail>{data.title}</ItemDetail>            
            </BoxItem>
            </Link>
            </>
          ); 
      })}
      </Box>
    );
}

export default Item;