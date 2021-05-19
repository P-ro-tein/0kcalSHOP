import React from "react";
import styled from "styled-components";

import Search from "./Search";
import Login from "./Login";

const BoxCategory=styled.div`
width:1200px;
display:flex;
margin:0 auto;
`;

const ContainerCategory=styled.div`
width:550px;
height:130px;
padding-left:100px;
padding-top:15px;

`;

const ContainerLogin=styled.div`
    width:250px;
    height:50px;
    padding:30px;
`;



function Category(){
    return(
        <BoxCategory>
            <div style={{width:'200px'}}></div>
            <ContainerCategory>
                <Search />
            </ContainerCategory>
            <ContainerLogin>
                <Login />
            </ContainerLogin>
        </BoxCategory>
    );
}

export default Category;