import React, { useState } from "react";
import {
  TextField,
  Button,
  Container,
  Typography,
  Box,
  Alert,
} from "@mui/material";
import ContactMailIcon from "@mui/icons-material/ContactMail";
import { createTheme, ThemeProvider } from "@mui/material/styles";

// Tema personalizado
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
    fontFamily: '"Roboto", "Arial", sans-serif',
    h4: {
      fontWeight: 700,
      color: "#ff6f00",
    },
  },
});

const CadastroContatos = () => {
  const [form, setForm] = useState({
    nomeContato: "",
    fornecedor: "",
    telefone: "",
    email: "",
  });

  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSuccess(true);
  };

  return (
    <ThemeProvider theme={acmeTheme}>
      <Container
        maxWidth="md"
        sx={{ mt: 5, p: { xs: 2, md: 5 }, boxShadow: 3, borderRadius: 2 }}
      >
        <Box sx={{ textAlign: "center", mb: { xs: 2, md: 4 } }}>
          <ContactMailIcon
            sx={{ fontSize: { xs: 60, md: 100 }, color: "#ff6f00" }}
          />
        </Box>

        <Typography variant="h4" align="center" gutterBottom>
          Cadastro de Contatos
        </Typography>

        {success && (
          <Alert severity="success">Contato cadastrado com sucesso!</Alert>
        )}

        <form onSubmit={handleSubmit}>
          <TextField
            label="Nome do Contato"
            name="nomeContato"
            value={form.nomeContato}
            onChange={handleChange}
            fullWidth
            required
            margin="normal"
          />
          <TextField
            label="Fornecedor"
            name="fornecedor"
            value={form.fornecedor}
            onChange={handleChange}
            fullWidth
            required
            margin="normal"
          />
          <TextField
            label="Telefone"
            name="telefone"
            value={form.telefone}
            onChange={handleChange}
            fullWidth
            required
            margin="normal"
          />
          <TextField
            label="Email"
            name="email"
            type="email"
            value={form.email}
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
            Cadastrar Contato
          </Button>
        </form>
      </Container>
    </ThemeProvider>
  );
};

export default CadastroContatos;
