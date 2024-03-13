"use client";

import { useState, useEffect, forwardRef } from "react";
import * as S from "./style.jsx";
import axios from "axios";

import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";

import { NumericFormat } from "react-number-format";

import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFnsV3";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { formatISO } from "date-fns";
import { ptBR } from "date-fns/locale";

const NumericFormatCustom = forwardRef(function NumericFormatCustom(
  props,
  ref
) {
  const { onChange, ...other } = props;

  return (
    <NumericFormat
      {...other}
      getInputRef={ref}
      onValueChange={(values) => {
        onChange({
          target: {
            name: props.name,
            value: values.value,
          },
        });
      }}
      thousandSeparator="."
      decimalSeparator=","
      valueIsNumericString
      prefix="R$ "
    />
  );
});

export const TrasacoesCreate = ({ openModal, closeModal }) => {
  const [descricao, setDescricao] = useState();
  const [valor, setValor] = useState();
  const [tipo, setTipo] = useState();
  const [dataTransacao, setDataTransacao] = useState(new Date());
  const [categorias, setCategorias] = useState([]);
  const [categoria, setCategoria] = useState("");
  const [open, setOpen] = useState(false);

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
    if (name === "categoria") setCategoria(value);
  };

  useEffect(() => {
    const getCategorias = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("http://localhost:8080/categorias", {
          headers: {
            authorization: `Bearer ${token}`,
          },
        });

        setCategorias(response.data.data);
      } catch (error) {
        setNotification({
          open: true,
          message: error.response.data.message,
          severity: "error",
        });
      }
    };
  }, []);

  const onSubmit = async (e) => {
    e.preventDefault();
    // try {
    //   const response = await axios.get("http://localhost:8080/transacoes", {
    //     descricao, valor * 100,  tipo, data: formatISO(dataTransacao, { representation: 'date', locale: ptBR}), categoria_id: categoria
    // 
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

      <Dialog open={open} onClose={handleCloseModal}>
        <DialogTitle>
          <S.Typography
            variant="h1"
            color="primary"
            style={{ marginBottom: "25px" }}
          >
            Criar Transação
          </S.Typography>
        </DialogTitle>
        <DialogContent>
          <S.Form>
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
              label="Cadastre uma valor"
              onChange={onChangeValue}
              name="valor"
              id="formatted-numberformat-input"
              InputProps={{
                inputComponent: NumericFormatCustom,
              }}
              variant="outlined"
              fullWidth
            />

            <S.Box sx={{ minWidth: 300 }} >
              <S.FormControl fullWidth>
                <S.InputLabel id="demo-simple-select-label">
                  Categoria
                </S.InputLabel>
                <S.Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={categoria}
                  name="categoria"
                  label="Age"
                  onChange={onChangeValue}
                >
                  {categorias.map((categoria) => {
                    <S.MenuItem key={categoria.id} value={categoria.id}>
                      {categoria.name}
                    </S.MenuItem>;
                  })}
                </S.Select>
              </S.FormControl>
            </S.Box>

            <S.Box sx={{ minWidth: 300 }}>
              <S.FormControl fullWidth>
                <S.InputLabel id="tipo">Tipo</S.InputLabel>
                <S.Select
                  labelId="tipo"
                  id="tipo"
                  name="tipo"
                  value={tipo}
                  label="Tipo"
                  onChange={onChangeValue}
                >
                  <S.MenuItem value="despesa">Despesa</S.MenuItem>
                  <S.MenuItem value="receita">Receita</S.MenuItem>
                </S.Select>
              </S.FormControl>
            </S.Box>

            <LocalizationProvider
              dateAdapter={AdapterDateFns}
              adapterLocale={ptBR}
            >
              <DatePicker
                name="dataMeta"
                variant="outlined"
                //value={ dataMeta}
                onChange={(newValue) => setDataTransacao(newValue)}
                sx={{ minWidth: 300 }}
                fullWidth              />
            </LocalizationProvider>
          </S.Form>
        </DialogContent>
        <DialogActions
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <S.Button
            onClick={handleCloseModal}
            variant="outlined"
            color="primary"
          >
            Cancel
          </S.Button>
          <S.Button
            type="Submit"
            variant="contained"
            color="primary"
            onClick={onSubmit}
          >
            Salvar
          </S.Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default TrasacoesCreate;
