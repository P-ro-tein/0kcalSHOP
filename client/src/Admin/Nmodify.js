import './Basic.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Nmodify(props) {
    const noticeId = props.match.params.noticeId
    const [noticeTitle, setNoticeTitle] = useState({});
    const [expiredDate, setExpiredDate] = useState({});

    useEffect(() => {
        axios.get(`/api/notice/notice_by_id?id=${noticeId}&type=single`)
            .then(response => {
                setNoticeTitle(response.data[0].noticeTitle);
                setExpiredDate(response.data[0].expiredDate);
            })
            .catch(err => alert(err))
    }, [noticeId])

    const noticeTitleChangeHandler=(e)=>{
        setNoticeTitle(e.target.value);
    }
    const expiredDateChangeHandler=(e)=>{
        setExpiredDate(e.target.value);
    }

    const removeHandler=() => {
        const _id = noticeId;

        if(window.confirm('삭제 하시겠습니까?')){
            axios.post('/api/notice/removeNotice', {_id})

            alert('삭제 되었습니다')
            return window.location.href='/admin/nsearch'
        }
    }

    const submitHandler=(event) => {
        const data = {
            _id: noticeId,
            noticeTitle: noticeTitle,
            expiredDate: expiredDate,
        }

        const res = axios.post('/api/notice/modifyNotice', { data })

        if(res.data) {
            alert('수정이 완료되었습니다.');
            return window.location.href = "/admin/nsearch"
        }
    }

    return(
        <div className="Page">
            <span><b>공지사항/이벤트 관리 &gt; 공지사항/이벤트 수정</b></span>
            <hr/>
            <form action="/api/notice/modifyNotice" method="POST" onSubmit={submitHandler}>
                <table>
                    <tbody>
                    <tr className="Ttitle">
                        <td colSpan="2">공지사항/이벤트 수정</td>
                    </tr>
                    <tr>
                        <td className="Tname">제목 </td>
                        <td> <input type="text" name="noticeTitle" value={noticeTitle} onChange={noticeTitleChangeHandler}/></td>
                    </tr>
                    <tr>
                        <td>만료기간 </td>
                        <td> <input type="date" name="expiredDate" value={expiredDate} onChange={expiredDateChangeHandler} /></td>
                    </tr>
                    <tr>
                        <td>배너 이미지 등록 </td>
                        <td> <input type="file" name="images" accept="img/*"/></td>
                    </tr>
                    </tbody>
                </table><br/>

                <button type="submit" onClick={submitHandler}>수정</button>&nbsp;
                <input type="button" value="삭제" onClick={removeHandler}/>
            </form>
        </div>
    )
}

export default Nmodify;