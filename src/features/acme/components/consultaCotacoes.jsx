import React, { useState } from "react";
import {
  TextField,
  Container,
  Typography,
  Box,
  Button,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const acmeTheme = createTheme({
  palette: {
    primary: {
      main: "#ff6f00",
    },
    secondary: {
      main: "#004d40",
    },
  },
  typography: {
    h4: {
      fontWeight: 700,
      color: "#ff6f00",
    },
  },
});

// Exemplo de dados de cotações e produtos (substitua por dados reais de uma API)
const cotacoes = [
  { produtoId: 1, dataCotacao: "2024-01-10", preco: 150.0 },
  { produtoId: 1, dataCotacao: "2024-02-15", preco: 155.0 },
  { produtoId: 2, dataCotacao: "2024-01-20", preco: 200.0 },
];

const produtosDisponiveis = [
  { id: 1, nome: "Produto 1" },
  { id: 2, nome: "Produto 2" },
];

const ConsultaCotacoes = () => {
  const [produtoId, setProdutoId] = useState("");
  const [cotacoesFiltradas, setCotacoesFiltradas] = useState([]);

  const handleChange = (e) => {
    setProdutoId(e.target.value);
  };

  const handleConsulta = () => {
    const resultado = cotacoes.filter(
      (cotacao) => cotacao.produtoId === parseInt(produtoId)
    );
    setCotacoesFiltradas(resultado);
  };

  return (
    <ThemeProvider theme={acmeTheme}>
      <Container
        maxWidth="md"
        sx={{ mt: 5, p: { xs: 2, md: 5 }, boxShadow: 3, borderRadius: 2 }}
      >
        <Typography variant="h4" align="center" gutterBottom>
          Consulta de Cotações por Produto
        </Typography>

        <TextField
          select
          label="Produto"
          value={produtoId}
          onChange={handleChange}
          fullWidth
          required
          margin="normal"
        >
          {produtosDisponiveis.map((produto) => (
            <option key={produto.id} value={produto.id}>
              {produto.nome}
            </option>
          ))}
        </TextField>

        <Button
          variant="contained"
          color="primary"
          fullWidth
          sx={{ mt: 2 }}
          onClick={handleConsulta}
        >
          Consultar Cotações
        </Button>

        <Box sx={{ mt: 4 }}>
          <List>
            {cotacoesFiltradas.length === 0 ? (
              <Typography variant="body1" align="center">
                Nenhuma cotação encontrada para o produto selecionado.
              </Typography>
            ) : (
              cotacoesFiltradas.map((cotacao, index) => (
                <ListItem key={index}>
                  <ListItemText
                    primary={`Data: ${
                      cotacao.dataCotacao
                    } - Preço: R$ ${cotacao.preco.toFixed(2)}`}
                  />
                </ListItem>
              ))
            )}
          </List>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default ConsultaCotacoes;
