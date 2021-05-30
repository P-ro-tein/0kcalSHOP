import './Basic.css';

export default function Porder() {
    return(
        <div className="Page">
            <span><b>상품 판매정보 관리 &gt; 주문내역 관리</b></span>
            <hr/>
            <form method="POST">
                <table>
                    <tr>
                        <td>검색 기간</td>
                        <td><input type="date" /> ~ <input type="date"/></td>
                        <td><input type="submit" value="등록" /></td>
                    </tr>
                </table>
            </form>
            <br/>
            <table>
                <tr className="Ttitle">
                    <td colSpan="5">주문 내역</td>
                </tr>
                <tr>
                    <td>주문 날짜</td>
                    <td>상품명</td>
                    <td>주문 상태</td>
                    <td colSpan="2">가격</td>
                </tr>
                <tr>
                    <td>21-05-18</td>
                    <td>닭가슴살</td>
                    <td>결제완료</td>
                    <td>xx,xxx</td>
                    <td><input type="button" value="배송완료"/></td>
                </tr>
                <tr>
                    <td>21-05-17</td>
                    <td>곤약젤리</td>
                    <td>배송중</td>
                    <td>xx,xxx</td>
                    <td><input type="button" value="상품평" /></td>
                </tr>
            </table>
        </div>
    )
}