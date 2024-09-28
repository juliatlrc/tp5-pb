import React, { useState, useEffect } from "react";
import {
  TextField,
  Container,
  Typography,
  Box,
  Button,
  List,
  ListItem,
  ListItemText,
  MenuItem,
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { collection, query, where, getDocs } from "firebase/firestore"; // Importa o Firestore completo
import { db } from "../../firebase/config"; // Importa o Firestore

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

const ConsultaCotacoes = () => {
  const [produto, setProduto] = useState("");
  const [cotacoesFiltradas, setCotacoesFiltradas] = useState([]);
  const [produtos, setProdutos] = useState([]);

  // Função para buscar os produtos cadastrados no Firebase
  const fetchProdutos = async () => {
    const produtosCollection = collection(db, "produtos"); // Referencia a coleção de produtos no Firestore
    const produtosSnapshot = await getDocs(produtosCollection);
    const produtosList = produtosSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setProdutos(produtosList); // Atualiza o estado com a lista de produtos
  };

  // Função para buscar as cotações do produto selecionado no Firestore
  const fetchCotacoes = async () => {
    if (produto) {
      const cotacoesCollection = collection(db, "cotacoes"); // Referencia a coleção de cotações no Firestore
      const q = query(cotacoesCollection, where("produto", "==", produto)); // Usa o campo produto como filtro
      const cotacoesSnapshot = await getDocs(q);
      const cotacoesList = cotacoesSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setCotacoesFiltradas(cotacoesList); // Atualiza o estado com a lista de cotações filtradas
    }
  };

  useEffect(() => {
    fetchProdutos(); // Busca os produtos quando o componente é carregado
  }, []);

  const handleChange = (e) => {
    setProduto(e.target.value); // Atualiza o estado com o valor do produto selecionado
  };

  const handleConsulta = () => {
    fetchCotacoes(); // Faz a consulta ao Firestore quando o usuário clica em consultar
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
          value={produto}
          onChange={handleChange}
          fullWidth
          required
          margin="normal"
        >
          {produtos.map((produto) => (
            <MenuItem key={produto.id} value={produto.nomeProduto}>
              {produto.nomeProduto}
            </MenuItem>
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
                    primary={`Contato: ${cotacao.contato} | Empresa: ${cotacao.nomeEmpresa}`}
                    secondary={`Data: ${cotacao.dataCotacao} | Preço: R$ ${cotacao.preco}`}
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
