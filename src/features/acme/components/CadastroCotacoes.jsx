import React, { useState } from "react";
import {
  TextField,
  Button,
  Container,
  Typography,
  Box,
  Alert,
  MenuItem,
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

// Exemplo de dados para produtos e contatos (você pode substituir por uma API real)
const produtosDisponiveis = [
  { id: 1, nome: "Produto 1" },
  { id: 2, nome: "Produto 2" },
];

const contatosDisponiveis = [
  { id: 1, nome: "Contato 1" },
  { id: 2, nome: "Contato 2" },
];

const CadastroCotacoes = () => {
  const [form, setForm] = useState({
    nomeEmpresa: "",
    nomeFuncionario: "",
    preco: "",
    produto: "",
    contato: "",
  });

  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Lógica para salvar os dados pode ser adicionada aqui (API, etc.)
    console.log(form);
    setSuccess(true);
    setForm({
      nomeEmpresa: "",
      nomeFuncionario: "",
      preco: "",
      produto: "",
      contato: "",
    });
  };

  return (
    <ThemeProvider theme={acmeTheme}>
      <Container
        maxWidth="md"
        sx={{ mt: 5, p: { xs: 2, md: 5 }, boxShadow: 3, borderRadius: 2 }}
      >
        <Typography variant="h4" align="center" gutterBottom>
          Cadastro de Cotações
        </Typography>

        {success && (
          <Alert severity="success">Cotação cadastrada com sucesso!</Alert>
        )}

        <form onSubmit={handleSubmit}>
          <TextField
            label="Nome da Empresa"
            name="nomeEmpresa"
            value={form.nomeEmpresa}
            onChange={handleChange}
            fullWidth
            required
            margin="normal"
          />

          <TextField
            label="Nome do Funcionário"
            name="nomeFuncionario"
            value={form.nomeFuncionario}
            onChange={handleChange}
            fullWidth
            required
            margin="normal"
          />

          <TextField
            label="Preço"
            name="preco"
            type="number"
            value={form.preco}
            onChange={handleChange}
            fullWidth
            required
            margin="normal"
          />

          <TextField
            select
            label="Produto"
            name="produto"
            value={form.produto}
            onChange={handleChange}
            fullWidth
            required
            margin="normal"
          >
            {produtosDisponiveis.map((produto) => (
              <MenuItem key={produto.id} value={produto.nome}>
                {produto.nome}
              </MenuItem>
            ))}
          </TextField>

          <TextField
            select
            label="Contato"
            name="contato"
            value={form.contato}
            onChange={handleChange}
            fullWidth
            required
            margin="normal"
          >
            {contatosDisponiveis.map((contato) => (
              <MenuItem key={contato.id} value={contato.nome}>
                {contato.nome}
              </MenuItem>
            ))}
          </TextField>

          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 3 }}
          >
            Cadastrar Cotação
          </Button>
        </form>
      </Container>
    </ThemeProvider>
  );
};

export default CadastroCotacoes;
