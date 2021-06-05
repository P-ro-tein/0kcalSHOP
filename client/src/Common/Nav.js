import React from "react";
import styled from "styled-components";

const BoxHeader=styled.div`
    width:100%;
    height:100px;
    background:#ff7777;
`;

const ContainerHeader=styled.div`
    width:1280px;
    height:100%;
    margin:0 auto;
    vertical-align:middle;
`;

const Logo=styled.div`
margin-left:40px;
height:100%;
font-family: Lora;
font-style: normal;
font-weight: bold;
font-size: 44px;
line-height: 82px;
`;

function Nav(){
    return(
        <BoxHeader>
            <ContainerHeader>
                <Logo>0kcal Shop</Logo>
            </ContainerHeader>
        </BoxHeader>

    );
}

export default Nav;