import React,{useEffect} from 'react';
import styled from 'styled-components';
import {Link} from 'react-router-dom';

import {getItem,useSEDispatch,useSEState} from "../Context/Context";
import ItemBox from './ItemBox';

  const Box=styled.div`
display:block;
width:1200px;
height:1200px;
margin:0 auto;
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
              <ItemBox data={data}></ItemBox>
            </Link>
            </>
          ); 
      })}
      </Box>
    );
}

export default Item;