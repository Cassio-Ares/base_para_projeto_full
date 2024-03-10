"use client";

import { useState, useEffect } from "react";
import * as S from "./style.jsx";
import axios from "axios";


import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";

export const CategoriaCreate = ({ openModal, closeModal }) => {
  const [categoria, setCategoria] = useState();
  const [open, setOpen] = useState(false);

  const [notification, setNotification] = useState({
    open: false,
    message: "",
    severity: "",
  });

  const onChangeValue = (e) => {
    const { name, value } = e.target;
    if (name === "categoria") setCategoria(value);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    // try {
    //   const response = await axios.get("http://localhost:8080/categorias", {
    //     categoria,
    //   });
    //   localStorage.getItem("token", response.data.data.token);
    //   setNotification({
    //     open: true,
    //     message: `Categoria ${categoria} cadastrada com sucesso.`,
    //     severity: "sucess",
    //   });
    //   handleCloseModal()
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

  useEffect(() => {
    if (openModal) {
      setOpen(true);
    }
  }, [openModal]);

  const handleCloseModal = () => {
    setOpen(false);
    closeModal(false);
  };

  return (
    <>
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

      <Dialog
        open={open}
        onClose={handleCloseModal}
      >
        <DialogTitle>
        <S.Typography
          variant="h1"
          color="primary"
          style={{ marginBottom: "25px" }}
        >
         Nova Categoria
        </S.Typography>
           
        </DialogTitle>
        <DialogContent>
          <S.Form>
              <S.TextField
                type="text"
                name="categoria"
                Label="Cadastre uma categoria"
                variant="outlined"
                color="primary"
                onChange={onChangeValue}
                fullWidth
              />
            </S.Form>
        </DialogContent>
        <DialogActions style={{display: 'flex', alignItems: 'center', justifyContent: 'center' }} >
          <S.Button onClick={handleCloseModal} variant="outlined" color="primary">
            Cancel
          </S.Button>
          <S.Button type="Submit"  variant="contained"  color="primary"  onClick={onSubmit} >
                Salvar
              </S.Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default CategoriaCreate;
