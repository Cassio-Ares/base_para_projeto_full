import * as React from "react";
import { BarChart } from "@mui/x-charts/BarChart";
import { axisClasses } from "@mui/x-charts";
import { useEffect, useState } from "react";
import axios from "axios";

export const Chart = () => {
  const [transacoes, setTransacoes] = useState([]);
  const [transacoesChart, setTransacoesChart] = useState([]);
  const [anos, setAnos] = useState(["todos"]);
  const [ano, setAno] = useState("");
  const [dataset, setDataSet] = useState([]);

  const chartSetting = {
    height: 400,
    sx: {
      [`.${axisClasses.left} .${axisClasses.label}`]: {
        transform: "translate(-20px, 0)",
      },
    },
  };

  const valueFormatter = (value) => `${value / 100}R$`;

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
        setTransacoesChart(response.data.data);

        const anos = response.data.data
          .map((transacao) => new Date(transacao.data).getFullYear())
          .filter((ano, index, anos) => anos.indexOf(ano) === index)
          .sort((a, b) => a - b);
        setAnos(["todos", ...anos]);

        const dataYear = [];

        for (const transacao of response.data.data) {
          const ano = new Date(transacao.data).getFullYear();
          dataYear[ano] = dataYear[ano] ?? {};
          if (transacao.tipo === "Receita") {
            dataYear[ano].receita = dataYear[ano].receitas
              ? (dataYear[ano].receita += transacao.valor)
              : transacao.valor;
          }
          if (transacao.tipo === "Despesa") {
            dataYear[ano].despesa = dataYear[ano].despesa
              ? (dataYear[ano].despesa += transacao.valor)
              : transacao.valor;
          }
        }

        const dataset = [];
        dataYear.forEach((item, index) => {
          dataset.push({
            ano: index,
            receita: item.receita ?? 0,
            despesa: item.despesa ?? 0,
          });
        });

        setDataSet(dataset);
      } catch (error) {
        console.log(`Error: ${error}`);
      }
    };
    getTransacoes();
  });

  return (
    <>
    {dataset.length && <BarChart
        dataset={dataset}
        xAxis={[{ scaleType: "band", dataKey: "Ano" }]}
        series={[
          { dataKey: "Receita", label: "Receita", valueFormatter },
          { dataKey: "Despesa", label: "Despesa", valueFormatter },
        ]}
        {...chartSetting}
      /> }
    </>
  );
};

export default Chart;
