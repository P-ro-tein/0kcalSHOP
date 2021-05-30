import './Basic.css';
import React, { useState } from 'react';
import axios from 'axios';

export default function Nregist(props) {
    const [noticeTitle, setNoticeTitle] = useState("");
    const [expiredDate, setExpiredDate] = useState("");
    const [image, setImage] = useState(null);

    const NoticeTitleChangeHandler = (e) => {
        setNoticeTitle(e.currentTarget.value);
    }
    const expiredDateChangeHandler = (e) => {
        setExpiredDate(e.target.value);
    }
    const imageChangeHandler = (e) => {
        setImage(e.target.files[0]);
    }

    const getFormDate = (date) => {
        const year = date.getFullYear();
        let month = 1 + date.getMonth();
        month = month >= 10 ? month : '0' + month;
        let day = date.getDate();
        day = day >= 10 ? day : '0' + day;
        return year + '-' + month + '-' + day; 
    };

    const submitHandler=(event) => {
        //페이지 전환 막기
        //event.preventDefault();

        const currentDate = Date.now();

        //유효성 검사
        if(noticeTitle.length === 0){
            event.preventDefault();
            return alert("제목을 입력해주세요.")
        }
        if(expiredDate.length === 0){
            event.preventDefault();
            return alert("만료일자를 입력하세요.")
        } else if(new Date(expiredDate) < Date.now()){
            return alert("만료일자는 현재보다 늦을 수 없습니다.")
        }
        if(!image){
            event.preventDefault();
            alert(expiredDate)
            return alert("이미지를 입력하세요.")
        }

        //서버로 전송
        const formData = new FormData();
            
        formData.append('noticeTitle', noticeTitle);
        formData.append('expiredDate', expiredDate);
        formData.append('images', image);

        axios.post(
            '/api/notice/register', 
            { formData }, 
            {header:{'Content-Type' : 'multipart/form-data'}}
        ).then(response => {
            if(response.data.success){
                return alert("공지 업로드 성공")
            } else{
                return alert("공지 업로드 실패")
            }
        })
    }   

    return(
        <div className="Page">
            <span><b>공지사항/이벤트 관리 &gt; 공지사항/이벤트 등록</b></span>
            <hr/>

            <form action="/api/notice/register" method="POST" encType="multipart/form-data" onSubmit={submitHandler}>
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

                <button type="submit">등록</button>
                </form>
        </div>
    )
}