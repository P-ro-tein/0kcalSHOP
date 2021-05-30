import React from "react";
import styled from "styled-components"

const LoginButton=styled.button`
    height:75px;
    width:60px;
    background-color:#ff7777;
    border:none;
    border-radius:10px;
    color:white;
`;

const Input=styled.input`
    width:150px;
    height:25px;
    margin-bottom:10px;
`;

function Login(){
    return(
         <form action="" method="POST" >
            <div style={{display:"inline-flex",border:'1px solid #ff7777', padding:'10px 10px 0 10px'}}>
            <div>
            <Input type="text"placeholder="아이디"></Input>    
            <Input type="password" placeholder="비밀번호"></Input>
            </div>
            <div>
            <LoginButton type="submit">로그인</LoginButton>
            </div>
            </div>
        </form>  
    );
}

export default Login