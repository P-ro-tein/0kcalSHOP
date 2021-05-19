import React from 'react';
import styled from 'styled-components';
import {Link} from 'react-router-dom';
const Box = styled.div `
display:block;
width:500px;
margin:0 auto;
margin-bottom: 100px;
font-size: 100px;
background-color: #818181;
text-align: center;
`;
function RegisterDone () {
    return (
        <Box>
            회원가입 완료
            <Link to="/">메인으로 돌아가기</Link>
        </Box>
    );
}

export default RegisterDone;