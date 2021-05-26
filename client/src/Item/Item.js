import React,{useEffect,useState} from 'react';
import styled from 'styled-components';

import axios from "axios";

  const Box=styled.div`
display:block;
width:1200px;
height:1800px;
margin:0 auto;
padding-top:30px;
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

const Text=styled.div`
  width:100%;
  font-family: 맑은고딕, Malgun Gothic, dotum, gulim, sans-serif;
  font-weight:bold;
  font-size:20px;
  height:50px;
  padding-top:50px;
`;

const Pagination=styled.div`

  width:400px;
  margin:0 auto;
`;

const PaginationBox=styled.button`
background:none;
  border:#ff7777 0.5px solid;
  color:#ff7777;
  margin-right:20px;
  width:40px;
  height:38px;
  padding-top:5px;
  text-align:center;
  font-size:20px;
  cursor:pointer;
`;

function Item(){
  
  const [Products, setProducts] = useState([]);
  const [page,setPage]=useState(1);
  
    useEffect(() => {
        axios.post('/api/product/products',{
          pageNumber:page,
        })
        .then(response => {
        if(response.data.success) {
            setProducts(response.data.productInfo)
        } else {
            console.log('상품정보가져오는데실패');
        }
        })
    }, []);

    
    const ChangePage=()=>{
      setPage();
    }

    return(
      <Box>
        <Text>전체보기</Text>
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
        <Pagination>
          <div style={{display:"inline-flex"}}>
          <PaginationBox>1</PaginationBox><PaginationBox>2</PaginationBox><PaginationBox>3</PaginationBox>
          </div>
        </Pagination>
      </Box>
    );
}

export default Item;