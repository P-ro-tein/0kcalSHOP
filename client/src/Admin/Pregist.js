import './Basic.css';

export default function Pregist() {
    return(
        <div className="Page">
            <span><b>상품 관리 &gt; 상품 등록</b></span>
            <hr/>
            <form method="POST">
            <table>
                <tr className="Ttitle">
                    <td colSpan="2">상품 등록</td>
                </tr>
                <tr>
                    <td className="Tname">상품명</td><td><input type="text" name="title"/></td>
                </tr>
                <tr>
                    <td>카테고리명</td>
                    <td>
                        <select name="category">
                            <option>카테고리 선택</option>
                            <option>식단세트</option>
                            <option>식사대용</option>
                            <option>건강간식</option>
                        </select>
                    </td>
                </tr>
                <tr>
                    <td>가격</td>
                    <td><input type="number" name="price"/></td>
                </tr>
                <tr>
                    <td>배송비</td>
                    <td><input type="number" name="shipCharge"/></td>
                </tr>
                <tr>
                    <td>재고량</td>
                    <td><input type="number" name="stock"/></td>
                </tr>
                <tr>
                    <td>대표이미지</td><td><input type="file" name="images" accept="img/*"/></td>
                </tr>
                <tr>
                    <td>상품 상세설명</td><td><input type="file" name="images" accept="img/*"/></td>
                </tr>
            </table><br/>
                <input type="submit" value="등록"/>
            </form>
        </div>
    )
}