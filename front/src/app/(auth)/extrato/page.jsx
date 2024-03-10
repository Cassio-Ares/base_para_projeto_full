"use client";

import axios from "axios";
import { useState, useEffect } from "react";
import * as S from "./style.jsx";
import CategoriaCreate from "@/components/Categorias/CategoriaCreate";
import MetaCreate from "@/components/Meta/MetaCreate";

export const ExtratoPage = () => {
  const [user, setUser] = useState({
    id: null,
  });

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
        <S.Button type="submit" variant="contained" color="primary">
          Nova Tansação
        </S.Button>
        <S.Button type="submit" variant="contained" color="primary"  onClick={()=> setOpenModalCategoria(true)}>
          Nova Categoria
        </S.Button>
        <S.Button type="submit" variant="contained" color="primary"  onClick={()=> setOpenModalMeta(true)}>
          Nova Meta
        </S.Button>
      </S.Div>
      <CategoriaCreate openModal={openModalCatogoria} closeModal={setOpenModalCategoria}/>
      <MetaCreate openModal={openModalMeta} closeModal={setOpenModalMeta} />
    </>
  );
};

export default ExtratoPage;
