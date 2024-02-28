"use client";

import { useState } from "react";
import * as S from "./style.jsx";
import axios from "axios";

const RegisterForm = () => {
  const [name, setName]= useState();
  const [email, setEmail] = useState();
 const [password, setPassword] = useState();

  const onChangeValue = (e) => {
    const {name, value} = e.target;
     if(name === "name") setName(value);
    if(name === "email") setEmail(value);
    if(name === "password") setPassword(value);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8080/auth/register', { name, email, password });
      localStorage.setItem('token', response.data.data.token);
    } catch (error) {
      console.log(error)
    }
  };

  return (
    <form >
      <S.H1>Formulario de cadastro</S.H1>
      <S.TextField
        type="text"
        name="name"
        label="Digite o seu nome completo"
        variant="outlined"
        color="primary"
        onChange={onChangeValue}
      />
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
      <S.Button onClick={onSubmit} type="submit"  variant="outlined">
        Enviar
      </S.Button>
    </form>
  );
};

export default RegisterForm;
