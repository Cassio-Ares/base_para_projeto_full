"use client";

import * as S from "./style.jsx";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

const LoginForm = () => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const router = useRouter()

  const[showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };


  const [notification, setNotification] = useState({
    open: false,
    message: "",
    severity: "",
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
        severity: "success",
      });
      router.push('/dashboard')
    } catch (error) {
      setNotification({
        open: true,
        message: error.response.data.error,
        severity: "error",
      });
    }
  };

  const handleClose = () => {
    setNotification({
      open: false,
      message: "",
      severity: "",
    });
  };

  return (
    <>
      <S.Form>
        <S.Typography
          variant="h1"
          color="primary"
          style={{ marginBottom: "64px" }}
        >
          YOURfinance.IO
        </S.Typography>
        <S.TextField
          type="email"
          name="email"
          label="Digite o seu email cadastrado"
          variant="outlined"
          color="primary"
          onChange={onChangeValue}
          fullWidth
        />
         <S.FormControl  variant="outlined"  fullWidth>
          <S.InputLabel htmlFor="Digite sua senha">
          "Digite sua senha"
          </S.InputLabel>
          <S.OutlinedInput
            id="outlined-adornment-password"
             name="password"
            onChange={onChangeValue}
            type={showPassword ? "text" : "password"}
            endAdornment={
              <S.InputAdornment position="end">
                <S.IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {showPassword ? <S.VisibilityOff /> : <S.Visibility />}
                </S.IconButton>
              </S.InputAdornment>
            }
            label="Password"
          />
        </S.FormControl>
        <S.Button
          onClick={onSubmit}
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
        >
          Login
        </S.Button>
        <S.Link href="/register">Criar conta</S.Link>
      </S.Form>

      <S.Snackbar
        open={notification.open}
        autoHideDuration={6000}
        onClose={handleClose}
      >
        <S.Alert variant="filled" severity={notification.severity}>
          {notification.message}
        </S.Alert>
      </S.Snackbar>
    </>
  );
};

export default LoginForm;
