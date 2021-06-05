import React, {useState,useCallback} from 'react';
import styled from "styled-components";
import axios from "axios";
import InputWithLabel from "../Register/InputWithLabel";
import AuthButton from "./AuthButton";

import {useGlobalDispatch} from "../GlobalContext";
const Box = styled.div `
display:block;
width:500px;
margin:0 auto;
  margin-top: 50px;
margin-bottom: 100px;
`;
const Title = styled.div `
text-align: center;
width:500px;
display:block;
font-size: 30px;
margin-bottom: 50px;
`


function Login ({history}) {
    const [id, setId] = useState("");
    const [pw, setPw] = useState("");

    const dispatch=useGlobalDispatch();
    const onToggle=useCallback(()=>{
        dispatch({
            type:"TOGGLE_USER"
        });
    },[dispatch]);

    const idChangeHandler = (e) => {
        setId(e.currentTarget.value);
    }
    const pwChangeHandler = (e) => {
        setPw(e.currentTarget.value);
    }
    const submitHandler = () => {

        const data = {
            id: id,
            password: pw
        }
        axios({
            url: '/api/users/login',
            method: 'post',
            data
        })
            .then(res => {
                //redux로 가져올 경우 payload, axios로 바로 가져올 경우 data
                if(res.data.loginSuccess&&!res.data.isAdmin){
                    onToggle();
                    history.push('/client');
                    alert(`${res.data.userName}님 환영합니다`);
                } 
                else if(res.data.loginSuccess&&res.data.isAdmin){
                    onToggle();
                    history.push('/admin');
                } else {
                    alert('로그인 실패');
                }
        });
    }
    return (
        <Box>
            <Title>로그인</Title>
            <InputWithLabel label="아이디" name="id" placeholder="아이디" value={id} onChange={idChangeHandler}/>
            <InputWithLabel label="비밀번호" name="password" placeholder="비밀번호" type="password" value={pw} onChange={pwChangeHandler}/>
            <AuthButton onClick={submitHandler}>로그인</AuthButton>
            <a href="/client/register"><AuthButton style={{background:"#ff7777",color:"white"}}>회원가입</AuthButton></a>
        </Box>
    );
}

export default Login;