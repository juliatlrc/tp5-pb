import React, { useState, useEffect } from "react";
import {
  Container,
  Typography,
  Box,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  CircularProgress,
  Alert,
} from "@mui/material";
import { getDocs, collection, updateDoc, doc } from "firebase/firestore"; // Firestore
import { db } from "../../firebase/config";
import BlockIcon from "@mui/icons-material/Block";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

const GerenciarColaboradores = () => {
  const [colaboradores, setColaboradores] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  // Função para buscar todos os colaboradores no Firestore
  const fetchColaboradores = async () => {
    try {
      const colaboradoresSnapshot = await getDocs(
        collection(db, "colaboradores")
      );
      const colaboradoresList = colaboradoresSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setColaboradores(colaboradoresList);
      setLoading(false);
    } catch (error) {
      console.error("Erro ao buscar colaboradores:", error);
      setError(true);
      setLoading(false);
    }
  };

  // Função para bloquear/desbloquear colaboradores
  const toggleBlockStatus = async (colaboradorId, isBlocked) => {
    try {
      const colaboradorRef = doc(db, "colaboradores", colaboradorId);
      await updateDoc(colaboradorRef, {
        isBlocked: !isBlocked, // Inverte o status atual de bloqueio
      });
      // Atualiza a lista de colaboradores localmente
      setColaboradores(
        colaboradores.map((colaborador) =>
          colaborador.id === colaboradorId
            ? { ...colaborador, isBlocked: !isBlocked }
            : colaborador
        )
      );
    } catch (error) {
      console.error("Erro ao atualizar o status de bloqueio:", error);
    }
  };

  useEffect(() => {
    fetchColaboradores();
  }, []);

  return (
    <Container maxWidth="md" sx={{ mt: 5 }}>
      <Typography variant="h4" align="center" gutterBottom>
        Gerenciar Colaboradores
      </Typography>

      {loading ? (
        <CircularProgress />
      ) : error ? (
        <Alert severity="error">Erro ao carregar colaboradores</Alert>
      ) : (
        <Box>
          <List>
            {colaboradores.map((colaborador) => (
              <ListItem key={colaborador.id}>
                <ListItemText
                  primary={`${colaborador.nome} ${colaborador.sobrenome}`}
                  secondary={`Email: ${colaborador.email} - Status: ${
                    colaborador.isBlocked ? "Bloqueado" : "Ativo"
                  }`}
                />
                <ListItemSecondaryAction>
                  <IconButton
                    edge="end"
                    color={colaborador.isBlocked ? "primary" : "secondary"}
                    onClick={() =>
                      toggleBlockStatus(colaborador.id, colaborador.isBlocked)
                    }
                  >
                    {colaborador.isBlocked ? (
                      <CheckCircleIcon />
                    ) : (
                      <BlockIcon />
                    )}
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
            ))}
          </List>
        </Box>
      )}
    </Container>
  );
};

export default GerenciarColaboradores;
