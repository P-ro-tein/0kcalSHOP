import './Basic.css';
import React, { useState, useEffect } from 'react';
import { useGlobalState } from "../GlobalContext";
import axios from 'axios';

import SearchNotice from './SearchNotice';

export default function Nsearch() {
    const [notices, setNotices] = useState([]);
    const [sort, setSort] = useState("이름");
    const [startDate, setStartDate] = useState("");
    const [finishDate, setFinishDate] = useState("");

    const state = useGlobalState();
    const Active = state.search;

    useEffect(() => {
        axios
        .post("/api/notice/list", {
            searchTerm: Active,
            sortBy: sort,
            order: "asc",
            filters: {
            expiredDate: [startDate, finishDate],
        },
      })
      .then((response) => {
        if (response.data.success) {
          setNotices(response.data.noticeInfo);
        } else {
          console.log("공지 정보 가져오는데 실패");
        }
      });
    }, [Active, sort, startDate, finishDate]);

    const ChangeSort = (e) => {
        setSort(e.target.value);
    };
    const setStart = (e) => {
        setStartDate(e.target.value);
    };
    const setFinish = (e) => {
        setFinishDate(e.target.value);
    };

    const getFormatDate = date => {
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
                    <td>나열 조건</td>
                    <td>
                        <select value={sort} onChange={ChangeSort}>
                            <option selected disabeld hidden>조건 선택</option>
                            <option value="noticeTitle">이름순</option>
                            <option value="expiredDate">만료기간순</option>
                            <option value="createdDate">등록일순</option>
                        </select>
                    </td>
                </tr>
                <tr>
                    <td>검색기간</td>
                    <td><input type="date" value={startDate} onChange={setStart} /> ~ <input type="date" value={finishDate} onChange={setFinish}/></td>
                </tr>
            </thead>    
        </table>
        <SearchNotice/>
        <br/>
        <span>검색어 : {Active}</span>

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
                        <td className="Tnext">{getFormatDate(new Date(notice.updatedDate))}</td>
                        <td>{getFormatDate(new Date(notice.expiredDate))}</td>
                        <td>
                            <a href={`/admin/notice/${notice._id}`}><button>수정</button></a>
                        </td>
                    </tr>
                    </tbody>
                </table>
        );
        })}
    </div>
    )
}