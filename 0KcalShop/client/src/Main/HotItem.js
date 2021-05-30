import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
const Box = styled.div`
  width: 1200px;
  height: 1800px;
  display: block;
  margin: 0 auto;
  padding-top: 30px;
`;

const BoxItem = styled.div`
  float: left;
  width: 280px;
  height: 280px;
  margin: 10px;
  margin-bottom: 100px;
  cursor: pointer;
`;
const ItemDetail = styled.div`
  font-family: 맑은고딕, Malgun Gothic, dotum, gulim, sans-serif;
  display: block;
  width: 100%;
  padding-top: 10px;
  font-size: 14px;
  margin-bottom: 3px;
`;
const Title = styled.div`
  font-family: 맑은고딕, Malgun Gothic, dotum, gulim, sans-serif;
  font-weight: bold;
  font-size: 20px;
  margin: 10px;
  margin-top: 30px;
`;
const ItemPrice = styled.span`
  font-family: 맑은고딕, Malgun Gothic, dotum, gulim, sans-serif;
  font-weight: bold;
  font-size: 20px;
`;
const Won = styled.span`
  font-family: 맑은고딕, Malgun Gothic, dotum, gulim, sans-serif;
  font-weight: bold;
  font-size: 15px;
`;
function HotItem() {
  const [HotProducts, setHotProducts] = useState([]);

  useEffect(() => {
    axios
      .post("/api/product/products", {
        sortBy: "sold",
        order: "desc",
      })
      .then((response) => {
        if (response.data.success) {
          setHotProducts(response.data.productInfo);
        } else {
          console.log("상품정보가져오는데실패");
        }
      });
  }, []);
  return (
    <Box>
      <Title>인기상품</Title>
      {HotProducts.map((product) => {
        return (
          <a href={`/client/ItemDetail/${product._id}`}>
            <BoxItem>
              <img
                key={product._id}
                src={`http://ec2-52-79-226-115.ap-northeast-2.compute.amazonaws.com:9000/uploads/${product.images[0]}`}
                alt={product.title}
                width="100%"
                height="280px"
              />
              <ItemDetail>{product.title}</ItemDetail>
              <ItemPrice>
                {product.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
              </ItemPrice>
              <Won>원</Won>
            </BoxItem>
          </a>
        );
      })}
    </Box>
  );
}

export default HotItem;
