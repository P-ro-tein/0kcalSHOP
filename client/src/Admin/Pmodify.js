import './Basic.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Pmodify(props) {
    const productId = props.match.params.productId
    const [Product, setProduct] = useState({})

    useEffect(() => {
        axios.get(`/api/product/products_by_id?id=${productId}&type=single`)
            .then(response => {
                setProduct(response.data[0])
            })
            .catch(err => alert(err))
    }, [productId])

    const removeHandler=() => {
        const _id = productId;
        axios.post('/api/product/removeProduct', {_id})
            .then(response=>{
                if(response.success){
                    alert('상품 삭제 완료');
                } else{
                    alert(response.message);
                }
            })
    }

    return(
        <div className="Page">
            <span><b>상품 관리 &gt; 상품 수정</b></span>
            <hr/>
            <form action="/api/product/modiftProduct" method="POST" enctype="multipart/form-data">
            <table>
                <tr className="Ttitle">
                    <td colSpan="2">상품 수정</td>
                </tr>
                <tr>
                    <td className="Tname">상품명</td><td><input type="text" name="title" value={Product.title}/></td>
                </tr>
                <tr>
                    <td>카테고리명</td>
                    <td>
                        <select name="category" value={Product.category}>
                            <option>식단세트</option>
                            <option>식사대용</option>
                            <option>건강간식</option>
                        </select>
                    </td>
                </tr>
                <tr>
                    <td>가격</td>
                    <td><input type="number" name="price" value={Product.price}/></td>
                </tr>
                <tr>
                    <td>배송비</td>
                    <td><input type="number" name="shipCharge" value={Product.shipCharge}/></td>
                </tr>
                <tr>
                    <td>재고량</td>
                    <td><input type="number" name="remainStock" value={Product.remainStock}/></td>
                </tr>
                <tr>
                    <td>대표이미지</td><td><input type="file" name="images" accept="img/*" /></td>
                </tr>
                <tr>
                    <td>상품 상세설명</td><td><input type="file" name="images" accept="img/*" multiple/></td>
                </tr>
            </table><br/>
                <input type="submit" value="수정"/> &nbsp;
                <input type="button" value="삭제" onClick={removeHandler}/>
            </form> 
        </div>
    )
}

export default Pmodify;