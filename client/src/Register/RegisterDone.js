import React from 'react';
import styled from 'styled-components';
const Box = styled.div `
display:block;
width:500px;
margin:0 auto;
margin-bottom: 100px;
font-size: 100px;
background-color: #000000;
`;
function RegisterDone () {
    return (
        <Box>
            회원가입 완료
        </Box>
    );
}

export default RegisterDone;