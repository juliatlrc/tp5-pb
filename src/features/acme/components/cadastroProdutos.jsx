import React, { useState } from "react";
import {
  TextField,
  Button,
  Container,
  Typography,
  Alert,
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { db } from "../../firebase/config";
import { collection, addDoc } from "firebase/firestore"; // Firestore completo

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

const CadastroProdutos = () => {
  const [form, setForm] = useState({
    nomeProduto: "",
    descricao: "",
  });
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, "produtos"), {
        nomeProduto: form.nomeProduto,
        descricao: form.descricao,
      });
      setSuccess(true);
      setError(false);
      setForm({ nomeProduto: "", descricao: "" }); // Resetar o formulário
    } catch (error) {
      console.error("Erro ao adicionar o produto: ", error);
      setError(true);
    }
  };

  return (
    <ThemeProvider theme={acmeTheme}>
      <Container
        maxWidth="md"
        sx={{ mt: 5, p: { xs: 2, md: 5 }, boxShadow: 3, borderRadius: 2 }}
      >
        <Typography variant="h4" align="center" gutterBottom>
          Cadastro de Produtos
        </Typography>

        {success && (
          <Alert severity="success">Produto cadastrado com sucesso!</Alert>
        )}
        {error && <Alert severity="error">Erro ao cadastrar o produto!</Alert>}

        <form onSubmit={handleSubmit}>
          <TextField
            label="Nome do Produto"
            name="nomeProduto"
            value={form.nomeProduto}
            onChange={handleChange}
            fullWidth
            required
            margin="normal"
          />
          <TextField
            label="Descrição"
            name="descricao"
            value={form.descricao}
            onChange={handleChange}
            fullWidth
            required
            margin="normal"
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 3 }}
          >
            Cadastrar Produto
          </Button>
        </form>
      </Container>
    </ThemeProvider>
  );
};

export default CadastroProdutos;
