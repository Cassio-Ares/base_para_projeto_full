"use client";

import { useState } from "react";
import * as S from "./style.jsx";
import Icon from "@mui/material/Icon";

export const Card = ({ label, valor, children, isMeta, metas= [], saldo = 0}) => {
const [ meta, setMeta ] = useState(null) 
const [metaCalculated, setMetaCalculated] = useState()

  const onChangeValue = (e) => {
    const { name, value } = e.target;
    if (name === "meta") setMeta(value);
  };

  return (
    <S.ChartContainer>
      <S.IconWrapper>
        <Icon sx={{ color: "#fff" }}>{children}</Icon>
      </S.IconWrapper>

      <S.Contente>
        <S.Contente>{label}</S.Contente>
        {!isMeta && <S.Contente style={{ fontWeight: 600 }}>{valor}</S.Contente>}
        {isMeta && <S.Contente style={{ fontWeight: 600 }}>{`${(((meta - saldo) / meta)* 100).toFixed(0)} %`}</S.Contente>}
      </S.Contente>
      {isMeta && (
        <S.FormControl fullWidth>
          <S.InputLabel id="meta">Meta</S.InputLabel>
          <S.Select
            labelId="meta"
            id="meta"
            name="meta"
            value={meta}
            label="Meta"
            onChange={onChangeValue}
          >
            {metas.map((meta)=>{
              return <S.MenuItem key={meta.id} value={meta.id}>{meta.descricao}</S.MenuItem>
            })}
          </S.Select>
        </S.FormControl>
      )}
    </S.ChartContainer>
  );
};

export default Card;
