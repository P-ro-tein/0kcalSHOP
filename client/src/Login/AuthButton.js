import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.button`
    margin-top: 1rem;
    padding-top: 0.6rem;
    padding-bottom: 0.5rem;

    background: white;
    color: #ff7777;
    border:#ff7777 1px solid;
    width: 520px;
    text-align: center;
    font-size: 1.25rem;
    font-weight: 500;

    cursor: pointer;
    user-select: none;
    transition: .2s all;

    &:hover {
        background: #;
    }

    &:active {
        background: #;
    }

`;

const AuthButton = ({children, ...rest}) => (
    <Wrapper {...rest}>
        {children}
    </Wrapper>
);

export default AuthButton;