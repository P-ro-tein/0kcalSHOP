import React, {useCallback} from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import axios from "axios";
import Search from "./Search";

import {useGlobalDispatch,useGlobalState} from "../GlobalContext";

const BoxCategory=styled.div`
width:1200px;
display:flex;
margin:0 auto;
`;

const ContainerCategory=styled.div`
width:550px;
height:100px;
padding-left:100px;
padding-top:15px;

`;

const ContainerLogin=styled.div`
    width:250px;
    height:50px;
    padding:30px;
`;

const LoginButton=styled.button`
    background-color:#ff7777;
    border:none;
    border-radius:10px;
    color:white;
    width:80px;
    margin-right:10px;
    cursor:pointer;
`;


const Box=styled.div`
display:inline-flex;
`;

function SubHeader(){

    const state=useGlobalState();
    const Active=state.user;
    const dispatch=useGlobalDispatch();
    const onToggle=useCallback(()=>{
        dispatch({
            type:"TOGGLE_USER"
        });
    },[dispatch]);

    const logoutHandler = () => {

        axios.get('/api/users/logout')
            .then(response=>{
                if(response.data.success){
                    alert('로그아웃');
                    onToggle();
                }
            });
    }
    return(
        <BoxCategory>
            <div style={{width:'200px'}}></div>
            <ContainerCategory>
                <Search />
            </ContainerCategory>
            <ContainerLogin>
                {
                    Active===true&&
                    <Box>
                        <a href="/client/cart"><LoginButton>장바구니</LoginButton></a>
                        <Link to="/client">
                        <LoginButton onClick={logoutHandler}>로그아웃</LoginButton>
                        </Link>
                     </Box>
                }
                { 
                    Active===false&&
                    <Box>
                        <a href="/client/login"><LoginButton>로그인</LoginButton></a>
                        <a href="/client/register"><LoginButton>회원가입</LoginButton></a>
                    </Box>
                }
            </ContainerLogin>
        </BoxCategory>
    );
}

export default SubHeader;