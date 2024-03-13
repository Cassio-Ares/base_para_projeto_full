"use client";

import * as S from "./style.jsx";
import { useEffect, useState } from "react";
import axios from "axios";

import { formatISO, compareAsc } from "date-fns";
import { ptBR } from "date-fns/locale";

export const TransacoesList = () => {
  const [transacoes, setTransacoes] = useState([]);
  const [transacoesTable, setTransacoesTable] = useState([]);
  const [tipo, setTipo] = useState("Todas");
  const [anos, setAnos] = useState(['todos']);
  const [ano, setAno] = useState("");

  useEffect(() => {
    const getTransacoes = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("http://localhost:8080/transacoes", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setTransacoes(response.data.data);
        setTransacoesTable(response.data.data);

        const anos = response.data.data
          .map((transacao) => new Date(transacao.data).getFullYear())
          .filter((ano, index, anos) => anos.indexOf(ano) === index)
          .sort((a, b) => a - b);
        setAnos([
          'todos',
          ...anos,
        ]);
     

      } catch (error) {
        setNotification({
          open: true,
          message: error.response.data.message,
          severity: "error",
        });
      }
    };
    getTransacoes();
  });

  useEffect(() => {
   if(ano === 'todos'){
      if(tipo === 'Todos'){
        setTransacoes(transacoes);
      }
      if(tipo === 'Receitas'){
        const receitas = transacoes.filter((transacao) => transacao.tipo === 'Receitas');
        setTransacoes(receitas);
      }
      if(tipo === 'Despesas'){
        const despesas = transacoes.filter((transacao) => transacao.tipo === 'Despesas')
        setTransacoes(despesas);
      }
   }else{
     if(tipo === 'todos'){
      const todos = transacoes.filter((transacao) => new Date(transacao.data).getFullYear() === Number(ano))
      setTransacoes(todos)
     }
     if(tipo === 'Receitas'){
       const receita = transacoes.filter((transacao) => new Date(transacao.data).getFullYear() === Number(ano))
       setTransacoes(receita)
     }
     if(tipo === 'Despesas'){
       const despesas = transacoes.filter((transacao) => new Date(transacao.data).getFullYear() === Number(ano))
       setTransacoes(despesas)
     }
   }
  }, [tipo, transacoes, ano]);

  const onAnosChange = (e) =>{
    e.preventDefault();
   if(name === 'ano') setAnos(value)
  }

  return (
    <>
      <S.Div>
        <div onClick={() => setTipo("Todas")}>Todas transacões</div>
        <div onClick={() => setTipo("Receitas")}>Receita</div>
        <div onClick={() => setTipo("Despesas")}>Despesas</div>
      </S.Div>
      <div>
        <S.FormControl>
          <S.InputLabel id="anos">Anos</S.InputLabel>
          <S.Select
            labelId="Anos"
            id="anos"
            name="ano"
            value={ ano }
            label="Anos"
            onChange={ onAnosChange }
          >
           {anos.map((ano)=>{
              <S.MenuItem key={ano} value={ano}>{ano}</S.MenuItem>
            })
              }
            
          </S.Select>
        </S.FormControl>
      </div>

      <S.TableContainer component={S.Paper}>
        <S.Table sx={{ minWidth: 650 }} aria-label="simple table">
          <S.TableHead>
            <S.TableRow>
              <S.TableCell>Descrição</S.TableCell>
              <S.TableCell align="right">Trasação</S.TableCell>
              <S.TableCell align="right">Data</S.TableCell>
              <S.TableCell align="right">Situação</S.TableCell>
              <S.TableCell align="right">Valor&nbsp;(R$)</S.TableCell>
            </S.TableRow>
          </S.TableHead>
          <S.TableBody>
            {transacoesTable.map((transacao) => (
              <S.TableRow
                key={transacoes.descricao}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <S.TableCell component="th" scope="row">
                  {transacao.descricao}
                </S.TableCell>
                <S.TableCell align="right">{transacao.tipo}</S.TableCell>
                <S.TableCell align="right">
                  {formatISO(new Date(transacao.data), "d MMM, yyyy", {
                    representation: "date",
                    locale: ptBR,
                  })}
                </S.TableCell>
                <S.TableCell align="right">
                  {compareAsc(new Date(), new Date(transacao.data)) === 1
                    ? "Realizada"
                    : "Planejada"}
                </S.TableCell>
                <S.TableCell align="right">
                  R$ {transacao.valor / 100}
                </S.TableCell>
              </S.TableRow>
            ))}
          </S.TableBody>
        </S.Table>
      </S.TableContainer>
    </>
  );
};

export default TransacoesList;
