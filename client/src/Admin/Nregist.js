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
        setImage(e.currentTarget.value);
    }

    const submitHandler = (event) => {
        /*const data = {
            noticeTitle: noticeTitle,
            expiredDate: expiredDate,
            description: description,
            image: image,
        }*/
        const formData = new FormData(); 

        formData.append('noticeTitle', noticeTitle);
        formData.append('expiredDate', expiredDate);
        formData.append('image', event.target.images.files[0]);

        const res = axios.post(
            '/api/notice/register',
            {
                formData
            }
        )

        if(res.formData) {
            alert('등록이 완료되었습니다.')

            return window.location.href="/admin/nsearch"
        }

        /*
        axios.post(
            '/api/notice/register',
            {
                formData
            }
        ).then(response => {
            if(response.data.success){
                alert('등록 완료');
                props.history.push('/admin/nsearch');
            } else { 
                alert('');
            }
        });*/
    }

    return(
        <div className="Page">
            <span><b>공지사항/이벤트 관리 &gt; 공지사항/이벤트 등록</b></span>
            <hr/>

            <form action="/api/notice/register" method="POST" encType="multipart/form-data">
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