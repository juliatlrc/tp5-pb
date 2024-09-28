import React, { useState, useEffect } from "react";
import {
  Container,
  Typography,
  Box,
  Button,
  Grid,
  MenuItem,
  FormControl,
  Select,
  InputLabel,
} from "@mui/material";
import BusinessIcon from "@mui/icons-material/Business";
import PersonIcon from "@mui/icons-material/Person";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useNavigate } from "react-router-dom"; // Importar hook de navegação
import { Bar } from "react-chartjs-2";
import { getAuth } from "firebase/auth";
import {
  doc,
  getDoc,
  collection,
  getDocs,
  query,
  where,
} from "firebase/firestore"; // Importações Firestore
import { db } from "../../firebase/config"; // Configuração do Firestore
import {
  Chart,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Registrando os componentes do Chart.js
Chart.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const Home = () => {
  const [isColaborador, setIsColaborador] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const [produtos, setProdutos] = useState([]);
  const [cotacoes, setCotacoes] = useState([]);
  const [produtoSelecionado, setProdutoSelecionado] = useState("");
  const navigate = useNavigate(); // Hook para navegação

  // Verificação da role do usuário
  useEffect(() => {
    const auth = getAuth();
    const user = auth.currentUser;

    if (user) {
      const uid = user.uid;
      const userDocRef = doc(db, "colaboradores", uid); // Coleção de colaboradores
      getDoc(userDocRef)
        .then((docSnap) => {
          if (docSnap.exists()) {
            const userData = docSnap.data();
            if (userData.role === "colaborador") {
              setIsColaborador(true);
            } else if (userData.role === "admin") {
              setIsAdmin(true);
            }
          }
          setLoading(false);
        })
        .catch((error) => {
          console.log("Erro ao buscar documento do Firestore: ", error);
          setLoading(false);
        });
    } else {
      setLoading(false); // Finaliza o carregamento se não houver usuário logado
    }
  }, []);

  // Função para buscar produtos do Firestore
  const fetchProdutos = async () => {
    try {
      const produtosSnapshot = await getDocs(collection(db, "produtos"));
      const produtosList = produtosSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setProdutos(produtosList);
    } catch (error) {
      console.error("Erro ao buscar produtos: ", error);
    }
  };

  // Função para buscar cotações baseadas no produto selecionado
  const fetchCotacoes = async (produto) => {
    try {
      const q = query(
        collection(db, "cotacoes"),
        where("produto", "==", produto)
      );
      const cotacoesSnapshot = await getDocs(q);
      const cotacoesList = cotacoesSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setCotacoes(cotacoesList);
    } catch (error) {
      console.error("Erro ao buscar cotações: ", error);
    }
  };

  useEffect(() => {
    if (isAdmin) {
      fetchProdutos();
    }
  }, [isAdmin]);

  useEffect(() => {
    if (produtoSelecionado) {
      fetchCotacoes(produtoSelecionado);
    }
  }, [produtoSelecionado]);

  const handleProdutoChange = (event) => {
    setProdutoSelecionado(event.target.value);
  };

  // Preparar dados para o gráfico
  const getDataForChart = () => {
    const empresas = cotacoes.map((cotacao) => cotacao.nomeEmpresa);
    const precos = cotacoes.map((cotacao) => cotacao.preco);

    return {
      labels: empresas,
      datasets: [
        {
          label: `Preços para ${produtoSelecionado}`,
          data: precos,
          backgroundColor: "rgba(75, 192, 192, 0.6)",
          borderColor: "rgba(75, 192, 192, 1)",
          borderWidth: 1,
        },
      ],
    };
  };

  const getOptionsForChart = () => {
    return {
      responsive: true,
      plugins: {
        legend: {
          position: "top",
        },
        title: {
          display: true,
          text: `Gráfico de Cotações para ${produtoSelecionado}`,
        },
      },
    };
  };

  if (loading) {
    return (
      <Container maxWidth="lg" sx={{ mt: 5, textAlign: "center" }}>
        <Typography variant="h6" align="center">
          Verificando permissões...
        </Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 5, textAlign: "center" }}>
      {isColaborador && (
        <>
          {/* Colaborador: Tela com opções de cadastrar e ver requisições */}
          <Box sx={{ mb: 5 }}>
            <Typography
              variant="h3"
              sx={{ fontWeight: "bold", color: "#3f51b5" }}
            >
              <BusinessIcon
                fontSize="large"
                sx={{ verticalAlign: "middle", mr: 1 }}
              />
              Bem-vindo ao Sistema ACME
            </Typography>
            <Typography variant="h5" sx={{ mt: 2 }}>
              Um sistema de gestão de requisições de compra para colaboradores.
            </Typography>
          </Box>

          <Grid container spacing={4} justifyContent="center">
            <Grid item xs={12} sm={6} md={3}>
              <Box
                sx={{
                  p: 3,
                  boxShadow: 3,
                  transition: "0.3s",
                  "&:hover": {
                    boxShadow: 6,
                    transform: "translateY(-5px)",
                  },
                }}
              >
                <ShoppingCartIcon fontSize="large" sx={{ color: "#3f51b5" }} />
                <Typography variant="h6" sx={{ mt: 2 }}>
                  Cadastrar Requisições
                </Typography>
                <Typography variant="body1" sx={{ mt: 1 }}>
                  Registre novas requisições de compra para a empresa.
                </Typography>
                <Button
                  variant="contained"
                  color="primary"
                  sx={{ mt: 2 }}
                  onClick={() => navigate("/nova-requisicao-compra")}
                >
                  Iniciar Agora
                </Button>
              </Box>
            </Grid>

            <Grid item xs={12} sm={6} md={3}>
              <Box
                sx={{
                  p: 3,
                  boxShadow: 3,
                  transition: "0.3s",
                  "&:hover": {
                    boxShadow: 6,
                    transform: "translateY(-5px)",
                  },
                }}
              >
                <PersonIcon fontSize="large" sx={{ color: "#3f51b5" }} />
                <Typography variant="h6" sx={{ mt: 2 }}>
                  Ver Requisições
                </Typography>
                <Typography variant="body1" sx={{ mt: 1 }}>
                  Acompanhe o status das suas requisições.
                </Typography>
                <Button
                  variant="contained"
                  color="primary"
                  sx={{ mt: 2 }}
                  onClick={() => navigate("/listar-requisicoes")}
                >
                  Ver Requisições
                </Button>
              </Box>
            </Grid>
          </Grid>
        </>
      )}

      {isAdmin && (
        <>
          {/* Admin: Tela com gráfico de cotações */}
          <Typography variant="h4" align="center" gutterBottom>
            Visualização de Cotações - Admin
          </Typography>

          <FormControl fullWidth sx={{ mt: 4, mb: 5 }}>
            <InputLabel id="select-produto-label">
              Selecionar Produto
            </InputLabel>
            <Select
              labelId="select-produto-label"
              value={produtoSelecionado}
              label="Selecionar Produto"
              onChange={handleProdutoChange}
            >
              {produtos.map((produto) => (
                <MenuItem key={produto.id} value={produto.nomeProduto}>
                  {produto.nomeProduto}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          {produtoSelecionado && cotacoes.length > 0 ? (
            <Box>
              <Bar data={getDataForChart()} options={getOptionsForChart()} />
            </Box>
          ) : (
            <Typography variant="h6" align="center">
              {produtoSelecionado
                ? "Nenhuma cotação disponível para o produto selecionado."
                : "Selecione um produto para visualizar o gráfico de cotações."}
            </Typography>
          )}
        </>
      )}

      {!isColaborador && !isAdmin && (
        <Typography variant="h6" align="center" sx={{ mt: 10 }}>
          Acesso restrito. Entre em contato com o administrador.
        </Typography>
      )}
    </Container>
  );
};

export default Home;
