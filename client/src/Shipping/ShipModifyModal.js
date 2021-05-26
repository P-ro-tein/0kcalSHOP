import React, { useState,useEffect} from 'react';

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
    const [Address, setAddress] = useState({});
    const [SelectAddress,setSelectAddress]=useState(0);



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
        if(response.data.success) {
            setAddress(response.data.shipAddrInfo)
            setSelect(response.data.shipAddrInfo[1].shipAddrName);
        }})
        .catch();
    }, []);

    const changeRadioQ1 = (e) => {
        setSelect(e.target.value);
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
            if(Address[i].shipAddrName===Q1)
            {
                setSelectAddress(i);
            }
        }
        setDiv(false);
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
                                {Div===true&&
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
                                {Div===false &&
                                <div className="newbox">
                                    <div className="container">
                                    <div className="text">배송지 이름</div>
                                    <input type="text" className="input" placeholder={Address[SelectAddress].shipAddrName}></input>
                                    </div>
                                    <div className="container">
                                        <div className="text">수령인</div>
                                        <input type="text" className="input" placeholder={Address[SelectAddress].shipAddrRecipient}></input>
                                    </div>
                                    <div className="container">
                                        <div className="text">휴대전화</div>
                                        <input type="num" className="input" placeholder={Address[SelectAddress].contactNumber}></input>
                                    </div>
                                    <div className="container">
                                        <div className="text">배송지 주소</div>
                                        <input type="text" className="input" placeholder={Address[SelectAddress].shipAddrDetail[0]} value={isAddress}></input>
                                        <button onClick={ChangePost}>찾기</button>
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
                                    <input className="address" type="text" placeholder={Address[SelectAddress].shipAddrDetail[1]} value={isZoneCode}></input>
                                    <input className="address" type="text" placeholder={Address[SelectAddress].shipAddrDetail[2]}></input>
                                </div>
                                
                                }
                            </div>
                            <div>
                            </div>
                        </div>
                    </main>
                    {Div===true&&
                    <footer>
                        <button className="close" onClick={modify}>수정</button>
                        <button className="close" onClick={close}>닫기</button> 
                    </footer>
                    }
                    {Div===false&&
                    <footer>
                        <button className="close" onClick={save}>저장</button> 
                        <button className="close" onClick={close}>닫기</button>    
                    </footer>}
                </section>
            ) : null }
        </div>
    )
}

export default DeliveryModal;