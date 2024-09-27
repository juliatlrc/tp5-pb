import React, { useState } from "react";
import {
  TextField,
  Button,
  Container,
  Typography,
  Box,
  Alert,
} from "@mui/material";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore"; // Importa o Firestore para verificar o bloqueio
import { useNavigate, Link } from "react-router-dom";
import { db } from "../../firebase/config"; // Importa o Firestore

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    const auth = getAuth();
    try {
      // Tenta fazer o login via Firebase Authentication
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      // Após login bem-sucedido, verifica o status do colaborador no Firestore
      const colaboradorRef = doc(db, "colaboradores", user.uid);
      const colaboradorDoc = await getDoc(colaboradorRef);

      if (colaboradorDoc.exists()) {
        const colaboradorData = colaboradorDoc.data();

        if (colaboradorData.isBlocked) {
          // Se o colaborador estiver bloqueado, exibe erro e impede login
          setError("Conta bloqueada. Entre em contato com o administrador.");
          return;
        }

        // Caso contrário, navega para a página Home
        navigate("/home");
      } else {
        setError("Dados do colaborador não encontrados.");
      }
    } catch (error) {
      setError("Erro ao fazer login. Verifique suas credenciais.");
    }
  };

  return (
    <Container maxWidth="xs" sx={{ mt: 5 }}>
      <Typography variant="h4" align="center" gutterBottom>
        Login
      </Typography>

      {error && <Alert severity="error">{error}</Alert>}

      <Box component="form" onSubmit={handleLogin} sx={{ mt: 2 }}>
        <TextField
          label="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          fullWidth
          required
          margin="normal"
        />
        <TextField
          label="Senha"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
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
          Entrar
        </Button>

        {/* Link para a página de criação de conta */}
        <Box textAlign="center" sx={{ mt: 3 }}>
          <Typography variant="body2">Não tem uma conta?</Typography>
          <Button
            component={Link}
            to="/cadastro-colaborador" // Rota para a página de cadastro de colaborador
            variant="outlined"
            color="primary"
            sx={{ mt: 1 }}
          >
            Criar Conta de Colaborador
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default Login;
