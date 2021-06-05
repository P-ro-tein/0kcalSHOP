import './Basic.css';
import React, { useState } from 'react';
import axios from 'axios';

export default function Nregist(props) {
    const [noticeTitle, setNoticeTitle] = useState("");
    const [expiredDate, setExpiredDate] = useState("");
    const [description, setDescription] = useState("");
    const [image, setImage] = useState([]);

    const NoticeTitleChangeHandler = (e) => {
        setNoticeTitle(e.currentTarget.value);
    }
    const expiredDateChangeHandler = (e) => {
        setExpiredDate(e.currentTarget.value);
    }
    const imageChangeHandler = (e) => {
        setImage(e.currentTarget.value);
    }
    const descriptionChangeHandler = (e) => {
        setDescription(e.currentTarget.value);
    }

    const submitHandler = (event) => {
        if(noticeTitle.length === 0){
            event.preventDefault();
            return alert("제목을 입력하세요.")
        }
        if(expiredDate.length === 0){
            event.preventDefault();
            return alert("만료기간을 입력하세요.")
        } else if(new Date(expiredDate) < Date.now()){
            event.preventDefault();
            return alert("만료기간은 현재보다 늦을 수 없습니다.")
        }
        if(description.length === 0){
            event.preventDefault();
            return alert("상세 내용을 입력하세요.")
        }
        if(!image){
            event.preventDefault();
            return alert("이미지를 입력하세요.")
        }

        if(window.confirm('등록 하시겠습니까?')){
            const formData = new FormData(); 

            formData.append('noticeTitle', noticeTitle);
            formData.append('expiredDate', expiredDate);
            formData.append('description', description);
            formData.append('image', event.target.image.files[0]);
    
            event.preventDefault();

            axios.post('/api/notice/register',
                {
                    formData
                }
            ).then(response => {
                if(response.data.success){
                    event.preventDefault();
                    alert('등록 완료');
                    return window.location.href='/admin/nsearch'
                } else { 
                    event.preventDefault();
                    alert('등록 실패');
                    return window.location.href='/admin/nsearch'
                }
            });
        } else {
            event.preventDefault();
        }
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
                        <td>상세 내용</td>
                        <td><input type="text" name="description" onChange={descriptionChangeHandler} /></td>
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