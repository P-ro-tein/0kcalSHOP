import './Basic.css';
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
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
        <div className="Page">
            <span><b>상품 관리 &gt; 상품 조회</b></span>
            <hr/>
            <table>
                <tr className="Ttitle"><td colSpan="2">상품 검색</td></tr>
                <tr>
                    <td className="Tname">상품 분류</td>
                    <td>
                        <select name="dnpmescription">
                            <option>카테고리 선택</option>
                            <option>식단세트</option>
                            <option>식사대용</option>
                            <option>건강간식</option>
                        </select>
                    </td>
                </tr>
                <tr>
                    <td>상품 상태</td>
                    <td>
                        <select name="state">
                            <option>상태 선택</option>
                            <option>판매 가능</option>
                            <option>판매 완료</option>
                            <option>상품 준비중</option>
                        </select>
                    </td>
                </tr>
                <tr>
                    <td>가격대</td>
                    <td><input type="number" />~<input type="number"/></td>
                </tr>
                <tr>
                    <td>나열 조건</td>
                    <td>
                        <select name="state">
                            <option>조건 선택</option>
                            <option>인기순</option>
                            <option>높은 가격순</option>
                            <option>낮은 가격순</option>
                            <option>등록일순</option>
                            <option>리뷰 많은순</option>
                        </select>
                    </td>
                </tr>
                <tr>
                    <td>검색</td>
                    <td>
                        <input type="text" value=""/>&nbsp;<input type="submit" value="검색"/>
                    </td>
                </tr>
            </table>
            
            <br/>

            {Products.map((product) => {
          return (
            <a href={`/admin/product/${product._id}`}>
              <BoxItem>
                <img key={product._id} src={`http://localhost:9000/uploads/${product.images[0]}`} alt={product.title} width="100%" height="280px"/>
                <ItemDetail>{product.title}</ItemDetail>
              </BoxItem>
            </a>
          );
        })}
        </div>
    )
}