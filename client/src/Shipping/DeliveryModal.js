import React, { useState,useEffect} from 'react';

import axios from "axios";
import '../AllCss.css'
import DaumPostcode from 'react-daum-postcode';


const DeliveryModal = ( props ) => {
    const { open, close, header} = props;
    const [Q1,setSelect]=useState("");
    const [Div,setDiv]=useState(1); 
    const [isDaumPost,SetDaumPost]=useState(false);
    const [isAddress, setIsAddress] = useState("");
    const [isZoneCode, setIsZoneCode] = useState();
    const [Address, setAddress] = useState({});


    const postCodeStyle = {
        display: "block",
        position: "absolute",
        top:"150px",
        right:"-10px",
        zIndex: "100",
        padding: "7px"
    }

    useEffect(() => {
        axios.get('/api/shipAddr/list')
        .then(response => {
            console.log(response);
        if(response.data.success) {
            setAddress(response.data.shipAddrInfo)
            setSelect(response.data.shipAddrInfo[1].shipAddrName);
            console.log(Q1);
        } else {
            console.log('배송지 정보 가져오는데 실패');
        }
        })
    }, []);

    const ChangeDiv1=()=>{
            setDiv(1);
    };
    const ChangeDiv2=()=>{
        setDiv(2);
    }
    const ChangeDiv3=()=>{
        setDiv(3);
    }
    const changeRadioQ1 = (e) => {
        setSelect(e.target.value);
      };

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
      setIsZoneCode(data.zonecode);
      setIsAddress(fullAddress);
      console.log(data.zonecode)
      console.log(fullAddress);
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
                                <div style={{display:"block"}}>
                                    <div className="dstination">집</div>
                                    <div className="destination">공릉로 232 미래관 304호</div>
                                </div>
                            </div>
                            <div>
                                <div style={{display:'inline-flex'}}>
                                <button className="_text" onClick={ChangeDiv1}>배송지 목록</button><button className="_text" onClick={ChangeDiv2}>신규 배송지</button>
                                </div>
                                { Div===2 &&<div className="newbox">
                                    <div className="container">
                                    <div className="text">배송지 이름</div>
                                    <input type="text" className="input"></input>
                                    </div>
                                    <div className="container">
                                        <div className="text">수령인</div>
                                        <input type="text" className="input"></input>
                                    </div>
                                    <div className="container">
                                        <div className="text">휴대전화</div>
                                        <input type="tel" className="input"></input>
                                    </div>
                                    <div className="container">
                                        <div className="text">배송지 주소</div>
                                        <div type="text" className="input" style={{width:"245px"}}>{isAddress}</div>
                                        <button onClick={ChangePost}>주소 찾기</button>
                                    </div>
                                    {
                                        isDaumPost?
                                        <DaumPostcode 
                                        autoClose
                                        onComplete={handleComplete}
                                        style={postCodeStyle}
                                        height={300}
                                        Address={isAddress}
                                        ZoneCode={isZoneCode}/>:null
                                    }
                                    <div className="address">{isZoneCode}</div>
                                    <div className="address"></div>
                                </div>
                                }
                                {Div===1&&
                                <div className="newbox">

                                    {
                                        Address.map((data)=>{
                                            return(
                                                <div style={{paddingBottom:"10px"}}>
                                                 <label htmlFor="delivery">
                                                <input type="radio" id={data._id} name={data._id} value={data.shipAddrName} checked={Q1 === data.shipAddrName ? true : false} onChange={changeRadioQ1}></input>
                                                {data.shipAddrName}<div style={{paddingTop:"10px",paddingLeft:"22px"}}>{data.shipAddrDetail[0]}({data.shipAddrDetail[2]})</div>
                                                </label>
                                                </div>
                                            );
                                        })
                                    }
                                </div>}
                                { Div===3 &&
                                <div className="newbox">
                                    <div className="container">
                                    <div className="text">배송지 이름</div>
                                    <input type="text" className="input">{Address.shipAddrName}</input>
                                    </div>
                                    <div className="container">
                                        <div className="text">수령인</div>
                                        <input type="text" className="input"></input>
                                    </div>
                                    <div className="container">
                                        <div className="text">휴대전화</div>
                                        <input type="tel" className="input"></input>
                                    </div>
                                    <div className="container">
                                        <div className="text">배송지 주소</div>
                                        <div type="text" className="input" style={{width:"245px"}}>{isAddress}</div>
                                        <button onClick={ChangePost}>주소 찾기</button>
                                    </div>
                                    {
                                        isDaumPost?
                                        <DaumPostcode 
                                        autoClose
                                        onComplete={handleComplete}
                                        style={postCodeStyle}
                                        height={300}
                                        Address={isAddress}
                                        ZoneCode={isZoneCode}/>:null
                                    }
                                    <div className="address">{isZoneCode}</div>
                                    <div className="address"></div>
                                </div>
                                }
                            </div>
                            <div>
                            </div>
                        </div>
                    </main>
                    {Div===1&&
                    <footer>
                        <button className="close" onClick={ChangeDiv3()}>수정</button>
                    </footer>
                    }
                    {Div===2&&
                    <footer>
                    <button className="close" onClick={close}> 추가 </button>
                    </footer>
                    }
                    {Div===3&&
                    <footer>
                        <button className="close" onClick={close}>저장</button>    
                    </footer>}
                </section>
            ) : null }
        </div>
    )
}

export default DeliveryModal;