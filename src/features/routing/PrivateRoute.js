import React from "react";
import { Navigate } from "react-router-dom";
import { getAuth } from "firebase/auth";

// eslint-disable-next-line react/prop-types
const PrivateRoute = ({ children }) => {
  const auth = getAuth();
  const user = auth.currentUser; // Verifica se há um usuário autenticado

  return user ? children : <Navigate to="/login" />; // Redireciona para login se não estiver autenticado
};

export default PrivateRoute;
