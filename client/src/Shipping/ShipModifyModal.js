import React, { useState,useEffect,useCallback} from 'react';

import axios from "axios";
import '../AllCss.css'
import DaumPostcode from 'react-daum-postcode';


const DeliveryModal = ( props ) => {
    const { open, close, header} = props;
    const [Q1,setSelect]=useState("");
    const [Div,setDiv]=useState(true);
    const [isDaumPost,SetDaumPost]=useState(false);
    const [isAddress, setIsAddress] = useState("");
    const [isZoneCode, setIsZoneCode] = useState();
    const [Address, setAddress] = useState([]);
    const [SelectAddress,setSelectAddress]=useState(0);

    //modify state
    const [shipAddrName, setShipAddrName] = useState('');
    const [shipAddrRecipient, setShipAddrRecipient] = useState('');
    const [contactNumber, setContactNumber] = useState('');
    const [shipDetailOne, setShipDetailOne] = useState('');
    const [shipDetailTwo, setShipDetailTwo] = useState('');
    const [shipDetailThree, setShipDetailThree] = useState('');
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
                if(response.data.success&&response.data.postSize) {
                    setAddress(response.data.shipAddrInfo)
                    setSelect(response.data.shipAddrInfo[0]._id);
                }})
            .catch();
    }
    useEffect(() => {
        setShipAddress();
    }, [SelectAddress]);

    const changeRadioQ1 = (e) => {
        setSelect(e.target.value);
        console.log(e.target.value);
    };

    const ChangePost=()=>{
        SetDaumPost(true);
    }

    const modify=()=>{
        let i=0
        console.log(Q1);
        for(i=0;i<Address.length;i++)
        {
            console.log(Address[i].shipAddrName);
            if(Address[i]._id===Q1)
            {
                setSelectAddress(i);
            }
        }if(Address.length){
            setShipAddrName(Address[SelectAddress].shipAddrName);
            setShipAddrRecipient(Address[SelectAddress].shipAddrRecipient);
            setContactNumber(Address[SelectAddress].contactNumber);
            setShipDetailOne(Address[SelectAddress].shipAddrDetail[0]);
            setShipDetailTwo(Address[SelectAddress].shipAddrDetail[1]);
            setShipDetailThree(Address[SelectAddress].shipAddrDetail[2]);
            setDefaultShip(Address[SelectAddress].defaultShip);
            setDiv(false);
        }
    }

    const saveModify=()=>{
        axios.post('/api/shipAddr/modifyShipAddr', {
            _id: Q1,
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
                    alert('배송지 수정 완료');
                    setDiv(true);
                    setShipAddress();
                } else {
                    alert('배송지 수정 실패');
                }
            })
    }

    const deleteShipAddr=()=>{
        axios.post('/api/shipAddr/removeShipAddr', {
            _id: Q1
        })
            .then(res => {
                if(res.data.success){
                    alert('삭제 완료');
                    setShipAddress();
                } else{
                    alert('삭제 실패');
                }
            })
    }
    const saveDefault=()=>{
        console.log(Q1);
        axios.post('/api/shipAddr/setDefault',{
            _id:Q1,
            defaultShip: 1
        })
            .then(response=>{
                if(response.data.success){
                    alert('기본배송지 변경 완료');
                    setShipAddress();
                } else{
                    alert('기본배송지 변경 실패');
                }
            })
    }
    const save=()=>{
        setDiv(true);
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
                    {/* 수정 버튼 클릭시 현재 배송지 목록 나열 */}
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
                                {Div===true&&
                                <div className="newbox">

                                    {
                                        Address.map((data)=>{
                                            return(
                                                <div style={{paddingBottom:"10px"}}>
                                                    <label htmlFor="delivery">
                                                        <input type="radio" id={data._id} name={data._id} value={data._id} checked={Q1 === data._id ? true : false} onChange={changeRadioQ1}></input>
                                                        {data.shipAddrName}<div style={{paddingTop:"10px",paddingLeft:"22px"}}>{data.shipAddrDetail[0]}({data.shipAddrDetail[2]})</div>
                                                    </label>
                                                </div>
                                            );
                                        })
                                    }
                                </div>}
                                {Div===false &&
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
                                        <input type="text" className="input" value={shipDetailOne} onChange={detailOneHandler}></input>
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
                                    <input className="address" type="text" value={shipDetailThree} onChange={detailThreeHandler} readOnly></input>
                                </div>

                                }
                            </div>
                            <div>
                            </div>
                        </div>
                    </main>
                    {Div===true&&
                    <footer>
                        <button className="close" onClick={saveDefault}>저장</button>
                        <button className="close" onClick={deleteShipAddr}>삭제</button>
                        <button className="close" onClick={modify}>수정</button>
                        <button className="close" onClick={close}>닫기</button>
                    </footer>
                    }
                    {Div===false&&
                    <footer>
                        <button className="close" onClick={saveModify}>저장</button>
                        <button className="close" onClick={close}>닫기</button>
                    </footer>}
                </section>
            ) : null }
        </div>
    )
}

export default DeliveryModal;