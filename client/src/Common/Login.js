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
            <a href="/client/login"><LoginButton>로그인</LoginButton></a>
            <a href="/client/register"><LoginButton>회원가입</LoginButton></a>
        </Box>
    );
}

export default Login