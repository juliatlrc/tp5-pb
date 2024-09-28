import React, { useState } from "react";
import {
  TextField,
  Button,
  Container,
  Typography,
  Box,
  Alert,
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import BusinessIcon from "@mui/icons-material/Business";

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

const CadastroFornecedores = () => {
  const [form, setForm] = useState({
    nomeEmpresa: "",
    cnpj: "",
    endereco: "",
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
    // Lógica para envio dos dados ao backend pode ser implementada aqui
    console.log(form);
    setSuccess(true);
    setForm({
      nomeEmpresa: "",
      cnpj: "",
      endereco: "",
      telefone: "",
      email: "",
    });
  };

  return (
    <ThemeProvider theme={acmeTheme}>
      <Container
        maxWidth="md"
        sx={{ mt: 5, p: { xs: 2, md: 5 }, boxShadow: 3, borderRadius: 2 }}
      >
        <Box sx={{ textAlign: "center", mb: { xs: 2, md: 4 } }}>
          <BusinessIcon
            sx={{ fontSize: { xs: 60, md: 100 }, color: "#ff6f00" }}
          />
        </Box>

        <Typography variant="h4" align="center" gutterBottom>
          Cadastro de Fornecedores
        </Typography>

        {success && (
          <Alert severity="success">Fornecedor cadastrado com sucesso!</Alert>
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
            label="CNPJ"
            name="cnpj"
            value={form.cnpj}
            onChange={handleChange}
            fullWidth
            required
            margin="normal"
          />
          <TextField
            label="Endereço"
            name="endereco"
            value={form.endereco}
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
            Cadastrar Fornecedor
          </Button>
        </form>
      </Container>
    </ThemeProvider>
  );
};

export default CadastroFornecedores;
