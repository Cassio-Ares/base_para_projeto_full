"use client";

import * as S from "./style.jsx";
import { useState } from "react";
import axios from "axios";

const LoginForm = () => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const onChangeValue = (e) => {
    const { name, value} = e.target;
    if(name === 'email') setEmail(value);
    if(name === 'password') setPassword(value);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    console.log(email)
   try {
     const response = await axios.post('http://localhost:8080/auth/login', { email, password });
     localStorage.setItem('token', response.data.data.token);
     console.log('response', response);
   } catch (error) {
     console.log(error)
   }
  };

  return (
    <form>
      <S.H1>Login Form</S.H1>
      <S.TextField
        type="email"
        name="email"
        label="Digite o seu email cadastrado"
        variant="outlined"
        color="primary"
        onChange={onChangeValue}
      />
      <S.TextField
        type="password"
        name="password"
        label="Digite sua senha"
        variant="outlined"
        color="primary"
        onChange={onChangeValue}
      />
      <S.Button
        onClick={onSubmit}
        type="submit"
        variant="outlined"
        color="success"
      >
        Enviar
      </S.Button>
    </form>
  );
};

export default LoginForm;
