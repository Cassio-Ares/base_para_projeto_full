"use client";

import { useState, useEffect } from "react";
import * as S from "./style.jsx";
import axios from "axios";

export const TrasacoesCreate = () => {
  const [descricao, setDescricao] = useState();
  const [valor, setValor] = useState();
  const [tipo, setTipo] = useState( );
  const [dataTransacao, setDataTransacao] = useState();
  const [categorias, setCategorias] = useState([]);
  const [categoria, setCategoria] = useState('');

  const [notification, setNotification] = useState({
    open: false,
    message: "",
    severity: "",
  });

  const onChangeValue = (e) => {
    const { name, value } = e.target;
    if (name === "descricao") setDescricao(value);
    if (name === "valor") setValor(value);
    if (name === "tipo") setTipo(value);
    if (name === "dataTransacao") setDataTransacao(value);
    if (name === "categoria") setCategoria(value);
  };

  useEffect(() => {
    const getCategorias = async ()=>{
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get('http://localhost:8080/categorias', {
          headers: {
            authorization: `Bearer ${token}`
          }
        })

        setCategorias(response.data.data);

      } catch (error) {
      setNotification({
          open: true,
          message: error.response.data.message,
          severity: "error",
        });
      }
    }
  }, [])
  

  const onSubmit = async (e) => {
    e.preventDefault();
    // try {
    //   const response = await axios.get("http://localhost:8080/transacoes", {
    //     descricao, valor,  tipo, data: dataTransacao, categoria_id: categoria
    //   });
    //   localStorage.getItem("token", response.data.data.token);
    //   setNotification({
    //     open: true,
    //     message: `Transação ${descricao} cadastrada com sucesso.`,
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
        <S.H1>Criar meta</S.H1>
        <S.TextField
          type="text"
          name="descricao"
          label="Cadastre os detalhes da transação"
          variant="outlined"
          color="primary"
          onChange={onChangeValue}
          fullWidth
        />
        <S.TextField
          type="text"
          name="valor"
          label="Cadastre uma valor"
          variant="outlined"
          color="primary"
          onChange={onChangeValue}
          fullWidth
        />

        <S.TextField
          type="text"
          name="dataTransacao"
          label="Cadastre a data da transação"
          variant="outlined"
          color="primary"
          onChange={onChangeValue}
          fullWidth
        />
        <S.Box sx={{ minWidth: 120 }}>
          <S.FormControl fullWidth>
            <S.InputLabel id="demo-simple-select-label">Categoria</S.InputLabel>
            <S.Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={categoria}
              name="categoria"
              label="Age"
              onChange={onChangeValue}
            >
              {categorias.map((categoria)=>{
                <S.MenuItem key={categoria.id} value={categoria.id}>{categoria.name}</S.MenuItem>
              })}
              

            </S.Select>
          </S.FormControl>
        </S.Box>
        <S.Box sx={{ minWidth: 120 }}>
          <S.FormControl fullWidth>
            <S.InputLabel id="tipo">Tipo</S.InputLabel>
            <S.Select
              labelId="tipo"
              id="tipo"    
              name="tipo"
              value={ tipo }
              label="Tipo"
              onChange={onChangeValue}
            >
              <S.MenuItem value="despesa">Despesa</S.MenuItem>
              <S.MenuItem value="receita">Receita</S.MenuItem>
            </S.Select>
          </S.FormControl>
        </S.Box>
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

export default TrasacoesCreate;
