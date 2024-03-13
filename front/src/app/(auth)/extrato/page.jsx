"use client";

import axios from "axios";
import { useState, useEffect } from "react";
import * as S from "./style.jsx";
import CategoriaCreate from "@/components/Categorias/CategoriaCreate";
import MetaCreate from "@/components/Meta/MetaCreate";
import TrasacoesCreate from "@/components/Transacoes/TransacoesCreate";
import TransacoesList from "@/components/Transacoes/TransacoesList/index.jsx";

export const ExtratoPage = () => {
  const [user, setUser] = useState({
    id: null,
  });

  const [openModalTransacao, setOpenModalTrasancao] = useState(false)
  const [openModalCatogoria, setOpenModalCategoria] = useState(false)
  const [openModalMeta, setOpenModalMeta] = useState(false)

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      window.location.href = "/login";
    }

    axios
      .get("http://localhost:8080/users/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then()
      .catch(() => {
        window.location.href = "/login";
      });
  });

  return (
    <>
      <S.Div>
        <S.Button type="submit" variant="contained" color="primary" onClick={()=> setOpenModalTrasancao(true)}>
          Nova Tansação
        </S.Button>
        <S.Button type="submit" variant="contained" color="primary"  onClick={()=> setOpenModalCategoria(true)}>
          Nova Categoria
        </S.Button>
        <S.Button type="submit" variant="contained" color="primary"  onClick={()=> setOpenModalMeta(true)}>
          Nova Meta
        </S.Button>
      </S.Div>
      < TrasacoesCreate openModal={openModalTransacao} closeModal={setOpenModalTrasancao}/>
      <CategoriaCreate openModal={openModalCatogoria} closeModal={setOpenModalCategoria}/>
      <MetaCreate openModal={openModalMeta} closeModal={setOpenModalMeta} />
      <TransacoesList/>
    </>
  );
};

export default ExtratoPage;
