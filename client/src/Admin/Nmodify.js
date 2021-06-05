import './Basic.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Nmodify(props) {
    const noticeId = props.match.params.noticeId
    const [noticeTitle, setNoticeTitle] = useState("");
    const [expiredDate, setExpiredDate] = useState({});
    const [description, setDescription] = useState("");

    useEffect(() => {
        axios.get(`/api/notice/notice_by_id?id=${noticeId}&type=single`)
            .then(response => {
                setNoticeTitle(response.data[0].noticeTitle);
                setExpiredDate(getFormatDate(new Date(response.data[0].expiredDate)));
                setDescription(response.data[0].description);
            })
            .catch(err => alert(err))
    }, [noticeId])

    const noticeTitleChangeHandler=(e)=>{
        setNoticeTitle(e.target.value);
    }
    const expiredDateChangeHandler=(e)=>{
        setExpiredDate(e.target.value);
    }
    const descriptionChangeHandler=(e)=>{
        setDescription(e.target.value);
    }

    const getFormatDate = date => {
        const year = date.getFullYear();
        let month = 1 + date.getMonth();
        month = month >= 10 ? month : '0' + month;
        let day = date.getDate();
        day = day >= 10 ? day : '0' + day;
        return year + '-' + month + '-' + day;
      };

    const removeHandler=(event) => {
        const _id = noticeId;

        if(window.confirm('삭제 하시겠습니까?')){
            axios.post('/api/notice/removeNotice', {_id})

            alert('삭제 되었습니다.')
            return window.location.href='/admin/nsearch'
        }else{
            event.preventDefault();
        }
    }

    const submitHandler=(event) => {
        if(noticeTitle.length === 0){
            event.preventDefault();
            return alert("제목을 입력하세요.");
        }
        if(expiredDate.length === 0){
            event.preventDefault();
            alert()
            return alert("만료기간을 입력하세요.");
        } else if(new Date(expiredDate) < Date.now()){
            event.preventDefault();
            return alert("만료기간은 현재보다 늦을 수 없습니다.")
        }
        if(description.length === 0){
            event.preventDefault();
            return alert("상세내용을 입력하세요.");
        }

        if(window.confirm('수정 하시겠습니까?')){
            const _id = noticeId;
            const formData = new FormData();
    
            formData.append('noticeTitle', noticeTitle);
            formData.append('expiredDate', expiredDate);
            formData.append('description', description);

            axios.post('/api/product/modifyProduct', 
                {   
                    _id, formData
                }).then(response => {
                if(response.data.success){
                    event.preventDefault();
                    alert('수정 완료');
                    return window.location.href='/admin/nsearch'
                } else { 
                    event.preventDefault();
                    alert('수정 실패');
                    return window.location.href='/admin/nsearch'
                }
            });
        }else{
            event.preventDefault();
        }
    }

    return(
        <div className="Page">
            <span><b>공지사항/이벤트 관리 &gt; 공지사항/이벤트 수정</b></span>
            <hr/>
            <form action="/api/notice/modifyNotice" method="POST">
                <table>
                    <tbody>
                    <tr className="Ttitle">
                        <td colSpan="2">공지사항/이벤트 수정</td>
                    </tr>111
                    <tr>
                        <td className="Tname">제목 </td>
                        <td> <input type="text" name="noticeTitle" value={noticeTitle} onChange={noticeTitleChangeHandler}/></td>
                    </tr>
                    <tr>
                        <td>만료기간 </td>
                        <td> <input type="date" name="expiredDate" value={expiredDate} onChange={expiredDateChangeHandler} /></td>
                    </tr>
                    <tr>
                        <td>상세내용</td>
                        <td><input type="text" name="description" value={description} onChange={descriptionChangeHandler} /></td>
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