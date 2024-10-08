import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./features/acme/components/home";
import CadastroContatos from "./features/acme/components/cadastroContatos";
import CadastroFornecedores from "./features/acme/components/cadastroFornecedores"; // Corrigido
import Menu from "./features/acme/components/menu";
import ConsultaCotacoes from "./features/acme/components/consultaCotacoes";
import CadastroProdutos from "./features/acme/components/cadastroProdutos"; // Corrigido
import CadastroCotacoes from "./features/acme/components/CadastroCotacoes"; // Corrigido
import Login from "./features/acme/components/login";
import PrivateRoute from "./features/routing/PrivateRoute";
import GerenciarColaboradores from "./features/acme/components/gerenciarColaboradores";
import CadastroColaborador from "./features/acme/components/cadastroColaborador";
import NovaRequisicaoCompra from "./features/acme/components/novaRequisicaoCompra";
import ListarRequisicoes from "./features/acme/components/listarRequisicoes";
import ListarRequisicoesAdmin from "./features/acme/components/listarRequisicoesAdmin";
const App = () => {
  return (
    <Router>
      <Menu />
      <Routes>
        <Route path="/cadastro-colaborador" element={<CadastroColaborador />} />{" "}
        {/* Rota de cadastro */}
        <Route path="/login" element={<Login />} />{" "}
        {/* Adicione a rota de login */}
        <Route
          path="/produtos"
          element={
            <PrivateRoute>
              <CadastroProdutos />
            </PrivateRoute>
          }
        />
        <Route
          path="/cotacoes"
          element={
            <PrivateRoute>
              <CadastroCotacoes />
            </PrivateRoute>
          }
        />
        <Route path="/" element={<Home />} />
        <Route path="/fornecedores" element={<CadastroFornecedores />} />
        <Route path="/contatos" element={<CadastroContatos />} />
        <Route path="/produtos" element={<CadastroProdutos />} />
        <Route path="/criar-cotacao/:id" element={<CadastroCotacoes />} />
        <Route
          path="/listar-requisicoes-admin"
          element={<ListarRequisicoesAdmin />}
        />
        <Route path="/consultar-cotacoes" element={<ConsultaCotacoes />} />
        <Route path="/listar-requisicoes" element={<ListarRequisicoes />} />
        <Route
          path="/nova-requisicao-compra"
          element={<NovaRequisicaoCompra />}
        />
        <Route
          path="/gerenciar-colaboradores"
          element={<GerenciarColaboradores />}
        />
      </Routes>
    </Router>
  );
};

export default App;
