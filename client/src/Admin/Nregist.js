import './Basic.css';
import React, { useState } from 'react';
import axios from 'axios';

export default function Nregist(props) {
    const [noticeTitle, setNoticeTitle] = useState("");
    const [expiredDate, setExpiredDate] = useState("");
    //const [disabled, setDisabled] = useState(false);
    const [image, setImage] = useState("");

    const NoticeTitleChangeHandler = (e) => {
        setNoticeTitle(e.currentTarget.value);
    }
    const expiredDateChangeHandler = (e) => {
        setExpiredDate(e.currentTarget.value);
    }
    const imageChangeHandler = (e) => {
        setImage(e.target.files);
    }

    const submitHandler = (event) => {
        event.preventDefault();
        /*const data = {
            noticeTitle: noticeTitle,
            expiredDate: expiredDate,
            description: description,
            image: image,
        }*/
        const formData = new FormData(); 

        formData.append('noticeTitle', noticeTitle);
        formData.append('expiredDate', expiredDate);
        formData.append('images', image[0]);

        axios.post('/api/notice/register',{
                formData
        })
        .then(res=>{
            if(res.data.success){
                alert('등록 완료');
            } else {
                alert('등록 실패');
            }
        })
    }

    return(
        <div className="Page">
            <span><b>공지사항/이벤트 관리 &gt; 공지사항/이벤트 등록</b></span>
            <hr/>

            <form>
                <table>
                    <tbody>
                    <tr className="Ttitle">
                        <td colSpan="2">공지사항/이벤트 등록</td>
                    </tr>
                    <tr>
                        <td className="Tname">제목 </td>
                        <td><input type="text" name="noticeTitle" onChange={NoticeTitleChangeHandler}/></td>
                    </tr>
                    <tr>
                        <td>만료일자 </td>
                        <td><input type="date" name="expiredDate" onChange={expiredDateChangeHandler}/></td>
                    </tr>
                    <tr>
                        <td>배너 이미지 등록 </td>
                        <td><input type="file" name="images" accept="img/*" onChange={imageChangeHandler}/></td>
                    </tr>
                    </tbody>
                </table>
                <br/>

                <button onClick={submitHandler}>등록</button>
                </form>
        </div>
    )
}