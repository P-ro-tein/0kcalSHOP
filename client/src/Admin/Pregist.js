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
                    alert('?????? ??????');
                    props.history.push('/admin/psearch');
                } else { 
                    alert('?????? ??????');
                    props.history.push('/admin/psearch');
                }
            })
        } else {
            alert("????????? ??????????????????.");  
        }
    }

    return(
        <div className="Page">
            <span><b>?????? ?????? &gt; ?????? ??????</b></span>
            <hr/>

            <form>
            <table>
                <tbody>
                <tr className="Ttitle">
                    <td colSpan="2">?????? ??????</td>
                </tr>
                <tr>
                    <td className="Tname">?????????</td><td><input type="text" name="title" onChange={titleChangeHandler}/></td>
                </tr>
                <tr>
                    <td>???????????????</td>
                    <td>
                        <select name="category" onChange={categoryChangeHandler}>
                            <option defaultValue disabled hidden>???????????? ??????</option>
                            <option value="????????????">????????????</option>
                            <option value="????????????">????????????</option>
                            <option value="????????????">????????????</option>
                        </select>
                    </td>
                </tr>
                <tr>
                    <td>??????</td>
                    <td><input type="number" name="price" onChange={priceChangeHandler}/></td>
                </tr>
                <tr>
                    <td>?????????</td>
                    <td><input type="number" name="shipCharge" onChange={shipChargeChangeHandler}/></td>
                </tr>
                <tr>
                    <td>?????????</td>
                    <td><input type="number" name="remainStock" onChange={remainStockChangeHandler}/></td>
                </tr>
                <tr>
                    <td>?????? ??????</td>
                    <td><input type="text" name="description" onChange={descriptionChangeHandler} /> </td>
                </tr>
                <tr>
                    <td>???????????????</td><td><input type="file" name="images" accept="img/*" onChange={imagesChangeHandler} multiple/></td>
                </tr>
                <tr>
                    <td>????????????</td><td>????????? ????????? ????????? ????????? ??????</td>
                </tr>
                </tbody>
            </table><br/>
            
            <button onClick={submitHandler}>??????</button>
            </form>
        </div>
    )
}

export default Pregist