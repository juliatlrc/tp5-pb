import React, { useState } from "react";
import { Bar, Line } from "react-chartjs-2";
import { Container, Typography, TextField, MenuItem, Box } from "@mui/material";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

// Exemplo de dados de cotações
const cotacoes = [
  { id: 1, nomeEmpresa: "Empresa A", produto: "Produto 1", preco: 150.0 },
  { id: 2, nomeEmpresa: "Empresa B", produto: "Produto 1", preco: 120.0 },
  { id: 3, nomeEmpresa: "Empresa C", produto: "Produto 2", preco: 300.0 },
  { id: 4, nomeEmpresa: "Empresa D", produto: "Produto 1", preco: 180.0 },
  { id: 5, nomeEmpresa: "Empresa E", produto: "Produto 2", preco: 250.0 },
];

// Lista de produtos disponíveis
const produtosDisponiveis = [
  ...new Set(cotacoes.map((cotacao) => cotacao.produto)),
];

const GraficosCotacoes = () => {
  const [produtoSelecionado, setProdutoSelecionado] = useState(
    produtosDisponiveis[0]
  );

  // Filtra as cotações com base no produto selecionado
  const cotacoesFiltradas = cotacoes.filter(
    (cotacao) => cotacao.produto === produtoSelecionado
  );

  // Prepara os dados para o gráfico de barras
  const dataBarras = {
    labels: cotacoesFiltradas.map((cotacao) => cotacao.nomeEmpresa),
    datasets: [
      {
        label: `Preços de ${produtoSelecionado}`,
        data: cotacoesFiltradas.map((cotacao) => cotacao.preco),
        backgroundColor: "rgba(255, 159, 64, 0.8)", // Laranja suave com transparência
        borderColor: "rgba(255, 99, 132, 1)",
        borderWidth: 1,
        hoverBackgroundColor: "rgba(255, 159, 64, 0.6)", // Cor ao passar o mouse
        hoverBorderColor: "rgba(255, 99, 132, 1)",
      },
    ],
  };

  // Prepara os dados para o gráfico de linhas (comparação de preços)
  const dataLinhas = {
    labels: cotacoesFiltradas.map((cotacao) => cotacao.nomeEmpresa),
    datasets: [
      {
        label: `Preço de ${produtoSelecionado}`,
        data: cotacoesFiltradas.map((cotacao) => cotacao.preco),
        fill: true,
        backgroundColor: "rgba(54, 162, 235, 0.2)", // Cor de fundo azul com transparência
        borderColor: "rgba(54, 162, 235, 1)", // Cor da linha
        pointBackgroundColor: "rgba(54, 162, 235, 1)", // Cor dos pontos
        pointBorderColor: "#fff", // Cor da borda dos pontos
        pointHoverBackgroundColor: "#fff", // Cor dos pontos ao passar o mouse
        pointHoverBorderColor: "rgba(54, 162, 235, 1)", // Cor da borda dos pontos ao passar o mouse
        tension: 0.4, // Suavização da linha
      },
    ],
  };

  // Configurações gerais para os gráficos
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
        labels: {
          color: "#333", // Cor da legenda
        },
      },
      tooltip: {
        backgroundColor: "rgba(0, 0, 0, 0.7)", // Cor de fundo do tooltip
        titleColor: "#fff", // Cor do título no tooltip
        bodyColor: "#fff", // Cor do corpo do tooltip
        borderColor: "#fff", // Cor da borda do tooltip
        borderWidth: 1,
      },
    },
    scales: {
      x: {
        ticks: {
          color: "#333", // Cor das labels no eixo x
        },
      },
      y: {
        ticks: {
          color: "#333", // Cor das labels no eixo y
        },
      },
    },
  };

  return (
    <Container maxWidth="md" sx={{ mt: 5 }}>
      <Typography variant="h4" align="center" gutterBottom>
        Gráficos de Cotações
      </Typography>

      {/* Campo de seleção do produto */}
      <TextField
        select
        label="Selecione o Produto"
        value={produtoSelecionado}
        onChange={(e) => setProdutoSelecionado(e.target.value)}
        fullWidth
        margin="normal"
      >
        {produtosDisponiveis.map((produto) => (
          <MenuItem key={produto} value={produto}>
            {produto}
          </MenuItem>
        ))}
      </TextField>

      <Box sx={{ mt: 4 }}>
        <Typography variant="h6" align="center">
          Gráfico de Barras - Cotações por Empresa
        </Typography>
        <Bar data={dataBarras} options={options} />
      </Box>

      <Box sx={{ mt: 6 }}>
        <Typography variant="h6" align="center">
          Gráfico de Linhas - Comparação de Preços
        </Typography>
        <Line data={dataLinhas} options={options} />
      </Box>
    </Container>
  );
};

export default GraficosCotacoes;
