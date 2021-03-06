import React, { useEffect, useState } from "react";
import styled from "styled-components";

import axios from "axios";

const Box = styled.div`
  display: block;
  width: 1200px;
  height: 1600px;
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

const Text = styled.div`
  width: 100%;
  font-family: 맑은고딕, Malgun Gothic, dotum, gulim, sans-serif;
  font-weight: bold;
  font-size: 20px;
  height: 50px;
  padding-top: 50px;
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

const PriceFilter = styled.input`
  width: 100px;
  height: 20px;
  margin-right: 10px;
  margin-left: 10px;
  border: #d8d8d8 0.5px solid;
  text-align: right;
`;

function Item() {
  const [sort, setSort] = useState("이름");
  const [Products, setProducts] = useState([]);
  const [lowPrice, setlowPrice] = useState(0);
  const [highPrice, setHighPrice] = useState(1000000);

  useEffect(() => {
    axios
      .post("/api/product/products", {
        category: "식단세트",
        pageNumber: 1,
        sortBy: sort,
        order: "desc",
        filters: {
          price: [lowPrice, highPrice],
        },
      })
      .then((response) => {
        if (response.data.success) {
          console.log(response.data);
          setProducts(response.data.productInfo);
        } else {
          console.log("상품정보가져오는데실패");
        }
      });
  }, [sort, lowPrice, highPrice]);

  const ChangeSort = (e) => {
    setSort(e.target.value);
    console.log(sort);
  };
  const setlowestPrice = (e) => {
    setlowPrice(e.target.value);
  };

  const setHighestPrice = (e) => {
    setHighPrice(e.target.value);
  };

  return (
    <Box>
      <div style={{ width: "287px", margin: "0 0 0 auto" }}>
        <span style={{ fontSize: "12px" }}>가격</span>
        <PriceFilter
          placeholder="0"
          onChange={setlowestPrice}
          value={lowPrice}
        ></PriceFilter>
        ~
        <PriceFilter
          placeholder="100000"
          onChange={setHighestPrice}
          value={highPrice}
        ></PriceFilter>
      </div>
      <div style={{ display: "flex" }}>
        <Text>식단세트</Text>
        <div>
          <select
            style={{
              width: "100px",
              height: "30px",
              marginTop: "50px",
              marginRight: "10px",
            }}
            value={sort}
            onChange={ChangeSort}
          >
            <option value="title">이름순</option>
            <option value="price">가격순</option>
            <option value="createdAt">최신상품순</option>
          </select>
        </div>
      </div>
      {Products.map((product) => {
        return (
          <a href={`/client/ItemDetail/${product._id}`}>
            <BoxItem>
              <img
                key={product._id}
                src={`/uploads/${product.images[0]}`}
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

export default Item;
