import './Basic.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Pmodify(props) {
    const productId = props.match.params.productId
    const [title, setTitle] = useState({});
    const [category, setCategory] = useState({});
    const [price, setPrice] = useState({});
    const [shipCharge, setShipCharge] = useState({});
    const [remainStock, setRemainStock] = useState({});
    const [description, setDescription] = useState({});

    useEffect(() => {
        axios.get(`/api/product/products_by_id?id=${productId}&type=single`)
            .then(response => {
                setTitle(response.data[0].title);
                setPrice(response.data[0].price);
                setCategory(response.data[0].category);
                setShipCharge(response.data[0].shipCharge);
                setRemainStock(response.data[0].remainStock);
                setDescription(response.data[0].description);
            })
            .catch(err => alert(err))
    }, [productId])

    const titleChangeHandler=(e)=>{
        setTitle(e.target.value);
    }
    const priceChangeHandler=(e)=>{
        setPrice(e.target.value);
    }
    const categoryChangeHandler=(e)=>{
        setCategory(e.target.value);
    }
    const shipChargeChangeHandler=(e)=>{
        setShipCharge(e.target.value);
    }
    const remainStockChangeHandler=(e)=>{
        setRemainStock(e.target.value);
    }
    const descriptionChangeHandler=(e)=>{
        setDescription(e.target.value);
    }

    const removeHandler=() => {
        const _id = productId;

        if(window.confirm('삭제 하시겠습니까?')){
            axios.post('/api/product/removeProduct', {_id})

            alert('삭제 되었습니다')
            return window.location.href='/admin/psearch'
        }
    }

    const submitHandler =() => {
        const data = {
            _id: productId,
            title: title,
            category: category,
            shipCharge: shipCharge,
            remainStock: remainStock,
            description: description,
            price:price
        }
        axios.post('/api/product/modifyProduct', 
        {   
          data
        }).then(response => {
            if(response.data.success){
                alert('수정 완료');
            } else { 
                alert('수정 실패');
            }
        });
    }

    return(
        <div className="Page">
            <span><b>상품 관리 &gt; 상품 수정</b></span>
            <hr/>
            <form action="/api/product/modifyProduct" method="POST">
            <table>
                <tbody>
                <tr className="Ttitle">
                    <td colSpan="2">상품 수정</td>
                </tr>
                <tr>
                    <td className="Tname">상품명</td><td><input type="text" name="title" value={title} onChange={titleChangeHandler}/></td>
                </tr>
                <tr>
                    <td>카테고리명</td>
                    <td>
                        <select name="category" value={category} onChange={categoryChangeHandler}>
                            <option>식단세트</option>
                            <option>식사대용</option>
                            <option>건강간식</option>
                        </select>
                    </td>
                </tr>
                <tr>
                    <td>가격</td>
                    <td><input type="number" name="price" value={price} onChange={priceChangeHandler}/></td>
                </tr>
                <tr>
                    <td>배송비</td>
                    <td><input type="number" name="shipCharge" value={shipCharge} onChange={shipChargeChangeHandler}/></td>
                </tr>
                <tr>
                    <td>재고량</td>
                    <td><input type="number" name="remainStock" value={remainStock} onChange={remainStockChangeHandler} /></td>
                </tr>
                <tr>
                    <td>상품 소개</td>
                    <td><input type="text" name="description" name="description" value={description} onChange={descriptionChangeHandler} /></td>
                </tr>
                <tr>
                    <td>대표이미지</td><td><input type="file" name="images" accept="img/*" /></td>
                </tr>
                <tr>
                    <td>상품 상세설명</td><td><input type="file" name="images" accept="img/*" multiple/></td>
                </tr>
                </tbody>
            </table><br/>

                <button type="submit" onClick={submitHandler}>수정</button> &nbsp;
                <button onClick={removeHandler}>삭제</button>
            </form> 
        </div>
    )
}

export default Pmodify;