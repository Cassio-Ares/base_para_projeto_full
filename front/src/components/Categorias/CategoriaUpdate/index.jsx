"use client";

import { useState, useEffect } from "react";
import * as S from "./style.jsx";
import axios from "axios";

export const CategoriaUpdate = ({ categoriaId }) => {
  const [categoria, setCategoria] = useState();
  const [ userId, setUserId] = useState();

  const [notification, setNotification] = useState({
    open: false,
    message: "",
    severity: "",
  });

  useEffect(() => {
    const getCategoria = async () => {
      try {
        const token = localStorage.getItem("token");
        await axios.get(`http://localhost:8080/categoria/${categoriaId}`),
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          };
   
        setCategoria(response.data.data.nome)
        setUserId(response.data.data.user_id)
      } catch (error) {
        setNotification({
          open: true,
          message: error.response.data.message,
          severity: "error",
        });
      }
    };
   
    getCategoria()
  }, [categoriaId]);

  const onChangeValue = (e) => {
    const { name, value } = e.target;
    if (name === "categoria") setCategoria(value);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    console.log(categoria);
    // try {
    //   const response = await axios.put(`http://localhost:8080/categorias/${categoriaId}`, {
    //     categoria, user_id: userId 
    //   });
    //   localStorage.getItem("token", response.data.data.token);
    //   setNotification({
    //     open: true,
    //     message: `Categoria ${categoria} atualizada com sucesso.`,
    //     severity: "sucess",
    //   });
    // } catch (error) {
    //     setNotification({
    //         open: true,
    //         message: error.message.data.error,
    //         severity: "error",
    //       });
    // }
  };

  const handleClose = (_, reason) => {
    if (reason === "clickaway") {
      return;
    }
  };
  return (
    <>
      <S.Form>
        <S.H1>Atualizar Categoria</S.H1>
        <S.TextField
          type="text"
          name="categoria"
          Label="Cadastre uma categoria"
          variant="outlined"
          color="primary"
          value= {categoria}
          onChange={onChangeValue}
          fullWidth
        />
        <S.Button
          type="Submit"
          variant="outlined"
          color="success"
          onClick={onSubmit}
        >
          Cadastrar
        </S.Button>
      </S.Form>

      <S.Snackbar
        open={notification.open}
        autoHideDuration={3000}
        onChange={handleClose}
      >
        <S.Alert
          onChange={handleClose}
          severity={notification.severity}
          variant="filled"
          sx={{ width: "100%" }}
        >
          {notification.message}
        </S.Alert>
      </S.Snackbar>
    </>
  );
};

export default CategoriaUpdate;
