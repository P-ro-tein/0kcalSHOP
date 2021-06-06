import './Basic.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Pregist = (props) => {
    const [title, setTitle] = useState("");
    const [category, setCategory] = useState("");
    const [price, setPrice] = useState(0);
    const [shipCharge, setShipCharge] = useState(0);
    const [remainStock, setRemainStock] = useState(0);
    const [description, setDescription] = useState("");
    const [Images, setImages] = useState({});

    useEffect(()=>{
        console.log(Images);
    },[Images])
    const titleChangeHandler = (e) => {
        setTitle(e.currentTarget.value);
    }
    const categoryChangeHandler = (e) => {
        setCategory(e.currentTarget.value);
    }
    const priceChangeHandler = (e) => {
        setPrice(e.currentTarget.value);
    }
    const shipChargeChangeHandler = (e) => {
        setShipCharge(e.currentTarget.value);
    }
    const remainStockChangeHandler = (e) => {
        setRemainStock(e.currentTarget.value);
    }
    const imagesChangeHandler = (e) => {
        // let productImages=[];
        // for(let i=0;i<e.target.files.length;i+=1){
        //     productImages.push(e.target.files[i]);
        // }
        // setImages(productImages);
        setImages(e.target.files);
    }
    
    const descriptionChangeHandler = (e) => {
        setDescription(e.currentTarget.value);
    }
    
    const submitHandler = (event) => {
        event.preventDefault();
        if(title&&category&&price&&shipCharge&&remainStock&&description){
            let formData = new FormData(); 
            const config = {
                header: { 'content-type': 'multipart/form-data' }
            }
            formData.append('title', title);
            formData.append('category', category);
            formData.append('price', price);
            formData.append('shipCharge', shipCharge);
            formData.append('remainStock', remainStock);
            formData.append('description', description);
            formData.append('images',Images[0]);
            formData.append('images',Images[1]);
            formData.append('images',Images[2]);
            
            axios.post('/api/product/register', formData, config)
            .then(res=>{
                if(res.data.success){
                    alert('등록 완료');
                    props.history.push('/admin/psearch');
                } else { 
                    alert('등록 실패');
                    props.history.push('/admin/psearch');
                }
            })
        } else {
            alert("정보를 입력해주세요.");  
        }
    }

    return(
        <div className="Page">
            <span><b>상품 관리 &gt; 상품 등록</b></span>
            <hr/>

            <form>
            <table>
                <tbody>
                <tr className="Ttitle">
                    <td colSpan="2">상품 등록</td>
                </tr>
                <tr>
                    <td className="Tname">상품명</td><td><input type="text" name="title" onChange={titleChangeHandler}/></td>
                </tr>
                <tr>
                    <td>카테고리명</td>
                    <td>
                        <select name="category" onChange={categoryChangeHandler}>
                            <option defaultValue disabled hidden>카테고리 선택</option>
                            <option value="식단세트">식단세트</option>
                            <option value="식사대용">식사대용</option>
                            <option value="건강간식">건강간식</option>
                        </select>
                    </td>
                </tr>
                <tr>
                    <td>가격</td>
                    <td><input type="number" name="price" onChange={priceChangeHandler}/></td>
                </tr>
                <tr>
                    <td>배송비</td>
                    <td><input type="number" name="shipCharge" onChange={shipChargeChangeHandler}/></td>
                </tr>
                <tr>
                    <td>재고량</td>
                    <td><input type="number" name="remainStock" onChange={remainStockChangeHandler}/></td>
                </tr>
                <tr>
                    <td>상품 소개</td>
                    <td><input type="text" name="description" onChange={descriptionChangeHandler} /> </td>
                </tr>
                <tr>
                    <td>대표이미지</td><td><input type="file" name="images" accept="img/*" onChange={imagesChangeHandler} multiple/></td>
                </tr>
                <tr>
                    <td>유의사항</td><td>이미지 두장은 썸네일 한장은 설명</td>
                </tr>
                </tbody>
            </table><br/>
            
            <button onClick={submitHandler}>등록</button>
            </form>
        </div>
    )
}

export default Pregist