"use client";

import { useState } from "react";
import * as S from "./style.jsx";
import axios from "axios";

const RegisterForm = () => {
  const [name, setName]= useState();
  const [email, setEmail] = useState();
 const [password, setPassword] = useState();

 const [notification, setNotification] = useState({
  open: false,
  message: '',
  severity: ''

 });

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
      setNotification({
        open: true,
        message: `Usuario com e-mail ${email} cadastrado com sucesso.`,
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

  const handleClose = (_, reason) => {
    if(reason === 'clickaway'){
      return
    }
    setNotification({
      open: false,
      message: '',
      severity: ''
     });
  };



  return (
    <>
    <S.Form >
      <S.H1>Formulario de cadastro</S.H1>
      <S.TextField
        type="text"
        name="name"
        label="Digite o seu nome completo"
        variant="outlined"
        color="primary"
        onChange={onChangeValue}
        fullWidth
      />
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
      <S.Button onClick={onSubmit} type="submit"  variant="outlined">
        Enviar
      </S.Button>
    </S.Form>
      <S.Snackbar open={notification.open} autoHideDuration={3000} onClose={handleClose}>
         <S.Alert variant="filled" severity={notification.severity}>
              {notification.message}
          </S.Alert>
      </S.Snackbar>
    </>
  );
};

export default RegisterForm;
