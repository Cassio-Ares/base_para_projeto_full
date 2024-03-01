"use client";

import * as S from "./style.jsx";
import { useState } from "react";
import axios from "axios";

const LoginForm = () => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const [ notification, setNotification] = useState({
    open: false,
    message: '',
    severity: '',
  });

  const onChangeValue = (e) => {
    const { name, value } = e.target;
    if (name === "email") setEmail(value);
    if (name === "password") setPassword(value);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8080/auth/login", {
        email,
        password,
      });
      localStorage.setItem("token", response.data.data.token);
      setNotification({
        open: true,
        message: `Bem-vindo usuario do e-mail ${email}`,
        severity: "success"
      });
    } catch (error) {
      setNotification({
        open: true,
        message: error.response.data.error,
        severity: "error"
      });
    }
  };

  const handleClose = () =>{
    setNotification({
      open: false,
      message: '',
      severity: '',
    });
  }

  return (
    <>
      <S.Form>
        <S.H1>Login Form</S.H1>
        <S.TextField
          type="email"
          name="email"
          label="Digite o seu email cadastrado"
          variant="outlined"
          color="primary"
          onChange={onChangeValue}
          fullWidth
        />
        <S.TextField
          type="password"
          name="password"
          label="Digite sua senha"
          variant="outlined"
          color="primary"
          onChange={onChangeValue}
          fullWidth
        />
        <S.Button
          onClick={onSubmit}
          type="submit"
          variant="outlined"
          color="success"
        >
          Enviar
        </S.Button>
      </S.Form>
      <S.Snackbar open={notification.open} autoHideDuration={6000} onClose={handleClose}>
        <S.Alert variant="filled" severity={notification.severity}>
          {notification.message}
        </S.Alert>
      </S.Snackbar>
    </>
  );
};

export default LoginForm;
