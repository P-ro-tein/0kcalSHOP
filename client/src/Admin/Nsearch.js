import './Basic.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function Nsearch() {
    const [notices, setNotices] = useState([]);

    useEffect(() => {
        axios.post('/api/notice/list')
        .then(response => {
        if(response.data.success) {
            setNotices(response.data.noticeInfo)
            console.log(response.data.noticeInfo)
        } else {
            alert('공지정보 가져오는데 실패');
        }
        })
    }, []);

    const getFormDate = (date) => {
        const year = date.getFullYear();
        let month = 1 + date.getMonth();
        month = month >= 10 ? month : '0' + month;
        let day = date.getDate();
        day = day >= 10 ? day : '0' + day;
        return year + '-' + month + '-' + day; 
    };
    

    return (
    <div className="Page">
        <b>공지사항/이벤트 관리 &gt; 공지사항/이벤트 조회</b>
        <hr/>
        <table>
            <thead>
                <tr className="Ttitle"><td colSpan="3">공지사항/이벤트 조회</td></tr>
                <tr>
                    <td>검색기간</td>
                    <td><input type="date" name="start" /> ~ <input type="date" name="finish"/></td>
                    <td><button type="submit">검색</button></td>
                </tr>
            </thead>    
        </table>    

        <br/>

        <table>
            <tbody>
            <tr>
                <td className="Tname">제목</td>
                <td className="Tnext">등록일자</td>
                <td>만료일자</td>
            </tr>
            </tbody>
        </table>

        {notices.map((notice) => {
            return (
                <table>
                    <tbody>
                    <tr>
                        <td className="Tname">{notice.noticeTitle}</td>
                        <td className="Tnext">{getFormDate(new Date(notice.updatedDate))}</td>
                        <td>{getFormDate(new Date(notice.expiredDate))}</td>
                        <td><a href={`/admin/notice/${notice._id}`}><button>수정/삭제하기</button></a></td>
                    </tr>
                    </tbody>
                </table>
        );
        })}
    </div>
    )
}