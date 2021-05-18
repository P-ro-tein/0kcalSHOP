import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.button`
    margin-top: 1rem;
    padding-top: 0.6rem;
    padding-bottom: 0.5rem;

    background: #ff7777;
    color: white;
    width: 500px;
    text-align: center;
    font-size: 1.25rem;
    font-weight: 500;

    cursor: pointer;
    user-select: none;
    transition: .2s all;

    &:hover {
        background: #ff8181;
    }

    &:active {
        background: #d95f5f;
    }

`;

const AuthButton = ({children, ...rest}) => (
    <Wrapper {...rest}>
        {children}
    </Wrapper>
);

export default AuthButton;