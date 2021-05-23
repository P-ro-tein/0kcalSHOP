import React, { useState } from 'react';
import "./DeliveryModal.css";
import DaumPostcode from 'react-daum-postcode';


export const Modal = ( props ) => {
    const { open, close, header} = props;
    const [Q1,setSelect]=useState("delivery0");
    const [Div,setDiv]=useState(1); 
    const [isDaumPost,SetDaumPost]=useState(false);
    const [isAddress, setIsAddress] = useState("");
    const [isZoneCode, setIsZoneCode] = useState();

    const postCodeStyle = {
        display: "block",
        position: "absolute",
        top:"150px",
        right:"-10px",
        zIndex: "100",
        padding: "7px"
      }

    const ChangeDiv1=()=>{
            setDiv(1);
            console.log(Div);
    };
    const ChangeDiv2=()=>{
        setDiv(2);
        console.log(Div);
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
                        <div class="box">
                            <div class="container">
                                <div class="text"> 현재 배송지</div>
                                <div style={{display:"block"}}>
                                    <div class="dstination">집</div>
                                    <div class="destination">공릉로 232 미래관 304호</div>
                                </div>
                            </div>
                            <div>
                                <div style={{display:'inline-flex'}}>
                                <button class="_text" onClick={ChangeDiv1}>배송지 목록</button><button class="_text" onClick={ChangeDiv2}>신규 배송지</button>
                                </div>
                                { Div===2 &&<div class="newbox">
                                    <div class="container">
                                    <div class="text">배송지 이름</div>
                                    <input type="text" class="input"></input>
                                    </div>
                                    <div class="container">
                                        <div class="text">수령인</div>
                                        <input type="text" class="input"></input>
                                    </div>
                                    <div class="container">
                                        <div class="text">휴대전화</div>
                                        <input type="tel" class="input"></input>
                                    </div>
                                    <div class="container">
                                        <div class="text">배송지 주소</div>
                                        <div type="text" class="input" style={{width:"245px"}}>{isAddress}</div>
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
                                    <div class="address">{isZoneCode}</div>
                                    <div class="address"></div>
                                </div>}
                                {Div===1&&
                                <div class="newbox">
                                    <div style={{paddingBottom:"10px"}}>
                                    <label htmlFor="delivery">
                                        <input type="radio" id="delivery0" name="delivery0" value="delivery0" checked={Q1 === "delivery0" ? true : false} onChange={changeRadioQ1}></input>
                                        [현재배송지]집<div style={{paddingTop:"10px",paddingLeft:"22px"}}>(공릉로 232 미래관 304호)</div>
                                    </label>
                                    </div>
                                    <div style={{paddingBottom:"10px"}}>
                                    <label htmlFor="delivery">
                                        <input type="radio" id="delivery1" name="delivery1" value="delivery1" checked={Q1 === "delivery1" ? true : false} onChange={changeRadioQ1}></input>
                                        delivery1<div style={{paddingTop:"10px",paddingLeft:"22px"}}>(저기도 저기시 저기동)</div>
                                    </label>
                                    </div>
                                    <div style={{paddingBottom:"10px"}}>
                                    <label htmlFor="delivery">
                                        <input type="radio" id="delivery2" name="delivery2" value="delivery2" checked={Q1 === "delivery2" ? true : false} onChange={changeRadioQ1}></input>
                                        delivery2
                                        <div style={{paddingTop:"10px",paddingLeft:"22px"}}>(여기도 여기시 여기동)</div>
                                    </label>
                                    </div>
                                    <div style={{paddingBottom:"10px"}}>
                                    <label htmlFor="delivery">
                                        <input type="radio" id="delivery3" name="delivery3" value="delivery3" checked={Q1 === "delivery3" ? true : false} onChange={changeRadioQ1}></input>
                                        delivery3
                                        <div style={{paddingTop:"10px",paddingLeft:"22px"}}>(거기도 거기시 거기동)</div>
                                    </label>
                                    </div>
                                </div>}
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

export default Modal;