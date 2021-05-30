import React from 'react';
import styled from 'styled-components';

const Alert = styled.div`
font-size: 10px;
color: red;
`;
const AlertBox = ({available,children}) => {
    return (
       available?<span></span>:<Alert>{children}</Alert>
    );
}

export default AlertBox
