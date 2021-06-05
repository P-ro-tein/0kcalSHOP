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
    const [images, setImages] = useState({});

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
    const imagesChangeHandler=(e)=>{
        setImages(e.target.value);
    }

    const removeHandler=(event) => {
        const _id = productId;

        if(window.confirm('삭제 하시겠습니까?')){
            axios.post('/api/product/removeProduct', {_id})

            alert('삭제 되었습니다.')
            return window.location.href='/admin/psearch'
        } else{
            event.preventDefault();
        }
    }

    const submitHandler =(event) => {
        if(title.length === 0){
            event.preventDefault();
            return alert("상품명을 입력하세요.");
        }
        if(category.length === 0){
            event.preventDefault();
            return alert("카테고리를 입력하세요.");
        }
        if(price === 0){
            event.preventDefault();
            return alert("가격을 입력하세요.");
        } else if(price<0){
            event.preventDefault();
            return alert("가격은 음수가 될 수 없습니다.");
        }
        if(shipCharge === 0){
            event.preventDefault();
            return alert("배송비를 입력하세요.");
        } else if(shipCharge<0){
            event.preventDefault();
            return alert("배송비는 음수가 될 수 없습니다.");
        }
        if(remainStock === 0){
            event.preventDefault();
            return alert("재고량을 입력하세요.");
        } else if(remainStock<0){
            event.preventDefault();
            return alert("재고량은 음수가 될 수 없습니다.");
        }
        if(description.length === 0){
            event.preventDefault();
            return alert("상세설명을 입력하세요.");
        }
        if(!images){
            event.preventDefault();
            return alert("이미지를 삽입하세요.");
        }
        
        if(window.confirm('수정 하시겠습니까?')){
            const _id = productId;
            const formData = new FormData();

            formData.append('title', title);
            formData.append('category', category);
            formData.append('shipCharge', shipCharge);
            formData.append('remainStock', remainStock);
            formData.append('description', description);
            formData.append('price', price);

            axios.post('/api/product/modifyProduct', 
            {   
                _id, formData
            }).then(response => {
                if(response.data.success){
                    event.preventDefault();
                    alert('수정 완료');
                    return window.location.href='/admin/psearch'
                } else { 
                    event.preventDefault();
                    alert('수정 실패');
                    return window.location.href='/admin/psearch'
                }
            });
        } else {
            event.preventDefault();
        }
        
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
                    <td className="Tname">상품명</td>
                    <td><input type="text" name="title" value={title} onChange={titleChangeHandler}/></td>
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
                    <td><input type="text" name="description" value={description} onChange={descriptionChangeHandler} /></td>
                </tr>
                <tr>
                    <td>대표이미지</td><td><input type="file" name="images" accept="img/*" onChange={imagesChangeHandler}/></td>
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