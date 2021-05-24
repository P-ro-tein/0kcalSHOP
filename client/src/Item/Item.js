import React,{useEffect,useState} from 'react';
import styled from 'styled-components';
import {Link} from 'react-router-dom';
import axios from 'axios';

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

  async function getItem(){
    const response=await axios.get(
        "/api/product/products"
    );
    return response.data.productInfo;
  }

  // if (loading) return <div></div>;
  // if (error) return <div>에러가 발생했습니다.</div>;
  // if (!item) return null;

  const productInfo = getItem();
  console.log(productInfo);

    return(
      <Box>
        {Products.map((product) => {
          return (
            <Link to="/ItemDetail:id">
              <BoxItem>
                <img src={`http://localhost:9000/uploads/${product.images[0]}`} alt={product.title} width="100%" height="280px"/>
                <ItemDetail>{product.title}</ItemDetail>
              </BoxItem>
            </Link>
          );
        })}
      </Box>
    );
}

export default Item;