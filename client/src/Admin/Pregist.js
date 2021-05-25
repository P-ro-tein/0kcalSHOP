import './Basic.css';
//import { Link } from "react-router-dom";
export default function Pregist() {
    /*const [title, setTitle] = useState("");
    const [category, setCategory] = useState("");
    const [price, setPrice] = useState("");
    const [shipCharge, setShipCharge] = useState("");
    const [remainStock, setRemainStock] = useState("");
    const [images, setImages] = useState("");


    const titleChangeHandler = (e) => {
        setId(e.currentTarget.value);
    }
    const categoryChangeHandler = (e) => {
        setId(e.currentTarget.value);
    }
    const priceChangeHandler = (e) => {
        setId(e.currentTarget.value);
    }
    const shipChargeChangeHandler = (e) => {
        setId(e.currentTarget.value);
    }
    const remainStockChangeHandler = (e) => {
        setId(e.currentTarget.value);
    }
    const imagesChangeHandler = (e) => {
        setId(e.currentTarget.value);
    }

    const submitHandler = () => {
        
        const data = {
            title: title,
            category: category,
            price: price,
            shipCharge: shipCharge,
            remainStock: remainStock,
            images: images,
        }
        axios({
            url: '/api/product/register',
            method: 'post',
            data
        })
        .then(res => {
            if(response.success){
                history.push('/admin/psearch');
            } else { 
                alert('가입할 수 없습니다');
                console.log(response.message);
            }
        });
    }*/

    return(
        <div className="Page">
            <span><b>상품 관리 &gt; 상품 등록</b></span>
            <hr/>
            <form action="/api/product/register" method="POST" enctype="multipart/form-data">
            <table>
                <tr className="Ttitle">
                    <td colSpan="2">상품 등록</td>
                </tr>
                <tr>
                    <td className="Tname">상품명</td><td><input type="text" name="title" /></td>
                </tr>
                <tr>
                    <td>카테고리명</td>
                    <td>
                        <select name="category">
                            <option selected disabeld hidden>카테고리 선택</option>
                            <option>식단세트</option>
                            <option>식사대용</option>
                            <option>건강간식</option>
                        </select>
                    </td>
                </tr>
                <tr>
                    <td>가격</td>
                    <td><input type="number" name="price" /></td>
                </tr>
                <tr>
                    <td>배송비</td>
                    <td><input type="number" name="shipCharge"/></td>
                </tr>
                <tr>
                    <td>재고량</td>
                    <td><input type="number" name="remainStock"/></td>
                </tr>
                <tr>
                    <td>대표이미지</td><td><input type="file" name="images" accept="img/*"/></td>
                </tr>
                <tr>
                    <td>상품 상세설명</td><td><input type="file" name="images" accept="img/*" multiple/></td>
                </tr>
            </table><br/>
                
                <input type="submit" value="등록"/>
            </form>
        </div>
    )
}