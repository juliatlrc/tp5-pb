import React, { useState } from "react";
import {
  TextField,
  Button,
  Container,
  Typography,
  Box,
  Alert,
} from "@mui/material";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { setDoc, doc } from "firebase/firestore";
import { db } from "../../firebase/config"; // Firestore config
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CadastroColaborador = () => {
  const [form, setForm] = useState({
    nome: "",
    sobrenome: "",
    cpf: "",
    email: "",
    senha: "",
  });
  const [statusMessage, setStatusMessage] = useState(null); // Estado para mensagens de status
  const [statusCode, setStatusCode] = useState(null); // Estado para armazenar código HTTP simulado
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const auth = getAuth();
    const { nome, sobrenome, cpf, email, senha } = form;

    // Limpa o status antes de realizar a validação
    setStatusMessage(null);
    setStatusCode(null);

    // Validações simples para CPF e senha
    if (cpf.length !== 11 || isNaN(cpf)) {
      setStatusMessage("O CPF deve conter 11 dígitos numéricos");
      setStatusCode(400); // Código HTTP simulado para erro de validação
      return;
    }

    try {
      // Tenta criar o usuário no Firebase Authentication
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        senha
      );
      const user = userCredential.user;

      // Salva os dados do colaborador no Firestore, incluindo o campo "role" e "isBlocked"
      await setDoc(doc(db, "colaboradores", user.uid), {
        nome,
        sobrenome,
        cpf,
        email,
        role: "colaborador", // Define o papel do usuário como "colaborador"
        isBlocked: false, // Adiciona o campo isBlocked como falso
      });

      // Define o sucesso e simula o código 200
      setStatusMessage("Conta criada com sucesso!");
      setStatusCode(200); // Código HTTP simulado para sucesso

      // Exibe um toaster de sucesso
      toast.success("Conta criada com sucesso!");

      // Redireciona para a página de login após 2 segundos
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (error) {
      // Exibe a mensagem de erro com base no código de erro
      setStatusMessage("Erro ao criar a conta. Verifique seus dados.");
      setStatusCode(400); // Código HTTP simulado para erro
      console.error("Erro:", error);
    }
  };

  return (
    <Container maxWidth="xs" sx={{ mt: 5 }}>
      <Typography variant="h4" align="center" gutterBottom>
        Cadastro de Colaborador
      </Typography>

      {/* Exibe a mensagem de status correspondente ao código */}
      {statusCode === 200 && <Alert severity="success">{statusMessage}</Alert>}
      {statusCode === 400 && <Alert severity="error">{statusMessage}</Alert>}

      <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
        <TextField
          label="Nome"
          name="nome"
          value={form.nome}
          onChange={handleChange}
          fullWidth
          required
          margin="normal"
        />
        <TextField
          label="Sobrenome"
          name="sobrenome"
          value={form.sobrenome}
          onChange={handleChange}
          fullWidth
          required
          margin="normal"
        />
        <TextField
          label="CPF"
          name="cpf"
          value={form.cpf}
          onChange={handleChange}
          fullWidth
          required
          margin="normal"
          inputProps={{ maxLength: 11 }} // Limita o CPF a 11 dígitos
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
        <TextField
          label="Senha"
          name="senha"
          type="password"
          value={form.senha}
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
          Criar Conta
        </Button>
      </Box>

      {/* Toaster container */}
      <ToastContainer />
    </Container>
  );
};

export default CadastroColaborador;
