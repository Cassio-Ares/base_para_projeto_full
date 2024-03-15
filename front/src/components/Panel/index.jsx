"use client";

import Grid from "@mui/material/Grid";
import Card from "../Cards";

import { useEffect, useState } from "react";
import axios from "axios";

import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import SwapHorizIcon from "@mui/icons-material/SwapHoriz";
import LocalAtmIcon from '@mui/icons-material/LocalAtm';
import AdsClickIcon from '@mui/icons-material/AdsClick';

export const Panel = () => {
   const [somatorio, setSomatorio] = useState({
    saldo: 0,
    receita: 0,
    despesa: 0
   })

   const [metas, setMetas] = useState([]);
   
  
  useEffect(() => {
    const getTransacoes = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("http://localhost:8080/transacoes", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const somatorio = {};

        for (const transacao of response.data.data) {
          if (transacao.tipo === "Receita") {
            somatorio.receita = somatorio.receitas
              ? somatorio.receita += transacao.valor
              : transacao.valor;
          }
          if (transacao.tipo === "Despesa") {
            somatorio.despesa = somatorio.despesa
              ? somatorio.despesa += transacao.valor
              : transacao.valor;
          }
        }

        somatorio.Saldo = somatorio.receita - somatorio.despesa;

        setSomatorio(somatorio)
      } catch (error) {
        console.log(`Error: ${error}`);
      }
    };
    getTransacoes();
  });


  useEffect(() => {
    const getMetas = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("http://localhost:8080/metas", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setMetas(response.data.data)
      } catch (error) {
        console.log(`Error: ${error}`);
      }
    };
    getMetas();
  });
  


  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <Card label="Saldo Atual" valor={`R$ ${somatorio.saldo / 100}`}>
            <AccountBalanceWalletIcon />
          </Card>
          <Card label="Receitas" valor={`R$ ${somatorio.receita / 100}`}>
            <LocalAtmIcon/>
          </Card>
        </Grid>
        <Grid item xs={6}>
          <Card label="Despesas" valor={`R$ ${somatorio.despesa / 100}`}>
             < SwapHorizIcon />
          </Card>
          <Card label="Metas" valor="" isMeta  metas={metas} saldo={somatorio.saldo}>
            <AdsClickIcon/>
          </Card>
        </Grid>
      </Grid>
    </>
  );
};

export default Panel;
