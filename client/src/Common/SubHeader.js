import React, {useState, useEffect} from "react";
import styled from "styled-components";
import axios from "axios";
import Search from "./Search";
import Login from "./Login";
import UserInfo from "./UserInfo";
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



function SubHeader(){

    const [User, setUser]=useState({});

    useEffect(() => {
        axios.get('/api/users/auth')
        .then(response=>{
            setUser(response.data);
        }
    )},[])
    return(
        <BoxCategory>
            <div style={{width:'200px'}}></div>
            <ContainerCategory>
                <Search />
            </ContainerCategory>
            <ContainerLogin>
                {
                    User.isAuth?
                    <UserInfo/>:<Login />
                }
            </ContainerLogin>
        </BoxCategory>
    );
}

export default SubHeader;