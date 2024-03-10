"use client";

import { useState, useEffect } from "react";
import * as S from "./style.jsx";
import axios from "axios";

export const MetaUpdate = ({ metaId }) => {
  const [descricao, setDescricao] = useState();
  const [valor, setValor] = useState();
  const [dataMeta, setDataMeta] =useState();
  const [userId, setUserId] = useState();
  const [notification, setNotification] = useState({
    open: false,
    message: "",
    severity: "",
  });


  useEffect(() => {
    const getMeta = async () => {
      try {
        const token = localStorage.getItem("token");
        await axios.get(`http://localhost:8080/meta/${metaId}`),
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          };
   
        setDescricao(response.data.data.descricao)
        setValor(response.data.data.valor)
        setDataMeta(response.data.data.data)
        setUserId(response.data.data.user_id)
      } catch (error) {
        setNotification({
          open: true,
          message: error.response.data.message,
          severity: "error",
        });
      }
    };
   
    getMeta()
  }, [metaId]);

  const onChangeValue = (e) => {
    const { name, value } = e.target;
    if (name === "descricao") setDescricao(value);
    if (name === "valor") setValor(value);
    if (name === "dataMeta") setDataMeta(value);
  }

  const onSubmit = async (e) => {
    e.preventDefault();
    console.log(meta);
    // try {
    //   const response = await axios.put(`http://localhost:8080/metas/${metaId}`, {
    //      descricao, valor, data: dataMeta, user_id: userId
    //   });
    //   localStorage.getItem("token", response.data.data.token);
    //   setNotification({
    //     open: true,
    //     message: `Meta ${ descricao} atualizada com sucesso.`,
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
      <S.H1>Alterar meta</S.H1>
      <S.TextField
        type="text"
        name="descricao"
        value={descricao}
        label="Cadastre uma descrição da sua meta"
        variant="outlined"
        color="primary"
        onChange={onChangeValue}
        fullWidth
      />
      <S.TextField
        type="text"
        name="valor"
        value={ valor}
        label="Cadastre uma valor"
        variant="outlined"
        color="primary"
        onChange={onChangeValue}
        fullWidth
      />
      <S.TextField
        type="text"
        name="dataMeta"
        value={dataMeta}
        label="Cadastre a data da para meta"
        variant="outlined"
        color="primary"
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
    
    <S.Snackbar open={notification.open} autoHideDuration={3000} onChange={handleClose}>
        <S.Alert onChange={handleClose} severity={notification.severity} variant="filled" sx={{ width: "100%"}}>
               {notification.message}
        </S.Alert>
    </S.Snackbar>
    
    </>
  );
};

export default MetaUpdate;
