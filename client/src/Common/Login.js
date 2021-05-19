import React from "react";
import styled from "styled-components"

const LoginButton=styled.button`
    background-color:#ff7777;
    border:none;
    border-radius:10px;
    color:white;
    width:80px;
    margin-right:10px;
    cursor:pointer;
`;


const Box=styled.div`
display:inline-flex;
`;
function Login(){
    return(
        <Box>
        <LoginButton>로그인</LoginButton>
        <LoginButton>회원가입</LoginButton>
        </Box>
    );
}

export default Login