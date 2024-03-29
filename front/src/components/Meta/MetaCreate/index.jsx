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
import { ptBR } from 'date-fns/locale'

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

export const MetaCreate = ({ openModal, closeModal }) => {
  const [descricao, setDescricao] = useState();
  const [valor, setValor] = useState();
  const [dataMeta, setDataMeta] = useState( new Date());
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
    //if (name === "dataMeta") setDataMeta(value);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    // try {
    //   const response = await axios.get("http://localhost:8080/metas", {
    //     descricao, valor: valor * 100, data: formatISO(dataMeta, { representation: 'date', locale: ptBR})
    //   });
    //   localStorage.getItem("token", response.data.data.token);
    //   setNotification({
    //     open: true,
    //     message: `Meta ${descricao} cadastrada com sucesso.`,
    //     severity: "sucess",
    //   });
    //      handleCloseModal()
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
            Criar meta
          </S.Typography>
        </DialogTitle>
        <DialogContent>
          <S.Form>
            <S.TextField
              type="text"
              name="descricao"
              label="Cadastre uma descrição para meta"
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
            <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={ ptBR }>
              <DatePicker
                name="dataMeta"
                variant="outlined"
                //value={ dataMeta}
                onChange={(newValue) => setDataMeta(newValue)}
                fullWidth
              />
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

export default MetaCreate;
