import React, { useState,useCallback,useEffect} from 'react';

import axios from "axios";
import '../AllCss.css'
import DaumPostcode from 'react-daum-postcode';


const DeliveryModal = ( props ) => {
    const { open, close, header} = props;
    const [isDaumPost,SetDaumPost]=useState(false);
    const [isAddress, setIsAddress] = useState("");
    const [isZoneCode, setIsZoneCode] = useState();

    const [shipAddrName, setShipAddrName] = useState('');
    const [shipAddrRecipient, setShipAddrRecipient] = useState('');
    const [contactNumber, setContactNumber] = useState('');
    const [shipDetailOne, setShipDetailOne] = useState('');
    const [shipDetailTwo, setShipDetailTwo] = useState('');
    const [shipDetailThree, setShipDetailThree] = useState('');
    const [Address, setAddress] = useState([]);
    const [defaultShip, setDefaultShip] = useState(0);


    const shipAddrNameHandler = useCallback(e => {
        setShipAddrName(e.target.value);
    },[]);
    const recipientHandler = useCallback(e => {
        setShipAddrRecipient(e.target.value);
    },[]);
    const contactNumberHandler = useCallback(e => {
        setContactNumber(e.target.value);
    },[]);
    const detailOneHandler = useCallback(e => {
        setShipDetailOne(e.target.value);
    },[]);
    const detailTwoHandler = useCallback(e => {
        setShipDetailTwo(e.target.value);
    },[]);
    const detailThreeHandler = useCallback(e => {
        setShipDetailThree(e.target.value);
    },[]);
    const saveNew=()=>{
        axios.post('/api/shipAddr/register', {
            shipAddrRecipient: shipAddrRecipient,
            shipAddrName: shipAddrName,
            roadAddress: shipDetailOne,
            postcode: shipDetailTwo,
            detailAddress: shipDetailThree,
            contactNumber: contactNumber,
            defaultShip: defaultShip
        })
            .then(response => {
                if(response.data.success){
                    alert('배송지 추가 완료');
                } else {
                    console.log(response.data.err);
                    alert('배송지 추가 실패');
                }
            })
    }
    const postCodeStyle = {
        position: "absolute",
        top:"150px",
        right:"-10px",
        zIndex: "100",
        width: "500px",
        border: "3px solid black"
    }
    const setShipAddress = () => {
        axios.post('/api/shipAddr/list',{
            order:"desc",
            sortBy:"defaultShip"
        })
            .then(response => {
                if(response.data.success) {
                    setAddress(response.data.shipAddrInfo)
                }})
            .catch();
    }
    useEffect(() => {
        setShipAddress();
    }, []);
    const ChangePost=()=>{
        SetDaumPost(true);
    }

    const handleComplete = (data) => {
        let fullAddress = data.address;
        let extraAddress = "";

        if (data.addressType === "R") {
            if (data.bname !== "") {
                extraAddress += data.bname;
            }
            if (data.buildingName !== "") {
                extraAddress +=
                    extraAddress !== "" ? `, ${data.buildingName}` : data.buildingName;
            }
            fullAddress += extraAddress !== "" ? ` (${extraAddress})` : "";
        }
        setShipDetailOne(fullAddress);
        setShipDetailTwo(data.zonecode);
        setIsZoneCode(data.zonecode);
        setIsAddress(fullAddress);
        SetDaumPost(false);
    };

    return (
        <div className={ open ? 'openModal modal' : 'modal' }>
            { open ? (
                <section>
                    <header>
                        {header}
                        <button className="close" onClick={close}> &times; </button>
                    </header>
                    <main>
                        <div className="box">
                            <div className="container">
                                <div className="text"> 현재 배송지</div>
                                {
                                    Address.length?
                                        <div style={{display:"block"}}>
                                            <div className="dstination">{Address[0].shipAddrName}</div>
                                            <div className="destination">{Address[0].shipAddrDetail[0]}</div>
                                            <div className="destination">{Address[0].shipAddrDetail[2]}</div>
                                        </div>
                                        :null}
                            </div>
                            <div>
                                <div style={{display:'inline-flex'}}>
                                    <button className="_text">신규 배송지</button>
                                </div>
                                <div className="newbox">
                                    <div className="container">
                                        <div className="text">배송지 이름</div>
                                        <input type="text" className="input" value={shipAddrName} onChange={shipAddrNameHandler}></input>
                                    </div>
                                    <div className="container">
                                        <div className="text">수령인</div>
                                        <input type="text" className="input" value={shipAddrRecipient} onChange={recipientHandler}></input>
                                    </div>
                                    <div className="container">
                                        <div className="text">휴대전화</div>
                                        <input type="num" className="input" value={contactNumber} onChange={contactNumberHandler}></input>
                                    </div>
                                    <div className="container">
                                        <div className="text">배송지 주소</div>
                                        <input type="text" className="input" value={shipDetailOne} onChange={detailOneHandler} readOnly></input>
                                        <button onClick={ChangePost}>찾기</button>
                                    </div>
                                    {
                                        isDaumPost?
                                            <div className="daumAddress">
                                                <DaumPostcode
                                                    autoClose
                                                    onComplete={handleComplete}
                                                    style={postCodeStyle}
                                                    height={300}
                                                    Address={isAddress}
                                                    ZoneCode={isZoneCode}/>
                                            </div>:null
                                    }
                                    <input className="address" type="text" value={shipDetailTwo} onChange={detailTwoHandler} readOnly></input>
                                    <input className="address" type="text" value={shipDetailThree} onChange={detailThreeHandler}></input>
                                </div>
                            </div>
                            <div>
                            </div>
                        </div>
                    </main>
                    <footer>
                        <button className="close" onClick={saveNew}> 추가 </button>
                    </footer>
                </section>
            ) : null }
        </div>
    )
}

export default DeliveryModal;