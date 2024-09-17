import React, { useState } from "react";
import {
  Container,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TablePagination,
} from "@mui/material";
import GraficosCotacoes from "./grafico";

// Exemplo de dados de cotações
const cotacoes = [
  {
    id: 1,
    nomeEmpresa: "Empresa A",
    nomeFuncionario: "João Silva",
    preco: 150.0,
    produto: "Produto 1",
  },
  {
    id: 2,
    nomeEmpresa: "Empresa B",
    nomeFuncionario: "Maria Souza",
    preco: 200.0,
    produto: "Produto 2",
  },
  {
    id: 3,
    nomeEmpresa: "Empresa C",
    nomeFuncionario: "Carlos Pereira",
    preco: 175.5,
    produto: "Produto 3",
  },
  {
    id: 4,
    nomeEmpresa: "Empresa D",
    nomeFuncionario: "Ana Costa",
    preco: 220.0,
    produto: "Produto 4",
  },
  {
    id: 5,
    nomeEmpresa: "Empresa E",
    nomeFuncionario: "Roberto Lima",
    preco: 300.0,
    produto: "Produto 5",
  },
  {
    id: 6,
    nomeEmpresa: "Empresa F",
    nomeFuncionario: "Laura Martins",
    preco: 180.0,
    produto: "Produto 6",
  },
  {
    id: 7,
    nomeEmpresa: "Empresa G",
    nomeFuncionario: "Bruno Alves",
    preco: 160.0,
    produto: "Produto 7",
  },
  {
    id: 8,
    nomeEmpresa: "Empresa H",
    nomeFuncionario: "Fernanda Oliveira",
    preco: 210.0,
    produto: "Produto 8",
  },
  {
    id: 9,
    nomeEmpresa: "Empresa I",
    nomeFuncionario: "José Santos",
    preco: 130.0,
    produto: "Produto 9",
  },
  {
    id: 10,
    nomeEmpresa: "Empresa J",
    nomeFuncionario: "Patrícia Gomes",
    preco: 270.0,
    produto: "Produto 10",
  },
  // Adicione mais dados conforme necessário
];

const Home = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5); // Quantidade de itens por página

  // Calcula os dados da página atual
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // Dados que serão exibidos na página atual
  const cotacoesPaginadas = cotacoes.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  return (
    <Container maxWidth="md" sx={{ mt: 5 }}>
      <Typography variant="h4" align="center" gutterBottom>
        Cotações Recentes
      </Typography>

      <TableContainer component={Paper}>
        <Table aria-label="tabela de cotações">
          <TableHead>
            <TableRow>
              <TableCell>
                <strong>Nome da Empresa</strong>
              </TableCell>
              <TableCell>
                <strong>Pessoa que Cotou</strong>
              </TableCell>
              <TableCell>
                <strong>Produto</strong>
              </TableCell>
              <TableCell>
                <strong>Preço</strong>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {cotacoesPaginadas.map((cotacao) => (
              <TableRow key={cotacao.id}>
                <TableCell>{cotacao.nomeEmpresa}</TableCell>
                <TableCell>{cotacao.nomeFuncionario}</TableCell>
                <TableCell>{cotacao.produto}</TableCell>
                <TableCell>R$ {cotacao.preco.toFixed(2)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Componente de Paginação */}
      <TablePagination
        component="div"
        count={cotacoes.length} // Total de itens
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        labelRowsPerPage="Itens por página"
        rowsPerPageOptions={[5, 10, 15]} // Opções de quantidade de itens por página
      />
      <GraficosCotacoes />
    </Container>
  );
};

export default Home;
