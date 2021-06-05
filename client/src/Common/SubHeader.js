import React, { useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import axios from "axios";
import Search from "./Search";

import { useGlobalDispatch, useGlobalState } from "../GlobalContext";

const BoxCategory = styled.div`
  width: 1200px;
  height: 130px;
  margin: 0 auto;
  padding-top: 10px;
`;

const Logo = styled.div`
  width: 900px;
  padding-top: 30px;
  font-family: "HY헤드라인M";
  font-size: 50px;
  font-weight: bold;
`;
const Container = styled.div`
  width: 300px;
  height: 50px;
  text-align: right;
`;

const LoginButton = styled.button`
  background: none;
  color: black;
  border: none;
  width: 70px;
  cursor: pointer;
  font-size: 12px;
`;

const CartButton = styled.button`
  background: none;
  color: black;
  border: none;
  width: 90px;
  cursor: pointer;
  font-size: 12px;
`;

function SubHeader() {
  const state = useGlobalState();
  const Active = state.user;
  const Active2 = state.num;

  const dispatch = useGlobalDispatch();
  const [CartQuantity, setCartQuantity] = useState(Active2);

  const onToggle = useCallback(() => {
    dispatch({
      type: "TOGGLE_USER",
    });
  }, [dispatch]);

  const logoutHandler = () => {
    axios.get("/api/users/logout").then((response) => {
      if (response.data.success) {
        console.log("여기는 subheader.js입니당");
        alert("로그아웃");
        onToggle();
      }
    });
  };

  useEffect(() => {
    axios.get("/api/users/auth").then((response) => {
      if (response.data.isAuth) {
        setCartQuantity(response.data.cart.length);
        if (!Active) onToggle();
      }
    });
  }, [Active, Active2, onToggle]);

  return (
    <BoxCategory>
      <div style={{ display: "flex" }}>
        <Link to="/client" className="link">
          <Logo>
            <span style={{ color: "#ff7777" }}>0</span>kcalShop
          </Logo>
        </Link>
        <Container>
          <div>
            {Active === true && (
              <>
                <a href="/client/cart">
                  <CartButton>장바구니({CartQuantity})</CartButton>
                </a>
                <span>|</span>
                <a href="/client/order">
                  <LoginButton>주문내역</LoginButton>
                </a>
                <span>|</span>
                <Link to="/client">
                  <LoginButton onClick={logoutHandler}>로그아웃</LoginButton>
                </Link>
              </>
            )}
            {Active === false && (
              <>
                <a href="/client/login">
                  <LoginButton>로그인</LoginButton>
                </a>
                <span>|</span>
                <a href="/client/register">
                  <LoginButton>회원가입</LoginButton>
                </a>
              </>
            )}
          </div>
          <Search />
        </Container>
      </div>
    </BoxCategory>
  );
}

export default SubHeader;
