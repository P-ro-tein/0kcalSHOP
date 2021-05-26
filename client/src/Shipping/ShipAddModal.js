import React, { useState,useEffect} from 'react';

import axios from "axios";
import '../AllCss.css'
import DaumPostcode from 'react-daum-postcode';


const DeliveryModal = ( props ) => {
    const { open, close, header} = props;
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
                                <div style={{display:"block"}}>
                                    <div className="dstination">집</div>
                                    <div className="destination">공릉로 232 미래관 304호</div>
                                </div>
                            </div>
                            <div>
                                <div style={{display:'inline-flex'}}>
                                <button className="_text">신규 배송지</button>
                                </div>
                                <div className="newbox">
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
                                        <input type="text" className="input" style={{width:"245px"}} value={isAddress}></input>
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
                                    <input type="text" className="address" value={isZoneCode}></input>
                                    <input type="text" className="address"></input>
                                </div>
                            </div>
                            <div>
                            </div>
                        </div>
                    </main>
                    <footer>
                    <button className="close" onClick={close}> 추가 </button>
                    </footer>
                </section>
            ) : null }
        </div>
    )
}

export default DeliveryModal;