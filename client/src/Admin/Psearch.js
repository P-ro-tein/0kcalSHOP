import './Basic.css';
import React, { useState, useEffect } from 'react';
import { useGlobalState } from "../GlobalContext";
import styled from 'styled-components';
import axios from 'axios';

import SearchProduct from './SearchProduct';
//styled
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


export default function Psearch() {
    const [Products, setProducts] = useState([])
    const [sort, setSort] = useState("이름");
    const [category, setCategory] = useState("");
    const [lowPrice, setlowPrice] = useState(0);
    const [highPrice, setHighPrice] = useState(1000000);
  
    const state = useGlobalState();
    const Active = state.search;

    useEffect(() => {
        axios
        .post("/api/product/products", {
            searchTerm: Active,
            sortBy: sort,
            order: "desc",
            category: category,
            filters: {
            price: [lowPrice, highPrice],
        },
      })
      .then((response) => {
        if (response.data.success) {
          setProducts(response.data.productInfo);
        } else {
          console.log("상품정보가져오는데실패");
        }
      });
    }, [Active, sort, category, lowPrice, highPrice]);

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

    return(
        <div className="Page">
            <span><b>상품 관리 &gt; 상품 조회</b></span>
            <hr/>
            <table>
                <tbody>
                <tr className="Ttitle"><td colSpan="2">상품 검색</td></tr>
                <tr>
                    <td className="Tname">상품 분류</td>
                    <td>
                        <select value={category} onChange={ChangeCategory}>
                            <option selected disabeld hidden>카테고리 선택</option>
                            <option value="식단세트">식단세트</option>
                            <option value="식사대용">식사대용</option>
                            <option value="건강간식">건강간식</option>
                        </select>
                    </td>
                </tr>
                <tr>
                    <td>가격대</td>
                    <td><input type="number" onChange={setlowestPrice} value={lowPrice}/> ~ <input type="number" onChange={setHighestPrice}
          value={highPrice}/></td>
                </tr>
                <tr>
                    <td>나열 조건</td>
                    <td>
                        <select value={sort} onChange={ChangeSort}>
                            <option selected disabeld hidden>조건 선택</option>
                            <option value="title">이름순</option>
                            <option value="price">가격순</option>
                            <option value="createdAt">최신순</option>
                        </select>
                    </td>
                </tr>
                </tbody>
            </table>
            <SearchProduct/>
            <span>검색어 : {Active}</span>
            <br/>
            


            {Products.map((product) => {
        return (
          <a href={`/admin/product/${product._id}`}>
            <BoxItem>
              <img
                key={product._id}
                src={`/uploads/${product.images[0]}`}
                alt={product.title}
                width="100%"
                height="280px"
              />
              <ItemDetail>{product.title}</ItemDetail>
            </BoxItem>
          </a>
        );
      })}
        </div>
    )
}