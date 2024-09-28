import React, { useState, useEffect } from "react";
import {
  Container,
  Typography,
  Box,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Button,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import HourglassEmptyIcon from "@mui/icons-material/HourglassEmpty"; // Icon for "A esperar"
import AssignmentTurnedInIcon from "@mui/icons-material/AssignmentTurnedIn"; // Icon for "Cotado"
import AutorenewIcon from "@mui/icons-material/Autorenew"; // Icon for "Em cotação"
import {
  collection,
  query,
  where,
  getDocs,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { db } from "../../firebase/config"; // Configuração do Firestore
import { getAuth } from "firebase/auth";
import { CSVLink } from "react-csv";

const ListarRequisicoes = () => {
  const [requisicoes, setRequisicoes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRequisicoes = async () => {
      const auth = getAuth();
      const user = auth.currentUser;

      if (user) {
        const q = query(
          collection(db, "requisicoes"),
          where("uidColaborador", "==", user.uid)
        );

        const querySnapshot = await getDocs(q);
        const requisicoesList = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        requisicoesList.sort((a, b) => {
          if (a.data && b.data) {
            return a.data.seconds - b.data.seconds;
          }
          return 0;
        });

        setRequisicoes(requisicoesList);
        setLoading(false);
      }
    };

    fetchRequisicoes();
  }, []);

  // Função para excluir uma requisição
  const handleDelete = async (id) => {
    if (window.confirm("Tem certeza que deseja excluir esta requisição?")) {
      try {
        await deleteDoc(doc(db, "requisicoes", id));
        setRequisicoes(
          requisicoes.filter((requisicao) => requisicao.id !== id)
        );
      } catch (err) {
        console.error("Erro ao excluir a requisição: ", err);
      }
    }
  };

  // Função para exportar uma requisição para CSV
  const generateCSVData = (requisicao) => {
    const data = requisicao.data
      ? new Date(requisicao.data.seconds * 1000).toLocaleDateString()
      : "Data não disponível";

    return [
      ["Descrição", requisicao.descricao || "Descrição não disponível"],
      ["Estado", requisicao.estado || "Estado não disponível"],
      ["Data", data],
      ["Quantidade", requisicao.quantidade || "Quantidade não disponível"],
      ["Produto", requisicao.nomeProduto || "Produto não disponível"],
      ["Marca", requisicao.marca || "Marca não disponível"],
      ["Status Pedido", requisicao.statusPedido || "Status não disponível"],
    ];
  };

  // Função para retornar a cor e o ícone com base no status
  const getStatusStyles = (status) => {
    switch (status) {
      case "A esperar":
        return { color: "yellow", icon: <HourglassEmptyIcon /> };
      case "Em cotação":
        return { color: "blue", icon: <AutorenewIcon /> };
      case "Cotado":
        return { color: "green", icon: <AssignmentTurnedInIcon /> };
      default:
        return { color: "gray", icon: null };
    }
  };

  return (
    <Container maxWidth="md" sx={{ mt: 5 }}>
      <Typography variant="h5" align="center" gutterBottom>
        Minhas Requisições de Compra
      </Typography>

      {loading ? (
        <Typography align="center">Carregando...</Typography>
      ) : (
        <Box sx={{ mt: 4 }}>
          {requisicoes.length === 0 ? (
            <Typography align="center">
              Nenhuma requisição encontrada.
            </Typography>
          ) : (
            <List>
              {requisicoes.map((requisicao) => {
                const statusStyles = getStatusStyles(requisicao.statusPedido);

                return (
                  <ListItem
                    key={requisicao.id}
                    secondaryAction={
                      <>
                        <IconButton
                          edge="end"
                          aria-label="delete"
                          onClick={() => handleDelete(requisicao.id)}
                        >
                          <DeleteIcon />
                        </IconButton>
                        <CSVLink
                          data={generateCSVData(requisicao)}
                          filename={`requisicao-${requisicao.id}.csv`}
                        >
                          <Button variant="outlined" sx={{ ml: 2 }}>
                            Exportar CSV
                          </Button>
                        </CSVLink>
                      </>
                    }
                    sx={{
                      borderLeft: `5px solid ${statusStyles.color}`, // Linha colorida para status
                      padding: "16px",
                      mb: 2,
                    }}
                  >
                    {statusStyles.icon && (
                      <Box sx={{ mr: 2 }}>{statusStyles.icon}</Box>
                    )}
                    <ListItemText
                      primary={`Descrição: ${
                        requisicao.descricao || "Descrição não disponível"
                      }`}
                      secondary={`Estado: ${
                        requisicao.estado || "Estado não disponível"
                      } | Data: ${
                        requisicao.data
                          ? new Date(
                              requisicao.data.seconds * 1000
                            ).toLocaleDateString()
                          : "Data não disponível"
                      } | Status: ${
                        requisicao.statusPedido || "Status não disponível"
                      }`}
                    />
                  </ListItem>
                );
              })}
            </List>
          )}
        </Box>
      )}
    </Container>
  );
};

export default ListarRequisicoes;
