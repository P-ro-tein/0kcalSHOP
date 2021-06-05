import { Link } from "react-router-dom";
import './Category.css';

export default function Category() {
    return (
        <div className="Menu">
            <details>
                <summary>공지사항/이벤트 관리</summary>
                    <li><Link to="/admin/nsearch">공지사항/이벤트 조회</Link></li>
                    <li><Link to="/admin/nregist">공지사항/이벤트 등록</Link></li>
            </details>
            <details>
                <summary>상품 관리</summary>
                    <li><Link to="/admin/psearch">상품 조회</Link></li>
                    <li><Link to="/admin/pregist">상품 등록</Link></li>
            </details>
            <details>
                <summary>상품 판매정보</summary>
                    <li><Link to="/admin/pstat">상품 판매정보 통계</Link></li>
                    <li><Link to="/admin/porder">주문내역 관리</Link></li>
            </details>

            <br/>
            
            <span className="logout"><input type="button" value="로그아웃" /></span>
            
        </div>   
    )
}