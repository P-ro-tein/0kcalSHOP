import React, { Component } from 'react';
import InputWithLabel from './InputWithLabel';
import AuthButton from './AuthButton';
import styled from 'styled-components';
import axios from 'axios';

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
const submit = ()=>{
    axios({
        url: 'http://localhost:9000/register',
        method: 'post',
        data: {
            
        }
    })
}
class Register extends Component {
    render() {
        return (
            <Box>
                <Title>회원가입</Title>
                <InputWithLabel label="이름" name="name" placeholder="이름"/>
                <InputWithLabel label="이메일" name="email" placeholder="이메일"/>
                <InputWithLabel label="아이디" name="id" placeholder="아이디"/>
                <InputWithLabel label="비밀번호" name="password" placeholder="비밀번호" type="password"/>
                <InputWithLabel label="비밀번호 확인" name="passwordConfirm" placeholder="비밀번호 확인" type="password"/>
                <InputWithLabel label="전화번호" name="phone" placeholder="전화번호" type="tel"/>
                <InputWithLabel label="생년월일" name="" placeholder="생년월일" type="date"/>
                <AuthButton onClick={submit}>회원가입</AuthButton>
            </Box>
        );
    }
}

export default Register;