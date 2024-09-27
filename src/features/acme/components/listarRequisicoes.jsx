import React, { useState, useEffect } from "react";
import {
  Container,
  Typography,
  Box,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import { collection, query, where, orderBy, getDocs } from "firebase/firestore";
import { db } from "../../firebase/config"; // Configuração do Firestore
import { getAuth } from "firebase/auth";

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
          where("uidColaborador", "==", user.uid),
          orderBy("data", "asc") // Ordena pela data, da mais antiga para a mais nova
        );

        const querySnapshot = await getDocs(q);
        const requisicoesList = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setRequisicoes(requisicoesList);
        setLoading(false);
      }
    };

    fetchRequisicoes();
  }, []);

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
              {requisicoes.map((requisicao) => (
                <ListItem key={requisicao.id}>
                  <ListItemText
                    primary={`Descrição: ${requisicao.descricao}`}
                    secondary={`Estado: ${requisicao.estado} | Data: ${new Date(
                      requisicao.data.seconds * 1000
                    ).toLocaleDateString()}`}
                  />
                </ListItem>
              ))}
            </List>
          )}
        </Box>
      )}
    </Container>
  );
};

export default ListarRequisicoes;
