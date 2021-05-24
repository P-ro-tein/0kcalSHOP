import React from "react";
import styled from "styled-components";
import axios from 'axios';
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
function UserInfo ({history}) {
    const logoutHandler = () => {
        axios.get('api/users/logout')
            .then(response=>{
                if(response.success){
                    alert('로그아웃 되었습니다');
                    history.push('/client');
                }
            })
            .catch(err => alert(err))
    }
    return(
        <Box>
        <a href="/login"><LoginButton>마이페이지</LoginButton></a>
        <a href="/login"><LoginButton>장바구니</LoginButton></a>
        <LoginButton onClick={logoutHandler}>로그아웃</LoginButton>
        </Box>
    );
}

export default UserInfo;