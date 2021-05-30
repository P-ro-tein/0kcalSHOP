import React, { useEffect, useState } from "react";
import styled from "styled-components";

import axios from "axios";

const Box = styled.div`
  display: block;
  width: 1200px;
  height: 1800px;
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
  height: 40px;
  padding-top: 50px;
`;

const Pagination = styled.div`
  width: 400px;
  height: 100px;
  margin: 0 auto;
`;

const PaginationBox = styled.button`
  background: none;
  border: #ff7777 0.5px solid;
  color: #ff7777;
  margin-right: 20px;
  width: 40px;
  height: 38px;
  padding-top: 5px;
  text-align: center;
  font-size: 20px;
  cursor: pointer;
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

let pages = [];

function Item() {
  const [Products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [sort, setSort] = useState("이름");
  const [lowPrice, setlowPrice] = useState(0);
  const [highPrice, setHighPrice] = useState(1000000);
  const [category, setCategory] = useState("");

  useEffect(() => {
    console.log(category, "post전");
    console.log(lowPrice, highPrice);
    axios
      .post("/api/product/products", {
        pageNumber: page,
        category: category,
        sortBy: sort,
        order: "desc",
        filters: {
          price: [lowPrice, highPrice],
        },
      })
      .then((response) => {
        if (response.data.success) {
          setProducts(response.data.productInfo);
          console.log(category, "post then");
          console.log(response.data.productAllCount);

          pages = new Array(
            parseInt(response.data.productAllCount / 16, 10) + 1
          );
        } else {
          console.log("상품정보가져오는데실패");
        }
      });
  }, [category, page, sort, lowPrice, highPrice]);

  const ChangePage = () => {
    setPage();
  };

  const ChangeSort = (e) => {
    setSort(e.target.value);
  };
  const ChangeCategory = (e) => {
    setCategory(e.target.value);
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
        <Text>전체 상품</Text>
        <div>
          <select
            style={{
              width: "100px",
              height: "30px",
              marginTop: "50px",
              marginRight: "10px",
            }}
            value={category}
            onChange={ChangeCategory}
          >
            <option value="">전체상품</option>
            <option value="식단세트">식단세트</option>
            <option value="식사대용">식사대용</option>
            <option value="건강간식">건강간식</option>
          </select>
        </div>
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
      <div>
        <Pagination>
          <div style={{ display: "inline-flex" }}>
            {pages.map((item, index) => (
              <PaginationBox>{index + 1}</PaginationBox>
            ))}
          </div>
        </Pagination>
      </div>
    </Box>
  );
}

export default Item;
