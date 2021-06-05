import './Basic.css';
import React, { useState } from 'react';
import axios from 'axios';

export default function Pregist(props) {
    const [title, setTitle] = useState("");
    const [category, setCategory] = useState("");
    const [price, setPrice] = useState("");
    const [shipCharge, setShipCharge] = useState("");
    const [remainStock, setRemainStock] = useState("");
    const [description, setDescription] = useState("");
    const [images, setImages] = useState([]);

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
        setImages(e.target.images.files[0]);
    }
    const descriptionChangeHandler = (e) => {
        setDescription(e.currentTarget.value)
    }
    

    const submitHandler = (event) => {
        event.preventDefault();

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

        const formData = new FormData(); 

        formData.append('title', title);
        formData.append('category', category);
        formData.append('price', price);
        formData.append('shipCharge', shipCharge);
        formData.append('remainStock', remainStock);
        formData.append('description', description);
        formData.append('images', images);     
            
        event.preventDefault();

        axios.post('/api/product/register',{
                formData
        })
        .then(response => {
            if(response.data.success){
                alert('등록 완료');
                return window.location.href='/admin/psearch'
            } else { 
                alert('등록 실패');
                return window.location.href='/admin/psearch'
            }
        });
    }

    return(
        <div className="Page">
            <span><b>상품 관리 &gt; 상품 등록</b></span>
            <hr/>

            <form action="/api/product/register" method="POST" encType="multipart/form-data">
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
                            <option selected disabeld hidden>카테고리 선택</option>
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
                    <td>대표이미지</td><td><input type="file" name="images" accept="img/*" multiple onChange={imagesChangeHandler}/></td>
                </tr>
                <tr>
                    <td>상품 상세설명</td><td><input type="file" name="images" accept="img/*" multiple onChange={imagesChangeHandler}/></td>
                </tr>
                </tbody>
            </table><br/>
            
            <button type="submit" onClick={submitHandler}>등록</button>
            </form>
        </div>
    )
}