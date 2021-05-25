import React,{useEffect,useState} from 'react';
import styled from 'styled-components';

import axios from "axios";

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
  
  const [Products, setProducts] = useState([])
  
    useEffect(() => {
        axios.post('/api/product/products')
        .then(response => {
        if(response.data.success) {
            setProducts(response.data.productInfo)
        } else {
            console.log('상품정보가져오는데실패');
        }
        })
    }, []);

    return(
      <Box>
        {Products.map((product) => {
          return (
            <a href={`/client/ItemDetail/${product._id}`}>
              <BoxItem>
                <img key={product._id} src={`http://localhost:9000/uploads/${product.images[0]}`} alt={product.title} width="100%" height="280px"/>
                <ItemDetail>{product.title}</ItemDetail>
              </BoxItem>
            </a>
          );
        })}
      </Box>
    );
}

export default Item;