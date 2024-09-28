import React, { useState, useEffect } from "react";
import {
  Container,
  TextField,
  Button,
  Typography,
  Alert,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
} from "@mui/material";
import { addDoc, collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase/config"; // Configuração do Firestore
import { getAuth } from "firebase/auth";

const NovaRequisicaoCompra = () => {
  const [descricao, setDescricao] = useState(""); // Descricao será um select
  const [nomeProduto, setNomeProduto] = useState("");
  const [marcaSelecionada, setMarcaSelecionada] = useState("");
  const [quantidade, setQuantidade] = useState(1);
  const [produtos, setProdutos] = useState([]);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);

  // Função para buscar os produtos da coleção "produtos"
  const fetchProdutos = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "produtos"));
      const produtosArray = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setProdutos(produtosArray);
    } catch (err) {
      console.error("Erro ao buscar produtos: ", err);
      setError("Erro ao carregar produtos.");
    }
  };

  useEffect(() => {
    fetchProdutos(); // Busca os produtos ao carregar o componente
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const auth = getAuth();
    const user = auth.currentUser;

    if (user) {
      try {
        await addDoc(collection(db, "requisicoes"), {
          descricao, // Descrição agora será uma opção selecionada
          nomeProduto,
          marca: marcaSelecionada,
          quantidade,
          estado: "Pendente", // Estado inicial da requisição
          dataSolicitacao: new Date(), // Data da solicitação
          uidColaborador: user.uid, // Relaciona com o colaborador que fez a requisição
          nomeColaborador: user.displayName, // Nome do colaborador
          statusPedido: "A esperar", // Novo campo com valor inicial 'A esperar'
        });
        setSuccess(true);
        setError(null);
        setDescricao("");
        setNomeProduto("");
        setMarcaSelecionada("");
        setQuantidade(1);
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
        <FormControl fullWidth required margin="normal">
          <InputLabel id="select-descricao-label">Marca</InputLabel>
          <Select
            labelId="select-descricao-label"
            value={descricao}
            onChange={(e) => setDescricao(e.target.value)}
          >
            {produtos.map((produto) => (
              <MenuItem key={produto.id} value={produto.descricao}>
                {produto.descricao}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl fullWidth required margin="normal">
          <InputLabel id="select-produto-label">Produto</InputLabel>
          <Select
            labelId="select-produto-label"
            value={nomeProduto}
            onChange={(e) => setNomeProduto(e.target.value)}
          >
            {produtos.map((produto) => (
              <MenuItem key={produto.id} value={produto.nomeProduto}>
                {produto.nomeProduto} - {produto.detalhes?.marca}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <TextField
          label="Quantidade"
          type="number"
          value={quantidade}
          onChange={(e) => setQuantidade(Number(e.target.value))}
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
