/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useCallback } from "react";
import {
  TextField,
  Button,
  Container,
  Typography,
  Alert,
  MenuItem,
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { collection, getDocs, addDoc, doc, getDoc } from "firebase/firestore"; // Importações Firestore
import { useParams } from "react-router-dom"; // Para capturar o ID da requisição
import { db } from "../../firebase/config"; // Certifique-se de que o caminho está correto

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

const CadastroCotacoes = () => {
  const { id } = useParams(); // Captura o ID da requisição da URL
  const [form, setForm] = useState({
    nomeEmpresa: "",
    nomeFuncionario: "",
    preco: "",
    produto: "",
    contato: "",
  });

  const [produtosDisponiveis, setProdutosDisponiveis] = useState([]);
  const [contatosDisponiveis, setContatosDisponiveis] = useState([]);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);

  // Função para buscar a requisição específica pelo ID
  const fetchRequisicao = useCallback(async () => {
    try {
      const docRef = doc(db, "requisicoes", id); // Busca a requisição pelo ID da URL
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        // Preenche o produto com base na requisição
        setForm((prevForm) => ({
          ...prevForm,
          produto: docSnap.data().nomeProduto,
        }));
      } else {
        console.error("Requisição não encontrada");
        setError(true);
      }
    } catch (error) {
      console.error("Erro ao buscar requisição: ", error);
      setError(true);
    }
  }, [id]); // Agora 'id' é a dependência de 'fetchRequisicao'

  // Função para buscar fornecedores do Firestore
  const fetchContatos = useCallback(async () => {
    const contatosCollection = collection(db, "contatos");
    const contatosSnapshot = await getDocs(contatosCollection);
    const contatosList = contatosSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setContatosDisponiveis(contatosList);
  }, []); // 'fetchContatos' é memoizada e não tem dependências

  useEffect(() => {
    fetchContatos();
    if (id) {
      fetchRequisicao(); // Busca a requisição com base no ID
    }
  }, [fetchContatos, fetchRequisicao, id]); // Adicionando dependências corretas

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Manter o estado do contato e nomeFuncionario ao selecionar nomeEmpresa
    if (name === "nomeEmpresa") {
      const fornecedorSelecionado = contatosDisponiveis.find(
        (contato) => contato.fornecedor === value
      );
      if (fornecedorSelecionado) {
        setForm({
          ...form,
          nomeEmpresa: fornecedorSelecionado.fornecedor,
          contato: fornecedorSelecionado.email, // Preencher o contato com o email
          nomeFuncionario: fornecedorSelecionado.nomeContato, // Preencher nome do funcionário
        });
      }
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Adicionar a cotação no Firestore e vincular à requisição
      await addDoc(collection(db, "cotacoes"), {
        nomeEmpresa: form.nomeEmpresa,
        nomeFuncionario: form.nomeFuncionario,
        preco: form.preco,
        produto: form.produto,
        contato: form.contato,
        requisicaoId: id, // Associando cotação à requisição
      });
      setSuccess(true);
      setError(false);
      // Limpar o formulário após o envio
      setForm({
        nomeEmpresa: "",
        nomeFuncionario: "",
        preco: "",
        produto: "",
        contato: "",
      });
    } catch (error) {
      console.error("Erro ao enviar cotação: ", error);
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
          Cadastro de Cotações
        </Typography>

        {success && (
          <Alert severity="success">Cotação cadastrada com sucesso!</Alert>
        )}
        {error && (
          <Alert severity="error">
            Erro ao cadastrar cotação. Tente novamente!
          </Alert>
        )}

        <form onSubmit={handleSubmit}>
          <TextField
            select
            label="Fornecedor (Nome da Empresa)"
            name="nomeEmpresa"
            value={form.nomeEmpresa}
            onChange={handleChange}
            fullWidth
            required
            margin="normal"
          >
            {contatosDisponiveis
              .filter((contato) => contato.fornecedor) // Filtra apenas contatos que têm fornecedor
              .map((contato) => (
                <MenuItem key={contato.id} value={contato.fornecedor}>
                  {contato.fornecedor}
                </MenuItem>
              ))}
          </TextField>

          <TextField
            label="Nome do Funcionário"
            name="nomeFuncionario"
            value={form.nomeFuncionario}
            onChange={handleChange}
            fullWidth
            required
            margin="normal"
            disabled // Desabilitado, pois será preenchido automaticamente
          />

          <TextField
            label="Preço"
            name="preco"
            type="number"
            value={form.preco}
            onChange={handleChange}
            fullWidth
            required
            margin="normal"
          />

          {/* Produto é preenchido automaticamente com base na requisição */}
          <TextField
            label="Produto"
            name="produto"
            value={form.produto}
            fullWidth
            required
            margin="normal"
            disabled // Desabilitado, pois será preenchido automaticamente pela requisição
          />

          <TextField
            label="Contato (Email)"
            name="contato"
            value={form.contato}
            onChange={handleChange}
            fullWidth
            required
            margin="normal"
            disabled // Desabilitado, pois será preenchido automaticamente com o email do fornecedor
          />

          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 3 }}
          >
            Cadastrar Cotação
          </Button>
        </form>
      </Container>
    </ThemeProvider>
  );
};

export default CadastroCotacoes;
