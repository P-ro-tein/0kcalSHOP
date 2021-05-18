import React, { useState } from 'react';
import InputWithLabel from './InputWithLabel';
import AuthButton from './AuthButton';
import styled from 'styled-components';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Box = styled.div `
display:block;
width:500px;
margin:0 auto;
margin-bottom: 100px;
`;
const Title = styled.div `
text-align: center;
width:500px;
display:block;
font-size: 30px;
margin-bottom: 50px;
`
function RegisterForm () {
    const [id, setId] = useState("");
    const [pw, setPw] = useState("");
    const [pwC, setPwC] = useState("");

    const idChangeHandler = (e) => {
        setId(e.currentTarget.value);
    }
    const pwChangeHandler = (e) => {
        setPw(e.currentTarget.value);
    }

    const pwCChangeHandler = (e) => {
        setPwC(e.currentTarget.value);
    }

    const submitHandler = () => {
        
        const data = {
            id: id,
            password: pw,
            
        }
        axios({
            url: '/api/users/register',
            method: 'post',
            data
        })
        .then(res => {
            //redux로 가져올 경우 payload, axios로 바로 가져올 경우 data
            if(res.data.success){
                console.log(res.data.success);
            } else { 
                console.log(res.data.err);
            }
        });
    }
    return (
            <Box>
                <Title>회원가입</Title>
                <InputWithLabel label="이름" name="name" placeholder="이름"/>
                <InputWithLabel label="이메일" name="email" placeholder="이메일"/>
                <InputWithLabel label="아이디" name="id" placeholder="아이디" value={id} onChange={idChangeHandler}/>
                <InputWithLabel label="비밀번호" name="password" placeholder="비밀번호" type="password" value={pw} onChange={pwChangeHandler}/>
                <InputWithLabel label="비밀번호 확인" name="passwordConfirm" placeholder="비밀번호 확인" type="password" value={pwC} onChange={pwCChangeHandler}/>
                <InputWithLabel label="전화번호" name="phone" placeholder="전화번호" type="tel"/>
                <InputWithLabel label="생년월일" name="" placeholder="생년월일" type="date"/>
                <AuthButton onClick={submitHandler}>회원가입</AuthButton>
                <Link to="/register/done">링크</Link>
            </Box>
        );
}

export default RegisterForm;