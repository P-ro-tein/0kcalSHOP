import React, { useState } from 'react';
import "./Modal.css";


const Modal = ( props ) => {
    const { open, close, header } = props;
    const [Select,setSelect]=useState(false);

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
                                <div class="_text">배송지 목록</div><div class="_text">신규 배송지</div>
                                </div>
                                <div class="newbox">
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
                                        <input type="text" class="input" style={{width:"245px"}}></input>
                                        <button>주소 찾기</button>
                                    </div>
                                    <div class="address">공릉로 232 미래관 304호</div>
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

export default Modal;