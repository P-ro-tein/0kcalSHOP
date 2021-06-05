import React, { useState, useCallback } from "react";
import axios from "axios";
import InputWithLabel from "./InputWithLabel";
import AuthButton from "./AuthButton";
import styled from "styled-components";
import { useGlobalDispatch } from "../GlobalContext";
import AlertBox from "./AlertBox";
const Box = styled.div`
  display: block;
  width: 500px;
  margin: 0 auto;
  margin-top: 50px;
  margin-bottom: 100px;
`;
const Title = styled.div`
  text-align: center;
  width: 500px;
  display: block;
  font-size: 30px;
  margin-bottom: 50px;
`;

function Register(props) {
  const [id, setId] = useState("");
  const [idAvailable, setIdAvailable] = useState(true);
  const [emailAvailable, setEmailAvailable] = useState(true);
  const [passwordAvailable, setPasswordAvailable] = useState(true);
  const [passwordCAvailable, setPasswordCAvailable] = useState(true);
  const [pw, setPw] = useState("");
  const [pwC, setPwC] = useState("");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const dispatch = useGlobalDispatch();
  const onToggle = useCallback(() => {
    dispatch({
      type: "TOGGLE_USER",
    });
  }, [dispatch]);
  const idChangeHandler = (e) => {
    setId(e.currentTarget.value);
    checkId(e.currentTarget.value);
  };
  const pwChangeHandler = (e) => {
    setPw(e.currentTarget.value);
    checkPassword(e.currentTarget.value);
  };

  const pwCChangeHandler = (e) => {
    setPwC(e.currentTarget.value);
    checkPasswordC(pw, e.currentTarget.value);
  };
  const emailChangeHandler = (e) => {
    setEmail(e.currentTarget.value);
    checkEmail(e.currentTarget.value);
  };
  const nameChangeHandler = (e) => {
    setName(e.currentTarget.value);
  };
  const login = () => {
    axios
      .post("/api/users/login", {
        id: id,
        password: pw,
      })
      .then((res) => {
        if (res.data.loginSuccess && !res.data.isAdmin) {
          onToggle();
          console.log("여기는 Register.js에 if문입니당");
          props.history.push("/client");
        } else if (res.data.loginSuccess && res.data.isAdmin) {
          onToggle();
          console.log("여기는 Register.js에 else if문입니당");
          props.history.push("/admin");
        } else {
          alert("로그인 실패");
        }
      });
  };
  const checkPassword = (pwProp) => {
    const regExp = /^(?=.*\d)(?=.*[a-zA-Z])[0-9a-zA-Z]{8,12}$/;
    setPasswordAvailable(regExp.test(pwProp));
  };
  const checkPasswordC = (pwProp, pwCProp) => {
    setPasswordCAvailable(pwProp === pwCProp);
  };
  const checkEmail = (emailProp) => {
    axios
      .post("/api/users/checkEmail", {
        email: emailProp,
      })
      .then((response) => {
        setEmailAvailable(response.data.available);
      });
  };
  const checkId = (idProp) => {
    axios
      .post("/api/users/checkId", {
        id: idProp,
      })
      .then((response) => {
        setIdAvailable(response.data.available);
      });
  };
  const submitHandler = () => {
    if (
      idAvailable &&
      emailAvailable &&
      passwordAvailable &&
      passwordCAvailable
    ) {
      const data = {
        id: id,
        password: pw,
        email: email,
        name: name,
      };

      axios({
        url: "/api/users/register",
        method: "post",
        data,
      }).then((res) => {
        if (res.data.success) {
          alert("가입완료");
          login();
        } else {
          alert("가입할 수 없습니다");
          console.log(res.data.err);
        }
      });
    } else {
      alert("아이디 또는 이메일 확인해주세요");
    }
  };
  return (
    <Box>
      <Title>회원가입</Title>
      <InputWithLabel
        label="이름"
        name="name"
        placeholder="이름"
        value={name}
        onChange={nameChangeHandler}
      />
      <InputWithLabel
        label="이메일"
        name="email"
        placeholder="이메일"
        value={email}
        onChange={emailChangeHandler}
      />
      <AlertBox available={emailAvailable}>이미 사용중인 이메일입니다</AlertBox>
      <InputWithLabel
        label="아이디"
        name="id"
        placeholder="아이디"
        value={id}
        onChange={idChangeHandler}
      />
      <AlertBox available={idAvailable}>이미 사용중인 아이디입니다</AlertBox>
      <InputWithLabel
        label="비밀번호"
        name="password"
        placeholder="비밀번호"
        type="password"
        value={pw}
        onChange={pwChangeHandler}
      />
      <AlertBox available={passwordAvailable}>8~15자 영문, 숫자 조합</AlertBox>
      <InputWithLabel
        label="비밀번호 확인"
        name="passwordConfirm"
        placeholder="비밀번호 확인"
        type="password"
        value={pwC}
        onChange={pwCChangeHandler}
      />
      <AlertBox available={passwordCAvailable}>일치하지 않습니다</AlertBox>
      <InputWithLabel
        label="전화번호"
        name="phone"
        placeholder="전화번호"
        type="tel"
      />
      <InputWithLabel
        label="생년월일"
        name=""
        placeholder="생년월일"
        type="date"
      />
      <AuthButton onClick={submitHandler}>회원가입</AuthButton>
    </Box>
  );
}

export default Register;
