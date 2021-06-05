import './Basic.css';

export default function Pstat() {
    return(
        <div className="Page">
            <span><b>상품 판매정보 관리 &gt; 판매정보 통계</b></span>
            <hr/>
            <table>
                <tr>
                    <td>검색 기간</td>
                    <td><input type="date" /> ~ <input type="date"/></td>
                    <td><input type="submit" value="등록" /></td>
                </tr>
            </table>
            <br/>
            <table>
                <tr className="Ttitle">
                    <td colSpan="7">상품 통계</td>
                </tr>
                <tr>
                    <td>총 판매금액</td>
                    <td colSpan="3">카테고리 순위</td>
                    <td colSpan="3">개별상품 순위</td>
                </tr>
                <tr>
                    <td rowSpan="3">xxx,xxx,xxx</td>
                    <td>1</td>
                    <td>식사대용</td>
                    <td>xx,xxx,xxx</td>
                    <td>1</td>
                    <td>닭가슴살</td>
                    <td>xx,xxx</td>
                </tr>
                <tr>
                    <td>2</td>
                    <td>건강간식</td>
                    <td>xx,xxx,xxx</td>
                    <td>2</td>
                    <td>곤약밥</td>
                    <td>xx,xxx</td>
                </tr>
                <tr>
                    <td>3</td>
                    <td>식단세트</td>
                    <td>xx,xxx,xsxx</td>
                    <td>3</td>
                    <td>곤약젤리</td>
                    <td>xx,xxx</td>
                </tr>
            </table>
        </div>
    )
}