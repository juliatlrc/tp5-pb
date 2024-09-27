import React, { useState } from "react";
import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
  Alert,
} from "@mui/material";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../../firebase/config"; // Configuração do Firestore
import { getAuth } from "firebase/auth";

const NovaRequisicaoCompra = () => {
  const [descricao, setDescricao] = useState("");
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const auth = getAuth();
    const user = auth.currentUser;

    if (user) {
      try {
        await addDoc(collection(db, "requisicoes"), {
          descricao,
          estado: "Pendente", // Estado inicial da requisição
          data: new Date(),
          uidColaborador: user.uid, // Relaciona com o colaborador que fez a requisição
        });
        setSuccess(true);
        setError(null);
        setDescricao("");
      } catch (err) {
        console.error("Erro ao enviar requisição: ", err);
        setError("Erro ao enviar a requisição.");
      }
    } else {
      setError("Você precisa estar logado para fazer uma requisição.");
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 5 }}>
      <Typography variant="h5" align="center" gutterBottom>
        Nova Requisição de Compra
      </Typography>

      {success && (
        <Alert severity="success">Requisição enviada com sucesso!</Alert>
      )}
      {error && <Alert severity="error">{error}</Alert>}

      <form onSubmit={handleSubmit}>
        <TextField
          label="Descrição"
          value={descricao}
          onChange={(e) => setDescricao(e.target.value)}
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
          Enviar Requisição
        </Button>
      </form>
    </Container>
  );
};

export default NovaRequisicaoCompra;
